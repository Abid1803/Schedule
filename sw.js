
// sw.js
const CACHE_NAME = 'schedule-app-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

// Install event: Cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if available
        if (response) {
          return response;
        }
        // Fetch from network if not cached
        return fetch(event.request).catch(() => {
          // Optional: Return a fallback response if network fetch fails
          return new Response('Offline: Please check your connection.', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
  );
});
