const staticAssets = 'site6'
const assets = [
    '/',
    'index.html',
    'add-agent.html',
    'add-consignee.html',
    'add-container.html',
    'add-vessel.html',
    'gate-out.html',
    'manifest.json',
    'gate-in.html',
    'css/index.css',
    'css/styles.css',
]

//install sw
self.addEventListener('install', evt => {
    // console.log(evt);
    evt.waitUntil(caches.open(staticAssets)
        .then(c => {
            c.addAll(assets)
        }))
})

//activate sw
self.addEventListener('activate', evt => {
    // console.log(evt);
    evt.waitUntil(
        caches.keys()
        .then(key => {
            key.forEach(k => {
                if (k !== staticAssets) {
                    caches.delete(k)
                }
            })
        })
    )
})
// fetch event
self.addEventListener('fetch', evt => {
    // console.log(evt);
    evt.respondWith(
        caches.match(evt.request)
        .then(res => {
            return res || fetch(evt.request)
        })
    )
})