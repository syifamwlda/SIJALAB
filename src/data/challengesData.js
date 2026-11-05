// SIJALAB Interactive Challenges Data
// 8 Modul Tantangan Interaktif Aktif dengan Penilaian & Reward XP

export const CHALLENGE_ACTIVITIES = [
  {
    id: 'tech-detective',
    title: 'Tech Detective: Tebak Perangkat',
    tagline: 'Kenali wujud fisik dan karakteristik hardware jaringan & komponen SIoT.',
    icon: 'Search',
    color: 'from-blue-500 to-indigo-600',
    xpReward: 60,
    difficulty: 'Dasar',
    badge: 'Hardware Pro'
  },
  {
    id: 'match-function',
    title: 'Match the Function: Jodohkan Fungsi',
    tagline: 'Pasangkan nama peralatan teknis dengan fungsi utamanya secara tepat.',
    icon: 'Shuffle',
    color: 'from-teal-500 to-emerald-600',
    xpReward: 70,
    difficulty: 'Dasar - Menengah',
    badge: 'Pairing Genius'
  },
  {
    id: 'network-challenge',
    title: 'Network Challenge: Subnetting & Protokol',
    tagline: 'Uji keahlian kalkulasi subnet mask, CIDR, VLAN, dan routing.',
    icon: 'Network',
    color: 'from-sky-500 to-blue-600',
    xpReward: 85,
    difficulty: 'Menengah - Lanjutan',
    badge: 'Network Wizard'
  },
  {
    id: 'linux-master',
    title: 'Linux Command Master',
    tagline: 'Tantangan perintah esensial bash, izin file, dan manajemen server Linux.',
    icon: 'Terminal',
    color: 'from-emerald-500 to-teal-600',
    xpReward: 80,
    difficulty: 'Menengah',
    badge: 'Kernel Champion'
  },
  {
    id: 'siot-quiz',
    title: 'SIoT & Microcontroller Quiz',
    tagline: 'Kuis seputar pinout ESP32, sensor digital, aktuator, dan rangkaian listrik.',
    icon: 'Cpu',
    color: 'from-amber-500 to-orange-600',
    xpReward: 75,
    difficulty: 'Dasar - Menengah',
    badge: 'Maker Prodigy'
  },
  {
    id: 'arrange-steps',
    title: 'Arrange the Steps: Urutkan Prosedur',
    tagline: 'Susun langkah-langkah praktikum crimping dan konfigurasi ke urutan yang benar.',
    icon: 'ListOrdered',
    color: 'from-violet-500 to-purple-600',
    xpReward: 90,
    difficulty: 'Menengah',
    badge: 'Procedural Master'
  },
  {
    id: 'troubleshoot-mission',
    title: 'Troubleshooting Mission: Detektif Masalah',
    tagline: 'Pecahkan studi kasus nyata jaringan dan sistem lab yang bermasalah.',
    icon: 'AlertTriangle',
    color: 'from-rose-500 to-pink-600',
    xpReward: 95,
    difficulty: 'Lanjutan',
    badge: 'Chief Troubleshooter'
  },
  {
    id: 'tech-crossword',
    title: 'Technical Crossword: Teka-Teki Silang SIJA',
    tagline: 'Asah wawasan istilah teknis SIJA dengan TTS interaktif 10 kata kunci.',
    icon: 'Grid',
    color: 'from-cyan-500 to-blue-600',
    xpReward: 100,
    difficulty: 'Menengah',
    badge: 'Vocab Grandmaster'
  }
];

