// (A) FILES TO CACHE
const cName = "JSSleep",
cFiles = [
  // (A1) ICONS + FONTS
  "assets/favicon.png",
  "assets/icon-512.png",
  "assets/maticon.woff2",
  // (A2) CSS
  "assets/js-sleep-sounds.css",
  // (A3) JS
  "assets/js-sleep-sounds.js",
  // (A4) MANIFEST
  "js-sleep-sounds.json",
  // (A5) PAGES
  "js-sleep-sounds.html",
  // (A6) SOUNDS
  "assets/chimes.mp3",
  "assets/crickets.mp3"
  "assets/rain.mp3"
];

// (B) CREATE/INSTALL CACHE
self.addEventListener("install", (evt) => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open(cName)
    .then((cache) => { return cache.addAll(cFiles); })
    .catch((err) => { console.error(err) })
  );
});

// (C) LOAD FROM CACHE, FALLBACK TO NETWORK IF NOT FOUND
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request)
    .then((res) => { return res || fetch(evt.request); })
  );
});
