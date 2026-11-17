import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Laptop,
  Cpu,
  ChevronRight,
  Award,
  Server,
  FileCode,
  Network,
  ShieldCheck,
  Mail,
  Globe,
  Radio,
  BookOpen,
  Copy,
  Check,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

// Comprehensive Modular Lab Presets
const MODULES = [
  {
    id: 'dhcp',
    name: 'DHCP Server',
    tag: 'isc-dhcp-server',
    icon: Network,
    color: 'from-blue-600 to-cyan-600',
    port: 'UDP 67/68',
    desc: 'Layanan alokasi IP dinamis otomatis untuk client lab komputer SIJA.',
    prompt: 'root@sijalab-srv:/etc/dhcp# ',
    missions: [
      { id: 'dhcp1', title: 'Periksa file konfigurasi dhcpd.conf', cmd: 'cat /etc/dhcp/dhcpd.conf', xp: 25 },
      { id: 'dhcp2', title: 'Validasi sintaks konfigurasi dhcpd', cmd: 'dhcpd -t -cf /etc/dhcp/dhcpd.conf', xp: 35 },
      { id: 'dhcp3', title: 'Mulai ulang layanan isc-dhcp-server', cmd: 'systemctl restart isc-dhcp-server', xp: 30 },
      { id: 'dhcp4', title: 'Pantau sewa IP klien (lease table)', cmd: 'cat /var/lib/dhcp/dhcpd.leases', xp: 30 }
    ],
    quickCommands: [
      'cat /etc/dhcp/dhcpd.conf',
      'dhcpd -t -cf /etc/dhcp/dhcpd.conf',
      'systemctl status isc-dhcp-server',
      'systemctl restart isc-dhcp-server',
      'cat /var/lib/dhcp/dhcpd.leases'
    ]
  },
  {
    id: 'dns',
    name: 'DNS Server',
    tag: 'bind9',
    icon: Globe,
    color: 'from-indigo-600 to-purple-600',
    port: 'UDP/TCP 53',
    desc: 'Translasi domain FQDN sijalab.sch.id menuju IP server sekolah.',
    prompt: 'root@sijalab-srv:/etc/bind# ',
    missions: [
      { id: 'dns1', title: 'Buka definisi zona named.conf.local', cmd: 'cat /etc/bind/named.conf.local', xp: 25 },
      { id: 'dns2', title: 'Verifikasi integritas file zona forward', cmd: 'named-checkzone sijalab.sch.id /etc/bind/db.sijalab.sch.id', xp: 40 },
      { id: 'dns3', title: 'Cek status daemon bind9', cmd: 'systemctl status bind9', xp: 25 },
      { id: 'dns4', title: 'Uji resolusi record A menggunakan dig', cmd: 'dig @localhost sijalab.sch.id', xp: 35 }
    ],
    quickCommands: [
      'cat /etc/bind/named.conf.local',
      'cat /etc/bind/db.sijalab.sch.id',
      'named-checkzone sijalab.sch.id /etc/bind/db.sijalab.sch.id',
      'systemctl status bind9',
      'dig @localhost sijalab.sch.id',
      'nslookup mail.sijalab.sch.id'
    ]
  },
  {
    id: 'web',
    name: 'Web Server',
    tag: 'nginx',
    icon: Server,
    color: 'from-emerald-600 to-teal-600',
    port: 'TCP 80, 443',
    desc: 'Web server performa tinggi untuk Portal CBT dan LMS SIJA.',
    prompt: 'siswa@sijalab-srv:~$ ',
    missions: [
      { id: 'web1', title: 'Inspeksi virtual host default Nginx', cmd: 'cat /etc/nginx/sites-available/default', xp: 25 },
      { id: 'web2', title: 'Uji keabsahan konfigurasi Nginx (syntax test)', cmd: 'nginx -t', xp: 35 },
      { id: 'web3', title: 'Cek header HTTP dengan curl -I', cmd: 'curl -I http://localhost', xp: 30 },
      { id: 'web4', title: 'Lihat 5 baris terakhir berkas access.log', cmd: 'tail -n 5 /var/log/nginx/access.log', xp: 30 }
    ],
    quickCommands: [
      'cat /etc/nginx/sites-available/default',
      'nginx -t',
      'systemctl status nginx',
      'curl -I http://localhost',
      'tail -n 5 /var/log/nginx/access.log',
      'cat /var/www/html/index.html'
    ]
  },
  {
    id: 'mail',
    name: 'Mail Server',
    tag: 'postfix & dovecot',
    icon: Mail,
    color: 'from-rose-600 to-amber-600',
    port: 'TCP 25, 587, 993',
    desc: 'Layanan email SMTP/IMAP antar civitas akademika SMK SIJA.',
    prompt: 'root@sijalab-srv:/etc/postfix# ',
    missions: [
      { id: 'mail1', title: 'Periksa parameter aktif Postfix', cmd: 'postconf -n', xp: 25 },
      { id: 'mail2', title: 'Kirim surat uji coba via mail command', cmd: 'mail -s "Test SIJA" siswa@sijalab.sch.id', xp: 40 },
      { id: 'mail3', title: 'Periksa antrean email keluar (queue)', cmd: 'mailq', xp: 25 },
      { id: 'mail4', title: 'Audit catatan pengiriman di mail.log', cmd: 'tail -n 10 /var/log/mail.log', xp: 30 }
    ],
    quickCommands: [
      'postconf -n',
      'cat /etc/postfix/main.cf',
      'systemctl status postfix',
      'mail -s "Test SIJA" siswa@sijalab.sch.id',
      'mailq',
      'tail -n 10 /var/log/mail.log'
    ]
  },
  {
    id: 'security',
    name: 'Keamanan & Jaringan',
    tag: 'ufw & net-tools',
    icon: ShieldCheck,
    color: 'from-cyan-600 to-blue-700',
    port: 'Firewall & Socket',
    desc: 'Manajemen port firewall UFW, perizinan chmod, dan monitoring socket listening.',
    prompt: 'root@sijalab-srv:~# ',
    missions: [
      { id: 'sec1', title: 'Inspeksi port listening terbuka di server', cmd: 'ss -tulpn', xp: 30 },
      { id: 'sec2', title: 'Lihat status rule firewall UFW', cmd: 'ufw status numbered', xp: 25 },
      { id: 'sec3', title: 'Buka izin port HTTP (80/tcp) di firewall', cmd: 'ufw allow 80/tcp', xp: 35 },
      { id: 'sec4', title: 'Periksa alokasi interface dan IP Linux', cmd: 'ip a', xp: 25 }
    ],
    quickCommands: [
      'ss -tulpn',
      'ufw status numbered',
      'ufw allow 80/tcp',
      'ufw status',
      'ip a',
      'ls -la /var/www/html'
    ]
  },
  {
    id: 'cisco',
    name: 'Cisco IOS Switch',
    tag: 'Catalyst 2960',
    icon: Cpu,
    color: 'from-teal-600 to-indigo-700',
    port: 'Console CLI',
    desc: 'Praktik langsung Cisco IOS: mode EXEC, VLAN database, dan hostname.',
    prompt: 'Switch> ',
    missions: [
      { id: 'cis1', title: 'Masuk Privileged EXEC mode', cmd: 'enable', xp: 20 },
      { id: 'cis2', title: 'Masuk Global Configuration mode', cmd: 'configure terminal', xp: 20 },
      { id: 'cis3', title: 'Ganti hostname switch menjadi SW-LAB-SIJA', cmd: 'hostname SW-LAB-SIJA', xp: 30 },
      { id: 'cis4', title: 'Buat VLAN 10 dan verifikasi tabel VLAN', cmd: 'show vlan brief', xp: 40 }
    ],
    quickCommands: [
      'enable',
      'configure terminal',
      'hostname SW-LAB-SIJA',
      'vlan 10',
      'name SISWA_SIJA',
      'show vlan brief',
      'show ip interface brief'
    ]
  }
];

