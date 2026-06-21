(function(){
  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  $('#year').textContent = new Date().getFullYear();

  const themeToggle = $('.theme-toggle');
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  function updateThemeAssets(isLight){
    const pairs = {
      'projectw-logo.svg':'projectw-logo-light.svg',
      'chargeguard-logo.svg':'chargeguard-logo-light.svg',
      'qrcraft-logo.svg':'qrcraft-logo-light.svg',
      'relayotp-logo.svg':'relayotp-logo-light.svg',
      'projectw-lockup-asset.svg':'projectw-lockup-light.svg',
      'projectw-wordmark.svg':'projectw-wordmark-light.svg'
    };
    const reverse = Object.fromEntries(Object.entries(pairs).map(([dark,light])=>[light,dark]));
    document.querySelectorAll('img').forEach(img=>{
      const src = img.getAttribute('src') || '';
      const file = src.split('/').pop();
      const next = isLight ? pairs[file] : reverse[file];
      if(next) img.setAttribute('src', src.replace(file,next));
    });
  }
  function syncThemeButton(){
    const theme = document.documentElement.dataset.theme || 'dark';
    const isLight = theme === 'light';
    if(themeToggle){
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      themeToggle.setAttribute('aria-pressed', String(isLight));
      $('.theme-text', themeToggle).textContent = isLight ? 'Light' : 'Dark';
    }
    if(metaTheme) metaTheme.setAttribute('content', isLight ? '#f7f9ff' : '#050713');
    updateThemeAssets(isLight);
  }
  syncThemeButton();
  themeToggle?.addEventListener('click',()=>{
    const next = (document.documentElement.dataset.theme === 'light') ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('projectw-theme', next);
    syncThemeButton();
    if(window.ScrollTrigger) ScrollTrigger.refresh();
  });

  $('.menu')?.addEventListener('click',()=>document.body.classList.toggle('menu-open'));
  $$('.nav a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));

  // Text splitting without external plugins.
  function splitLines(el){
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(w=>`<span class="line"><span class="line-inner">${w}</span></span>`).join(' ');
  }
  function splitChars(el){
    const text = el.textContent;
    el.innerHTML = text.split('').map(ch=>ch===' ' ? ' ' : `<span class="char">${ch}</span>`).join('');
  }
  $$('.split-lines').forEach(splitLines);
  $$('.split-text').forEach(splitChars);

  // Canvas premium mesh particles.
  const canvas = $('#mesh'), ctx = canvas.getContext('2d');
  let w,h,dpr,points=[],mouse={x:0,y:0};
  function resize(){
    dpr=Math.min(devicePixelRatio||1,2); w=canvas.width=innerWidth*dpr; h=canvas.height=innerHeight*dpr;
    canvas.style.width=innerWidth+'px'; canvas.style.height=innerHeight+'px';
    const gap = Math.max(110, innerWidth/10)*dpr; points=[];
    for(let y=-gap;y<h+gap;y+=gap){for(let x=-gap;x<w+gap;x+=gap){points.push({x,y,ox:x,oy:y,phase:Math.random()*Math.PI*2});}}
  }
  function draw(t=0){
    ctx.clearRect(0,0,w,h);
    const lightMode = document.documentElement.dataset.theme === 'light';
    const g=ctx.createRadialGradient(w*.5,h*.2,0,w*.5,h*.3,Math.max(w,h)*.76);
    if(lightMode){
      g.addColorStop(0,'rgba(56,189,248,.13)');g.addColorStop(.48,'rgba(0,239,134,.045)');g.addColorStop(1,'rgba(255,255,255,0)');
    }else{
      g.addColorStop(0,'rgba(59,130,246,.14)');g.addColorStop(.45,'rgba(34,211,238,.045)');g.addColorStop(1,'rgba(0,0,0,0)');
    }
    ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
    points.forEach(p=>{p.x=p.ox+Math.sin(t*.001+p.phase)*18*dpr;p.y=p.oy+Math.cos(t*.0012+p.phase)*18*dpr;});
    for(let i=0;i<points.length;i++){
      const p=points[i];
      for(let j=i+1;j<points.length;j++){
        const q=points[j], dx=p.x-q.x, dy=p.y-q.y, dist=Math.hypot(dx,dy);
        if(dist<125*dpr){ctx.strokeStyle=lightMode ? `rgba(15,23,42,${(1-dist/(125*dpr))*0.055})` : `rgba(56,189,248,${(1-dist/(125*dpr))*0.075})`;ctx.lineWidth=.75*dpr;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
      }
      const md=Math.hypot(p.x-mouse.x*dpr,p.y-mouse.y*dpr);
      ctx.fillStyle=md<220*dpr ? (lightMode?'rgba(59,130,246,.35)':'rgba(0,239,134,.42)') : (lightMode?'rgba(15,23,42,.16)':'rgba(255,255,255,.18)');
      ctx.beginPath();ctx.arc(p.x,p.y,(md<220*dpr?2.1:1.2)*dpr,0,Math.PI*2);ctx.fill();
    }
    if(!reduce) requestAnimationFrame(draw);
  }
  resize(); draw(); addEventListener('resize',resize,{passive:true});
  addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY; const c=$('.cursor'); if(c){c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';}}, {passive:true});

  if(typeof gsap === 'undefined' || reduce){ document.querySelector('.loader')?.remove(); return; }
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ease:'power3.out'});

  const boot = gsap.timeline({defaults:{duration:1}});
  boot.to('.loader-line span',{x:'165%',duration:1.05,ease:'power2.inOut'})
      .to('.loader-inner',{scale:.82,opacity:0,duration:.55},'-=.12')
      .to('.loader',{yPercent:-100,duration:.95,ease:'expo.inOut'})
      .set('.loader',{display:'none'});

  boot.from('.header',{y:-60,opacity:0,duration:.9},'-=.55')
      .from('.hero .char',{yPercent:120,rotate:8,opacity:0,stagger:.012,duration:.72},'-=.55')
      .from('.hero-title .line-inner',{yPercent:115,rotate:5,stagger:.035,duration:.9,ease:'expo.out'},'-=.5')
      .from('.hero .fade-up',{y:28,opacity:0,stagger:.12,duration:.85},'-=.55')
      .from('.portal-ring',{scale:.35,opacity:0,stagger:.12,duration:1.2,ease:'expo.out'},'-=.95')
      .from('.core-card',{scale:.65,rotationY:-40,opacity:0,duration:1.1,ease:'back.out(1.7)'},'-=.9')
      .from('.satellite',{scale:0,opacity:0,y:40,stagger:.12,duration:.8,ease:'back.out(1.8)'},'-=.55');

  gsap.to('.shine',{x:'145%',duration:2.2,repeat:-1,repeatDelay:1.2,ease:'power2.inOut'});
  gsap.to('.portal',{rotationY:8,rotationX:-5,y:-18,duration:5.5,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to('.ring-a',{rotation:360,duration:28,repeat:-1,ease:'none'});
  gsap.to('.ring-b',{rotationZ:390,duration:18,repeat:-1,ease:'none'});
  gsap.to('.ring-c',{rotationZ:-360,duration:22,repeat:-1,ease:'none'});
  gsap.to('.sat-charge',{y:-24,x:12,duration:3.5,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to('.sat-qr',{y:18,x:-18,duration:4.2,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to('.sat-relay',{y:-16,x:-14,duration:3.8,repeat:-1,yoyo:true,ease:'sine.inOut'});

  // Parallax hero on scroll.
  gsap.timeline({scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}})
    .to('.hero-copy',{y:-110,opacity:.22},0)
    .to('.portal',{scale:.82,rotationZ:18,y:140},0)
    .to('.satellite',{scale:.72,opacity:.45},0);

  // Generic line reveals.
  $$('.panel .split-lines').forEach(el=>{
    if(el.closest('.hero')) return;
    gsap.from(el.querySelectorAll('.line-inner'),{
      scrollTrigger:{trigger:el,start:'top 82%'},
      yPercent:115,rotate:4,opacity:.1,stagger:.035,duration:.95,ease:'expo.out'
    });
  });
  $$('.section-copy p:not(.kicker), .cinema-copy p, .finale-card>p').forEach(el=>{
    gsap.from(el,{scrollTrigger:{trigger:el,start:'top 84%'},y:28,opacity:0,duration:.85});
  });

  // ProjectW constellation — smoother, earlier reveals, desktop pin only.
  gsap.set('.map-line',{strokeDasharray:(i,el)=>el.getTotalLength(),strokeDashoffset:(i,el)=>el.getTotalLength()});
  gsap.set('.eco-card',{transformOrigin:'center center',willChange:'transform,opacity'});
  gsap.fromTo('.eco-card',
    {autoAlpha:0, y:30, scale:.88, rotationY:-10},
    {autoAlpha:1, y:0, scale:1, rotationY:0, duration:.72, stagger:.10, ease:'power3.out',
      scrollTrigger:{trigger:'.ecosystem',start:'top 72%',once:true}}
  );
  const ecosystemMM = gsap.matchMedia();
  ecosystemMM.add('(min-width: 981px)',()=>{
    const eco = gsap.timeline({
      scrollTrigger:{
        trigger:'.ecosystem',
        start:'top top',
        end:'+=1450',
        scrub:.65,
        pin:true,
        anticipatePin:1,
        invalidateOnRefresh:true,
        fastScrollEnd:true
      }
    });
    eco.from('.ecosystem .section-copy',{x:-46,opacity:0,duration:.55},0)
       .to('.map-line',{strokeDashoffset:0,stagger:.08,duration:1.05,ease:'none'},.05)
       .from('.pulse-dot',{scale:0,opacity:0,transformOrigin:'center',stagger:.06,duration:.35},.12)
       .to('.eco-card',{y:-6,stagger:.04,duration:.55,ease:'none'},.20)
       .to('.orbit-stage',{rotationX:6,rotationY:-7,scale:1.025,duration:1.15,ease:'none'},.48)
       .to('.eco-main',{scale:1.10,boxShadow:'0 34px 100px rgba(34,211,238,.22)',duration:.72,ease:'none'},.62)
       .to('.eco-one',{x:16,y:-16,duration:.72,ease:'none'},.78)
       .to('.eco-two',{y:20,duration:.72,ease:'none'},.78)
       .to('.eco-three',{x:-16,y:-16,duration:.72,ease:'none'},.78);
  });
  ecosystemMM.add('(max-width: 980px)',()=>{
    gsap.set('.map-line',{strokeDashoffset:0});
    gsap.from('.eco-card',{scrollTrigger:{trigger:'.orbit-stage',start:'top 78%',once:true},scale:.86,opacity:0,y:28,stagger:.08,duration:.55,ease:'power3.out'});
    gsap.from('.ecosystem .section-copy',{scrollTrigger:{trigger:'.ecosystem',start:'top 82%',once:true},y:24,opacity:0,duration:.55});
  });
  gsap.to('.pulse-dot',{scale:1.55,opacity:.28,transformOrigin:'center',duration:1.25,repeat:-1,yoyo:true,stagger:.18,ease:'sine.inOut'});

  // Company overview phones — pinned on desktop, natural reveal on mobile.
  const cinemaMM = gsap.matchMedia();
  cinemaMM.add('(min-width: 981px)',()=>{
    const cinema = gsap.timeline({scrollTrigger:{trigger:'.cinema',start:'top top',end:'+=2000',scrub:1,pin:true,anticipatePin:1,invalidateOnRefresh:true}});
    cinema.from('.cinema-copy',{y:80,opacity:0,duration:1})
          .from('.phone-b',{y:420,scale:.76,rotationX:30,opacity:0,duration:1.3,ease:'expo.out'},.25)
          .from('.phone-a',{x:-420,y:210,rotationZ:-22,opacity:0,duration:1.2},.55)
          .from('.phone-c',{x:420,y:210,rotationZ:22,opacity:0,duration:1.2},.55)
          .to('.cinema-copy',{y:-70,opacity:.2,duration:1},1.6)
          .to('.phone-a',{x:160,rotationY:0,rotationZ:0,scale:1.06,duration:1.2},1.5)
          .to('.phone-b',{y:70,scale:.9,opacity:.72,duration:1.2},1.5)
          .to('.phone-c',{x:-160,rotationY:0,rotationZ:0,scale:1.06,duration:1.2},1.5)
          .to('.phone-a',{x:-70,y:20,scale:.9,opacity:.6,duration:1},2.8)
          .to('.phone-b',{y:-8,scale:1.14,opacity:1,duration:1},2.8)
          .to('.phone-c',{x:70,y:20,scale:.9,opacity:.6,duration:1},2.8);
  });
  cinemaMM.add('(max-width: 980px)',()=>{
    gsap.set('.cinema,.cinema-stage,.phone-a,.phone-b,.phone-c',{clearProps:'all'});
    gsap.set('.phone',{opacity:1,x:0,y:0,scale:1,rotation:0,rotationX:0,rotationY:0});
    gsap.from('.cinema-copy',{scrollTrigger:{trigger:'.cinema',start:'top 84%',once:true},y:24,opacity:0,duration:.55});
    gsap.from('.phone',{scrollTrigger:{trigger:'.cinema-stage',start:'top 82%',once:true},y:28,opacity:0,stagger:.1,duration:.6,ease:'power3.out'});
  });
  gsap.to('.otp-token',{textShadow:'0 0 30px rgba(59,130,246,.85)',duration:.9,repeat:-1,yoyo:true,ease:'sine.inOut'});

  // Horizontal product scroll only desktop/tablet.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 981px)',()=>{
    const track = $('.horizontal-track');
    const slides = $$('.app-slide');
    const dist = () => -(track.scrollWidth - innerWidth);
    const horizontalTween = gsap.to(track,{
      x:dist,
      ease:'none',
      scrollTrigger:{trigger:'.horizontal-section',start:'top top',end:()=>'+='+(track.scrollWidth-innerWidth),scrub:1,pin:true,invalidateOnRefresh:true}
    });
    slides.forEach(slide=>{
      gsap.from(slide.querySelectorAll('.app-media, .app-info > *'),{
        scrollTrigger:{trigger:slide,start:'left 70%',containerAnimation:horizontalTween},
        y:55,opacity:0,stagger:.08,duration:.8
      });
    });
  });

  // Feature cards and final section.
  gsap.from('.feature-grid article',{scrollTrigger:{trigger:'.feature-grid',start:'top 78%'},y:90,opacity:0,rotationX:18,stagger:.1,duration:.9,ease:'expo.out'});
  gsap.from('.finale-card',{scrollTrigger:{trigger:'.finale',start:'top 70%',end:'center center',scrub:1},scale:.82,rotationX:16,opacity:.35});

  // Mouse tilt / magnetic.
  $$('.depth-card, .feature-grid article, .app-media').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      gsap.to(card,{rotationY:x*12,rotationX:-y*10,transformPerspective:900,transformOrigin:'center',duration:.35,overwrite:true});
    });
    card.addEventListener('pointerleave',()=>gsap.to(card,{rotationY:0,rotationX:0,duration:.6,ease:'elastic.out(1,.45)'}));
  });
  $$('.magnetic').forEach(el=>{
    el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.22,y:(e.clientY-r.top-r.height/2)*.22,duration:.25});});
    el.addEventListener('pointerleave',()=>gsap.to(el,{x:0,y:0,duration:.5,ease:'elastic.out(1,.45)'}));
  });
})();
