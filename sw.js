// Service Worker v189 - Update Home Screen slides and fix Upcoming Events header UI
const CACHE_VERSION = 'v189';

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install', CACHE_VERSION);
    // Force this SW to become active immediately
    e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activate', CACHE_VERSION);
    // Delete ALL old caches to force fresh code load
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    console.log('[Service Worker] Deleting old cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    // Network-first: always fetch fresh, never serve stale cache
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
