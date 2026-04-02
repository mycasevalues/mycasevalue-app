const CACHE_NAME = 'mcv-v10';
const STATIC_CACHE = 'mcv-static-v10';
const API_CACHE = 'mcv-api-v8';

const STATIC_ASSETS = [
  '/favicon.svg',
  '/logo.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json',
  '/fonts/outfit-700.woff2',
  '/fonts/jetbrains-mono-500.woff2',
];

// Install: cache static assets and activate immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: delete ALL old caches to bust stale content
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, API_CACHE, CACHE_NAME];
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => !currentCaches.includes(key))
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Push notification event: parse data and show notification
self.addEventListener('push', (event) => {
  if (!event.data) {
    console.log('[SW] Push received with no data');
    return;
  }

  try {
    const data = event.data.json();
    const { title, body, icon, badge, tag, actions, url } = data;

    const notificationOptions = {
      body: body || '',
      icon: icon || '/icon-192.png',
      badge: badge || '/logo.svg',
      tag: tag || 'default',
      actions: actions || [],
      data: { url: url || '/' },
      requireInteraction: false,
    };

    event.waitUntil(
      self.registration.showNotification(title || 'Notification', notificationOptions)
    );
  } catch (err) {
    console.error('[SW] Failed to parse push notification data:', err);
  }
});

// Notification click event: handle user interaction
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';
  const tag = event.notification.tag;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if app is already open in a window
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // App not open, open a new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Notification close event: track dismissal
self.addEventListener('notificationclose', (event) => {
  const { tag, data } = event.notification;
  console.log('[SW] Notification dismissed:', { tag, url: data?.url });
  // Could send analytics here if needed
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // API calls: network-first with 5s timeout, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      Promise.race([
        fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(API_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000)),
      ]).catch(() => caches.match(request))
    );
    return;
  }

  // _next/static: cache-first (immutable hashed assets — new deploys use new filenames)
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Fonts: cache-first
  if (url.pathname.startsWith('/fonts/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // HTML pages: network-first (always get fresh HTML, fall back to cache offline)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      }).catch(() => caches.match(request))
    );
    return;
  }

  // Everything else: network-first with cache fallback
  event.respondWith(
    fetch(request).then((response) => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
      return response;
    }).catch(() => caches.match(request))
  );
});
