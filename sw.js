const CACHE_NAME = "famzykings-cache-v13";

const urlsToCache = [
  "/",
  "/index.html",
  "/portfolio.html",
  "/contact-me.html",
  "/fashion-page.html",
  "/crypto-investment.html",
  "/kings-hairwig.html",
  "/manifest.json",

  // CSS
  "/css/style.css",
  "/css/contactme.css",
  "/css/cryptoinvestment.css",
  "/css/fashionpage.css",
  "/css/kingshairwig.css",
  "/css/portfolio.css",
  "/css/bootstrap.min.css",
  "/css/all.min.css",

  // Main Images
  "/img/hero kings.jpg",
  "/img/kings hero.jpg",
  "/img/logo change.png",
  "/img/icon-192.png",
  "/img/icon-512.png",
  
  "/img/crypto.png",
  "/img/crypto1.png"
  "/img/crypto2.png"
  "/img/crypto3.png"
  "/img/crypto4.png",
  "/img/crypto5.png"
  "/img/crypto6.png"
  "/img/crypto7.png"
  "/img/crypto8.png"

  "/img/fashion3.png"
  "/img/fashion2.png"
  "/img/fashion6.png"
  "/img/fashion7.png"
  "/img/fashion5.png"

  "/img/kinghair1.png"
  "/img/kingshair2.png"
  "/img/kinghair3.png"
  "/img/kinghair4.png"
  "/img/kinghair5.png"

  // Project Images
  "/img/fashion.png",
  "/img/fashion1.jpg",
  "/img/kingshair.png",
  "/img/crypto.png",

  "/img/github.jpg",
  "/img/bootstrap.jpg",
  "/img/html.jpg",
  "/img/js.jpg",
  "/img/css.jpg",
  "/img/laravel.jpg",
  "/img/php.jpg",
  "/img/mysql.jpg",

];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );

  self.skipWaiting(); // force new SW immediately
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  return self.clients.claim();
});

// FETCH (NETWORK FIRST — FIXES YOUR ISSUE)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
