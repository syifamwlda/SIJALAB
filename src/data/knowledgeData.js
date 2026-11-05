// SIJALAB Knowledge Center Data
// Kurikulum SMK Sistem Informatika, Jaringan, dan Aplikasi (SIJA)

export const KNOWLEDGE_CATEGORIES = [
  { id: 'all', label: 'Semua Kategori', icon: 'Sparkles', color: 'bg-blue-500' },
  { id: 'networking', label: 'Computer Networking', icon: 'Network', color: 'bg-indigo-500' },
  { id: 'cisco', label: 'Cisco Networking', icon: 'Cpu', color: 'bg-sky-500' },
  { id: 'mikrotik', label: 'MikroTik', icon: 'Router', color: 'bg-cyan-500' },
  { id: 'linux', label: 'Linux Administration', icon: 'Terminal', color: 'bg-emerald-500' },
  { id: 'windows', label: 'Windows Server', icon: 'Monitor', color: 'bg-blue-600' },
  { id: 'services', label: 'Network Services', icon: 'Server', color: 'bg-teal-500' },
  { id: 'iot', label: 'Internet of Things (IoT)', icon: 'Wifi', color: 'bg-amber-500' },
  { id: 'electronics', label: 'Elektronika & Mikrokontroler', icon: 'Zap', color: 'bg-rose-500' },
  { id: 'programming', label: 'Web & Database', icon: 'Code', color: 'bg-violet-500' },
];

