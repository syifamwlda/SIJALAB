import React, { useState, useRef, useEffect } from 'react';
import {
  Server,
  Laptop,
  Network,
  Cpu,
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Info,
  Radio,
  Layers,
  Route,
  Globe,
  Send,
  Shield,
  Activity,
  Check,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  ChevronRight,
  Zap,
  BookOpen,
  Terminal,
  Sliders,
  Copy
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const NetworkTopologySimulator = () => {
  const { addXP, showToast } = useApp();

  // Selected Active Device in Topology (Default: Switch)
  // 'switch', 'router', 'pc1', 'server'
  const [selectedDevice, setSelectedDevice] = useState('switch');

  // Topology Network Live State
  const [networkConfig, setNetworkConfig] = useState({
    // Switch state
    switchHostname: 'SW-CORE-SIJA',
    vlans: [
      { id: '1', name: 'default', ports: 'Fa0/2 - 24' },
      { id: '10', name: 'SISWA_LAB', ports: 'Fa0/1' },
      { id: '30', name: 'SERVER_CBT', ports: 'Fa0/3' }
    ],
    portModes: {
      'Fa0/1': { mode: 'access', vlan: '10' },
      'Fa0/2': { mode: 'access', vlan: '1' },
      'Fa0/3': { mode: 'access', vlan: '30' },
      'Gi0/1': { mode: 'trunk', allowed: '10, 20, 30' }
    },
    // Router state
    routerHostname: 'RTR-GW-SIJA',
    subInterfaces: {
      'Gi0/0.10': { vlan: '10', ip: '192.168.10.1', mask: '255.255.255.0', isConfigured: false },
      'Gi0/0.30': { vlan: '30', ip: '192.168.30.1', mask: '255.255.255.0', isConfigured: false }
    },
    routerOnAStickActive: false,
    // PC State
    pc1Ip: '192.168.10.15',
    pc1Gateway: '192.168.10.1',
    serverIp: '192.168.30.100',
    serverGateway: '192.168.30.1'
  });

  // Switch CLI State
  const [switchCliHistory, setSwitchCliHistory] = useState([
    { type: 'system', text: 'Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.0(2)SE4' },
    { type: 'system', text: 'SW-CORE-SIJA console terminal ready. Ketik "enable" atau ikuti modul di panel kanan.' }
  ]);
  const [switchInput, setSwitchInput] = useState('');
  const [switchMode, setSwitchMode] = useState('user'); // user, priv, config, config-vlan, config-if

  // Router CLI State
  const [routerCliHistory, setRouterCliHistory] = useState([
    { type: 'system', text: 'Cisco IOS Software, 2900 Software (C2900-UNIVERSALK9-M), Version 15.1(4)M4' },
    { type: 'system', text: 'RTR-GW-SIJA console terminal ready. Konfigurasi sub-interface 802.1Q.' }
  ]);
  const [routerInput, setRouterInput] = useState('');
  const [routerMode, setRouterMode] = useState('user');

  // PC Station State
  const [pcTab, setPcTab] = useState('cmd'); // 'cmd', 'browser'
  const [pcCmdHistory, setPcCmdHistory] = useState([
    'Microsoft Windows [Version 10.0.19045.3803]',
    '(c) Microsoft Corporation. All rights reserved.',
    '',
    'C:\\Users\\SiswaSIJA> ipconfig',
    'Ethernet adapter Local Area Connection:',
    '   IPv4 Address. . . . . . . . . . . : 192.168.10.15',
    '   Subnet Mask . . . . . . . . . . . : 255.255.255.0',
    '   Default Gateway . . . . . . . . . : 192.168.10.1',
    ''
  ]);
  const [pcInput, setPcInput] = useState('ping 192.168.30.100');
  const [browserUrl, setBrowserUrl] = useState('http://192.168.30.100');
  const [browserRendered, setBrowserRendered] = useState(false);

  // Auto-scroll CLI terminal
  const switchEndRef = useRef(null);
  const routerEndRef = useRef(null);
  const pcEndRef = useRef(null);

  useEffect(() => {
    switchEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [switchCliHistory]);

  useEffect(() => {
    routerEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [routerCliHistory]);

  useEffect(() => {
    pcEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [pcCmdHistory]);

  // --- SWITCH CLI COMMAND PARSER ---
  const handleSwitchSubmit = (customCmd) => {
    const raw = (customCmd || switchInput).trim();
    if (!raw) return;
    setSwitchInput('');

    const lower = raw.toLowerCase();
    const prompt =
      switchMode === 'user'
        ? `${networkConfig.switchHostname}> `
        : switchMode === 'priv'
        ? `${networkConfig.switchHostname}# `
        : switchMode === 'config'
        ? `${networkConfig.switchHostname}(config)# `
        : switchMode === 'config-vlan'
        ? `${networkConfig.switchHostname}(config-vlan)# `
        : `${networkConfig.switchHostname}(config-if)# `;

    const entries = [{ type: 'input', prompt, text: raw }];

    if (lower === 'clear') {
      setSwitchCliHistory([]);
      return;
    }

    if (lower === 'enable' || lower === 'en') {
      setSwitchMode('priv');
      entries.push({ type: 'output', text: 'Masuk ke Privileged EXEC mode.' });
    } else if (lower === 'configure terminal' || lower === 'conf t') {
      if (switchMode === 'user') {
        entries.push({ type: 'error', text: '% Unknown command. Ketik "enable" terlebih dahulu.' });
      } else {
        setSwitchMode('config');
        entries.push({ type: 'output', text: 'Enter configuration commands, one per line. End with CNTL/Z.' });
      }
    } else if (lower.startsWith('vlan ')) {
      const vlanNum = lower.split(' ')[1];
      if (switchMode === 'config' || switchMode === 'config-vlan') {
        setSwitchMode('config-vlan');
        entries.push({ type: 'output', text: `Switch(config-vlan)# Membuat/Mengedit VLAN ${vlanNum}` });
        // Update state
        setNetworkConfig((prev) => {
          if (!prev.vlans.some((v) => v.id === vlanNum)) {
            return {
              ...prev,
              vlans: [...prev.vlans, { id: vlanNum, name: `VLAN_${vlanNum}`, ports: '' }]
            };
          }
          return prev;
        });
      } else {
        entries.push({ type: 'error', text: '% Masuk ke config mode terlebih dahulu (configure terminal).' });
      }
    } else if (lower.startsWith('name ')) {
      const vlanName = raw.split(' ')[1];
      entries.push({ type: 'output', text: `Nama VLAN diatur: ${vlanName}` });
    } else if (lower.startsWith('interface ') || lower.startsWith('int ')) {
      setSwitchMode('config-if');
      entries.push({ type: 'output', text: `Switch(config-if)# Mengonfigurasi antarmuka ${raw.split(' ')[1]}` });
    } else if (lower.includes('switchport mode access')) {
      entries.push({ type: 'output', text: 'Mode antarmuka diatur ke Access Port.' });
    } else if (lower.includes('switchport access vlan 10')) {
      entries.push({ type: 'success', text: 'Port Fa0/1 berhasil dialokasikan ke VLAN 10 (SISWA_LAB)!' });
      addXP(20);
      if (showToast) showToast('Port Fa0/1 terhubung ke VLAN 10! (+20 XP)', 'success');
    } else if (lower.includes('switchport mode trunk')) {
      entries.push({ type: 'success', text: 'Port Gi0/1 berhasil diatur menjadi 802.1Q TRUNK menuju Router!' });
      addXP(25);
      if (showToast) showToast('Port Trunk 802.1Q Aktif! (+25 XP)', 'success');
    } else if (lower === 'show vlan brief' || lower === 'sh vlan br') {
      const rows = networkConfig.vlans
        .map((v) => `${v.id.padEnd(5)} ${v.name.padEnd(18)} active    ${v.ports || 'Fa0/1'}`)
        .join('\n');
      entries.push({
        type: 'output',
        text: `VLAN  Name               Status    Ports\n----  ------------------ --------- -------------------\n${rows}`
      });
    } else if (lower === 'exit') {
      if (switchMode === 'config-if' || switchMode === 'config-vlan') setSwitchMode('config');
      else if (switchMode === 'config') setSwitchMode('priv');
      else if (switchMode === 'priv') setSwitchMode('user');
    } else {
      entries.push({ type: 'error', text: `% Unrecognized command. Ikuti panduan modul di sebelah kanan.` });
    }

    setSwitchCliHistory((prev) => [...prev, ...entries]);
  };

  // --- ROUTER CLI COMMAND PARSER ---
  const handleRouterSubmit = (customCmd) => {
    const raw = (customCmd || routerInput).trim();
    if (!raw) return;
    setRouterInput('');

    const lower = raw.toLowerCase();
    const prompt =
      routerMode === 'user'
        ? `${networkConfig.routerHostname}> `
        : routerMode === 'priv'
        ? `${networkConfig.routerHostname}# `
        : routerMode === 'config'
        ? `${networkConfig.routerHostname}(config)# `
        : `${networkConfig.routerHostname}(config-subif)# `;

    const entries = [{ type: 'input', prompt, text: raw }];

    if (lower === 'clear') {
      setRouterCliHistory([]);
      return;
    }

    if (lower === 'enable' || lower === 'en') {
      setRouterMode('priv');
      entries.push({ type: 'output', text: 'Beralih ke mode Privileged Router.' });
    } else if (lower === 'configure terminal' || lower === 'conf t') {
      setRouterMode('config');
      entries.push({ type: 'output', text: 'Enter configuration commands, one per line. End with CNTL/Z.' });
    } else if (lower.includes('interface gi0/0.10') || lower.includes('int gi0/0.10')) {
      setRouterMode('config-subif');
      entries.push({ type: 'output', text: 'Router(config-subif)# Masuk konfigurasi sub-interface GigabitEthernet0/0.10' });
    } else if (lower.includes('encapsulation dot1q 10')) {
      entries.push({ type: 'output', text: 'Enkapsulasi 802.1Q VLAN 10 berhasil diaktifkan pada sub-interface.' });
    } else if (lower.includes('ip address 192.168.10.1')) {
      setNetworkConfig((prev) => ({
        ...prev,
        subInterfaces: {
          ...prev.subInterfaces,
          'Gi0/0.10': { ...prev.subInterfaces['Gi0/0.10'], isConfigured: true }
        }
      }));
      entries.push({ type: 'success', text: 'Sub-interface Gi0/0.10 IP 192.168.10.1/24 berhasil aktif (UP)!' });
    } else if (lower.includes('interface gi0/0.30') || lower.includes('int gi0/0.30')) {
      setRouterMode('config-subif');
      entries.push({ type: 'output', text: 'Router(config-subif)# Masuk konfigurasi sub-interface GigabitEthernet0/0.30' });
    } else if (lower.includes('encapsulation dot1q 30')) {
      entries.push({ type: 'output', text: 'Enkapsulasi 802.1Q VLAN 30 berhasil diaktifkan.' });
    } else if (lower.includes('ip address 192.168.30.1')) {
      setNetworkConfig((prev) => ({
        ...prev,
        subInterfaces: {
          ...prev.subInterfaces,
          'Gi0/0.30': { ...prev.subInterfaces['Gi0/0.30'], isConfigured: true }
        },
        routerOnAStickActive: true
      }));
      entries.push({
        type: 'success',
        text: 'Sub-interface Gi0/0.30 IP 192.168.30.1/24 berhasil aktif! Router-on-a-Stick inter-VLAN routing AKTIF.'
      });
      addXP(35);
      if (showToast) showToast('Router-on-a-Stick Berhasil Dikonfigurasi! (+35 XP)', 'success');
    } else if (lower === 'show ip route' || lower === 'sh ip route') {
      entries.push({
        type: 'output',
        text: `Codes: C - connected, S - static, R - RIP, O - OSPF\nGateway of last resort is not set\n\nC    192.168.10.0/24 is directly connected, GigabitEthernet0/0.10\nC    192.168.30.0/24 is directly connected, GigabitEthernet0/0.30`
      });
    } else if (lower === 'exit') {
      if (routerMode === 'config-subif') setRouterMode('config');
      else if (routerMode === 'config') setRouterMode('priv');
      else if (routerMode === 'priv') setRouterMode('user');
    } else {
      entries.push({ type: 'error', text: `% Invalid command. Coba gunakan tombol shortcut modul di sebelah kanan.` });
    }

    setRouterCliHistory((prev) => [...prev, ...entries]);
  };

  // --- PC CMD & BROWSER EXECUTION ---
  const handlePcCmdSubmit = (e) => {
    e.preventDefault();
    const cmd = pcInput.trim();
    if (!cmd) return;
    setPcInput('');

    const newLogs = [...pcCmdHistory, `C:\\Users\\SiswaSIJA> ${cmd}`];

    if (cmd.toLowerCase().startsWith('ping 192.168.30.100')) {
      newLogs.push('Pinging 192.168.30.100 with 32 bytes of data:');
      if (networkConfig.routerOnAStickActive) {
        newLogs.push('Reply from 192.168.30.100: bytes=32 time=1.2ms TTL=127');
        newLogs.push('Reply from 192.168.30.100: bytes=32 time=0.9ms TTL=127');
        newLogs.push('Reply from 192.168.30.100: bytes=32 time=1.1ms TTL=127');
        newLogs.push('Reply from 192.168.30.100: bytes=32 time=1.0ms TTL=127');
        newLogs.push('Ping statistics for 192.168.30.100: Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)');
        addXP(30);
        if (showToast) showToast('Ping CBT Server Berhasil! (+30 XP)', 'success');
      } else {
        newLogs.push('Reply from 192.168.10.1: Destination host unreachable.');
        newLogs.push('Request timed out.');
        newLogs.push('Request timed out.');
        newLogs.push('Request timed out.');
        newLogs.push('Ping statistics for 192.168.30.100: Packets: Sent = 4, Received = 0, Lost = 4 (100% loss)');
        newLogs.push('[PENJELASAN]: PC berada di VLAN 10 sedangkan Server di VLAN 30. Router belum selesai dikonfigurasi!');
      }
    } else if (cmd.toLowerCase() === 'ipconfig') {
      newLogs.push('Ethernet adapter Local Area Connection:');
      newLogs.push('   IPv4 Address. . . . . . . . . . . : 192.168.10.15');
      newLogs.push('   Subnet Mask . . . . . . . . . . . : 255.255.255.0');
      newLogs.push('   Default Gateway . . . . . . . . . : 192.168.10.1');
    } else {
      newLogs.push(`'${cmd}' is not recognized as an internal or external command.`);
    }

    setPcCmdHistory(newLogs);
  };

  const handleOpenBrowser = (e) => {
    e.preventDefault();
    if (networkConfig.routerOnAStickActive && browserUrl.includes('192.168.30.100')) {
      setBrowserRendered(true);
      addXP(30);
      if (showToast) showToast('Portal Ujian CBT Terbuka! (+30 XP)', 'success');
    } else {
      setBrowserRendered(false);
      if (showToast) showToast('Gagal Terhubung: ERR_CONNECTION_TIMED_OUT', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. TOPOLOGY EXPLANATION BANNER */}
      <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-blue-100">
            <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
            <span>Praktik Konfigurasi Perangkat Jaringan Nyata</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Simulator Topologi & Terminal Konfigurasi CLI 💻
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            Klik salah satu perangkat di diagram topologi (<strong>Switch Catalyst</strong>, <strong>Router Cisco</strong>, atau <strong>PC Komputer Siswa</strong>) untuk membuka terminal konsolnya. Lakukan konfigurasi perintah Cisco IOS secara bertahap dan buktikan hasilnya melalui uji ping atau web browser!
          </p>
        </div>
      </div>

      {/* 2. VISUAL TOPOLOGY DIAGRAM (CLICKABLE NODES) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-sm font-black text-slate-900">Peta Topologi Interaktif</h3>
            <p className="text-xs text-slate-500">Klik ikon perangkat untuk membuka konsol konfigurasinya</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${networkConfig.routerOnAStickActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
              Status Routing: {networkConfig.routerOnAStickActive ? 'Inter-VLAN Active 🟢' : 'Belum Dikonfigurasi 🟡'}
            </span>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative rounded-2xl bg-linear-to-b from-slate-50 via-white to-slate-50 border border-slate-200/90 p-6 flex flex-col items-center justify-between min-h-[320px]">
          {/* Top: Router Cisco */}
          <button
            onClick={() => setSelectedDevice('router')}
            className={`flex flex-col items-center p-3 rounded-2xl border transition-all cursor-pointer ${
              selectedDevice === 'router'
                ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-400'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Server className="w-6 h-6" />
            </div>
            <span className="text-xs font-black text-slate-900 mt-1">Router RTR-GW</span>
            <span className="text-[10px] font-mono text-slate-500">Gi0/0 (802.1Q Sub-if)</span>
            {networkConfig.routerOnAStickActive && (
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.2 rounded mt-1">
                dot1Q UP
              </span>
            )}
          </button>

          {/* Trunk Cable */}
          <div className="w-1 h-10 bg-indigo-300 my-1 relative">
            <span className="absolute -left-16 top-2 text-[9px] font-mono text-indigo-700 bg-indigo-50 px-1 rounded">
              Gi0/1 Trunk
            </span>
          </div>

          {/* Middle: Switch Catalyst */}
          <button
            onClick={() => setSelectedDevice('switch')}
            className={`flex flex-col items-center p-3 rounded-2xl border transition-all cursor-pointer ${
              selectedDevice === 'switch'
                ? 'border-teal-600 bg-teal-50 shadow-md ring-2 ring-teal-400'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-md">
              <Network className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-xs font-black text-slate-900 mt-1">Switch SW-CORE-SIJA</span>
            <span className="text-[10px] font-mono text-slate-500">Catalyst 2960 L2</span>
          </button>

          {/* Access Cables */}
          <div className="w-72 h-8 border-b-2 border-slate-300 border-x-2 rounded-b-xl my-1" />

          {/* Bottom End Devices */}
          <div className="w-full grid grid-cols-2 gap-4 max-w-md pt-2">
            {/* PC-1 Siswa */}
            <button
              onClick={() => setSelectedDevice('pc1')}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                selectedDevice === 'pc1'
                  ? 'border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-400'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white mx-auto flex items-center justify-center shadow-xs">
                <Laptop className="w-5 h-5" />
              </div>
              <div className="text-xs font-black text-slate-900 mt-1">PC-1 (Siswa Lab)</div>
              <div className="text-[10px] font-mono text-slate-500">192.168.10.15</div>
              <span className="text-[9px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full inline-block mt-1">
                Port Fa0/1 • VLAN 10
              </span>
            </button>

            {/* Server CBT */}
            <button
              onClick={() => setSelectedDevice('server')}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                selectedDevice === 'server'
                  ? 'border-emerald-600 bg-emerald-50 shadow-md ring-2 ring-emerald-400'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-xs">
                <Server className="w-5 h-5" />
              </div>
              <div className="text-xs font-black text-slate-900 mt-1">Web Server CBT</div>
              <div className="text-[10px] font-mono text-slate-500">192.168.30.100</div>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                Port Fa0/3 • VLAN 30
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. DEVICE CONSOLE & CONFIGURATION WORKBENCH */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        {/* Active Device Tab Switcher */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-700">Perangkat Aktif:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSelectedDevice('switch')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDevice === 'switch' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Switch Catalyst (CLI)
              </button>
              <button
                onClick={() => setSelectedDevice('router')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDevice === 'router' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Router Cisco (CLI)
              </button>
              <button
                onClick={() => setSelectedDevice('pc1')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDevice === 'pc1' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                }`}
              >
                PC-1 Komputer Siswa
              </button>
            </div>
          </div>
        </div>

        {/* VIEW 1: SWITCH CATALYST CONSOLE CLI */}
        {selectedDevice === 'switch' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Terminal Screen (Col 8) */}
            <div className="lg:col-span-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden flex flex-col font-mono text-xs">
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
                <span className="font-bold text-slate-200">SW-CORE-SIJA — Console Line 0</span>
                <span className="text-[11px]">Cisco IOS C2960</span>
              </div>

              <div className="p-4 h-72 overflow-y-auto space-y-1.5 text-slate-200">
                {switchCliHistory.map((item, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {item.type === 'system' && <span className="text-slate-500 italic">{item.text}</span>}
                    {item.type === 'input' && (
                      <div className="font-bold text-slate-100">
                        <span className="text-emerald-400">{item.prompt}</span>
                        <span>{item.text}</span>
                      </div>
                    )}
                    {item.type === 'output' && <pre className="whitespace-pre-wrap text-slate-300 font-mono text-xs">{item.text}</pre>}
                    {item.type === 'success' && <div className="text-emerald-400 font-bold">{item.text}</div>}
                    {item.type === 'error' && <div className="text-rose-400">{item.text}</div>}
                  </div>
                ))}
                <div ref={switchEndRef} />
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSwitchSubmit(); }} className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                <span className="text-emerald-400 font-bold text-xs select-none">
                  {switchMode === 'user' ? 'SW-CORE-SIJA> ' : switchMode === 'priv' ? 'SW-CORE-SIJA# ' : switchMode === 'config' ? 'SW-CORE-SIJA(config)# ' : 'SW-CORE-SIJA(config-if)# '}
                </span>
                <input
                  type="text"
                  value={switchInput}
                  onChange={(e) => setSwitchInput(e.target.value)}
                  placeholder="Ketik command Cisco (contoh: enable, vlan 10, show vlan brief)..."
                  className="flex-1 bg-transparent text-slate-100 text-xs focus:outline-none placeholder-slate-500 font-mono"
                  autoFocus
                />
                <button type="submit" className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-colors cursor-pointer">
                  Send
                </button>
              </form>
            </div>

            {/* Guided Practice Modules for Switch (Col 4) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>Modul Praktik 1: Konfigurasi Switch</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lakukan langkah berikut untuk mengonfigurasi VLAN dan port trunk pada switch:
                </p>

                <div className="space-y-2">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-800">1. Alokasi Port PC ke VLAN 10</div>
                    <button
                      onClick={() => {
                        handleSwitchSubmit('enable');
                        handleSwitchSubmit('configure terminal');
                        handleSwitchSubmit('vlan 10');
                        handleSwitchSubmit('name SISWA_LAB');
                        handleSwitchSubmit('interface Fa0/1');
                        handleSwitchSubmit('switchport mode access');
                        handleSwitchSubmit('switchport access vlan 10');
                      }}
                      className="w-full py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>⚡ Terapkan Konfigurasi VLAN 10</span>
                    </button>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-800">2. Aktifkan Mode 802.1Q TRUNK</div>
                    <button
                      onClick={() => {
                        handleSwitchSubmit('interface Gi0/1');
                        handleSwitchSubmit('switchport mode trunk');
                      }}
                      className="w-full py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>⚡ Terapkan Mode Trunk Gi0/1</span>
                    </button>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-800">3. Verifikasi Tabel VLAN</div>
                    <button
                      onClick={() => handleSwitchSubmit('show vlan brief')}
                      className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold transition-colors cursor-pointer"
                    >
                      Jalankan: show vlan brief
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ROUTER CISCO CONSOLE CLI */}
        {selectedDevice === 'router' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Terminal Screen (Col 8) */}
            <div className="lg:col-span-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden flex flex-col font-mono text-xs">
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
                <span className="font-bold text-slate-200">RTR-GW-SIJA — Console Line 0</span>
                <span className="text-[11px]">Cisco IOS C2900</span>
              </div>

              <div className="p-4 h-72 overflow-y-auto space-y-1.5 text-slate-200">
                {routerCliHistory.map((item, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {item.type === 'system' && <span className="text-slate-500 italic">{item.text}</span>}
                    {item.type === 'input' && (
                      <div className="font-bold text-slate-100">
                        <span className="text-cyan-400">{item.prompt}</span>
                        <span>{item.text}</span>
                      </div>
                    )}
                    {item.type === 'output' && <pre className="whitespace-pre-wrap text-slate-300 font-mono text-xs">{item.text}</pre>}
                    {item.type === 'success' && <div className="text-emerald-400 font-bold">{item.text}</div>}
                    {item.type === 'error' && <div className="text-rose-400">{item.text}</div>}
                  </div>
                ))}
                <div ref={routerEndRef} />
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleRouterSubmit(); }} className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                <span className="text-cyan-400 font-bold text-xs select-none">
                  {routerMode === 'user' ? 'RTR-GW-SIJA> ' : routerMode === 'priv' ? 'RTR-GW-SIJA# ' : routerMode === 'config' ? 'RTR-GW-SIJA(config)# ' : 'RTR-GW-SIJA(config-subif)# '}
                </span>
                <input
                  type="text"
                  value={routerInput}
                  onChange={(e) => setRouterInput(e.target.value)}
                  placeholder="Ketik command Router (contoh: enable, conf t, int gi0/0.10)..."
                  className="flex-1 bg-transparent text-slate-100 text-xs focus:outline-none placeholder-slate-500 font-mono"
                  autoFocus
                />
                <button type="submit" className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-bold transition-colors cursor-pointer">
                  Send
                </button>
              </form>
            </div>

            {/* Guided Practice Modules for Router (Col 4) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                  <Route className="w-4 h-4 text-indigo-600" />
                  <span>Modul Praktik 2: Router-on-a-Stick</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Konfigurasikan sub-interface logis 802.1Q agar router dapat menjembatani paket antara Lab Siswa dan Server CBT:
                </p>

                <div className="space-y-2">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-800">1. Sub-Interface VLAN 10 (Siswa)</div>
                    <button
                      onClick={() => {
                        handleRouterSubmit('enable');
                        handleRouterSubmit('configure terminal');
                        handleRouterSubmit('interface Gi0/0.10');
                        handleRouterSubmit('encapsulation dot1Q 10');
                        handleRouterSubmit('ip address 192.168.10.1 255.255.255.0');
                      }}
                      className="w-full py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>⚡ Konfigurasi Gi0/0.10 (Gateway 10.1)</span>
                    </button>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-800">2. Sub-Interface VLAN 30 (Server)</div>
                    <button
                      onClick={() => {
                        handleRouterSubmit('interface Gi0/0.30');
                        handleRouterSubmit('encapsulation dot1Q 30');
                        handleRouterSubmit('ip address 192.168.30.1 255.255.255.0');
                      }}
                      className="w-full py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>⚡ Konfigurasi Gi0/0.30 (Gateway 30.1)</span>
                    </button>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-800">3. Periksa Tabel Routing</div>
                    <button
                      onClick={() => handleRouterSubmit('show ip route')}
                      className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold transition-colors cursor-pointer"
                    >
                      Jalankan: show ip route
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: PC-1 WORKSTATION (COMMAND PROMPT & WEB BROWSER) */}
        {selectedDevice === 'pc1' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPcTab('cmd')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  pcTab === 'cmd' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Command Prompt (CMD)</span>
              </button>
              <button
                onClick={() => setPcTab('browser')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  pcTab === 'browser' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Web Browser Portal CBT</span>
              </button>
            </div>

            {/* CMD Tab */}
            {pcTab === 'cmd' && (
              <div className="rounded-2xl bg-black border border-slate-800 p-4 font-mono text-xs text-slate-200 shadow-xl space-y-2">
                <div className="text-slate-500 pb-2 border-b border-slate-800 text-[11px]">
                  PC-1 (192.168.10.15) — Command Prompt
                </div>
                <div className="h-60 overflow-y-auto space-y-1">
                  {pcCmdHistory.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap">{line}</div>
                  ))}
                  <div ref={pcEndRef} />
                </div>
                <form onSubmit={handlePcCmdSubmit} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <span className="text-slate-400 select-none">C:\Users\SiswaSIJA&gt;</span>
                  <input
                    type="text"
                    value={pcInput}
                    onChange={(e) => setPcInput(e.target.value)}
                    placeholder="Ketik 'ping 192.168.30.100'..."
                    className="flex-1 bg-transparent text-white text-xs focus:outline-none font-mono"
                    autoFocus
                  />
                  <button type="submit" className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition-colors cursor-pointer">
                    Run
                  </button>
                </form>
              </div>
            )}

            {/* Web Browser Tab */}
            {pcTab === 'browser' && (
              <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-md">
                <form onSubmit={handleOpenBrowser} className="p-3 bg-slate-100 border-b border-slate-200 flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">URL:</span>
                  <input
                    type="text"
                    value={browserUrl}
                    onChange={(e) => setBrowserUrl(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                  <button type="submit" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer">
                    Buka
                  </button>
                </form>

                <div className="p-8 min-h-[220px] flex flex-col items-center justify-center text-center">
                  {browserRendered ? (
                    <div className="space-y-3 animate-in fade-in">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-black text-slate-900">Selamat Datang di Portal Ujian CBT SIJA</h4>
                      <p className="text-xs text-slate-600 max-w-md">
                        HTTP 200 OK — Koneksi lintas VLAN berhasil! PC Siswa (VLAN 10) dapat mengakses aplikasi ujian pada Web Server (VLAN 30) melalui Router-on-a-Stick.
                      </p>
                    </div>
                  ) : (
                    <div className="text-slate-400 space-y-2">
                      <Globe className="w-10 h-10 mx-auto opacity-50" />
                      <p className="text-xs">
                        Ketik <strong>http://192.168.30.100</strong> dan tekan Buka untuk menguji akses web server. Pastikan Router-on-a-Stick sudah aktif!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
