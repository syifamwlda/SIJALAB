// SIJALAB Student Corner Data
// Catatan Belajar, Ringkasan Praktikum, dan Tips Komunitas Siswa SIJA

export const INITIAL_STUDENT_POSTS = [
  {
    id: 'post-1',
    author: 'Fikri Haikal',
    authorClass: 'XII SIJA 1',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    title: 'Trik Jitu Menghafal Urutan Kabel Straight T568B dalam 10 Detik!',
    category: 'Networking',
    categoryBadge: 'bg-blue-100 text-blue-700 border-blue-200',
    content: `Halo teman-teman SIJA! Buat yang sering kebolak-balik saat crimping kabel LAN, aku punya jembatan keledai simpel:
"PUTIH-ORANYE, ORANYE (Jeruk), PUTIH-HIJAU, BIRU (Langit), PUTIH-BIRU, HIJAU (Rumput), PUTIH-COKELAT, COKELAT (Tanah)".

Kuncinya:
1. Warna oranye dan cokelat selalu solid di pinggir.
2. Warna hijau "membungkus" warna biru di tengah (Putih Hijau - Biru - Putih Biru - Hijau).

Dijamin waktu tes UKK gak bakal salah posisi lagi! Semoga bermanfaat ya!`,
    likes: 38,
    commentsCount: 6,
    createdDate: '4 November 2026',
    isBookmarked: true
  },
  {
    id: 'post-2',
    author: 'Alya Rahmadhani',
    authorClass: 'XII SIJA 2',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    title: 'Catatan Rangkuman: Kenapa Pin ESP32 Gak Boleh Kena 5V?',
    category: 'SIoT',
    categoryBadge: 'bg-amber-100 text-amber-700 border-amber-200',
    content: `Kemarin di lab ada modul ESP32 temenku yang chipnya mendadak panas banget terus mati total. Setelah dicek sama Pak Guru, ternyata pin GPIO dihubungkan langsung ke output sensor ultrasonik yang dayanya 5V!

Ingat ya teman-teman:
- ESP32 bekerja pada level tegangan logika 3.3V CMOS.
- Pin masukan ADC ESP32 toleransi voltasenya maksimal 3.6V.
- Kalau sensor kalian outputnya 5V (seperti HC-SR04 pin Echo), wajib pasang pembagi tegangan (Voltage Divider) pakai 2 resistor: R1 1kΩ dan R2 2kΩ, atau gunakan sensor versi 3.3V (seperti RCWL-9610). Jangan sampai board kalian terbakar!`,
    likes: 54,
    commentsCount: 11,
    createdDate: '3 November 2026',
    isBookmarked: false
  },
  {
    id: 'post-3',
    author: 'Bima Satria',
    authorClass: 'XII SIJA 1',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    title: 'Cheat Sheet Perintah Diagnostik Jaringan Linux Tercepat',
    category: 'Linux',
    categoryBadge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    content: `Perintah favorit yang selalu aku pakai saat troubleshooting server lab:

1. \`ip -c a\` : Menampilkan IP address dengan highlight warna (jauh lebih enak dibaca daripada ifconfig lawas).
2. \`ss -tulpn\` : Melihat port apa saja yang lagi listening dan proses PID mana yang megang.
3. \`dig +short @1.1.1.1 domain.com\` : Cek query DNS cepat tanpa output header panjang.
4. \`mtr 8.8.8.8\` : Gabungan ping dan traceroute real-time buat ngecek hop mana yang sering packet loss.

Kalian paling sering pakai perintah yang mana nih?`,
    likes: 42,
    commentsCount: 4,
    createdDate: '2 November 2026',
    isBookmarked: false
  }
];

