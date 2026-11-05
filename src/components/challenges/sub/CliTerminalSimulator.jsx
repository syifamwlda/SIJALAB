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
  Award
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const CliTerminalSimulator = () => {
  const { addXP, unlockBadge } = useApp();

  const [terminalType, setTerminalType] = useState('linux'); // 'linux' or 'cisco'
  const [inputCommand, setInputCommand] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Selamat datang di SIJALAB Live CLI Terminal Sandbox v2.0' },
    { type: 'system', text: 'Ketik "help" untuk melihat perintah yang didukung atau ikuti misi di tab sebelah kanan.' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Guided Missions State
  const [missions, setMissions] = useState({
    linux1: { id: 'linux1', title: 'Periksa Konfigurasi IP Linux', cmdRequired: 'ip a', done: false, xp: 30 },
    linux2: { id: 'linux2', title: 'Ubah Hak Akses File script.sh', cmdRequired: 'chmod 755 script.sh', done: false, xp: 40 },
    linux3: { id: 'linux3', title: 'Cek Status Layanan Nginx Web Server', cmdRequired: 'systemctl status nginx', done: false, xp: 35 },
    cisco1: { id: 'cisco1', title: 'Masuk Mode Privileged Cisco', cmdRequired: 'enable', done: false, xp: 25 },
    cisco2: { id: 'cisco2', title: 'Ganti Hostname Switch ke SW-LAB1', cmdRequired: 'hostname SW-LAB1', done: false, xp: 35 },
    cisco3: { id: 'cisco3', title: 'Buat VLAN 10 & Verifikasi', cmdRequired: 'show vlan brief', done: false, xp: 45 }
  });

  // Cisco simulated mode state
  const [ciscoMode, setCiscoMode] = useState('user'); // 'user' (Switch>), 'priv' (Switch#), 'config' (Switch(config)#), 'vlan' (Switch(config-vlan)#)
  const [ciscoHostname, setCiscoHostname] = useState('Switch');
  const [ciscoVlans, setCiscoVlans] = useState([
    { id: '1', name: 'default', status: 'active', ports: 'Fa0/1 - 24, Gi0/1 - 2' }
  ]);

  // Linux simulated file state
  const [filePerms, setFilePerms] = useState('-rw-r--r--');

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputCommand.trim();
    if (!cmd) return;

    // Record history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInputCommand('');

    const promptText =
      terminalType === 'linux'
        ? 'siswa@sijalab-srv:~$ '
        : ciscoMode === 'user'
        ? `${ciscoHostname}> `
        : ciscoMode === 'priv'
        ? `${ciscoHostname}# `
        : ciscoMode === 'config'
        ? `${ciscoHostname}(config)# `
        : `${ciscoHostname}(config-vlan)# `;

    const newEntries = [{ type: 'input', prompt: promptText, text: cmd }];

    // --- LINUX COMMAND EXECUTION ENGINE ---
    if (terminalType === 'linux') {
      const lower = cmd.toLowerCase();
      if (lower === 'clear') {
        setHistory([]);
        return;
      } else if (lower === 'help') {
        newEntries.push({
          type: 'output',
          text: `Perintah Linux yang didukung:
• ls -la                     : Daftar file dan perizinan direktori
• pwd                        : Cetak direktori kerja aktif
• whoami                     : Tampilkan user yang sedang login
• ip a                       : Tampilkan alamat IP kartu jaringan
• ping 8.8.8.8               : Tes konektivitas paket ICMP
• ping 192.168.1.1           : Ping ke router gateway
• chmod 755 script.sh        : Ubah hak akses berkas script.sh
• cat script.sh              : Tampilkan isi skrip bash
• systemctl status nginx     : Cek status daemon web server
• sudo systemctl restart nginx : Mulai ulang web server
• uname -a                   : Info arsitektur kernel Linux
• clear                      : Bersihkan layar terminal`
        });
      } else if (lower === 'ls' || lower === 'ls -la' || lower === 'ls -l') {
        newEntries.push({
          type: 'output',
          text: `total 36
drwxr-xr-x 4 siswa siswa 4096 Nov 5 09:20 .
drwxr-xr-x 3 root  root  4096 Nov 5 08:00 ..
${filePerms} 1 siswa siswa  240 Nov 5 09:15 script.sh
-rw-r--r-- 1 siswa siswa 1024 Nov 5 08:30 backup.sql
drwxr-xr-x 2 siswa siswa 4096 Nov 5 08:45 iot-firmware/
drwxr-xr-x 2 siswa siswa 4096 Nov 5 08:12 network-configs/`
        });
      } else if (lower === 'pwd') {
        newEntries.push({ type: 'output', text: '/home/siswa' });
      } else if (lower === 'whoami') {
        newEntries.push({ type: 'output', text: 'siswa' });
      } else if (lower.startsWith('cat script.sh')) {
        newEntries.push({
          type: 'output',
          text: `#!/bin/bash
# SIJALAB Automation Backup Script
echo "Memulai backup data sensor IoT..."
tar -czf /backup/sensor_data_$(date +%F).tar.gz /var/log/iot/
echo "Backup berhasil disinkronkan ke server!"`
        });
      } else if (lower === 'chmod 755 script.sh' || lower === 'chmod +x script.sh') {
        setFilePerms('-rwxr-xr-x');
        newEntries.push({
          type: 'output',
          text: 'Hak akses berkas "script.sh" berhasil diubah menjadi: -rwxr-xr-x (755)'
        });
        triggerMissionDone('linux2');
      } else if (lower === 'ip a' || lower === 'ip addr' || lower === 'ifconfig') {
        newEntries.push({
          type: 'output',
          text: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP
    inet 192.168.10.25/24 brd 192.168.10.255 scope global eth0
    valid_lft forever preferred_lft forever
    inet6 fe80::5054:ff:fe12:3456/64 scope link
3: eth1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP
    inet 10.10.10.2/30 brd 10.10.10.3 scope global eth1`
        });
        triggerMissionDone('linux1');
      } else if (lower.startsWith('ping 8.8.8.8')) {
        newEntries.push({
          type: 'output',
          text: `PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=14.2 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=13.8 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=118 time=14.1 ms
--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2004ms
rtt min/avg/max/mdev = 13.8/14.0/14.2/0.2 ms`
        });
      } else if (lower.startsWith('ping 192.168.1')) {
        newEntries.push({
          type: 'output',
          text: `PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.82 ms
64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.79 ms
--- 192.168.1.1 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss`
        });
      } else if (lower === 'systemctl status nginx') {
        newEntries.push({
          type: 'output',
          text: `● nginx.service - A high performance web server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2026-11-05 08:30:12 WIB; 45min ago
 Main PID: 1842 (nginx)
    Tasks: 2 (limit: 4915)
   Memory: 6.8M
      CPU: 450ms
   CGroup: /system.slice/nginx.service
           ├─1842 nginx: master process /usr/sbin/nginx -g daemon on;
           └─1843 nginx: worker process`
        });
        triggerMissionDone('linux3');
      } else if (lower.includes('restart nginx')) {
        newEntries.push({
          type: 'output',
          text: 'Menghentikan layanan nginx... [ OK ]\nMemulai ulang layanan nginx... [ OK ]'
        });
      } else if (lower === 'uname -a') {
        newEntries.push({
          type: 'output',
          text: 'Linux sijalab-srv 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux'
        });
      } else {
        newEntries.push({
          type: 'error',
          text: `bash: ${cmd}: command not found. Ketik "help" untuk melihat perintah yang tersedia.`
        });
      }
    }

    // --- CISCO IOS COMMAND EXECUTION ENGINE ---
    if (terminalType === 'cisco') {
      const lower = cmd.toLowerCase();

      if (lower === 'clear') {
        setHistory([]);
        return;
      } else if (lower === 'help' || lower === '?') {
        newEntries.push({
          type: 'output',
          text: `Perintah Cisco IOS yang didukung:
• enable                     : Beralih ke Privileged EXEC mode (Switch#)
• disable                    : Kembali ke User EXEC mode (Switch>)
• configure terminal (conf t): Masuk ke Global Configuration mode
• hostname <nama>            : Mengubah nama hostname switch
• vlan <id>                  : Membuat atau mengedit VLAN (contoh: vlan 10)
• name <nama_vlan>           : Memberi nama pada VLAN
• show vlan brief            : Menampilkan tabel VLAN aktif
• show ip interface brief    : Status interface Ethernet & VLAN SVI
• ping <ip_address>          : Uji ping Cisco (contoh: ping 192.168.10.1)
• exit / end                 : Keluar dari mode konfigurasi
• clear                      : Bersihkan konsol`
        });
      } else if (lower === 'enable') {
        setCiscoMode('priv');
        newEntries.push({ type: 'output', text: 'Beralih ke Privileged EXEC mode.' });
        triggerMissionDone('cisco1');
      } else if (lower === 'disable') {
        setCiscoMode('user');
        newEntries.push({ type: 'output', text: 'Kembali ke User EXEC mode.' });
      } else if (lower === 'configure terminal' || lower === 'conf t') {
        if (ciscoMode === 'user') {
          newEntries.push({ type: 'error', text: '% Unknown command or not authorized in User EXEC mode. Ketik "enable" terlebih dahulu.' });
        } else {
          setCiscoMode('config');
          newEntries.push({ type: 'output', text: 'Enter configuration commands, one per line. End with CNTL/Z.' });
        }
      } else if (lower.startsWith('hostname ')) {
        const newName = cmd.split(' ')[1];
        if (newName) {
          setCiscoHostname(newName);
          newEntries.push({ type: 'output', text: `Hostname berhasil diubah menjadi: ${newName}` });
          if (newName.toUpperCase().includes('LAB')) {
            triggerMissionDone('cisco2');
          }
        }
      } else if (lower.startsWith('vlan ')) {
        const vlanId = cmd.split(' ')[1];
        if (ciscoMode !== 'config' && ciscoMode !== 'vlan') {
          newEntries.push({ type: 'error', text: '% Must be in Global Configuration mode to create VLAN.' });
        } else {
          setCiscoMode('vlan');
          const existing = ciscoVlans.find((v) => v.id === vlanId);
          if (!existing) {
            setCiscoVlans((prev) => [...prev, { id: vlanId, name: `VLAN00${vlanId}`, status: 'active', ports: 'Fa0/10' }]);
          }
          newEntries.push({ type: 'output', text: `Switch(config-vlan)# Mengedit VLAN ${vlanId}` });
        }
      } else if (lower.startsWith('name ')) {
        const vlanName = cmd.split(' ').slice(1).join(' ');
        setCiscoVlans((prev) => {
          const last = prev[prev.length - 1];
          if (last) {
            return prev.map((v) => (v.id === last.id ? { ...v, name: vlanName } : v));
          }
          return prev;
        });
        newEntries.push({ type: 'output', text: `Nama VLAN diubah menjadi "${vlanName}"` });
      } else if (lower === 'show vlan brief' || lower === 'sh vlan brief' || lower === 'do show vlan brief') {
        let vlanTable = 'VLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------';
        ciscoVlans.forEach((v) => {
          vlanTable += `\n${v.id.padEnd(4)} ${v.name.padEnd(32)} ${v.status.padEnd(9)} ${v.ports}`;
        });
        newEntries.push({ type: 'output', text: vlanTable });
        triggerMissionDone('cisco3');
      } else if (lower === 'show ip interface brief' || lower === 'sh ip int br') {
        newEntries.push({
          type: 'output',
          text: `Interface              IP-Address      OK? Method Status                Protocol
FastEthernet0/1        unassigned      YES unset  up                    up      
FastEthernet0/2        unassigned      YES unset  up                    up      
GigabitEthernet0/1     unassigned      YES unset  up                    up      
Vlan1                  192.168.10.2    YES manual up                    up`
        });
      } else if (lower.startsWith('ping ')) {
        newEntries.push({
          type: 'output',
          text: `Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to ${cmd.split(' ')[1]}, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms`
        });
      } else if (lower === 'exit') {
        if (ciscoMode === 'vlan') setCiscoMode('config');
        else if (ciscoMode === 'config') setCiscoMode('priv');
        else if (ciscoMode === 'priv') setCiscoMode('user');
        newEntries.push({ type: 'output', text: 'Keluar satu tingkat mode konfigurasi.' });
      } else if (lower === 'end') {
        setCiscoMode('priv');
        newEntries.push({ type: 'output', text: 'Kembali ke Privileged EXEC mode.' });
      } else {
        newEntries.push({
          type: 'error',
          text: `% Invalid input detected at '^' marker. Ketik "help" untuk melihat perintah yang sah.`
        });
      }
    }

    setHistory((prev) => [...prev, ...newEntries]);
  };

  const triggerMissionDone = (missionId) => {
    setMissions((prev) => {
      const target = prev[missionId];
      if (!target || target.done) return prev;

      addXP(target.xp, `Misi Lab CLI "${target.title}" Berhasil Dituntaskan!`);
      return {
        ...prev,
        [missionId]: { ...target, done: true }
      };
    });
  };

  const switchTerminal = (type) => {
    setTerminalType(type);
    setHistory([
      { type: 'system', text: `Beralih ke konsol ${type === 'linux' ? 'Debian Linux Server' : 'Cisco Catalyst Switch (IOS)'}.` },
      { type: 'system', text: 'Ketik "help" untuk panduan perintah.' }
    ]);
    inputRef.current?.focus();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
      {/* LEFT: CLI CONSOLE (2 Cols) */}
      <div className="lg:col-span-2 bg-slate-950 rounded-3xl p-5 border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[500px]">
        {/* Terminal Header */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-300 ml-2">
                {terminalType === 'linux' ? 'bash — siswa@sijalab-srv:~' : `${ciscoHostname} (Cisco IOS 15.0)`}
              </span>
            </div>

            {/* Switch Type Tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => switchTerminal('linux')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  terminalType === 'linux'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Linux Server
              </button>
              <button
                onClick={() => switchTerminal('cisco')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  terminalType === 'cisco'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cisco Switch
              </button>
            </div>
          </div>

          {/* Terminal Screen Logs */}
          <div className="font-mono text-xs space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed">
                {item.type === 'system' && (
                  <p className="text-cyan-400 font-semibold">{item.text}</p>
                )}
                {item.type === 'input' && (
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">{item.prompt}</span>
                    <span className="text-white font-bold">{item.text}</span>
                  </div>
                )}
                {item.type === 'output' && (
                  <pre className="text-slate-300 whitespace-pre-wrap">{item.text}</pre>
                )}
                {item.type === 'error' && (
                  <p className="text-rose-400 font-semibold">{item.text}</p>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input Command Line */}
        <form onSubmit={handleCommandSubmit} className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-emerald-400 shrink-0">
            {terminalType === 'linux'
              ? 'siswa@sijalab-srv:~$ '
              : ciscoMode === 'user'
              ? `${ciscoHostname}> `
              : ciscoMode === 'priv'
              ? `${ciscoHostname}# `
              : ciscoMode === 'config'
              ? `${ciscoHostname}(config)# `
              : `${ciscoHostname}(config-vlan)# `}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value)}
            placeholder="Ketik perintah di sini (contoh: help, ip a, enable, ls)..."
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder-slate-600 outline-hidden focus:ring-0"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shrink-0"
          >
            Enter
          </button>
        </form>
      </div>

      {/* RIGHT: GUIDED MISSIONS & QUICK CHEAT SHEET */}
      <div className="space-y-4">
        {/* Missions Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Misi Praktik Mandiri
            </h3>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
              Live Validation
            </span>
          </div>

          <div className="space-y-2">
            {Object.values(missions).map((m) => (
              <div
                key={m.id}
                className={`p-3 rounded-2xl border text-xs transition-all flex items-start justify-between gap-2 ${
                  m.done
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <span className="font-bold block text-slate-800">{m.title}</span>
                  <code className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-200/70 rounded text-slate-700">
                    Ketik: {m.cmdRequired}
                  </code>
                </div>
                {m.done ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md shrink-0">
                    +{m.xp} XP
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips Box */}
        <div className="p-4 bg-linear-to-br from-blue-50 to-indigo-50/60 border border-blue-200 rounded-3xl text-xs space-y-2 text-blue-950">
          <span className="font-extrabold block text-blue-900">💡 Tips Pengoperasian CLI:</span>
          <p className="leading-relaxed font-medium">
            Terminal simulator ini merespons persis seperti lingkungan Ubuntu Server dan Cisco IOS fisik. Siswa dilatih mengingat sintaks asli tanpa pilihan ganda.
          </p>
        </div>
      </div>
    </div>
  );
};

