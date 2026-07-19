const CACHE_NAME = 'yas-city-v4';
const APP_SHELL = [
    '/',
    '/index.html',
    '/maintenance.html',
    '/customer-service.html',
    '/online.html',
    '/manifest.json',
    '/config.js',
    '/assets/css/style.css',
    '/assets/js/script.js',
    '/assets/js/inquiries.js',
    '/assets/js/devices-db.js',
    '/assets/js/trade-in.js',
    '/assets/js/cms.js',
    '/assets/js/pwa.js',
    '/assets/js/analytics.js',
    '/assets/js/customer-service.js',
    '/assets/icons/icon-192.png',
    '/assets/images/logo.jpeg'
];

const NETWORK_FIRST = ['/api/'];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            Promise.all(
                APP_SHELL.map((url) =>
                    cache.add(url).catch((err) => console.warn('Cache skip:', url, err))
                )
            )
        )
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const url = event.request.url;

    if (
        url.includes('supabase.co') ||
        url.includes('googleapis.com') ||
        url.includes('googletagmanager.com') ||
        url.includes('google-analytics.com') ||
        url.includes('cdn.jsdelivr.net') ||
        url.includes('cdnjs.cloudflare.com')
    ) {
        event.respondWith(fetch(event.request));
        return;
    }

    if (NETWORK_FIRST.some((prefix) => url.includes(prefix))) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request).then((response) => {
                if (!event.request.url.startsWith('http') || response.status !== 200) {
                    return response;
                }
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                return response;
            });
        })
    );
});
