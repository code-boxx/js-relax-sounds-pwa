// (A) CREATE/INSTALL CACHE
self.addEventListener("install", evt => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open("JSRelax")
    .then(cache => cache.addAll([
      "assets/favicon.png",
      "assets/icon-512.png",
      "assets/head-pwa-relax.webp",
      "assets/maticon.woff2",
      "assets/js-relax.css",
      "assets/js-relax-sounds.js",
      "assets/js-relax.js",
      "js-relax-manifest.json",
      "js-relax.html",
      "assets/bird.webm",
      "assets/campfire.webm",
      "assets/chimes.webm",
      "assets/crickets.webm",
      "assets/fountain.webm",
      "assets/rain.webm"
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