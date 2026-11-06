/*
 * BirBirCoverflow — dependency-free, pointer-driven achievement carousel.
 *
 * const carousel = new BirBirCoverflow(viewport, {
 *   slides: Array.from(viewport.children), initialIndex: 1, cardHeight: 439.59,
 *   onChange(index) {},
 *   onProgress({ progress, index, offset, settled }) {}
 * });
 * carousel.open(index?); // enable/re-measure after displaying an overlay
 * carousel.setIndex(index, { animate: true });
 * carousel.close();      // stop input/animation; caller owns overlay visibility
 * carousel.destroy();    // restore original slide locations and attributes
 * carousel.index; carousel.getState();
 *
 * Load achievement-coverflow.css. Supplied slides keep their own transforms;
 * generated hosts own movement. Content uses canonical 320 × 439.59 geometry,
 * with an optional cardHeight for taller variants containing a CTA.
 * scaled as a whole on viewports narrower than 390px. At 390px, neighbouring
 * centres are 285px apart and side-card scale is .7125. No slides are cloned.
 * Three or more slides loop seamlessly; one/two slides have bounded ends.
 * Neighbours turn inward by up to 7deg. Horizontal dragging adds at most 1.8deg
 * of roll; reduced motion disables both rotation and the settling animation.
 * onChange runs on settlement; onProgress follows every rendered movement.
 */
