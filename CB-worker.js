// (A) FILES TO CACHE
const cName = "JSSleep",
cFiles = [
  // (A1) ICONS + FONTS
  "assets/favicon.png",
  "assets/icon-512.png",
  "assets/maticon.woff2",
  // (A2) APP
  "assets/js-sleep-sounds.css",
  "assets/js-sleep-sounds.js",
  "CB-manifest.json",
  "js-sleep-sounds.html",
  // (A3) SOUNDS
  "assets/chimes.mp3",
  "assets/crickets.mp3",
  "assets/rain.mp3"
];

// (B) CREATE/INSTALL CACHE
self.addEventListener("install", evt => evt.waitUntil(
  caches.open(cName)
  .then(cache => cache.addAll(cFiles))
  .catch(err => console.error(err))
));

// (C) LOAD FROM CACHE FIRST, FALLBACK TO NETWORK IF NOT FOUND
self.addEventListener("fetch", evt => evt.respondWith(
  caches.match(evt.request).then(res => res || fetch(evt.request))
));