self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installing Service Worker...");
    self.skipWaiting();
  });
  
  self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activating Service Worker...");
  });
  
  self.addEventListener("fetch", (event) => {
    // You can customize this to cache things
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  