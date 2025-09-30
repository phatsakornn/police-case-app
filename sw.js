// ตั้งชื่อแคชและกำหนดไฟล์ที่ต้องการให้ทำงานแบบออฟไลน์
const CACHE_NAME = 'police-case-cache-v1';
const urlsToCache = [
  './',
  './Police_Case.html',
  'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js'
];

// Event: install - ติดตั้ง Service Worker และ Cache ไฟล์ที่จำเป็น
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event: fetch - จัดการกับการเรียกขอไฟล์
// ถ้ามีไฟล์ในแคชจะดึงจากแคช, ถ้าไม่มีจะไปดึงจากเน็ตเวิร์ค
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // ถ้าเจอไฟล์ใน Cache ให้ส่งกลับไปเลย
        if (response) {
          return response;
        }
        // ถ้าไม่เจอ ให้ไปดึงจาก Network
        return fetch(event.request);
      })
  );
});