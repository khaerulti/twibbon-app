// Mendapatkan elemen-elemen dari DOM
const uploadPhoto = document.getElementById('upload-photo'); // Elemen input untuk foto utama
const uploadTwibbon = document.getElementById('upload-twibbon'); // Elemen input untuk Twibbon
const posXInput = document.getElementById('pos-x'); // Elemen input untuk posisi X
const posYInput = document.getElementById('pos-y'); // Elemen input untuk posisi Y
const zoomInput = document.getElementById('zoom'); // Elemen input untuk zoom
const rotationInput = document.getElementById('rotation'); // Elemen input untuk rotasi
const canvas = document.getElementById('canvas'); // Elemen canvas untuk menggambar hasil
const ctx = canvas.getContext('2d'); // Mengambil konteks canvas untuk menggambar
const downloadButton = document.getElementById('download'); // Tombol untuk mendownload gambar

let photo = new Image(); // Objek gambar untuk foto utama
let twibbon = new Image(); // Objek gambar untuk Twibbon
let photoWidth, photoHeight; // Variabel untuk lebar dan tinggi foto utama
let twibbonWidth, twibbonHeight; // Variabel untuk lebar dan tinggi Twibbon
let posX = 0, posY = 0, zoom = 1, rotation = 0; // Variabel posisi, zoom, dan rotasi

// Fungsi untuk menggambar di canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Membersihkan canvas setiap kali digambar ulang

  // Gambar foto utama dengan zoom dan rotasi
  const scaledPhotoWidth = photoWidth * zoom;
  const scaledPhotoHeight = photoHeight * zoom;

  ctx.save(); // Menyimpan status canvas
  ctx.translate(canvas.width / 2, canvas.height / 2);  // Set center as origin for rotation
  ctx.rotate(rotation * Math.PI / 180);  // Mengonversi derajat rotasi menjadi radian
  ctx.drawImage(photo, -scaledPhotoWidth / 2 + posX, -scaledPhotoHeight / 2 + posY, scaledPhotoWidth, scaledPhotoHeight);
  ctx.restore(); // Mengembalikan status canvas setelah rotasi

  // Gambar Twibbon di tengah canvas dengan ukuran tetap 600px
  twibbonWidth = 600;
  twibbonHeight = 600;
  const twibbonX = (canvas.width - twibbonWidth) / 2;
  const twibbonY = (canvas.height - twibbonHeight) / 2;
  ctx.drawImage(twibbon, twibbonX, twibbonY, twibbonWidth, twibbonHeight);
}

// Fungsi untuk menangani unggahan Twibbon
uploadTwibbon.addEventListener('change', function(e) {
  const file = e.target.files[0]; // Mendapatkan file yang diunggah
  if (file) {
    const reader = new FileReader(); // Membaca file yang diunggah
    reader.onload = function(event) {
      twibbon.onload = function() {
        draw(); // Menggambar Twibbon dan foto utama setelah Twibbon berhasil diunggah
        alert("Twibbon berhasil diunggah!"); // Menampilkan alert saat Twibbon diunggah
        uploadPhoto.disabled = false; // Mengaktifkan upload foto utama
        posXInput.disabled = false; // Mengaktifkan pengaturan posisi X
        posYInput.disabled = false; // Mengaktifkan pengaturan posisi Y
        zoomInput.disabled = false; // Mengaktifkan pengaturan zoom
        rotationInput.disabled = false; // Mengaktifkan pengaturan rotasi
        downloadButton.disabled = false; // Mengaktifkan tombol unduh
      };
      twibbon.src = event.target.result; // Menyimpan sumber Twibbon
    };
    reader.readAsDataURL(file); // Membaca file sebagai data URL
  }
});

// Fungsi untuk menangani unggahan foto utama
uploadPhoto.addEventListener('change', function(e) {
  const file = e.target.files[0]; // Mendapatkan file yang diunggah
  if (file) {
    const reader = new FileReader(); // Membaca file yang diunggah
    reader.onload = function(event) {
      photo.onload = function() {
        photoWidth = photo.width; // Menyimpan lebar foto utama
        photoHeight = photo.height; // Menyimpan tinggi foto utama
        draw(); // Menggambar foto utama di canvas
        alert("Foto utama berhasil diunggah!"); // Menampilkan alert saat foto utama diunggah
      };
      photo.src = event.target.result; // Menyimpan sumber foto utama
    };
    reader.readAsDataURL(file); // Membaca file sebagai data URL
  }
});

// Fungsi untuk menangani perubahan posisi X
posXInput.addEventListener('input', function() {
  posX = parseInt(posXInput.value); // Mengupdate posisi X
  draw(); // Menggambar ulang dengan posisi baru
});

// Fungsi untuk menangani perubahan posisi Y
posYInput.addEventListener('input', function() {
  posY = parseInt(posYInput.value); // Mengupdate posisi Y
  draw(); // Menggambar ulang dengan posisi baru
});

// Fungsi untuk menangani perubahan zoom
zoomInput.addEventListener('input', function() {
  zoom = parseFloat(zoomInput.value); // Mengupdate nilai zoom
  draw(); // Menggambar ulang dengan zoom baru
});

// Fungsi untuk menangani perubahan rotasi
rotationInput.addEventListener('input', function() {
  rotation = parseFloat(rotationInput.value); // Mengupdate nilai rotasi
  draw(); // Menggambar ulang dengan rotasi baru
});

// Fungsi untuk mendownload gambar hasil Twibbon dan foto utama
downloadButton.addEventListener('click', function() {
  const dataURL = canvas.toDataURL('image/png'); // Mengambil data URL gambar dari canvas
  const link = document.createElement('a'); // Membuat elemen anchor untuk mengunduh gambar
  link.href = dataURL; // Menetapkan URL gambar
  link.download = 'twibbon_result.png'; // Menentukan nama file unduhan
  link.click(); // Memulai proses unduh
});
