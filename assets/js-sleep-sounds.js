// LINKS & CREDITS
// GOOGLE MATERIAL ICONS - https://fonts.google.com/icons
// RAIN - https://freesound.org/people/aesqe/sounds/37618/
// CHIMES - https://freesound.org/people/juskiddink/sounds/131979/
// CRIKETS - https://freesound.org/people/MrFossy/sounds/521843/

var ss = {
  // (A) HELPER FUNCTION TO GENERATE ERROR MESSAGE
  err : (msg) => {
    let row = document.createElement("div");
    row.className = "error";
    row.innerHTML = msg;
    document.body.prepend(row);
  },

  // (B) INITIALIZE - CHECKS
  init : () => {
    let pass = true;

    // (B1) REQUIREMENT - SERVICE WORKER
    if (!"serviceWorker" in navigator) {
      ss.err("Your browser does not support service workers.");
      pass = false;
    }

    // (B2) REQUIREMENT - CACHE STORAGE
    if (!"caches" in window) {
      ss.err("Your browser does not support cache storage.");
      pass = false;
    }

    // (B3) REQUIREMENT - AUDIO
    if (!"audio" in window) {
      ss.err("Your browser does not support HTML audio.");
      pass = false;
    }

    // (B4) SERVICE WORKER
    if (pass) {
      navigator.serviceWorker.register("js-sleep-sounds-sw.js")
      .then((reg) => { ss.draw(); })
      .catch((err) => {
        ss.err("Service worker init error - " + err.message);
        console.error(err);
      });
    }
  },

  // (C) AVAILABLE SOUNDS - FEEL FREE TO ADD YOUR OWN
  lib : [
    { name: "Rain", ico: "grain", src: "rain.mp3" },
    { name: "Chimes", ico: "notifications_active", src: "chimes.mp3" },
    { name: "Crickets", ico: "emoji_nature", src: "crickets.mp3" }
  ],

  // (D) DRAW SOUND BUTTONS
  draw : () => {
    let wrap = document.getElementById("cb-main");
    for (let sound of ss.lib) {
      sound.button = document.createElement("div");
      sound.button.className = "sound";
      sound.button.innerHTML = `<div class="mi">${sound.ico}</div><div class="name">${sound.name}</div>`;
      sound.button.onclick = () => { ss.preload(sound); };
      wrap.appendChild(sound.button);
    }
  },

  // (E) PRELOAD SOUND
  preload : (sound) => { if (sound.player == undefined) {
    // (E1) FADE ICON TO INDICATE "LOADING"
    let ico = sound.button.querySelector(".mi");
    ico.style.opacity = 0.5;

    // (E2) CHANGE ONCLICK TO DIRECTLY PLAY/PAUSE
    sound.button.onclick = () => { ss.toggle(sound); };

    // (E3) CREATE AUDIO OBJECT
    sound.player = new Audio("assets/" + sound.src);

    // (E4) LOOP SOUND
    sound.player.loop = true;
    sound.player.autoplay = true;

    // (E5) TOGGLE ICON HIGHLIGHT ON PLAY/PAUSE
    sound.player.onplay = () => {
      sound.button.classList.add("playing");
    };
    sound.player.onpause = () => {
      sound.button.classList.remove("playing");
    };

    // (E6) ON SOUND LOADED
    sound.player.oncanplaythrough = () => {
      // (E6-1) "UNFADE" ICON
      ico.style.opacity = 1;

      // (E6-2) START PLAYING NOW
      sound.player.play();
    };
  }},

  // (F) PLAY/PAUSE
  toggle : (sound) => {
    if (sound.player.paused) { sound.player.play(); }
    else { sound.player.pause(); }
  }
};

window.addEventListener("load", ss.init);
