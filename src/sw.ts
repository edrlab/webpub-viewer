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
    // Response from the cache immediately if possible, but also fetch an update.

    const cachedOrFetchedResponse = self.caches.open(CACHE_NAME).then((cache: any) => {
        return self.caches.match((event as any).request).then(cacheResponse => {
            const fetchPromise: Promise<any> = self.fetch((event as any).request).then((fetchResponse) => {
                cache.put((event as any).request, fetchResponse.clone());
                return fetchResponse;
            });
            return cacheResponse || fetchPromise;
        });
    });

    (event as any).respondWith(cachedOrFetchedResponse);
});