// --- 1. TECH DETECTIVE QUESTIONS ---
export const TECH_DETECTIVE_QUESTIONS = [
  {
    id: 'td-1',
    deviceType: 'Perangkat Jaringan',
    clue: 'Perangkat 24 port ini memiliki lampu LED di setiap port dan bertugas meneruskan frame berdasarkan MAC Address tabel CAM.',
    imagePlaceholder: 'Switch Catalyst 24-Port',
    iconName: 'Server',
    options: ['Network Switch', 'Router', 'Hub', 'Patch Panel'],
    correctIndex: 0,
    explanation: 'Switch bekerja pada Layer 2 OSI, mengisolasi collision domain tiap port dan meneruskan paket berdasarkan MAC address pada tabel CAM.'
  },
  {
    id: 'td-2',
    deviceType: 'Komponen Elektronika SIoT',
    clue: 'Modul mikrokontroler 32-bit buatan Espressif yang memiliki antena jalur tembaga PCB di ujungnya, mendukung koneksi Wi-Fi 2.4 GHz dan Bluetooth BLE.',
    imagePlaceholder: 'Papan Hitam 30-Pin dengan Shield Logika ESP-WROOM-32',
    iconName: 'Cpu',
    options: ['Arduino Uno', 'ESP32 DOIT DevKit', 'Raspberry Pi Pico', 'Modul Relay'],
    correctIndex: 1,
    explanation: 'ESP32 terkenal dengan chip SoC dual-core 240MHz dan konektivitas nirkabel Wi-Fi/Bluetooth terintegrasi.'
  },
  {
    id: 'td-3',
    deviceType: 'Perkakas Praktikum Jaringan',
    clue: 'Alat perkakas tangan dari baja karbon dengan mekanisme ratchet yang digunakan untuk menjepit konektor 8P8C RJ45 ke kabel UTP.',
    imagePlaceholder: 'Tang Baja dengan Cetakan Matras 8P & 6P serta Pisau Pengupas',
    iconName: 'Wrench',
    options: ['Punch Down Tool', 'LAN Tester', 'Tang Crimping (Crimping Tool)', 'Wire Stripper'],
    correctIndex: 2,
    explanation: 'Tang crimping berfungsi menekan bilah kontak emas konektor RJ45 hingga menusuk kawat tembaga kabel UTP.'
  },
  {
    id: 'td-4',
    deviceType: 'Komponen Elektronika SIoT',
    clue: 'Sensor berbentuk tabung ganda logam mirip sepasang mata silinder ("T" dan "R") yang mengukur jarak dengan gelombang suara 40 kHz.',
    imagePlaceholder: 'Modul Biru dengan Dua Silinder Logika Ultrasonik T & R',
    iconName: 'Radio',
    options: ['Sensor Suhu DHT22', 'Sensor Ultrasonik HC-SR04', 'Sensor Gerak PIR', 'LDR'],
    correctIndex: 1,
    explanation: 'HC-SR04 menggunakan transduser ultrasonik Trigger (T) dan Echo (R) untuk mengukur jarak benda dari 2 cm hingga 4 meter.'
  },
  {
    id: 'td-5',
    deviceType: 'Perangkat Transceiver Jaringan',
    clue: 'Modul kecil logam hot-swappable dengan tuas pengunci yang dicolokkan ke slot uplink switch untuk menghubungkan kabel serat optik LC Duplex.',
    imagePlaceholder: 'Modul Logam Emas Mini dengan Dua Lubang Optik LC',
    iconName: 'Layers',
    options: ['SFP Transceiver Module', 'Patch Panel', 'Modem ONT', 'Konektor RJ45'],
    correctIndex: 0,
    explanation: 'SFP (Small Form-factor Pluggable) mengubah sinyal elektrik switch menjadi pulsa cahaya kabel fiber optic.'
  }
];

// --- 2. MATCH THE FUNCTION DATA ---
export const MATCH_FUNCTION_ITEMS = [
  { id: 'mf-1', device: 'Router', functionText: 'Menghubungkan dua subnet berbeda dan memilih rute terbaik Layer 3' },
  { id: 'mf-2', device: 'Access Point', functionText: 'Memancarkan sinyal gelombang radio Wi-Fi untuk koneksi nirkabel' },
  { id: 'mf-3', device: 'Patch Panel', functionText: 'Titik terminasi kabel horizontal di rak server untuk kerapian patching' },
  { id: 'mf-4', device: 'Modul Relay', functionText: 'Saklar elektromagnetik terisolasi untuk menyalakan beban listrik 220V' },
  { id: 'mf-5', device: 'LAN Tester', functionText: 'Menguji kontinuitas dan kebenaran susunan 8 kawat kabel UTP' },
  { id: 'mf-6', device: 'Sensor DHT22', functionText: 'Membaca besaran suhu dan kelembaban udara secara digital presisi' }
];

