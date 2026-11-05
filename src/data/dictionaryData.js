// SIJALAB Tech Dictionary Data
// Ensiklopedia Perangkat Jaringan & Komponen Elektronika SIoT

export const DICTIONARY_CATEGORIES = [
  { id: 'all', label: 'Semua Perangkat', count: 29 },
  { id: 'networking', label: 'Perangkat Jaringan (Networking)', count: 15 },
  { id: 'siot', label: 'Komponen SIoT & Elektronika', count: 14 }
];

export const TECH_DICTIONARY_ITEMS = [
  // --- A. NETWORKING EQUIPMENT ---
  {
    id: 'net-router',
    nameId: 'Router Jaringan',
    nameEn: 'Network Router',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Perangkat Layer 3 yang menghubungkan dua atau lebih jaringan berbeda subnet dan mengarahkan paket data.',
    description: 'Router adalah perangkat keras jaringan komputer yang memfasilitasi komunikasi antar-jaringan berbeda dengan menganalisis alamat IP tujuan pada paket data dan memilih rute terbaik (routing table) menuju tujuan akhir.',
    mainFunctions: [
      'Menghubungkan jaringan lokal (LAN) ke jaringan publik (Internet/WAN).',
      'Membagi broadcast domain menjadi segmen-segmen jaringan yang lebih kecil.',
      'Melakukan Network Address Translation (NAT) untuk menghemat penggunaan IP publik.',
      'Menjalankan Dynamic Host Configuration Protocol (DHCP) Server dan Packet Filtering Firewall.'
    ],
    howItWorks: 'Ketika sebuah frame Ethernet diterima pada salah satu interface, router melepas header Layer 2 untuk memeriksa header Layer 3 (IP Header). Router membaca Destination IP Address, mencocokkannya dengan Routing Table (menggunakan prinsip Longest Prefix Match), lalu membungkus ulang (re-encapsulate) paket dengan header Layer 2 baru dan meneruskannya ke port keluar yang tepat.',
    keyPinsOrComponents: [
      { name: 'Console Port (RJ45/USB)', desc: 'Port komunikasi serial out-of-band untuk manajemen konfigurasi awal via terminal PuTTY.' },
      { name: 'WAN / Internet Port', desc: 'Port RJ45/SFP yang terhubung ke modem ISP dengan konfigurasi IP Publik/PPPoE.' },
      { name: 'LAN Ports (Gigabit Ethernet)', desc: 'Port RJ45 untuk distribusi koneksi ke Core/Distribution Switch internal.' },
      { name: 'Auxiliary Port (AUX)', desc: 'Port untuk koneksi modem dial-up untuk remote management darurat.' }
    ],
    usageExamples: [
      'MikroTik CCR1009 / RB750Gr3 sebagai gateway utama laboratorium sekolah.',
      'Cisco ISR 4331 sebagai router edge di industri telekomunikasi.',
      'Menghubungkan subnet 192.168.10.0/24 (Lab Siswa) dengan 172.16.1.0/24 (Server Utama).'
    ],
    relatedEquipment: ['Switch', 'Firewall', 'Modem', 'Patch Panel'],
    specs: {
      layer: 'Layer 3 (Network Layer)',
      interfaceTypes: 'FastEthernet, GigabitEthernet, 10G SFP+',
      typicalThroughput: '1 Gbps - 100 Gbps',
      protocolSupport: 'IPv4, IPv6, BGP, OSPF, RIP, MPLS, IPsec'
    },
    badgeColor: 'blue'
  },
  {
    id: 'net-switch',
    nameId: 'Switch Jaringan (Manageable)',
    nameEn: 'Managed Network Switch',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Perangkat Layer 2 yang menghubungkan banyak komputer dalam satu LAN dan meneruskan frame berdasarkan MAC Address.',
    description: 'Switch adalah perangkat konsentrator cerdas yang menghubungkan node-node jaringan dalam satu Local Area Network (LAN). Berbeda dengan Hub yang membabi buta menyebarkan sinyal, switch membaca alamat fisik (MAC Address) dari frame yang masuk untuk meneruskannya hanya ke port tujuan yang relevan.',
    mainFunctions: [
      'Menghubungkan puluhan PC client, printer, dan server dalam satu Local Area Network.',
      'Mencegah tabrakan paket data (Collision Domain terisolasi di setiap port individu).',
      'Memfasilitasi segmentasi Virtual LAN (VLAN 802.1Q).',
      'Mendukung fitur Quality of Service (QoS), Spanning Tree Protocol (STP), dan Port Security.'
    ],
    howItWorks: 'Switch membangun dan memperbarui Content Addressable Memory (CAM Table) secara dinamis. Saat port Fa0/1 menerima frame dari PC-A, switch merekam bahwa MAC Address PC-A berada di port Fa0/1. Jika PC-A ingin mengirim ke MAC Address PC-B yang ada di port Fa0/2, switch langsung mem-forward frame ke port Fa0/2 saja tanpa mengganggu port lain.',
    keyPinsOrComponents: [
      { name: 'Access Ports (1 - 24 / 48)', desc: 'Port RJ45 10/100/1000 Mbps untuk koneksi PC siswa dan perangkat akhir.' },
      { name: 'Uplink Ports (SFP/SFP+)', desc: 'Port kecepatan tinggi 1G/10G untuk uplink backbone ke Distribution/Core Switch.' },
      { name: 'LED Status Indicators', desc: 'Lampu LED Speed, Link/Act, PoE, dan System untuk indikasi status koneksi fisik.' },
      { name: 'Mode Button', desc: 'Tombol switch Cisco untuk mengubah mode tampilan LED (Stat, Duplex, Speed, PoE).' }
    ],
    usageExamples: [
      'Cisco Catalyst 2960 / 9200 Series untuk distribusi jaringan lab komputer.',
      'MikroTik Cloud Router Switch (CRS326) untuk switching rak server 24 port.',
      'Pemisahan trafik VLAN 10 (Siswa) dan VLAN 20 (Guru) dalam satu perangkat fisik.'
    ],
    relatedEquipment: ['Router', 'Patch Panel', 'Access Point', 'UTP Cable'],
    specs: {
      layer: 'Layer 2 (Data Link) / Layer 3 (Multilayer)',
      portDensity: '8, 16, 24, 48 Port',
      switchingCapacity: '10 Gbps - 176 Gbps',
      macTableSize: '8K - 32K MAC Addresses'
    },
    badgeColor: 'indigo'
  },
  {
    id: 'net-hub',
    nameId: 'Hub Jaringan (Legacy)',
    nameEn: 'Network Hub',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Perangkat konsentrator Layer 1 pasif yang meneruskan sinyal elektrik ke seluruh port secara broadcast.',
    description: 'Hub adalah perangkat jaringan generasi lama yang beroperasi pada Physical Layer. Hub tidak memiliki memori MAC Address table dan tidak mampu memproses isi frame data; apa pun sinyal listrik yang masuk pada satu port akan digandakan dan dikirim ke seluruh port lainnya.',
    mainFunctions: [
      'Menghubungkan beberapa perangkat dalam satu Collision Domain tunggal.',
      'Meregenerasi dan memperkuat sinyal fisik (Repeater multiport).',
      'Digunakan untuk tujuan analisis paket lama (network tapping) sebelum era port mirroring.'
    ],
    howItWorks: 'Bekerja secara half-duplex murni. Ketika PC 1 mengirim data, semua PC yang tersambung ke port 2, 3, dan 4 akan menerima sinyal listrik tersebut. Jika PC 2 mencoba mengirim pada saat bersamaan, terjadi tabrakan gelombang (Collision) sehingga kedua data rusak dan harus ditransmisikan ulang menggunakan algoritma CSMA/CD.',
    keyPinsOrComponents: [
      { name: 'Multiport RJ45', desc: 'Port 4, 8, atau 16 port 10/100 Mbps.' },
      { name: 'Collision LED', desc: 'Lampu indikator merah yang berkedip saat terjadi tabrakan sinyal antar-port.' }
    ],
    usageExamples: [
      'Praktikum perbandingan performa CSMA/CD di lab simulasi jaringan sekolah.',
      'Perangkat lawas zaman jaringan 10BASE-T.'
    ],
    relatedEquipment: ['Switch', 'UTP Cable', 'LAN Tester'],
    specs: {
      layer: 'Layer 1 (Physical Layer)',
      duplexMode: 'Half Duplex Only',
      collisionDomain: '1 Shared Collision Domain',
      status: 'Obsolescent (Digantikan oleh Switch)'
    },
    badgeColor: 'amber'
  },
  {
    id: 'net-access-point',
    nameId: 'Wireless Access Point (WAP)',
    nameEn: 'Wireless Access Point',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Perangkat transceiver nirkabel yang memancarkan sinyal Wi-Fi untuk menghubungkan klien tanpa kabel.',
    description: 'Access Point adalah perangkat yang menyediakan konektivitas nirkabel (Wireless LAN / WLAN) bagi perangkat seperti laptop, smartphone, dan modul ESP32. AP bertindak sebagai jembatan (bridge) antara jaringan nirkabel berbasis standar IEEE 802.11 dengan jaringan kabel Ethernet 802.3.',
    mainFunctions: [
      'Memancarkan sinyal Service Set Identifier (SSID) pada frekuensi 2.4 GHz dan 5 GHz.',
      'Melakukan otentikasi klien nirkabel dengan enkripsi WPA2/WPA3 Personal atau Enterprise (802.1X / RADIUS).',
      'Mendukung Multi-SSID dengan pemetaan tag VLAN berbeda per SSID.',
      'Roaming mulus antar-AP dalam gedung menggunakan Wireless LAN Controller (WLC).'
    ],
    howItWorks: 'AP mengubah frame data digital dari kabel UTP PoE menjadi gelombang radio elektromagnetik melalui antena pemancar. Klien nirkabel mengirimkan Probe Request, melakukan proses 4-Way Handshake untuk otentikasi kunci enkripsi, lalu menerima asosiasi ke BSSID AP.',
    keyPinsOrComponents: [
      { name: 'Antena Omnidirectional', desc: 'Antena internal/eksternal yang menyebarkan sinyal 360 derajat pola donat.' },
      { name: 'PoE Ethernet Port (802.3af/at)', desc: 'Port RJ45 yang menerima pasokan daya listrik sekaligus transfer data lewat satu kabel UTP.' },
      { name: 'Kensington Lock Slot', desc: 'Slot pengaman fisik untuk mencegah pencurian AP di koridor sekolah.' }
    ],
    usageExamples: [
      'Ubiquiti UniFi U6-Pro yang terpasang di plafon lorong lab SIJA.',
      'MikroTik cAP ac untuk penyediaan hotspot voucher ujian sekolah.',
      'Cisco Catalyst 9100 Series untuk jaringan enterprise sekolah modern.'
    ],
    relatedEquipment: ['Switch', 'Router', 'UTP Cable'],
    specs: {
      standards: 'Wi-Fi 6 (802.11ax), Wi-Fi 5 (802.11ac), 802.11n',
      frequency: 'Dual Band 2.4 GHz (Long Range) & 5 GHz (High Speed)',
      powerInput: 'PoE 48V (802.3af/at)',
      concurrentUsers: '100 - 300+ Active Clients'
    },
    badgeColor: 'emerald'
  },
  {
    id: 'net-modem',
    nameId: 'Modem (Modulator Demodulator)',
    nameEn: 'Modem / Optical Network Terminal (ONT)',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Perangkat pengubah sinyal digital komputer menjadi sinyal analog/optik transmisi ISP dan sebaliknya.',
    description: 'Modem adalah akronim dari Modulator-Demodulator. Pada era modern fiber optic saat ini, perangkat ini biasa disebut ONT (Optical Network Terminal) atau GPON ONU yang menghubungkan kabel optik drop cable dari tiang distribusi fiber ISP (Indihome/Biznet/CBN) ke jaringan lokal pelanggan.',
    mainFunctions: [
      'Modulasi: Mengubah sinyal digital komputer menjadi pulsa cahaya atau gelombang radio.',
      'Demodulasi: Menerjemahkan pulsa cahaya dari kabel fiber optik kembali ke sinyal digital biner.',
      'Menetapkan sesi WAN PPPoE Client ke Optical Line Terminal (OLT) milik ISP.'
    ],
    howItWorks: 'Sinar laser inframerah dengan panjang gelombang 1310nm/1490nm masuk ke konektor SC/UPC atau SC/APC di modem ONT. Komponen photodetection mengubah fluktuasi intensitas cahaya menjadi sinyal listrik biner yang kemudian dialirkan ke port Ethernet LAN.',
    keyPinsOrComponents: [
      { name: 'Optical Port (SC/UPC - Biru / SC/APC - Hijau)', desc: 'Port tempat menancapkan konektor kabel fiber optic single-mode dari ISP.' },
      { name: 'Port GE LAN 1 - 4', desc: 'Port Ethernet untuk dihubungkan ke Router Utama (MikroTik/Cisco).' },
      { name: 'POTS Phone Port (RJ11)', desc: 'Port untuk sambungan telepon rumah VoIP.' },
      { name: 'PON & LOS LED', desc: 'PON hijau berarti sinkron OLT; LOS merah berarti kabel fiber putus.' }
    ],
    usageExamples: [
      'ZTE F609 / Huawei HG8245H sebagai modem internet di ruang server sekolah.',
      'Fiber Optic Gateway GPON pada ISP mitra SMK.'
    ],
    relatedEquipment: ['Router', 'Fiber Optic Cable', 'UTP Cable'],
    specs: {
      opticalClass: 'GPON Class B+ / Class C+',
      wavelength: '1310 nm Upstream, 1490 nm Downstream',
      rxSensitivity: '-27 dBm to -8 dBm',
      lanPorts: '4x Gigabit / 100M RJ45'
    },
    badgeColor: 'sky'
  },
  {
    id: 'net-firewall',
    nameId: 'Hardware Firewall / UTM',
    nameEn: 'Hardware Firewall Appliance',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Sistem pengaman batas perimeter jaringan yang menyaring paket data berdasarkan kebijakan keamanan.',
    description: 'Hardware Firewall adalah appliance perangkat keras mandiri dengan arsitektur komputasi khusus (ASIC/NP) yang berdiri di antara jaringan internal terpercaya dan jaringan luar internet yang tidak aman. Firewall modern (Next-Generation Firewall / NGFW) mampu melakukan deep packet inspection hingga Application Layer 7.',
    mainFunctions: [
      'Stateful Packet Inspection (SPI) memantau status sesi TCP yang sedang aktif.',
      'Intrusion Prevention System (IPS) mencegah serangan brute-force, exploit malware, dan DDoS.',
      'Web Content & URL Filtering memblokir konten judi, pornografi, dan phishing di sekolah.',
      'Membangun terowongan VPN terenkripsi (IPsec / SSL VPN) antar-cabang sekolah.'
    ],
    howItWorks: 'Setiap paket yang tiba dicek terhadap Security Access Control Lists (ACL). Firewall memeriksa Source IP, Destination IP, Port, protokol, serta muatan payload. Jika paket cocok dengan pola serangan zero-day atau malware, firewall langsung mengirim TCP RST atau drop paket tanpa memberi respon ke penyerang.',
    keyPinsOrComponents: [
      { name: 'Dedicated Management Port', desc: 'Port khusus terisolasi untuk login Web GUI HTTPS administrator.' },
      { name: 'WAN Zone Interfaces', desc: 'Port yang terhubung ke jaringan internet publik.' },
      { name: 'DMZ (Demilitarized Zone) Port', desc: 'Segmen khusus untuk meletakkan Web Server sekolah agar terpisah dari Lab Siswa.' }
    ],
    usageExamples: [
      'Fortinet FortiGate 60F di gerbang utama jaringan internet SMK.',
      'Palo Alto Networks PA-440 untuk inspeksi aplikasi tingkat lanjut di kampus.'
    ],
    relatedEquipment: ['Router', 'Server', 'Switch'],
    specs: {
      type: 'Next-Generation Firewall (NGFW)',
      throughput: '1 Gbps - 40 Gbps Threat Protection',
      vpnCapacity: '500+ Concurrent IPsec Tunnels',
      inspectionLevel: 'Layer 3 hingga Layer 7 (Application ID)'
    },
    badgeColor: 'rose'
  },
  {
    id: 'net-server',
    nameId: 'Rackmount Server',
    nameEn: 'Rackmount Enterprise Server',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Komputer berspesifikasi tinggi dengan komponen redundant untuk menjalankan layanan 24/7 tanpa henti.',
    description: 'Server rackmount adalah komputer kelas industri yang didesain dengan form factor horizontal standar (1U, 2U, 4U) agar dapat dibaut rapi ke dalam rak server 19 inci. Server ini memiliki prosesor multicore (Intel Xeon / AMD EPYC), RAM ECC (Error-Correcting Code), dan pasokan daya ganda (Redundant Power Supply).',
    mainFunctions: [
      'Menghosting Virtual Machine (VM) menggunakan hypervisor seperti Proxmox VE, VMware ESXi, atau KVM.',
      'Menjalankan layanan inti jaringan: Active Directory, DNS Server, Database, dan LMS CBT Ujian Nasional.',
      'Penyimpanan data terpusat (Network Attached Storage / Storage Area Network).'
    ],
    howItWorks: 'Server beroperasi non-stop 365 hari setahun. Modul Out-of-band Management terdedikasi (seperti Dell iDRAC atau HPE iLO) memungkinkan administrator SIJA menghidupkan, merestart, dan menginstal OS server dari jarak jauh bahkan ketika sistem operasi utama server sedang mengalami blue screen/kernel panic.',
    keyPinsOrComponents: [
      { name: 'Hot-Swap Drive Bays', desc: 'Slot hard disk SAS/NVMe yang bisa dicabut dan diganti saat server menyala tanpa mematikan sistem.' },
      { name: 'Redundant Power Supply Units (PSU)', desc: 'Dua unit power supply terpisah yang dicolok ke sumber PLN dan UPS berbeda.' },
      { name: 'Dedicated IPMI/iDRAC/iLO Port', desc: 'Port Ethernet terisolasi untuk remote KVM virtual.' }
    ],
    usageExamples: [
      'Dell PowerEdge R740 2U Server untuk node virtualisasi Proxmox di lab SIJA.',
      'HPE ProLiant DL380 Gen10 untuk server basis data aplikasi sekolah.'
    ],
    relatedEquipment: ['Switch', 'Patch Panel', 'Router', 'Firewall'],
    specs: {
      formFactor: '1U / 2U Standard 19" Rackmount',
      processor: 'Dual Socket Intel Xeon Silver/Gold atau AMD EPYC',
      memory: 'ECC Registered DDR4/DDR5 hingga 1TB+',
      storage: 'Hardware RAID Controller (RAID 1, 5, 10)'
    },
    badgeColor: 'violet'
  },
  {
    id: 'net-patch-panel',
    nameId: 'Patch Panel 24-Port',
    nameEn: 'Ethernet Patch Panel',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Panel terminasi kabel jaringan horizontal permanen yang memudahkan manajemen patching di rak server.',
    description: 'Patch Panel adalah perangkat pasif yang dipasang di rak server 19 inci yang berisi deretan port RJ45 di sisi depan dan blok terminal IDC (Insulation Displacement Connector) tipe 110 atau Krone di sisi belakang. Patch panel melindungi kabel horizontal di dinding dari keausan akibat cabut-colok berulang.',
    mainFunctions: [
      'Menjadi titik akhir (terminasi) permanen kabel UTP yang ditarik dari wall plate meja-meja lab siswa.',
      'Menghubungkan port terminal ke switch menggunakan kabel patch cord pendek (0.5m - 1m) yang rapi.',
      'Memudahkan pemindahan atau penataan ulang port VLAN tanpa mengganggu instalasi kabel dinding.'
    ],
    howItWorks: 'Di bagian belakang panel, kabel UTP dikupas pelindungnya lalu 8 urutan kawat tembaga dimasukkan ke bilah penjepit tembaga menggunakan Punch Down Tool. Tekanan bilah memotong isolasi kawat dan mengunci kontak elektrik secara permanen.',
    keyPinsOrComponents: [
      { name: 'Front RJ45 Jacks (1 - 24)', desc: 'Port modular perempuan tempat memasukkan kabel patch cord menuju switch.' },
      { name: 'Rear 110/Krone IDC Blocks', desc: 'Terminal penjepit kawat tembaga dengan label urutan warna standar T568A dan T568B.' },
      { name: 'Cable Management Bar', desc: 'Bilah pengikat kabel di belakang panel menggunakan kabel ties.' }
    ],
    usageExamples: [
      'Patch Panel Cat6 24-port Schneider / Panduit di rak server lab komputer.',
      'Terminasi 48 titik kabel LAN dari 3 ruang kelas ke 1 lemari rack server.'
    ],
    relatedEquipment: ['Switch', 'Punch Down Tool', 'UTP Cable', 'Server'],
    specs: {
      categories: 'Cat5e, Cat6, Cat6A',
      portCount: '24 Port (1U) / 48 Port (2U)',
      shielding: 'UTP (Unshielded) atau STP/FTP (Shielded)',
      wiringStandard: 'T568A / T568B Color Coded'
    },
    badgeColor: 'teal'
  },
  {
    id: 'net-utp-cable',
    nameId: 'Kabel UTP (Unshielded Twisted Pair)',
    nameEn: 'UTP Ethernet Cable (Cat5e / Cat6)',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Media transmisi kabel tembaga 4 pasang terpilin yang paling banyak digunakan untuk jaringan LAN.',
    description: 'Kabel UTP adalah kabel jaringan tembaga yang terdiri dari 8 kawat tembaga berisolasi yang dipilin berpasangan menjadi 4 pasang. Pemilinan (twisting) dilakukan dengan sengaja untuk membatalkan interferensi elektromagnetik eksternal (EMI) dan crosstalk antar-pasangan kawat yang berdekatan.',
    mainFunctions: [
      'Menghubungkan komputer PC, laptop, access point, dan printer ke Switch atau Router.',
      'Mendukung transmisi data hingga 1 Gbps (Cat5e/Cat6) dan 10 Gbps (Cat6 jarak dekat).',
      'Menyalurkan daya listrik DC bersama sinyal data melalui teknologi Power over Ethernet (PoE).'
    ],
    howItWorks: 'Sinyal data ditransmisikan menggunakan teknik differential signaling: satu kabel dalam sepasang membawa sinyal normal (+), sedangkan kabel pasangannya membawa sinyal terbalik (-). Di ujung penerima, selisih kedua tegangan dibaca sehingga derau (noise) yang mengenai kedua kabel secara serentak dapat dieliminasi secara matematis.',
    keyPinsOrComponents: [
      { name: 'Pasangan Oranye', desc: 'Putih-Oranye dan Oranye (Pair 2: Transmit data pada 100BASE-TX)' },
      { name: 'Pasangan Hijau', desc: 'Putih-Hijau dan Hijau (Pair 3: Receive data pada 100BASE-TX)' },
      { name: 'Pasangan Biru', desc: 'Putih-Biru dan Biru (Pair 1: Sinyal telepon atau PoE)' },
      { name: 'Pasangan Cokelat', desc: 'Putih-Cokelat dan Cokelat (Pair 4: Sinyal ground atau PoE)' },
      { name: 'Spline Plastik (Cat6)', desc: 'Pemisah plastik silang di tengah kabel Cat6 untuk mereduksi crosstalk internal.' }
    ],
    usageExamples: [
      'Kabel Belden Cat6 UTP untuk instalasi LAN lab SIJA.',
      'Membuat kabel straight-through untuk PC-to-Switch dan cross-over untuk PC-to-PC.'
    ],
    relatedEquipment: ['RJ45 Connector', 'Crimping Tool', 'LAN Tester', 'Switch'],
    specs: {
      categories: 'Cat5e (100MHz / 1Gbps), Cat6 (250MHz / 1-10Gbps)',
      maxDistance: '100 meter (90m horizontal + 10m patch cords)',
      gauge: '23 AWG (Cat6) / 24 AWG (Cat5e) Solid Copper',
      colorCode: 'Standard T568A & T568B'
    },
    badgeColor: 'amber'
  },
  {
    id: 'net-fiber-cable',
    nameId: 'Kabel Fiber Optic (Serat Optik)',
    nameEn: 'Fiber Optic Cable',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Media transmisi gelombang cahaya berkecepatan tinggi dengan redaman rendah dan kebal interferensi listrik.',
    description: 'Kabel Fiber Optic adalah saluran transmisi data yang terbuat dari serat kaca atau plastik silika murni berdiameter sehelai rambut manusia. Data dikirim dalam bentuk pulsa cahaya laser atau LED dengan prinsip Total Internal Reflection (Pemantulan Internal Total).',
    mainFunctions: [
      'Koneksi backbone antar-gedung sekolah berjarak ratusan meter hingga puluhan kilometer.',
      'Jalur utama koneksi internet berkecepatan tinggi dari tiang ISP ke laboratorium.',
      'Kebal total terhadap induksi sambaran petir, medan magnet genset, dan interferensi radio.'
    ],
    howItWorks: 'Cahaya dimasukkan ke dalam Core (inti kaca) dengan sudut datang kritis. Karena indeks bias Core lebih tinggi daripada Cladding (lapisan selubung kaca luar), gelombang cahaya dipantulkan sempurna di dalam batas dinding inti dan merambat tanpa bocor keluar.',
    keyPinsOrComponents: [
      { name: 'Core (Inti Kaca)', desc: 'Silika murni tempat merambatnya sinar cahaya (Single-mode: 9µm, Multi-mode: 50/62.5µm).' },
      { name: 'Cladding (Selubung)', desc: 'Lapisan kaca pelindung berdiameter 125µm dengan indeks bias lebih rendah.' },
      { name: 'Coating / Buffer', desc: 'Lapisan pelindung plastik berwarna untuk melindungi kaca dari kelembaban.' },
      { name: 'Aramid Yarn (Kevlar)', desc: 'Serat sintetis kuat tahan tarikan saat kabel ditarik di tiang atau pipa bawah tanah.' }
    ],
    usageExamples: [
      'Kabel Drop Core 1-core / 2-core FTTH dari tiang ISP ke ruang server.',
      'Kabel Patchcord SC-LC Duplex Single-mode menghubungkan SFP switch ke OTB.'
    ],
    relatedEquipment: ['SFP Module', 'Modem', 'Switch'],
    specs: {
      types: 'Single Mode (Kuning, jarak jauh >10km) & Multi Mode (Oranye/Aqua, jarak dekat <500m)',
      bandwidth: '10 Gbps - 400 Gbps per pasang serat',
      attenuation: 'Sangat rendah (0.2 dB/km pada 1550nm)',
      coreDiameter: '9/125 µm (Single Mode), 50/125 µm (OM3 Multi Mode)'
    },
    badgeColor: 'yellow'
  },
  {
    id: 'net-rj45-connector',
    nameId: 'Konektor RJ45 (8P8C)',
    nameEn: 'RJ45 Modular Plug (8P8C)',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Ujung konektor modular 8 pin untuk terminasi kabel UTP ke kartu antarmuka jaringan (NIC).',
    description: 'RJ45 (Registered Jack 45) dengan form factor modular 8P8C (8 Positions, 8 Contacts) adalah konektor fisik standar dunia untuk kabel Ethernet twisted pair. Di dalam konektor terdapat 8 jalur tembaga berlapis emas yang akan menusuk kawat saat ditekan menggunakan crimping tool.',
    mainFunctions: [
      'Terminasi kedua ujung kabel UTP agar dapat dicolokkan ke port RJ45 switch, router, atau PC.',
      'Menjaga urutan susunan warna kabel T568A atau T568B tetap sejajar dan kokoh.',
      'Klip pengunci (locking tab) memastikan konektor tidak mudah lepas dari lubang jack port.'
    ],
    howItWorks: 'Kawat 8 warna disusun lurus, dipotong rata, dan didorong hingga menyentuh dasar konektor bening. Saat tang crimping ditekan kencang, gigi tembaga tajam menusuk jaket isolasi tipis kawat tembaga dan menciptakan kontak listrik yang konduktif.',
    keyPinsOrComponents: [
      { name: 'Pin 1 - 8 Gold Plated Blades', desc: 'Bilah kontak tembaga bersepuh emas 50 micron untuk konduktivitas tinggi anti korosi.' },
      { name: 'Locking Latch (Klip Pengunci)', desc: 'Klip fleksibel di bagian atas untuk mengunci steker ke dalam port RJ45.' },
      { name: 'Strain Relief Wedge', desc: 'Baji plastik di pangkal konektor yang menjepit jaket luar kabel UTP agar tidak mudah tertarik.' }
    ],
    usageExamples: [
      'Membuat kabel straight T568B di kedua ujung untuk praktikum dasar SIJA.',
      'Terminasi konektor Cat6 Pass-Through untuk memudahkan melihat urutan warna.'
    ],
    relatedEquipment: ['UTP Cable', 'Crimping Tool', 'LAN Tester'],
    specs: {
      type: '8P8C Modular Connector',
      standard: 'TIA/EIA-568-B',
      material: 'Polycarbonate Transparan dengan Kontak Tembaga Berlapis Emas',
      variant: 'Standard RJ45 & Pass-Through (EZ RJ45)'
    },
    badgeColor: 'blue'
  },
  {
    id: 'net-crimping-tool',
    nameId: 'Tang Crimping (Crimping Tool)',
    nameEn: 'Modular Crimping Tool',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Alat perkakas tangan untuk memotong, mengupas, dan menjepit konektor RJ45 dan RJ11 pada kabel.',
    description: 'Tang crimping adalah alat perkakas esensial bagi teknisi jaringan SIJA. Alat ini memiliki mekanisme tuas berkekuatan tinggi dengan cetakan matras logam yang presisi untuk menekan bilah kontak konektor RJ45 hingga menusuk kawat tembaga secara serentak.',
    mainFunctions: [
      'Crimping / Mengunci konektor RJ45 (8P8C) dan RJ11 (6P4C/6P2C).',
      'Mengupas selubung isolator luar (outer jacket) kabel UTP tanpa melukai kawat tembaga di dalamnya.',
      'Memotong kabel tembaga secara tegak lurus dan rata sebelum dimasukkan ke konektor.'
    ],
    howItWorks: 'Pengguna memasukkan konektor RJ45 yang sudah terpasang kabel ke dalam lubang cetakan 8P. Ketika pegangan ditekan sampai bunyi "klik" ratchet terbuka penuh, tonjolan logam menekan 8 bilah emas ke bawah sekaligus menekan baji strain relief jaket kabel.',
    keyPinsOrComponents: [
      { name: 'Die Cavity 8P (RJ45)', desc: 'Slot cetakan untuk menjepit konektor Ethernet 8 pin.' },
      { name: 'Die Cavity 6P (RJ11/RJ12)', desc: 'Slot cetakan untuk konektor kabel telepon 6 pin.' },
      { name: 'Stripping Blade', desc: 'Mata pisau melingkar untuk mengupas jaket kabel luar.' },
      { name: 'Ratchet Mechanism', desc: 'Mekanisme gerigi pengunci yang memastikan tekanan kompresi tuntas sebelum tang bisa dilepas.' }
    ],
    usageExamples: [
      'Praktikum Uji Kompetensi Keahlian (UKK) perakitan kabel straight dan cross.',
      'Pembuatan kabel patch cord kustom di ruang server.'
    ],
    relatedEquipment: ['RJ45 Connector', 'UTP Cable', 'LAN Tester'],
    specs: {
      supportedPlugs: 'RJ45 (8P8C), RJ11/RJ12 (6P6C, 6P4C), RJ22 (4P4C)',
      bodyMaterial: 'Baja Karbon Berkekuatan Tinggi (Carbon Steel)',
      grip: 'Karet Ergonomis Anti Selip'
    },
    badgeColor: 'emerald'
  },
  {
    id: 'net-lan-tester',
    nameId: 'LAN Cable Tester',
    nameEn: 'RJ45 Network Cable Tester',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Alat uji kontinuitas elektrik untuk memverifikasi kebenaran dan keutuhan sambungan 8 pin kabel UTP.',
    description: 'LAN Tester adalah instrumen pengujian portabel bertenaga baterai 9V yang terdiri dari dua unit: Unit Master (pemancar) dan Unit Remote (penerima). Alat ini digunakan untuk mendeteksi apakah ada kawat yang terputus (open), korsleting (short), atau urutan warna yang tertukar (miswired/reversed).',
    mainFunctions: [
      'Memverifikasi sambungan 8 kawat tembaga kabel UTP dan ground pin (G/Shield).',
      'Menguji kabel tipe Straight-Through (lampu menyala urut 1 sampai 8 serentak di kedua unit).',
      'Menguji kabel tipe Cross-Over (lampu di unit remote melompat 3-6-1-4-5-2-7-8).',
      'Mendeteksi kawat putus di tengah jalur tarikan kabel plafon yang panjang.'
    ],
    howItWorks: 'Unit Master mengirimkan pulsa tegangan rendah secara berurutan dari Pin 1 sampai Pin 8. Sinyal listrik mengalir melalui kawat kabel menuju Unit Remote dan menyalakan lampu LED yang sesuai secara bergantian. Pengguna mengamati urutan kedipan lampu LED.',
    keyPinsOrComponents: [
      { name: 'Master Unit', desc: 'Unit utama dengan tombol switch daya (ON / SLOW / OFF) dan soket RJ45/RJ11.' },
      { name: 'Remote Terminator Unit', desc: 'Unit pendamping yang bisa dilepas dan dibawa ke ujung ruangan lain.' },
      { name: 'LED Bar 1 - 8 & G', desc: '9 baris lampu LED hijau/merah indikator status kontinuitas tiap pin.' }
    ],
    usageExamples: [
      'Memeriksa hasil crimping kabel UTP siswa sebelum dicolok ke switch lab.',
      'Troubleshooting mencari kabel LAN yang putus kawat nomor 3 dan 6 saat PC hanya mendapat link speed 100Mbps bukannya 1Gbps.'
    ],
    relatedEquipment: ['Crimping Tool', 'RJ45 Connector', 'UTP Cable'],
    specs: {
      testTypes: 'RJ45 (UTP/STP), RJ11, RJ12',
      powerSource: 'Baterai Kotak 9V (6F22)',
      speedSettings: 'Fast Scan & Slow Scan untuk pengamatan detail'
    },
    badgeColor: 'cyan'
  },
  {
    id: 'net-punch-down',
    nameId: 'Punch Down Tool (Impact Tool)',
    nameEn: 'Impact Punch Down Tool',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Alat penekan kabel ke blok terminal IDC Patch Panel dan Modular Jack Wallplate.',
    description: 'Punch Down Tool (sering disebut tang impact atau pisau krone) adalah alat mekanik pegas yang berfungsi memasukkan kawat tembaga kabel UTP ke dalam slot IDC sekaligus memotong kelebihan ujung sisa kawat tembaga secara bersih dan rapi hanya dalam satu kali hentakan.',
    mainFunctions: [
      'Terminasi kabel UTP ke blok terminal IDC di bagian belakang Patch Panel rak server.',
      'Pemasangan kabel ke Modular Keystone Jack RJ45 pada stopkontak dinding (Faceplate).',
      'Memastikan kawat tembaga terjepit rapat dengan tekanan pegas standar industri telekomunikasi.'
    ],
    howItWorks: 'Ujung bilah (blade) ditempatkan di atas kawat tembaga yang berada di celah IDC. Ketika alat ditekan ke bawah, mekanisme pegas internal melepaskan gaya hentakan (impact shock) yang mendorong kawat ke celah pisau terminal dan sisi mata pisau luar otomatis memotong sisa kawat tembaga.',
    keyPinsOrComponents: [
      { name: 'Reversible Blade (110 / Krone)', desc: 'Mata pisau baja bolak-balik: satu sisi untuk standar 110 dan sisi lain untuk terminal Krone.' },
      { name: 'Impact Adjustment Dial (HI / LO)', desc: 'Putaran pengatur kekuatan pegas impact untuk kabel tipis 24 AWG (LO) atau tebal 23 AWG (HI).' },
      { name: 'Wire Hook & Spudger', desc: 'Kait lipat kecil di samping bodi alat untuk mencungkil kawat yang salah pasang.' }
    ],
    usageExamples: [
      'Pemasangan 24 kabel LAN ke Patch Panel Cat6 di rack server lab SIJA.',
      'Instalasi keystone jack RJ45 di meja praktikum siswa.'
    ],
    relatedEquipment: ['Patch Panel', 'UTP Cable', 'Switch'],
    specs: {
      bladeType: 'Tipe 110 & 66 / Krone Reversible with Cut & No-Cut Ends',
      impactForce: 'Low (10kg) / High (15kg) Adjustable',
      handle: 'Bodi kokoh berinsulasi karet'
    },
    badgeColor: 'teal'
  },
  {
    id: 'net-sfp-module',
    nameId: 'Modul SFP / SFP+ Transceiver',
    nameEn: 'Small Form-factor Pluggable (SFP) Transceiver',
    category: 'networking',
    categoryLabel: 'Perangkat Jaringan',
    shortDesc: 'Modul transceiver hot-pluggable untuk menghubungkan switch ke kabel fiber optic atau tembaga.',
    description: 'SFP (Small Form-factor Pluggable) adalah modul konverter antarmuka fisik yang kompak dan hot-swappable (dapat dipasang/dicabut saat perangkat menyala). SFP memungkinkan port uplink switch Cisco atau MikroTik beradaptasi dengan berbagai media transmisi (Fiber Optic Single Mode, Multi Mode, atau Tembaga RJ45).',
    mainFunctions: [
      'Mengubah sinyal elektrik bus internal switch menjadi pulsa cahaya laser optik.',
      'Mendukung kecepatan 1.25 Gbps (SFP standar) dan 10 Gbps (SFP+).',
      'Menghubungkan core switch di gedung A dengan switch distribusi di gedung B via kabel serat optik jarak jauh.'
    ],
    howItWorks: 'Modul SFP dicolokkan ke dalam slot cage SFP pada switch. Di sisi depan SFP terdapat konektor optik LC Duplex (TX untuk transmitter laser dan RX untuk receiver photodiode). Chip DDM (Digital Diagnostic Monitoring) di dalam SFP terus melaporkan suhu, tegangan, daya pancar laser (TX Power), dan daya terima cahaya (RX Power) ke switch.',
    keyPinsOrComponents: [
      { name: 'LC Duplex Optical Ports', desc: 'Dua lubang konektor optik mini (Tx = Pemancar, Rx = Penerima cahaya).' },
      { name: 'Bail Latch (Tuas Pelepas)', desc: 'Kawat tuas pengunci yang ditarik ke bawah untuk melepaskan modul dari slot switch.' },
      { name: 'Gold Finger Connector', desc: 'Deretan pin emas 20-pin di bagian belakang yang menancap ke motherboard switch.' }
    ],
    usageExamples: [
      'MikroTik S-85DLC05D (Multi-mode 850nm 550m) untuk koneksi antar-rak server.',
      'Cisco GLC-LH-SMD (Single-mode 1310nm 10km) untuk link antar-kampus sekolah.'
    ],
    relatedEquipment: ['Fiber Optic Cable', 'Switch', 'Router'],
    specs: {
      formFactor: 'SFP (1.25G) / SFP+ (10G) / SFP28 (25G)',
      wavelength: '850 nm (MMF), 1310 nm / 1550 nm (SMF)',
      transmissionDistance: '550 meter (SX Multi-mode) hingga 10 km - 80 km (LX/EX Single-mode)',
      connectorType: 'LC Duplex'
    },
    badgeColor: 'sky'
  },

  // --- B. SIOT & ELECTRONICS COMPONENTS ---
  {
    id: 'iot-esp32',
    nameId: 'Modul Mikrokontroler ESP32',
    nameEn: 'ESP32 IoT Development Board',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'System-on-Chip 32-bit berkemampuan Wi-Fi & Bluetooth untuk proyek Internet of Things dan otomasi.',
    description: 'ESP32 adalah mikrokontroler SoC berbiaya terjangkau dengan konsumsi daya sangat rendah yang diproduksi oleh Espressif Systems. Ditenagai prosesor Xtensa Dual-Core 32-bit LX6 berkecepatan hingga 240 MHz, ESP32 menjadi standar emas pembelajaran IoT di SMK SIJA untuk menghubungkan sensor ke internet.',
    mainFunctions: [
      'Membaca nilai sensor analog dan digital (suhu, kelembaban, gerak, jarak, gas).',
      'Mengirimkan data telemetri ke cloud server via protokol MQTT, HTTP REST API, atau WebSockets.',
      'Mengontrol aktuator (relay, motor servo, buzzer, display OLED/LCD).',
      'Mendukung Bluetooth Low Energy (BLE) untuk konfigurasi via smartphone siswa.'
    ],
    howItWorks: 'ESP32 mengeksekusi program firmware (dibuat via Arduino IDE atau ESP-IDF). Firmware membaca pin GPIO dengan fungsi ADC (Analog-to-Digital Converter), memproses logika algoritma, lalu menghubungkan radio WiFi bawaan ke access point laboratorium untuk mengunggah data sensor ke dashboard cloud.',
    keyPinsOrComponents: [
      { name: '3V3 & GND', desc: 'Pin catu daya 3.3 Volt teregulasi dan ground sirkuit.' },
      { name: 'VIN (5V)', desc: 'Pin input daya dari USB atau adaptor 5V sebelum masuk regulator AMS1117.' },
      { name: 'GPIO 21 (SDA) & GPIO 22 (SCL)', desc: 'Jalur komunikasi bus I2C untuk layar OLED dan sensor cerdas.' },
      { name: 'GPIO 36 (VP) & GPIO 39 (VN)', desc: 'Pin input analog murni dengan resolusi 12-bit (0 - 4095).' },
      { name: 'Tombol EN & BOOT', desc: 'EN untuk restart mikrokontroler; BOOT untuk memicu mode upload firmware.' },
      { name: 'Antena PCB Meander', desc: 'Jalur tembaga antena di ujung papan untuk memancarkan sinyal radio Wi-Fi 2.4 GHz.' }
    ],
    usageExamples: [
      'Proyek Smart Greenhouse pemantau suhu dan penyiram tanaman otomatis.',
      'Sistem Absensi RFID Siswa yang terhubung langsung ke database MySQL server sekolah.'
    ],
    relatedEquipment: ['Breadboard', 'Jumper Wires', 'DHT11 / DHT22', 'Relay Module'],
    specs: {
      cpu: 'Xtensa Dual-Core 32-bit LX6 up to 240 MHz',
      wireless: 'Wi-Fi 802.11 b/g/n (2.4 GHz) & Bluetooth v4.2 BR/EDR + BLE',
      ram: '520 KB SRAM + 4MB SPI Flash Memory',
      logicVoltage: '3.3V (HATI-HATI: Tidak toleran tegangan 5V!)'
    },
    badgeColor: 'blue'
  },
  {
    id: 'iot-arduino-uno',
    nameId: 'Arduino Uno R3',
    nameEn: 'Arduino Uno R3 Development Board',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'Papan mikrokontroler berbasis ATmega328P yang ideal untuk mempelajari dasar logika elektronika dan pemrograman mikrokontroler.',
    description: 'Arduino Uno adalah papan mikrokontroler open-source legendaris berbasis chip 8-bit ATmega328P. Dengan ekosistem perpustakaan yang sangat matang dan pin header perempuan yang kokoh, Arduino Uno adalah media belajar awal sebelum siswa beralih ke ESP32 yang lebih kompleks.',
    mainFunctions: [
      'Mempelajari dasar pemrograman logika mikrokontroler bahasa C/C++.',
      'Membaca 6 pin masukan analog (A0 - A5) dengan resolusi ADC 10-bit (0 - 1023).',
      'Mengeluarkan sinyal Pulse Width Modulation (PWM) untuk mengatur kecerahan LED atau kecepatan motor DC.'
    ],
    howItWorks: 'Chip ATmega328P mengeksekusi instruksi dari Flash Memory 32KB pada kecepatan clock kristal 16 MHz. Chip ATmega16U2 di dekat port USB berfungsi sebagai jembatan USB-to-Serial yang memungkinkan upload program langsung dari laptop siswa.',
    keyPinsOrComponents: [
      { name: '14 Pin Digital I/O (Pin 0 - 13)', desc: 'Pin input/output digital; Pin 3, 5, 6, 9, 10, 11 bertanda (~) mendukung PWM 8-bit.' },
      { name: '6 Pin Analog Input (A0 - A5)', desc: 'Membaca tegangan analog 0 - 5V menjadi angka digital 0 - 1023.' },
      { name: 'Pin 5V, 3.3V, GND, RESET', desc: 'Keluaran daya untuk rangkaian komponen di breadboard.' },
      { name: 'DC Barrel Jack (7-12V)', desc: 'Soket untuk adaptor catu daya eksternal baterai kotak 9V.' }
    ],
    usageExamples: [
      'Latihan dasar Blink LED dan running LED siswa kelas X SIJA.',
      'Sistem palang pintu otomatis parkir sekolah menggunakan motor servo dan ultrasonik.'
    ],
    relatedEquipment: ['Breadboard', 'Servo Motor', 'Ultrasonic Sensor HC-SR04', 'LED'],
    specs: {
      microcontroller: 'ATmega328P 8-bit AVR',
      operatingVoltage: '5V (Toleran daya eksternal 7 - 12V DC)',
      clockSpeed: '16 MHz Quartz Crystal',
      memory: '32 KB Flash (0.5 KB untuk bootloader), 2 KB SRAM, 1 KB EEPROM'
    },
    badgeColor: 'teal'
  },
  {
    id: 'iot-breadboard',
    nameId: 'Breadboard / Project Board (830 Titik)',
    nameEn: 'Solderless Breadboard',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'Papan perakitan sirkuit prototipe tanpa solder untuk merangkai komponen elektronik dengan cepat dan aman.',
    description: 'Breadboard adalah papan plastik berlubang yang di dalamnya terdapat deretan klip pegas logam berkonduktivitas tinggi. Siswa dapat menancapkan kaki komponen resistor, LED, sensor, dan kabel jumper tanpa perlu menyolder, sehingga komponen dapat digunakan kembali berulang kali.',
    mainFunctions: [
      'Merakit prototipe sirkuit elektronika dan mikrokontroler dengan cepat.',
      'Menyediakan rel distribusi daya (Power Rails) positif (+) dan negatif (-) di sepanjang papan.',
      'Mencegah kerusakan komponen akibat panas solder saat masih dalam tahap uji coba.'
    ],
    howItWorks: 'Di dalam badan plastik terdapat pelat logam lentur: baris horisontal di bagian tengah terhubung sepanjang 5 lubang (a-b-c-d-e dan f-g-h-i-j), dipisahkan oleh parit tengah (center divider). Sedangkan dua baris di tepi atas dan bawah (rel merah dan biru) terhubung secara vertikal sepanjang papan untuk mendistribusikan VCC dan Ground.',
    keyPinsOrComponents: [
      { name: 'Power Rails (+ dan -)', desc: 'Dua jalur panjang di sisi tepi: Merah (+) untuk VCC daya dan Biru/Hitam (-) untuk Ground.' },
      { name: 'Terminal Strips (Baris 1 - 63)', desc: 'Deretan 5 lubang terhubung tempat menancapkan kaki komponen dan kabel jumper.' },
      { name: 'Center Trench / Parit Tengah', desc: 'Parit pemisah selebar 0.3 inci yang dirancang pas untuk menancapkan IC DIP atau mikrokontroler ESP32.' }
    ],
    usageExamples: [
      'Merangkai sirkuit sensor DHT22 dengan ESP32 sebelum dibuat menjadi PCB permanen.',
      'Merakit pembagi tegangan resistor untuk sensor LDR cahaya.'
    ],
    relatedEquipment: ['Jumper Wires', 'Resistor', 'LED', 'ESP32'],
    specs: {
      tiePoints: '830 Titik Lubang Kontak (Standard Full Size)',
      pitch: 'Pitch standar 2.54 mm (0.1 inci)',
      currentRating: 'Maksimum 1.5 - 2 Ampere pada tegangan rendah (<15V DC)'
    },
    badgeColor: 'emerald'
  },
  {
    id: 'iot-jumper-wires',
    nameId: 'Kabel Jumper (Male-to-Male, Male-to-Female, Female-to-Female)',
    nameEn: 'DuPont Jumper Wires',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'Kabel penghubung fleksibel dengan ujung pin DuPont untuk interkoneksi modul dan mikrokontroler.',
    description: 'Kabel jumper DuPont adalah kabel serabut tembaga fleksibel berisolasi PVC berwarna-warni yang memiliki pin konektor standar 2.54mm di kedua ujungnya. Kabel ini sangat memudahkan siswa menyambungkan pin ESP32 ke sensor tanpa resiko korsleting.',
    mainFunctions: [
      'Menghubungkan pin mikrokontroler (Arduino/ESP32) ke lubang breadboard.',
      'Menghubungkan pin header sensor (DHT22, Relay, Ultrasonik) ke papan mikrokontroler.',
      'Kode warna kabel (Merah=VCC, Hitam=GND, Kuning/Hijau=Data) memudahkan pelacakan sirkuit.'
    ],
    howItWorks: 'Ujung jarum Male dirancang pas untuk masuk ke lubang breadboard atau pin header Female. Ujung soket Female dirancang pas untuk memeluk pin header jarum Male pada modul mikrokontroler atau sensor.',
    keyPinsOrComponents: [
      { name: 'Male-to-Male (M-M)', desc: 'Kedua ujung berbentuk jarum; dipakai untuk menghubungkan dua lubang pada breadboard.' },
      { name: 'Male-to-Female (M-F)', desc: 'Satu jarum dan satu soket lubang; dipakai dari ESP32/Arduino ke modul sensor sensorik.' },
      { name: 'Female-to-Female (F-F)', desc: 'Kedua ujung soket lubang; dipakai langsung dari pin mikrokontroler ke pin modul sensor.' }
    ],
    usageExamples: [
      'Menghubungkan modul relay 5V ke pin GPIO 23 ESP32.',
      'Menghubungkan pin VCC breadboard ke pin 3V3 ESP32.'
    ],
    relatedEquipment: ['Breadboard', 'ESP32', 'Arduino Uno'],
    specs: {
      conductor: 'Kawat Tembaga Serabut Berisolasi PVC Tahan Panas',
      length: '10 cm, 20 cm, dan 30 cm',
      connectorPitch: 'Standard 2.54 mm DuPont Terminal'
    },
    badgeColor: 'indigo'
  },
  {
    id: 'iot-pir-sensor',
    nameId: 'Sensor Gerak PIR (HC-SR501)',
    nameEn: 'Passive Infrared (PIR) Motion Sensor',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'Sensor pendeteksi radiasi panas inframerah tubuh manusia untuk mendeteksi pergerakan di ruangan.',
    description: 'Sensor PIR (Passive Infrared) HC-SR501 mendeteksi perubahan tingkat radiasi inframerah yang dipancarkan oleh objek hangat, khususnya tubuh manusia dan hewan. Sensor ini bersifat pasif karena tidak memancarkan energi sendiri, melainkan hanya menyerap radiasi inframerah dari lingkungan.',
    mainFunctions: [
      'Mendeteksi keberadaan orang di dalam ruangan laboratorium atau koridor sekolah.',
      'Memicu alarm keamanan anti-maling otomatis berbasis IoT.',
      'Menghemat energi dengan mematikan lampu lab secara otomatis saat ruangan kosong.'
    ],
    howItWorks: 'Lensa Fresnel berbentuk kubah putih memfokuskan radiasi inframerah ke elemen piroelektrik ganda di dalamnya. Ketika seseorang melintas, satu elemen mendeteksi kenaikan panas sebelum elemen lainnya. Perbedaan muatan listrik ini diolah chip BISS0001 dan menghasilkan pulsa tegangan digital HIGH (3.3V) pada pin Output.',
    keyPinsOrComponents: [
      { name: 'VCC (5V - 12V DC)', desc: 'Pin masukan daya positif (di dalam modul terdapat regulator bawaan 3.3V).' },
      { name: 'OUT (Digital 3.3V)', desc: 'Pin keluaran sinyal: HIGH saat ada gerakan terdeteksi, LOW saat diam.' },
      { name: 'GND', desc: 'Pin ground (0V).' },
      { name: 'Potensiometer Sensitivitas (Sx)', desc: 'Memutar untuk mengatur jarak jangkauan deteksi (3 meter hingga 7 meter).' },
      { name: 'Potensiometer Waktu Tunda (Tx)', desc: 'Memutar untuk mengatur durasi sinyal HIGH bertahan (3 detik hingga 300 detik).' },
      { name: 'Jumper Trigger Mode (H / L)', desc: 'Mode H (Retrigger): Output tetap HIGH selama orang terus bergerak; Mode L (Non-retrigger).' }
    ],
    usageExamples: [
      'Sistem alarm penyusup lab komputer yang mengirim notifikasi pesan Telegram bot ke guru piket.',
      'Otomasi saklar lampu toilet sekolah ramah lingkungan.'
    ],
    relatedEquipment: ['ESP32', 'Relay Module', 'Buzzer'],
    specs: {
      operatingVoltage: 'DC 4.5V - 20V (Output level 3.3V CMOS compatible dengan ESP32)',
      detectionAngle: '< 100 derajat cone angle (lensa Fresnel)',
      detectionRange: '3 - 7 meter adjustable',
      standbyCurrent: '< 50 mikroAmpere (sangat hemat baterai)'
    },
    badgeColor: 'rose'
  },
  {
    id: 'iot-hc-sr04',
    nameId: 'Sensor Ultrasonik HC-SR04',
    nameEn: 'HC-SR04 Ultrasonic Distance Sensor',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'Sensor pengukur jarak tanpa kontak presisi menggunakan pantulan gelombang suara frekuensi tinggi 40 kHz.',
    description: 'HC-SR04 adalah modul sensor jarak non-kontak yang sangat populer dalam pembelajaran robotika dan SIoT. Sensor ini bekerja persis seperti sistem sonar kelelawar atau kapal selam: memancarkan gelombang suara ultrasonik 40.000 Hz yang tidak terdengar oleh telinga manusia, lalu menghitung waktu pantulannya kembali.',
    mainFunctions: [
      'Mengukur jarak objek secara presisi dari 2 cm hingga 400 cm dengan akurasi hingga 3 mm.',
      'Sistem pemantau volume isi tangki air / tandon laboratorium otomatis.',
      'Sensor anti-tabrakan pada robot halang rintang (obstacle avoidance robot) siswa SIJA.'
    ],
    howItWorks: 'Mikrokontroler memberikan pulsa HIGH selama minimal 10 mikrodetik ke pin Trig. Modul otomatis memancarkan 8 siklus pulsa suara 40 kHz dari transduser pemancar (T). Gelombang memantul mengenai benda dan ditangkap transduser penerima (R). Pin Echo akan menghasilkan pulsa HIGH dengan durasi sebanding dengan lama waktu tempuh suara: Jarak = (Waktu Echo x Kecepatan Suara 0.034 cm/µs) / 2.',
    keyPinsOrComponents: [
      { name: 'VCC (5V DC)', desc: 'Pin catu daya tegangan 5V.' },
      { name: 'Trig (Trigger Input)', desc: 'Menerima sinyal pemicu pulsa 10µs dari mikrokontroler.' },
      { name: 'Echo (Echo Output)', desc: 'Mengeluarkan pulsa dengan durasi proporsional terhadap jarak pantulan (5V level, butuh voltage divider untuk ESP32).' },
      { name: 'GND', desc: 'Pin ground (0V).' },
      { name: 'Transduser T & R', desc: 'Dua corong silinder logam: "T" Transmitter (pemancar suara) dan "R" Receiver (penerima).' }
    ],
    usageExamples: [
      'Sistem tempat sampah pintar (Smart Dustbin) yang membuka tutup otomatis saat tangan mendekat.',
      'Deteksi ketinggian air sungai untuk sistem peringatan dini banjir berbasis IoT.'
    ],
    relatedEquipment: ['Arduino Uno', 'ESP32', 'Servo Motor', 'Buzzer'],
    specs: {
      workingVoltage: 'DC 5V',
      operatingCurrent: '15 mA',
      measuringRange: '2 cm hingga 400 cm (4 meter)',
      measuringAngle: '15 derajat sudut pancaran efektif'
    },
    badgeColor: 'sky'
  },
  {
    id: 'iot-dht22',
    nameId: 'Sensor Suhu & Kelembaban DHT22 (AM2302)',
    nameEn: 'DHT22 Digital Temperature & Humidity Sensor',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'Sensor digital berakurasi tinggi untuk membaca suhu dan kelembaban udara ruang server.',
    description: 'DHT22 (juga dikenal sebagai AM2302) adalah sensor kelembaban dan suhu digital dengan sinyal keluaran digital terkalibrasi. Menggunakan sensor kelembaban kapasitif dan termistor presisi, chip mikroprosesor 8-bit internalnya mengubah pembacaan analog menjadi protokol 1-wire digital 40-bit yang kebal terhadap derau kabel panjang.',
    mainFunctions: [
      'Monitoring suhu ruangan server lab SIJA secara real-time untuk mencegah overheat mesin server.',
      'Mengukur kelembaban relatif (Relative Humidity %RH) udara untuk mencegah korosi perangkat jaringan.',
      'Memicu kipas pendingin atau pendingin AC otomatis saat suhu melebihi ambang batas aman (threshold).'
    ],
    howItWorks: 'Mikrokontroler menarik jalur data LOW selama 1-10 ms untuk memberi sinyal mulai (start signal). DHT22 merespons dengan mengirimkan 40 bit data: 16 bit untuk data kelembaban, 16 bit untuk data suhu (termasuk bit penanda nilai minus di bawah nol derajat), dan 8 bit checksum untuk memverifikasi keabsahan data.',
    keyPinsOrComponents: [
      { name: 'Pin 1: VCC (3.3V - 5.5V DC)', desc: 'Pin daya (bekerja sangat baik langsung dengan logika 3.3V ESP32).' },
      { name: 'Pin 2: DATA (SDA)', desc: 'Jalur komunikasi serial 1-kawat dua arah (bidirectional 1-wire).' },
      { name: 'Pin 3: NC (No Connection)', desc: 'Pin kosong tidak terhubung ke rangkaian internal.' },
      { name: 'Pin 4: GND (Ground)', desc: 'Pin ground (0V).' },
      { name: 'Resistor Pull-Up 4.7kΩ - 10kΩ', desc: 'Resistor yang wajib dipasang antara pin VCC dan DATA agar kondisi idle berlogika HIGH.' }
    ],
    usageExamples: [
      'Monitoring kondisi suhu dan kelembaban Rack Server 19 inci di ruang Data Center sekolah.',
      'Sistem inkubator penetas telur cerdas berbasis IoT.'
    ],
    relatedEquipment: ['ESP32', 'DC Fan', 'Relay Module'],
    specs: {
      temperatureRange: '-40°C hingga +80°C (akurasi ±0.5°C)',
      humidityRange: '0 - 100% RH (akurasi ±2% RH)',
      samplingRate: '0.5 Hz (Satu kali pembacaan setiap 2 detik)',
      operatingVoltage: '3.3V hingga 5.5V DC'
    },
    badgeColor: 'emerald'
  },
  {
    id: 'iot-ldr-sensor',
    nameId: 'Sensor Cahaya LDR (Light Dependent Resistor)',
    nameEn: 'LDR Photoresistor Sensor Module',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'Resistor peka cahaya yang nilai hambatannya berubah drastis sesuai intensitas cahaya lingkungan.',
    description: 'LDR (Light Dependent Resistor) atau fotoresistor adalah komponen pasif elektronik berbahan semikonduktor Kadmium Sulfida (CdS). Ketika foton cahaya mengenai permukaan LDR, elektron valensi melompat ke pita konduksi sehingga resistansi hambatan komponen turun drastis (dari Megaohm saat gelap gulita menjadi beberapa ratus Ohm saat terang benderang).',
    mainFunctions: [
      'Mendeteksi kondisi terang atau gelap di lingkungan laboratorium atau halaman sekolah.',
      'Penyalaan lampu jalan otomatis (Smart Street Light) saat matahari terbenam.',
      'Pengukuran intensitas cahaya dalam stasiun cuaca IoT (Weather Station).'
    ],
    howItWorks: 'LDR dirangkai dalam konfigurasi Pembagi Tegangan (Voltage Divider) bersama resistor tetap 10kΩ. Perubahan nilai resistansi LDR menghasilkan variasi tegangan analog (0 - 3.3V) yang dibaca oleh pin ADC ESP32. Modul LDR yang sudah jadi juga dilengkapi chip komparator LM393 untuk menghasilkan sinyal digital DO (HIGH/LOW).',
    keyPinsOrComponents: [
      { name: 'VCC (3.3V - 5V)', desc: 'Pin masukan daya modul.' },
      { name: 'GND', desc: 'Pin ground.' },
      { name: 'DO (Digital Output)', desc: 'Keluaran komparator LM393: LOW saat terang melampaui batas potensiometer, HIGH saat gelap.' },
      { name: 'AO (Analog Output)', desc: 'Keluaran tegangan analog kontinu sebanding dengan intensitas cahaya.' },
      { name: 'Permukaan Lensa Berliku CdS', desc: 'Jalur sensor zat peka cahaya berbentuk gelombang zig-zag.' }
    ],
    usageExamples: [
      'Lampu koridor lab SIJA yang otomatis menyala ketika waktu maghrib tiba.',
      'Sistem pelacak posisi matahari (Solar Tracker) untuk panel surya laboratorium.'
    ],
    relatedEquipment: ['ESP32', 'Resistor', 'Relay Module'],
    specs: {
      darkResistance: '1 MΩ hingga 10 MΩ (saat 0 Lux)',
      lightResistance: '100 Ω hingga 2 kΩ (saat 1000 Lux cahaya matahari)',
      spectralPeak: '540 nm (paling sensitif pada spektrum cahaya hijau-kuning mirip mata manusia)',
      responseSpeed: '20 - 30 milidetik'
    },
    badgeColor: 'amber'
  },
  {
    id: 'iot-relay-module',
    nameId: 'Modul Relay 1-Channel (5V Optocoupler)',
    nameEn: '5V Optocoupler Relay Module',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'Saklar elektromagnetik terisolasi optik untuk mengendalikan peralatan listrik tegangan tinggi 220V dari mikrokontroler.',
    description: 'Modul Relay adalah saklar mekanis bertenaga elektromagnetik yang memungkinkan mikrokontroler bertegangan rendah (ESP32 3.3V atau Arduino 5V) menyalakan atau mematikan perangkat berdaya tinggi seperti lampu AC 220V, pompa air, atau kipas angin tanpa risiko sengatan listrik balik.',
    mainFunctions: [
      'Menghubungkan mikrokontroler digital ke sirkuit listrik AC 220V rumah tangga.',
      'Menyediakan isolasi galvanik penuh antara rangkaian logika mikrokontroler dan rangkaian beban besar.',
      'Menjadi aktuator utama dalam sistem Smart Home dan otomasi industri sekolah.'
    ],
    howItWorks: 'Saat pin IN diberi sinyal aktif (Active LOW pada kebanyakan modul), chip isolator cahaya (Optocoupler EL817) menyalakan transistor penggerak internal. Arus mengalir melalui kumparan solenoid relay, menciptakan medan magnet yang menarik kontak pelat pegas mekanik dari posisi Normal (NC) menuju posisi Tertutup (NO). Terdengar bunyi "klik" yang khas.',
    keyPinsOrComponents: [
      { name: 'Sisi Kontrol (VCC, GND, IN)', desc: 'Pin masukan dari mikrokontroler: VCC (5V), GND, dan pin sinyal kendali IN.' },
      { name: 'Terminal Terminal Blok Sekrup AC', desc: 'Terminal baut untuk kabel listrik beban bertegangan tinggi.' },
      { name: 'COM (Common)', desc: 'Terminal utama tempat memasukkan satu jalur kabel fasa listrik PLN 220V.' },
      { name: 'NO (Normally Open)', desc: 'Terbuka saat relay mati, tersambung saat relay diberi sinyal ON (paling sering dipakai untuk lampu).' },
      { name: 'NC (Normally Closed)', desc: 'Tersambung saat relay mati, terputus saat relay diberi sinyal ON.' },
      { name: 'Dioda Flyback (1N4148)', desc: 'Dioda pelindung yang meredam lonjakan tegangan induksi kumparan saat saklar dilepas.' }
    ],
    usageExamples: [
      'Mematikan stopkontak komputer lab secara serentak via dashboard web pengawas ujian.',
      'Sistem penyiram tanaman otomatis yang mengaktifkan pompa air 220V selama 30 detik.'
    ],
    relatedEquipment: ['ESP32', 'Arduino Uno', 'DC Fan'],
    specs: {
      coilVoltage: '5V DC',
      contactRatingAC: 'Maksimum 250V AC / 10 Ampere (2500 Watt)',
      contactRatingDC: 'Maksimum 30V DC / 10 Ampere',
      isolation: 'Optocoupler Opto-Isolated 2500V RMS'
    },
    badgeColor: 'rose'
  },
  {
    id: 'iot-led',
    nameId: 'Lampu LED (Light Emitting Diode)',
    nameEn: 'LED (Light Emitting Diode)',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'Dioda semikonduktor pemancar cahaya sebagai indikator visual status sirkuit elektronika.',
    description: 'LED adalah komponen semikonduktor optoelektronika yang memancarkan cahaya monokromatik ketika arus listrik dialirkan melewatinya secara forward-bias (dari kutub anoda ke katoda). Komponen ini merupakan aktuator visual paling dasar dalam praktikum pengenalan pemrograman mikrokontroler.',
    mainFunctions: [
      'Indikator visual status perangkat (POWER ON, WiFi Connected, Error Alert).',
      'Praktikum dasar pemrograman input-output digital (GPIO Digital Write & Blink).',
      'Modulasi kecerahan cahaya menggunakan teknik Pulse Width Modulation (PWM).'
    ],
    howItWorks: 'Ketika elektron dari semikonduktor tipe-N bergabung kembali dengan lubang (holes) di semikonduktor tipe-P, elektron melepaskan energi foton cahaya. Warna cahaya ditentukan oleh lebar celah pita energi (bandgap) bahan semikonduktor yang digunakan (seperti Gallium Arsenide untuk merah, atau Indium Gallium Nitride untuk biru/putih).',
    keyPinsOrComponents: [
      { name: 'Anoda (+ / Kaki Panjang)', desc: 'Kutub positif yang harus dihubungkan ke resistor pembatas arus lalu ke pin GPIO mikrokontroler.' },
      { name: 'Katoda (- / Kaki Pendek & Sisi Datar)', desc: 'Kutub negatif yang dihubungkan ke ground (0V).' },
      { name: 'Resistor Pembatas Arus (Current Limiting Resistor)', desc: 'Wajib dipasang resistor 220Ω - 330Ω agar LED tidak terbakar oleh arus berlebih.' }
    ],
    usageExamples: [
      'Proyek simulasi lampu lalu lintas (Traffic Light 3 Warna) di perempatan jalan.',
      'LED indikator denyut jantung sistem (Heartbeat status).'
    ],
    relatedEquipment: ['Resistor', 'Breadboard', 'ESP32', 'Arduino Uno'],
    specs: {
      forwardVoltage: 'Merah/Kuning: 1.8V - 2.2V; Biru/Hijau/Putih: 3.0V - 3.4V',
      operatingCurrent: '10 mA - 20 mA normal',
      lensDiameter: '5 mm Standard Round Lens'
    },
    badgeColor: 'yellow'
  },
  {
    id: 'iot-resistor',
    nameId: 'Resistor Karbon (1/4 Watt)',
    nameEn: 'Carbon Film Resistor',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'Komponen pasif dua kutub untuk membatasi aliran arus listrik dan membagi tegangan dalam rangkaian.',
    description: 'Resistor adalah komponen elektronika pasif yang memberikan hambatan listrik terukur (dalam satuan Ohm Ω) terhadap aliran muatan listrik. Sesuai Hukum Ohm (V = I x R), resistor digunakan untuk membatasi arus yang masuk ke komponen sensitif seperti LED atau membentuk sirkuit pembagi tegangan bersama sensor.',
    mainFunctions: [
      'Membatasi arus listrik (Current Limiter) agar komponen seperti LED tidak kelebihan beban dan meledak.',
      'Pembagi tegangan (Voltage Divider) untuk mengonversi sinyal tegangan 5V menjadi 3.3V yang aman bagi ESP32.',
      'Resistor Pull-Up atau Pull-Down untuk memastikan logika pin input tidak melayang (floating).'
    ],
    howItWorks: 'Bahan film karbon memberikan resistansi terhadap aliran elektron bebas, mengubah sebagian energi listrik yang melewatinya menjadi panas. Nilai resistansinya ditandai menggunakan kode gelang warna standar internasional.',
    keyPinsOrComponents: [
      { name: 'Gelang 1 & 2', desc: 'Angka signifikan pertama dan kedua (Hitam=0, Cokelat=1, Merah=2, Oranye=3, Kuning=4, Hijau=5, Biru=6, Ungu=7, Abu-abu=8, Putih=9).' },
      { name: 'Gelang 3 (Pengali / Multiplier)', desc: 'Pangkat faktor pengali sepuluh (Cokelat=x10, Merah=x100, Oranye=x1k, Kuning=x10k).' },
      { name: 'Gelang 4 (Toleransi)', desc: 'Akurasi penyimpangan (Emas=±5%, Perak=±10%). Contoh: Cokelat-Hitam-Merah-Emas = 1 - 0 - 00 = 1000Ω atau 1kΩ ±5%.' }
    ],
    usageExamples: [
      'Resistor 220Ω seri dengan LED untuk pembatas arus.',
      'Resistor 10kΩ sebagai pull-up resistor tombol push button dan sensor suhu DHT22.'
    ],
    relatedEquipment: ['LED', 'Breadboard', 'LDR Sensor'],
    specs: {
      powerRating: '0.25 Watt (1/4W) Through Hole',
      tolerance: '±5% (Gold Band)',
      valuesCommon: '220Ω, 330Ω, 1kΩ, 4.7kΩ, 10kΩ, 100kΩ'
    },
    badgeColor: 'amber'
  },
  {
    id: 'iot-buzzer',
    nameId: 'Active / Passive Piezo Buzzer',
    nameEn: 'Piezoelectric Buzzer 5V',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'Komponen transduser audio piezoelektrik penghasil bunyi alarm atau nada notasi musik.',
    description: 'Buzzer adalah perangkat transduser audio elektronik yang mengubah sinyal listrik bolak-balik menjadi getaran suara mekanis menggunakan pelat keramik piezoelektrik. Terbagi menjadi Buzzer Aktif (sudah memiliki osilator internal, langsung berbunyi "bip" konstan saat diberi tegangan DC) dan Buzzer Pasif (memerlukan frekuensi gelombang PWM untuk menghasilkan nada lagu).',
    mainFunctions: [
      'Menghasilkan nada peringatan suara alarm bahaya (kebakaran, gas bocor, maling).',
      'Memberikan umpan balik suara (audio feedback) saat tombol ditekan atau kartu RFID berhasil dipindai.',
      'Memainkan melodi nada notifikasi dengan teknik modulasi frekuensi tone() di Arduino.'
    ],
    howItWorks: 'Tegangan listrik bolak-balik yang diberikan pada kristal piezoelektrik menyebabkan material tersebut meregang dan mengerut secara sangat cepat (efek piezoelektrik terbalik). Getaran ini menggetarkan diafragma logam tipis di dalam rumah plastik dan menghasilkan gelombang tekanan udara suara berfrekuensi 2 kHz - 4 kHz.',
    keyPinsOrComponents: [
      { name: 'Pin Positif (+ / Kaki Panjang)', desc: 'Dihubungkan ke pin output GPIO mikrokontroler.' },
      { name: 'Pin Negatif (- / Kaki Pendek)', desc: 'Dihubungkan ke ground (0V).' },
      { name: 'Stiker Segel Pelindung Atas', desc: 'Stiker kertas di atas lubang suara yang dilepas saat hendak digunakan agar suara terdengar lantang.' }
    ],
    usageExamples: [
      'Alarm sirine tanda darurat pada prototipe sistem pendeteksi kebocoran gas LPG lab SIJA.',
      'Suara konfirmasi "Beep" ganda saat kartu akses gerbang lab berhasil dibaca RFID reader.'
    ],
    relatedEquipment: ['ESP32', 'Arduino Uno', 'PIR Sensor'],
    specs: {
      operatingVoltage: '3.3V - 5V DC',
      resonantFrequency: '2500 Hz ± 300 Hz',
      soundPressureLevel: 'Min 85 dB pada jarak 10 cm',
      currentConsumption: '< 30 mA'
    },
    badgeColor: 'rose'
  },
  {
    id: 'iot-servo-motor',
    nameId: 'Micro Servo Motor SG90 (9g)',
    nameEn: 'TowerPro SG90 9g Micro Servo Motor',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'Aktuator motor mini dengan kontrol posisi sudut rotasi presisi 0 hingga 180 derajat berbasis sinyal PWM.',
    description: 'Servo Motor SG90 adalah aktuator mekanik kompak berbobot 9 gram yang mengintegrasikan motor DC mini, roda gigi transmisi nilon (gearbox), potensiometer umpan balik posisi, dan rangkaian pengendali tertutup (closed-loop control circuit). Berbeda dengan motor DC biasa yang berputar bebas tanpa henti, servo dapat diperintahkan menahan sudut tertentu secara akurat.',
    mainFunctions: [
      'Menggerakkan mekanik palang pintu otomatis, kunci grendel solenoid, atau penutup tempat sampah cerdas.',
      'Mengendalikan orientasi arah kamera pan-tilt di laboratorium.',
      'Menggerakkan sendi lengan robotik (robotic arm) siswa SIJA.'
    ],
    howItWorks: 'Mikrokontroler mengirimkan pulsa PWM berfrekuensi 50 Hz (periode 20 ms). Lebar pulsa HIGH menentukan sudut servo: pulsa 1.0 ms memposisikan lengan servo ke 0 derajat, pulsa 1.5 ms ke posisi tengah 90 derajat, dan pulsa 2.0 ms ke posisi maksimum 180 derajat. Potensiometer internal terus membandingkan posisi gigi dengan sinyal perintah.',
    keyPinsOrComponents: [
      { name: 'Kabel Cokelat / Hitam (GND)', desc: 'Dihubungkan ke Ground catu daya.' },
      { name: 'Kabel Merah (VCC 5V)', desc: 'Dihubungkan ke pasokan daya eksternal 5V (hindari mengambil daya dari pin 5V board saat memutar beban berat).' },
      { name: 'Kabel Oranye / Kuning (PWM Signal)', desc: 'Dihubungkan ke pin digital PWM mikrokontroler.' },
      { name: 'Servo Horns (Lengan Baling-Baling)', desc: 'Aksesoris lengan plastik dengan lubang baut untuk dikaitkan ke engsel pintu atau objek dorong.' }
    ],
    usageExamples: [
      'Membuka dan menutup palang gerbang pintu masuk kendaraan sekolah otomatis.',
      'Sistem kunci pintu digital kamar server yang terbuka saat password RFID benar.'
    ],
    relatedEquipment: ['Arduino Uno', 'ESP32', 'Ultrasonic Sensor HC-SR04'],
    specs: {
      operatingVoltage: '4.8V hingga 6.0V DC',
      torque: '1.8 kg-cm pada tegangan 4.8V',
      operatingSpeed: '0.1 detik per 60 derajat putaran',
      rotationAngle: '0° - 180° Presisi'
    },
    badgeColor: 'cyan'
  },
  {
    id: 'iot-dc-fan',
    nameId: 'Kipas DC Pendingin (5V / 12V DC Brushless Fan)',
    nameEn: 'DC Brushless Cooling Fan',
    category: 'siot',
    categoryLabel: 'Komponen SIoT & Elektronika',
    shortDesc: 'Aktuator kipas pendingin sirkulasi udara untuk mengeluarkan panas dari boks casing perangkat dan rak server.',
    description: 'DC Fan brushless adalah kipas mini berdaya rendah yang memanfaatkan motor tanpa sikat (brushless) dengan komutasi magnetik Hall Effect internal sehingga memiliki masa pakai ribuan jam tanpa menimbulkan percikan api mekanik. Kipas ini digunakan untuk membuang panas dari boks kontroler IoT atau rak server.',
    mainFunctions: [
      'Membuang panas berlebih (exhaust) dari boks panel IoT luar ruangan.',
      'Menjaga suhu prosesor server atau power supply tetap dalam ambang batas optimal.',
      'Diaktifkan secara otomatis oleh modul relay atau transistor MOSFET ketika sensor DHT22 mendeteksi suhu lab di atas 30°C.'
    ],
    howItWorks: 'Arus listrik DC memicu kumparan elektromagnet statis yang berputar secara bergantian menarik magnet permanen pada baling-baling kipas. Kecepatan putaran angin dapat diatur dengan sinyal modulasi PWM.',
    keyPinsOrComponents: [
      { name: 'Kabel Merah (+ VCC)', desc: 'Kutub positif tegangan 5V atau 12V DC.' },
      { name: 'Kabel Hitam (- GND)', desc: 'Kutub ground 0V.' },
      { name: 'Kabel Kuning / Biru (Tachometer / PWM - opsional pada tipe 3-4 wire)', desc: 'Mengirimkan sinyal rotasi RPM ke mikrokontroler.' }
    ],
    usageExamples: [
      'Kipas pendingin otomatis boks mikrokontroler greenhouse ketika cuaca panas.',
      'Sistem ventilasi udara rak mini server lab SIJA.'
    ],
    relatedEquipment: ['ESP32', 'Relay Module', 'DHT22'],
    specs: {
      dimensions: '40x40x10 mm atau 80x80x25 mm',
      operatingVoltage: '5V DC / 12V DC',
      airFlow: '5.5 - 7.5 CFM (Cubic Feet per Minute)',
      bearingType: 'Sleeve Bearing / Dual Ball Bearing tahan lama'
    },
    badgeColor: 'teal'
  }
];

