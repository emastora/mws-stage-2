console.log("Hello Service Worker!");

const version = 2;
const appCacheName = `cache-v${version}`;

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(appCacheName).then(function(cache) {
            console.log('Service Worker installed');
            return cache.addAll([
                './',
                'index.html',
                'restaurant.html',
                'manifest.json',
                'build/js/app.js',
                'build/js/dbhelper.js',
                'build/js/main.js',
                'build/js/restaurant_info.js',
                'build/js/idb.js',
                'build/css/styles.css',
                'build/css/responsive.css',
                'assets/icons/favicon.ico'
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (appCacheName.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.method === 'GET') {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(function(response) {
                    return response;
                }).catch(function(error) {
                    throw error;
                });
            }).catch(function() {
                return new Response('No cache');
            })
        );
    }

});