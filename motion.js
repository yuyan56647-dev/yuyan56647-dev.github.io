import {autoAdvance} from './auto-advance.js';
(() => {
  'use strict';

  const photo = (filename, caption) => ({file: 'motion/photos/' + filename, caption});
  const activities = [
    {id:'cave', name:'Cave abseiling', setting:'Waitomo, New Zealand', note:'Looking up from the ropes, I could still see daylight at the mouth of the cave.', photos:[photo('cave-descent.jpg','On the ropes below the cave entrance'), photo('cave-light.jpg','In the light at the bottom of the cave')]},
    {id:'flying', name:'Light aircraft flying', setting:'New Zealand', note:'A headset, a hand on the controls and a valley framed by the windscreen.', photos:[photo('flying.jpg','At the controls of a light aircraft')]},
    {id:'cycling', name:'Cycling', setting:'On the trail', note:'Some rides take me around an island. Others follow the water until the gravel road bends.', photos:[photo('cycling.jpg','A lakeside trail seen over the handlebars')]},
    {id:'paragliding', name:'Paragliding', setting:'Fethiye, Türkiye', note:'From the air, the Mediterranean coast looks remarkably like a map.', photos:[photo('paragliding.jpg','Tandem paragliding above the bay'), photo('paragliding-launch.jpg','Canopies on the hillside before takeoff')]},
    {id:'diving', name:'Scuba diving', setting:'PADI Open Water Diver', note:'A pair of fins, a trail of bubbles and fish passing just out of reach.', photos:[photo('diving-gear.jpg','Dive mask and fins with the PADI AWARE ocean conservation message'), photo('open-water-certificate.jpg','Yu Yan’s PADI Open Water Diver certificate')]},
    {id:'riding', name:'Trail riding', setting:'Uzbekistan', note:'On horseback, the rhythm of the trail belongs to two of us.', photos:[photo('riding.jpg','Trail riding beneath the trees')]},
    {id:'fishing', name:'Sea fishing', setting:'Red Sea, Egypt', note:'On the Red Sea, even the quiet wait for a bite was part of the afternoon.', photos:[photo('fishing.jpg','Fishing from a boat on the Red Sea')]},
    {id:'golf', name:'Golf', setting:'On the fairway', note:'I like that little pause after a swing, when everyone looks up.', photos:[photo('golf.jpg','Out on the golf course')]},
    {id:'racing', name:'Motor racing', setting:'Sakhir, Bahrain', note:'In Sakhir, even my racing suit carried the circuit’s name.', photos:[photo('racing.jpg','Wearing a racing suit at the circuit')]},
    {id:'football', name:'Football', setting:'On the pitch', note:'My number seven shirt, boots and medals.', photos:[photo('football.jpg','My number seven football shirt, boots, ball and medals')]},
    {id:'basketball', name:'Basketball', setting:'On the court', note:'A ball in the air and a few people looking up. I love a game outdoors.', photos:[photo('basketball.jpg','Playing basketball on an outdoor court')]},
    {id:'badminton', name:'Badminton', setting:'On the court', note:'A whole rally can turn on one light touch of the shuttle.', photos:[photo('badminton.jpg','On the badminton court')]}
  ];

  class ActivityNotebook extends HTMLElement {
    connectedCallback() {
      this.innerHTML=`<section class="movement" aria-labelledby="movement-title" aria-roledescription="carousel">
        <div class="movement-heading"><h2 id="movement-title">In motion</h2><div class="motion-controls">
          <span class="motion-count" aria-hidden="true"></span>
          <button type="button" data-step="-1" aria-label="Previous activity">←</button>
          <button type="button" class="motion-switch" aria-label="Pause activity slideshow"></button>
          <button type="button" data-step="1" aria-label="Next activity">→</button></div></div>
        <div class="motion-sheet"><div class="motion-stage"></div>
          <div class="motion-copy"><h3 class="motion-title"></h3><p class="motion-place"></p></div>
          <div class="motion-prints" aria-label="Activity photographs"></div></div>
        <span class="sr-only motion-status" aria-live="polite"></span></section>`;
      this.request=new AbortController();
      this.index=0;
      this.running=false;
      this.stage=this.querySelector('.motion-stage');
      this.titleBox=this.querySelector('.motion-title');
      this.tray=this.querySelector('.motion-prints');
      this.switcher=this.querySelector('.motion-switch');
      this.scenes=new Map();
      this.display(0);
      this.player=autoAdvance(this,6000,()=>this.display(1),state=>{
        this.running=state.running;
        this.reduced=state.reduced;
        this.switcher.hidden=state.reduced;
        this.switcher.dataset.paused=String(state.paused);
        this.switcher.setAttribute('aria-label',state.paused?'Play activity slideshow':'Pause activity slideshow');
        this.updateScene();
      });
      this.switcher.onclick=()=>this.player.toggle();
      this.querySelectorAll('[data-step]').forEach(button=>button.onclick=()=>{
        this.display(Number(button.dataset.step));
        this.querySelector('.motion-status').textContent=activities[this.index].name;
        this.player.restart();
      });
      this.tray.onclick=e=>{
        const trigger=e.target.closest('[data-photo]');
        if(trigger)this.dispatchEvent(new CustomEvent('activity-photo',{detail:{items:activities[this.index].photos,index:Number(trigger.dataset.photo),trigger}}));
      };
    }

    prepare(index) {
      if(this.scenes.has(index))return this.scenes.get(index);
      const a=activities[index],scene=document.createElement('div');
      scene.className='movement-scene';
      scene.setAttribute('role','img');scene.setAttribute('aria-label',a.name+'. '+a.note);
      scene.hidden=true;scene.setAttribute('data-still','');
      this.scenes.set(index,scene);this.stage.append(scene);
      this.loadScene(scene,a.id,this.request.signal);
      return scene;
    }

    display(step) {
      const previous=this.scenes.get(this.index);
      if(previous){previous.hidden=true;previous.setAttribute('data-still','');previous.shadowRoot?.querySelector('svg')?.pauseAnimations();}
      this.index=(this.index+step+activities.length)%activities.length;
      const a=activities[this.index];
      this.prepare(this.index).hidden=false;
      this.prepare((this.index+1)%activities.length);
      const old=this.titleBox.lastElementChild;
      const title=document.createElement('span');title.textContent=a.name;
      this.titleBox.replaceChildren(title);
      if(step&&!this.reduced&&old){
        old.setAttribute('aria-hidden','true');old.className='motion-old-title';this.titleBox.prepend(old);
        const move={duration:480,easing:'cubic-bezier(.22,.67,.25,1)'};
        old.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY('+(-step*100)+'%)',opacity:0}],move).onfinish=()=>old.remove();
        title.animate([{transform:'translateY('+(step*100)+'%)',opacity:0},{transform:'translateY(0)',opacity:1}],move);
      }
      this.querySelector('.motion-place').textContent=a.setting;
      this.querySelector('.motion-count').textContent=String(this.index+1).padStart(2,'0')+' / '+activities.length;
      this.tray.innerHTML=a.photos.map((p,i)=>`<button type="button" class="motion-print" data-photo="${i}" aria-label="Enlarge photograph: ${p.caption}"><img src="${p.file}" decoding="async" alt="${p.caption}"></button>`).join('');
      this.updateScene();
    }

    async loadScene(stage,id,signal) {
      const source = new URL('motion/' + id + '.svg',document.baseURI);
      const frame = stage.attachShadow({mode:'open'});
      const style = document.createElement('style');
      style.textContent = ':host{display:block}svg,img{display:block;width:100%;height:100%}:host([data-still]) *{animation-play-state:paused!important}';
      frame.append(style);
      try {
        const response = await fetch(source,{signal});
        if(!response.ok)throw new Error('Illustration unavailable');
        const svg = new DOMParser().parseFromString(await response.text(),'image/svg+xml').documentElement;
        if(svg.localName!=='svg')throw new Error('Invalid illustration');
        if(signal.aborted)return;
        svg.querySelectorAll('image[href]').forEach(im=>im.setAttribute('href',new URL(im.getAttribute('href'),source).href));
        frame.append(document.importNode(svg,true));
        this.updateScene();
      } catch {
        if(signal.aborted)return;
        const img=document.createElement('img');img.alt='';img.src=source.href;frame.append(img);
      }
    }

    updateScene(){
      const scene=this.scenes.get(this.index);
      if(!scene)return;
      scene.toggleAttribute('data-still',!this.running);
      const svg=scene.shadowRoot?.querySelector('svg');
      if(svg){if(this.running)svg.unpauseAnimations();else svg.pauseAnimations();}
    }

    disconnectedCallback(){this.player.destroy();this.request.abort();}
  }
  customElements.define('activity-notebook',ActivityNotebook);
})();
