// SIJALAB Lab Guide Data
// Panduan Praktikum & Checklist Langkah Interaktif SMK SIJA

export const LAB_CATEGORIES = [
  { id: 'all', label: 'Semua Praktikum' },
  { id: 'cisco', label: 'Cisco Lab' },
  { id: 'networking', label: 'Networking Lab' },
  { id: 'mikrotik', label: 'MikroTik Lab' },
  { id: 'linux', label: 'Linux Lab' },
  { id: 'siot', label: 'SIoT Lab' },
  { id: 'electronics', label: 'Electronics Lab' },
];

export const LAB_GUIDES = [
  {
    id: 'lab-utp-crimping',
    title: 'Praktikum Terminasi Kabel UTP & Crimping RJ45 (T568B Straight & Cross)',
    category: 'networking',
    categoryLabel: 'Networking Lab',
    difficulty: 'Dasar',
    estimatedTime: '45 Menit',
    xpReward: 80,
    objective: 'Siswa mampu mengupas kabel UTP, mengurutkan 8 warna kawat standar TIA/EIA T568B dan T568A, melakukan crimping dengan rapi, dan memverifikasi kontinuitas jalur menggunakan LAN Tester.',
    equipmentNeeded: [
      'Kabel UTP Cat6 / Cat5e (panjang 1.5 - 2 meter)',
      '2 buah Konektor RJ45 (8P8C)',
      'Tang Crimping modular dengan pemotong & pengupas',
      'LAN Cable Tester 9V',
      'Gunting kawat / cutter (opsional untuk merapikan)'
    ],
    basicTheory: 'Kabel Straight-Through menggunakan standar susunan warna yang sama di kedua ujungnya (T568B ke T568B) untuk menghubungkan perangkat berbeda jenis (PC ke Switch, Switch ke Router). Kabel Cross-Over menggunakan standar T568B di satu ujung dan T568A di ujung lainnya untuk menghubungkan perangkat sejenis (PC ke PC, Switch ke Switch tanpa Auto-MDIX).',
    preparation: 'Pastikan meja praktikum bersih dari serpihan tembaga. Siapkan baterai 9V pada LAN Tester dan periksa ketajaman mata pisau tang crimping.',
    safetyNotes: 'Hati-hati saat mengupas jaket kabel luar: jangan menekan pisau terlalu dalam agar kawat tembaga di dalam tidak teriris putus. Jauhkan jari dari bilah pemotong.',
    steps: [
      {
        id: 'step-1',
        title: 'Kupas Selubung Luar Kabel UTP',
        instruction: 'Gunakan lubang pengupas pada tang crimping sekitar 2.5 - 3 cm dari ujung kabel. Putar tang secara melingkar satu kali perlahan lalu tarik selubung luar kabel hingga terlepas.',
        codeOrSnippet: null
      },
      {
        id: 'step-2',
        title: 'Buka Pilinan dan Luruskan 8 Kawat',
        instruction: 'Urai keempat pasang pilinan kawat tembaga. Tarik dan luruskan setiap kawat menggunakan jari agar benar-benar lempeng dan tidak saling melilit.',
        codeOrSnippet: null
      },
      {
        id: 'step-3',
        title: 'Susun Urutan Warna Standar T568B',
        instruction: 'Susun 8 kawat sejajar dari kiri ke kanan dengan urutan mutlak:\n1. Putih-Oranye\n2. Oranye\n3. Putih-Hijau\n4. Biru\n5. Putih-Biru\n6. Hijau\n7. Putih-Cokelat\n8. Cokelat',
        codeOrSnippet: `[1] Putih-Oranye  ---  [2] Oranye
[3] Putih-Hijau   ---  [4] Biru
[5] Putih-Biru    ---  [6] Hijau
[7] Putih-Cokelat ---  [8] Cokelat`
      },
      {
        id: 'step-4',
        title: 'Potong Rata Ujung Kawat',
        instruction: 'Rapatkan kawat menggunakan ibu jari dan telunjuk. Gunakan pisau pemotong tang crimping untuk memotong ujung kawat secara tegak lurus (90 derajat) hingga tersisa panjang kawat sekitar 1.2 cm.',
        codeOrSnippet: null
      },
      {
        id: 'step-5',
        title: 'Masukkan Kawat ke Dalam Konektor RJ45',
        instruction: 'Pegang konektor RJ45 dengan klip pengunci menghadap ke bawah dan pin emas menghadap ke atas. Dorong 8 kawat masuk ke jalur masing-masing sampai ujung kawat membentur kaca bening paling depan. Pastikan jaket luar kabel ikut masuk ke dalam konektor melewati batas baji pengunci.',
        codeOrSnippet: null
      },
      {
        id: 'step-6',
        title: 'Lakukan Pengepresan Crimping',
        instruction: 'Masukkan konektor RJ45 ke dalam lubang 8P pada tang crimping. Tekan gagang tang dengan kuat dan mantap sampai berbunyi klik penuh. Pastikan 8 bilah emas menusuk rata.',
        codeOrSnippet: null
      },
      {
        id: 'step-7',
        title: 'Uji Kontinuitas dengan LAN Tester',
        instruction: 'Colokkan ujung A kabel ke Master Unit dan ujung B ke Remote Unit. Geser saklar ke posisi ON / SLOW. Amati urutan lampu LED menyala.',
        codeOrSnippet: `Hasil Uji Straight-Through:
Master : [1] [2] [3] [4] [5] [6] [7] [8]
Remote : [1] [2] [3] [4] [5] [6] [7] [8] (Menyala hijau serentak berurutan!)`
      }
    ],
    expectedResults: 'Semua lampu LED 1 sampai 8 pada Master dan Remote menyala hijau secara teratur dari nomor 1 hingga 8 tanpa ada yang mati, redup, atau melompat.',
    commonMistakes: [
      'Warna hijau dan biru tertukar (sering keliru menempatkan hijau di posisi 4 bukannya posisi 6).',
      'Jaket kabel luar tidak ikut terjepit di dalam konektor RJ45 sehingga kawat mudah putus saat ditarik.',
      'Kawat dipotong terlalu pendek sehingga tidak menyentuh ujung pin emas konektor.'
    ]
  },
  {
    id: 'lab-cisco-switch-basic',
    title: 'Konfigurasi Dasar Cisco Catalyst Switch (Hostname, Password, Banner & SVI)',
    category: 'cisco',
    categoryLabel: 'Cisco Lab',
    difficulty: 'Dasar',
    estimatedTime: '40 Menit',
    xpReward: 90,
    objective: 'Siswa mampu menghubungkan kabel console, melakukan bootstrap configuration pada Switch Cisco Catalyst, mengamankan priviledge EXEC mode dengan secret terenkripsi, membuat banner motd, dan mengaktifkan IP Management pada Interface VLAN 1.',
    equipmentNeeded: [
      '1x Cisco Catalyst Switch 2960 / 3560 / Packet Tracer',
      '1x Kabel Console RJ45-to-DB9 / USB Console',
      '1x Laptop praktikum dengan software emulator terminal (PuTTY / Tera Term)',
      '1x Kabel UTP Straight'
    ],
    basicTheory: 'Cisco IOS beroperasi dalam tingkatan mode: User EXEC mode (Switch>), Privileged EXEC mode (Switch#), dan Global Configuration mode (Switch(config)#). Manajemen perangkat harus dilindungi password kuat dan diakses melalui Switch Virtual Interface (SVI).',
    preparation: 'Tancapkan kabel console ke port CONSOLE di belakang switch dan ke port USB laptop siswa. Buka PuTTY dengan konfigurasi Serial: COM port sesuai Device Manager, Speed 9600 baud, Data bits 8, Stop bits 1, Parity None.',
    safetyNotes: 'Jangan mematikan saklar power switch saat proses saving running-config ke startup-config sedang berlangsung.',
    steps: [
      {
        id: 'step-1',
        title: 'Masuk ke Privileged Mode & Global Config',
        instruction: 'Tekan Enter pada layar terminal PuTTY, lalu ketik perintah enable untuk beralih dari User EXEC ke Privileged EXEC mode.',
        codeOrSnippet: `Switch> enable
Switch# configure terminal
Enter configuration commands, one per line. End with CNTL/Z.`
      },
      {
        id: 'step-2',
        title: 'Mengubah Nama Hostname Switch',
        instruction: 'Beri identitas switch sesuai standar penamaan laboratorium SIJA.',
        codeOrSnippet: `Switch(config)# hostname SW-LAB-SIJA1
SW-LAB-SIJA1(config)#`
      },
      {
        id: 'step-3',
        title: 'Mengamankan Akses Privileged EXEC dengan Password Terenkripsi',
        instruction: 'Gunakan perintah enable secret (menggunakan enkripsi MD5 / SHA-256) bukan enable password yang teks polos.',
        codeOrSnippet: `SW-LAB-SIJA1(config)# enable secret KelasSIJA2026!
SW-LAB-SIJA1(config)# service password-encryption`
      },
      {
        id: 'step-4',
        title: 'Mengamankan Port Console & Jalur Remote VTY',
        instruction: 'Beri password pada akses fisik console dan terminal virtual Telnet/SSH (line vty 0 15).',
        codeOrSnippet: `SW-LAB-SIJA1(config)# line console 0
SW-LAB-SIJA1(config-line)# password ConsolePass123
SW-LAB-SIJA1(config-line)# login
SW-LAB-SIJA1(config-line)# logging synchronous
SW-LAB-SIJA1(config-line)# exit

SW-LAB-SIJA1(config)# line vty 0 15
SW-LAB-SIJA1(config-line)# password VtyRemote123
SW-LAB-SIJA1(config-line)# login
SW-LAB-SIJA1(config-line)# exit`
      },
      {
        id: 'step-5',
        title: 'Membuat Pesan Banner Peringatan Legal (Banner MOTD)',
        instruction: 'Pasang pesan peringatan larangan akses bagi pihak yang tidak berwenang.',
        codeOrSnippet: `SW-LAB-SIJA1(config)# banner motd #
*************************************************************
  PERINGATAN: HANYA PERSONEL LAB SIJA YANG BERWENANG!
  AKSES ILEGAL AKAN DICATAT DAN DITINDAK SECARA TEGAS.
*************************************************************#`
      },
      {
        id: 'step-6',
        title: 'Konfigurasi IP Management (SVI Interface VLAN 1)',
        instruction: 'Atur IP address pada interface vlan 1 agar switch dapat di-ping dan di-remote via jaringan LAN.',
        codeOrSnippet: `SW-LAB-SIJA1(config)# interface vlan 1
SW-LAB-SIJA1(config-if)# ip address 192.168.10.2 255.255.255.0
SW-LAB-SIJA1(config-if)# no shutdown
SW-LAB-SIJA1(config-if)# exit
SW-LAB-SIJA1(config)# ip default-gateway 192.168.10.1`
      },
      {
        id: 'step-7',
        title: 'Simpan Konfigurasi ke NVRAM (Startup-Config)',
        instruction: 'Simpan perubahan konfigurasi agar tidak hilang saat switch dimatikan atau listrik padam.',
        codeOrSnippet: `SW-LAB-SIJA1(config)# end
SW-LAB-SIJA1# copy running-config startup-config
Destination filename [startup-config]? [Enter]
Building configuration...
[OK]`
      }
    ],
    expectedResults: 'Prompt terminal menampilkan nama SW-LAB-SIJA1, banner peringatan muncul saat login baru, dan switch merespons ping dari laptop pada IP 192.168.10.2.',
    commonMistakes: [
      'Lupa menjalankan perintah "no shutdown" pada interface VLAN 1 sehingga port manajemen tetap berstatus Administratively Down.',
      'Lupa menyimpan dengan copy running-config startup-config sehingga switch kembali ke konfigurasi kosong saat di-reboot.'
    ]
  },
  {
    id: 'lab-cisco-vlan-trunk',
    title: 'Konfigurasi VLAN & 802.1Q Trunking pada Cisco Switch',
    category: 'cisco',
    categoryLabel: 'Cisco Lab',
    difficulty: 'Menengah',
    estimatedTime: '50 Menit',
    xpReward: 100,
    objective: 'Siswa mampu membuat VLAN 10 dan VLAN 20, mengalokasikan Access Port untuk komputer siswa, dan mengonfigurasi GigabitEthernet 0/1 sebagai 802.1Q Trunk port penghubung antar-switch.',
    equipmentNeeded: [
      '2x Switch Cisco 2960 / Cisco Packet Tracer',
      '4x Komputer PC / Laptop',
      '5x Kabel UTP Straight'
    ],
    basicTheory: 'VLAN (Virtual Local Area Network) membagi switch fisik menjadi domain broadcast terisolasi. Port Access hanya mengizinkan 1 VLAN, sedangkan Port Trunk (IEEE 802.1Q) menyisipkan tag 4-byte untuk melewatkan multi-VLAN antar-switch.',
    preparation: 'Rancang skema pengalamatan: VLAN 10 (192.168.10.0/24) untuk Siswa SIJA 1 dan VLAN 20 (192.168.20.0/24) untuk Siswa SIJA 2.',
    safetyNotes: 'Pastikan koneksi kabel trunk antar-switch terpasang di port Gigabit (Gig0/1 ke Gig0/1) untuk performa bandwidth maksimal.',
    steps: [
      {
        id: 'step-1',
        title: 'Membuat Database VLAN pada Switch 1',
        instruction: 'Buat VLAN 10 dan VLAN 20 dengan nama deskriptif.',
        codeOrSnippet: `Switch# configure terminal
Switch(config)# vlan 10
Switch(config-vlan)# name LAB_SIJA_1
Switch(config-vlan)# vlan 20
Switch(config-vlan)# name LAB_SIJA_2
Switch(config-vlan)# exit`
      },
      {
        id: 'step-2',
        title: 'Mengalokasikan Port Access ke VLAN',
        instruction: 'Tentukan port FastEthernet 0/1-10 untuk VLAN 10 dan port FastEthernet 0/11-20 untuk VLAN 20.',
        codeOrSnippet: `Switch(config)# interface range fastEthernet 0/1 - 10
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10
Switch(config-if-range)# exit

Switch(config)# interface range fastEthernet 0/11 - 20
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 20
Switch(config-if-range)# exit`
      },
      {
        id: 'step-3',
        title: 'Konfigurasi Port Trunk 802.1Q pada Uplink',
        instruction: 'Ubah mode port Gigabit 0/1 menjadi trunk dan batasi VLAN yang diizinkan lewat.',
        codeOrSnippet: `Switch(config)# interface gigabitEthernet 0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20
Switch(config-if)# no shutdown
Switch(config-if)# exit`
      },
      {
        id: 'step-4',
        title: 'Verifikasi Tabel VLAN & Status Trunk',
        instruction: 'Periksa apakah port sudah terpetakan dengan benar.',
        codeOrSnippet: `Switch# show vlan brief
Switch# show interfaces trunk`
      }
    ],
    expectedResults: 'PC pada VLAN 10 di Switch 1 berhasil ping ke PC pada VLAN 10 di Switch 2, namun PC pada VLAN 10 GAGAL ping ke PC pada VLAN 20 karena isolasi layer 2 berhasil.',
    commonMistakes: [
      'Mengetik nama vlan tanpa mengetik nomor id vlan terlebih dahulu.',
      'Kedua sisi kabel trunk tidak sama-sama disetel sebagai switchport mode trunk.'
    ]
  },
  {
    id: 'lab-linux-dhcp',
    title: 'Instalasi & Konfigurasi DHCP Server di Ubuntu / Debian Server',
    category: 'linux',
    categoryLabel: 'Linux Lab',
    difficulty: 'Menengah',
    estimatedTime: '45 Menit',
    xpReward: 95,
    objective: 'Siswa mampu mengonfigurasi IP static pada interface server, menginstal paket isc-dhcp-server, mendefinisikan subnet pool alokasi IP, subnet mask, default gateway, dan DNS server untuk klien lab.',
    equipmentNeeded: [
      '1x Server Debian 12 / Ubuntu Server 24.04 LTS (Fisik atau VirtualBox)',
      '1x PC Klien Windows / Linux',
      '1x Switch Lab'
    ],
    basicTheory: 'DHCP (Dynamic Host Configuration Protocol) mengeliminasi konfigurasi IP manual yang rawan konflik dengan meminjamkan (lease) konfigurasi jaringan secara otomatis melalui 4 pertukaran pesan DORA.',
    preparation: 'Pastikan repositori APT server sudah dimutakhirkan dengan sudo apt update dan interface eth1 terhubung ke switch lab.',
    safetyNotes: 'Jangan menjalankan DHCP server di jaringan WiFi publik sekolah yang sudah memiliki DHCP server bawaan untuk menghindari Rogue DHCP Server.',
    steps: [
      {
        id: 'step-1',
        title: 'Setel IP Static pada Interface Server (Netplan)',
        instruction: 'Edit berkas /etc/netplan/50-cloud-init.yaml dengan IP static 192.168.100.1/24.',
        codeOrSnippet: `network:
  version: 2
  renderer: networkd
  ethernets:
    eth1:
      addresses:
        - 192.168.100.1/24
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]`
      },
      {
        id: 'step-2',
        title: 'Instal Paket ISC-DHCP-Server',
        instruction: 'Pasang service daemon DHCP server via APT.',
        codeOrSnippet: `sudo netplan apply
sudo apt install isc-dhcp-server -y`
      },
      {
        id: 'step-3',
        title: 'Konfigurasi Default Interface DHCP',
        instruction: 'Tentukan interface mana yang akan mendengarkan DHCP Discover di /etc/default/isc-dhcp-server.',
        codeOrSnippet: `INTERFACESv4="eth1"`
      },
      {
        id: 'step-4',
        title: 'Konfigurasi Subnet Pool pada dhcpd.conf',
        instruction: 'Buka /etc/dhcp/dhcpd.conf dan tambahkan deklarasi subnet range alokasi IP klien.',
        codeOrSnippet: `subnet 192.168.100.0 netmask 255.255.255.0 {
  range 192.168.100.10 192.168.100.50;
  option routers 192.168.100.1;
  option domain-name-servers 192.168.100.1, 8.8.8.8;
  option domain-name "sijalab.internal";
  default-lease-time 600;
  max-lease-time 7200;
}`
      },
      {
        id: 'step-5',
        title: 'Jalankan Service & Verifikasi Klien',
        instruction: 'Restart service DHCP dan cek status service.',
        codeOrSnippet: `sudo systemctl restart isc-dhcp-server
sudo systemctl status isc-dhcp-server`
      }
    ],
    expectedResults: 'PC klien yang disetel "Obtain an IP address automatically" seketika memperoleh IP antara 192.168.100.10 s/d 50, dan file /var/lib/dhcp/dhcpd.leases mencatat MAC address klien.',
    commonMistakes: [
      'Ada tanda titik koma (;) yang terlewat pada akhir baris konfigurasi dhcpd.conf sehingga service gagal start (Job failed).',
      'IP static interface server tidak berada dalam satu subnet dengan deklarasi pool di dhcpd.conf.'
    ]
  },
  {
    id: 'lab-esp32-led-pwm',
    title: 'Praktikum Kendali Output LED & Dimmer PWM pada Mikrokontroler ESP32',
    category: 'siot',
    categoryLabel: 'SIoT Lab',
    difficulty: 'Dasar',
    estimatedTime: '35 Menit',
    xpReward: 85,
    objective: 'Siswa mampu merangkai komponen LED dan resistor di breadboard, menghubungkannya ke pin GPIO ESP32, dan memprogram efek peredupan (dimming) menggunakan peripheral Hardware LEDC PWM.',
    equipmentNeeded: [
      '1x Modul ESP32 NodeMCU 30-Pin V1',
      '1x Breadboard 830 titik',
      '2x Lampu LED 5mm (Merah & Hijau)',
      '2x Resistor 220Ω (Merah-Merah-Cokelat-Emas)',
      '4x Kabel Jumper Male-to-Male',
      '1x Kabel Micro-USB Data'
    ],
    basicTheory: 'Mikrokontroler digital tidak bisa mengeluarkan tegangan analog sejati (seperti 1.5V). ESP32 menggunakan modulasi lebar pulsa (Pulse Width Modulation / PWM) dengan frekuensi tinggi untuk mengontrol rasio waktu hidup (Duty Cycle) sehingga tampak meredup di mata manusia.',
    preparation: 'Tancapkan ESP32 melintasi parit tengah breadboard. Buka Arduino IDE, pilih Board: DOIT ESP32 DEVKIT V1, dan pilih Port COM yang sesuai.',
    safetyNotes: 'Jangan menghubungkan anoda LED langsung ke GPIO ESP32 tanpa resistor pembatas arus karena arus berlebih bisa merusak pin output mikrokontroler.',
    steps: [
      {
        id: 'step-1',
        title: 'Rangkai Sirkuit pada Breadboard',
        instruction: 'Tancapkan kaki panjang (Anoda) LED Merah ke lubang kolom baris yang sejajar dengan Resistor 220Ω, lalu hubungkan kaki resistor lainnya ke GPIO 18 ESP32. Tancapkan kaki pendek (Katoda) LED ke jalur rel Ground (-) yang tersambung ke pin GND ESP32.',
        codeOrSnippet: `Wiring Skema:
ESP32 GPIO 18 ---> Resistor 220 Ohm ---> Anoda (+) LED Merah
ESP32 GND     -------------------------> Katoda (-) LED Merah`
      },
      {
        id: 'step-2',
        title: 'Tulis Kode Program Arduino C++',
        instruction: 'Gunakan fungsi ledcAttach atau ledcWrite bawaan ESP32 Core 3.x.',
        codeOrSnippet: `const int ledPin = 18;
const int pwmFreq = 5000;    // 5 kHz frekuensi
const int pwmResolution = 8; // Resolusi 8-bit (0 - 255)

void setup() {
  ledcAttach(ledPin, pwmFreq, pwmResolution);
}

void loop() {
  // Fade IN (Perlahan semakin terang)
  for (int duty = 0; duty <= 255; duty++) {
    ledcWrite(ledPin, duty);
    delay(5);
  }
  // Fade OUT (Perlahan meredup)
  for (int duty = 255; duty >= 0; duty--) {
    ledcWrite(ledPin, duty);
    delay(5);
  }
}`
      },
      {
        id: 'step-3',
        title: 'Upload Program ke Board ESP32',
        instruction: 'Klik tombol Upload (tanda panah kanan) di Arduino IDE. Jika pada konsol muncul pesan "Connecting......", tahan tombol BOOT pada modul ESP32 selama 2 detik hingga persentase upload mulai berjalan.',
        codeOrSnippet: null
      }
    ],
    expectedResults: 'Lampu LED merah berdenyut halus (breathing effect) dari padam total, perlahan menerang, lalu perlahan meredup kembali secara berulang tanpa henti.',
    commonMistakes: [
      'Kaki Anoda dan Katoda LED tertukar posisinya.',
      'Kabel USB yang digunakan adalah kabel charger murahan (2-kawat daya saja tanpa jalur transmisi D+ dan D-) sehingga port COM tidak terdeteksi di laptop.'
    ]
  },
  {
    id: 'lab-dht22-sensor-reading',
    title: 'Pembacaan Sensor Lingkungan DHT22 & Visualisasi Data Serial ESP32',
    category: 'siot',
    categoryLabel: 'SIoT Lab',
    difficulty: 'Menengah',
    estimatedTime: '40 Menit',
    xpReward: 90,
    objective: 'Siswa mampu merangkai sensor suhu dan kelembaban DHT22 dengan resistor pull-up 10kΩ ke ESP32, menginstal library DHT sensor library by Adafruit, dan membaca nilai suhu (°C) serta kelembaban (%RH) di Serial Monitor.',
    equipmentNeeded: [
      '1x ESP32 Development Board',
      '1x Modul Sensor DHT22 (AM2302)',
      '1x Resistor 10kΩ',
      'Breadboard & Kabel Jumper Male-to-Male',
      'Laptop dengan Arduino IDE terpasang library Adafruit Unified Sensor & DHT sensor library'
    ],
    basicTheory: 'DHT22 mentransmisikan data digital 40-bit menggunakan sinyal pulse-width single-bus. Nilai suhu dihitung dari nilai desimal 16-bit dibagi 10.',
    preparation: 'Buka Library Manager di Arduino IDE (Ctrl+Shift+I), cari "DHT sensor library by Adafruit" dan klik Install All.',
    safetyNotes: 'Pastikan pin VCC DHT22 terhubung ke pin 3V3 ESP32, BUKAN ke pin VIN 5V jika menggunakan board clone tanpa level converter.',
    steps: [
      {
        id: 'step-1',
        title: 'Pemasangan Sensor DHT22 ke ESP32',
        instruction: 'Hubungkan Pin 1 (VCC) ke 3V3, Pin 2 (DATA) ke GPIO 4, pasang resistor 10kΩ antara Pin 1 dan Pin 2 sebagai pull-up, dan Pin 4 (GND) ke GND ESP32.',
        codeOrSnippet: `DHT22 Pinout:
Pin 1 (Kiri)  : VCC  -----> ESP32 3V3
Pin 2         : DATA -----> ESP32 GPIO 4
Pin 3         : NC   -----> Tidak disambung
Pin 4 (Kanan) : GND  -----> ESP32 GND
*Resistor 10k dipasang melintang antara Pin 1 dan Pin 2*`
      },
      {
        id: 'step-2',
        title: 'Kode Pembacaan Sensor Serial',
        instruction: 'Tulis sketsa C++ untuk membaca suhu dan kelembaban secara berkala setiap 2 detik.',
        codeOrSnippet: `#include "DHT.h"

#define DHTPIN 4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  Serial.println(F("SIJALAB IoT Test: Memulai Sensor DHT22..."));
  dht.begin();
}

void loop() {
  delay(2000); // DHT22 butuh jeda 2 detik per sampling
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println(F("[ERROR] Gagal membaca data dari sensor DHT22!"));
    return;
  }

  Serial.print(F("Kelembaban: "));
  Serial.print(h);
  Serial.print(F("%  |  Suhu: "));
  Serial.print(t);
  Serial.println(F("°C"));
}`
      },
      {
        id: 'step-3',
        title: 'Melihat Hasil di Serial Monitor / Serial Plotter',
        instruction: 'Buka Tools > Serial Monitor, atur baud rate ke 115200 baud. Amati angka suhu ruangan.',
        codeOrSnippet: null
      }
    ],
    expectedResults: 'Serial Monitor menampilkan teks log berkala dengan data realistis seperti "Kelembaban: 65.4% | Suhu: 27.8°C" dan angka merespons naik saat sensor ditiup napas hangat.',
    commonMistakes: [
      'Baud rate di Serial Monitor diatur ke 9600 sehingga yang muncul adalah huruf acak/karakter sampah (garbage text). Ubah ke 115200.',
      'Lupa memasang resistor pull-up sehingga sensor mengembalikan status "Failed to read from DHT sensor".'
    ]
  },
  {
    id: 'lab-relay-control',
    title: 'Perakitan Modul Relay & Kontrol Beban Elektronik Terisolasi',
    category: 'electronics',
    categoryLabel: 'Electronics Lab',
    difficulty: 'Menengah',
    estimatedTime: '45 Menit',
    xpReward: 95,
    objective: 'Siswa memahami cara kerja optocoupler isolasi relay, menyambungkan pin kendali DC ke mikrokontroler, serta menyambungkan terminal saklar AC/DC Normally Open (NO) untuk menghidupkan beban eksternal.',
    equipmentNeeded: [
      '1x Modul Relay 1-Channel 5V Optocoupler',
      '1x ESP32 / Arduino Uno',
      '1x Lampu Indikator DC 12V atau Kipas DC',
      '1x Sumber Daya Eksternal Adaptor 12V DC',
      'Kabel jumper dan obeng plus kecil (+) untuk terminal blok sekrup'
    ],
    basicTheory: 'Relay memisahkan rangkaian kendali daya rendah (mikrokontroler 3.3V/5V) dari sirkuit beban tinggi. Menggunakan pin Common (COM) dan Normally Open (NO) membuat beban hanya menyala saat kumparan diberi energi listrik.',
    preparation: 'Pastikan adaptor daya beban 12V dalam kondisi mati (unplugged) sebelum memasang kabel ke terminal blok sekrup relay.',
    safetyNotes: 'PERHATIAN KESELAMATAN: Saat praktikum pengenalan awal di sekolah, selalu gunakan beban DC tegangan rendah (12V DC). DILARANG KERAS menyambungkan kabel listrik PLN 220V tanpa pendampingan langsung oleh guru pembimbing!',
    steps: [
      {
        id: 'step-1',
        title: 'Hubungkan Jalur Kendali Logika',
        instruction: 'Hubungkan pin VCC relay ke 5V (VIN), pin GND ke GND, dan pin IN ke GPIO 23 ESP32.',
        codeOrSnippet: `ESP32 VIN  -----> Relay VCC
ESP32 GND  -----> Relay GND
ESP32 G23  -----> Relay IN`
      },
      {
        id: 'step-2',
        title: 'Pasang Kabel Jalur Beban pada Blok Terminal COM dan NO',
        instruction: 'Potong satu jalur kabel positif (+) dari adaptor 12V. Masukkan satu ujung ke terminal COM dan ujung lainnya ke terminal NO. Kencangkan baut sekrup dengan obeng.',
        codeOrSnippet: `Sirkuit Beban Terbuka (Normally Open):
Adaptor 12V (+) -----> Relay Terminal COM
Relay Terminal NO ---> Kabel (+) Kipas DC / Lampu
Kabel (-) Kipas   ---> Adaptor 12V (-)`
      },
      {
        id: 'step-3',
        title: 'Ketik Skrip Kontrol Saklar Digital',
        instruction: 'Karena modul relay menggunakan logika Active LOW, sinyal LOW akan menyalakan saklar dan HIGH mematikannya.',
        codeOrSnippet: `const int relayPin = 23;

void setup() {
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH); // Inisialisasi: Relay OFF
}

void loop() {
  digitalWrite(relayPin, LOW);  // Relay ON (Terdengar bunyi KLIK)
  delay(3000);
  digitalWrite(relayPin, HIGH); // Relay OFF
  delay(3000);
}`
      }
    ],
    expectedResults: 'Setiap 3 detik relay berbunyi "klik", lampu LED indikator merah di modul relay menyala, dan kipas beban berputar, lalu 3 detik kemudian mati.',
    commonMistakes: [
      'Salah memasang kabel beban ke terminal NC (Normally Closed) sehingga kipas malah menyala saat mikrokontroler diam dan mati saat dipicu.',
      'Mengambil daya penggerak motor/beban besar langsung dari pin 3.3V ESP32 yang menyebabkan mikrokontroler restart berulang (brownout reset).'
    ]
  }
];

