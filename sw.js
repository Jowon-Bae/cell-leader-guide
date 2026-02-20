// Basic Service Worker to enable PWA installation (v168)
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    self.skipWaiting(); // Force activation
});

self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activate');
    e.waitUntil(self.clients.claim()); // Force control over clients
});

self.addEventListener('fetch', (e) => {
    // Pass through all requests - basic implementation
    e.respondWith(fetch(e.request));
});
