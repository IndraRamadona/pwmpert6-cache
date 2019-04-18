var CACHE_NAME = 'indradona-cache';
var urlsToCache = [
//nama cache digunakan untuk memberi nama yang unik sehingga tidak terjadi nama cache yang sama
//kemudian kita juga buat variabel url untuk menjalankan cache
	'.',
	'index.html',
	'css/materialize.css',
	'css/materialize.min.css',
	'nav.html',
	'pages/home.html',
	'pages/image.html',
	'pages/about.html',
	'pages/contact.html',
	'pages/galeri.html',
	
];
// bagian ini digunakan untuk menginstall cache yang kita gunakan
	self.addEventListener('install', function(event) {
	event.waitUntil(
	caches.open(CACHE_NAME)
	.then(function(cache) {
	return cache.addAll(urlsToCache);
	})
	);
	// diguanakan untuk mencocokan event dengan data yang ada di dalam server, 
	//akan cache yang di punyai sama atau tidak
	self.addEventListener('fetch', function(event) {
	event.respondWith(
	caches.match(event.request)
	.then(function(response) {
		return response || fetchAndCache(event.request);
		})
		);
	});
	// digunakan untuk mengambil url
	function fetchAndCache(url) {
		return fetch(url)
		.then(function(response) {
		// jika utl tidak valid maka error
		if (!response.ok) {
		throw Error(response.statusText);
	}
	// digunakan untuk membuka cache dengan nama cahe yang kita gunakan tadi
	return caches.open(CACHE_NAME)
		.then(function(cache) {
		//kemudian jika nama cache yang kita ambil maka akan di respon 
		cache.put(url, response.clone());
		return response;
		});
		})
	.catch(function(error) {
		console.log('Request failed:', error);
		// You could return a custom offline 404 page here
	});
	}
});