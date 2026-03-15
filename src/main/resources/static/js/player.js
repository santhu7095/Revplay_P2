/* ───────────── REVPLAY GLOBAL PLAYER ───────────── */

(function(){

const audio    = document.getElementById('globalAudio');
const bp       = document.getElementById('bp');
const bpPlay   = document.getElementById('bpPlay');
const bpRew    = document.getElementById('bpRew');
const bpFwd    = document.getElementById('bpFwd');
const bpFill   = document.getElementById('bpFill');
const bpCur    = document.getElementById('bpCur');
const bpDur    = document.getElementById('bpDur');
const bpBar    = document.getElementById('bpBar');
const bpVolBtn = document.getElementById('bpVolBtn');
const bpVolSl  = document.getElementById('bpVolSlider');
const bpTitle  = document.getElementById('bpTitle');
const bpArtist = document.getElementById('bpArtist');
const bpArtEl  = document.getElementById('bpArt');

if(!audio) return;

/* time formatter */

function fmt(s){
  if(!s || isNaN(s)) return "0:00";
  return Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,'0');
}

/* restore state */

let state = {};
try{
  state = JSON.parse(sessionStorage.getItem("revplay_player")||"{}");
}catch(e){}

if(state.src){

  audio.src = state.src;
  audio.volume = state.volume ?? 1;

  bpVolSl.value = audio.volume;

  bpTitle.textContent  = state.title  || "No song playing";
  bpArtist.textContent = state.artist || "—";
  bpArtEl.innerHTML    = state.cover ? `<img src="${state.cover}">` : "♪";

  if(audio.readyState >= 1){
    if(state.currentTime) audio.currentTime = state.currentTime;
    bpDur.textContent = fmt(audio.duration);
    if(state.playing) audio.play().catch(()=>{});
  }
  else{
    audio.addEventListener("loadedmetadata",()=>{
      if(state.currentTime) audio.currentTime = state.currentTime;
      bpDur.textContent = fmt(audio.duration);
      if(state.playing) audio.play().catch(()=>{});
    },{once:true});
  }

}

/* save player state */

function saveState(){

  sessionStorage.setItem("revplay_player",JSON.stringify({

    src:audio.src,
    title:bpTitle.textContent,
    artist:bpArtist.textContent,
    cover:state.cover||"",
    songId:state.songId,

    currentTime:audio.currentTime,
    volume:audio.volume,
    playing:!audio.paused

  }));

}

/* progress */

audio.addEventListener("timeupdate",()=>{

  if(!audio.duration) return;

  const pct = (audio.currentTime/audio.duration)*100;

  bpFill.style.width = pct+"%";

  bp.style.setProperty("--bp-pct",pct+"%");

  bpCur.textContent = fmt(audio.currentTime);

  saveState();

});

/* metadata */

audio.addEventListener("loadedmetadata",()=>{
  bpDur.textContent = fmt(audio.duration);
});

/* play pause */

audio.addEventListener("play",()=>{
  bpPlay.innerHTML = '<i class="bi bi-pause-fill"></i>';
  saveState();
});

audio.addEventListener("pause",()=>{
  bpPlay.innerHTML = '<i class="bi bi-play-fill"></i>';
  saveState();
});

audio.addEventListener("ended",()=>{
  bpPlay.innerHTML = '<i class="bi bi-play-fill"></i>';
  saveState();
});

/* controls */

bpPlay?.addEventListener("click",()=>{
  audio.paused ? audio.play() : audio.pause();
});

bpRew?.addEventListener("click",()=>{
  audio.currentTime = Math.max(0,audio.currentTime-10);
});

bpFwd?.addEventListener("click",()=>{
  audio.currentTime = Math.min(audio.duration||0,audio.currentTime+10);
});

/* seek */

bpBar?.addEventListener("click",e=>{

  if(!audio.duration) return;

  const r = bpBar.getBoundingClientRect();

  audio.currentTime =
    ((e.clientX-r.left)/r.width) * audio.duration;

});

/* volume */

let lastVol = 1;

function setVol(v){

  audio.volume = Math.max(0,Math.min(1,v));

  bpVolSl.value = audio.volume;

  const icon =
    audio.volume===0
      ? "volume-mute-fill"
      : audio.volume<.5
        ? "volume-down-fill"
        : "volume-up-fill";

  bpVolBtn.innerHTML = `<i class="bi bi-${icon}"></i>`;

}

bpVolSl?.addEventListener("input",e=>{
  setVol(parseFloat(e.target.value));
});

bpVolBtn?.addEventListener("click",()=>{

  audio.volume>0
    ? (lastVol=audio.volume,setVol(0))
    : setVol(lastVol);

});

})();