importScripts('/web/uv/uv.bundle.js');
importScripts('/web/uv/uv.config.js');
importScripts('/web/uv/uv.sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));
