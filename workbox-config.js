importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');


workbox.setConfig({ debug: false });

workbox.core.skipWaiting();
workbox.core.clientsClaim();


workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

workbox.routing.registerRoute(
    new workbox.routing.NavigationRoute(workbox.precaching.createHandlerBoundToURL("/index.html"))
);

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