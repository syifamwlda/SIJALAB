import React, { useState, useRef, useEffect } from 'react';
import {
  Network,
  Server,
  Laptop,
  Terminal,
  Layers,
  Route,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  BookOpen,
  Copy,
  Check,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  Radio
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

// Comprehensive Modular Curriculum Topics for Cisco Network Topology
const TOPOLOGY_MODULES = [
  {
    id: 'vlan',
    title: 'Materi 1: VLAN & 802.1Q Trunking',
    tag: 'Switching L2',
    icon: Layers,
    color: 'from-blue-600 to-cyan-600',
    objective: 'Membuat segmentasi jaringan lokal (VLAN 10 Siswa & VLAN 20 Guru) serta mengaktifkan port Trunk 802.1Q.',
    conceptTheory: 'VLAN (Virtual LAN) memecah satu switch fisik menjadi beberapa broadcast domain terpisah. Tanpa trunk 802.1Q, frame dari VLAN yang berbeda tidak bisa melewati kabel antar-switch/router.',
    steps: [
      {
        step: 1,
        title: 'Masuk Global Configuration Mode',
        desc: 'Beralih dari User EXEC ke mode konfigurasi global switch.',
        commands: ['enable', 'configure terminal'],
        expectedKey: 'conf t'
      },
      {
        step: 2,
        title: 'Buat Database VLAN 10 & VLAN 20',
        desc: 'Deklarasikan VLAN ID dan beri nama identitas masing-masing segmen.',
        commands: ['vlan 10', 'name SISWA_LAB', 'vlan 20', 'name GURU_STAFF', 'exit'],
        expectedKey: 'vlan 10'
      },
      {
        step: 3,
        title: 'Alokasikan Port Fa0/1 ke Mode Access VLAN 10',
        desc: 'Port Fa0/1 terhubung ke PC Siswa, atur menjadi switchport access VLAN 10.',
        commands: ['interface FastEthernet0/1', 'switchport mode access', 'switchport access vlan 10', 'exit'],
        expectedKey: 'switchport access vlan 10'
      },
      {
        step: 4,
        title: 'Konfigurasi Port Gi0/1 Menjadi 802.1Q TRUNK',
        desc: 'Port uplink Gi0/1 membawa banyak tag VLAN sekaligus menuju Router.',
        commands: ['interface GigabitEthernet0/1', 'switchport mode trunk', 'exit'],
        expectedKey: 'switchport mode trunk'
      },
      {
        step: 5,
        title: 'Verifikasi Tabel VLAN Switch',
        desc: 'Pastikan VLAN 10 dan 20 sudah aktif dan terikat ke port yang tepat.',
        commands: ['show vlan brief'],
        expectedKey: 'show vlan brief'
      }
    ]
  },
  {
    id: 'stp',
    title: 'Materi 2: Spanning Tree Protocol (STP)',
    tag: 'Loop Prevention',
    icon: Network,
    color: 'from-amber-600 to-orange-600',
    objective: 'Mencegah terjadinya Switching Loop (Broadcast Storm) pada topologi redundan 3 Switch dan menentukan Root Bridge.',
    conceptTheory: 'Ketika switch terhubung segitiga redundan, paket broadcast akan berputar tanpa henti (Loop) dan melumpuhkan jaringan. Spanning Tree Protocol (STP IEEE 802.1D) otomatis memblokir (BLOCKING/Amber) salah satu port untuk memutus loop.',
    steps: [
      {
        step: 1,
        title: 'Periksa Status Spanning Tree Saat Ini',
        desc: 'Amati switch mana yang saat ini menjadi Root Bridge dan port mana yang berstatus BLK (Blocking).',
        commands: ['enable', 'show spanning-tree'],
        expectedKey: 'show spanning-tree'
      },
      {
        step: 2,
        title: 'Jadikan SW-CORE Sebagai Root Bridge Utama',
        desc: 'Turunkan nilai priority STP ke angka 4096 (nilai terkecil = prioritas tertinggi).',
        commands: ['configure terminal', 'spanning-tree vlan 1 priority 4096', 'exit'],
        expectedKey: 'priority 4096'
      },
      {
        step: 3,
        title: 'Aktifkan Rapid-PVST (RSTP) untuk Konvergensi Cepat',
        desc: 'Ganti mode STP standar (30-50 detik) ke Rapid STP (1-2 detik konvergensi).',
        commands: ['configure terminal', 'spanning-tree mode rapid-pvst', 'exit'],
        expectedKey: 'rapid-pvst'
      },
      {
        step: 4,
        title: 'Verifikasi: SW-CORE Menjadi Root Bridge',
        desc: 'Periksa kalimat "This bridge is the root" pada tabel STP.',
        commands: ['show spanning-tree brief'],
        expectedKey: 'show spanning-tree brief'
      }
    ]
  },
  {
    id: 'intervlan',
    title: 'Materi 3: Router-on-a-Stick (Inter-VLAN)',
    tag: 'Routing L3',
    icon: Route,
    color: 'from-indigo-600 to-purple-600',
    objective: 'Mengonfigurasi router Cisco sub-interface dot1Q untuk merutekan paket antar-VLAN yang terisolasi.',
    conceptTheory: 'VLAN 10 dan VLAN 20 terisolasi di Layer 2 switch. Agar PC Siswa bisa berkomunikasi dengan PC Guru atau Server CBT, router harus membongkar tag 802.1Q dan merutekannya di Layer 3.',
    steps: [
      {
        step: 1,
        title: 'Aktifkan Fisik Interface Utama Router',
        desc: 'Buka antarmuka fisik Gi0/0 tanpa memberikan IP address.',
        commands: ['enable', 'configure terminal', 'interface GigabitEthernet0/0', 'no shutdown', 'exit'],
        expectedKey: 'no shutdown'
      },
      {
        step: 2,
        title: 'Konfigurasi Sub-Interface Gi0/0.10 (Gateway Siswa)',
        desc: 'Terapkan enkapsulasi dot1Q VLAN 10 dan tetapkan IP Gateway 192.168.10.1.',
        commands: ['interface GigabitEthernet0/0.10', 'encapsulation dot1Q 10', 'ip address 192.168.10.1 255.255.255.0', 'exit'],
        expectedKey: 'encapsulation dot1q 10'
      },
      {
        step: 3,
        title: 'Konfigurasi Sub-Interface Gi0/0.20 (Gateway Guru)',
        desc: 'Terapkan enkapsulasi dot1Q VLAN 20 dan tetapkan IP Gateway 192.168.20.1.',
        commands: ['interface GigabitEthernet0/0.20', 'encapsulation dot1Q 20', 'ip address 192.168.20.1 255.255.255.0', 'exit'],
        expectedKey: 'encapsulation dot1q 20'
      },
      {
        step: 4,
        title: 'Verifikasi Tabel Routing Inter-VLAN',
        desc: 'Pastikan kedua subnet VLAN berstatus Directly Connected (C) pada tabel routing.',
        commands: ['show ip route'],
        expectedKey: 'show ip route'
      }
    ]
  },
  {
    id: 'ospf',
    title: 'Materi 4: Routing Dinamis OSPF',
    tag: 'Dynamic Routing',
    icon: Zap,
    color: 'from-emerald-600 to-teal-600',
    objective: 'Mengonfigurasi protokol OSPF Process ID 1 Area 0 untuk pertukaran tabel rute otomatis antar-router.',
    conceptTheory: 'OSPF (Open Shortest Path First) menggunakan algoritma Dijkstra Shortest Path First untuk menghitung jalur tercepat berdasarkan metrik Bandwidth (Cost).',
    steps: [
      {
        step: 1,
        title: 'Aktifkan Proses Routing OSPF',
        desc: 'Masuk ke mode konfigurasi router OSPF dengan Process ID 1.',
        commands: ['enable', 'configure terminal', 'router ospf 1', 'router-id 1.1.1.1'],
        expectedKey: 'router ospf 1'
      },
      {
        step: 2,
        title: 'Daftarkan Jaringan Subnet Siswa ke Area 0',
        desc: 'Gunakan wildcard mask 0.0.0.255 untuk mengiklankan network 192.168.10.0.',
        commands: ['network 192.168.10.0 0.0.0.255 area 0'],
        expectedKey: 'network 192.168.10.0'
      },
      {
        step: 3,
        title: 'Daftarkan Jaringan Backbone WAN ke Area 0',
        desc: 'Iklankan link serial antar-router 10.10.10.0/30 (wildcard 0.0.0.3).',
        commands: ['network 10.10.10.0 0.0.0.3 area 0', 'exit'],
        expectedKey: '10.10.10.0'
      },
      {
        step: 4,
        title: 'Verifikasi Tetangga OSPF (Neighbor Adjacency)',
        desc: 'Pastikan router membentuk relasi Full Adjacency dengan router tetangga.',
        commands: ['show ip ospf neighbor'],
        expectedKey: 'show ip ospf neighbor'
      }
    ]
  }
];

export const NetworkTopologySimulator = () => {
  const { addXP, showToast } = useApp();

  // Active Selected Module
  const [activeModuleId, setActiveModuleId] = useState('vlan');
  const activeModule = TOPOLOGY_MODULES.find((m) => m.id === activeModuleId) || TOPOLOGY_MODULES[0];

  // Active Step in current module
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Terminal Console State
  const [cliHistory, setCliHistory] = useState([]);
  const [cliInput, setCliInput] = useState('');
  const [cliPrompt, setCliPrompt] = useState('Switch>');
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [copiedText, setCopiedText] = useState(null);

  // Live Simulated State based on CLI actions
  const [simState, setSimState] = useState({
    // VLAN State
    vlan10Active: false,
    vlan20Active: false,
    portFa01Vlan: '1',
    portGi01Mode: 'access',
    // STP State
    stpRootBridge: 'SW-DIST-02',
    swCorePriority: 32768,
    stpMode: 'pvst',
    sw3PortStatus: 'BLOCKING (Amber)', // Blocking to prevent loop
    // Router Inter-VLAN State
    gi00Up: false,
    subif10Up: false,
    subif20Up: false,
    // OSPF State
    ospfActive: false,
    ospfArea0: false,
    ospfNeighbors: 0
  });

  const cliEndRef = useRef(null);

  // Initialize terminal on module change
  useEffect(() => {
    setCurrentStepIdx(0);
    const initialPrompt =
      activeModule.id === 'intervlan' || activeModule.id === 'ospf'
        ? 'Router>'
        : 'Switch>';
    setCliPrompt(initialPrompt);

    setCliHistory([
      { type: 'system', text: `======================================================` },
      { type: 'system', text: `🖥️  SIJALAB CISCO IOS CLI SANDBOX — ${activeModule.title}` },
      { type: 'system', text: `Ikuti panduan langkah CLI di panel kanan. Ketik perintah persis atau klik '⚡ Jalankan ke Konsol'.` },
      { type: 'system', text: `======================================================` }
    ]);
  }, [activeModuleId]);

  useEffect(() => {
    cliEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [cliHistory]);

  // Execute CLI Command
  const executeCliCommand = (customCmd) => {
    const raw = (customCmd || cliInput).trim();
    if (!raw) return;
    setCliInput('');

    const lower = raw.toLowerCase();
    const newEntries = [{ type: 'input', prompt: cliPrompt, text: raw }];

    if (lower === 'clear') {
      setCliHistory([]);
      return;
    }

    // --- PROMPT MODE SWITCHING ---
    if (lower === 'enable' || lower === 'en') {
      const hostname = activeModule.id === 'intervlan' || activeModule.id === 'ospf' ? 'Router#' : 'Switch#';
      setCliPrompt(hostname);
      newEntries.push({ type: 'output', text: 'Beralih ke Privileged EXEC Mode.' });
    } else if (lower === 'configure terminal' || lower === 'conf t') {
      const hostname = activeModule.id === 'intervlan' || activeModule.id === 'ospf' ? 'Router(config)#' : 'Switch(config)#';
      setCliPrompt(hostname);
      newEntries.push({ type: 'output', text: 'Enter configuration commands, one per line. End with CNTL/Z.' });
    } else if (lower.startsWith('vlan 10')) {
      setCliPrompt('Switch(config-vlan)#');
      setSimState((prev) => ({ ...prev, vlan10Active: true }));
      newEntries.push({ type: 'success', text: 'VLAN 10 berhasil dibuat pada database switch.' });
    } else if (lower.startsWith('vlan 20')) {
      setCliPrompt('Switch(config-vlan)#');
      setSimState((prev) => ({ ...prev, vlan20Active: true }));
      newEntries.push({ type: 'success', text: 'VLAN 20 berhasil dibuat.' });
    } else if (lower.includes('switchport access vlan 10')) {
      setSimState((prev) => ({ ...prev, portFa01Vlan: '10' }));
      newEntries.push({ type: 'success', text: 'Port Fa0/1 dialokasikan ke VLAN 10 (SISWA_LAB).' });
    } else if (lower.includes('switchport mode trunk')) {
      setSimState((prev) => ({ ...prev, portGi01Mode: 'trunk' }));
      newEntries.push({ type: 'success', text: 'Port Gi0/1 berubah status menjadi IEEE 802.1Q TRUNK port.' });
    } else if (lower.includes('show vlan brief')) {
      newEntries.push({
        type: 'output',
        text: `VLAN  Name               Status    Ports\n----  ------------------ --------- -------------------\n1     default            active    Fa0/2 - Fa0/24\n10    SISWA_LAB          active    Fa0/1\n20    GURU_STAFF         active    Fa0/3, Fa0/4`
      });
    }

    // --- STP COMMANDS ---
    else if (lower.includes('show spanning-tree brief') || lower === 'show spanning-tree') {
      newEntries.push({
        type: 'output',
        text: `VLAN0001
  Spanning tree enabled protocol ${simState.stpMode}
  Root ID    Priority    ${simState.swCorePriority === 4096 ? '4096' : '32768'}
             Address     0014.f2d3.aa01
             ${simState.swCorePriority === 4096 ? 'This bridge is the root' : 'Cost 19, Port 1 (GigabitEthernet0/1)'}

Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Gi0/1            Root FWD 4         128.1    P2p
Gi0/2            Desg FWD 4         128.2    P2p
Fa0/1            Desg FWD 19        128.3    P2p Edge`
      });
    } else if (lower.includes('priority 4096')) {
      setSimState((prev) => ({
        ...prev,
        swCorePriority: 4096,
        stpRootBridge: 'SW-CORE (Ini adalah Root Bridge!)'
      }));
      newEntries.push({
        type: 'success',
        text: 'Priority STP diturunkan menjadi 4096! SW-CORE memenangkan pemilu dan menjadi ROOT BRIDGE.'
      });
    } else if (lower.includes('rapid-pvst')) {
      setSimState((prev) => ({ ...prev, stpMode: 'rstp' }));
      newEntries.push({
        type: 'success',
        text: 'Mode Spanning-Tree diubah menjadi Rapid-PVST (RSTP 802.1w) — konvergensi instan 1-2 detik.'
      });
    }

    // --- ROUTER INTER-VLAN COMMANDS ---
    else if (lower.includes('no shutdown') && cliPrompt.includes('config-if')) {
      setSimState((prev) => ({ ...prev, gi00Up: true }));
      newEntries.push({
        type: 'output',
        text: '%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up\n%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up'
      });
    } else if (lower.includes('encapsulation dot1q 10')) {
      setSimState((prev) => ({ ...prev, subif10Up: true }));
      newEntries.push({ type: 'success', text: 'Enkapsulasi 802.1Q VLAN 10 aktif pada Gi0/0.10.' });
    } else if (lower.includes('encapsulation dot1q 20') || lower.includes('encapsulation dot1q 30')) {
      setSimState((prev) => ({ ...prev, subif20Up: true }));
      newEntries.push({ type: 'success', text: 'Enkapsulasi 802.1Q aktif pada sub-interface.' });
    } else if (lower.includes('show ip route')) {
      newEntries.push({
        type: 'output',
        text: `Codes: C - connected, S - static, R - RIP, O - OSPF\nGateway of last resort is not set\n\nC    192.168.10.0/24 is directly connected, GigabitEthernet0/0.10\nC    192.168.20.0/24 is directly connected, GigabitEthernet0/0.20`
      });
    }

    // --- OSPF COMMANDS ---
    else if (lower.includes('router ospf')) {
      setCliPrompt('Router(config-router)#');
      setSimState((prev) => ({ ...prev, ospfActive: true }));
      newEntries.push({ type: 'output', text: 'Memulai proses routing OSPF Process ID 1.' });
    } else if (lower.includes('network 192.168.10.0') || lower.includes('network 10.10.10.0')) {
      setSimState((prev) => ({ ...prev, ospfArea0: true, ospfNeighbors: 1 }));
      newEntries.push({ type: 'success', text: 'Subnet berhasil diiklankan ke OSPF Area 0 Backbone!' });
    } else if (lower.includes('show ip ospf neighbor')) {
      newEntries.push({
        type: 'output',
        text: `Neighbor ID     Pri   State           Dead Time   Address         Interface\n2.2.2.2           1   FULL/BDR        00:00:34    10.10.10.2      GigabitEthernet0/0\n(1 tetangga terhubung secara FULL Adjacency)`
      });
    } else if (lower === 'exit') {
      const base = activeModule.id === 'intervlan' || activeModule.id === 'ospf' ? 'Router' : 'Switch';
      if (cliPrompt.includes('(')) setCliPrompt(`${base}(config)#`);
      else setCliPrompt(`${base}#`);
    } else {
      newEntries.push({
        type: 'error',
        text: `% Perintah "${raw}" tidak dikenali. Ikuti petunjuk perintah pada panduan modul di sebelah kanan.`
      });
    }

    // Check step progress
    const currentStepObj = activeModule.steps[currentStepIdx];
    if (currentStepObj && lower.includes(currentStepObj.expectedKey.toLowerCase())) {
      const stepId = `${activeModule.id}-${currentStepObj.step}`;
      if (!completedSteps.has(stepId)) {
        setCompletedSteps((prev) => new Set([...prev, stepId]));
        addXP(25);
        if (showToast) showToast(`Langkah ${currentStepObj.step} Selesai! (+25 XP)`, 'success');
      }
    }

    setCliHistory((prev) => [...prev, ...newEntries]);
  };

  const handleCopyCmd = (text) => {
    setCliInput(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const handleRunAllStepCommands = (cmdList) => {
    cmdList.forEach((cmd) => {
      executeCliCommand(cmd);
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. CURRICULUM TOPIC SELECTOR */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
              <Terminal className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">Lab Topologi Cisco & Panduan CLI Terstruktur</h2>
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded-full">
                  Guided CLI Lab v3.0
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Bukan cuma klik-klik! Praktikkan sintaks CLI Cisco IOS langkah demi langkah sesuai kurikulum jaringan komputer SMK SIJA.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setCliHistory([]);
              setSimState({
                vlan10Active: false,
                vlan20Active: false,
                portFa01Vlan: '1',
                portGi01Mode: 'access',
                stpRootBridge: 'SW-DIST-02',
                swCorePriority: 32768,
                stpMode: 'pvst',
                sw3PortStatus: 'BLOCKING (Amber)',
                gi00Up: false,
                subif10Up: false,
                subif20Up: false,
                ospfActive: false,
                ospfArea0: false,
                ospfNeighbors: 0
              });
              setCompletedSteps(new Set());
            }}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 self-start lg:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Seluruh Konfigurasi</span>
          </button>
        </div>

        {/* 4 Topic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          {TOPOLOGY_MODULES.map((mod) => {
            const Icon = mod.icon;
            const isSelected = activeModuleId === mod.id;
            const completedCount = mod.steps.filter((s) => completedSteps.has(`${mod.id}-${s.step}`)).length;

            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200/80 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white bg-linear-to-tr ${mod.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${completedCount === mod.steps.length ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200/60 text-slate-600'}`}>
                    {completedCount}/{mod.steps.length} Selesai
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 leading-snug">{mod.title}</h4>
                  <span className="text-[10px] text-slate-500 font-medium">{mod.tag}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. LIVE DYNAMIC TOPOLOGY DIAGRAM FOR ACTIVE MODULE */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-black text-slate-900">
              Visual Topologi: {activeModule.title}
            </h3>
            <p className="text-xs text-slate-500">
              {activeModule.objective}
            </p>
          </div>
          <div className="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            Status: <span className="text-blue-600 font-black">Terhubung ke Konsol CLI</span>
          </div>
        </div>

        {/* DIAGRAM A: VLAN & TRUNKING CANVAS */}
        {activeModule.id === 'vlan' && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-around gap-6">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-white flex items-center justify-center shadow-lg">
                <Network className="w-7 h-7 text-cyan-400" />
              </div>
              <span className="text-xs font-black text-slate-900 mt-1">Switch SW-CORE-SIJA</span>
              <span className="text-[10px] font-mono text-slate-500">Catalyst 2960</span>
              <div className="flex gap-1 mt-1 font-mono text-[9px]">
                <span className={`px-1.5 py-0.5 rounded font-bold ${simState.vlan10Active ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-500'}`}>
                  VLAN 10: {simState.vlan10Active ? 'ACTIVE' : 'NONE'}
                </span>
                <span className={`px-1.5 py-0.5 rounded font-bold ${simState.portGi01Mode === 'trunk' ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-500'}`}>
                  Gi0/1: {simState.portGi01Mode === 'trunk' ? '802.1Q TRUNK' : 'ACCESS'}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                <Laptop className="w-6 h-6 text-blue-600 mx-auto" />
                <span className="text-xs font-bold text-slate-800 block mt-1">PC-1 Siswa (Lab SIJA 1)</span>
                <span className="text-[10px] font-mono text-slate-500">Fa0/1 • VLAN {simState.portFa01Vlan}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                <Laptop className="w-6 h-6 text-purple-600 mx-auto" />
                <span className="text-xs font-bold text-slate-800 block mt-1">PC-2 Guru (Staff SIJA)</span>
                <span className="text-[10px] font-mono text-slate-500">Fa0/2 • VLAN 20</span>
              </div>
            </div>
          </div>
        )}

        {/* DIAGRAM B: STP (SPANNING TREE PROTOCOL) TRIANGLE CANVAS */}
        {activeModule.id === 'stp' && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center space-y-4">
            <div className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-lg transition-colors ${simState.swCorePriority === 4096 ? 'bg-emerald-600 ring-4 ring-emerald-200' : 'bg-slate-800'}`}>
                <Network className="w-7 h-7" />
              </div>
              <span className="text-xs font-black text-slate-900 mt-1">SW-CORE (Switch 1)</span>
              <span className="text-[10px] font-mono font-bold text-emerald-600">
                Priority: {simState.swCorePriority} {simState.swCorePriority === 4096 ? '⭐ ROOT BRIDGE' : ''}
              </span>
            </div>

            <div className="w-80 h-10 border-b-2 border-slate-300 border-x-2 rounded-b-xl relative">
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                FWD (Forwarding Link)
              </span>
            </div>

            <div className="flex items-center justify-between w-80 pt-2">
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                <Network className="w-6 h-6 text-blue-600 mx-auto" />
                <span className="text-xs font-bold text-slate-800 block mt-1">SW-DIST-02</span>
                <span className="text-[9px] font-mono text-slate-500">Priority 32768</span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                <Network className="w-6 h-6 text-amber-600 mx-auto" />
                <span className="text-xs font-bold text-slate-800 block mt-1">SW-ACCESS-03</span>
                <span className="text-[9px] font-mono font-bold text-amber-600 bg-amber-50 px-1 rounded block mt-0.5">
                  Port Fa0/2: {simState.sw3PortStatus}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* DIAGRAM C: ROUTER-ON-A-STICK CANVAS */}
        {activeModule.id === 'intervlan' && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-around gap-6">
            <div className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-lg ${simState.subif10Up && simState.subif20Up ? 'bg-indigo-600 ring-4 ring-indigo-200' : 'bg-slate-700'}`}>
                <Server className="w-7 h-7" />
              </div>
              <span className="text-xs font-black text-slate-900 mt-1">Router RTR-GW-SIJA</span>
              <div className="flex gap-1 mt-1 font-mono text-[9px]">
                <span className={`px-1.5 py-0.5 rounded font-bold ${simState.subif10Up ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                  Gi0/0.10: {simState.subif10Up ? '192.168.10.1 (UP)' : 'DOWN'}
                </span>
                <span className={`px-1.5 py-0.5 rounded font-bold ${simState.subif20Up ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                  Gi0/0.20: {simState.subif20Up ? '192.168.20.1 (UP)' : 'DOWN'}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                <Laptop className="w-6 h-6 text-blue-600 mx-auto" />
                <span className="text-xs font-bold text-slate-800 block mt-1">PC Siswa (VLAN 10)</span>
                <span className="text-[10px] font-mono text-slate-500">IP: 192.168.10.15</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
                <Server className="w-6 h-6 text-emerald-600 mx-auto" />
                <span className="text-xs font-bold text-slate-800 block mt-1">Web Server CBT (VLAN 20/30)</span>
                <span className="text-[10px] font-mono text-slate-500">IP: 192.168.20.100</span>
              </div>
            </div>
          </div>
        )}

        {/* DIAGRAM D: OSPF ROUTING CANVAS */}
        {activeModule.id === 'ospf' && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-around gap-6">
            <div className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-lg ${simState.ospfArea0 ? 'bg-emerald-600 ring-4 ring-emerald-200' : 'bg-slate-700'}`}>
                <Zap className="w-7 h-7" />
              </div>
              <span className="text-xs font-black text-slate-900 mt-1">Router R1 (SIJA Lab)</span>
              <span className="text-[10px] font-mono text-slate-500">Router-ID 1.1.1.1</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded mt-1 ${simState.ospfArea0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                OSPF: {simState.ospfArea0 ? 'Area 0 Active (1 Neighbor FULL)' : 'OFF'}
              </span>
            </div>

            <div className="w-16 h-0.5 bg-emerald-400 border-t-2 border-dashed border-emerald-500 my-2" />

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-white flex items-center justify-center shadow-lg">
                <Server className="w-7 h-7 text-cyan-400" />
              </div>
              <span className="text-xs font-black text-slate-900 mt-1">Router R2 (ISP Cloud)</span>
              <span className="text-[10px] font-mono text-slate-500">Router-ID 2.2.2.2</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 mt-1">
                OSPF Area 0 Backbone
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. CISCO IOS CLI CONSOLE & STEP-BY-STEP GUIDED MODULE (THE CORE REQUEST) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CLI Console Terminal (Col 7) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col font-mono text-xs">
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400 select-none">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-300 font-bold ml-1.5">
                Cisco IOS Live Console — {activeModule.title.split(':')[1]}
              </span>
            </div>
            <span className="text-[11px] text-slate-500">VT100 Emulation</span>
          </div>

          {/* Terminal Screen */}
          <div className="p-4 h-80 overflow-y-auto space-y-1.5 text-slate-200">
            {cliHistory.map((item, idx) => (
              <div key={idx} className="leading-relaxed">
                {item.type === 'system' && <span className="text-slate-500 italic">{item.text}</span>}
                {item.type === 'input' && (
                  <div className="font-bold text-slate-100">
                    <span className="text-cyan-400 select-none">{item.prompt}</span>
                    <span>{item.text}</span>
                  </div>
                )}
                {item.type === 'output' && (
                  <pre className="whitespace-pre-wrap text-slate-300 font-mono text-xs bg-slate-900/50 p-2 rounded border border-slate-800/60 my-1">
                    {item.text}
                  </pre>
                )}
                {item.type === 'success' && (
                  <div className="text-emerald-400 font-bold bg-emerald-950/20 p-1.5 rounded border border-emerald-900/40">
                    {item.text}
                  </div>
                )}
                {item.type === 'error' && (
                  <div className="text-rose-400 bg-rose-950/30 p-1.5 rounded border border-rose-900/40">
                    {item.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={cliEndRef} />
          </div>

          {/* CLI Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCliCommand();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <span className="text-cyan-400 font-bold select-none text-xs sm:text-sm pl-1">
              {cliPrompt}
            </span>
            <input
              type="text"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              placeholder="Ketik perintah Cisco (contoh: enable, vlan 10, show spanning-tree)..."
              className="flex-1 bg-transparent text-slate-100 text-xs sm:text-sm focus:outline-none placeholder-slate-500 font-mono"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Send</span>
            </button>
          </form>
        </div>

        {/* Guided Step-by-Step CLI Walkthrough (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-black text-slate-900">Panduan Langkah Perintah CLI</h3>
              </div>
              <span className="text-[10px] font-bold text-slate-500">
                {activeModule.steps.length} Langkah Praktikum
              </span>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 leading-relaxed">
              💡 <strong>Teori Inti:</strong> {activeModule.conceptTheory}
            </div>

            {/* Steps Accordion / List */}
            <div className="space-y-3">
              {activeModule.steps.map((s, idx) => {
                const stepId = `${activeModule.id}-${s.step}`;
                const isDone = completedSteps.has(stepId);

                return (
                  <div
                    key={s.step}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isDone
                        ? 'border-emerald-300 bg-emerald-50/60'
                        : 'border-slate-200 bg-slate-50/70 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-start gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                          {s.step}
                        </span>
                        <div>
                          <h4 className="text-xs font-black text-slate-900 leading-snug">{s.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
                        </div>
                      </div>
                      {isDone && (
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Selesai
                        </span>
                      )}
                    </div>

                    {/* Command Box */}
                    <div className="mt-2 p-2 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-200 space-y-1">
                      {s.commands.map((cmd, cIdx) => (
                        <div key={cIdx} className="flex items-center justify-between text-cyan-300">
                          <span>{cmd}</span>
                          <button
                            onClick={() => handleCopyCmd(cmd)}
                            className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
                            title="Salin baris ini ke input CLI"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Quick Run Button */}
                    <div className="mt-2.5 flex justify-end">
                      <button
                        onClick={() => handleRunAllStepCommands(s.commands)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <Zap className="w-3 h-3 fill-white" />
                        <span>⚡ Jalankan Baris Perintah Langkah Ini</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
