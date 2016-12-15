const CACHE_NAME = "webpub-viewer";

const urlsToCache: any = [
    "../../dist/webpub-viewer.js",
];

self.addEventListener('install', event => {
    let urlsCached = self.caches.open(CACHE_NAME).then((cache: any) => {
        return cache.addAll(urlsToCache);
    });
    (event as any).waitUntil(urlsCached);
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    let cachedOrFetchedResponse = self.caches.match((event as any).request).then(response => {
        return response || self.fetch((event as any).request);
    });
    (event as any).respondWith(cachedOrFetchedResponse);
});
