const cacheName = "Ifsc-Feira De Jogos-1.1";
const contentToCache = [
    "Build/FeiraDejogos1.1.loader.js",
    "Build/FeiraDejogos1.1.framework.js.gz",
    "Build/FeiraDejogos1.1.data.gz",
    "Build/FeiraDejogos1.1.wasm.gz",
    "TemplateData/style.css",
    "TemplateData/Banco-Imagem.png",
    "TemplateData/progress-bar-empty-dark.png",
    "TemplateData/progress-bar-empty-light.png",
    "TemplateData/progress-bar-full-dark.png",
    "TemplateData/progress-bar-full-light.png",
    "TemplateData/unity-logo-dark.png",
    "TemplateData/unity-logo-light.png",
    //icones duplicados no repositório?
    "TemplateData/icons/unity-logo-dark.png",
    "TemplateData/icons/unity-logo-light.png",
    "StreamingAssets/UnityServicesProjectConfiguration.json",
    "jogos/arcade/0/logo.png",
    "jogos/arcade/1/logo.png",
    "jogos/arcade/2/logo.png",
    "jogos/arcade/3/logo.png",
];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
