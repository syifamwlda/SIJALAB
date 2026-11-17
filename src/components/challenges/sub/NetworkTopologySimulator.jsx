import React, { useState, useEffect } from 'react';
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
  SlidersHorizontal,
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
  FileCode,
  Terminal
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

// Initial Topology Data
const INITIAL_VLANS = [
  { id: 10, name: 'SISWA_LAB', subnet: '192.168.10.0/24', color: 'border-blue-500 text-blue-600 bg-blue-50', badgeColor: 'bg-blue-600' },
  { id: 20, name: 'GURU_STAFF', subnet: '192.168.20.0/24', color: 'border-purple-500 text-purple-600 bg-purple-50', badgeColor: 'bg-purple-600' },
  { id: 30, name: 'SERVER_CBT', subnet: '192.168.30.0/24', color: 'border-emerald-500 text-emerald-600 bg-emerald-50', badgeColor: 'bg-emerald-600' }
];

export const NetworkTopologySimulator = () => {
  const { addXP, showToast } = useApp();

  // Active sub-mode: 'test' (End Devices), 'switching' (VLAN & Ports), 'routing' (Router-on-a-Stick)
  const [activeTab, setActiveTab] = useState('test');

  // Switching Config State
  const [switchPorts, setSwitchPorts] = useState({
    'Fa0/1': { mode: 'access', vlan: 10, device: 'pc1', label: 'PC-1 (Siswa)' },
    'Fa0/2': { mode: 'access', vlan: 20, device: 'pc2', label: 'PC-2 (Guru)' },
    'Fa0/3': { mode: 'access', vlan: 30, device: 'server', label: 'Server CBT' },
    'Gi0/1': { mode: 'trunk', allowedVlans: [10, 20, 30], device: 'router', label: 'Uplink Router' }
  });

  // Routing Config State (Router-on-a-Stick)
  const [interVlanRoutingEnabled, setInterVlanRoutingEnabled] = useState(true);
  const [subInterfaces, setSubInterfaces] = useState({
    'Gi0/0.10': { vlan: 10, ip: '192.168.10.1', status: 'up' },
    'Gi0/0.20': { vlan: 20, ip: '192.168.20.1', status: 'up' },
    'Gi0/0.30': { vlan: 30, ip: '192.168.30.1', status: 'up' }
  });

  // End Devices State
  const [devices, setDevices] = useState({
    pc1: {
      id: 'pc1',
      name: 'PC-1 Siswa',
      ip: '192.168.10.15',
      subnet: '255.255.255.0',
      gateway: '192.168.10.1',
      vlan: 10,
      port: 'Fa0/1',
      icon: Laptop,
      color: 'bg-blue-600'
    },
    pc2: {
      id: 'pc2',
      name: 'PC-2 Guru',
      ip: '192.168.20.25',
      subnet: '255.255.255.0',
      gateway: '192.168.20.1',
      vlan: 20,
      port: 'Fa0/2',
      icon: Laptop,
      color: 'bg-purple-600'
    },
    server: {
      id: 'server',
      name: 'Web Server CBT',
      ip: '192.168.30.100',
      subnet: '255.255.255.0',
      gateway: '192.168.30.1',
      vlan: 30,
      port: 'Fa0/3',
      icon: Server,
      color: 'bg-emerald-600'
    }
  });

  // Test Station State
  const [testType, setTestType] = useState('ping'); // 'ping', 'http', 'dhcp'
  const [testSource, setTestSource] = useState('pc1');
  const [testTarget, setTestTarget] = useState('server');
  const [isTesting, setIsTesting] = useState(false);
  const [testLogs, setTestLogs] = useState([]);
  const [testResult, setTestResult] = useState(null); // 'success', 'failed'
  const [packetStep, setPacketStep] = useState(0); // For packet animation

  // Run Test (Ping, HTTP, DHCP)
  const handleRunTest = () => {
    setIsTesting(true);
    setTestLogs([]);
    setTestResult(null);
    setPacketStep(1);

    const src = devices[testSource];
    const dst = devices[testTarget];
    const srcPort = switchPorts[src.port];
    const dstPort = switchPorts[dst.port];
    const isSameVlan = srcPort.vlan === dstPort.vlan;

    const logs = [];

    // Step 1: Packet initiation
    logs.push(`[1/4] Menginisialisasi paket ${testType.toUpperCase()} dari ${src.name} (${src.ip})...`);

    setTimeout(() => {
      setPacketStep(2);
      // Step 2: Switch Layer 2 Inspection
      if (srcPort.mode !== 'access' && srcPort.mode !== 'trunk') {
        logs.push(`[2/4] [GAGAL] Port switch ${src.port} dalam status shutdown/mati.`);
        finishTest(false, logs);
        return;
      }

      logs.push(`[2/4] Paket memasuki Switch Catalyst pada port ${src.port} (VLAN ${srcPort.vlan}).`);

      setTimeout(() => {
        setPacketStep(3);
        // Step 3: Layer 2 vs Layer 3 Routing
        if (testType === 'dhcp') {
          // DHCP Test
          logs.push(`[3/4] DHCP DISCOVER broadcast dikirim via VLAN ${srcPort.vlan}...`);
          logs.push(`[3/4] Router-on-a-Stick DHCP Relay menyambut permintaan...`);
          setTimeout(() => {
            setPacketStep(4);
            logs.push(`[4/4] DHCP OFFER & ACK diterima! IP berhasil diperbarui secara otomatis.`);
            finishTest(true, logs);
          }, 600);
          return;
        }

        if (isSameVlan) {
          // Same VLAN switching
          logs.push(`[3/4] Tujuan berada dalam VLAN yang sama (${srcPort.vlan}). Switching langsung via MAC table.`);
          setTimeout(() => {
            setPacketStep(4);
            if (testType === 'http') {
              logs.push(`[4/4] HTTP 200 OK — Halaman Web Portal CBT berhasil dimuat!`);
            } else {
              logs.push(`[4/4] Ping Berhasil! 4 packets transmitted, 4 received, 0% packet loss, RTT 0.8ms.`);
            }
            finishTest(true, logs);
          }, 600);
        } else {
          // Inter-VLAN Routing required
          logs.push(`[3/4] Perbedaan VLAN terdeteksi (VLAN ${srcPort.vlan} -> VLAN ${dstPort.vlan}). Meneruskan ke 802.1Q Trunk (Gi0/1)...`);

          if (!interVlanRoutingEnabled) {
            logs.push(`[4/4] [GAGAL] Inter-VLAN Routing pada Router nonaktif! Paket di-drop.`);
            logs.push(`[SOLUSI] Aktifkan Inter-VLAN Routing pada tab "Routing (L3)" agar router dapat menjembatani sub-interface.`);
            finishTest(false, logs);
            return;
          }

          // Check subinterfaces
          const srcSub = subInterfaces[`Gi0/0.${srcPort.vlan}`];
          const dstSub = subInterfaces[`Gi0/0.${dstPort.vlan}`];

          if (!srcSub || !dstSub || srcSub.status !== 'up' || dstSub.status !== 'up') {
            logs.push(`[4/4] [GAGAL] Sub-interface router Gi0/0.${srcPort.vlan} atau Gi0/0.${dstPort.vlan} down.`);
            finishTest(false, logs);
            return;
          }

          setTimeout(() => {
            setPacketStep(4);
            logs.push(`[3.5/4] Router membongkar tag 802.1Q, merutekan paket dari Gi0/0.${srcPort.vlan} ke Gi0/0.${dstPort.vlan}.`);
            if (testType === 'http') {
              logs.push(`[4/4] [SUKSES] HTTP/1.1 200 OK — Web Server CBT ${dst.ip} berhasil diakses dari ${src.name}!`);
            } else {
              logs.push(`[4/4] [SUKSES] Ping Lintas-VLAN Berhasil! 4 packets transmitted, 4 received, 0% loss, RTT 1.4ms.`);
            }
            finishTest(true, logs);
          }, 700);
        }
      }, 700);
    }, 600);
  };

  const finishTest = (success, logs) => {
    setTestLogs(logs);
    setTestResult(success ? 'success' : 'failed');
    setIsTesting(false);
    if (success) {
      addXP(25);
      if (showToast) showToast('Pengujian Topologi Berhasil! (+25 XP)', 'success');
    }
  };

  const updatePortVlan = (portKey, vlanId) => {
    setSwitchPorts((prev) => ({
      ...prev,
      [portKey]: {
        ...prev[portKey],
        vlan: parseInt(vlanId, 10)
      }
    }));
    // Sync device vlan
    const devId = switchPorts[portKey].device;
    if (devId && devices[devId]) {
      setDevices((prev) => ({
        ...prev,
        [devId]: {
          ...prev[devId],
          vlan: parseInt(vlanId, 10)
        }
      }));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. HEADER & MODE SWITCHER */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
              <Network className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">Interactive Network Topology Lab</h2>
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded-full">
                  L2 Switching & L3 Routing
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Simulasi jaringan komprehensif: alokasi VLAN port switch, konfigurasi Router-on-a-Stick, serta pengujian end-device (Ping, HTTP, & DHCP).
              </p>
            </div>
          </div>

          {/* Sub-mode Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setActiveTab('test')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'test'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Stasiun Uji End-Device</span>
            </button>
            <button
              onClick={() => setActiveTab('switching')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'switching'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Switching (VLAN L2)</span>
            </button>
            <button
              onClick={() => setActiveTab('routing')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'routing'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Route className="w-3.5 h-3.5" />
              <span>Routing (L3 Stick)</span>
            </button>
          </div>
        </div>

        {/* 2. VISUAL TOPOLOGY CANVAS (Interactive Nodes & Links) */}
        <div className="relative rounded-2xl bg-linear-to-b from-slate-900 via-slate-950 to-slate-900 p-6 border border-slate-800 overflow-hidden shadow-inner min-h-[300px]">
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Top Layer: Router Gateway */}
          <div className="relative z-10 flex flex-col items-center mb-8">
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform ${
                  interVlanRoutingEnabled ? 'bg-indigo-600 shadow-indigo-500/20' : 'bg-slate-700'
                }`}
              >
                <Server className="w-7 h-7" />
              </div>
              <span className="text-xs font-black text-white mt-1.5">Router-on-a-Stick</span>
              <span className="text-[10px] font-mono text-cyan-400">Gi0/0 (802.1Q Trunk)</span>
              <div className="flex gap-1 mt-1">
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${interVlanRoutingEnabled ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                  {interVlanRoutingEnabled ? 'Routing: ACTIVE' : 'Routing: OFF'}
                </span>
              </div>
            </div>

            {/* Trunk Cable Animation */}
            <div className="w-0.5 h-10 bg-linear-to-b from-indigo-500 via-cyan-400 to-teal-500 relative">
              {isTesting && packetStep === 3 && !isSameVlan && (
                <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
              )}
            </div>
          </div>

          {/* Middle Layer: Core Switch Catalyst */}
          <div className="relative z-10 flex flex-col items-center mb-8">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-500/20">
                <Network className="w-7 h-7" />
              </div>
              <span className="text-xs font-black text-white mt-1.5">Switch Catalyst 2960</span>
              <div className="flex items-center gap-1.5 mt-1 font-mono text-[10px]">
                <span className="px-1.5 py-0.2 bg-blue-900/60 text-blue-300 rounded border border-blue-800">Fa0/1: V{switchPorts['Fa0/1'].vlan}</span>
                <span className="px-1.5 py-0.2 bg-purple-900/60 text-purple-300 rounded border border-purple-800">Fa0/2: V{switchPorts['Fa0/2'].vlan}</span>
                <span className="px-1.5 py-0.2 bg-emerald-900/60 text-emerald-300 rounded border border-emerald-800">Fa0/3: V{switchPorts['Fa0/3'].vlan}</span>
              </div>
            </div>
          </div>

          {/* Bottom Layer: End Devices */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {/* PC-1 */}
            <div
              className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                testSource === 'pc1' || testTarget === 'pc1'
                  ? 'bg-slate-800/90 border-blue-500 shadow-md'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Laptop className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-100 mt-2">{devices.pc1.name}</span>
              <span className="text-[10px] font-mono text-slate-400">{devices.pc1.ip}</span>
              <span className="text-[9px] font-bold px-2 py-0.5 mt-1 rounded bg-blue-950 text-blue-300 border border-blue-800">
                VLAN {switchPorts['Fa0/1'].vlan} • Fa0/1
              </span>
            </div>

            {/* PC-2 */}
            <div
              className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                testSource === 'pc2' || testTarget === 'pc2'
                  ? 'bg-slate-800/90 border-purple-500 shadow-md'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md">
                <Laptop className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-100 mt-2">{devices.pc2.name}</span>
              <span className="text-[10px] font-mono text-slate-400">{devices.pc2.ip}</span>
              <span className="text-[9px] font-bold px-2 py-0.5 mt-1 rounded bg-purple-950 text-purple-300 border border-purple-800">
                VLAN {switchPorts['Fa0/2'].vlan} • Fa0/2
              </span>
            </div>

            {/* Web Server CBT */}
            <div
              className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                testSource === 'server' || testTarget === 'server'
                  ? 'bg-slate-800/90 border-emerald-500 shadow-md'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Server className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-100 mt-2">{devices.server.name}</span>
              <span className="text-[10px] font-mono text-slate-400">{devices.server.ip}</span>
              <span className="text-[9px] font-bold px-2 py-0.5 mt-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                VLAN {switchPorts['Fa0/3'].vlan} • Fa0/3
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE CONTROL PANELS ACCORDING TO ACTIVE TAB */}

      {/* TAB 1: END DEVICES TEST STATION */}
      {activeTab === 'test' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Test Setup Card (Col 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900">Uji Konektivitas Antar Perangkat</h3>
            </div>

            {/* Test Type Selectors */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTestType('ping')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  testType === 'ping'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="text-xs font-bold">Ping ICMP</div>
                <div className="text-[10px] text-slate-500">Echo Request</div>
              </button>

              <button
                onClick={() => setTestType('http')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  testType === 'http'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="text-xs font-bold">HTTP Web</div>
                <div className="text-[10px] text-slate-500">Port 80 CBT</div>
              </button>

              <button
                onClick={() => setTestType('dhcp')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  testType === 'dhcp'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="text-xs font-bold">DHCP Lease</div>
                <div className="text-[10px] text-slate-500">DORA Flow</div>
              </button>
            </div>

            {/* Source Device */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Perangkat Asal (Source):</label>
              <select
                value={testSource}
                onChange={(e) => setTestSource(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="pc1">PC-1 Siswa (192.168.10.15 - VLAN {switchPorts['Fa0/1'].vlan})</option>
                <option value="pc2">PC-2 Guru (192.168.20.25 - VLAN {switchPorts['Fa0/2'].vlan})</option>
              </select>
            </div>

            {/* Target Device (if not DHCP) */}
            {testType !== 'dhcp' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Perangkat Tujuan (Target):</label>
                <select
                  value={testTarget}
                  onChange={(e) => setTestTarget(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="server">Web Server CBT (192.168.30.100 - VLAN {switchPorts['Fa0/3'].vlan})</option>
                  <option value="pc2">PC-2 Guru (192.168.20.25 - VLAN {switchPorts['Fa0/2'].vlan})</option>
                  <option value="pc1">PC-1 Siswa (192.168.10.15 - VLAN {switchPorts['Fa0/1'].vlan})</option>
                </select>
              </div>
            )}

            {/* Run Button */}
            <button
              onClick={handleRunTest}
              disabled={isTesting}
              className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                isTesting ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25'
              }`}
            >
              {isTesting ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>Mengirim Paket Jaringan...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Jalankan Simulasi {testType.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>

          {/* Test Logs & Live Diagnostic (Col 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-black text-slate-900">Hasil Diagnostik & Analisis Paket</h3>
              </div>
              {testResult && (
                <span
                  className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                    testResult === 'success'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {testResult === 'success' ? 'SUCCESS (OK)' : 'FAILED (DROP)'}
                </span>
              )}
            </div>

            {/* Diagnostic Terminal Screen */}
            <div className="h-64 rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-300 overflow-y-auto space-y-1.5 border border-slate-800">
              {testLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 italic">
                  <Activity className="w-8 h-8 mb-2 opacity-50 text-slate-600" />
                  <span>Tekan tombol "Jalankan Simulasi" untuk mengamati aliran paket data secara langsung.</span>
                </div>
              ) : (
                testLogs.map((log, i) => (
                  <div
                    key={i}
                    className={`leading-relaxed ${
                      log.includes('[SUKSES]') || log.includes('200 OK')
                        ? 'text-emerald-400 font-bold'
                        : log.includes('[GAGAL]')
                        ? 'text-rose-400 font-bold'
                        : log.includes('[SOLUSI]')
                        ? 'text-amber-400'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>

            {/* Mini Web Page Preview if HTTP test successful */}
            {testType === 'http' && testResult === 'success' && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl animate-in fade-in">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-800 mb-1">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span>Preview Web Server CBT (http://192.168.30.100)</span>
                </div>
                <p className="text-xs text-emerald-900">
                  Portal Ujian CBT SIJA terbuka sempurna! Akses HTTP inter-VLAN dari Lab Siswa ke Server Farm berhasil dirutekan.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SWITCHING (VLAN L2) */}
      {activeTab === 'switching' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Konfigurasi Switch Port & Database VLAN</h3>
                <p className="text-[11px] text-slate-500">Tentukan alokasi nomor VLAN pada port FastEthernet switch</p>
              </div>
            </div>
          </div>

          {/* VLAN Reference Table */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {INITIAL_VLANS.map((v) => (
              <div key={v.id} className={`p-3 rounded-2xl border ${v.color}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black">VLAN {v.id}</span>
                  <span className={`text-[10px] text-white font-bold px-2 py-0.5 rounded ${v.badgeColor}`}>
                    {v.name}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-600">{v.subnet}</div>
              </div>
            ))}
          </div>

          {/* Switch Ports Assignment Controls */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Port Switch</th>
                  <th className="p-3">Mode Port</th>
                  <th className="p-3">Perangkat Terhubung</th>
                  <th className="p-3">VLAN Assignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {Object.entries(switchPorts).map(([portKey, portData]) => (
                  <tr key={portKey} className="hover:bg-slate-50/70">
                    <td className="p-3 font-mono font-bold text-slate-900">{portKey}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          portData.mode === 'trunk'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {portData.mode}
                      </span>
                    </td>
                    <td className="p-3 font-medium">{portData.label}</td>
                    <td className="p-3">
                      {portData.mode === 'trunk' ? (
                        <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-1 rounded">
                          Allowed: 10, 20, 30 (802.1Q)
                        </span>
                      ) : (
                        <select
                          value={portData.vlan}
                          onChange={(e) => updatePortVlan(portKey, e.target.value)}
                          className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:border-blue-500"
                        >
                          <option value="10">VLAN 10 (Siswa)</option>
                          <option value="20">VLAN 20 (Guru)</option>
                          <option value="30">VLAN 30 (Server CBT)</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-800">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Konsep Praktik SIJA:</strong> Jika port PC-1 dan Server CBT berada di nomor VLAN yang berbeda, mereka tidak akan bisa saling ping kecuali terdapat router (Router-on-a-Stick) yang aktif untuk merutekan paket.
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: ROUTING (L3 STICK) */}
      {activeTab === 'routing' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Route className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Router-on-a-Stick (Inter-VLAN Routing)</h3>
                <p className="text-[11px] text-slate-500">Membagi physical interface Gi0/0 menjadi sub-interface logis 802.1Q</p>
              </div>
            </div>

            {/* Toggle Inter-VLAN Routing */}
            <button
              onClick={() => {
                setInterVlanRoutingEnabled(!interVlanRoutingEnabled);
                if (showToast) {
                  showToast(
                    interVlanRoutingEnabled ? 'Inter-VLAN Routing Dinonaktifkan' : 'Inter-VLAN Routing Diaktifkan',
                    interVlanRoutingEnabled ? 'error' : 'success'
                  );
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                interVlanRoutingEnabled
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20'
              }`}
            >
              <span>{interVlanRoutingEnabled ? 'Inter-VLAN Routing: ON' : 'Inter-VLAN Routing: OFF'}</span>
            </button>
          </div>

          {/* Sub-Interfaces Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(subInterfaces).map(([subName, subData]) => (
              <div key={subName} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-slate-900">{subName}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    UP
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 font-mono">
                  <div>IP: <strong>{subData.ip}</strong></div>
                  <div>Encapsulation: <strong>dot1Q {subData.vlan}</strong></div>
                </div>
              </div>
            ))}
          </div>

          {/* Cisco Command Reference Box */}
          <div className="rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
            <div className="text-slate-500 font-bold mb-1"># Cuplikan Konfigurasi Cisco Router-on-a-Stick:</div>
            <div className="text-cyan-400">Router(config)# interface GigabitEthernet0/0.10</div>
            <div className="text-slate-300">Router(config-subif)# encapsulation dot1Q 10</div>
            <div className="text-slate-300">Router(config-subif)# ip address 192.168.10.1 255.255.255.0</div>
            <div className="text-cyan-400">Router(config)# interface GigabitEthernet0/0.30</div>
            <div className="text-slate-300">Router(config-subif)# encapsulation dot1Q 30</div>
            <div className="text-slate-300">Router(config-subif)# ip address 192.168.30.1 255.255.255.0</div>
          </div>
        </div>
      )}
    </div>
  );
};
