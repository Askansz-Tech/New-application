self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('pixelheaven-v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/settings.html',
                '/bugs.html',
                '/sites.html',
                '/style.css',
                '/app.js',
                '/icon-192.png',
                '/icon-512.png'
            ]);
        })
    );
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => caches.match('/index.html'));
        })
    );
});