export const INITIAL_KNOWLEDGE_MATERIALS = [
  {
    id: 'mat-osi-tcpip',
    title: 'Model OSI 7 Layer dan Arsitektur TCP/IP',
    category: 'networking',
    categoryLabel: 'Computer Networking',
    difficulty: 'Dasar',
    duration: '25 Menit',
    xp: 50,
    tags: ['OSI', 'TCP/IP', 'Protokol', 'Encapsulation'],
    summaryShort: 'Pahami bagaimana data bergerak melalui 7 lapisan konseptual OSI dan padanannya di protokol internet TCP/IP.',
    objectives: [
      'Menjelaskan fungsi dan peran setiap lapisan pada model referensi OSI 7 Layer.',
      'Membandingkan perbedaan arsitektur model OSI dengan tumpukan protokol TCP/IP.',
      'Memahami proses enkapsulasi dan dekapsulasi paket data saat melintasi jaringan.',
      'Mengidentifikasi protokol utama pada tiap layer (HTTP, TCP, UDP, IP, Ethernet).'
    ],
    introduction: 'Dalam dunia telekomunikasi dan jaringan komputer SIJA, Model Open Systems Interconnection (OSI) dan Transmission Control Protocol/Internet Protocol (TCP/IP) adalah fondasi mutlak. Model ini mengabstraksikan transmisi bit fisik menjadi aplikasi interaktif yang kita nikmati setiap hari.',
    diagram: {
      type: 'layers',
      title: 'Pemetaan OSI 7 Layer vs TCP/IP 4 Layer',
      layers: [
        { osi: '7. Application', tcp: 'Application', pdu: 'Data', color: 'bg-rose-100 text-rose-800 border-rose-300', desc: 'Antarmuka aplikasi pengguna (HTTP, DNS, SSH, FTP)' },
        { osi: '6. Presentation', tcp: 'Application', pdu: 'Data', color: 'bg-pink-100 text-pink-800 border-pink-300', desc: 'Format data, enkripsi SSL/TLS, kompresi' },
        { osi: '5. Session', tcp: 'Application', pdu: 'Data', color: 'bg-purple-100 text-purple-800 border-purple-300', desc: 'Manajemen sesi komunikasi dan sinkronisasi dialog' },
        { osi: '4. Transport', tcp: 'Transport', pdu: 'Segment', color: 'bg-blue-100 text-blue-800 border-blue-300', desc: 'End-to-end delivery, port addressing, flow control (TCP, UDP)' },
        { osi: '3. Network', tcp: 'Internet', pdu: 'Packet', color: 'bg-cyan-100 text-cyan-800 border-cyan-300', desc: 'Logical addressing (IP) dan pemilihan rute terbaik (Routing)' },
        { osi: '2. Data Link', tcp: 'Network Access', pdu: 'Frame', color: 'bg-teal-100 text-teal-800 border-teal-300', desc: 'Physical addressing (MAC Address) dan framing (Switch, Ethernet)' },
        { osi: '1. Physical', tcp: 'Network Access', pdu: 'Bits', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', desc: 'Transmisi sinyal biner elektrik/optik melalui media kabel/nirkabel' }
      ]
    },
    sections: [
      {
        title: '1. Mengapa Standarisasi Layer Diperlukan?',
        content: `Sebelum ada standar OSI oleh ISO (International Organization for Standardization), setiap vendor manufaktur jaringan (seperti IBM, DEC, Xerox) memiliki protokol tertutup (proprietary). Komputer IBM tidak bisa berbicara dengan DEC. Konsep layered architecture memungkinkan modularitas: vendor kartu jaringan (NIC) hanya perlu fokus di Layer 1 & 2 tanpa harus mengubah kode aplikasi browser di Layer 7.`
      },
      {
        title: '2. Proses Enkapsulasi & Dekapsulasi Data',
        content: `Saat siswa mengirim pesan di browser:
- **Layer 7-5**: Pesan dibentuk menjadi Application Data.
- **Layer 4**: Transport layer menambahkan TCP Header (Source Port, Destination Port) → Terbentuk **Segment**.
- **Layer 3**: Network layer membungkus segment dengan IP Header (Source IP, Dest IP) → Terbentuk **Packet**.
- **Layer 2**: Data Link membungkus packet dengan Ethernet Header (MAC Address) & FCS Trailer → Terbentuk **Frame**.
- **Layer 1**: Frame dikonversi menjadi pulsa tegangan listrik atau cahaya biner (0 dan 1) → **Bits** dikirim melalui kabel UTP atau Fiber Optic.`
      },
      {
        title: '3. Contoh Nyata Analogi Pengiriman Surat',
        content: `Bayangkan mengirim paket belanja online:
- Pesan surat = Data Layer 7
- Dimasukkan amplop dan diberi kode rahasia = Presentation & Session
- Ditentukan jasa kurir Express (TCP - bergaransi sampai) atau Hemat (UDP - cepat tapi tanpa konfirmasi tanda terima) = Transport
- Diberi alamat kota dan kode pos tujuan = Network (IP Address)
- Diserahkan ke loket kurir terdekat dengan nomor resi lokal = Data Link (MAC Address)
- Mobil truk kurir melaju di atas jalan aspal = Physical (Kabel/Sinyal)`
      }
    ],
    practicalApplication: 'Ketika kamu melakukan troubleshooting jaringan tidak bisa internet di Lab SIJA, kamu selalu memulai dari Layer 1 (cek lampu indikator kabel LAN), Layer 2 (cek apakah Switch mendeteksi MAC address), Layer 3 (tes ping IP Gateway), hingga Layer 7 (buka website di browser). Metode ini disebut Divide and Conquer atau Bottom-Up Troubleshooting.',
    summary: 'Model OSI terdiri dari 7 lapisan (Physical hingga Application) sedangkan TCP/IP menyederhanakannya menjadi 4 lapisan. Pemahaman tentang PDU (Bits, Frames, Packets, Segments, Data) sangat penting dalam konfigurasi firewall, router, dan analisis paket dengan Wireshark.',
    relatedIds: ['mat-ip-subnetting', 'mat-vlan-trunking', 'mat-cisco-routing']
  },
  {
    id: 'mat-ip-subnetting',
    title: 'Pengalamatan IPv4, Subnetting & Kalkulasi VLSM',
    category: 'networking',
    categoryLabel: 'Computer Networking',
    difficulty: 'Menengah',
    duration: '35 Menit',
    xp: 65,
    tags: ['IPv4', 'Subnetting', 'CIDR', 'VLSM', 'Binary'],
    summaryShort: 'Kuasai teknik menghitung subnet mask, jumlah host valid, network address, dan broadcast address menggunakan metode CIDR dan VLSM.',
    objectives: [
      'Menghitung konversi biner ke desimal untuk notasi oktet IPv4.',
      'Menentukan Network Address, Broadcast Address, dan Host Range dari prefix /CIDR.',
      'Menerapkan Variable Length Subnet Masking (VLSM) untuk efisiensi alokasi IP di lab sekolah.',
      'Membedakan IP Public vs IP Private (RFC 1918).'
    ],
    introduction: 'Alamat IPv4 terdiri dari 32 bit yang terbagi menjadi 4 oktet. Karena jumlah perangkat yang terus meledak, administrator jaringan SIJA harus pintar menghemat alamat melalui teknik Subnetting dan VLSM (Variable Length Subnet Masking).',
    diagram: {
      type: 'table',
      title: 'Tabel Ringkasan Prefix CIDR /24 hingga /30',
      headers: ['Prefix CIDR', 'Subnet Mask', 'Bit Host (h)', 'Total Host (2^h)', 'Host Valid (2^h - 2)'],
      rows: [
        ['/24', '255.255.255.0', '8 bit', '256', '254'],
        ['/25', '255.255.255.128', '7 bit', '128', '126'],
        ['/26', '255.255.255.192', '6 bit', '64', '62'],
        ['/27', '255.255.255.224', '5 bit', '32', '30'],
        ['/28', '255.255.255.240', '4 bit', '16', '14'],
        ['/29', '255.255.255.248', '3 bit', '8', '6'],
        ['/30', '255.255.255.252', '2 bit', '4', '2 (Paling pas untuk link P2P Router)']
      ]
    },
    sections: [
      {
        title: '1. Anatomi IPv4: Network ID vs Host ID',
        content: `IP Address selalu memiliki dua bagian: porsi Jaringan (Network ID) dan porsi Perangkat (Host ID). Subnet Mask bertindak sebagai filter: angka biner 1 menandakan Network, dan angka biner 0 menandakan Host. Contoh IP 192.168.10.50/26 memiliki 26 bit bernilai 1 dan 6 bit bernilai 0.`
      },
      {
        title: '2. Rumus Ajaib Subnetting Cepat',
        content: `Untuk menghitung blok subnet tanpa coret-coret biner panjang:
1. Kurangkan 32 dengan prefix: Contoh /27 → 32 - 27 = 5 bit sisa host.
2. Jumlah total host per blok = 2^5 = 32.
3. Nilai lompatan blok subnet = 256 - subnet mask (atau 32). Bloknya adalah: 0, 32, 64, 96, 128, dst.
4. Contoh IP 192.168.1.45/27 berada di antara 32 dan 64, sehingga:
   - Network ID: 192.168.1.32
   - First Usable Host: 192.168.1.33
   - Last Usable Host: 192.168.1.62
   - Broadcast ID: 192.168.1.63`
      },
      {
        title: '3. Rentang IP Private RFC 1918',
        content: `Tiga kelas alamat IP khusus yang gratis digunakan di jaringan lokal tanpa izin ISP:
- Kelas A: 10.0.0.0 s/d 10.255.255.255 (/8)
- Kelas B: 172.16.0.0 s/d 172.31.255.255 (/12)
- Kelas C: 192.168.0.0 s/d 192.168.255.255 (/16)`
      }
    ],
    practicalApplication: 'Dalam perancangan Lab SIJA dengan 30 PC siswa dan 1 Server, alokasikan prefix /27 (30 host valid) untuk ruangan tersebut, dan gunakan /30 untuk jalur koneksi antara Router Utama dan Router ISP.',
    summary: 'Subnetting memecah broadcast domain besar menjadi domain kecil yang lebih aman dan teratur. Selalu kurangi 2 pada total host untuk mendapatkan host valid karena 1 alamat dipakai untuk Network ID dan 1 alamat untuk Broadcast ID.',
    relatedIds: ['mat-osi-tcpip', 'mat-vlan-trunking']
  },
  {
    id: 'mat-vlan-trunking',
    title: 'Virtual LAN (VLAN) dan 802.1Q Trunking',
    category: 'cisco',
    categoryLabel: 'Cisco Networking',
    difficulty: 'Menengah',
    duration: '30 Menit',
    xp: 60,
    tags: ['VLAN', 'Trunking', '802.1Q', 'Switching', 'Cisco'],
    summaryShort: 'Pisahkan lalu lintas jaringan secara logis dalam satu switch fisik dan teruskan banyak VLAN melalui satu kabel trunk.',
    objectives: [
      'Memahami konsep segmentasi logis VLAN untuk keamanan dan efisiensi broadcast.',
      'Mengkonfigurasi Access Port dan Trunk Port pada Cisco Catalyst Switch.',
      'Memahami mekanisme penambahan VLAN Tag IEEE 802.1Q.',
      'Menjelaskan fungsi Inter-VLAN Routing (Router-on-a-Stick).'
    ],
    introduction: 'Secara default, seluruh port pada switch berada dalam satu broadcast domain (VLAN 1). Dengan VLAN, kita bisa membagi 1 switch fisik menjadi seolah-olah beberapa switch terpisah (misalnya VLAN 10 untuk Lab SIJA 1, VLAN 20 untuk Lab SIJA 2, dan VLAN 30 untuk Ruang Guru).',
    diagram: {
      type: 'vlan_diagram',
      title: 'Topologi VLAN & 802.1Q Trunk Link',
      nodes: [
        { name: 'PC-A (Lab 1)', vlan: 'VLAN 10', ip: '192.168.10.10', port: 'Fa0/1 (Access)' },
        { name: 'PC-B (Lab 2)', vlan: 'VLAN 20', ip: '192.168.20.10', port: 'Fa0/2 (Access)' },
        { name: 'Switch Catalyst', role: 'Distribution', trunk: 'Gig0/1 (802.1Q Trunk)' },
        { name: 'Router Cisco', role: 'Gateway (RoaS)', subinterfaces: 'Gig0/0.10 & Gig0/0.20' }
      ]
    },
    sections: [
      {
        title: '1. Access Port vs Trunk Port',
        content: `Port pada Managed Switch Cisco memiliki dua mode operasional utama:
- **Access Port**: Port yang terhubung langsung ke end-device (PC, laptop, printer). Port ini hanya membawa traffic untuk satu VLAN spesifik dan frame yang keluar tidak memiliki tag 802.1Q.
- **Trunk Port**: Port penghubung antar-switch atau switch ke router. Trunk port mampu melewatkan traffic dari berbagai VLAN sekaligus dengan menyisipkan Header 4-byte 802.1Q yang berisi VLAN ID (1-4094).`
      },
      {
        title: '2. Sintaks Konfigurasi Dasar Cisco IOS',
        content: `Membuat VLAN dan memasukkan port:
\`\`\`bash
Switch# configure terminal
Switch(config)# vlan 10
Switch(config-vlan)# name LAB_SIJA_1
Switch(config-vlan)# exit

Switch(config)# interface fastEthernet 0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
Switch(config-if)# no shutdown
\`\`\`

Membuat Port Trunk ke Switch lain:
\`\`\`bash
Switch(config)# interface gigabitEthernet 0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30
\`\`\``
      }
    ],
    practicalApplication: 'Di sekolah, VLAN mencegah komputer siswa membobol jaringan server ujian atau mengganggu koneksi jaringan guru karena broadcast domain dan lalu lintas data diisolasi secara ketat.',
    summary: 'VLAN mengisolasi broadcast domain pada Layer 2. Agar antar-VLAN yang berbeda dapat saling berkomunikasi, diperlukan perangkat Layer 3 seperti Router (Router-on-a-Stick) atau Multilayer Switch (SVI).',
    relatedIds: ['mat-osi-tcpip', 'mat-cisco-routing']
  },
  {
    id: 'mat-cisco-routing',
    title: 'Routing Fundamentals: Statis, OSPF & RIPv2',
    category: 'cisco',
    categoryLabel: 'Cisco Networking',
    difficulty: 'Lanjutan',
    duration: '40 Menit',
    xp: 75,
    tags: ['Routing', 'OSPF', 'RIP', 'Metric', 'Administrative Distance'],
    summaryShort: 'Pelajari mekanisme pemilihan jalur terbaik (best path selection) menggunakan tabel routing, Static Route, dan Dynamic Routing Protocol OSPF.',
    objectives: [
      'Membedakan prinsip kerja Static Routing vs Dynamic Routing.',
      'Menghafal nilai Administrative Distance (AD) protokol routing umum.',
      'Memahami algoritma Link-State pada OSPF (Dijkstra Shortest Path First).',
      'Mengkonfigurasi OSPF Single Area pada Cisco IOS.'
    ],
    introduction: 'Router bekerja pada Layer 3 OSI untuk meneruskan paket antar-jaringan yang berbeda subnet. Router menggunakan Routing Table untuk menentukan interface keluar mana yang harus digunakan untuk mencapai tujuan.',
    diagram: {
      type: 'table',
      title: 'Tabel Administrative Distance (AD) Prioritas Jalur',
      headers: ['Sumber Rute (Route Source)', 'Nilai AD', 'Karakteristik'],
      rows: [
        ['Connected Interface', '0', 'Interface fisik router yang langsung terhubung & UP'],
        ['Static Route', '1', 'Dikonfigurasi manual oleh network engineer'],
        ['EIGRP (Internal)', '90', 'Cisco proprietary advanced distance vector'],
        ['OSPF', '110', 'Standar terbuka Link-State berbasis Cost (Bandwidth)'],
        ['RIPv2', '120', 'Distance vector berbasis Hop Count (Maksimal 15 hop)'],
        ['Unknown / Unreachable', '255', 'Tidak dipercaya / paket akan di-drop']
      ]
    },
    sections: [
      {
        title: '1. Logika Pemilihan Rute oleh Router',
        content: `Ketika router menerima paket, ada 3 hierarki evaluasi:
1. **Longest Prefix Match**: Rute yang paling spesifik selalu menang (/28 mengalahkan /24).
2. **Administrative Distance**: Jika prefix sama panjang, nilai AD terkecil yang dipilih (Static AD 1 mengalahkan OSPF AD 110).
3. **Metric**: Jika protokol routing sama, rute dengan nilai metric terendah yang dimasukkan ke Routing Table.`
      },
      {
        title: '2. Konfigurasi OSPF Single Area (Area 0)',
        content: `\`\`\`bash
Router(config)# router ospf 1
Router(config-router)# router-id 1.1.1.1
Router(config-router)# network 192.168.10.0 0.0.0.255 area 0
Router(config-router)# network 10.10.10.0 0.0.0.3 area 0
Router(config-router)# passive-interface FastEthernet 0/0
\`\`\`
Catatan: OSPF menggunakan Wildcard Mask (kebalikan dari Subnet Mask. Contoh /24 wildcard mask-nya adalah 0.0.0.255).`
      }
    ],
    practicalApplication: 'Di jaringan kampus atau gedung sekolah bertingkat, OSPF digunakan agar jika satu kabel fiber optic antar-gedung terputus, router secara otomatis mengalihkan jalur data ke kabel cadangan hanya dalam hitungan detik (fast convergence).',
    summary: 'Static route cocok untuk jaringan skala kecil dan default gateway (0.0.0.0/0). OSPF adalah standar industri untuk jaringan skala menengah hingga enterprise karena konvergensi cepat dan bebas loop.',
    relatedIds: ['mat-ip-subnetting', 'mat-vlan-trunking']
  },
  {
    id: 'mat-mikrotik-firewall',
    title: 'MikroTik RouterOS: NAT, Mangle & Filter Rules',
    category: 'mikrotik',
    categoryLabel: 'MikroTik',
    difficulty: 'Menengah',
    duration: '35 Menit',
    xp: 65,
    tags: ['MikroTik', 'Firewall', 'NAT', 'Filter', 'RouterOS'],
    summaryShort: 'Kupas tuntas arsitektur firewall RouterOS: packet flow, masquerade NAT untuk internet sharing, dan pengamanan akses router.',
    objectives: [
      'Memahami 3 rantai (chains) utama Filter Rules: Input, Forward, dan Output.',
      'Mengkonfigurasi Source NAT (srcnat / masquerade) untuk membagikan internet.',
      'Memblokir situs tertentu atau port berbahaya menggunakan firewall filter.',
      'Menerapkan port forwarding (dstnat) untuk web server lokal.'
    ],
    introduction: 'MikroTik RouterOS adalah salah satu sistem operasi router terpopuler di Indonesia. Fitur firewall yang fleksibel berbasis Linux iptables memungkinkan administrator SIJA mengendalikan arus paket secara presisi.',
    sections: [
      {
        title: '1. Tiga Rantai Utama Filter Rules',
        content: `Membedakan rantai traffic sangat vital:
- **Input**: Paket yang ditujukan langsung ke mesin MikroTik itu sendiri (contoh: siswa mencoba login Winbox, SSH ke router, atau ping ke IP router).
- **Forward**: Paket yang hanya menumpang lewat melintasi router dari satu interface ke interface lain (contoh: siswa browsing dari Lab ke Google).
- **Output**: Paket yang berasal dari dalam MikroTik menuju jaringan luar (contoh: MikroTik melakukan ping test ke 8.8.8.8 atau DNS query internal).`
      },
      {
        title: '2. Konfigurasi Masquerade NAT (Internet Sharing)',
        content: `Agar semua PC lab yang memakai IP Private (192.168.88.0/24) bisa mengakses internet lewat 1 IP Publik di ether1:
\`\`\`bash
/ip firewall nat
add chain=srcnat out-interface=ether1-gateway action=masquerade
\`\`\`
Perintah ini mengganti Source IP paket komputer siswa dengan IP ether1 sebelum diteruskan ke modem ISP.`
      }
    ],
    practicalApplication: 'Mengamankan MikroTik lab dengan membuat rule "Drop all input not from admin IP" sehingga siswa nakal tidak bisa melakukan brute-force password login router.',
    summary: 'Firewall MikroTik bekerja secara berurutan dari baris atas ke bawah (Top to Bottom). Letakkan rule Accept untuk koneksi Established & Related paling atas untuk efisiensi CPU.',
    relatedIds: ['mat-ip-subnetting', 'mat-osi-tcpip']
  },
  {
    id: 'mat-linux-commands',
    title: 'Perintah Esensial Linux Server & Manajemen Hak Akses',
    category: 'linux',
    categoryLabel: 'Linux Administration',
    difficulty: 'Dasar',
    duration: '30 Menit',
    xp: 55,
    tags: ['Linux', 'Ubuntu', 'Debian', 'Bash', 'Chmod', 'Chown'],
    summaryShort: 'Panduan lengkap navigasi CLI Linux, manipulasi berkas, pengelolaan proses systemd, dan izin file permission (rwx).',
    objectives: [
      'Menavigasi direktori hierarki Linux (/etc, /var, /home, /bin).',
      'Menggunakan perintah manipulasi berkas (cp, mv, rm, touch, grep, find).',
      'Menghitung dan menerapkan perizinan berkas chmod secara numerik (oktal) dan simbolik.',
      'Mengelola layanan server dengan systemctl (start, stop, enable, status).'
    ],
    introduction: 'Lebih dari 90% cloud server dan infrastruktur internet dunia beroperasi di atas distribusi Linux (Debian, Ubuntu Server, AlmaLinux, RHEL). Bagi siswa SIJA, CLI adalah sahabat utama.',
    sections: [
      {
        title: '1. Perintah Dasar Harian',
        content: `- \`pwd\` : Mengetahui direktori aktif saat ini.
- \`ls -la\` : Melihat semua berkas termasuk yang tersembunyi (dotfiles) beserta izin dan ukurannya.
- \`grep "error" /var/log/syslog\` : Mencari kata kunci tertentu di dalam berkas log.
- \`tail -f /var/log/nginx/access.log\` : Memantau catatan log lalu lintas web server secara real-time.`
      },
      {
        title: '2. Memahami Matriks Chmod Permission',
        content: `Hak akses dibagi 3 entitas: User (u), Group (g), Others (o).
Nilai numerik bobot:
- **Read (r)** = 4
- **Write (w)** = 2
- **Execute (x)** = 1
Jumlah total = 7 (rwx).
Contoh: \`chmod 755 script.sh\` artinya:
- User = 7 (4+2+1 = rwx)
- Group = 5 (4+0+1 = r-x)
- Others = 5 (4+0+1 = r-x)`
      }
    ],
    practicalApplication: 'Menyetel hak akses berkas konfigurasi sensitif database /var/www/html/config.php ke 640 agar tidak bisa dibaca oleh pengguna non-authorized di server bersama.',
    summary: 'Kuasai shortcut terminal seperti Ctrl+C (stop), Ctrl+R (search history), Tab completion, dan pengalihan output (pipe "|" dan redirect ">").',
    relatedIds: ['mat-linux-ssh', 'mat-network-services']
  },
  {
    id: 'mat-linux-ssh',
    title: 'SSH Remote Server & Keamanan Public Key Authentication',
    category: 'linux',
    categoryLabel: 'Linux Administration',
    difficulty: 'Menengah',
    duration: '25 Menit',
    xp: 50,
    tags: ['SSH', 'OpenSSH', 'Security', 'Keys', 'Port 22'],
    summaryShort: 'Kelola server Linux jarak jauh secara aman dengan SSH, matikan login password, dan buat pasangan kunci RSA/Ed25519.',
    objectives: [
      'Memahami protokol Secure Shell (SSH) enkripsi simetris & asimetris.',
      'Membuat key pair menggunakan ssh-keygen.',
      'Menyalin public key ke server tujuan dengan ssh-copy-id.',
      'Mengonfigurasi pengerasan /etc/ssh/sshd_config (disable root login).'
    ],
    introduction: 'Sebelum era SSH, remote server menggunakan Telnet yang mentransmisikan password dalam bentuk teks polos (plain text) yang rentan disadap. SSH mengenkripsi seluruh sesi komunikasi end-to-end.',
    sections: [
      {
        title: '1. Membuat Pasangan Kunci SSH (Ed25519)',
        content: `Kunci Ed25519 lebih aman dan cepat dibanding RSA lama:
\`\`\`bash
ssh-keygen -t ed25519 -C "siswa@sijalab.id"
\`\`\`
Perintah ini menghasilkan dua berkas di \`~/.ssh/\`:
- \`id_ed25519\` : Kunci RAHASIA (Private Key), jangan pernah bagikan ke siapapun!
- \`id_ed25519.pub\` : Kunci PUBLIK, dapat disalin bebas ke server tujuan.`
      },
      {
        title: '2. Pengerasan Keamanan (Server Hardening)',
        content: `Edit konfigurasi \`/etc/ssh/sshd_config\`:
\`\`\`text
Port 2222                    # Mengganti port default 22 untuk cegah bot scan
PermitRootLogin no           # Melarang login langsung sebagai root
PasswordAuthentication no    # Hanya mengizinkan login via SSH Key
\`\`\`
Restart layanan SSH: \`sudo systemctl restart sshd\``
      }
    ],
    practicalApplication: 'Mengontrol server cloud VPS SIJA yang berlokasi di data center Singapura dari laptop di ruang kelas tanpa khawatir kata sandi di-sniff di jaringan WiFi publik sekolah.',
    summary: 'SSH key authentication jauh lebih tangguh menghadapi serangan brute-force dibanding password teks konvensional.',
    relatedIds: ['mat-linux-commands', 'mat-network-services']
  },
  {
    id: 'mat-network-services',
    title: 'Network Services: DNS Bind9 & Keystone DHCP Server',
    category: 'services',
    categoryLabel: 'Network Services',
    difficulty: 'Menengah',
    duration: '35 Menit',
    xp: 60,
    tags: ['DNS', 'DHCP', 'Bind9', 'ISC-DHCP', 'FQDN'],
    summaryShort: 'Konfigurasi server penerjemah nama domain (DNS) dan layanan alokasi IP otomatis (DHCP DORA) di lingkungan server produksi.',
    objectives: [
      'Memahami siklus 4 langkah DHCP (Discover, Offer, Request, Acknowledge).',
      'Membuat Forward dan Reverse Zone pada DNS Server Bind9.',
      'Memahami tipe-tipe DNS Record (A, AAAA, CNAME, MX, PTR, NS, SOA).',
      'Troubleshooting query DNS menggunakan dig dan nslookup.'
    ],
    introduction: 'Manusia mudah mengingat nama seperti "sijalab.sch.id", sedangkan perangkat jaringan berkomunikasi menggunakan alamat IP numerik. DNS adalah buku telepon internet yang menjembatani keduanya.',
    sections: [
      {
        title: '1. Anatomi Proses DORA pada DHCP',
        content: `Saat PC dicolok kabel LAN:
1. **Discover**: Klien mengirim broadcast mencari siapa DHCP server yang aktif.
2. **Offer**: Server membalas tawaran IP (contoh 192.168.10.15) beserta subnet mask.
3. **Request**: Klien mengajukan permohonan resmi untuk meminjam IP tersebut.
4. **Acknowledge**: Server mengonfirmasi dan memberikan informasi Gateway & DNS Server.`
      },
      {
        title: '2. Konfigurasi Zone File Bind9',
        content: `Contoh record \`db.sijalab.local\`:
\`\`\`text
@   IN  SOA ns1.sijalab.local. admin.sijalab.local. ( 2026110501 3600 1800 604800 86400 )
@   IN  NS  ns1.sijalab.local.
ns1 IN  A   192.168.10.2
web IN  A   192.168.10.10
ftp IN  CNAME web
\`\`\``
      }
    ],
    practicalApplication: 'Membangun domain intranet sekolah di server lokal Debian sehingga siswa dapat membuka portal ujian tanpa bergantung pada koneksi internet eksternal.',
    summary: 'DNS dan DHCP adalah dua pilar terpenting dalam infrastruktur jaringan lokal (LAN).',
    relatedIds: ['mat-osi-tcpip', 'mat-linux-commands']
  },
  {
    id: 'mat-esp32-intro',
    title: 'Pengenalan Mikrokontroler ESP32: Pinout & Fitur SIoT',
    category: 'iot',
    categoryLabel: 'Internet of Things (IoT)',
    difficulty: 'Dasar',
    duration: '30 Menit',
    xp: 55,
    tags: ['ESP32', 'IoT', 'Mikrokontroler', 'GPIO', 'WiFi'],
    summaryShort: 'Bedah arsitektur chip SoC ESP32 dual-core Xtensa, pemetaan pin GPIO, ADC, PWM, I2C, serta kemampuan WiFi dan Bluetooth bawaan.',
    objectives: [
      'Menjelaskan keunggulan ESP32 dibanding Arduino Uno tradisional.',
      'Memahami batas tegangan logika (3.3V vs 5V) dan bahaya overvoltage.',
      'Mengidentifikasi pin aman (Safe GPIOs) untuk sensor vs pin bootstrapping.',
      'Memprogram ESP32 menggunakan framework Arduino IDE atau MicroPython.'
    ],
    introduction: 'ESP32 buatan Espressif Systems adalah standar industri untuk pembelajaran SIoT di SMK SIJA. Chip berbiaya terjangkau ini mengemas prosesor 32-bit dual-core, modul radio WiFi 802.11 b/g/n, dan Bluetooth 4.2 BLE.',
    diagram: {
      type: 'esp32_pinout',
      title: 'Diagram Pinout Utama ESP32 DOIT 30-Pin V1',
      pins: [
        { pin: 'EN', desc: 'Enable / Reset chip' },
        { pin: 'VP / VN (GPIO 36, 39)', desc: 'ADC Input Only, tanpa internal pull-up/down' },
        { pin: 'GPIO 34, 35', desc: 'Input Only, ideal untuk sensor analog' },
        { pin: 'GPIO 32, 33', desc: 'ADC1, Touch Sensor, Aman digunakan' },
        { pin: 'GPIO 25, 26', desc: 'DAC Output (Digital to Analog 8-bit)' },
        { pin: 'GPIO 21 (SDA), 22 (SCL)', desc: 'Default pin komunikasi I2C bus' },
        { pin: 'GPIO 2', desc: 'Terhubung ke Onboard Blue LED (Boot strap)' },
        { pin: 'VIN (5V) & 3V3', desc: 'Power supply pin (Regulator AMS1117)' }
      ]
    },
    sections: [
      {
        title: '1. Aturan Emas Tegangan Logika 3.3V',
        content: `Hati-hati! Pin GPIO ESP32 bekerja pada level logika 3.3V dan **TIDAK toleran terhadap tegangan 5V**. Jika kamu menghubungkan sensor bertegangan keluaran 5V langsung ke pin GPIO ESP32 tanpa Logic Level Converter atau pembagi tegangan (voltage divider), chip ESP32 bisa rusak terbakar.`
      },
      {
        title: '2. Pin Bootstrapping yang Perlu Dihindari Saat Booting',
        content: `Beberapa pin menentukan status saat ESP32 pertama kali dinyalakan:
- **GPIO 0**: Harus berlogika HIGH saat running normal. Jika ditarik ke LOW saat booting, ESP32 masuk ke flashing mode.
- **GPIO 12**: Mempengaruhi tegangan flash internal (MTDI).
- **GPIO 1 & 3**: Terhubung ke chip USB-to-Serial UART (TX & RX), jangan gunakan untuk relay atau sensor saat debugging serial.`
      }
    ],
    practicalApplication: 'Membuat stasiun cuaca pintar pemantau suhu ruangan server SIJA yang mengirimkan data suhu setiap 5 detik ke dashboard cloud via protokol MQTT.',
    summary: 'ESP32 adalah mikrokontroler berkemampuan tinggi dengan konektivitas nirkabel terintegrasi. Selalu gunakan pin GPIO 4, 16, 17, 18, 19, 21, 22, 23 untuk komponen I/O standar.',
    relatedIds: ['mat-sensors-actuators', 'mat-web-database']
  },
  {
    id: 'mat-sensors-actuators',
    title: 'Sensor & Aktuator: DHT22, PIR, Ultrasonik & Modul Relay',
    category: 'electronics',
    categoryLabel: 'Elektronika & Mikrokontroler',
    difficulty: 'Dasar',
    duration: '35 Menit',
    xp: 60,
    tags: ['Sensor', 'Aktuator', 'Relay', 'DHT22', 'HC-SR04'],
    summaryShort: 'Pelajari prinsip kerja pengubahan besaran fisik menjadi sinyal listrik pada sensor dan penggerak aktuator mekanis.',
    objectives: [
      'Menjelaskan perbedaan sinyal Analog vs sinyal Digital.',
      'Memahami cara kerja sensor suhu/kelembaban DHT22 (single-bus protocol).',
      'Menghitung jarak objek menggunakan pantulan gelombang suara HC-SR04.',
      'Mengoperasikan modul relay optocoupler untuk mengontrol beban AC 220V.'
    ],
    introduction: 'Dalam sistem otomasi SIJA, Sensor berperan sebagai mata dan telinga (mengumpulkan data fisik), mikrokontroler sebagai otak pemikir, dan Aktuator sebagai otot penggerak (mengeksekusi aksi fisik).',
    sections: [
      {
        title: '1. DHT22 vs DHT11',
        content: `DHT22 (AM2302) memiliki akurasi dan rentang ukur jauh lebih tinggi dibanding DHT11:
- Rentang Suhu DHT22: -40°C hingga +80°C (akurasi ±0.5°C).
- Rentang Kelembaban DHT22: 0 - 100% RH (akurasi ±2-5%).
Sensor ini membutuhkan resistor pull-up 4.7kΩ - 10kΩ antara pin VCC dan Data agar sinyal komunikasi stabil.`
      },
      {
        title: '2. Prinsip Kerja Modul Relay Berisolasi Optocoupler',
        content: `Relay adalah saklar mekanis yang digerakkan oleh kumparan elektromagnetik.
Modul relay SIJA dilengkapi Optocoupler (chip isolator cahaya) untuk memisahkan secara total sirkuit mikrokontroler 3.3V/5V berdaya rendah dari sirkuit beban AC 220V yang berpotensi memicu lonjakan tegangan balik (back EMF).`
      }
    ],
    practicalApplication: 'Sistem pengaman pintu laboratorium otomatis: Sensor PIR mendeteksi kehadiran orang, kartu RFID memvalidasi identitas, dan Modul Relay membuka Solenoid Door Lock.',
    summary: 'Sensor mendeteksi perubahan lingkungan, sedangkan aktuator menghasilkan perubahan fisik di lingkungan nyata.',
    relatedIds: ['mat-esp32-intro']
  },
  {
    id: 'mat-web-database',
    title: 'Web Server & Relational Database: Nginx & MySQL di SIJA',
    category: 'programming',
    categoryLabel: 'Web & Database',
    difficulty: 'Menengah',
    duration: '35 Menit',
    xp: 60,
    tags: ['Nginx', 'MySQL', 'PHP', 'Database', 'LEMP'],
    summaryShort: 'Deploy tumpukan server LEMP (Linux, Nginx, MySQL, PHP) untuk aplikasi berbasis web SIJA dengan performa tinggi.',
    objectives: [
      'Membedakan arsitektur event-driven Nginx vs process-driven Apache.',
      'Mengonfigurasi Server Block (Virtual Host) Nginx untuk domain lokal.',
      'Membuat skema database relasional MySQL, user, dan hak akses GRANT.',
      'Menghubungkan sensor IoT ESP32 ke API backend database.'
    ],
    introduction: 'Aplikasi SIJA (Sistem Informasi, Jaringan, dan Aplikasi) mencakup pembuatan aplikasi web yang tangguh. Server Nginx terkenal dengan efisiensi penggunaan memori dan kemampuan menangani ribuan koneksi konkuren.',
    sections: [
      {
        title: '1. Mengapa Nginx Sangat Cepat?',
        content: `Nginx menggunakan model arsitektur asinkron event-driven non-blocking. Berbeda dengan Apache tradisional yang menciptakan satu proses/thread baru untuk setiap permintaan pengunjung, Nginx hanya menggunakan sedikit worker process untuk melayani ribuan request secara simultan.`
      },
      {
        title: '2. Pengamanan Database MySQL',
        content: `Langkah wajib setelah instalasi:
\`\`\`bash
sudo mysql_secure_installation
\`\`\`
Membuat user khusus dan database untuk aplikasi:
\`\`\`sql
CREATE DATABASE db_sijalab;
CREATE USER 'sijauser'@'localhost' IDENTIFIED BY 'PasswordKuat!2026';
GRANT ALL PRIVILEGES ON db_sijalab.* TO 'sijauser'@'localhost';
FLUSH PRIVILEGES;
\`\`\``
      }
    ],
    practicalApplication: 'Membangun sistem logging absensi sidik jari siswa SIJA di mana data dikirim mikrokontroler via HTTP POST ke script PHP lalu disimpan ke MySQL.',
    summary: 'Kombinasi Nginx, PHP-FPM, dan MySQL/MariaDB menghasilkan performa tinggi untuk sistem web sekolah.',
    relatedIds: ['mat-linux-commands', 'mat-esp32-intro']
  },
  {
    id: 'mat-stp-rstp',
    title: 'Spanning Tree Protocol (STP & Rapid STP IEEE 802.1w)',
    category: 'cisco',
    categoryLabel: 'Cisco Networking',
    difficulty: 'Lanjutan',
    duration: '30 Menit',
    xp: 65,
    tags: ['STP', 'RSTP', 'Loop Prevention', 'Switching', 'BPDU'],
    summaryShort: 'Cegah malapetaka Broadcast Storm pada topologi switch redundant dengan mekanisme pemilihan Root Bridge dan pemblokiran port.',
    objectives: [
      'Memahami bahaya physical loop pada jaringan switch (Broadcast Storm & MAC Instability).',
      'Mempelajari proses pemilihan Root Bridge berdasarkan Bridge ID terkecil.',
      'Membedakan status port STP (Blocking, Listening, Learning, Forwarding).',
      'Keunggulan konvergensi sub-detik Rapid STP (RSTP 802.1w).'
    ],
    introduction: 'Redundansi kabel switch sangat diperlukan agar jaringan tidak putus saat satu kabel rusak. Namun redundansi tanpa STP akan menyebabkan broadcast storm yang melumpuhkan switch dalam sekejap.',
    sections: [
      {
        title: '1. Pemilihan Root Bridge',
        content: `Switch dengan Bridge ID (Priority + MAC Address) terendah terpilih menjadi Root Bridge.
Semua port pada Root Bridge berstatus **Designated Port (Forwarding)**. Port switch lain yang memiliki jalur tercepat ke root bridge menjadi **Root Port (Forwarding)**, dan port redundant yang tersisa akan dijadikan **Alternate/Blocked Port** untuk memutus lingkaran (loop).`
      }
    ],
    practicalApplication: 'Mengaktifkan `spanning-tree mode rapid-pvst` dan `spanning-tree portfast` pada port yang mengarah ke PC siswa di switch Cisco lab.',
    summary: 'STP menjaga topologi tetap bebas loop secara logis sambil mempertahankan jalur fisik cadangan siap pakai.',
    relatedIds: ['mat-vlan-trunking', 'mat-cisco-routing']
  }
];

