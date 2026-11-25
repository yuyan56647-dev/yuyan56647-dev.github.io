/* Physical geography: Natural Earth, public domain. Local projection: Equal Earth. */
(() => {
  'use strict';
  const worldImage = new URL('assets/world-physical.svg', document.currentScript?.src || location.href).href;
  const categories = {all:'All',travel:'Travel & fieldwork',hiking:'Hiking',diving:'Diving',cycling:'Cycling'};
  const groups = {
    all:'',
    travel:'Field visits and an exhibition from my work in China.',
    hiking:'This reference layer marks mountain summits.',
    diving:'These reference points mark protected marine areas in the UNESCO World Heritage List.',
    cycling:'I have cycled around an island. The Jeju route is shown here as a geographic reference.'
  };
  const places = [
    {id:'yichang',cat:'travel',name:'Yichang',region:'Hubei, China',tag:'Fieldwork',lng:111.29,lat:30.69,body:'During fieldwork for the Three Gorges Reservoir Area spatial plan, I spoke with local stakeholders about the practical consequences of land use and conservation decisions.',precision:'City location',link:'#project/three-gorges',linkText:'View the Three Gorges project'},
    {id:'enshi',cat:'travel',name:'Enshi',region:'Hubei, China',tag:'Fieldwork',lng:109.49,lat:30.28,body:'Interviews and field observations in Enshi helped me understand how local land-use needs differ across the Three Gorges Reservoir Area.',precision:'City location',link:'#project/three-gorges',linkText:'View the Three Gorges project'},
    {id:'zhengzhou',cat:'travel',name:'Zhengzhou',region:'Henan, China',tag:'Exhibition',lng:113.63,lat:34.75,body:'In summer 2026, I co-organized the group exhibition Under the Same Sun in Zhengzhou and showed Where Wings Find Rest, my photographic series on birds in urban spaces.',precision:'City location',link:'#series/wings',linkText:'View the photo series'},
    {id:'everest',cat:'hiking',name:'Mount Everest',region:'Himalayas, China and Nepal',lng:86.925,lat:27.98806,body:'Everest rises 8,848.86 metres above sea level on the border between China and Nepal.',link:'https://www.wikidata.org/wiki/Q513'},
    {id:'matterhorn',cat:'hiking',name:'Matterhorn',region:'Alps, Switzerland and Italy',lng:7.65861,lat:45.97639,body:'Four steep rock faces meet at the summit. The familiar silhouette changes shape between Zermatt and the Italian side of the mountain.',link:'https://en.wikipedia.org/wiki/Matterhorn'},
    {id:'kilimanjaro',cat:'hiking',name:'Mount Kilimanjaro',region:'East Africa, Tanzania',lng:37.35917,lat:-3.06667,body:'Kilimanjaro rises above the Tanzanian plains. Its highest point lies on Kibo, one of its volcanic cones.',link:'https://www.wikidata.org/wiki/Q7296'},
    {id:'aconcagua',cat:'hiking',name:'Aconcagua',region:'Andes, Argentina',lng:-70.01167,lat:-32.65306,body:'The highest peak in South America stands in the Andes of Mendoza Province, Argentina.',link:'https://en.wikipedia.org/wiki/Aconcagua'},
    {id:'fuji',cat:'hiking',name:'Mount Fuji',region:'Honshu, Japan',lng:138.7275,lat:35.36056,body:'This volcano spans Shizuoka and Yamanashi prefectures. Its highest point, Kengamine, sits on the crater rim.',link:'https://www.wikidata.org/wiki/Q39231'},
    {id:'tubbataha',cat:'diving',name:'Tubbataha Reefs',region:'Sulu Sea, Philippines',lng:119.8675,lat:8.95333,body:'The North and South Atolls and Jessie Beazley Reef make up this protected marine area. Steep coral walls line the outer edges of the atolls.',link:'https://whc.unesco.org/en/list/653/'},
    {id:'palau',cat:'diving',name:'Rock Islands Southern Lagoon',region:'Western Pacific, Palau',lng:134.3525,lat:7.24693,body:'Limestone islands enclose lagoons and marine lakes, with coral reefs extending beneath the surface.',link:'https://whc.unesco.org/en/list/1386/'},
    {id:'barrier',cat:'diving',name:'Great Barrier Reef',region:'Coral Sea, Australia',lng:147.7,lat:-18.28611,body:'The reef system extends along the Queensland coast. The pin marks its representative World Heritage coordinates.',link:'https://whc.unesco.org/en/list/154/'},
    {id:'belize',cat:'diving',name:'Blue Hole Natural Monument',region:'Caribbean Sea, Belize',lng:-87.53470,lat:17.31599,body:'The marine area around the Great Blue Hole is one of seven sites in the Belize Barrier Reef Reserve System.',link:'https://whc.unesco.org/en/list/764/maps/'},
    {id:'jeju',cat:'cycling',name:'Jeju Fantasy Bicycle Path',region:'Jeju Island, South Korea',lng:126.5121,lat:33.5162,body:'This loop follows coastal roads past beaches and volcanic landforms before returning to Yongduam Rock. The pin marks the starting point.',precision:'Route start',link:'https://english.visitkorea.or.kr/svc/sp/HallyuNew/contentsView.do?dataSetId=70&menuNm=tour&page=11&vcontsId=247721'}
  ];
  const pointGroups={hiking:'Mountain reference',diving:'Marine reference',cycling:'Route reference'};
  const degree = Math.PI/180;
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  function project(lng,lat) {
    const theta=Math.asin(Math.sqrt(3)/2*Math.sin(lat*degree));
    const t2=theta*theta,t6=t2*t2*t2,t8=t6*t2;
    const x=2*Math.sqrt(3)*lng*degree*Math.cos(theta)/(3*(1.340264-3*.081106*t2+7*.000893*t6+9*.003796*t8));
    return {x:500+180*x,y:245-180*theta*(1.340264-.081106*t2+.000893*t6+.003796*t8)};
  }
  for (const p of places) Object.assign(p,project(p.lng,p.lat));
  const ctext=(d,lat)=>Math.abs(d).toFixed(2)+'°'+(lat?(d>=0?'N':'S'):(d>=0?'E':'W'));
  function icon(name) {
    const paths = {
      all:'<circle cx="12" cy="12" r="8.5"/><path d="M3.6 12h16.8M12 3.5c-5 4.3-5 12.7 0 17 5-4.3 5-12.7 0-17Z"/>',
      travel:'<path d="M19 9c0 4.5-7 11-7 11S5 13.5 5 9a7 7 0 1 1 14 0Z"/><circle cx="12" cy="9" r="2.2"/>',
      hiking:'<path d="m2 18 7-11 4 6 2-3 7 8Zm5-8 2 2 2-2"/>',
      diving:'<path d="M2 9q3-3 6 0t6 0 7 0M2 14q3-3 6 0t6 0 7 0"/>',
      cycling:'<circle cx="5.5" cy="15.5" r="3.5"/><circle cx="18.5" cy="15.5" r="3.5"/><path d="m5.5 15.5 4.2-7 3 7h-7m7 0 3.8-7M8 8.5h3.4m7 7-3-10h3"/>',
      plus:'<path d="M5 12h14m-7-7v14"/>',minus:'<path d="M5 12h14"/>',
      reset:'<path d="M4 9a8.5 8.5 0 1 1 0 7M4 4v5h5"/>', next:'<path d="M5 12h14m-5-5 5 5-5 5"/>',prev:'<path d="M19 12H5m5-5-5 5 5 5"/>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round">'+paths[name]+'</svg>';
  }
  function ensureStyles() {
    if(document.getElementById('yu-atlas-style'))return;
    const style=document.createElement('style');style.id='yu-atlas-style';
    style.textContent=`
.yu-atlas{--am-ink:#161616;--am-mute:#646464;--am-rule:#d8d8d8;--am-paper:#fff;--am-black:#252525;--am-accent:#435ec7;color:var(--am-ink);font-family:Helvetica,Arial,sans-serif;text-align:left}
.yu-atlas *{box-sizing:border-box}
.yu-atlas button,.yu-atlas select{appearance:none;font-family:inherit;cursor:pointer;font-size:inherit;letter-spacing:normal;text-transform:none}
.yu-atlas button:focus-visible,.yu-atlas a:focus-visible,.yu-atlas select:focus-visible,.yu-atlas .am-stage:focus-visible{outline:2px solid var(--am-accent);outline-offset:3px}
.yu-atlas .am-tabs{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 14px}
.yu-atlas .am-tab{display:inline-flex;align-items:center;gap:7px;background:transparent;color:var(--am-mute);border:1px solid var(--am-rule);border-radius:0;padding:8px 15px;line-height:1.35;font-size:13px}
.yu-atlas .am-tab svg{width:17px;height:17px}
.yu-atlas .am-tab[aria-pressed=true]{background:var(--am-black);border-color:var(--am-black);color:#fff}
.yu-atlas .am-tab:hover:not([aria-pressed=true]){border-color:var(--am-black);color:var(--am-black)}
.yu-atlas .am-grid{display:grid;grid-template-columns:minmax(0,2.5fr) minmax(215px,1fr);border:1px solid var(--am-rule);border-radius:0;overflow:hidden;background:var(--am-paper)}
.yu-atlas .am-board{background:#fafafa;min-width:0;display:flex;flex-direction:column}
.yu-atlas .am-stage{position:relative;min-height:300px;height:100%;isolation:isolate;flex:1;overflow:hidden;touch-action:pan-y}
.yu-atlas .am-stage[data-zoom=true]{cursor:grab;touch-action:none}
.yu-atlas .am-stage.is-dragging{cursor:grabbing}
.yu-atlas .am-world,.yu-atlas .am-pins{position:absolute;inset:0;display:block;width:100%;height:100%;pointer-events:none}
.yu-atlas .am-north{position:absolute;top:13px;left:17px;color:#686868;display:grid;justify-items:center;gap:3px;font:10px/1 Helvetica,Arial,sans-serif;pointer-events:none}
.yu-atlas .am-north:after{content:'';height:22px;width:9px;background:linear-gradient(to right,#666 50%,#a7a7a7 50%);clip-path:polygon(50% 0,100% 100%,50% 78%,0 100%)}
.yu-atlas .am-control{position:absolute;top:12px;right:12px;display:flex;gap:3px}
.yu-atlas .am-ctl,.yu-atlas .am-step{display:grid;place-items:center;width:34px;height:34px;padding:0;border:1px solid #cecece;border-radius:0;background:#fff;color:var(--am-ink)}
.yu-atlas .am-ctl svg,.yu-atlas .am-step svg{width:15px;height:15px}
.yu-atlas .am-ctl:disabled,.yu-atlas .am-step:disabled{opacity:.4;cursor:default}
.yu-atlas .am-pin{position:absolute;transform:translate(-50%,-50%);border:0;background:none;width:34px;height:34px;padding:0;display:grid;place-items:center;pointer-events:auto;border-radius:100%;z-index:1}
.yu-atlas .am-pin:hover,.yu-atlas .am-pin:focus-visible,.yu-atlas .am-pin.current{z-index:3}
.yu-atlas .am-dot{display:grid;place-items:center;color:#5d5d5d;background:#fff;border:1.4px solid currentColor;border-radius:50%;width:14px;height:14px;box-shadow:0 0 0 3px #ffffffbb}
.yu-atlas .am-dot:after{content:'';width:4px;height:4px;border-radius:50%;background:currentColor}
.yu-atlas .am-pin[data-type=travel] .am-dot{color:#fff;background:var(--am-black);border-color:#fff}
.yu-atlas .am-pin.current .am-dot{color:white;background:var(--am-accent);border-color:var(--am-accent);box-shadow:0 0 0 4px #435ec733,0 0 0 5px #435ec766}
.yu-atlas .am-pin.cluster .am-dot{width:23px;height:23px;font:600 11px/1 ui-monospace,monospace}
.yu-atlas .am-pin.cluster .am-dot:after{display:none}
.yu-atlas .am-tag{position:absolute;left:calc(50% + 14px);color:#161616;white-space:nowrap;font-size:11px;line-height:1.5;background:#fffffff2;border:1px solid #ccc;border-radius:2px;padding:1px 5px;font-weight:500;pointer-events:none;display:none}
.yu-atlas .am-pin[data-edge=right] .am-tag{left:auto;right:calc(50% + 14px)}
.yu-atlas .am-pin:hover .am-tag,.yu-atlas .am-pin:focus-visible .am-tag,.yu-atlas .am-pin.current .am-tag{display:block}
.yu-atlas .am-caption{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px 10px;padding:9px 13px;background:#fafafa;border-top:1px solid #ddd;font-size:10px;color:#5c5c5c;line-height:1.55}
.yu-atlas .am-legend{display:flex;align-items:center;flex-wrap:wrap;gap:12px}
.yu-atlas .am-key{display:inline-flex;align-items:center;gap:5px}
.yu-atlas .am-key:before{content:'';width:8px;height:8px;background:var(--am-black);border-radius:50%}
.yu-atlas .am-key.ref:before{background:none;border:1.4px solid #5d5d5d}
.yu-atlas .am-caption a{color:inherit;text-decoration:underline;text-underline-offset:2px}
.yu-atlas .am-card{min-width:0;padding:18px 22px 19px;border-left:1px solid var(--am-rule);display:flex;flex-direction:column;align-items:stretch}
.yu-atlas .am-select-wrap{display:flex;align-items:center;gap:9px;position:relative;border-bottom:1px solid var(--am-rule);padding-bottom:9px;margin-bottom:18px;line-height:1.4}
.yu-atlas .am-select-wrap span{font-size:11px;white-space:nowrap;color:var(--am-mute)}
.yu-atlas .am-select-wrap select{flex:1;min-width:0;border:0;background:transparent;color:var(--am-ink);padding:3px 14px 3px 0;line-height:1.45;font-size:12px}
.yu-atlas .am-select-wrap:after{content:'';pointer-events:none;position:absolute;right:4px;top:7px;width:6px;height:6px;transform:rotate(45deg);border:solid var(--am-mute);border-width:0 1px 1px 0}
.yu-atlas .am-feature{flex:1;min-height:185px}
.yu-atlas .am-type{display:block;color:var(--am-accent);font-size:11px;font-weight:500;line-height:1.7}
.yu-atlas .am-card h3{font-family:Helvetica,Arial,sans-serif;font-size:clamp(22px,2.3vw,34px);line-height:1.12;letter-spacing:-.045em;font-weight:500;margin:5px 0 3px;color:var(--am-ink)}
.yu-atlas .am-body{font-size:13px;line-height:1.6;margin:15px 0 10px;color:#3a3a3a}
.yu-atlas .am-coord{font:10px/1.5 ui-monospace,Menlo,monospace;color:#666;display:block}
.yu-atlas .am-more{font-size:12px;color:var(--am-accent);display:inline-flex;align-items:center;gap:6px;margin-top:12px;text-decoration:underline;text-underline-offset:3px}
.yu-atlas .am-index{display:flex;align-items:center;gap:6px;border-top:1px solid var(--am-rule);padding-top:10px;margin-top:14px}
.yu-atlas .am-index-num{margin-right:auto;font:11px/1.5 ui-monospace,Menlo,monospace;color:var(--am-mute)}
.yu-atlas .am-step{border-radius:0;width:30px;height:30px;background:transparent}
.yu-atlas .am-summary{font-size:12px;color:var(--am-mute);line-height:1.65;margin:8px 0 0}
@media(max-width:790px){.yu-atlas .am-grid{grid-template-columns:minmax(0,1.8fr) minmax(195px,1fr)}.yu-atlas .am-card{padding:15px}.yu-atlas .am-stage{min-height:285px}}
@media(max-width:640px){.yu-atlas .am-grid{display:block}.yu-atlas .am-stage{height:clamp(220px,57vw,310px);min-height:0;flex:auto}.yu-atlas .am-card{border-left:0;border-top:1px solid var(--am-rule);padding:15px 17px}.yu-atlas .am-feature{min-height:0}.yu-atlas .am-select-wrap{margin:0 0 11px}.yu-atlas .am-tab{padding:7px 10px;gap:4px;font-size:12px}.yu-atlas .am-tab svg{width:14px;height:14px}.yu-atlas .am-tabs{gap:5px}.yu-atlas .am-caption{font-size:10px;padding:7px 9px}.yu-atlas .am-control{right:8px;top:8px}.yu-atlas .am-ctl{width:32px;height:32px}.yu-atlas .am-pin{width:40px;height:40px}.yu-atlas .am-card h3{font-size:24px}.yu-atlas .am-body{margin-top:9px}.yu-atlas .am-index{margin-top:10px}}
`;
    document.head.append(style);
  }
  let cleanupPrevious;
  window.renderAtlas=function renderAtlas(container, initialCategory='all') {
    if(typeof container==='string')container=document.querySelector(container);
    if(!container)return;
    cleanupPrevious?.();
    ensureStyles();
    let cat=Object.hasOwn(categories,initialCategory)?initialCategory:'all';
    let visible=[],selected=null,zoom=1,cx=500,cy=237,view,drag=null;
    container.innerHTML=`<div class="yu-atlas">
      <div class="am-tabs" role="group" aria-label="Map layers">${Object.entries(categories).map(([key,label])=>`<button type="button" class="am-tab" data-layer="${key}">${icon(key)}<span>${label}</span></button>`).join('')}</div>
      <div class="am-grid"><div class="am-board">
      <div class="am-stage" tabindex="0" role="region" aria-label="Interactive atlas. Use the arrow keys to pan and the plus and minus keys to zoom.">
      <svg class="am-world" aria-hidden="true"><image href="${worldImage}" width="1000" height="490"/></svg><div class="am-pins"></div>
      <span class="am-north" aria-hidden="true">N</span>
      <div class="am-control">${[['plus','Zoom in'],['minus','Zoom out'],['reset','Reset to world view']].map(([action,label])=>`<button type="button" class="am-ctl" data-action="${action}" title="${label}" aria-label="${label}">${icon(action)}</button>`).join('')}</div></div>
      <div class="am-caption"><div class="am-legend"><span class="am-key">Personal record</span><span class="am-key ref">Geographic reference</span></div><a href="https://github.com/nvkelso/natural-earth-vector" target="_blank" rel="noreferrer">Natural Earth basemap ↗</a></div></div>
      <aside class="am-card" aria-label="Place details"><label class="am-select-wrap"><span>Place index</span><select aria-label="Choose a place"></select></label>
      <div class="am-feature" aria-live="polite"></div>
      <div class="am-index"><span class="am-index-num"></span><button type="button" data-action="prev" class="am-step" aria-label="Previous place">${icon('prev')}</button><button type="button" data-action="next" class="am-step" aria-label="Next place">${icon('next')}</button></div></aside></div><p class="am-summary"></p></div>`;
    const root=container.querySelector('.yu-atlas'),stage=root.querySelector('.am-stage'),world=root.querySelector('.am-world'),pins=root.querySelector('.am-pins'),select=root.querySelector('select');
    const drawPoint=(p)=>({x:(p.x-view.left)/view.width*stage.clientWidth,y:(p.y-view.top)/view.height*stage.clientHeight});
    function draw() {
      const width=stage.clientWidth,height=stage.clientHeight;
      if(!width||!height)return;
      const ratio=width/height, w=Math.max(1000,467*ratio)/zoom, h=w/ratio;
      cx=w>=1000?500:clamp(cx,w/2,1000-w/2);
      cy=h>=490?237:clamp(cy,h/2,490-h/2);
      view={width:w,height:h,left:cx-w/2,top:cy-h/2};
      world.setAttribute('viewBox',[view.left,view.top,w,h].join(' '));
      stage.dataset.zoom=zoom>1;
      root.querySelector('[data-action=plus]').disabled=zoom>=32;
      root.querySelector('[data-action=minus]').disabled=zoom<=1;
      const clusters=[];
      for(const p of visible) {
        const screen=drawPoint(p);
        if(screen.x < -10 || screen.x > width+10 || screen.y < -10 || screen.y > height+10)continue;
        const c=clusters.find(v=>Math.hypot(v.x-screen.x,v.y-screen.y)<(width<510?26:22));
        if(c){c.list.push(p);c.x+=(screen.x-c.x)/c.list.length;c.y+=(screen.y-c.y)/c.list.length;}
        else clusters.push({...screen,list:[p]});
      }
      pins.replaceChildren();
      for(const c of clusters){
        const group=c.list.length>1,p=c.list[0],selectedHere=c.list.includes(selected),label=group?c.list.map(i=>i.name).join(', '):p.name;
        const btn=document.createElement('button');btn.type='button';btn.className='am-pin'+(group?' cluster':'')+(selectedHere?' current':'');
        btn.dataset.ids=c.list.map(i=>i.id).join(',');btn.dataset.type=c.list.every(i=>i.cat==='travel')?'travel':'reference';btn.dataset.edge=c.x>width*.7?'right':'left';
        btn.style.left=c.x+'px';btn.style.top=c.y+'px';
        btn.setAttribute('aria-label',group?'Zoom in to view '+label:'View '+label);
        btn.innerHTML=`<span class="am-dot">${group?c.list.length:''}</span><span class="am-tag">${group?c.list.length+' places':p.name}</span>`;
        pins.append(btn);
      }
    }
    function detail() {
      const p=selected, internal=p.link.startsWith('#');
      select.value=p.id;
      root.querySelector('.am-feature').innerHTML=`<span class="am-type">${p.tag || pointGroups[p.cat]} · ${p.region}</span><h3>${p.name}</h3><p class="am-body">${p.body}</p><span class="am-coord">${ctext(p.lat,true)} &nbsp; ${ctext(p.lng,false)} · ${p.precision || (p.cat==='diving'?'Heritage site':'Summit')}</span><a class="am-more" href="${p.link}" ${internal?'':'target="_blank" rel="noreferrer"'}>${p.linkText || 'Source'} ${internal?'→':'↗'}</a>`;
      root.querySelector('.am-index-num').textContent=(visible.indexOf(p)+1)+' / '+visible.length;
      root.querySelectorAll('.am-step').forEach(b=>b.disabled=visible.length<2);
    }
    function choose(p,recenter) {
      selected=p;
      if(recenter&&zoom>1){cx=p.x;cy=p.y;}
      detail();draw();
    }
    function layer(next) {
      cat=next;visible=places.filter(p=>cat==='all'||p.cat===cat);
      selected=visible[0];zoom=1;cx=500;cy=237;
      if(cat==='travel'){let center=project(111.6,32.2);cx=center.x;cy=center.y;zoom=13;}
      if(cat==='cycling'){let center=project(126.5,33.4);cx=center.x;cy=center.y;zoom=7;}
      select.replaceChildren(...visible.map(p=>new Option(p.name,p.id)));
      root.querySelectorAll('.am-tab').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.layer===cat)));
      root.querySelector('.am-summary').textContent=cat==='all'?'':groups[cat];
      detail();draw();
    }
    function changeZoom(factor) {
      const newZoom=clamp(zoom*factor,1,32);
      if(zoom===1 && newZoom>1 && selected){cx=selected.x;cy=selected.y;}
      zoom=newZoom;draw();
    }
    function click(e) {
      const target=e.target.closest('button');if(!target||!root.contains(target))return;
      if(target.dataset.layer){layer(target.dataset.layer);return;}
      if(target.dataset.ids) {
        const ids=target.dataset.ids.split(','),items=visible.filter(p=>ids.includes(p.id));
        if(items.length>1){
          cx=items.reduce((s,p)=>s+p.x,0)/items.length;cy=items.reduce((s,p)=>s+p.y,0)/items.length;
          zoom=clamp(zoom*3,3,32);selected=items.includes(selected)?selected:items[0];detail();draw();
        }else if(items[0])choose(items[0],false);
        if(e.detail===0)select.focus({preventScroll:true});
        return;
      }
      const action=target.dataset.action;
      if(action==='plus'||action==='minus'){changeZoom(action==='plus'?1.7:1/1.7);return;}
      if(action==='reset'){zoom=1;cx=500;cy=237;draw();return;}
      if(action==='prev'||action==='next')choose(visible[(visible.indexOf(selected)+(action==='next'?1:-1)+visible.length)%visible.length],true);
    }
    root.addEventListener('click',click);
    select.addEventListener('change',()=>{const p=places.find(p=>p.id===select.value);if(p)choose(p,true);});
    stage.addEventListener('keydown',e=>{
      if(e.target!==stage)return;
      if(['+','='].includes(e.key)){changeZoom(1.7);e.preventDefault();return;}
      if(e.key==='-'){changeZoom(1/1.7);e.preventDefault();return;}
      const deltas={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
      if(deltas[e.key]&&view&&zoom>1){const [dx,dy]=deltas[e.key];cx+=dx*view.width*.15;cy+=dy*view.height*.15;draw();e.preventDefault();}
    });
    stage.addEventListener('pointerdown',e=>{
      if(zoom<=1||e.button!==0||e.target.closest('button')||!view)return;
      drag={id:e.pointerId,x:e.clientX,y:e.clientY,cx,cy};
      stage.setPointerCapture(e.pointerId);stage.classList.add('is-dragging');
    });
    stage.addEventListener('pointermove',e=>{
      if(!drag||e.pointerId!==drag.id)return;
      cx=drag.cx-(e.clientX-drag.x)*view.width/stage.clientWidth;
      cy=drag.cy-(e.clientY-drag.y)*view.height/stage.clientHeight;draw();
    });
    function stopDrag(){drag=null;stage.classList.remove('is-dragging');}
    stage.addEventListener('pointerup',stopDrag);stage.addEventListener('pointercancel',stopDrag);stage.addEventListener('lostpointercapture',stopDrag);
    const watcher=new ResizeObserver(draw);watcher.observe(stage);
    cleanupPrevious=()=>watcher.disconnect();
    layer(cat);
    return {setLayer:layer,destroy:cleanupPrevious};
  };
})();
