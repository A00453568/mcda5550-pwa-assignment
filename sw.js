const CACHE_NAME = 'pwa-cache-01';
const assets = [
    '/',
    '/index.html',
    '/script.js',
    '/icons/smu-icon-96x96.png',
    '/styles.css',
    '/db.js',
    '/favicon.ico',
    '/manifest.json'
]

// install service worker
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(assets)
            })
    );
    console.log("clients claim:")
    console.log(self.clients.claim())
    //return self.clients.claim();
});


const clearOldCaches = async () => {
    const keys = await caches.keys();
    return await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key_1 => {
        console.log('[sw] remove cache', key_1);
        caches.delete(key_1);
    }));
};

// activate service worker
// Delete outdated caches
self.addEventListener('activate', function (event) {
    event.waitUntil(
        clearOldCaches().then(() => self.clients.claim()) 
        );
    console.log('ServiceWorker activated', event);
});


// return cached response or fetch if fail
// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function (res) {
//                 return res || fetch(event.request);
//             })
//     );
// });

const addToCache = (request, response) => {
    caches.open(CACHE_NAME).then(cache => cache.put(request, response));
};

// Respond with cached resources
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return (response && new Promise((resolve) => {
                    // Resolve the response
                    resolve(response);
                    // Fetch the request
                    fetch(event.request).then(res => {
                        // And cache it
                        addToCache(event.request, res)
                    });
                })) || fetch(event.request).then(res => {
                    let clone = res.clone();
                    addToCache(event.request, clone);
                    return res;
                });
        })
    );
});

// On network response
// If a request doesn't match anything in the cache, get it from the network, send it to the page and add it to the cache at the same time.
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open('mysite-dynamic').then(function(cache) {
//       return cache.match(event.request).then(function (response) {
//         return response || fetch(event.request).then(function(response) {
//           cache.put(event.request, response.clone());
//           return response;
//         });
//       });
//     })
//   );
// });