// --- 3. NETWORK CHALLENGE QUESTIONS ---
export const NETWORK_CHALLENGE_QUESTIONS = [
  {
    id: 'nc-1',
    question: 'Berapakah jumlah Host Valid yang dapat digunakan pada jaringan dengan subnet mask /27 (255.255.255.224)?',
    options: ['32 host', '30 host', '62 host', '14 host'],
    correctIndex: 1,
    explanation: 'Prefix /27 memiliki 32 - 27 = 5 bit host. Total host = 2^5 = 32. Host valid = 32 - 2 = 30 host (karena dikurangi Network ID dan Broadcast ID).'
  },
  {
    id: 'nc-2',
    question: 'Jika IP komputer adalah 192.168.1.50/26, berapakah Network Address dari subnet tersebut?',
    options: ['192.168.1.0', '192.168.1.32', '192.168.1.64', '192.168.1.128'],
    correctIndex: 0,
    explanation: 'Prefix /26 memiliki interval blok subnet 64 (256 - 192 = 64). Blok subnetnya adalah: 0, 64, 128, 192. Angka 50 berada pada blok 192.168.1.0 s/d 192.168.1.63. Jadi Network Address adalah 192.168.1.0.'
  },
  {
    id: 'nc-3',
    question: 'Header standar IEEE 802.1Q yang disisipkan pada frame Ethernet untuk penandaan VLAN Trunking berukuran sebesar apa?',
    options: ['2 Byte', '4 Byte', '8 Byte', '16 Byte'],
    correctIndex: 1,
    explanation: 'Tag IEEE 802.1Q berukuran 4 Byte (32 bit), berisi TPID (16 bit), Priority (3 bit), DEI (1 bit), dan VLAN ID (12 bit yang mendukung hingga 4096 VLAN).'
  },
  {
    id: 'nc-4',
    question: 'Manakah nilai Administrative Distance (AD) default untuk rute Open Shortest Path First (OSPF) pada router Cisco?',
    options: ['90', '100', '110', '120'],
    correctIndex: 2,
    explanation: 'Nilai Administrative Distance: Connected = 0, Static = 1, EIGRP = 90, OSPF = 110, RIP = 120.'
  },
  {
    id: 'nc-5',
    question: 'Pada model referensi OSI 7 Layer, perangkat Switch Manageable konvensional dan MAC Address beroperasi pada lapisan apa?',
    options: ['Layer 1 (Physical)', 'Layer 2 (Data Link)', 'Layer 3 (Network)', 'Layer 4 (Transport)'],
    correctIndex: 1,
    explanation: 'Data Link Layer (Layer 2) bertanggung jawab atas framing dan pengalamatan fisik perangkat (MAC Address).'
  }
];

