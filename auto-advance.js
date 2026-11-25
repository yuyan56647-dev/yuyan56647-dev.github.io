// Both slideshows keep their place while off screen or while a photograph is open.
export function autoAdvance(element,delay,advance,onState) {
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused=media.matches,visible=false,disposed=false,timer;
  function restart() {
    clearTimeout(timer);
    if(disposed)return;
    const running=visible&&!document.hidden&&!paused;
    onState({running,paused,reduced:media.matches});
    if(running)timer=setTimeout(()=>{
      if(!document.querySelector('dialog[open]')&&!element.querySelector('.motion-print:focus-visible,.map-album:focus-visible,select:focus'))advance();
      restart();
    },delay);
  }
  function preference(){paused=media.matches;restart();}
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;restart();});
  observer.observe(element);
  media.addEventListener('change',preference);
  document.addEventListener('visibilitychange',restart);
  restart();
  return {
    restart,
    pause(){paused=true;restart();},
    toggle(){paused=!paused;restart();},
    destroy(){disposed=true;clearTimeout(timer);observer.disconnect();media.removeEventListener('change',preference);document.removeEventListener('visibilitychange',restart);}
  };
}
