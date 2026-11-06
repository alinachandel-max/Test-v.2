(function () {
  'use strict';
  const FULL = { width: 320, height: 505.59024 };
  const mix = (a, b, p) => a + (b - a) * p;
  const configs = new WeakMap();
  const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function smoothPath(width,height,radius,inset=0) {
    // Figma's iOS preset: 60% smoothing, using tangent Beziers + a circular arc.
    // Geometry: https://www.figma.com/blog/desperately-seeking-squircles/
    // Unlike a superellipse, this preserves the corner radius while extending
    // the transition along the straight edges. Tight shapes reduce smoothing.
    const w=Math.max(0,width-2*inset),h=Math.max(0,height-2*inset);
    const r=Math.max(0,Math.min(radius-inset,w/2,h/2));
    if(!r)return `M${inset},${inset} h${w} v${h} h${-w} Z`;
    const smoothing=Math.min(.6,Math.min(w,h)/(2*r)-1);
    const extent=r*(1+smoothing),angle=smoothing*Math.PI/4;
    const arc=r*Math.SQRT2*Math.sin((1-smoothing)*Math.PI/4);
    const tangent=r*Math.tan(angle/2),c=tangent*Math.cos(angle),d=tangent*Math.sin(angle);
    const b=(extent-arc-c-d)/3,a=2*b;
    const starts=[[w-extent,0],[w,h-extent],[extent,h],[0,extent]];
    let path='';
    starts.forEach(([ox,oy],quarter)=>{
      const point=(x,y)=>{
        const rotated=[[x,y],[-y,x],[-x,-y],[y,-x]][quarter];
        return `${(ox+rotated[0]+inset).toFixed(4)},${(oy+rotated[1]+inset).toFixed(4)}`;
      };
      path+=(quarter?' L':'M')+point(0,0);
      path+=` C${point(a,0)} ${point(a+b,0)} ${point(a+b+c,d)}`;
      path+=` A${r},${r} 0 0 1 ${point(extent-d,d+arc)}`;
      path+=` C${point(extent,extent-a-b)} ${point(extent,extent-a)} ${point(extent,extent)}`;
    });
    return path+' Z';
  }
  function corners(element,width,height,radius,stroke) {
    // A CSS circular border-radius would intersect and alter this contour.
    element.style.borderRadius='0';
    element.style.clipPath='path("'+smoothPath(width,height,radius)+'")';
    if(stroke) {
      let svg=element.querySelector(':scope > .bba-outline');
      if(!svg){svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('bba-outline');svg.setAttribute('aria-hidden','true');svg.innerHTML='<path fill="none" stroke-width="1"/>';element.appendChild(svg);}
      svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
      svg.firstElementChild.setAttribute('d',smoothPath(width,height,radius,.5));
      svg.firstElementChild.setAttribute('stroke',stroke);
    }
  }
  function create({ assets, achievement, onAction } = {}) {
    const card = document.createElement('article');
    card.className = 'bba-card';
    configs.set(card,{assets,achievement,onAction});
    update(card,achievement);
    return card;
  }
  function update(card,achievement) {
    const config=configs.get(card);config.achievement=achievement;
    const{assets,onAction}=config;
    const done=achievement.criteria.filter(c=>c.done).length,complete=done===achievement.criteria.length;
    card.dataset.achievement=achievement.id;
    card.dataset.complete=String(complete);
    card.setAttribute('aria-label',achievement.title);
    card.innerHTML = `
      <img class="bba-card__icon" src="${assets}/${achievement.icon}.png" alt="" draggable="false">
      <div class="bba-card__text"><h2>${escape(achievement.title)}</h2><p>${done}/${achievement.criteria.length} выполнено</p></div>
      <div class="bba-card__progress" role="progressbar" aria-label="Прогресс достижения" aria-valuemin="0" aria-valuemax="${achievement.criteria.length}" aria-valuenow="${done}"><span style="width:${done/achievement.criteria.length*100}%"></span></div>
      <div class="bba-card__details"><div class="bba-card__details-inner">${achievement.criteria.map(c=>`
        <div class="bba-card__row ${c.done?'is-done':'is-pending'}">${c.done?`<img src="${assets}/phone-check.svg?v=3" width="24" height="24" alt="Выполнено" draggable="false">`:'<span class="bba-pending-circle" aria-label="Ещё не выполнено"></span>'}<div><h3>${escape(c.title)}</h3><p>${escape(c.description)}</p></div></div>`).join('')}
      </div></div>
      <div class="bba-card__footer">${complete?'<p class="bba-earned">Достижение получено</p>':`<button class="bba-next-step" type="button">${escape(achievement.action)}</button>`}</div>`;
    card.querySelector('.bba-next-step')?.addEventListener('click',()=>onAction?.(achievement));
    for(const row of card.querySelectorAll('.bba-card__row'))corners(row,272,72,18,'#ededed');
    const button=card.querySelector('.bba-next-step');if(button)corners(button,272,50,18);
    setProgress(card, 1);
  }
  function setProgress(card, progress, { compactWidth = 175, compactHeight = 178, scale = 1 } = {}) {
    const p = Math.min(1, Math.max(0, progress));
    const values = {
      'icon-size': mix(80, 117.78889 * scale, p),
      'icon-y': mix(17, 24 * scale, p),
      'text-y': mix(107, 162.46304 * scale, p),
      'text-width': mix(compactWidth - 26, 219.52585 * scale, p),
      'text-gap': mix(4, 5.88945 * scale, p),
      'title-size': mix(16, 24 * scale, p),
      'title-line': mix(19, 29 * scale, p),
      'subtitle-size': mix(14, 16 * scale, p),
      'subtitle-line': mix(17, 19 * scale, p),
      'progress-width': mix(126, 185.5175 * scale, p),
      'progress-height': mix(4, 5.88944 * scale, p),
      'progress-y': mix(157, 237.02664 * scale, p),
      'details-y': mix(311.59024 * scale, 263.59024 * scale, p),
      'details-width': 272 * scale,
      'footer-y': mix(480,431.59024,p)*scale
    };
    for (const [key, value] of Object.entries(values)) card.style.setProperty('--' + key, value + 'px');
    card.style.setProperty('--detail-scale', scale);
    card.style.setProperty('--title-weight', 600 + 100 * p);
    card.style.setProperty('--card-border-alpha', 1 - p);
    const geometry={ width: mix(compactWidth, FULL.width * scale, p), height: mix(compactHeight, FULL.height * scale, p) };
    corners(card,geometry.width,geometry.height,mix(28,32*scale,p));
    return geometry;
  }
  function compact(achievement,assets,onOpen) {
    const el=document.createElement('button');el.type='button';el.className='bba-mini';
    el.dataset.achievement=achievement.id;el.setAttribute('aria-haspopup','dialog');el.setAttribute('aria-expanded','false');
    updateCompact(el,achievement,assets);el.addEventListener('click',()=>onOpen(achievement.id));return el;
  }
  function updateCompact(el,achievement,assets) {
    const done=achievement.criteria.filter(c=>c.done).length;
    el.dataset.complete=String(done===achievement.criteria.length);
    el.innerHTML=`<img src="${assets}/${achievement.icon}.png" alt=""><div class="bba-mini__text"><h2>${escape(achievement.title)}</h2><p>${done}/${achievement.criteria.length} выполнено</p></div><div class="bba-mini__progress"><span style="width:${done/achievement.criteria.length*100}%"></span></div>`;
    requestAnimationFrame(()=>{if(el.offsetWidth)corners(el,el.offsetWidth,178,28,'#ededed');});
  }
  window.BirBirAchievementCard = { create, update, compact, updateCompact, setProgress, corners, geometry: FULL };
})();
