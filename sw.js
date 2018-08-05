console.log("Hello Service Worker!");

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('JohnyCache4').then(function(cache) {
            return cache.addAll([
                '/',
                '/restaurant.html',
                './js/dbhelper.js',
                './js/main.js',
                './js/restaurant_info.js',
                './img/',
                './css/responsive.css',
                './css/styles.css',
                './data/restaurants.json',
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.delete('JohnyCache3')
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
            // else if (event.request.url.endsWith('.jpg') && response.status == 404) return fetch('/img/offline.jpg');
            return fetch(event.request);
        })
    )
})