importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');


workbox.setConfig({ debug: true });

self.skipWaiting();

workbox.routing.registerRoute(
    new RegExp(/\.(png|jpg)/),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'images',
    }),
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

if (workbox){
    console.log('registered');
    console.log(workbox);
}