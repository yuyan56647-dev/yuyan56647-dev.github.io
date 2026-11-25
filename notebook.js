(()=>{
  let dbPromise;
  const urls=new Set();
  const kinds = {travel:'Backpacking', hiking:'Hiking', cycling:'Cycling', diving:'Diving'};
  // Earlier versions saved the translated option label in the same database.
  const legacyKinds = {'\u80cc\u5305\u65c5\u884c':'travel','\u5f92\u6b65':'hiking','\u9a91\u884c':'cycling','\u6f5c\u6c34':'diving'};
  function releaseImages(){for(const url of urls)URL.revokeObjectURL(url);urls.clear();}
  window.addEventListener('hashchange',releaseImages);
  function openDb(){
    if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{
      const r=indexedDB.open('yu-yan-field-notes',1);
      r.onupgradeneeded=()=>r.result.createObjectStore('routes',{keyPath:'id',autoIncrement:true});
      r.onsuccess=()=>resolve(r.result);
      r.onerror=()=>reject(r.error);
    });
    return dbPromise;
  }
  async function run(mode,action){
    const db=await openDb();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('routes',mode);const request=action(tx.objectStore('routes'));
      tx.oncomplete=()=>resolve(request.result);tx.onabort=()=>reject(tx.error);tx.onerror=()=>reject(tx.error);
    });
  }
  function el(tag,text,cls){const v=document.createElement(tag);if(text)v.textContent=text;if(cls)v.className=cls;return v;}
  window.mountNotebook=root=>{
    root.innerHTML=`<details class="notebook"><summary>Route notebook</summary><p class="help">Save a route, a transport connection or a sight along the way. Notes and photos stay in this browser.</p><form class="note-form">
    <label>Route title<input required maxlength="100" name="title" placeholder="Start → finish"></label><label>Activity<select name="kind">${Object.entries(kinds).map(([id,label])=>`<option value="${id}">${label}</option>`).join('')}</select></label>
    <label>Departure date (optional)<input type="date" name="date"></label><label>Photo (optional)<input type="file" name="file" accept="image/*"></label><label class="full">Route notes<textarea name="notes" required rows="3" maxlength="8000" placeholder="How did you get there? Where would you stop again?"></textarea></label>
    <button class="button-ink" type="submit">Save draft →</button></form><p class="input-status" role="status"></p><div class="note-list"></div></details>`;
    const form=root.querySelector('form'),status=root.querySelector('.input-status'),list=root.querySelector('.note-list');
    async function loadItems(){
      try{
        const items=await run('readonly',s=>s.getAll());if(!root.isConnected)return;
        releaseImages();list.replaceChildren();
        for(const item of items.reverse()){
          const article=el('article');article.append(el('h3',item.title),el('small',[kinds[legacyKinds[item.kind] || item.kind] || item.kind,item.date].filter(Boolean).join(' · '),'date-type'),el('p',item.notes));
          if(item.file){const url=URL.createObjectURL(item.file),img=el('img');urls.add(url);img.src=url;img.alt=item.title+' · route photo';article.append(img);}
          const remove=el('button','Delete draft','soft-btn');
          remove.addEventListener('click',async()=>{try{await run('readwrite',s=>s.delete(item.id));await loadItems();status.textContent='Draft deleted.';}catch{status.textContent='The draft could not be deleted. Try again.';}});
          article.append(remove);list.append(article);
        }
      }catch{status.textContent='Saved drafts could not be read in this browser.';}
    }
    form.addEventListener('submit',async event=>{
      event.preventDefault();const values=new FormData(form),title=String(values.get('title')).trim(),notes=String(values.get('notes')).trim(),file=form.elements.file.files[0];
      if(!title||!notes){status.textContent='Enter a route title and notes.';return;}
      if(file&&!file.type.startsWith('image/')){status.textContent='Choose an image file.';return;}
      const button=form.querySelector('button');button.disabled=true;
      try{await run('readwrite',s=>s.add({title,notes,kind:values.get('kind'),date:values.get('date'),file:file||null}));form.reset();await loadItems();status.textContent='Draft saved in this browser.';}catch{status.textContent='The draft could not be saved. Check your browser storage or choose a smaller photo.';}finally{button.disabled=false;}
    });
    loadItems();
  };
})();