(function (global) {
  'use strict';

  const CARD_WIDTH = 320;
  const CARD_HEIGHT = 439.59;
  const SIDE_SCALE = 0.7125;
  const GAP = 11;
  const mod = (value, count) => ((value % count) + count) % count;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const now = () => global.performance.now();

  class BirBirCoverflow {
    constructor(viewport, options = {}) {
      const slides = Array.from(options.slides || (viewport && viewport.children) || []);
      if (!viewport || viewport.nodeType !== 1 || !slides.length ||
          slides.some(slide => !slide || slide.nodeType !== 1 || slide === viewport) ||
          new Set(slides).size !== slides.length) {
        throw new TypeError('BirBirCoverflow requires a viewport and unique slide elements.');
      }
      this.viewport = viewport;
      this.slides = slides;
      this.count = slides.length;
      this._cardHeight = Number.isFinite(Number(options.cardHeight)) && Number(options.cardHeight) > 0
        ? Number(options.cardHeight) : CARD_HEIGHT;
      this.loop = this.count >= 3;
      this._onChange = typeof options.onChange === 'function' ? options.onChange : null;
      this._onProgress = typeof options.onProgress === 'function' ? options.onProgress : null;
      this._progress = this._normalIndex(options.initialIndex == null ? 0 : options.initialIndex);
      this._notifiedIndex = this.index;
      this._accessibilityIndex = -1;
      this._active = true;
      this._destroyed = false;
      this._frame = 0;
      this._spring = null;
      this._pointer = null;
      this._suppressClickUntil = 0;
      this._width = 390;
      this._baseScale = 1;
      this._spacing = 285;
      this._listeners = [];
      this._savedAttributes = new Map();
      ['role', 'aria-roledescription', 'tabindex'].forEach(name => {
        this._savedAttributes.set(name, viewport.getAttribute(name));
      });
      this._hadClass = viewport.classList.contains('bb-coverflow');
      this._savedHeight = viewport.style.getPropertyValue('--bb-coverflow-height');
      this._savedHeightPriority = viewport.style.getPropertyPriority('--bb-coverflow-height');
      this._savedCardHeight = viewport.style.getPropertyValue('--bb-coverflow-card-height');
      this._savedCardHeightPriority = viewport.style.getPropertyPriority('--bb-coverflow-card-height');
      viewport.style.setProperty('--bb-coverflow-card-height', `${this._cardHeight}px`);
      viewport.classList.add('bb-coverflow');
      if (!viewport.hasAttribute('role')) viewport.setAttribute('role', 'region');
      if (!viewport.hasAttribute('aria-roledescription')) viewport.setAttribute('aria-roledescription', 'carousel');
      if (!viewport.hasAttribute('tabindex')) viewport.setAttribute('tabindex', '0');

      this._items = slides.map((slide, index) => {
        const marker = viewport.ownerDocument.createComment('coverflow slide');
        if (slide.parentNode) slide.parentNode.insertBefore(marker, slide);
        const host = viewport.ownerDocument.createElement('div');
        host.className = 'bb-coverflow__item';
        host.dataset.bbCoverflowIndex = String(index);
        host.setAttribute('role', 'group');
        host.setAttribute('aria-roledescription', 'slide');
        host.setAttribute('aria-label', `${index + 1} / ${this.count}`);
        const inert = slide.hasAttribute('inert');
        host.appendChild(slide);
        viewport.appendChild(host);
        return { host, slide, marker, inert };
      });

      this._tick = this._tick.bind(this);
      this._listen(viewport, 'pointerdown', event => this._pointerDown(event));
      this._listen(global, 'pointermove', event => this._pointerMove(event), { passive: false });
      this._listen(global, 'pointerup', event => this._pointerEnd(event, false));
      this._listen(global, 'pointercancel', event => this._pointerEnd(event, true));
      this._listen(viewport, 'lostpointercapture', event => {
        // Touch starts with implicit capture on the touched child. Transferring
        // it to this viewport must not be mistaken for an interrupted swipe.
        if (event.target === viewport && !viewport.hasPointerCapture(event.pointerId)) {
          this._pointerEnd(event, true);
        }
      });
      this._listen(viewport, 'click', event => this._click(event), true);
      this._listen(viewport, 'keydown', event => this._keyDown(event));
      this._listen(viewport, 'dragstart', event => event.preventDefault());
      this._listen(global, 'resize', () => this._measure());
      this._listen(global, 'orientationchange', () => this._measure());
      this._motion = global.matchMedia ? global.matchMedia('(prefers-reduced-motion: reduce)') : null;
      this._motionChanged = () => {
        if (this._motion.matches && this._spring) this._animateTo(this._spring.target, 0, false);
        else this._render();
      };
      if (this._motion) {
        if (this._motion.addEventListener) this._motion.addEventListener('change', this._motionChanged);
        else this._motion.addListener(this._motionChanged);
      }
      if (global.ResizeObserver) {
        this._observer = new global.ResizeObserver(() => this._measure());
        this._observer.observe(viewport);
      }
      this._measure(false);
      this._render(false);
    }

    get index() { return this._normalIndex(Math.round(this._progress)); }

    getState() {
      return {
        progress: this._progress,
        index: this.index,
        offset: this._progress - Math.round(this._progress),
        settled: !this._spring && !this._pointer && Math.abs(this._progress - Math.round(this._progress)) < 0.001,
        width: this._width,
        cardWidth: CARD_WIDTH * this._baseScale,
        cardHeight: this._cardHeight * this._baseScale,
        spacing: this._spacing,
        scale: this._baseScale
      };
    }

    open(index) {
      if (this._destroyed) return this;
      this._active = true;
      this._measure(false);
      return this.setIndex(index == null ? this.index : index, { animate: false });
    }

    setIndex(index, { animate = true } = {}) {
      if (this._destroyed || !Number.isFinite(Number(index))) return this;
      this._releasePointer();
      const normalized = this._normalIndex(index);
      const target = this.loop
        ? normalized + Math.round((this._progress - normalized) / this.count) * this.count
        : normalized;
      this._animateTo(target, 0, animate);
      return this;
    }

    close() {
      if (this._destroyed) return this;
      this._active = false;
      this._releasePointer();
      this._stopAnimation();
      this._progress = Math.round(this._progress);
      this._render(false);
      return this;
    }

    destroy() {
      if (this._destroyed) return;
      this.close();
      this._destroyed = true;
      this._listeners.forEach(([target, type, handler, options]) => target.removeEventListener(type, handler, options));
      if (this._observer) this._observer.disconnect();
      if (this._motion) {
        if (this._motion.removeEventListener) this._motion.removeEventListener('change', this._motionChanged);
        else this._motion.removeListener(this._motionChanged);
      }
      this._items.forEach(({ host, slide, marker, inert }) => {
        slide.toggleAttribute('inert', inert);
        if (marker.parentNode) marker.parentNode.replaceChild(slide, marker);
        else slide.remove();
        host.remove();
      });
      this._savedAttributes.forEach((value, name) => {
        if (value == null) this.viewport.removeAttribute(name);
        else this.viewport.setAttribute(name, value);
      });
      if (!this._hadClass) this.viewport.classList.remove('bb-coverflow');
      if (this._savedHeight) this.viewport.style.setProperty('--bb-coverflow-height', this._savedHeight, this._savedHeightPriority);
      else this.viewport.style.removeProperty('--bb-coverflow-height');
      if (this._savedCardHeight) this.viewport.style.setProperty('--bb-coverflow-card-height', this._savedCardHeight, this._savedCardHeightPriority);
      else this.viewport.style.removeProperty('--bb-coverflow-card-height');
    }

    _normalIndex(index) {
      const rounded = Number.isFinite(Number(index)) ? Math.round(Number(index)) : 0;
      return this.loop ? mod(rounded, this.count) : clamp(rounded, 0, this.count - 1);
    }

    _listen(target, type, handler, options) {
      target.addEventListener(type, handler, options);
      this._listeners.push([target, type, handler, options]);
    }

    _measure(render = true) {
      if (this._destroyed) return;
      const width = this.viewport.clientWidth || this.viewport.getBoundingClientRect().width;
      if (!(width > 0)) return;
      this._width = width;
      this._baseScale = Math.min(1, width / 390);
      this._spacing = CARD_WIDTH * this._baseScale * (1 + SIDE_SCALE) / 2 + GAP;
      this.viewport.style.setProperty('--bb-coverflow-height', `${this._cardHeight * this._baseScale}px`);
      if (this._pointer) {
        this._pointer.startX = this._pointer.lastX;
        this._pointer.startProgress = this._progress;
        this._pointer.samples = [{ time: now(), progress: this._progress }];
      }
      if (render) this._render();
    }

    _offset(index) {
      const offset = index - this._progress;
      return this.loop ? mod(offset + this.count / 2, this.count) - this.count / 2 : offset;
    }

    _render(notify = true) {
      const index = this.index;
      const reducedMotion = this._motion && this._motion.matches;
      const roll = !reducedMotion && this._pointer && this._pointer.axis === 'x' ? this._pointer.roll : 0;
      this._items.forEach((item, slideIndex) => {
        const offset = this._offset(slideIndex);
        const distance = Math.abs(offset);
        const scale = (1 - (1 - SIDE_SCALE) * Math.min(1, distance)) * this._baseScale;
        item.host.style.setProperty('--bb-coverflow-x', `${(offset * this._spacing).toFixed(4)}px`);
        item.host.style.setProperty('--bb-coverflow-scale', scale.toFixed(6));
        item.host.style.setProperty('--bb-coverflow-yaw', `${reducedMotion ? 0 : clamp(-offset * 7, -7, 7)}deg`);
        // Keep the full-size card's top/bottom edges intact as a drag starts.
        item.host.style.setProperty('--bb-coverflow-roll', `${(roll * Math.min(1, distance * 4)).toFixed(3)}deg`);
        item.host.style.zIndex = String(1000 - Math.round(distance * 100));
        // Loop wrapping happens outside the visible neighbourhood, including
        // larger achievement sets, so distant cards never flash across it.
        item.host.style.visibility = distance < 2 ? 'visible' : 'hidden';
        if (this._accessibilityIndex !== index) {
          const current = slideIndex === index;
          item.host.classList.toggle('is-current', current);
          item.host.setAttribute('aria-hidden', String(!current));
          item.slide.toggleAttribute('inert', !current || item.inert);
        }
      });
      this._accessibilityIndex = index;
      if (notify && this._onProgress) this._onProgress(this.getState());
    }

    _schedule() {
      if (!this._frame && this._active && !this._destroyed) this._frame = global.requestAnimationFrame(this._tick);
    }

    _stopAnimation() {
      if (this._frame) global.cancelAnimationFrame(this._frame);
      this._frame = 0;
      this._spring = null;
    }

    _animateTo(target, velocity = 0, animate = true) {
      this._stopAnimation();
      if (!this.loop) target = clamp(target, 0, this.count - 1);
      if (!animate || !this._active || (this._motion && this._motion.matches) ||
          (Math.abs(target - this._progress) < 0.001 && Math.abs(velocity) < 0.01)) {
        this._progress = target;
        this._render();
        this._settled();
        return;
      }
      this._spring = { target, velocity: clamp(velocity, -7, 7), lastTime: now() };
      this._schedule();
    }

    _tick(time) {
      this._frame = 0;
      if (!this._active || this._destroyed) return;
      const spring = this._spring;
      if (spring) {
        // Small fixed substeps keep the spring stable on a dropped frame.
        let remaining = Math.min(0.05, Math.max(0, (time - spring.lastTime) / 1000));
        spring.lastTime = time;
        while (remaining > 0) {
          const step = Math.min(remaining, 1 / 120);
          spring.velocity += ((spring.target - this._progress) * 300 - spring.velocity * 27) * step;
          this._progress += spring.velocity * step;
          remaining -= step;
        }
        if (Math.abs(spring.target - this._progress) < 0.0005 && Math.abs(spring.velocity) < 0.005) {
          this._progress = spring.target;
          this._spring = null;
        }
      }
      this._render();
      if (this._spring) this._schedule();
      else if (spring) this._settled();
    }

    _settled() {
      const index = this.index;
      if (index !== this._notifiedIndex) {
        this._notifiedIndex = index;
        if (this._onChange) this._onChange(index);
      }
    }

    _pointerDown(event) {
      if (!this._active || this.count < 2 || this._pointer || event.isPrimary === false ||
          (event.button != null && event.button !== 0)) return;
      this._stopAnimation();
      // A deliberate new tap may immediately follow a swipe. Only the click
      // generated by that swipe should be suppressed, never this new gesture.
      this._suppressClickUntil = 0;
      this._pointer = {
        id: event.pointerId, startX: event.clientX, startY: event.clientY,
        lastX: event.clientX, startProgress: this._progress, axis: null, roll: 0,
        samples: [{ time: now(), progress: this._progress }]
      };
    }

    _pointerMove(event) {
      const pointer = this._pointer;
      if (!pointer || pointer.id !== event.pointerId) return;
      const dx = event.clientX - pointer.startX;
      const dy = event.clientY - pointer.startY;
      const movedX = event.clientX - pointer.lastX;
      pointer.lastX = event.clientX;
      if (!pointer.axis) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          this._releasePointer();
          this._animateTo(Math.round(this._progress));
          return;
        }
        pointer.axis = 'x';
        this.viewport.classList.add('is-dragging');
        try { this.viewport.setPointerCapture(event.pointerId); } catch (_) { /* Pointer may already be cancelled. */ }
      }
      if (event.cancelable) event.preventDefault();
      pointer.roll = clamp(movedX * 0.08, -1.8, 1.8);
      let progress = pointer.startProgress - dx / this._spacing;
      if (!this.loop) {
        const bounded = clamp(progress, 0, this.count - 1);
        progress = bounded + (progress - bounded) * 0.22;
      }
      this._progress = progress;
      const time = now();
      pointer.samples.push({ time, progress });
      while (pointer.samples.length > 2 && pointer.samples[0].time < time - 100) pointer.samples.shift();
      this._schedule();
    }

    _pointerEnd(event, cancelled) {
      const pointer = this._pointer;
      if (!pointer || pointer.id !== event.pointerId) return;
      let velocity = 0;
      if (pointer.axis === 'x') {
        this._suppressClickUntil = now() + 400;
        const first = pointer.samples[0];
        const last = pointer.samples[pointer.samples.length - 1];
        const elapsed = last.time - first.time;
        if (!cancelled && now() - last.time < 80 && elapsed > 0) {
          velocity = clamp((last.progress - first.progress) / (elapsed / 1000), -7, 7);
        }
      }
      const projected = this._progress + clamp(velocity * 0.18, -0.9, 0.9);
      let target = Math.round(projected);
      if (Math.abs(this._progress - pointer.startProgress) < 1) {
        const startIndex = Math.round(pointer.startProgress);
        target = clamp(target, startIndex - 1, startIndex + 1);
      }
      this._releasePointer();
      this._animateTo(target, velocity);
    }

    _releasePointer() {
      const pointer = this._pointer;
      this._pointer = null;
      this.viewport.classList.remove('is-dragging');
      if (pointer) {
        try {
          if (this.viewport.hasPointerCapture(pointer.id)) this.viewport.releasePointerCapture(pointer.id);
        } catch (_) { /* An ended browser gesture can release capture first. */ }
      }
    }

    _click(event) {
      if (!this._active) return;
      if (event.detail !== 0 && now() < this._suppressClickUntil) {
        this._suppressClickUntil = 0;
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      const host = event.target.closest ? event.target.closest('.bb-coverflow__item') : null;
      if (!host || host.parentNode !== this.viewport) return;
      const index = Number(host.dataset.bbCoverflowIndex);
      if (index !== this.index) {
        event.preventDefault();
        event.stopPropagation();
        this.setIndex(index);
      }
    }

    _keyDown(event) {
      if (!this._active || event.altKey || event.ctrlKey || event.metaKey ||
          event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)) return;
      let target;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        target = (this._spring ? this._spring.target : Math.round(this._progress)) + (event.key === 'ArrowRight' ? 1 : -1);
      } else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = this.count - 1;
      else return;
      event.preventDefault();
      this._releasePointer();
      this._animateTo(target);
    }
  }

  global.BirBirCoverflow = BirBirCoverflow;
})(window);
