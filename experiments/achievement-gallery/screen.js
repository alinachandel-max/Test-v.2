(function () {
  'use strict';
  const app=document.querySelector('#achievement-app');
  const screen=document.querySelector('#achievement-screen');
  const grid=document.querySelector('#achievement-grid');
  const overlay=document.querySelector('#achievement-overlay');
  const viewport=document.querySelector('#achievement-gallery');
  const dotGroup=overlay.querySelector('.bba-dots');
  const step=document.querySelector('#next-step');
  const assets='../../assets/achievement-gallery';
  const Card=window.BirBirAchievementCard;
  const achievements=window.BirBirDemoAchievements;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let phase='closed',animation=0,ghost=null,openingTile=null,pendingAction=null;
  const tiles=achievements.map(a=>Card.compact(a,assets,open));
  grid.replaceChildren(...tiles);
  const slides=achievements.map(achievement=>Card.create({assets,achievement,onAction:openStep}));
  const dots=achievements.map((a,index)=>{
    const dot=document.createElement('button');dot.type='button';dot.dataset.index=index;
    dot.setAttribute('aria-label',a.title+' — '+(index+1)+' из '+achievements.length);
    dot.addEventListener('click',()=>{if(phase==='open'&&step.hidden)carousel.setIndex(index,{animate:true});});return dot;
  });
  dotGroup.replaceChildren(...dots);
  const carousel=new window.BirBirCoverflow(viewport,{
    slides,initialIndex:1,cardHeight:Card.geometry.height,
    onChange(index){updateDots(index);if(phase==='open'&&step.hidden)Card.celebrate?.(slides[index]);},
    onProgress(state){
      viewport.dataset.progress=state.progress.toFixed(4);viewport.dataset.activeIndex=state.index;
      overlay.style.setProperty('--gallery-height',state.cardHeight+'px');updateDots(state.index);
    }
  });
  carousel.close();
  function updateDots(index){
    dots.forEach((dot,i)=>dot.setAttribute('aria-current',String(i===index)));
    overlay.setAttribute('aria-label',achievements[index].title+' — галерея достижений');
  }
  function rectWithinApp(element){
    const a=app.getBoundingClientRect(),b=element.getBoundingClientRect();
    return{x:b.left-a.left,y:b.top-a.top,width:b.width,height:b.height};
  }
  function setReveal(p){overlay.style.setProperty('--reveal',p);overlay.style.setProperty('--neighbors',Math.max(0,(p-.62)/.38));}
  function animateMorph(from,to,opening,achievement,done){
    cancelAnimationFrame(animation);ghost=Card.create({assets,achievement});ghost.classList.add('bba-morph');ghost.setAttribute('aria-hidden','true');overlay.appendChild(ghost);
    const compact=opening?from:to,full=opening?to:from,scale=full.width/320,duration=reduced.matches?0:400;
    let start=null;
    function tick(now){
      if(start===null)start=now;
      const t=duration?Math.min(1,(now-start)/duration):1,eased=1-Math.pow(1-t,3),p=opening?eased:1-eased;
      const g=Card.setProgress(ghost,p,{compactWidth:compact.width,compactHeight:compact.height,scale});
      Object.assign(ghost.style,{left:(compact.x+(full.x-compact.x)*p)+'px',top:(compact.y+(full.y-compact.y)*p)+'px',width:g.width+'px',height:g.height+'px'});
      setReveal(p);
      if(t<1)animation=requestAnimationFrame(tick);else{ghost.remove();ghost=null;animation=0;done();}
    }
    tick(performance.now());
  }
  async function open(id){
    if(phase!=='closed')return;
    const index=achievements.findIndex(a=>a.id===id);if(index<0)return;
    phase='preparing';
    await Promise.all([document.fonts.ready,...Array.from(slides[index].querySelectorAll('img')).map(i=>i.decode().catch(()=>{}))]);
    document.documentElement.classList.add('bba-gallery-open');
    openingTile=tiles[index];const source=rectWithinApp(openingTile);
    overlay.hidden=false;overlay.dataset.phase='opening';setReveal(0);
    openingTile.style.visibility='hidden';openingTile.setAttribute('aria-expanded','true');screen.inert=true;
    carousel.open(index);const destination=rectWithinApp(viewport.querySelector('.bb-coverflow__item.is-current'));
    phase='opening';animateMorph(source,destination,true,achievements[index],()=>{phase='open';overlay.dataset.phase='open';setReveal(1);viewport.focus({preventScroll:true});Card.celebrate?.(slides[index]);});
  }
  function close(){
    if(phase!=='open')return;
    if(!step.hidden){closeStep();return;}
    const index=carousel.index,current=viewport.querySelector('.bb-coverflow__item.is-current'),from=rectWithinApp(current),target=tiles[index];
    carousel.close();if(openingTile!==target)openingTile.style.visibility='';target.style.visibility='hidden';
    phase='closing';overlay.dataset.phase='closing';
    animateMorph(from,rectWithinApp(target),false,achievements[index],()=>{
      overlay.hidden=true;overlay.dataset.phase='closed';phase='closed';screen.inert=false;
      document.documentElement.classList.remove('bba-gallery-open');
      tiles.forEach(t=>{t.style.visibility='';t.setAttribute('aria-expanded','false');});target.focus({preventScroll:true});
    });
  }
  function openStep(achievement){
    if(phase!=='open')return;
    pendingAction=achievement;step.querySelector('h2').textContent=achievement.action;
    step.querySelector('.bba-step-description').textContent=achievement.nextStep;
    step.hidden=false;viewport.inert=true;dotGroup.inert=true;
    requestAnimationFrame(()=>{
      const panel=step.querySelector('.bba-step-panel');Card.corners(panel,panel.offsetWidth,panel.offsetHeight,32);
      const button=step.querySelector('.bba-next-step');Card.corners(button,button.offsetWidth,50,18);
      button.focus({preventScroll:true});
    });
  }
  function closeStep(){step.hidden=true;viewport.inert=false;dotGroup.inert=false;pendingAction=null;viewport.focus({preventScroll:true});}
  step.querySelector('.bba-step-backdrop').addEventListener('click',closeStep);
  step.querySelector('.bba-step-cancel').addEventListener('click',closeStep);
  step.querySelector('#complete-demo-step').addEventListener('click',()=>{
    if(!pendingAction)return;
    const item=pendingAction,index=achievements.indexOf(item),criterion=item.criteria.find(c=>!c.done);
    if(criterion){criterion.done=true;criterion.description='Выполнено';}
    Card.update(slides[index],item);Card.updateCompact(tiles[index],item,assets);closeStep();
    if(item.criteria.every(c=>c.done))Card.celebrate?.(slides[index]);
  });
  overlay.querySelector('.bba-backdrop').addEventListener('click',close);
  // Lock the page while either gallery layer is open, including Safari bounce
  // and trackpad wheel input. Two-finger pinch zoom remains available.
  const preventPagePan=event=>{
    if(phase!=='closed'&&event.cancelable&&(!event.touches||event.touches.length===1))event.preventDefault();
  };
  document.addEventListener('wheel',preventPagePan,{passive:false,capture:true});
  document.addEventListener('touchmove',preventPagePan,{passive:false,capture:true});
  document.addEventListener('keydown',event=>{
    if(phase==='closed'||phase==='preparing')return;
    if(event.key==='Escape'){event.preventDefault();close();}
    if(event.key==='Tab'){
      const owner=step.hidden?overlay:step;
      const focusable=Array.from(owner.querySelectorAll('button,[tabindex="0"]')).filter(e=>e.getClientRects().length&&!e.closest('[inert]')&&!e.disabled);
      if(!focusable.length)return;
      const i=focusable.indexOf(document.activeElement),next=(i+(event.shiftKey?-1:1)+focusable.length)%focusable.length;
      event.preventDefault();focusable[next].focus();
    }
  });
  const resize=()=>{
    tiles.forEach(t=>Card.corners(t,t.offsetWidth,178,28,'#ededed'));
    if(innerWidth>480)Card.corners(app,app.offsetWidth,app.offsetHeight,42);else app.style.clipPath='';
  };
  new ResizeObserver(resize).observe(app);resize();
  const requested=new URLSearchParams(location.search).get('open');if(requested)open(requested==='1'?'verified':requested);
})();
