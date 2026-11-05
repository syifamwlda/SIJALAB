// SIJALAB Troubleshooting Center Data
// Panduan Pemecahan Masalah Teknis Jaringan, Server & IoT

export const TROUBLESHOOT_CATEGORIES = [
  { id: 'all', label: 'Semua Kasus' },
  { id: 'networking', label: 'Networking Issues' },
  { id: 'cisco', label: 'Cisco Configuration' },
  { id: 'mikrotik', label: 'MikroTik Issues' },
  { id: 'linux', label: 'Linux Server Issues' },
  { id: 'siot', label: 'SIoT & Electronics Issues' }
];

export const TROUBLESHOOTING_CASES = [
  {
    id: 'tb-cannot-ping-gateway',
    title: 'PC Siswa Tidak Bisa Ping ke IP Default Gateway (Request Timed Out / Host Unreachable)',
    category: 'networking',
    categoryLabel: 'Networking Issues',
    severity: 'high',
    symptoms: [
      'Perintah "ping 192.168.10.1" menghasilkan pesan "Destination host unreachable" atau "Request timed out".',
      'Ikon jaringan di Windows menampilkan tanda seru kuning atau bulatan globe "No Internet Access".',
      'Browser tidak dapat membuka alamat web lokal maupun publik.'
    ],
    possibleCauses: [
      'Kabel LAN longgar, pin RJ45 bengkok, atau kabel terputus di salah satu kawat (Layer 1 issue).',
      'Port switch tujuan berstatus Administratively Down atau err-disabled (Layer 2 issue).',
      'Konfigurasi IP address dan subnet mask pada PC berada di luar subnet IP Gateway (misal PC 192.168.1.10/24 sedangkan Gateway 192.168.10.1/24).',
      'Windows Defender Firewall atau ICMP filter di Router memblokir paket Echo Request (Ping).'
    ],
    diagnosticSteps: [
      {
        order: 1,
        step: 'Periksa Lampu Indikator Fisik NIC',
        desc: 'Lihat lampu LED di port LAN komputer. Apakah lampu Link menyala hijau/oranye stabil? Jika mati total, masalah ada di kabel atau port switch.'
      },
      {
        order: 2,
        step: 'Jalankan Perintah ipconfig /all (Windows) atau ip a (Linux)',
        desc: 'Periksa apakah IP yang didapat berada dalam format 169.254.x.x (APIPA) atau sudah sesuai subnet yang direncanakan.'
      },
      {
        order: 3,
        step: 'Cek Tabel ARP Lokal dengan arp -a',
        desc: 'Apakah entri MAC Address dari Default Gateway muncul di daftar ARP? Jika statusnya "incomplete", switch tidak melewatkan frame ARP broadcast.'
      }
    ],
    solutions: [
      {
        title: 'Solusi 1: Pembetulan Konfigurasi IP Manual',
        desc: 'Buka ncpa.cpl di Run dialog. Klik kanan Ethernet > Properties > IPv4. Pastikan IP Address satu subnet dengan gateway. Contoh:\nIP: 192.168.10.25\nSubnet Mask: 255.255.255.0\nDefault Gateway: 192.168.10.1'
      },
      {
        title: 'Solusi 2: Cek Status Port pada Switch Cisco',
        desc: 'Login ke switch via console dan jalankan:\n`Switch# show interface fastEthernet 0/5`\nJika status "down, line protocol down", pastikan kabel terpasang. Jika "administratively down", jalankan `no shutdown` di mode interface config.'
      },
      {
        title: 'Solusi 3: Uji Coba LAN Tester',
        desc: 'Cabut kabel UTP dan tancapkan ke LAN Tester untuk memastikan pin 1, 2, 3, dan 6 terhubung sempurna.'
      }
    ],
    verificationSteps: [
      'Jalankan kembali perintah `ping 192.168.10.1 -t`. Hasil harus menunjukkan "Reply from 192.168.10.1: bytes=32 time<1ms TTL=64".',
      'Cek konektivitas ke internet dengan `ping 8.8.8.8`.'
    ],
    relatedTopics: ['mat-osi-tcpip', 'mat-ip-subnetting', 'lab-utp-crimping']
  },
  {
    id: 'tb-vlan-communication-failure',
    title: 'PC Beda VLAN Tidak Bisa Saling Berkomunikasi (Inter-VLAN Routing Broken)',
    category: 'cisco',
    categoryLabel: 'Cisco Configuration',
    severity: 'high',
    symptoms: [
      'PC di VLAN 10 (IP 192.168.10.15) tidak bisa ping ke PC di VLAN 20 (IP 192.168.20.20).',
      'Masing-masing PC bisa ping ke gateway lokalnya, namun paket berhenti saat melintasi antar-VLAN.',
      'Lampu port trunk switch menyala oranye atau tidak ada encapsulation dot1q.'
    ],
    possibleCauses: [
      'Kabel penghubung antara Switch dan Router belum dikonfigurasi sebagai 802.1Q Trunk.',
      'Subinterface pada Router belum diberi encapsulation dot1q [vlan-id] yang sesuai.',
      'VLAN 10 atau VLAN 20 belum dibuat di database VLAN lokal switch.',
      'Siswa lupa mengatur Default Gateway pada properti IP komputer klien.'
    ],
    diagnosticSteps: [
      {
        order: 1,
        step: 'Periksa Status Trunk pada Switch',
        desc: 'Jalankan `show interfaces trunk` pada Cisco switch. Pastikan port uplink ke router (misal Gi0/1) berstatus "status: trunking, encapsulation: 802.1q".'
      },
      {
        order: 2,
        step: 'Periksa Subinterface Router',
        desc: 'Jalankan `show ip interface brief` pada Router. Periksa apakah Gig0/0.10 dan Gig0/0.20 berstatus "Status: Up, Protocol: Up".'
      },
      {
        order: 3,
        step: 'Jalankan Perintah traceroute / tracert',
        desc: 'Ketik `tracert 192.168.20.20` di CMD PC VLAN 10 untuk melihat di hop mana paket terhenti.'
      }
    ],
    solutions: [
      {
        title: 'Solusi: Konfigurasi Router-on-a-Stick (RoaS) yang Tepat',
        desc: 'Di sisi Cisco Router:\n```bash\nRouter(config)# interface gigabitEthernet 0/0\nRouter(config-if)# no shutdown\nRouter(config-if)# exit\n\nRouter(config)# interface gigabitEthernet 0/0.10\nRouter(config-subif)# encapsulation dot1Q 10\nRouter(config-subif)# ip address 192.168.10.1 255.255.255.0\n\nRouter(config)# interface gigabitEthernet 0/0.20\nRouter(config-subif)# encapsulation dot1Q 20\nRouter(config-subif)# ip address 192.168.20.1 255.255.255.0\n```'
      }
    ],
    verificationSteps: [
      'Jalankan ping dari PC VLAN 10 ke PC VLAN 20. Ping pertama mungkin Request Timed Out (proses ARP), lalu 3 ping berikutnya Reply.',
      'Periksa `show ip route` pada router untuk memastikan rute terkoneksi (C) ke kedua subnet ada di routing table.'
    ],
    relatedTopics: ['mat-vlan-trunking', 'lab-cisco-vlan-trunk']
  },
  {
    id: 'tb-dns-resolution-failure',
    title: 'Bisa Ping IP 8.8.8.8 Tetapi Tidak Bisa Membuka Website / Domain (DNS Failure)',
    category: 'networking',
    categoryLabel: 'Networking Issues',
    severity: 'medium',
    symptoms: [
      'Perintah "ping 8.8.8.8" sukses 100% reply, namun "ping google.com" membalas "Ping request could not find host google.com".',
      'Browser Google Chrome memunculkan kode error "DNS_PROBE_FINISHED_NXDOMAIN" atau "ERR_NAME_NOT_RESOLVED".'
    ],
    possibleCauses: [
      'Alamat DNS Server pada konfigurasi IP klien kosong atau salah ketik.',
      'Server DNS lokal (Bind9 atau MikroTik DNS Cache) sedang mati layanannya.',
      'Port 53 (UDP/TCP) diblokir oleh firewall router atau ISP.',
      'Cache DNS resolver komputer klien menyimpan respon query usang yang rusak.'
    ],
    diagnosticSteps: [
      {
        order: 1,
        step: 'Uji Resolusi Nama Menggunakan nslookup',
        desc: 'Ketik `nslookup google.com` di terminal. Periksa server DNS mana yang menjawab dan apa pesan kesalahannya.'
      },
      {
        order: 2,
        step: 'Cek Konfigurasi DNS di /etc/resolv.conf (Linux) atau ipconfig /all (Windows)',
        desc: 'Lihat baris "DNS Servers". Apakah terisi IP yang valid seperti 1.1.1.1 atau 8.8.8.8?'
      }
    ],
    solutions: [
      {
        title: 'Solusi 1: Bersihkan Cache DNS Lokal (Flush DNS)',
        desc: 'Di CMD Windows:\n`ipconfig /flushdns`\nDi Linux:\n`sudo resolvectl flush-caches` atau `sudo systemd-resolve --flush-caches`'
      },
      {
        title: 'Solusi 2: Tambahkan DNS Publik Terpercaya',
        desc: 'Ubah DNS Klien menjadi:\nPreferred DNS: 1.1.1.1 (Cloudflare)\nAlternate DNS: 8.8.8.8 (Google)\nDi MikroTik: `/ip dns set servers=1.1.1.1,8.8.8.8 allow-remote-requests=yes`'
      }
    ],
    verificationSteps: [
      'Ketik `nslookup sijalab.sch.id` dan pastikan IP address tujuan dikembalikan dengan cepat tanpa timeout.',
      'Buka situs web di browser dan pastikan halaman ter-load secara mulus.'
    ],
    relatedTopics: ['mat-network-services', 'mat-osi-tcpip']
  },
  {
    id: 'tb-ssh-connection-refused',
    title: 'SSH Connection Refused / Connection Timed Out Saat Remote Server Linux',
    category: 'linux',
    categoryLabel: 'Linux Server Issues',
    severity: 'medium',
    symptoms: [
      'PuTTY atau terminal mengeluarkan galat "ssh: connect to host 192.168.10.50 port 22: Connection refused".',
      'Atau pesan "Connection timed out" setelah menunggu selama 30 detik tanpa respon.'
    ],
    possibleCauses: [
      'Layanan OpenSSH Daemon (sshd) di server belum terinstal atau dalam status inactive/dead.',
      'Port SSH telah dipindah dari port default 22 ke port kustom (misal port 2222) dan klien masih menggunakan port 22.',
      'Firewall UFW (Uncomplicated Firewall) atau iptables di Linux memblokir paket masuk ke port SSH.',
      'IP server salah atau mesin virtual server belum menyala.'
    ],
    diagnosticSteps: [
      {
        order: 1,
        step: 'Cek Status Daemon SSH di Konsol Langsung Server',
        desc: 'Buka monitor langsung server dan jalankan:\n`sudo systemctl status ssh` atau `sudo systemctl status sshd`'
      },
      {
        order: 2,
        step: 'Periksa Port yang Sedang Listening',
        desc: 'Jalankan perintah:\n`sudo ss -tulpn | grep ssh`\nLihat port mana yang aktif mendengarkan koneksi.'
      },
      {
        order: 3,
        step: 'Cek Firewall UFW',
        desc: 'Jalankan `sudo ufw status verbose` untuk memastikan port SSH diizinkan (ALLOW).'
      }
    ],
    solutions: [
      {
        title: 'Solusi 1: Aktifkan Service SSH',
        desc: 'Jalankan perintah:\n`sudo apt install openssh-server -y`\n`sudo systemctl enable --now ssh`'
      },
      {
        title: 'Solusi 2: Izinkan Port pada UFW Firewall',
        desc: 'Jika port 22 yang digunakan:\n`sudo ufw allow 22/tcp`\nJika port kustom 2222:\n`sudo ufw allow 2222/tcp`\n`sudo ufw reload`'
      }
    ],
    verificationSteps: [
      'Dari laptop klien, jalankan `ssh nama_user@192.168.10.50 -p [port]` dan pastikan prompt password muncul.'
    ],
    relatedTopics: ['mat-linux-ssh', 'mat-linux-commands']
  },
  {
    id: 'tb-dhcp-not-assigning-ip',
    title: 'PC Klien Mendapat IP 169.254.x.x (APIPA) / DHCP Server Tidak Merespon',
    category: 'networking',
    categoryLabel: 'Networking Issues',
    severity: 'high',
    symptoms: [
      'PC siswa gagal terhubung ke jaringan lokal. Perintah ipconfig menampilkan "Autoconfiguration IPv4 Address: 169.254.X.Y".',
      'Subnet mask terbaca 255.255.0.0 dan Default Gateway kosong.'
    ],
    possibleCauses: [
      'Klien mengirim pesan DHCP Discover broadcast, namun tidak ada DHCP server yang membalas pesan DHCP Offer.',
      'Alokasi Pool IP pada DHCP Server sudah habis (semua IP terpakai/leased).',
      'Port switch yang terhubung ke PC berada di VLAN yang salah, di mana pada VLAN tersebut tidak terdapat DHCP Server atau DHCP Relay (IP Helper Address).',
      'Layanan service isc-dhcp-server di server Linux mengalami error sintaks dan berhenti (crashed).'
    ],
    diagnosticSteps: [
      {
        order: 1,
        step: 'Cek Status Service DHCP Server',
        desc: 'Di server Linux: `sudo journalctl -u isc-dhcp-server -e` untuk membaca log baris error terakhir.'
      },
      {
        order: 2,
        step: 'Cek Sisa Pool IP yang Tersedia',
        desc: 'Buka file `/var/lib/dhcp/dhcpd.leases` dan hitung berapa klien yang aktif meminjam IP.'
      },
      {
        order: 3,
        step: 'Uji Permintaan IP Baru di Sisi Klien',
        desc: 'Jalankan di CMD dengan hak administrator:\n`ipconfig /release` lalu `ipconfig /renew`'
      }
    ],
    solutions: [
      {
        title: 'Solusi 1: Perbaiki Kesalahan Konfigurasi Subnet',
        desc: 'Pastikan deklarasi subnet di `/etc/dhcp/dhcpd.conf` cocok dengan IP interface fisik server. Restart service: `sudo systemctl restart isc-dhcp-server`.'
      },
      {
        title: 'Solusi 2: Tambahkan IP Helper Address pada Router/Switch L3',
        desc: 'Jika klien berada di VLAN berbeda dari DHCP server, tambahkan IP helper di interface router:\n`Switch(config-if)# ip helper-address 192.168.100.1`'
      }
    ],
    verificationSteps: [
      'Jalankan `ipconfig` di PC klien. Pastikan IP yang didapat berada dalam rentang pool yang ditentukan dan default gateway terisi benar.'
    ],
    relatedTopics: ['mat-network-services', 'lab-linux-dhcp']
  },
  {
    id: 'tb-esp32-not-detected',
    title: 'Port COM Mikrokontroler ESP32 Tidak Terdeteksi di Laptop (Port Grayed Out)',
    category: 'siot',
    categoryLabel: 'SIoT & Electronics Issues',
    severity: 'medium',
    symptoms: [
      'Menu "Tools > Port" di Arduino IDE berwarna abu-abu (grayed out) dan tidak bisa diklik.',
      'Di Device Manager Windows, tidak ada kategori "Ports (COM & LPT)" atau muncul lambang tanda seru kuning "Unknown Device".'
    ],
    possibleCauses: [
      'Kabel USB yang dipakai adalah kabel daya pengisi baterai (Power-Only Cable) tanpa kawat jalur transmisi data D+ dan D-.',
      'Driver chip USB-to-UART (CP2102 atau CH340 / CH9102) belum terinstal di sistem operasi komputer siswa.',
      'Port USB laptop kotor atau mengalami under-voltage.',
      'Sirkuit chip ESP32 korsleting (short-circuit) karena terhubung beban berlebih di breadboard.'
    ],
    diagnosticSteps: [
      {
        order: 1,
        step: 'Buka Device Manager Windows (devmgmt.msc)',
        desc: 'Colok dan cabut kabel USB ESP32 sambil memperhatikan layar Device Manager. Apakah ada daftar yang berkedip atau berubah?'
      },
      {
        order: 2,
        step: 'Cek Tipe Chip USB pada Board ESP32',
        desc: 'Lihat chip kotak hitam kecil di dekat soket micro-USB: jika bertuliskan "SILABS CP2102" berarti butuh driver Silicon Labs; jika bertuliskan "WCH CH340G" berarti butuh driver CH340.'
      }
    ],
    solutions: [
      {
        title: 'Solusi 1: Ganti Kabel USB Data Berkualitas',
        desc: 'Gunakan kabel USB yang sudah terbukti bisa transfer file dari smartphone ke laptop. Hindari kabel charger pipih murah.'
      },
      {
        title: 'Solusi 2: Instal Driver CH340 / CP2102',
        desc: 'Unduh dan pasang installer driver resmi CH341SER.EXE untuk chip CH340, atau CP210x Universal Windows Driver untuk chip Silicon Labs.'
      },
      {
        title: 'Solusi 3: Cabut Semua Kabel Sensor di Breadboard',
        desc: 'Lepaskan semua jumper yang terhubung ke pin GPIO ESP32 untuk memastikan tidak ada komponen rusak yang menarik arus korsleting sehingga memicu pengaman overcurrent USB laptop.'
      }
    ],
    verificationSteps: [
      'Di Device Manager muncul "Silicon Labs CP210x USB to UART Bridge (COM3)" atau "USB-SERIAL CH340 (COM4)".',
      'Di Arduino IDE, nomor port COM tersebut dapat dicentang dan proses Upload program berjalan sukses.'
    ],
    relatedTopics: ['mat-esp32-intro', 'lab-esp32-led-pwm']
  },
  {
    id: 'tb-sensor-not-responding',
    title: 'Sensor DHT22 / Ultrasonik Mengembalikan Nilai "nan" atau Jarak 0 cm',
    category: 'siot',
    categoryLabel: 'SIoT & Electronics Issues',
    severity: 'medium',
    symptoms: [
      'Serial Monitor menampilkan "Kelembaban: nan% | Suhu: nan°C" (Not a Number) secara terus-menerus.',
      'Sensor HC-SR04 mengembalikan nilai jarak konstan 0 cm atau 400 cm tidak peduli ada objek di depannya.'
    ],
    possibleCauses: [
      'Pin DATA sensor tertukar atau tercolok di lubang GPIO yang salah di breadboard.',
      'Resistor pull-up 10kΩ pada pin data DHT22 lupa dipasang atau kendor.',
      'Periode pembacaan sensor terlalu cepat (DHT22 memerlukan jeda minimal 2000 ms per pembacaan).',
      'Pin Echo ultrasonik tidak menerima respon pantulan suara karena hambatan daya 5V.'
    ],
    diagnosticSteps: [
      {
        order: 1,
        step: 'Periksa Jalur Kontak Breadboard',
        desc: 'Pastikan kaki sensor dan kawat jumper menancap kuat pada satu baris 5 lubang yang sama, bukan melompat ke baris sebelahnya.'
      },
      {
        order: 2,
        step: 'Cek Tegangan Pin VCC dengan Multitester',
        desc: 'Ukur tegangan antara pin VCC dan GND sensor. Pastikan jarum multitester menunjukkan tegangan stabil 3.3V atau 5V.'
      }
    ],
    solutions: [
      {
        title: 'Solusi: Koreksi Penempatan Resistor & Delay Program',
        desc: 'Pasang resistor 10kΩ tepat di antara pin VCC dan Pin Data DHT22. Pada kode void loop(), pastikan ada `delay(2000);` sebelum fungsi `dht.readTemperature()` dieksekusi.'
      }
    ],
    verificationSteps: [
      'Buka Serial Monitor dan pastikan nilai angka desimal normal (misal 28.5°C) muncul teratur setiap 2 detik.'
    ],
    relatedTopics: ['mat-sensors-actuators', 'lab-dht22-sensor-reading']
  },
  {
    id: 'tb-ip-conflict',
    title: 'Konflik Alamat IP (Duplicate IP Address Detected in Network)',
    category: 'networking',
    categoryLabel: 'Networking Issues',
    severity: 'high',
    symptoms: [
      'Muncul pop-up notifikasi Windows di pojok kanan bawah: "There is an IP address conflict with another system on the network".',
      'Koneksi internet sering putus-nyambung secara acak.',
      'Saat melakukan ping ke IP gateway, kadang dibalas oleh MAC address yang berbeda (flapping ARP).'
    ],
    possibleCauses: [
      'Dua siswa di laboratorium mengonfigurasi IP static yang persis sama pada kartu jaringan PC masing-masing.',
      'Sebuah perangkat disetel IP static yang berada di dalam rentang alokasi pool DHCP dinamis tanpa reservasi IP.',
      'Ada router WiFi rumahan liar yang dibawa siswa dan dicolok ke port switch lab.'
    ],
    diagnosticSteps: [
      {
        order: 1,
        step: 'Lacak MAC Address Pengguna IP yang Berkonflik',
        desc: 'Matikan kartu jaringan komputer kita (Disable NIC). Dari laptop lain, lakukan `ping [IP_konflik]` lalu ketik `arp -a` untuk melihat MAC address perangkat yang sedang memakai IP tersebut.'
      },
      {
        order: 2,
        step: 'Cari Port Switch Terkait',
        desc: 'Di switch Cisco, ketik `show mac address-table address [MAC_tadi]` untuk mengetahui di port kabel mana komputer penyebab konflik tertancap.'
      }
    ],
    solutions: [
      {
        title: 'Solusi: Ubah ke DHCP atau Ubah IP Static Terdaftar',
        desc: 'Ganti konfigurasi IP komputer siswa ke IP yang masih kosong sesuai buku log denah IP lab, atau aktifkan fitur DHCP Snooping dan Dynamic ARP Inspection (DAI) pada switch distribution.'
      }
    ],
    verificationSteps: [
      'Jalankan `ipconfig` dan pastikan tidak ada lagi peringatan konflik di Event Viewer Windows.'
    ],
    relatedTopics: ['mat-ip-subnetting', 'mat-osi-tcpip']
  }
];

