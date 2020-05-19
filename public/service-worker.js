importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');


workbox.setConfig({ debug: true });

workbox.core.skipWaiting();
workbox.core.clientsClaim();


workbox.precaching.precacheAndRoute([{"revision":"3ec6e0f19d26ab9f2a224ecb3928d669","url":"icons/icon-128x128.png"},{"revision":"79a782b4adffafbe68589f8297e933dc","url":"icons/icon-16x16.png"},{"revision":"da1e5f909bcc07602b5897d79a468463","url":"icons/icon-24x24.png"},{"revision":"d1694d680a1151525b0f2baca377d4db","url":"icons/icon-256x256.png"},{"revision":"ad6c82c195b3e99ee9932a2f9ddda192","url":"icons/icon-32x32.png"},{"revision":"40f08f1450ce4f7a77224f1763dc54f2","url":"icons/icon-512x512.png"},{"revision":"04530015428ca219fc497a9df9553db6","url":"icons/icon-64x64.png"},{"revision":"a1aa1ea042f6cdfb15e1c48469da62d2","url":"index.html"},{"revision":"02463b1e881cb56920d4b3bcd022db0d","url":"manifest.json"},{"revision":"fa1ded1ed7c11438a9b0385b1e112850","url":"robots.txt"}]);



workbox.routing.registerRoute(
    new RegExp(/\.(png|jpg|svg)/),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'images',
    }),
);


workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [

        ]
    })
);




//Add google font to workbox
workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
)

workbox.routing.registerRoute(
    ({ url }) => {

        return url.origin === 'https://fonts.gstatic.com'
    },
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 10
            })
        ]
    })
);

//Cache shopping image
workbox.routing.registerRoute(
    ({ url }) => {
        return url.origin === "https://shopping-phinf.pstatic.net"
    },
    new workbox.strategies.CacheFirst({
        cacheName: 'shopping-images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 100
            })
        ]
    })
)

//Cache recommends request: available for 2 days
workbox.routing.registerRoute(
    ({ url }) => {
        return url.origin === "https://us-central1-shopnow-118fe.cloudfunctions.net" && url.pathname === "/getRecommends"
    },
    new workbox.strategies.CacheFirst({
        cacheName: 'recommends-cache',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 48
            })
        ]
    })
)


workbox.routing.registerRoute(
    ({ url }) => (
        url.origin === "https://us-central1-shopnow-118fe.cloudfunctions.net" && url.pathname === "/getCategories"
    ),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'categories',
        plugins: [

        ]
    })
)