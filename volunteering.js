(function () {
  'use strict';

  const folder = 'volunteering/';
  const bssArticle = 'https://www.bssnews.net/news-flash/258413';
  function picture(id, caption, width, credit = '') {
    return {file: folder + id + '.webp', caption, width, credit};
  }

  const photos = {
    kit: [picture('delegation-kit', 'The Brunei delegation jacket, Games lanyard and team pins', 1485)],
    letter: [{file: folder + 'brunei-letter.png', caption: 'Letter from H.R.H. Prince Haji Sufri Bolkiah', credit: 'Brunei Darussalam National Olympic Council · 1 May 2026', width: 665}],
    press: [picture('bss-arrival', 'The airport welcome for Chief Adviser Muhammad Yunus in Qionghai', 922, 'Government of Bangladesh, via Bangladesh Sangbad Sangstha · 26 March 2025')]
  };

  function photoButton(group, index, label, eager = false) {
    const photo = photos[group][index];
    return `<button class="vol-image" type="button" data-event-photo="${group}" data-photo-index="${index}" aria-label="Enlarge: ${photo.caption}"><img src="${photo.file}" alt="${photo.caption}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">${label ? '<span class="vol-zoom" aria-hidden="true">↗</span>' : ''}</button>`;
  }

  function letter() {
    return `<aside class="vol-letter" aria-labelledby="letter-heading"><div class="vol-letter-thumb">${photoButton('letter',0,true,true)}</div><div>
      <h3 id="letter-heading">A letter from Brunei</h3>
      <blockquote>“The professionalism and care provided ensured our stay was both productive and memorable.”</blockquote>
      <p class="vol-signature">H.R.H. Prince Haji Sufri Bolkiah<br>President, Brunei Darussalam National Olympic Council<br><time datetime="2026-05-01">1 May 2026</time></p>
      <div class="vol-letter-actions"><a href="volunteering/brunei-letter.png" target="_blank" rel="noopener">Open signed letter ↗</a><details><summary>Read transcript</summary><div class="vol-transcript"><p>Dear Ms. Yan,</p><p>I am writing to convey my sincere appreciation for the exceptional hospitality and support extended to me and my delegation during our time in Sanya for the 6th Asian Beach Games 2026.</p><p>The professionalism and care provided ensured our stay was both productive and memorable.</p><p>Please accept my best wishes for your continued success in all your future professional endeavors.</p><p>Yours Sincerely,<br>His Royal Highness Prince Sufri Bolkiah</p></div></details></div></div></aside>`;
  }

  function pressClipping() {
    return `<figure class="vol-clipping"><div class="vol-presshead"><img src="volunteering/bss-masthead.webp" alt="BSS News" width="461" height="61"><time datetime="2025-03-26">26 March 2025</time></div>
      <h3><a href="${bssArticle}" target="_blank" rel="noopener">CA arrives in Hainan to join Boao Forum meet</a></h3>
      ${photoButton('press',0,true)}
      <figcaption>Qionghai Bo’ao International Airport. Photo by the Government of Bangladesh, via BSS.</figcaption>
      <a class="vol-source" href="${bssArticle}" target="_blank" rel="noopener">Read the original report <span aria-hidden="true">↗</span></a></figure>`;
  }

  function renderPage() {
    return `<header class="vol-header"><h1 class="page-title">Volunteering</h1><nav aria-label="Volunteer events"><a href="#volunteering/sanya">Sanya 2026</a><a href="#volunteering/boao">Boao 2025</a></nav></header>
      <article class="vol-entry" id="jump-sanya" aria-labelledby="vol-sanya">
        <div class="vol-spread vol-games"><figure class="vol-kit">${photoButton('kit',0,true,true)}<figcaption>Brunei’s Olympic crest on the team jacket, with a Jordan pin on my Games lanyard.</figcaption></figure>
        <div class="vol-copy"><p class="vol-date">Sanya, Hainan <span>April–May 2026</span></p><h2 id="vol-sanya">The 6th Asian Beach Games</h2><p class="vol-role">Liaison Officer Assistant · Brunei Darussalam delegation</p>
        <p>My work with the Brunei delegation took me from the Athletes’ Village to the opening and closing ceremonies. In the village, I helped with day-to-day operations. For the ceremonies, I worked with the organizing team to coordinate the delegation’s participation.</p>
        ${letter()}</div></div>
      </article>
      <article class="vol-entry" id="jump-boao" aria-labelledby="vol-boao">
        <div class="vol-spread vol-boao"><div class="vol-copy"><p class="vol-date">Boao, Hainan <span>March–April 2025</span></p><h2 id="vol-boao">Boao Forum for Asia</h2><p class="vol-role">Liaison Officer Assistant · Bangladesh delegation</p>
        <p>I interpreted for the Bangladesh delegation and helped coordinate logistics for more than 30 media representatives and more than 20 diplomatic delegates.</p>
        <p>On 26 March, I was part of the airport welcome for Bangladesh’s Chief Adviser, Professor Muhammad Yunus. A photograph of that moment appeared in Bangladesh Sangbad Sangstha’s coverage of his arrival.</p></div>
        ${pressClipping()}</div>
      </article>`;
  }

  window.volunteerArchive = { renderPage, photos };
})();
