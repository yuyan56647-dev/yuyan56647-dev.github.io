(function portfolio(){
'use strict';
const main=document.getElementById('content');
const data=window.profileData;
const figures=window.publicationFigures;
const workImages=window.projectVisuals;
const file=id=>`media/${id}.webp`;
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const navArrow='<span aria-hidden="true">↗</span>';
function link(href,words){return `<a class="link" href="${esc(href)}">${esc(words)} ${navArrow}</a>`;}
function external(href,words,cls='link'){return `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(words)} ${navArrow}</a>`;}
function page(html){main.innerHTML=`<div class="frame page">${html}</div>`;}
function head(title,summary=''){return `<header class="page-head"><h1 class="page-title">${esc(title)}</h1>${summary?`<p>${esc(summary)}</p>`:''}</header>`;}
function setTitle(title){document.title=title==='Home'?'Yu Yan — Selected Work':`${title} — Yu Yan`;}
function imageSet(items,credit){return items.map(([id,caption])=>({file:file(id),caption,credit}));}
const series=[
 {id:'landscape',title:'Lines in the Landscape',cat:'photo',type:'Field photography',cover:'wetland',intro:'A boardwalk threads between wetland pools. Beyond it, channels branch through exposed sediment. From above, I could see how a path drawn by people sits alongside one drawn by water.',pics:imageSet([['wetland','A boardwalk through the wetland'],['sediment','Branching channels in exposed sediment'],['boats','Boats moored along a narrow channel'],['dusk','Bare branches at dusk'],['spillway','Water at the spillway outlets']],'Photograph by Yu Yan.')},
 {id:'roof',title:'From Roof to Street',cat:'photo',type:'Architectural photography',cover:'arcade',intro:'Snow traces the rim of a courtyard. Inside an arcade, each arch casts a different band of shade. These photographs follow what happens to light between a roofline and a street.',pics:imageSet([['arcade','Light falling across a masonry arcade'],['courtyard','A sunken courtyard in snow'],['temple','Upturned eaves above a temple wall'],['stone-lane','A stone lane in the rain'],['hillside-arches','Rows of arches on the hillside']],'Photograph by Yu Yan.')},
 {id:'wings',title:'Where Wings Find Rest',cat:'photo',type:'Exhibited photography',cover:'reeds',intro:'I photographed birds above reeds, on paving stones and on the roof of a parked car. The series was made in June and July 2025 and exhibited in Under the Same Sun, a group show I co-organized at Liang Art Museum in Zhengzhou in July and August 2026.',pics:[...imageSet([['reeds','In flight over the reeds'],['waters-edge','At the water’s edge'],['pigeon','A pigeon on paving stones'],['crow','A crow on a car roof']],'Photograph by Yu Yan.'),...imageSet([['museum-exhibition','Where Wings Find Rest on view in Zhengzhou'],['museum-entry','Entrance to Liang Art Museum']],'Exhibition documentation, The Five Elements portfolio.')]},
 {id:'ink',title:'Brush & Ink',cat:'ink',type:'Calligraphy',cover:'ink-letter',intro:'Pressing and lifting the brush changes the width of a single line. These studies bring together close details, a horizontal scroll and handwritten passages.',pics:imageSet([['ink-letter','Letter study, detail'],['ink-songfeng','Pavilion of Pines and Wind, horizontal work'],['ink-red-cloth','A Piece of Red Cloth, handwritten excerpt'],['ink-brush','Brushstrokes in detail'],['ink-walking','Handwritten lyrics, excerpt']],'Original brush calligraphy by Yu Yan.')},
 {id:'sketch',title:'Walking the Plan',cat:'sketch',type:'Plan drawings',cover:'bank-sketch',intro:'These drawings follow the turns in a waterfront path and the approach to a station. A curve along the bank and a diagonal cut through a block give the same walk a different rhythm.',pics:imageSet([['bank-sketch','Following the bank'],['river-sketch','Crossing between courtyards'],['station-sketch','Arriving at the station']],'Drawing by Yu Yan.')},
 {id:'elements',title:'The Five Elements',cat:'mapping',type:'Cartography',cover:'weichang',intro:'Terrain, climate, waterways and living systems guide these map studies. The complete portfolio also includes drawings, photography and brush calligraphy.',pics:imageSet([['weichang','Earth · The Yixun River valley'],['heat-map','Fire · Urban heat exposure in Shenzhen'],['three-gorges','Water · The Three Gorges Reservoir shoreline'],['shoals','Water · River systems and floodplain use'],['hainan','Wood · Hainan Tropical Rainforest National Park'],['resilience','Metal · Ecological resilience across China']],'Map study by Yu Yan, The Five Elements.')}
];
const collection={all:'All',photo:'Photography',ink:'Calligraphy',sketch:'Drawings',mapping:'Maps',piano:'Piano'};
const pianoSeries = {id:'piano', title:'Piano Recordings', type:'Four performances', cover:'piano-62fad'};

function workBoard(works, arrangement) {
 const heading = arrangement === 'selection' ? 'h3' : 'h2';
 const prints = works.map(work => {
   const href = work.id === 'piano' ? '#studio/piano' : '#series/' + work.id;
   return `<a class="work-print print-${esc(work.id)}" href="${esc(href)}">
     <span class="print-tack" aria-hidden="true"></span>
     <span class="print-image"><img loading="${arrangement === 'selection' ? 'lazy' : 'eager'}" decoding="async" src="${file(work.cover)}" alt=""></span>
     <div class="print-caption"><${heading} class="print-title">${esc(work.title)}</${heading}>
       <span class="print-medium">${esc(work.type)}</span><span class="print-arrow" aria-hidden="true">↗</span></div>
   </a>`;
 }).join('');
 return `<work-pinboard class="work-board board-${arrangement}" role="group" aria-label="Pinned works">
   <div class="board-threads" aria-hidden="true"></div>${prints}
 </work-pinboard>`;
}

customElements.define('work-pinboard', class extends HTMLElement {
 connectedCallback() {
   this.observer = new ResizeObserver(() => this.drawThreads());
   this.observer.observe(this);
   for (const print of this.querySelectorAll('.work-print')) this.observer.observe(print);
 }
 disconnectedCallback() { this.observer.disconnect(); }
 drawThreads() {
   const layer = this.querySelector('.board-threads');
   const origin = layer.getBoundingClientRect();
   const pins = Array.from(this.querySelectorAll('.print-tack'), pin => {
     const box = pin.getBoundingClientRect();
     return {x: box.left + box.width / 2 - origin.left, y: box.top + box.height / 2 - origin.top};
   });
   // Follow the prints around the board, taking the shortest thread to the next pin.
   const strands = document.createDocumentFragment();
   let start = pins.shift();
   while (pins.length) {
     const distance = pin => Math.hypot(pin.x - start.x, pin.y - start.y);
     const next = pins.reduce((nearest, pin) => distance(pin) < distance(nearest) ? pin : nearest);
     const line = document.createElement('i');
     line.style.left = start.x + 'px';
     line.style.top = start.y + 'px';
     line.style.width = distance(next) + 'px';
     line.style.transform = `rotate(${Math.atan2(next.y - start.y, next.x - start.x)}rad)`;
     strands.append(line);
     pins.splice(pins.indexOf(next), 1);
     start = next;
   }
   layer.replaceChildren(strands);
 }
});
const featuredProjects=[['shenzhen-heat','Shenzhen heat exposure'],['three-gorges','Three Gorges'],['hainan-rainforest','Hainan rainforest'],['igem','iGEM sustainability']];
const coverOverride={'volve-rock':'lithology-drill-core-photo','pcb-defect-sorting':'pcb-soldering-photo','cameroon-clean-energy':'icenecdev-cookstove-cover','shenzhen-heat':'sz-baishizhou-street','three-gorges':'gorges-dam-cover','igem':'igem-competition-cover','hainan-edna':'edna-cover-detail','hainan-rainforest':'hainan-bawangling-canopy','schneider-maintenance':'schneider-wordmark-cover','landscape-recognition':'project-xinjiang-red-beds','weichang':'project-weichang-riverbank'};
const projectCoverCredits={
 'cameroon-clean-energy':{credit:'Cover photograph from ICENECDEV’s air quality programme.',url:'https://icenecdev.org/air-quality.php'},
 'shenzhen-heat':{credit:'Cover: Baishizhou, Shenzhen, 2010. Payton Chung. Cropped and toned.',url:'https://commons.wikimedia.org/wiki/File:Streets_in_Baishizhou,_Shenzhen.jpg',licenseUrl:'https://creativecommons.org/licenses/by/2.0/'},
 'three-gorges':{credit:'Cover: Three Gorges Dam, Yichang. Le Grand Portage. Cropped and toned.',url:'https://commons.wikimedia.org/wiki/File:Three_Gorges_Dam,_Yangtze_River,_China.jpg',licenseUrl:'https://creativecommons.org/licenses/by/2.0/'},
 'hainan-rainforest':{credit:'Cover: rainforest at Bawangling, Hainan. Photograph by Z. M., in Chan et al. (2020), Fig. 5. Cropped and toned.',url:'https://doi.org/10.1038/s41598-020-72641-z',licenseUrl:'https://creativecommons.org/licenses/by/4.0/'},
 'schneider-maintenance':{credit:'Schneider Electric corporate wordmark, shown in monochrome.',url:'https://www.se.com/'},
 'igem':{credit:'Competition mark: iGEM Foundation.',url:'editions/iGEM-2026-HainanU-YZ-China-Certificate.pdf'}
};
function projectPics(p){return (p.publicationId?figures[p.publicationId]:workImages[p.id])||[];}
function projCover(p){return coverOverride[p.id]?file(coverOverride[p.id]):projectPics(p)[0]?.file;}
function featuredSheet(id, title) {
 const p = findProject(id);
 return `<a class="tile plan-sheet" href="#project/${esc(id)}"><div class="sheet-window"><div class="thumb"><img loading="lazy" src="${esc(projCover(p))}" alt=""></div></div><div class="sheet-caption"><h3 class="tile-title">${esc(title)}</h3><p class="tile-sub">${esc(p.en)}</p></div><div class="sheet-dateline"><span>${esc(p.date)}</span><span aria-hidden="true">↗</span></div></a>`;
}
const findProject=id=>data.projects.find(p=>p.id===id);
function companyLabel(i){return ({icenecdev:'ICENECDEV','cs-environment':'Central-Southern Safety & Environment Technology Institute','hubei-planning':'Hubei General Institute of Planning and Design','hubei-nr':'Hubei Department of Natural Resources'})[i.id]||i.title;}
function employerLogo(i,compact=false){
 const name=i.title;
 const src=compact&&i.compactLogo?i.compactLogo:(i.logo||'media/employer-'+i.id+'.png');
 return `<img class="${compact?'employer-icon':'employer-logo'}" src="${esc(src)}" alt="${compact?'':esc(i.logoAlt||name+' logo')}" loading="lazy">`;
}
const iOrder=['schneider','hubei-nr','hubei-land','hubei-planning','cs-environment','icenecdev'];
const orbitWorks=[
 ['wetland','Wetland boardwalk','#series/landscape','Boardwalk'],['ink-letter','Letter study','#series/ink','Calligraphy'],
 ['arcade','Masonry arcade','#series/roof','Arcade'],['sz-utci-june-2025','Shenzhen heat exposure','#project/shenzhen-heat','Heat exposure'],
 ['museum-entry','Under the Same Sun','#series/wings','Exhibition'],['sediment','River channels','#series/landscape','River channels'],
 ['reeds','Where Wings Find Rest','#series/wings','Birds in flight'],['bank-sketch','Waterfront sketch','#series/sketch','Waterfront'],
 ['weichang','The Yixun River valley','#project/weichang','Yixun Valley']
];
function workInscription(title,label,index){
 const bend=`work-arc-${index}`;
 return `<button class="work-inscription" type="button" tabindex="${index===0?'0':'-1'}" aria-label="View ${esc(title)}">
   <svg viewBox="0 0 138 44" aria-hidden="true" focusable="false">
     <defs><path id="${bend}-up" d="M 1 35 Q 69 12 137 35"/><path id="${bend}-down" d="M 1 19 Q 69 42 137 19"/></defs>
     ${['up','down'].map(side=>`<text class="arc-${side}" text-anchor="middle"><textPath href="#${bend}-${side}" startOffset="50%">${esc(label)}</textPath></text>`).join('')}
   </svg>
 </button>`;
}
function home(){
 setTitle('Home');
 main.innerHTML=`<div class="frame"><section class="intro">
 <div class="intro-copy"><h1><span class="hello">Hello,</span><br> I’m Yu Yan.</h1><p>I study how people inhabit places, through geography, urban planning and photography.</p><div class="intro-links">${link('#projects','Projects')}${link('#about','About')}</div></div>
 <figure class="home-earth" aria-label="Works orbiting the travel globe">
   <div class="home-earth-stage">
     <button class="orbit-surface" type="button" aria-label="Automatic work rotation" aria-pressed="true" aria-describedby="orbit-instructions"></button>
     <span class="sr-only" id="orbit-instructions">Tap the space around the globe to pause or resume. Drag the ring to turn it. Select a title to view the work.</span>
     <div class="engraved-track" aria-hidden="true"></div>
     <div id="home-globe" class="globe-host"></div>
     ${orbitWorks.map(([,title,,label],i)=>workInscription(title,label,i)).join('')}
   </div>
   <figcaption class="work-caption">
     <div class="work-dial" role="group" aria-label="Selected work">
       <button type="button" class="art-peek" aria-label="View Wetland boardwalk"><img src="${file(orbitWorks[0][0])}" alt=""></button>
       <div class="art-name"><small>01 / 09</small><a href="#series/landscape">Wetland boardwalk ↗</a></div>
       <div class="orbit-controls"><button type="button" data-turn="-1" aria-label="Previous work">‹</button><button type="button" data-turn="1" aria-label="Next work">›</button></div>
     </div>
     <a id="home-atlas-link" class="home-atlas" href="#atlas/all"><span class="atlas-link-title">Travel atlas ↗</span><small id="home-location" aria-live="polite">27 countries abroad</small></a>
   </figcaption>
 </figure></section>
 <section class="section"><div class="heading-row"><h2>Projects</h2>${link('#projects','View all')}</div><div class="project-strip project-covers">${featuredProjects.map(([id,title])=>featuredSheet(id,title)).join('')}</div></section>
 <section class="section home-index"><div class="index-label"><h2>Experience</h2>${link('#experience','View internships')}</div><div class="index-lines">${iOrder.map(id=>{let item=data.internships.find(x=>x.id===id);return `<a class="index-line" href="#experience/${id}"><span class="employer-label">${employerLogo(item,true)}<span>${esc(companyLabel(item))}</span></span><span>${esc(item.role)}</span>${navArrow}</a>`;}).join('')}</div></section>
 <section class="section home-index"><div class="index-label"><h2>Volunteering</h2>${link('#volunteering','View both events')}</div><div class="index-lines"><a class="index-line" href="#volunteering/sanya"><span>The 6th Asian Beach Games</span><span>Brunei Darussalam delegation · 2026</span>${navArrow}</a><a class="index-line" href="#volunteering/boao"><span>Boao Forum for Asia</span><span>Bangladesh delegation · 2025</span>${navArrow}</a></div></section>
 <section class="section home-index"><div class="index-label"><h2>Publications</h2>${link('#publications','Papers & figures')}</div><div class="index-lines">${data.publications.map(p=>`<a class="index-line paper-index-line" href="#publications/${p.id}"><span>${esc(p.title)}</span><span>${p.id==='symmetry'?'Symmetry':'IEEE ICMTIM'} · 2026</span>${navArrow}</a>`).join('')}</div></section>
 <section class="section"><div class="heading-row"><h2>Works</h2>${link('#studio/all','View all')}</div>${workBoard([series[1],series[2],series[3],pianoSeries],'selection')}</section></div>`;mountHomeGlobe();
}
function loadGlobe(){
 return Promise.all([import('./travel-data.js'),import('./travel-world.js'),import('./travel-globe.js')]);
}
function mountWorkOrbit(stage){
 const works=[...stage.querySelectorAll('.work-inscription')];
 const dial=stage.parentElement.querySelector('.work-dial');
 const caption=dial.querySelector('.art-name a'),counter=dial.querySelector('.art-name small');
 const preview=dial.querySelector('.art-peek'),previewImage=preview.querySelector('img');
 const surface=stage.querySelector('.orbit-surface');
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 const images=orbitWorks.map(([asset,title])=>({file:file(asset),caption:title}));
 const count=works.length,turnLength=count*8400;
 const wrap=n=>((n%count)+count)%count;
 let phase=0,current=-1,frame=0,previous=0;
 let paused=reduce.matches,inView=true,destroyed=false,hoverWork=null,tween=null;
 let captionHovered=false,captionFocused=false;
 let gesture=null,discardPointerClick=false;

 function select(index){
   if(index===current)return;
   current=index;
   const [asset,title,href]=orbitWorks[index];
   caption.href=href;caption.textContent=title+' ↗';counter.textContent=pad(index+1)+' / '+pad(count);
   previewImage.src=file(asset);preview.setAttribute('aria-label','View '+title);
   works.forEach((work,i)=>{work.tabIndex=i===index?0:-1;});
 }
 function draw(){
   const selected=wrap(Math.round(phase));
   works.forEach((work,i)=>{
     const degrees=(i-phase)*360/count,angle=degrees*Math.PI/180;
     const below=Math.cos(angle)<0,turn=below?degrees+180:degrees;
     work.style.left=(50+44.6*Math.sin(angle)).toFixed(3)+'%';
     work.style.top=(50-44.6*Math.cos(angle)).toFixed(3)+'%';
     work.style.transform=`translate(-50%,-50%) rotate(${turn.toFixed(2)}deg)`;
     work.classList.toggle('lower-arc',below);
     work.classList.toggle('is-current',i===selected);
   });
   select(selected);
 }
 function shouldRun(){return !destroyed&&inView&&!document.hidden&&!gesture&&(tween||(!paused&&!hoverWork&&!captionHovered&&!captionFocused));}
 function tick(now){
   frame=0;
   if(!shouldRun()){previous=0;return;}
   const dt=previous?now-previous:0;
   if(previous&&dt<31){frame=requestAnimationFrame(tick);return;}
   if(tween){
     const t=Math.min(1,(now-tween.start)/tween.duration);
     phase=tween.from+(tween.to-tween.from)*(1-(1-t)**3);
     if(t===1)tween=null;
   }else phase=wrap(phase+Math.min(dt,100)*count/turnLength);
   previous=now;draw();
   if(shouldRun())frame=requestAnimationFrame(tick);
 }
 function sync(){
   if(frame)cancelAnimationFrame(frame);
   frame=0;previous=0;
   surface.setAttribute('aria-pressed',String(!paused));
   if(shouldRun())frame=requestAnimationFrame(tick);
 }
 function pauseAt(index,animate=true){
   const key=wrap(index);let distance=wrap(key-phase);if(distance>count/2)distance-=count;
   paused=true;
   if(animate&&!reduce.matches&&Math.abs(distance)>.005){
     tween={from:phase,to:phase+distance,start:performance.now(),duration:Math.min(620,290+Math.abs(distance)*85)};
   }else{phase=key;tween=null;draw();}
   sync();
 }
 function step(dir){
   const from=tween?Math.round(tween.to):Math.round(phase);
   pauseAt(from+dir);
 }
 function view(index,trigger){
   pauseAt(index,false);openPhotoViewer(images,index,trigger);
 }
 function toggleRotation(){paused=!paused;hoverWork=null;tween=null;sync();}
 surface.addEventListener('click',toggleRotation);
 stage.closest('.intro').addEventListener('click',e=>{
   if(!e.target.closest('button,a,.globe-host')&&e.target.matches('.intro,.home-earth,.home-earth-stage,.work-caption,.work-dial,.orbit-controls,.intro-links'))toggleRotation();
 });

 stage.addEventListener('pointerdown',e=>{
   const target=e.target.closest('.orbit-surface,.work-inscription');
   if(!target||gesture||!e.isPrimary||e.button!==0)return;
   const box=stage.getBoundingClientRect();
   const cx=box.left+box.width/2,cy=box.top+box.height/2;
   gesture={id:e.pointerId,x:e.clientX,y:e.clientY,cx,cy,width:box.width,
     angle:Math.atan2(e.clientY-cy,e.clientX-cx),axis:null};
   discardPointerClick=false;tween=null;
   target.setPointerCapture(e.pointerId);
   sync();
 });
 stage.addEventListener('pointermove',e=>{
   if(!gesture||gesture.id!==e.pointerId)return;
   const g=gesture,dx=e.clientX-g.x,dy=e.clientY-g.y;
   if(!g.axis){
     const distance=Math.hypot(dx,dy);
     if(distance<6)return;
     // Follow a circular stroke. A swipe straight toward the center also turns the dial.
     const tangent=Math.abs(-Math.sin(g.angle)*dx+Math.cos(g.angle)*dy);
     g.axis=tangent>distance*.5?'angle':Math.abs(dx)>Math.abs(dy)?'x':'y';
     stage.classList.add('turning');hoverWork=null;
   }
   const angle=Math.atan2(e.clientY-g.cy,e.clientX-g.cx);
   if(g.axis==='angle'){
     const delta=angle-g.angle;
     phase=wrap(phase-count*Math.atan2(Math.sin(delta),Math.cos(delta))/(2*Math.PI));
   }else phase=wrap(phase-count*(g.axis==='x'?dx:dy)/(g.width*1.6));
   g.x=e.clientX;g.y=e.clientY;g.angle=angle;
   draw();
 });
 function endGesture(e){
   if(!gesture||gesture.id!==e.pointerId)return;
   discardPointerClick=!!gesture.axis||e.type!=='pointerup';
   gesture=null;stage.classList.remove('turning');sync();
 }
 for(const type of ['pointerup','pointercancel','lostpointercapture'])stage.addEventListener(type,endGesture);
 stage.addEventListener('click',e=>{
   if(discardPointerClick&&e.detail!==0){
     discardPointerClick=false;e.preventDefault();e.stopImmediatePropagation();
   }
 },true);
 dial.querySelectorAll('[data-turn]').forEach(b=>b.onclick=()=>step(Number(b.dataset.turn)));
 preview.onclick=()=>view(current,preview);
 // Keep the text link and its destination steady while a visitor is using it.
 caption.addEventListener('focus',()=>{captionFocused=true;sync();});
 caption.addEventListener('blur',()=>{captionFocused=false;sync();});
 caption.addEventListener('pointerenter',e=>{captionHovered=e.pointerType==='mouse';sync();});
 caption.addEventListener('pointerleave',()=>{captionHovered=false;sync();});
 works.forEach((work,i)=>{
   work.addEventListener('click',()=>view(i,work));
   work.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hoverWork=work;sync();}});
   work.addEventListener('pointerleave',()=>{if(hoverWork===work){hoverWork=null;sync();}});
   work.addEventListener('focus',()=>{if(work.matches(':focus-visible'))pauseAt(i,false);});
   work.addEventListener('keydown',e=>{
     if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;
     e.preventDefault();const next=wrap(i+(e.key==='ArrowRight'?1:-1));pauseAt(next,false);works[next].focus({preventScroll:true});
   });
 });
 const onscreen=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;sync();});onscreen.observe(stage);
 const preference=()=>{paused=reduce.matches;tween=null;sync();};
 reduce.addEventListener('change',preference);document.addEventListener('visibilitychange',sync);
 draw();sync();
 return {toggleRotation,destroy(){destroyed=true;cancelAnimationFrame(frame);onscreen.disconnect();reduce.removeEventListener('change',preference);document.removeEventListener('visibilitychange',sync);}};
}
function mountHomeGlobe(){
 const host=document.getElementById('home-globe');
 const orbit=mountWorkOrbit(host.parentElement);disposeOrbit=orbit.destroy;
 loadGlobe().then(()=>{
   if(!host.isConnected)return;
   atlasView=window.mountTravelGlobe(host,{compact:true,countries:window.travelData.countries,onBackgroundTap:orbit.toggleRotation,onSelect(id){
     document.getElementById('home-location').textContent=window.travelData.countries[id].name;
     const link=document.getElementById('home-atlas-link');
     link.href='#atlas/all/'+id;link.querySelector('.atlas-link-title').textContent='Explore destination ↗';
   }});
   host.querySelector('canvas').setAttribute('aria-label','A globe of my travels. Drag or use the arrow keys to rotate. Open the travel atlas for the full country index.');
 }).catch(()=>{if(host.isConnected)host.textContent='Open the travel atlas to explore my journeys.';});
}
function projects(){
 setTitle('Projects');page(head('Projects')+`<div class="project-list">${data.projects.map((p,i)=>`<a class="project-line" href="#project/${p.id}"><span class="num">${pad(i+1)}</span><div class="mini-img">${projCover(p)?`<img alt="" src="${esc(projCover(p))}" loading="lazy">`:'<span class="empty-spine" aria-hidden="true"></span>'}</div><div><h2>${esc(p.title)}</h2><p class="tile-sub">${esc(p.en)}</p></div><span class="place">${esc(p.place)}</span>${navArrow}</a>`).join('')}</div>`);
}
let gallery=[],lastFocus=null,currentImage=0;
function imageCredit(image){
 return esc(image.credit)+(image.url?' · '+external(image.url,'Source','plate-source'):'')+(image.licenseUrl?' · '+external(image.licenseUrl,'License','plate-source'):'');
}
function plates(items,className='',separateCredits=false){
 if(!items?.length)return '';
 return `<div class="plates ${items.length===1?'one ':''}${className}">${items.map(o=>{
   const index=gallery.push(o)-1;
   const layout=o.layout||'',dimensions=o.width&&o.height?`width="${o.width}" height="${o.height}"`:'';
   return `<figure class="plate ${esc(layout)}"><button type="button" data-expand="${index}" aria-label="Enlarge: ${esc(o.caption)}"><img src="${esc(o.file)}" ${dimensions} loading="lazy" ${o.focus?'style="object-position:'+esc(o.focus)+'"':''} alt="${esc(o.caption)}"></button><figcaption>${esc(o.caption)}${!separateCredits&&o.credit?`<small>${imageCredit(o)}</small>`:''}</figcaption></figure>`;
 }).join('')}</div>`;
}
function projectGallery(id,images){
 const credits=[projectCoverCredits[id],...images].filter(item=>item?.credit);
 const creditLines=[...new Set(credits.map(imageCredit))];
 const sources=creditLines.length?`<details class="image-credits"><summary>Image credits</summary>${creditLines.map(line=>`<p>${line}</p>`).join('')}</details>`:'';
 return plates(images,images.some(image=>image.layout)?'project-photo-essay':'',true)+sources;
}
function paging(prev,next){return `<nav class="pager" aria-label="Browse adjacent works"><a href="${esc(prev.href)}">← ${esc(prev.title)}</a><a href="${esc(next.href)}">${esc(next.title)} →</a></nav>`;}
function neighbors(list,id,base){const i=list.findIndex(v=>v.id===id),entry=d=>({href:'#'+base+'/'+d.id,title:d.title});return paging(entry(list[(i-1+list.length)%list.length]),entry(list[(i+1)%list.length]));}
function project(id){
 const p=findProject(id);if(!p)return missing();setTitle(p.title);
 const imgs=projectPics(p),role=p.institution||p.category;
 const paper=data.publications.find(entry=>entry.id===p.publicationId);
 const relatedLinks=[];
 if(p.employerId)relatedLinks.push(link('#experience/'+p.employerId,'Related internship'));
 if(paper)relatedLinks.push(external(paper.url,'Read paper'),link('#publications/'+paper.id,'Publication & figures'));
 for(const item of p.links||[])relatedLinks.push(external(item.href,item.label));
 page(`<a class="back" href="#projects">← All projects</a><div class="detail-hero"><h1>${esc(p.title)}</h1><div class="meta"><span>${esc(p.place)}</span><span>${esc(p.date)}</span><span>${esc(role)}</span></div></div>
 <p class="intro-text">${esc(p.summary)}</p>${p.details.map(t=>`<p class="paragraph">${esc(t)}</p>`).join('')}${relatedLinks.length?`<div class="paper-links related">${relatedLinks.join('')}</div>`:''}
 ${projectGallery(id,imgs)}${neighbors(data.projects,id,'project')}`);
}
function scrollToId(id){if(!id)return;const el=document.getElementById('jump-'+id);if(el)requestAnimationFrame(()=>el.scrollIntoView({behavior:'instant',block:'start'}));}
function experience(id){
 setTitle('Experience');page(head('Experience','Internships in sustainability engineering, environmental consulting and spatial planning.')+`<div class="experience-stack">${data.internships.map(i=>`<article class="experience-entry" id="jump-${i.id}"><div class="employer-panel"><a class="employer-brand" href="${esc(i.website)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(i.title)} website">${employerLogo(i)}</a></div><div class="experience-copy"><p class="date">${esc(i.date)} · ${esc(i.place)}</p><h2>${esc(i.title)}</h2><p class="role">${esc(i.role)}</p><p class="paragraph">${esc(i.summary)}</p><ul class="work-notes">${i.details.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>${i.relatedProject?link('#project/'+i.relatedProject[0],i.relatedProject[1]):''}</div></article>`).join('')}</div>`);scrollToId(id);
}
function publications(id){
 setTitle('Publications');page(head('Publications')+`<div class="papers">${data.publications.map(p=>`<article class="paper" id="jump-${p.id}"><div class="paper-heading"><div class="paper-meta"><p>${esc(p.date)}</p><p>${esc(p.role)}</p></div><div><h2><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a></h2><p class="paper-meta">${esc(p.authors)}<br>${esc(p.venue)}</p><p class="paragraph">${esc(p.summary)}</p><div class="paper-links">${external(p.url,'Read paper')}<a class="doi" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">DOI ${esc(p.doi)}</a></div></div></div>${plates(figures[p.id])}</article>`).join('')}</div>`);scrollToId(id);
}
function edition(){return `<div class="edition"><div><h2>The Five Elements</h2><p>Maps, sketches, photography and calligraphy · Portfolio, 2023–2026</p></div>${external('editions/Five-Elements-Yu-Yan.pdf','Open PDF')}</div>`;}
function studio(tab){
 if(!Object.hasOwn(collection,tab))tab='all';setTitle(tab==='piano'?'Piano Recordings':'Works');
 const nav=`<nav class="tools" aria-label="Work collections">${Object.entries(collection).map(([k,v])=>`<a href="#studio/${k}" ${k===tab?'aria-current="page"':''}>${esc(v)}</a>`).join('')}</nav>`;
 let body;
 if(tab==='piano'){body=`<div class="piano-grid">${window.pianoRecordings.map(r=>`<article class="piano-card"><video controls playsinline preload="none" poster="${esc(r.poster)}" aria-label="${esc(r.title)}"><source src="${esc(r.file)}" type="video/mp4"></video><div class="piano-label"><h3>${esc(r.title)}</h3><span>${esc(r.duration)}</span></div><p>${esc(r.subtitle)}</p></article>`).join('')}</div>`;}
 else{
 const works = tab === 'all' ? [...series, pianoSeries] : series.filter(work => work.cat === tab);
 const arrangement = tab === 'all' ? 'all' : works.length === 1 ? 'single' : 'photos';
 body = workBoard(works, arrangement) + (tab === 'all' ? edition() : '');
 }
 page(`<div class="works-header">${head(tab==='piano'?'Piano Recordings':'Works')}${nav}</div>`+body);
 main.querySelectorAll('video').forEach(v=>v.addEventListener('play',()=>main.querySelectorAll('video').forEach(other=>{if(other!==v)other.pause();})));
}
function seriesPage(id){
 const s=series.find(v=>v.id===id);if(!s)return missing();setTitle(s.title);
 page(`<a class="back" href="#studio/${s.cat}">← ${esc(collection[s.cat])}</a><div class="detail-hero"><h1>${esc(s.title)}</h1><div class="meta"><span>${esc(s.type)}</span><span>Yu Yan</span></div></div><p class="intro-text">${esc(s.intro)}</p>${plates(s.pics,'gallery-images')}${id==='elements'?edition():''}${neighbors(series,id,'series')}`);
}
function volunteering(event) {
 setTitle('Volunteering');
 page(window.volunteerArchive.renderPage());
 main.querySelectorAll('[data-event-photo]').forEach(button => {
   button.addEventListener('click', () => openPhotoViewer(window.volunteerArchive.photos[button.dataset.eventPhoto], Number(button.dataset.photoIndex), button));
 });
 scrollToId(event);
}
function about(){
 const a=data.about;
 setTitle('About');
 page(`<header class="about about-opening">
   <figure><img class="about-portrait" src="media/yu-yan-coast.jpg" width="1440" height="1190" alt="Yu Yan looking out over the limestone sea stacks on the Great Ocean Road"><figcaption>Great Ocean Road, Australia</figcaption></figure>
   <div><h1 class="page-title">About me</h1><p class="about-bio">${esc(a.bio)}</p></div>
 </header>
 <activity-notebook></activity-notebook>
 <section class="about-education"><h2>Education</h2><div class="school-list">${a.education.map(s=>`<div class="school"><div><strong>${esc(s.title)}</strong><p>${esc(s.subtitle)}</p></div>${s.date?`<time>${esc(s.date)}</time>`:''}</div>`).join('')}</div></section>
 <section class="clubs"><div class="heading-row"><h2>Clubs & exhibitions</h2></div>${data.clubs.map(c=>`<article class="club"><div><h3>${esc(c.title)}</h3><p class="date">${esc(c.role)} · ${esc(c.date)}</p></div><div><p class="paragraph">${esc(c.summary)}</p>${c.details.map(t=>`<p class="paragraph">${esc(t)}</p>`).join('')}${c.id==='same-sun'?link('#series/wings','See the exhibition'):''}</div></article>`).join('')}</section>`);
 main.querySelector('activity-notebook').addEventListener('activity-photo',e=>openPhotoViewer(e.detail.items,e.detail.index,e.detail.trigger));
}
let atlasView,disposeOrbit;
function atlas(cat,country){
 const tabs={all:'Travel',fieldwork:'Fieldwork',hiking:'Hiking',diving:'Diving',cycling:'Cycling'};
 const active=Object.hasOwn(tabs,cat)?cat:'all';
 const lead=active==='all'?'I’ve backpacked through 27 countries beyond China, across five continents. These are the places I’ve kept in photographs and field notes.':'Field notes, mountain summits, marine areas and cycling routes.';
 setTitle('Atlas');
 const nav='<nav class="tools travel-nav" aria-label="Atlas collections">'+Object.entries(tabs).map(([k,label])=>`<a href="#atlas/${k}" ${k===active?'aria-current="page"':''}>${label}</a>`).join('')+'</nav>';
 page((active==='all'?'<header class="atlas-mast"><h1 class="page-title">Travel atlas</h1></header>':head('Atlas',lead))+nav+'<div id="atlas-mount"></div><section id="route-notes"></section>');
 const mount=document.getElementById('atlas-mount');
 if(active==='all'){
   mount.setAttribute('aria-busy','true');
   Promise.all([import('./travel-data.js'),import('./travel-photos.js')])
     .then(()=>import('./travel.js'))
     .then(()=>{if(mount.isConnected){atlasView=window.renderTravel(mount,openPhotoViewer,country,loadGlobe);mount.setAttribute('aria-busy','false');}})
     .catch(()=>{if(mount.isConnected){mount.setAttribute('aria-busy','false');mount.textContent='The travel atlas could not load. Refresh to try again.';}});
 }
 else{
   mount.classList.add('reference-atlas');
   atlasView=window.renderAtlas(mount,active==='fieldwork'?'travel':active);
 }
 if(active!=='all')window.mountNotebook(document.getElementById('route-notes'));
}
function missing(){setTitle('Page not found');page(head('Page not found')+link('#home','Return home'));}
const viewer=document.getElementById('viewer');
function openPhotoViewer(items,index,trigger){
 gallery=items;currentImage=index;lastFocus=trigger;viewer.classList.add('photo-viewer');updateImage(0);viewer.showModal();
}
function updateImage(step){currentImage=(currentImage+step+gallery.length)%gallery.length;const o=gallery[currentImage];const img=document.getElementById('viewer-img');img.src=o.file;img.alt=o.alt||o.caption;if(o.width)img.style.setProperty('--photo-width',o.width+'px');else img.style.removeProperty('--photo-width');document.getElementById('viewer-title').textContent=o.caption;document.getElementById('viewer-credit').textContent=o.credit||'';document.getElementById('viewer-count').textContent=pad(currentImage+1)+' / '+pad(gallery.length);viewer.querySelector('.viewer-nav').hidden=gallery.length<2;}
main.addEventListener('click',e=>{
 const element=e.target.closest('[data-expand]');
 if(!element)return;
 lastFocus=element;
 currentImage=Number(element.dataset.expand);
 viewer.classList.toggle('photo-viewer',Boolean(gallery[currentImage].width));
 updateImage(0);
 viewer.showModal();
});
document.getElementById('viewer-close').onclick=()=>viewer.close();document.getElementById('viewer-prev').onclick=()=>updateImage(-1);document.getElementById('viewer-next').onclick=()=>updateImage(1);
viewer.addEventListener('close',()=>{viewer.classList.remove('photo-viewer');if(lastFocus?.isConnected)lastFocus.focus({preventScroll:true});});viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientY<r.top||e.clientX>r.right||e.clientY>r.bottom)viewer.close();}});viewer.addEventListener('keydown',e=>{if(e.key==='ArrowRight')updateImage(1);if(e.key==='ArrowLeft')updateImage(-1);});
const menu=document.getElementById('site-menu'),toggle=document.querySelector('.menu-toggle');
function closeMenu(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');menu.classList.remove('open');}
toggle.addEventListener('click',()=>{if(menu.classList.toggle('open')){toggle.setAttribute('aria-label','Close navigation');toggle.setAttribute('aria-expanded','true');}else closeMenu();});
menu.addEventListener('click',closeMenu);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.getElementById('to-top').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});document.querySelector('.skip').onclick=e=>{e.preventDefault();main.focus();};
function render(){
 if(viewer.open)viewer.close();if(disposeOrbit){disposeOrbit();disposeOrbit=null;}if(atlasView){atlasView.destroy();atlasView=null;}closeMenu();gallery=[];
 let [route,arg,place]=(location.hash.slice(1)||'home').split('/');
 if(route==='work'){route=({internships:'experience',publications:'publications',projects:'projects'})[arg]||'projects';arg=undefined;}
 const section=({project:'projects',series:'studio'})[route]||route;
 document.querySelectorAll('[data-section]').forEach(a=>{if(a.dataset.section===section)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 window.scrollTo({top:0,behavior:'instant'});
 switch(route){case 'home':home();break;case 'projects':projects();break;case 'project':project(arg);break;case 'experience':experience(arg);break;case 'publications':publications(arg);break;case 'studio':studio(arg);break;case 'series':seriesPage(arg);break;case 'volunteering':volunteering(arg);break;case 'about':about();break;case 'atlas':atlas(arg,place);break;default:missing();}
}
window.addEventListener('hashchange',()=>{render();main.focus({preventScroll:true});});render();
})();
