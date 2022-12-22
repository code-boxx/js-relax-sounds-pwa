// (A) CREATE/INSTALL CACHE
self.addEventListener("install", evt => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open("JSSleep")
    .then(cache => cache.addAll([
      // (A1) APP
      "assets/favicon.png",
      "assets/icon-512.png",
      "assets/maticon.woff2",
      "assets/js-sleep-sounds.css",
      "assets/js-sleep-sounds.js",
      "CB-manifest.json",
      "js-sleep-sounds.html",
      // (A2) SOUNDS
      "assets/chimes.mp3",
      "assets/crickets.mp3",
      "assets/rain.mp3"
    ]))
    .catch(err => console.error(err))
  );
});
 
// (B) CLAIM CONTROL INSTANTLY
self.addEventListener("activate", evt => self.clients.claim());
 
// (C) LOAD FROM CACHE FIRST, FALLBACK TO NETWORK IF NOT FOUND
self.addEventListener("fetch", evt => evt.respondWith(
  caches.match(evt.request).then(res => res || fetch(evt.request))
));