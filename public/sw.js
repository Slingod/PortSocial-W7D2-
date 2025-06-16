const cacheName = 'portfolio-v1';
const assets = ['/', '/index.html', '/assets/index.js', '/assets/index.css'];

self.addEventListener('install', e =>
  e.waitUntil(caches.open(cacheName).then(c=>c.addAll(assets)))
);

self.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(res=>res||fetch(e.request)))
);
