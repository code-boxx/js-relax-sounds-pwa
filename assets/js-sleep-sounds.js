// LINKS & CREDITS
// GOOGLE MATERIAL ICONS - https://fonts.google.com/icons
// RAIN - https://freesound.org/people/aesqe/sounds/37618/
// CHIMES - https://freesound.org/people/juskiddink/sounds/131979/
// CRIKETS - https://freesound.org/people/MrFossy/sounds/521843/
// CAMPFIRE - https://freesound.org/people/aerror/sounds/350757/

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
    navigator.serviceWorker.register("CB-worker.js")
    .then(reg => ss.draw())
    .catch(err => {
      alert(err.message);
      console.error(err);
    });
  },

  // (B) AVAILABLE SOUNDS - FEEL FREE TO ADD YOUR OWN
  sounds : [
    { name: "Rain", ico: "grain", src: "rain.mp3" },
    { name: "Chimes", ico: "notifications_active", src: "chimes.mp3" },
    { name: "Crickets", ico: "emoji_nature", src: "crickets.mp3" },
    { name: "Campfire", ico: "local_fire_department", src: "campfire.mp3" }
  ],

  // (C) DRAW SOUND BUTTONS
  draw : () => {
    let wrap = document.getElementById("cb-main");
    for (let sound of ss.sounds) {
      sound.button = document.createElement("div");
      sound.button.className = "sound";
      sound.button.innerHTML = `<div class="mi">${sound.ico}</div>
      <div class="name">${sound.name}</div>`;
      sound.button.onclick = () => ss.preload(sound);
      wrap.appendChild(sound.button);
    }
  },

  // (D) PRELOAD SOUND
  preload : sound => { if (sound.player == undefined) {
    // (D1) FADE ICON TO INDICATE "LOADING"
    let ico = sound.button.querySelector(".mi");
    ico.style.opacity = 0.5;

    // (D2) CHANGE ONCLICK TO DIRECTLY PLAY/PAUSE
    sound.button.onclick = () => ss.toggle(sound);

    // (D3) CREATE AUDIO OBJECT
    sound.player = new Audio("assets/" + sound.src);

    // (D4) LOOP SOUND
    sound.player.loop = true;
    sound.player.autoplay = true;

    // (D5) TOGGLE ICON HIGHLIGHT ON PLAY/PAUSE
    sound.player.onplay = () => sound.button.classList.add("playing");
    sound.player.onpause = () => sound.button.classList.remove("playing");

    // (D6) ON SOUND LOADED
    sound.player.oncanplaythrough = () => {
      // (D6-1) "UNFADE" ICON
      ico.style.opacity = 1;

      // (D6-2) START PLAYING NOW
      sound.player.play();
    };
  }},

  // (E) PLAY/PAUSE
  toggle : sound => {
    if (sound.player.paused) { sound.player.play(); }
    else { sound.player.pause(); }
  }
};
window.onload = ss.init;