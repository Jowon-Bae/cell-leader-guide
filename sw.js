// Basic Service Worker to enable PWA installation (v4)
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
});

self.addEventListener('fetch', (e) => {
    // Pass through all requests - basic implementation
    e.respondWith(fetch(e.request));
});
