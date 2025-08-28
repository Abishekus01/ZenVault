const CACHE_NAME = 'zenvault-cache-v1';
const urlsToCache = [
  './index.html',
  './dashboard.html',
  './styles.css',
  './login.js',
  './dashboard.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