export const CliTerminalSimulator = () => {
  const { addXP, showToast } = useApp();

  const [activeModuleId, setActiveModuleId] = useState('dhcp');
  const [inputCommand, setInputCommand] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [completedMissions, setCompletedMissions] = useState(new Set());
  const [copiedCmd, setCopiedCmd] = useState(null);

  // Cisco State
  const [ciscoMode, setCiscoMode] = useState('user'); // user, priv, config, vlan
  const [ciscoHostname, setCiscoHostname] = useState('Switch');
  const [ciscoVlans, setCiscoVlans] = useState([
    { id: '1', name: 'default', status: 'active', ports: 'Fa0/1-24, Gi0/1-2' }
  ]);

  // Firewall State
  const [ufwRules, setUfwRules] = useState([
    { id: 1, to: '22/tcp', action: 'ALLOW IN', from: 'Anywhere' },
    { id: 2, to: '53', action: 'ALLOW IN', from: 'Anywhere' }
  ]);

  const currentModule = MODULES.find((m) => m.id === activeModuleId) || MODULES[0];
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Reset or initialize terminal on module switch
  useEffect(() => {
    setHistory([
      { type: 'system', text: `========================================================` },
      { type: 'system', text: `🖥️  SIJALAB Interactive Server Sandbox — Modul: ${currentModule.name}` },
      { type: 'system', text: `Paket: [ ${currentModule.tag} ] • Port: [ ${currentModule.port} ]` },
      { type: 'system', text: `Ketik "help" untuk melihat panduan atau pilih misi praktikum di panel kanan.` },
      { type: 'system', text: `========================================================` }
    ]);
  }, [activeModuleId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const triggerMissionDone = (missionId) => {
    if (!completedMissions.has(missionId)) {
      setCompletedMissions((prev) => new Set([...prev, missionId]));
      const allMissions = MODULES.flatMap((m) => m.missions);
      const mission = allMissions.find((m) => m.id === missionId);
      if (mission) {
        addXP(mission.xp);
        if (showToast) {
          showToast(`Misi Selesai: ${mission.title} (+${mission.xp} XP)`, 'success');
        }
      }
    }
  };

  const getDynamicPrompt = () => {
    if (activeModuleId === 'cisco') {
      if (ciscoMode === 'user') return `${ciscoHostname}> `;
      if (ciscoMode === 'priv') return `${ciscoHostname}# `;
      if (ciscoMode === 'config') return `${ciscoHostname}(config)# `;
      if (ciscoMode === 'vlan') return `${ciscoHostname}(config-vlan)# `;
      return `${ciscoHostname}> `;
    }
    return currentModule.prompt;
  };

  const executeCommand = (cmdText) => {
    const rawCmd = (cmdText || inputCommand).trim();
    if (!rawCmd) return;

    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);
    setInputCommand('');

    const prompt = getDynamicPrompt();
    const newEntries = [{ type: 'input', prompt, text: rawCmd }];
    const lower = rawCmd.toLowerCase();

    // Universal clear
    if (lower === 'clear') {
      setHistory([]);
      return;
    }

    // --- CISCO MODULE DISPATCH ---
    if (activeModuleId === 'cisco') {
      handleCiscoCommand(rawCmd, lower, newEntries);
      setHistory((prev) => [...prev, ...newEntries]);
      return;
    }

    // --- UNIVERSAL LINUX COMMANDS ---
    if (lower === 'help') {
      newEntries.push({
        type: 'output',
        text: `Perintah umum Linux yang didukung pada modul ${currentModule.name}:
• cat <berkas>               : Membaca isi berkas konfigurasi
• systemctl status <service> : Memeriksa status service
• systemctl restart <service>: Memulai ulang service
• tail -n <jumlah> <berkas>  : Membaca log terakhir
• ip a                       : Cek alokasi IP & interface jaringan
• ss -tulpn                  : Menampilkan port yang sedang listen
• clear                      : Membersihkan konsol terminal`
      });
    } else if (lower === 'pwd') {
      newEntries.push({ type: 'output', text: currentModule.prompt.split(':')[1]?.replace('# ', '').replace('$ ', '') || '/root' });
    } else if (lower === 'whoami') {
      newEntries.push({ type: 'output', text: currentModule.prompt.startsWith('root') ? 'root' : 'siswa' });
    } else if (lower === 'uname -a') {
      newEntries.push({ type: 'output', text: 'Linux sijalab-srv 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' });
    } else if (lower === 'ip a' || lower === 'ip addr' || lower === 'ifconfig') {
      newEntries.push({
        type: 'output',
        text: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default
    inet 127.0.0.1/8 scope host lo
2: ens18: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default
    inet 192.168.10.1/24 brd 192.168.10.255 scope global ens18
    inet6 fe80::5054:ff:fe88:99aa/64 scope link
3: ens19: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default
    inet 10.0.2.15/24 brd 10.0.2.255 scope global dynamic ens19`
      });
      triggerMissionDone('sec4');
    }

    // --- DHCP SERVER COMMANDS ---
    else if (activeModuleId === 'dhcp') {
      if (lower.includes('cat /etc/dhcp/dhcpd.conf') || lower === 'cat dhcpd.conf') {
        newEntries.push({
          type: 'output',
          text: `# /etc/dhcp/dhcpd.conf — SIJALAB Lab DHCP Server
default-lease-time 7200;
max-lease-time 86400;
authoritative;

subnet 192.168.10.0 netmask 255.255.255.0 {
    range 192.168.10.50 192.168.10.150;
    option routers 192.168.10.1;
    option subnet-mask 255.255.255.0;
    option domain-name-servers 192.168.10.1, 1.1.1.1;
    option domain-name "sijalab.sch.id";
}`
        });
        triggerMissionDone('dhcp1');
      } else if (lower.includes('dhcpd -t') || lower.includes('dhcpd -t -cf')) {
        newEntries.push({
          type: 'success',
          text: `Internet Systems Consortium DHCP Server 4.4.3-P1
Copyright 2004-2022 Internet Systems Consortium.
All rights reserved.
Source compiled to use binary-leases
Configuration file: /etc/dhcp/dhcpd.conf
Database file: /var/lib/dhcp/dhcpd.leases
[ OK ] Configuration syntax test passed without any errors.`
        });
        triggerMissionDone('dhcp2');
      } else if (lower.includes('systemctl restart isc-dhcp-server')) {
        newEntries.push({
          type: 'output',
          text: `Stopping ISC DHCP server daemon: dhcpd. [ OK ]\nStarting ISC DHCP server daemon: dhcpd. [ OK ]`
        });
        triggerMissionDone('dhcp3');
      } else if (lower.includes('systemctl status isc-dhcp-server')) {
        newEntries.push({
          type: 'output',
          text: `● isc-dhcp-server.service - LSB: DHCP server
   Loaded: loaded (/etc/init.d/isc-dhcp-server; generated)
   Active: active (running) since Wed 2026-11-05 08:00:10 WIB
     Docs: man:systemd-sysv-generator(8)
  Process: 1420 ExecStart=/etc/init.d/isc-dhcp-server start (code=exited, status=0/SUCCESS)
    Tasks: 1 (limit: 4915)
   Memory: 4.8M
   CGroup: /system.slice/isc-dhcp-server.service
           └─1425 /usr/sbin/dhcpd -4 -q -cf /etc/dhcp/dhcpd.conf ens18`
        });
      } else if (lower.includes('cat /var/lib/dhcp/dhcpd.leases') || lower.includes('dhcp-lease-list')) {
        newEntries.push({
          type: 'output',
          text: `# The format of this file is documented in the dhcpd.leases(5) manual page.
lease 192.168.10.51 {
  starts 3 2026/11/05 07:15:20;
  ends 3 2026/11/05 09:15:20;
  binding state active;
  next binding state free;
  hardware ethernet 52:54:00:12:34:56;
  client-hostname "PC-01-LAB-SIJA";
}
lease 192.168.10.52 {
  starts 3 2026/11/05 07:22:45;
  ends 3 2026/11/05 09:22:45;
  binding state active;
  hardware ethernet b8:27:eb:c4:89:10;
  client-hostname "ESP32-NODE-LAB";
}`
        });
        triggerMissionDone('dhcp4');
      } else {
        newEntries.push({
          type: 'error',
          text: `Perintah "${rawCmd}" tidak dikenali pada modul DHCP. Coba ketik "cat /etc/dhcp/dhcpd.conf" atau "systemctl restart isc-dhcp-server".`
        });
      }
    }

    // --- DNS SERVER COMMANDS ---
    else if (activeModuleId === 'dns') {
      if (lower.includes('cat /etc/bind/named.conf.local') || lower === 'cat named.conf.local') {
        newEntries.push({
          type: 'output',
          text: `// /etc/bind/named.conf.local — SIJALAB Local Forward & Reverse Zones
zone "sijalab.sch.id" {
    type master;
    file "/etc/bind/db.sijalab.sch.id";
};

zone "10.168.192.in-addr.arpa" {
    type master;
    file "/etc/bind/db.192";
};`
        });
        triggerMissionDone('dns1');
      } else if (lower.includes('cat /etc/bind/db.sijalab.sch.id')) {
        newEntries.push({
          type: 'output',
          text: `; Zone file forward domain sijalab.sch.id
$TTL    604800
@       IN      SOA     ns1.sijalab.sch.id. admin.sijalab.sch.id. (
                              2026110501 ; Serial
                                  604800 ; Refresh
                                   86400 ; Retry
                                 2419200 ; Expire
                                  604800 ) ; Negative Cache TTL
; Name Servers
@       IN      NS      ns1.sijalab.sch.id.
ns1     IN      A       192.168.10.1

; Host Records
@       IN      A       192.168.10.1
www     IN      CNAME   @
mail    IN      A       192.168.10.1
cbt     IN      A       192.168.10.100
@       IN      MX  10  mail.sijalab.sch.id.`
        });
      } else if (lower.includes('named-checkzone sijalab.sch.id')) {
        newEntries.push({
          type: 'success',
          text: `zone sijalab.sch.id/IN: loaded serial 2026110501\nOK`
        });
        triggerMissionDone('dns2');
      } else if (lower.includes('systemctl status bind9') || lower.includes('systemctl status named')) {
        newEntries.push({
          type: 'output',
          text: `● named.service - BIND Domain Name Server
   Loaded: loaded (/lib/systemd/system/named.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2026-11-05 08:12:40 WIB
     Docs: man:named(8)
  Main PID: 890 (named)
    Memory: 18.2M
    CGroup: /system.slice/named.service
            └─890 /usr/sbin/named -f -u bind`
        });
        triggerMissionDone('dns3');
      } else if (lower.includes('dig') && lower.includes('sijalab.sch.id')) {
        newEntries.push({
          type: 'output',
          text: `; <<>> DiG 9.18.28-0ubuntu0.24.04.1-Ubuntu <<>> @localhost sijalab.sch.id
; (1 server found)
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 48219
;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 1, ADDITIONAL: 2

;; QUESTION SECTION:
;sijalab.sch.id.			IN	A

;; ANSWER SECTION:
sijalab.sch.id.		604800	IN	A	192.168.10.1

;; AUTHORITY SECTION:
sijalab.sch.id.		604800	IN	NS	ns1.sijalab.sch.id.

;; ADDITIONAL SECTION:
ns1.sijalab.sch.id.	604800	IN	A	192.168.10.1

;; Query time: 0 msec
;; SERVER: 127.0.0.1#53(localhost) (UDP)
;; WHEN: Wed Nov 05 09:14:10 WIB 2026
;; MSG SIZE  rcvd: 99`
        });
        triggerMissionDone('dns4');
      } else if (lower.includes('nslookup')) {
        newEntries.push({
          type: 'output',
          text: `Server:		127.0.0.1\nAddress:	127.0.0.1#53\n\nName:	mail.sijalab.sch.id\nAddress: 192.168.10.1`
        });
      } else {
        newEntries.push({
          type: 'error',
          text: `Perintah "${rawCmd}" tidak valid untuk modul DNS. Coba "dig @localhost sijalab.sch.id" atau "named-checkzone sijalab.sch.id /etc/bind/db.sijalab.sch.id".`
        });
      }
    }

    // --- WEB SERVER (NGINX) COMMANDS ---
    else if (activeModuleId === 'web') {
      if (lower.includes('cat /etc/nginx/sites-available/default')) {
        newEntries.push({
          type: 'output',
          text: `server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;

    server_name sijalab.sch.id www.sijalab.sch.id;

    location / {
        try_files $uri $uri/ =404;
    }

    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`
        });
        triggerMissionDone('web1');
      } else if (lower === 'nginx -t') {
        newEntries.push({
          type: 'success',
          text: `nginx: the configuration file /etc/nginx/nginx.conf syntax is ok\nnginx: configuration file /etc/nginx/nginx.conf test is successful`
        });
        triggerMissionDone('web2');
      } else if (lower.includes('curl -i http://localhost') || lower.includes('curl -i http://127.0.0.1')) {
        newEntries.push({
          type: 'output',
          text: `HTTP/1.1 200 OK
Server: nginx/1.24.0 (Ubuntu)
Date: Wed, 05 Nov 2026 09:20:00 GMT
Content-Type: text/html
Content-Length: 612
Last-Modified: Wed, 05 Nov 2026 08:15:00 GMT
Connection: keep-alive
ETag: "65478-264"
Accept-Ranges: bytes`
        });
        triggerMissionDone('web3');
      } else if (lower.includes('tail') && lower.includes('access.log')) {
        newEntries.push({
          type: 'output',
          text: `192.168.10.51 - - [05/Nov/2026:09:18:22 +0700] "GET / HTTP/1.1" 200 612 "-" "Mozilla/5.0 Chrome/120.0"
192.168.10.51 - - [05/Nov/2026:09:18:23 +0700] "GET /favicon.ico HTTP/1.1" 404 162 "-" "Mozilla/5.0"
192.168.10.52 - - [05/Nov/2026:09:19:01 +0700] "POST /api/telemetry HTTP/1.1" 200 45 "-" "ESP32-HTTP-Client"
192.168.10.15 - - [05/Nov/2026:09:19:44 +0700] "GET /cbt/login HTTP/1.1" 200 1420 "-" "Firefox/118.0"
127.0.0.1 - - [05/Nov/2026:09:20:00 +0700] "HEAD / HTTP/1.1" 200 0 "-" "curl/7.88.1"`
        });
        triggerMissionDone('web4');
      } else if (lower.includes('cat /var/www/html/index.html')) {
        newEntries.push({
          type: 'output',
          text: `<!DOCTYPE html>
<html>
<head><title>SIJALAB CBT & Web Portal</title></head>
<body style="font-family: sans-serif; text-align: center; padding: 50px;">
  <h1>Selamat Datang di Portal Pembelajaran SIJA</h1>
  <p>Status Server: Online & Siap Digunakan untuk Ujian Online.</p>
</body>
</html>`
        });
      } else if (lower.includes('systemctl status nginx')) {
        newEntries.push({
          type: 'output',
          text: `● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2026-11-05 08:10:00 WIB
 Main PID: 745 (nginx)
    Tasks: 2 (limit: 4915)
   Memory: 7.2M`
        });
      } else {
        newEntries.push({
          type: 'error',
          text: `Perintah "${rawCmd}" tidak dikenal pada modul Nginx. Coba "nginx -t" atau "curl -I http://localhost".`
        });
      }
    }

    // --- MAIL SERVER (POSTFIX) COMMANDS ---
    else if (activeModuleId === 'mail') {
      if (lower.includes('postconf -n') || lower.includes('cat /etc/postfix/main.cf')) {
        newEntries.push({
          type: 'output',
          text: `myhostname = mail.sijalab.sch.id
mydomain = sijalab.sch.id
myorigin = /etc/mailname
inet_interfaces = all
inet_protocols = ipv4
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
mynetworks = 127.0.0.0/8, 192.168.10.0/24
home_mailbox = Maildir/
smtpd_banner = $myhostname ESMTP SIJA Mail Server (Ubuntu)`
        });
        triggerMissionDone('mail1');
      } else if (lower.startsWith('mail -s') || lower.startsWith('sendmail')) {
        newEntries.push({
          type: 'success',
          text: `Membuat header email...
Subject: "Test SIJA"
Recipient: siswa@sijalab.sch.id
Message body: [Pesan terkirim via postfix-sendmail daemon]
[ OK ] Pesan berhasil diteruskan ke spooler mail queue local.`
        });
        triggerMissionDone('mail2');
      } else if (lower === 'mailq') {
        newEntries.push({
          type: 'output',
          text: `Mail queue is empty
Total requests: 0`
        });
        triggerMissionDone('mail3');
      } else if (lower.includes('tail') && lower.includes('mail.log')) {
        newEntries.push({
          type: 'output',
          text: `Nov 05 09:25:01 sijalab-srv postfix/pickup[2012]: 4WqL992jPzZ001: uid=0 from=<root>
Nov 05 09:25:01 sijalab-srv postfix/cleanup[2015]: 4WqL992jPzZ001: message-id=<20261105022501.4WqL992jPzZ001@mail.sijalab.sch.id>
Nov 05 09:25:02 sijalab-srv postfix/qmgr[1890]: 4WqL992jPzZ001: from=<root@sijalab.sch.id>, size=412, nrcpt=1 (queue active)
Nov 05 09:25:02 sijalab-srv postfix/local[2018]: 4WqL992jPzZ001: to=<siswa@sijalab.sch.id>, relay=local, delay=0.12, delays=0.04/0.01/0/0.07, dsn=2.0.0, status=sent (delivered to maildir)`
        });
        triggerMissionDone('mail4');
      } else if (lower.includes('systemctl status postfix')) {
        newEntries.push({
          type: 'output',
          text: `● postfix.service - Postfix Mail Transport Agent
   Loaded: loaded (/lib/systemd/system/postfix.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2026-11-05 08:05:00 WIB
 Main PID: 1204 (/usr/lib/postfix/sbin/master)`
        });
      } else {
        newEntries.push({
          type: 'error',
          text: `Perintah "${rawCmd}" tidak cocok untuk modul Mail. Coba "postconf -n" atau "mailq".`
        });
      }
    }

    // --- SECURITY & SOCKET (UFW) COMMANDS ---
    else if (activeModuleId === 'security') {
      if (lower.includes('ss -tulpn') || lower.includes('netstat -tlpn')) {
        newEntries.push({
          type: 'output',
          text: `Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process
tcp    LISTEN  0       511            0.0.0.0:80          0.0.0.0:*      users:(("nginx",pid=745,fd=6))
tcp    LISTEN  0       128            0.0.0.0:22          0.0.0.0:*      users:(("sshd",pid=612,fd=3))
tcp    LISTEN  0       100            0.0.0.0:25          0.0.0.0:*      users:(("master",pid=1204,fd=13))
udp    UNCONN  0       0              0.0.0.0:53          0.0.0.0:*      users:(("named",pid=890,fd=512))
udp    UNCONN  0       0              0.0.0.0:67          0.0.0.0:*      users:(("dhcpd",pid=1425,fd=7))`
        });
        triggerMissionDone('sec1');
      } else if (lower.includes('ufw status numbered')) {
        newEntries.push({
          type: 'output',
          text: `Status: active

     To                         Action      From
     --                         ------      ----
[ 1] 22/tcp                     ALLOW IN    Anywhere
[ 2] 53                         ALLOW IN    Anywhere
[ 3] 67/udp                     ALLOW IN    Anywhere
${ufwRules.some((r) => r.to === '80/tcp') ? '[ 4] 80/tcp                     ALLOW IN    Anywhere\n' : ''}`
        });
        triggerMissionDone('sec2');
      } else if (lower.includes('ufw allow 80/tcp') || lower.includes('ufw allow http')) {
        if (!ufwRules.some((r) => r.to === '80/tcp')) {
          setUfwRules((prev) => [...prev, { id: prev.length + 1, to: '80/tcp', action: 'ALLOW IN', from: 'Anywhere' }]);
        }
        newEntries.push({
          type: 'success',
          text: `Rule added\nRule added (v6)`
        });
        triggerMissionDone('sec3');
      } else if (lower === 'ufw status') {
        newEntries.push({
          type: 'output',
          text: `Status: active\nLogging: on (low)\nDefault: deny (incoming), allow (outgoing), disabled (routed)`
        });
      } else if (lower.includes('chmod 755') || lower.includes('chown -R')) {
        newEntries.push({
          type: 'success',
          text: `Hak akses direktori berhasil diperbarui.`
        });
      } else {
        newEntries.push({
          type: 'error',
          text: `Perintah "${rawCmd}" belum terdaftar. Coba "ss -tulpn" atau "ufw status numbered".`
        });
      }
    }

    setHistory((prev) => [...prev, ...newEntries]);
  };

  // Cisco Command Handler
  const handleCiscoCommand = (cmd, lower, newEntries) => {
    if (lower === 'help' || lower === '?') {
      newEntries.push({
        type: 'output',
        text: `Perintah Cisco IOS:
• enable                     : Masuk ke Privileged EXEC mode (Switch#)
• configure terminal (conf t): Masuk ke Global Configuration mode
• hostname <nama>            : Ubah nama host switch
• vlan <id>                  : Membuat atau mengedit VLAN (contoh: vlan 10)
• name <nama>                : Memberikan nama VLAN
• show vlan brief            : Melihat tabel ringkasan VLAN
• show ip interface brief    : Cek status port FastEthernet
• disable / exit             : Kembali ke mode sebelumnya`
      });
    } else if (lower === 'enable') {
      setCiscoMode('priv');
      newEntries.push({ type: 'output', text: 'Beralih ke Privileged EXEC mode.' });
      triggerMissionDone('cis1');
    } else if (lower === 'disable') {
      setCiscoMode('user');
      newEntries.push({ type: 'output', text: 'Kembali ke User EXEC mode.' });
    } else if (lower === 'configure terminal' || lower === 'conf t') {
      if (ciscoMode === 'user') {
        newEntries.push({ type: 'error', text: '% Unknown command or not authorized in User EXEC mode. Ketik "enable" dahulu.' });
      } else {
        setCiscoMode('config');
        newEntries.push({ type: 'output', text: 'Enter configuration commands, one per line. End with CNTL/Z.' });
        triggerMissionDone('cis2');
      }
    } else if (lower.startsWith('hostname ')) {
      const hname = cmd.split(' ')[1];
      if (hname) {
        setCiscoHostname(hname);
        newEntries.push({ type: 'success', text: `Hostname switch berhasil diubah menjadi: ${hname}` });
        if (hname.toUpperCase().includes('SIJA') || hname.toUpperCase().includes('LAB')) {
          triggerMissionDone('cis3');
        }
      }
    } else if (lower.startsWith('vlan ')) {
      const vlanId = cmd.split(' ')[1];
      if (ciscoMode !== 'config' && ciscoMode !== 'vlan') {
        newEntries.push({ type: 'error', text: '% Masuk ke config mode terlebih dahulu (configure terminal).' });
      } else {
        setCiscoMode('vlan');
        const existing = ciscoVlans.find((v) => v.id === vlanId);
        if (!existing) {
          setCiscoVlans((prev) => [...prev, { id: vlanId, name: `VLAN_${vlanId}`, status: 'active', ports: '' }]);
        }
        newEntries.push({ type: 'output', text: `Switch(config-vlan)# Mengedit VLAN ${vlanId}` });
      }
    } else if (lower.startsWith('name ')) {
      const vlanName = cmd.split(' ')[1];
      if (ciscoMode === 'vlan') {
        newEntries.push({ type: 'output', text: `Nama VLAN diatur menjadi: ${vlanName}` });
      } else {
        newEntries.push({ type: 'error', text: '% Perintah "name" hanya bisa dipanggil dalam sub-mode VLAN.' });
      }
    } else if (lower === 'show vlan brief' || lower === 'sh vlan br') {
      const vlanRows = ciscoVlans
        .map((v) => `${v.id.padEnd(5)} ${v.name.padEnd(20)} ${v.status.padEnd(10)} ${v.ports || 'Fa0/1 - Fa0/4'}`)
        .join('\n');
      newEntries.push({
        type: 'output',
        text: `VLAN  Name                 Status     Ports
----  -------------------- ---------- -------------------------------
${vlanRows}
10    SISWA_SIJA           active     Fa0/1, Fa0/2
20    GURU_STAFF           active     Fa0/3, Fa0/4
30    SERVER_CBT           active     Fa0/5`
      });
      triggerMissionDone('cis4');
    } else if (lower === 'show ip interface brief' || lower === 'sh ip int br') {
      newEntries.push({
        type: 'output',
        text: `Interface              IP-Address      OK? Method Status                Protocol
FastEthernet0/1        unassigned      YES unset  up                    up
FastEthernet0/2        unassigned      YES unset  up                    up
FastEthernet0/3        unassigned      YES unset  up                    up
GigabitEthernet0/1     unassigned      YES unset  up                    up
Vlan1                  192.168.10.2    YES manual up                    up`
      });
    } else if (lower === 'exit' || lower === 'end') {
      if (ciscoMode === 'vlan') setCiscoMode('config');
      else if (ciscoMode === 'config') setCiscoMode('priv');
      else if (ciscoMode === 'priv') setCiscoMode('user');
    } else {
      newEntries.push({
        type: 'error',
        text: `% Invalid input detected at marker. Ketik "help" untuk panduan perintah Cisco.`
      });
    }
  };

  const handleCopyCommand = (cmd) => {
    setInputCommand(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1500);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputCommand(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInputCommand(commandHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputCommand('');
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. HEADER & MODULE SELECTOR */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
              <Terminal className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">Live Server CLI Sandbox</h2>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-full tracking-wider">
                  Interactive v2.5
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Simulasi terminal Linux Server & Cisco IOS lengkap dengan file konfigurasi, log, dan daemon aktif.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setHistory([]);
                setCiscoMode('user');
                setCiscoHostname('Switch');
              }}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Konsol</span>
            </button>
          </div>
        </div>

        {/* Module Tab Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-slate-100">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModuleId === mod.id;
            const doneCount = mod.missions.filter((m) => completedMissions.has(m.id)).length;
            const totalCount = mod.missions.length;

            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'border-blue-600 bg-blue-50/80 shadow-xs'
                    : 'border-slate-200/80 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-white bg-linear-to-tr ${mod.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      doneCount === totalCount && totalCount > 0
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200/60 text-slate-600'
                    }`}
                  >
                    {doneCount}/{totalCount}
                  </span>
                </div>
                <div className="text-xs font-black text-slate-900 truncate">{mod.name}</div>
                <div className="text-[10px] text-slate-500 font-mono truncate">{mod.tag}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN TERMINAL WORKBENCH & MISSIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Terminal Screen (Col 8) */}
        <div className="lg:col-span-8 space-y-3">
          {/* Active Module Banner */}
          <div className="px-4 py-3 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-xs font-bold text-slate-200">{currentModule.name} Workstation</span>
                <span className="text-[10px] text-slate-400 font-mono ml-2">Port: {currentModule.port}</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              SSH root@sijalab-srv (22/tcp)
            </span>
          </div>

          {/* Black Terminal Console Container */}
          <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col font-mono text-xs">
            {/* Top Terminal Bar */}
            <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-400 font-medium ml-2">
                  bash — {currentModule.name} Sandbox
                </span>
              </div>
              <div className="text-[11px] text-slate-500">VT100 Emulation</div>
            </div>

            {/* Scrollable Output Screen */}
            <div className="p-4 sm:p-5 h-[420px] overflow-y-auto space-y-2.5 text-slate-200 leading-relaxed font-mono">
              {history.map((entry, idx) => {
                if (entry.type === 'system') {
                  return (
                    <div key={idx} className="text-slate-400 italic">
                      {entry.text}
                    </div>
                  );
                }
                if (entry.type === 'input') {
                  return (
                    <div key={idx} className="flex items-start gap-1 font-bold text-slate-100">
                      <span className="text-emerald-400 select-none">{entry.prompt}</span>
                      <span>{entry.text}</span>
                    </div>
                  );
                }
                if (entry.type === 'output') {
                  return (
                    <pre
                      key={idx}
                      className="whitespace-pre-wrap text-slate-300 font-mono text-xs bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60"
                    >
                      {entry.text}
                    </pre>
                  );
                }
                if (entry.type === 'success') {
                  return (
                    <pre
                      key={idx}
                      className="whitespace-pre-wrap text-emerald-400 font-mono text-xs bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/40"
                    >
                      {entry.text}
                    </pre>
                  );
                }
                if (entry.type === 'error') {
                  return (
                    <div key={idx} className="text-rose-400 bg-rose-950/30 p-2 rounded border border-rose-900/40">
                      {entry.text}
                    </div>
                  );
                }
                return null;
              })}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeCommand();
              }}
              className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
            >
              <span className="text-emerald-400 font-bold select-none text-xs sm:text-sm pl-2">
                {getDynamicPrompt()}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputCommand}
                onChange={(e) => setInputCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ketik command di sini (misal: cat /etc/dhcp/dhcpd.conf, dig, systemctl status)..."
                className="flex-1 bg-transparent text-slate-100 text-xs sm:text-sm focus:outline-none placeholder-slate-500 font-mono"
                autoFocus
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Run</span>
              </button>
            </form>
          </div>

          {/* Quick Command Suggestions */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Shortcut Perintah Cepat (Klik untuk paste ke konsol):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentModule.quickCommands.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCopyCommand(cmd)}
                  className="px-2.5 py-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{cmd}</span>
                  {copiedCmd === cmd ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Guided Missions & Theory Panel (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Mission Progress Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Misi Praktik Mandiri</h3>
                  <p className="text-[11px] text-slate-500">Selesaikan untuk mendapatkan XP</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              {currentModule.desc}
            </p>

            {/* List of Missions for this module */}
            <div className="space-y-2.5">
              {currentModule.missions.map((m, index) => {
                const isDone = completedMissions.has(m.id);
                return (
                  <div
                    key={m.id}
                    className={`p-3 rounded-2xl border transition-all ${
                      isDone
                        ? 'bg-emerald-50/70 border-emerald-200'
                        : 'bg-slate-50/80 border-slate-200 hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-black text-slate-400 mt-0.5">{index + 1}.</span>
                        <div className="text-xs font-bold text-slate-800 leading-snug">{m.title}</div>
                      </div>
                      {isDone ? (
                        <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Selesai
                        </span>
                      ) : (
                        <span className="shrink-0 text-[10px] font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                          +{m.xp} XP
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 mt-1">
                      <span className="text-[11px] font-mono text-slate-500 truncate mr-2">{m.cmd}</span>
                      <button
                        onClick={() => handleCopyCommand(m.cmd)}
                        className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-[10px] font-bold text-slate-700 transition-colors cursor-pointer shrink-0"
                      >
                        Salin Perintah
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Technical Reference SOP */}
          <div className="bg-linear-to-br from-blue-50 to-indigo-50/50 rounded-3xl border border-blue-200/70 p-5">
            <div className="flex items-center gap-2 mb-2 text-xs font-black text-blue-900">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>SOP Administrator Jaringan</span>
            </div>
            <ul className="text-xs text-blue-800/90 space-y-1.5 list-disc list-inside">
              <li>Selalu validasi sintaks sebelum restart daemon (misal: <code className="bg-white/80 px-1 py-0.5 rounded text-blue-900 font-bold">nginx -t</code> atau <code className="bg-white/80 px-1 py-0.5 rounded text-blue-900 font-bold">dhcpd -t</code>).</li>
              <li>Periksa port yang sedang listening via <code className="bg-white/80 px-1 py-0.5 rounded text-blue-900 font-bold">ss -tulpn</code> jika service gagal bind.</li>
              <li>Gunakan tombol panah <strong>Up / Down</strong> di keyboard untuk menavigasi riwayat perintah terminal.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