// --- 4. LINUX COMMAND MASTER ---
export const LINUX_MASTER_QUESTIONS = [
  {
    id: 'lm-1',
    scenario: 'Kamu ingin melihat berkas log sistem Linux secara langsung (live real-time streaming) saat aplikasi sedang berjalan. Perintah apa yang paling tepat?',
    commandPrompt: 'siswa@sijalab-srv:~$ ___ /var/log/syslog',
    options: ['tail -f', 'cat -n', 'nano', 'grep -v'],
    correctIndex: 0,
    outputSimulation: `Nov 05 08:15:22 sijalab-srv systemd[1]: Started User Manager for UID 1000.
Nov 05 08:15:23 sijalab-srv sshd[1422]: Accepted publickey for siswa from 192.168.10.15
Nov 05 08:15:25 sijalab-srv kernel: [ 45.120] eth1: link up, 1000Mbps, full-duplex`,
    explanation: 'Perintah `tail -f` (follow) menampilkan baris-baris terbaru dan terus memperbarui tampilan saat ada log baru yang ditulis.'
  },
  {
    id: 'lm-2',
    scenario: 'Kamu ingin memberikan hak akses pada berkas skrip `backup.sh` agar Pemilik (User) bisa membaca-menulis-mengeksekusi (rwx), sedangkan Group dan Others hanya bisa membaca dan mengeksekusi (r-x). Berapakah nilai oktal chmod yang benar?',
    commandPrompt: 'siswa@sijalab-srv:~$ chmod ___ backup.sh',
    options: ['777', '755', '644', '700'],
    correctIndex: 1,
    outputSimulation: `-rwxr-xr-x 1 siswa sijalab 4096 Nov 5 08:15 backup.sh`,
    explanation: 'User = rwx (4+2+1=7), Group = r-x (4+0+1=5), Others = r-x (4+0+1=5) → 755.'
  },
  {
    id: 'lm-3',
    scenario: 'Layanan web server Nginx di server Debian kamu baru saja diubah konfigurasinya. Perintah apa yang digunakan untuk merestart layanan tersebut via systemd?',
    commandPrompt: 'siswa@sijalab-srv:~$ sudo ___ restart nginx',
    options: ['systemctl', 'service-mgr', 'init.d', 'netplan'],
    correctIndex: 0,
    outputSimulation: `● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2026-11-05 08:20:00 WIB`,
    explanation: '`systemctl` adalah perintah standar pengendali service manager systemd pada distribusi Linux modern.'
  },
  {
    id: 'lm-4',
    scenario: 'Kamu ingin mencari baris yang memuat kata "error" pada berkas konfigurasi tanpa harus membaca ribuan baris secara manual. Alat filter teks apa yang digunakan?',
    commandPrompt: 'siswa@sijalab-srv:~$ ___ -i "error" /var/log/nginx/error.log',
    options: ['grep', 'sed', 'awk', 'find'],
    correctIndex: 0,
    outputSimulation: `2026/11/05 07:40:12 [error] 1290#1290: *1 open() "/var/www/html/favicon.ico" failed`,
    explanation: '`grep` (Global Regular Expression Print) digunakan untuk memfilter dan menampilkan baris yang cocok dengan pola kata kunci.'
  }
];

// --- 5. SIOT COMPONENT QUIZ ---
export const SIOT_QUIZ_QUESTIONS = [
  {
    id: 'sq-1',
    question: 'Berapakah batas tegangan logika (Logic Level Voltage) operasional pin GPIO pada mikrokontroler ESP32?',
    options: ['5.0 Volt', '3.3 Volt', '12 Volt', '1.8 Volt'],
    correctIndex: 1,
    explanation: 'ESP32 bekerja pada logika 3.3V dan TIDAK toleran 5V. Memberikan tegangan 5V langsung ke pin GPIO dapat merusak chip secara permanen.'
  },
  {
    id: 'sq-2',
    question: 'Sensor suhu DHT22 membutuhkan sebuah komponen peredam derau di antara kaki VCC dan kaki DATA agar pembacaan stabil. Komponen apakah itu?',
    options: ['Kapasitor Elektrolit 100uF', 'Resistor Pull-Up 10kΩ', 'Dioda Zener 3.3V', 'Induktor Ferrite'],
    correctIndex: 1,
    explanation: 'Resistor pull-up 4.7kΩ s/d 10kΩ wajib dipasang antara VCC dan DATA agar kondisi idle jalur komunikasi 1-wire tetap berada pada level logika HIGH.'
  },
  {
    id: 'sq-3',
    question: 'Untuk mengendalikan sudut putaran lengan Motor Servo SG90 (0 sampai 180 derajat), sinyal kendali apa yang dikirimkan oleh mikrokontroler?',
    options: ['Sinyal Analog DC Murni', 'Sinyal Digital I2C', 'Pulse Width Modulation (PWM) 50 Hz', 'Sinyal Serial UART TX/RX'],
    correctIndex: 2,
    explanation: 'Motor servo dikendalikan dengan pulsa sinyal PWM frekuensi 50 Hz (periode 20 ms), di mana lebar pulsa 1ms - 2ms menentukan sudut rotasi.'
  },
  {
    id: 'sq-4',
    question: 'Komponen apakah pada modul relay yang berfungsi sebagai isolator optik pemisah sirkuit tegangan rendah mikrokontroler dari sirkuit 220V beban?',
    options: ['Optocoupler (EL817)', 'Transistor NPN', 'Dioda Flyback', 'Varistor'],
    correctIndex: 0,
    explanation: 'Optocoupler menggunakan pemancar cahaya inframerah internal untuk memicu phototransistor, mencegah tegangan kejut listrik merambat balik ke mikrokontroler.'
  }
];

