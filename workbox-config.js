importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');


workbox.routing.registerRoute(
    new RegExp(/\.(png|jpg)/),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'images',
    }),
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
    ({ url, request }) => {
        console.log(url);
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

//Cache recommends request
workbox.routing.registerRoute(
    ({ url, request }) => {
        console.log(url);
        return url.origin === "https://us-central1-shopnow-118fe.cloudfunctions.net" && url.pathname === "/getRecommends"
    },
    new workbox.strategies.CacheFirst({
        cacheName: 'recommends-cache'
    })
)

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

if (workbox) {
    console.log('registered');
    console.log(workbox);
}