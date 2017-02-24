const CACHE_NAME = "webpub-viewer";

const urlsToCache: any = [
    "require.js",
    "fetch.js",
    "webpub-viewer.js",
    "index.html"
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
    const cachedOrFetchedResponse = self.caches.match((event as any).request).then(response => {
        return response || self.fetch((event as any).request);
    });
    (event as any).respondWith(cachedOrFetchedResponse);
});
