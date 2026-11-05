import React, { useState } from 'react';
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
  Radio
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const NetworkTopologySimulator = () => {
  const { addXP } = useApp();

  // Network Nodes Configuration State
  const [nodes, setNodes] = useState({
    router: {
      id: 'router',
      name: 'Router Gateway',
      type: 'router',
      ip: '192.168.10.1',
      subnet: '255.255.255.0',
      icon: Server,
      color: 'bg-indigo-600',
      status: 'UP'
    },
    switch: {
      id: 'switch',
      name: 'Core Switch Catalyst',
      type: 'switch',
      icon: Network,
      color: 'bg-teal-600',
      status: 'UP'
    },
    pc1: {
      id: 'pc1',
      name: 'PC-1 (Lab SIJA 1)',
      type: 'host',
      ip: '192.168.10.15',
      subnet: '255.255.255.0',
      gateway: '192.168.10.1',
      icon: Laptop,
      color: 'bg-blue-600',
      status: 'UP'
    },
    pc2: {
      id: 'pc2',
      name: 'PC-2 (Lab SIJA 2)',
      type: 'host',
      ip: '192.168.10.20',
      subnet: '255.255.255.0',
      gateway: '192.168.10.1',
      icon: Laptop,
      color: 'bg-blue-600',
      status: 'UP'
    },
    server: {
      id: 'server',
      name: 'Web Server CBT',
      type: 'server',
      ip: '192.168.10.100',
      subnet: '255.255.255.0',
      gateway: '192.168.10.1',
      icon: Server,
      color: 'bg-emerald-600',
      status: 'UP'
    }
  });

  // Selected device for live inspector
  const [selectedDeviceId, setSelectedDeviceId] = useState('pc1');

  // Simulation State
  const [simSource, setSimSource] = useState('pc1');
  const [simDest, setSimDest] = useState('server');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  const selectedDevice = nodes[selectedDeviceId];

  const handleDeviceChange = (field, val) => {
    setNodes((prev) => ({
      ...prev,
      [selectedDeviceId]: {
        ...prev[selectedDeviceId],
        [field]: val
      }
    }));
    setSimulationResult(null);
  };

  const runPingSimulation = () => {
    setIsSimulating(true);
    setSimulationResult(null);

    setTimeout(() => {
      setIsSimulating(false);
      const srcNode = nodes[simSource];
      const destNode = nodes[simDest];

      // Logic check
      const isSrcValid = srcNode.ip && srcNode.subnet && srcNode.gateway;
      const isDestValid = destNode.ip && destNode.subnet && destNode.gateway;

      // Subnet check (for /24 check first 3 octets)
      const srcPrefix = srcNode.ip.split('.').slice(0, 3).join('.');
      const destPrefix = destNode.ip.split('.').slice(0, 3).join('.');
      const gwPrefix = srcNode.gateway.split('.').slice(0, 3).join('.');

      if (!isSrcValid) {
        setSimulationResult({
          success: false,
          msg: `Gagal: Konfigurasi IP pada ${srcNode.name} belum lengkap!`
        });
        return;
      }

      if (srcPrefix !== gwPrefix) {
        setSimulationResult({
          success: false,
          msg: `Gagal: Default Gateway ${srcNode.gateway} tidak satu subnet dengan IP ${srcNode.ip}!`
        });
        return;
      }

      if (srcPrefix === destPrefix) {
        setSimulationResult({
          success: true,
          msg: `SUKSES! Paket Ping ICMP dari ${srcNode.name} ke ${destNode.name} (${destNode.ip}) terkirim lancar! (RTT 0.8ms, TTL=64)`
        });
        addXP(50, `Simulasi Topologi Ping ${srcNode.name} -> ${destNode.name} berhasil!`);
      } else {
        setSimulationResult({
          success: false,
          msg: `Gagal: ${srcNode.name} (${srcNode.ip}) dan ${destNode.name} (${destNode.ip}) berada di subnet berbeda tanpa konfigurasi Inter-VLAN / Routing!`
        });
      }
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
      {/* TOPOLOGY CANVAS (2 Cols) */}
      <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
        {/* Canvas Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">
              Interactive Network Topology Canvas
            </span>
            <h3 className="text-sm font-extrabold text-white">
              Lab Jaringan Komputer & Server SIJA
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            ● Link Status: All UP
          </span>
        </div>

        {/* Visual Topology Graph Representation */}
        <div className="py-10 flex flex-col items-center justify-center space-y-10 relative">
          {/* Layer 3: Router */}
          <div className="relative z-10">
            <button
              onClick={() => setSelectedDeviceId('router')}
              className={`p-4 rounded-2xl flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                selectedDeviceId === 'router'
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-400/40 shadow-lg scale-105'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <Server className="w-7 h-7 text-indigo-400" />
              <span className="text-xs font-black">{nodes.router.name}</span>
              <span className="text-[10px] font-mono text-cyan-300 font-bold">{nodes.router.ip}</span>
            </button>
          </div>

          {/* Cable line 1 */}
          <div className="w-1 h-10 bg-linear-to-b from-indigo-500 to-teal-500 -my-3" />

          {/* Layer 2: Core Switch */}
          <div className="relative z-10">
            <button
              onClick={() => setSelectedDeviceId('switch')}
              className={`p-4 rounded-2xl flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                selectedDeviceId === 'switch'
                  ? 'bg-teal-600 text-white ring-4 ring-teal-400/40 shadow-lg scale-105'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <Network className="w-7 h-7 text-teal-400" />
              <span className="text-xs font-black">{nodes.switch.name}</span>
              <span className="text-[10px] text-teal-300 font-bold">24-Port Gi0/1-24</span>
            </button>
          </div>

          {/* Horizontal Distribution Line */}
          <div className="w-3/4 h-1 bg-teal-500/80 -my-3" />

          {/* Layer 1: End Devices (PC-1, PC-2, Server) */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-lg z-10">
            {/* PC-1 */}
            <button
              onClick={() => setSelectedDeviceId('pc1')}
              className={`p-3.5 rounded-2xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
                selectedDeviceId === 'pc1'
                  ? 'bg-blue-600 text-white ring-4 ring-blue-400/40 shadow-lg scale-105'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <Laptop className="w-6 h-6 text-blue-400" />
              <span className="text-xs font-black text-center">{nodes.pc1.name}</span>
              <span className="text-[10px] font-mono text-cyan-300">{nodes.pc1.ip}</span>
            </button>

            {/* PC-2 */}
            <button
              onClick={() => setSelectedDeviceId('pc2')}
              className={`p-3.5 rounded-2xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
                selectedDeviceId === 'pc2'
                  ? 'bg-blue-600 text-white ring-4 ring-blue-400/40 shadow-lg scale-105'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <Laptop className="w-6 h-6 text-blue-400" />
              <span className="text-xs font-black text-center">{nodes.pc2.name}</span>
              <span className="text-[10px] font-mono text-cyan-300">{nodes.pc2.ip}</span>
            </button>

            {/* Web Server */}
            <button
              onClick={() => setSelectedDeviceId('server')}
              className={`p-3.5 rounded-2xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
                selectedDeviceId === 'server'
                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-400/40 shadow-lg scale-105'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <Server className="w-6 h-6 text-emerald-400" />
              <span className="text-xs font-black text-center">{nodes.server.name}</span>
              <span className="text-[10px] font-mono text-emerald-300">{nodes.server.ip}</span>
            </button>
          </div>
        </div>

        {/* Bottom Simulation Control Bar */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-2xl">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Kirim Paket dari:</span>
            <select
              value={simSource}
              onChange={(e) => setSimSource(e.target.value)}
              className="bg-slate-800 text-white px-2 py-1 rounded-lg border border-slate-700 text-xs font-bold outline-hidden"
            >
              <option value="pc1">PC-1 (Lab 1)</option>
              <option value="pc2">PC-2 (Lab 2)</option>
              <option value="server">Web Server</option>
            </select>
            <span>ke</span>
            <select
              value={simDest}
              onChange={(e) => setSimDest(e.target.value)}
              className="bg-slate-800 text-white px-2 py-1 rounded-lg border border-slate-700 text-xs font-bold outline-hidden"
            >
              <option value="server">Web Server</option>
              <option value="pc1">PC-1 (Lab 1)</option>
              <option value="pc2">PC-2 (Lab 2)</option>
            </select>
          </div>

          <button
            onClick={runPingSimulation}
            disabled={isSimulating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{isSimulating ? 'Sedang Mentransmisikan...' : 'Kirim Paket Ping'}</span>
          </button>
        </div>

        {/* Simulation Output Feedback Banner */}
        {simulationResult && (
          <div
            className={`mt-3 p-3.5 rounded-2xl border text-xs font-bold animate-in fade-in flex items-start gap-2.5 ${
              simulationResult.success
                ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950 border-rose-500/50 text-rose-300'
            }`}
          >
            {simulationResult.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="leading-relaxed">{simulationResult.msg}</div>
          </div>
        )}
      </div>

      {/* RIGHT: LIVE DEVICE INSPECTOR & CONFIG SHEET */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Konfigurasi Perangkat
            </h3>
          </div>
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
            {selectedDevice.type.toUpperCase()}
          </span>
        </div>

        <div>
          <h4 className="text-base font-extrabold text-slate-900">{selectedDevice.name}</h4>
          <p className="text-xs text-slate-500 font-medium">Klik dan ubah parameter IP untuk menguji simulasi jaringan.</p>
        </div>

        {selectedDevice.type !== 'switch' ? (
          <div className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                IPv4 Address
              </label>
              <input
                type="text"
                value={selectedDevice.ip || ''}
                onChange={(e) => handleDeviceChange('ip', e.target.value)}
                className="w-full p-2.5 text-xs font-mono font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Subnet Mask
              </label>
              <input
                type="text"
                value={selectedDevice.subnet || ''}
                onChange={(e) => handleDeviceChange('subnet', e.target.value)}
                className="w-full p-2.5 text-xs font-mono font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-500"
              />
            </div>

            {selectedDevice.gateway !== undefined && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Default Gateway
                </label>
                <input
                  type="text"
                  value={selectedDevice.gateway || ''}
                  onChange={(e) => handleDeviceChange('gateway', e.target.value)}
                  className="w-full p-2.5 text-xs font-mono font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-500"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-800 block">Status Switch:</span>
            <p className="text-slate-600 leading-relaxed font-medium">
              Switch Layer 2 menghubungkan port FastEthernet 0/1 s/d Fa0/24 dalam VLAN 1 default. Meneruskan frame berdasarkan tabel MAC Address CAM.
            </p>
          </div>
        )}

        <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-2xl text-xs space-y-1.5 text-cyan-950 font-medium">
          <span className="font-extrabold block text-cyan-900">💡 Tantangan Praktik:</span>
          <p className="leading-relaxed">
            Coba ubah IP PC-1 menjadi <code className="font-bold">192.168.20.15</code> lalu kirim ping ke Web Server. Amati mengapa paket gagal terkirim dan kembalikan ke subnet yang benar!
          </p>
        </div>
      </div>
    </div>
  );
};