// --- 6. ARRANGE THE STEPS DATA ---
export const ARRANGE_STEPS_CHALLENGES = [
  {
    id: 'as-crimping',
    title: 'Urutkan Prosedur Terminasi Kabel UTP (T568B Straight)',
    category: 'Networking',
    xpReward: 90,
    shuffledSteps: [
      { id: 's-3', text: 'Susun urutan 8 warna standar T568B (Putih-Oranye, Oranye, dst) dan luruskan.' },
      { id: 's-1', text: 'Kupas selubung luar jaket kabel UTP sepanjang ± 2.5 cm dengan tang crimping.' },
      { id: 's-6', text: 'Uji kontinuitas kabel ujung ke ujung menggunakan LAN Tester 9V.' },
      { id: 's-4', text: 'Potong rata ujung kawat secara tegak lurus hingga tersisa panjang sekitar 1.2 cm.' },
      { id: 's-2', text: 'Urai pilinan keempat pasang kawat tembaga hingga terpisah satu sama lain.' },
      { id: 's-5', text: 'Masukkan kawat ke konektor RJ45 hingga menyentuh dasar lalu pres dengan tang crimping.' }
    ],
    correctOrderIds: ['s-1', 's-2', 's-3', 's-4', 's-5', 's-6'],
    explanation: 'Urutan baku: Kupas jaket luar → Urai pilinan kawat → Susun warna T568B → Potong rata 1.2 cm → Masukkan ke RJ45 & Crimping → Verifikasi di LAN Tester.'
  },
  {
    id: 'as-cisco-vlan',
    title: 'Urutkan Konfigurasi Access Port VLAN di Cisco Switch',
    category: 'Cisco',
    xpReward: 90,
    shuffledSteps: [
      { id: 'cv-4', text: 'Tentukan jenis mode port menjadi access dengan perintah "switchport mode access".' },
      { id: 'cv-1', text: 'Masuk ke mode konfigurasi global dengan mengetik "enable" lalu "configure terminal".' },
      { id: 'cv-5', text: 'Petakan port ke VLAN yang diinginkan dengan "switchport access vlan 10".' },
      { id: 'cv-2', text: 'Buat ID VLAN di database switch dengan mengetik "vlan 10" lalu beri nama.' },
      { id: 'cv-3', text: 'Pilih interface fisik yang akan dikonfigurasi, contoh "interface fastEthernet 0/1".' }
    ],
    correctOrderIds: ['cv-1', 'cv-2', 'cv-3', 'cv-4', 'cv-5'],
    explanation: 'Urutan: Masuk Global Config → Buat VLAN → Pilih Interface → Ubah Mode Access → Masukkan VLAN ke Interface.'
  }
];

