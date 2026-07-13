const CACHE_NAME = 'yas-city-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/logo.jpeg',
    '/config.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching app shell');
                return Promise.all(
                    ASSETS.map(url => {
                        return cache.add(url).catch(err => console.log('Failed to cache:', url, err));
                    })
                );
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    
    // API calls to supabase or google apis shouldn't be heavily cached offline, but we do standard network-first or cache-first. Here, simple cache-first for assets.
    if(event.request.url.includes('supabase.co') || event.request.url.includes('googleapis.com')) {
         event.respondWith(fetch(event.request));
         return;
    }

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request).then(response => {
                // Ignore caching for non-http requests like chrome-extension://
                if (!event.request.url.startsWith('http')) return response;
                
                let responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
                return response;
            });
        }).catch(() => {
            console.log('Offline and asset not in cache:', event.request.url);
        })
    );
});
