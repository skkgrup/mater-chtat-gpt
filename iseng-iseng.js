// Ambil elemen canvas
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// Atur ukuran canvas sesuai dengan layar
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array untuk menyimpan partikel-partikel
let particles = [];

// Fungsi untuk membuat warna pelangi secara dinamis
function rainbowColor() {
    const hue = Math.floor(Math.random() * 360); // Nilai hue antara 0-359
    return `hsl(${hue}, 100%, 50%)`;
}

// Class untuk partikel
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1; // Ukuran partikel
        this.speedX = Math.random() * 3 - 1.5; // Kecepatan horizontal
        this.speedY = Math.random() * 3 - 1.5; // Kecepatan vertikal
        this.color = rainbowColor(); // Warna pelangi
        this.alpha = 1; // Transparansi
    }

    // Fungsi untuk menggambar partikel
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // Fungsi untuk memperbarui posisi partikel
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.01; // Mengurangi transparansi agar memudar
    }
}

// Fungsi untuk menambahkan partikel baru
function createParticles(x, y) {
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(x, y));
    }
}

// Fungsi untuk menggambar dan memperbarui semua partikel
function handleParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].draw();
        particles[i].update();

        // Hapus partikel jika sudah tidak terlihat
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }
}

// Fungsi utama untuk animasi
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas
    handleParticles();
    requestAnimationFrame(animate); // Loop animasi
}

// Tambahkan event listener untuk mendeteksi pergerakan mouse
window.addEventListener('mousemove', (e) => {
    createParticles(e.clientX, e.clientY);
});

// Jalankan animasi
animate();

// Atur ulang ukuran canvas jika jendela browser diubah
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