// --- 7. TROUBLESHOOTING MISSION SCENARIOS ---
export const TROUBLESHOOTING_MISSIONS = [
  {
    id: 'tm-1',
    caseTitle: 'Misteri Lampu Oranye Switch & Broadcast Storm',
    clientReport: 'Guru lab melapor bahwa seluruh komputer di Lab SIJA 2 mendadak kehilangan koneksi internet. Lampu indikator di semua port switch Cisco berkedip hijau-oranye sangat cepat secara serentak tanpa henti, dan CPU switch melonjak ke 99%.',
    clues: [
      'Ada siswa yang baru saja menghubungkan kabel LAN cadangan antara Port Fa0/23 dan Port Fa0/24 di switch yang sama.',
      'Perintah show spanning-tree menunjukkan Spanning-Tree Protocol dinonaktifkan di switch tersebut.',
      'Tabel CAM switch mengalami flapping MAC Address ribuan kali per detik.'
    ],
    question: 'Apakah penyebab utama kelumpuhan jaringan ini dan langkah tindakan darurat apa yang harus dilakukan?',
    options: [
      'Kabel LAN Fa0/23 korsleting; ganti konektor RJ45 dengan yang baru.',
      'Terjadi Physical Switching Loop yang memicu Broadcast Storm; cabut segera kabel penghubung antara port 23 dan 24, lalu aktifkan kembali STP (Spanning Tree Protocol).',
      'Router utama terkena serangan malware DDoS dari luar internet; restart modem ISP.',
      'Alokasi IP DHCP habis; perlebar subnet mask dari /24 menjadi /16.'
    ],
    correctIndex: 1,
    explanation: 'Menghubungkan dua port pada switch yang sama tanpa STP aktif menciptakan lingkaran fisik (loop). Frame broadcast akan berputar dan digandakan tanpa henti (Broadcast Storm) hingga buffer memori dan CPU switch kelebihan beban.'
  },
  {
    id: 'tm-2',
    caseTitle: 'Sensor IoT DHT22 Mengirimkan Angka Suhu 0°C Konstan',
    clientReport: 'Kelompok siswa sedang menguji alat monitoring suhu server dengan ESP32. Di Serial Monitor, nilai kelembaban terbaca 0% dan suhu terbaca 0°C terus-menerus, padahal suhu ruangan lab sekitar 26°C.',
    clues: [
      'Siswa menghubungkan kaki DATA sensor DHT22 ke pin GPIO 36 (VP) ESP32.',
      'Di kode program, pin tersebut dideklarasikan dengan pinMode(36, INPUT_PULLUP);',
      'Datasheet ESP32 menyatakan GPIO 34-39 adalah pin input-only yang TIDAK memiliki resistor pull-up/pull-down internal!'
    ],
    question: 'Mengapa pembacaan sensor gagal dan bagaimana solusi perbaikannya?',
    options: [
      'ESP32 rusak terbakar; ganti dengan modul mikrokontroler baru.',
      'Pin GPIO 36 tidak mendukung pull-up internal yang disyaratkan DHT22; pindahkan kabel data ke pin GPIO standar seperti GPIO 4 atau pasang resistor pull-up fisik 10kΩ eksternal.',
      'Sensor DHT22 hanya bisa bekerja pada suhu di bawah 0°C.',
      'Baud rate Serial Monitor harus diubah ke 300 baud.'
    ],
    correctIndex: 1,
    explanation: 'Pin GPIO 34, 35, 36 (VP), dan 39 (VN) pada ESP32 tidak memiliki transistor resistor pull-up internal. Protokol 1-wire DHT22 membutuhkan pull-up agar sinyal idle berlogika HIGH.'
  }
];

// --- 8. TECHNICAL CROSSWORD DATA ---
export const TECHNICAL_CROSSWORD_DATA = {
  gridSize: 9,
  clues: [
    { number: 1, direction: 'across', x: 0, y: 1, answer: 'ROUTER', clue: 'Perangkat Layer 3 yang menghubungkan subnet berbeda' },
    { number: 2, direction: 'down', x: 0, y: 1, answer: 'RJ45', clue: 'Konektor standar 8 pin modular kabel UTP' },
    { number: 3, direction: 'across', x: 2, y: 3, answer: 'SWITCH', clue: 'Perangkat konsentrator cerdas Layer 2 dengan tabel MAC Address' },
    { number: 4, direction: 'down', x: 4, y: 0, answer: 'ESP32', clue: 'SoC mikrokontroler 32-bit buatan Espressif berkemampuan WiFi' },
    { number: 5, direction: 'across', x: 1, y: 5, answer: 'LINUX', clue: 'Sistem operasi open source paling populer untuk server web' },
    { number: 6, direction: 'down', x: 6, y: 3, answer: 'CRIMP', clue: 'Proses pengepresan konektor pada kabel jaringan tembaga' },
    { number: 7, direction: 'across', x: 0, y: 7, answer: 'SUBNET', clue: 'Teknik membagi blok jaringan IP besar menjadi domain lebih kecil' }
  ]
};

