const CACHE_NAME = "webpub-viewer";

const urlsToCache: any = [
    "require.js",
    "fetch.js",
    "webpub-viewer.js",
    "index.html",
    "main.css"
];

self.addEventListener('install', event => {
    const urlsCached = self.caches.open(CACHE_NAME).then((cache: any) => {
        return cache.addAll(urlsToCache);
    });
    (event as any).waitUntil(urlsCached);
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    const cachedResponse = self.caches.match((event as any).request).then(response => {
        return response || Promise.reject("not cached");
    });

    const update = self.caches.open(CACHE_NAME).then((cache: any) => {
        return self.fetch((event as any).request).then((response: any) => {
            return cache.put((event as any).request, response);
        });
    });

    (event as any).respondWith(cachedResponse);
    (event as any).waitUntil(update);
});
