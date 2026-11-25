import {autoAdvance} from './auto-advance.js';
(() => {
  'use strict';
  const {countries,legs} = window.travelData;
  const photographs = window.travelPhotos;
  const regions = [
    {id:'asia',name:'Asia',cover:'CHN',countries:['CHN','JPN','KOR','KAZ','KGZ','UZB','ARM','GEO','AZE','TUR','BHR','MYS','SGP','THA','LAO','VNM','KHM','IDN','PHL']},
    {id:'europe',name:'Europe',cover:'CHE',countries:['GBR','FRA','DEU','CHE','ITA']},
    {id:'africa',name:'Africa',cover:'EGY',countries:['EGY']},
    {id:'oceania',name:'Oceania',cover:'NZL',countries:['AUS','NZL']},
    {id:'north-america',name:'North America',cover:'USA',countries:['USA']}
  ];
  const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const route = id => '#atlas/all'+(id?'/'+id:'');
  const albumFor = id => photographs.filter(p=>p.country===id);
  const stops = legs.flatMap(leg=>leg.stops);
  const sortedCountries = Object.keys(countries).sort((a,b)=>countries[a].name.localeCompare(countries[b].name,'en'));
  const photoImage = (p,sizes,first=false) => `<img src="${p.thumb}" srcset="${p.thumb} ${p.thumbWidth}w${p.width>p.thumbWidth?', '+p.file+' '+p.width+'w':''}" sizes="${sizes}" width="${p.width}" height="${p.height}" loading="${first?'eager':'lazy'}" decoding="async" alt="${escape(p.alt)}">`;
  const coverLink = (id,name,p,sizes,first=false) => `<a class="land-cover" href="${route(id)}"><span class="land-cover-image">${photoImage(p,sizes,first)}</span><span class="land-cover-label">${escape(name)}<span aria-hidden="true">↗</span></span></a>`;
  const countryChoices = ids => ids.map(id=>`<option value="${id}">${escape(countries[id].name)}</option>`).join('');
  const worldTour=['CHN','JPN','KOR','VNM','LAO','KHM','THA','MYS','SGP','IDN','PHL','AUS','NZL','USA','GBR','FRA','CHE','DEU','ITA','EGY','TUR','BHR','AZE','ARM','GEO','KAZ','KGZ','UZB'];
  const mapPanel = () => `<section class="land-map" aria-label="Travel globe">
    <div class="land-map-panel" aria-busy="true"><div class="globe-panel"><div class="atlas-globe globe-host"></div>
      <div class="globe-base"><span class="globe-hint">Drag to rotate</span><div class="earth-controls"><button type="button" disabled data-zoom="-1" aria-label="Zoom out">−</button><button type="button" disabled data-zoom="1" aria-label="Zoom in">+</button><button type="button" disabled data-reset aria-label="Reset globe view">↺</button></div></div></div>
      <div class="map-controls"><div class="mode-switch" role="group" aria-label="Globe view"><button type="button" disabled data-mode="world" aria-pressed="true">World</button><button type="button" disabled data-mode="route" aria-pressed="false">2025 circuit</button></div>
      <div class="tour-country"><label class="atlas-country-control"><span class="sr-only">Choose a country on the globe</span><select disabled data-map-country>${countryChoices(worldTour)}</select></label>
      <div class="leg-controls"><button type="button" disabled data-previous aria-label="Previous country">←</button><button type="button" disabled data-next aria-label="Next country">→</button></div></div>
      <a class="map-album" href="${route('CHN')}"><span class="map-photo"></span><span class="map-photo-link">View album ↗</span></a></div>
    </div></section>`;

  function mountCountryTour(root,globeFactory){
    const panel=root.querySelector('.land-map-panel');
    const host=panel.querySelector('.atlas-globe');
    const select=panel.querySelector('[data-map-country]');
    const albumLink=panel.querySelector('.map-album');
    const hint=panel.querySelector('.globe-hint');
    const previous=panel.querySelector('[data-previous]'),next=panel.querySelector('[data-next]');
    let mode='world',sequence=worldTour,position=0,globe,tour,disposed=false;
    function display(index,{automatic=false,focus=true}={}){
      position=(index+sequence.length)%sequence.length;
      const id=sequence[position],items=albumFor(id);
      const photo=items.length>1&&regions.some(r=>r.cover===id)?items[1]:items[0];
      select.value=id;
      globe?.select(id,{focus,duration:automatic?2800:undefined});
      albumLink.href=route(id);albumLink.setAttribute('aria-label','View '+countries[id].name+' album');
      albumLink.querySelector('.map-photo').innerHTML=photoImage(photo,'(max-width:650px) 80vw, 28vw',true);
      previous.disabled=!globe||(mode==='route'&&position===0); next.disabled=!globe||(mode==='route'&&position===sequence.length-1);
    }
    function setMode(value){
      mode=value;sequence=mode==='route'?stops.map(s=>s.id):worldTour;
      panel.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
      select.innerHTML=countryChoices(sequence);globe?.setMode(mode);
    }
    function manual(index){tour?.pause();display(index);}
    display(0,{focus:false});
    globeFactory().then(()=>{
      if(disposed||!root.isConnected)return;
      globe=window.mountTravelGlobe(host,{countries,stops,backgroundTapAnywhere:true,keepCenterOnMode:true,
        onSelect:id=>{
          if(!Object.hasOwn(countries,id))return;
          if(!sequence.includes(id))setMode('world');
          manual(sequence.indexOf(id));
        },
        onBackgroundTap:()=>tour?.toggle(),
        onDrag:()=>tour?.pause()
      });
      host.querySelector('canvas').setAttribute('aria-label','Travel globe. Drag or use the arrow keys to rotate. Tap an empty area or press Space to pause or resume the country tour.');
      panel.querySelectorAll('button,select').forEach(c=>c.disabled=false);panel.setAttribute('aria-busy','false');
      tour=autoAdvance(panel,5800,()=>display(position+1,{automatic:true}),({paused,running,reduced})=>{
        if(!running)globe.stopRotation();
        hint.textContent=reduced?'Drag to rotate':paused?'Drag to rotate · Tap empty space to resume':'Drag to rotate · Tap empty space to pause';
      });
      display(0,{automatic:true});
      select.onchange=()=>manual(sequence.indexOf(select.value));
      previous.onclick=()=>manual(position-1);next.onclick=()=>manual(position+1);
      panel.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{setMode(b.dataset.mode);display(0,{automatic:true});tour.restart();});
      panel.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=()=>{tour.pause();globe.zoomBy(b.dataset.zoom==='1'?1.2:1/1.2);});
      panel.querySelector('[data-reset]').onclick=()=>{globe.reset();display(0);tour.restart();};
    }).catch(()=>{if(!disposed)hint.textContent='Browse destinations in the photo journal below.';});
    return ()=>{disposed=true;tour?.destroy();globe?.destroy();};
  }

  window.renderTravel = function(root,openPhoto,requested,loadGlobe) {
    const country=Object.hasOwn(countries,requested)?requested:null;
    const region=regions.find(r=>country?r.countries.includes(country):r.id===requested);
    let album=[];
    let releaseTour;
    if(!region) {
      root.innerHTML=`${mapPanel()}<section class="land-index" aria-label="Travel albums by region"><div class="land-index-head"><h2>Photo journal</h2><label class="atlas-country-control"><span class="sr-only">Open a country album</span><select data-jump><option value="">Country index</option>${countryChoices(sortedCountries)}</select></label></div>
        <div class="land-regions">${regions.map((r,i)=>coverLink(r.id,r.name,albumFor(r.cover)[0],i===0?'(max-width:650px) 94vw, 49vw':'(max-width:650px) 46vw, 24vw',i===0)).join('')}</div></section>`;
    } else {
      const onlyCountry=region.countries.length===1?region.countries[0]:null;
      const albumCountry=country||onlyCountry;
      const crumb=country?`<a href="${route(region.id)}">${region.name}</a><span>/</span>`:'';
      const label=country?countries[country].name:region.name;
      const headline=root.parentElement.querySelector('.atlas-mast h1');
      headline.textContent=label; document.title=label+' — Travel atlas — Yu Yan';
      const back=`<nav class="land-crumbs" aria-label="Album path"><a href="${route()}">Travel atlas</a><span>/</span>${crumb}<span aria-current="page">${escape(label)}</span></nav>`;
      const regionNav=`<nav class="land-region-nav" aria-label="Browse regions">${regions.map(r=>`<a href="${route(r.id)}"${r===region?' aria-current="location"':''}>${r.name}</a>`).join('')}</nav>`;
      const top=`<div class="land-album-tools">${back}${region.countries.length>1?`<label class="atlas-country-control"><span class="sr-only">Open a country in ${region.name}</span><select data-jump><option value="">Choose a country</option>${countryChoices(region.countries)}</select></label>`:''}</div>`;
      if(albumCountry) {
        album=albumFor(albumCountry).map(p=>({...p,caption:countries[albumCountry].name}));
        root.innerHTML=top+`<section class="land-country" aria-label="${escape(countries[albumCountry].name)} photographs">${onlyCountry&&!country?`<h2>${escape(countries[albumCountry].name)}</h2>`:''}<div class="land-gallery${album.length===1?' land-single':''}">${album.map((p,i)=>`<button type="button" class="land-print" data-photo="${i}" style="--image-width:${p.width}px" aria-label="Enlarge photograph: ${escape(p.alt)}">${photoImage(p,album.length===1?'90vw':'(max-width:650px) 94vw, 45vw',i===0)}</button>`).join('')}</div></section>`+regionNav;
      } else {
        root.innerHTML=top+`<section class="land-countries" aria-label="Country albums in ${region.name}">${region.countries.map((id,i)=>coverLink(id,countries[id].name,albumFor(id)[0],'(max-width:540px) 45vw, (max-width:850px) 31vw, 24vw',i<2)).join('')}</section>`+regionNav;
      }
    }
    root.insertAdjacentHTML('beforeend','<div class="land-credits"><a href="travel/photo-credits.html" target="_blank" rel="noopener">Photo credits</a></div>');
    const jump=root.querySelector('[data-jump]');
    if(jump){ if(country)jump.value=country; jump.onchange=()=>{if(jump.value)location.hash=route(jump.value);}; }
    if(!region)releaseTour=mountCountryTour(root,loadGlobe);
    root.addEventListener('click',e=>{const b=e.target.closest('[data-photo]');if(b)openPhoto(album,Number(b.dataset.photo),b);});
    return {destroy:()=>releaseTour?.()};
  };
})();
