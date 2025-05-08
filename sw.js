self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => self.clients.claim());
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.open("medicatie-app").then(cache =>
      cache.match(e.request).then(
        resp => resp || fetch(e.request).then(res => {
          if (e.request.method === "GET" && e.request.url.startsWith(self.location.origin))
            cache.put(e.request, res.clone());
          return res;
        })
      )
    )
  );
});