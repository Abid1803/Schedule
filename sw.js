self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Activated');
});

self.addEventListener('push', function(event) {
  const data = event.data.json();
  const title = data.title || 'Reminder';
  const options = {
    body: data.body,
    icon: 'icon.png', // optional
    badge: 'badge.png' // optional
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
