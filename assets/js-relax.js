var ss = {
  // (A) INITIALIZE
  init : () => {
    // (A1) CHECK - AUDIO
    if (!"audio" in window) {
      alert("Your browser does not support HTML audio.");
      return;
    }

    // (A2) CHECK - SERVICE WORKER
    if (!"serviceWorker" in navigator) {
      alert("Your browser does not support service workers.");
      return;
    }

    // (A3) CHECK - CACHE STORAGE
    if (!"caches" in window) {
      alert("Your browser does not support cache storage.");
      return;
    }

    // (A4) REGISTER SERVICE WORKER
    navigator.serviceWorker.register("js-relax-worker.js");

    // (A5) DRAW HTML SOUND BUTTONS
    let wrap = document.getElementById("sWrap");
    for (let sound of sounds) {
      let button = document.createElement("div");
      button.className = "sound";
      button.innerHTML = `<div class="mi">${sound.ico}</div>
      <div class="control">
        <div class="name">${sound.name}</div>
        <input class="vol" type="range" min="0.1" max="1" step="0.1" value="1" disabled>
      </div>`;
      sound.hIco = button.querySelector(".mi");
      sound.hVol = button.querySelector(".vol");
      sound.hIco.onclick = () => ss.preload(sound);
      wrap.appendChild(button);
    }
  },

  // (B) PRELOAD SOUND
  preload : sound => {
    // (B1) FADE ICON TO INDICATE "NOW LOADING"
    sound.hIco.style.opacity = 0.5;
    sound.hIco.onclick = "";

    // (B2) CREATE AUDIO OBJECT
    sound.player = new Audio("assets/" + sound.src);
    sound.player.loop = true;
    sound.player.autoplay = true;

    // (B3) ON SOUND LOADED
    sound.player.oncanplaythrough = () => {
      // (B3-1) SET CSS ON PLAY/PAUSE
      sound.player.onplay = () => sound.hIco.classList.add("playing");
      sound.player.onpause = () => sound.hIco.classList.remove("playing");

      // (B3-2) CLICK BUTTON TO PLAY/PAUSE
      sound.hIco.onclick = () => ss.toggle(sound);

      // (B3-3) ENABLE VOLUME CONTROL
      sound.hVol.onchange = () => sound.player.volume = sound.hVol.value;
      sound.hVol.disabled = false;

      // (B3-4) "UNFADE" ICON + START PLAYING NOW
      sound.hIco.style.opacity = 1;
      sound.hIco.classList.add("playing");
      sound.player.play();
    };

    // (B4) ATTACH SOUND SOURCE - START LOAD
    sound.player.src = "assets/" + sound.src;
  },

  // (C) PLAY/PAUSE
  toggle : sound => {
    if (sound.player.paused) { sound.player.play(); }
    else { sound.player.pause(); }
  }
};
window.onload = ss.init;