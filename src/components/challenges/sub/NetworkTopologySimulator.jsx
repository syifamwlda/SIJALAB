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
  BookOpen
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const NetworkTopologySimulator = () => {
  const { addXP, showToast } = useApp();

  // Active view: 'guide' (Panduan Belajar), 'simulator' (Praktik Topologi), 'theory' (Kamus Konsep)
  const [activeTab, setActiveTab] = useState('simulator');

  // Guided Steps State for Beginner Friendly Learning
  const [activeStep, setActiveStep] = useState(1);

  // Network State
  const [interVlanRouting, setInterVlanRouting] = useState(true);
  const [pc1Vlan, setPc1Vlan] = useState(10); // 10 (Siswa)
  const [pc2Vlan, setPc2Vlan] = useState(20); // 20 (Guru)
  const [serverVlan, setServerVlan] = useState(30); // 30 (Server Farm CBT)

  // Simulation State
  const [testMode, setTestMode] = useState('ping'); // 'ping', 'http'
  const [simSource, setSimSource] = useState('pc1'); // 'pc1', 'pc2'
  const [simTarget, setSimTarget] = useState('server'); // 'server', 'pc2'
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const [animatedHop, setAnimatedHop] = useState(0); // 0 = idle, 1 = pc, 2 = switch, 3 = router, 4 = dest

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationResult(null);
    setAnimatedHop(1);

    const srcVlan = simSource === 'pc1' ? pc1Vlan : pc2Vlan;
    const dstVlan = simTarget === 'server' ? serverVlan : (simTarget === 'pc2' ? pc2Vlan : pc1Vlan);
    const isSameVlan = srcVlan === dstVlan;

    setTimeout(() => {
      setAnimatedHop(2); // In Switch

      setTimeout(() => {
        if (isSameVlan) {
          // Packet stays within switch
          setAnimatedHop(4); // Straight to destination
          setIsSimulating(false);
          setSimulationResult({
            success: true,
            title: testMode === 'http' ? 'HTTP 200 OK — Halaman Web Terbuka!' : 'Ping Berhasil (1 VLAN)!',
            explanation: `Kedua perangkat sama-sama berada di VLAN ${srcVlan}. Switch langsung meneruskan paket lewat alamat MAC tanpa memerlukan bantuan router.`,
            latency: '0.4 ms',
            path: ['PC Pengirim', `Switch (VLAN ${srcVlan})`, 'Perangkat Tujuan']
          });
          addXP(25);
          if (showToast) showToast('Simulasi Berhasil! (+25 XP)', 'success');
        } else {
          // Cross-VLAN
          if (!interVlanRouting) {
            // Fails at router
            setAnimatedHop(3);
            setIsSimulating(false);
            setSimulationResult({
              success: false,
              title: 'Paket Terisolasi / Gagal (Packet Dropped)!',
              explanation: `PC berada di VLAN ${srcVlan} sedangkan server berada di VLAN ${dstVlan}. Karena fitur Router-on-a-Stick nonaktif, paket tidak dapat melompati batas VLAN. Ini adalah fungsi keamanan isolasi VLAN.`,
              solution: 'Nyalakan toggle "Router-on-a-Stick" di panel sebelah kanan agar router merutekan paket antar-VLAN.',
              path: ['PC Pengirim', `Switch (VLAN ${srcVlan})`, '❌ Router (Routing OFF)']
            });
          } else {
            // Success via Router-on-a-Stick
            setAnimatedHop(3); // In Router
            setTimeout(() => {
              setAnimatedHop(4); // Destination
              setIsSimulating(false);
              setSimulationResult({
                success: true,
                title: testMode === 'http' ? 'HTTP 200 OK — Portal CBT Terbuka!' : 'Ping Lintas VLAN Berhasil!',
                explanation: `Paket dari VLAN ${srcVlan} dikirim lewat kabel Trunk (802.1Q) ke Router sub-interface Gi0/0.${srcVlan}. Router kemudian merutekannya ke sub-interface Gi0/0.${dstVlan} dan diteruskan kembali ke switch menuju tujuan!`,
                latency: '1.2 ms',
                path: ['PC Pengirim', `Switch (Port Access VLAN ${srcVlan})`, 'Trunk 802.1Q', `Router (Gi0/0.${srcVlan} -> Gi0/0.${dstVlan})`, 'Switch', 'Server Tujuan']
              });
              addXP(35);
              if (showToast) showToast('Inter-VLAN Routing Berhasil! (+35 XP)', 'success');
            }, 600);
          }
        }
      }, 600);
    }, 500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. INTRO / EXPLANATION CARD (Membuat Siswa Paham Konteks) */}
      <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-blue-100">
            <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
            <span>Pahami Konsep Jaringan SMK: VLAN & Router-on-a-Stick</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Mengapa Kita Memerlukan Topologi Ini? 🤔
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            Di sekolah, kita punya <strong>Lab Siswa (VLAN 10)</strong>, <strong>Ruang Guru (VLAN 20)</strong>, dan <strong>Server Ujian CBT (VLAN 30)</strong>. Agar siswa tidak bisa "iseng" membuka komputer guru, jaringan dipisah dengan <strong>VLAN</strong>. Namun, siswa tetap harus bisa mengerjakan ujian di Server CBT, sehingga dibutuhkan <strong>Router</strong> untuk menghubungkan mereka dengan aman!
          </p>
        </div>
      </div>

      {/* 2. MODE SELECTOR & SCENARIO GUIDE */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'simulator'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Simulator Visual & Praktik</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'guide'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Panduan Langkah Praktikum (4 Langkah)</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 pr-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Status Jaringan: Siap Diuji</span>
        </div>
      </div>

      {/* TAB: GUIDED 4-STEP MISSION */}
      {activeTab === 'guide' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">4 Langkah Praktikum Menghubungkan Jaringan Sekolah:</h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Misi Terpandu
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border transition-all ${activeStep === 1 ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-slate-50/60'}`}>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">1</span>
                <h4 className="text-xs font-black text-slate-900">Uji Ping Dalam 1 VLAN yang Sama</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Ubah port PC-1 dan Server CBT agar berada di VLAN yang sama (VLAN 10). Jalankan ping.
              </p>
              <div className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 p-2 rounded-lg">
                💡 Hasil yang diharapkan: Ping Sukses seketika karena switch langsung meneruskan paket tanpa lewat router.
              </div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${activeStep === 2 ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-slate-50/60'}`}>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center">2</span>
                <h4 className="text-xs font-black text-slate-900">Pisahkan Server ke VLAN 30 & Matikan Router</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Ubah Server ke VLAN 30 dan matikan fitur Router-on-a-Stick. Coba ping dari PC-1 (VLAN 10).
              </p>
              <div className="text-[11px] font-bold text-rose-700 bg-rose-100/70 p-2 rounded-lg">
                🛑 Hasil yang diharapkan: Paket terisolasi (Drop)! Ini membuktikan fungsi keamanan pemisahan segmen VLAN.
              </div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${activeStep === 3 ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-slate-50/60'}`}>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center">3</span>
                <h4 className="text-xs font-black text-slate-900">Nyalakan Router-on-a-Stick</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Nyalakan saklar Router-on-a-Stick. Router akan membaca tag 802.1Q dan menyeberangkan paket antar-VLAN.
              </p>
              <div className="text-[11px] font-bold text-blue-700 bg-blue-100/70 p-2 rounded-lg">
                🚀 Hasil yang diharapkan: Ping lintas-VLAN berhasil melalui router sub-interface!
              </div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${activeStep === 4 ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-slate-50/60'}`}>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center">4</span>
                <h4 className="text-xs font-black text-slate-900">Buka Web Portal Ujian CBT (HTTP)</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Ubah mode uji dari "Ping" ke "HTTP Web". Klik uji koneksi untuk memuat halaman website ujian.
              </p>
              <div className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 p-2 rounded-lg">
                🌐 Hasil yang diharapkan: HTTP 200 OK dengan preview portal ujian CBT sekolah.
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('simulator')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-2"
            >
              <span>Mulai Praktik di Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB: INTERACTIVE SIMULATOR & WORKBENCH */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Visual Topology Diagram (Col 8) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Diagram Topologi Sekolah Terpadu</h3>
                  <p className="text-xs text-slate-500">Klik dan atur port switch atau jalankan simulasi paket</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">VLAN 10: Siswa</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">VLAN 20: Guru</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">VLAN 30: Server CBT</span>
                </div>
              </div>

              {/* Clean Airy Visual Canvas */}
              <div className="relative rounded-2xl bg-linear-to-b from-slate-50 via-white to-slate-50 border border-slate-200/90 p-6 flex flex-col items-center justify-between min-h-[380px]">
                {/* 1. TOP: ROUTER GATEWAY */}
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md transition-all ${
                      interVlanRouting ? 'bg-indigo-600 ring-4 ring-indigo-100' : 'bg-slate-400'
                    }`}
                  >
                    <Server className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-black text-slate-900 mt-1.5">Router-on-a-Stick (L3)</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] font-mono text-slate-500">Port Gi0/0 (Trunk 802.1Q)</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        interVlanRouting ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {interVlanRouting ? 'Routing ON' : 'Routing OFF'}
                    </span>
                  </div>

                  {/* Trunk Cable Line */}
                  <div className="w-1 h-12 bg-indigo-300 relative my-1 rounded-full">
                    {animatedHop === 3 && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-600 animate-ping" />
                    )}
                  </div>
                </div>

                {/* 2. MIDDLE: CORE SWITCH CATALYST */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 text-white flex items-center justify-center shadow-md ring-4 ring-slate-100">
                    <Network className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div className="text-xs font-black text-slate-900 mt-1.5">Switch Catalyst 2960 (L2)</div>
                  <div className="text-[10px] text-slate-500 font-mono">Port Fa0/1, Fa0/2, Fa0/3, Gi0/1</div>

                  {/* Fan out cables */}
                  <div className="w-64 h-8 border-b-2 border-slate-300 border-x-2 rounded-b-xl my-1 relative">
                    {animatedHop === 2 && (
                      <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-cyan-500 animate-ping" />
                    )}
                  </div>
                </div>

                {/* 3. BOTTOM: END DEVICES */}
                <div className="w-full grid grid-cols-3 gap-3 pt-2 relative z-10">
                  {/* PC-1 Siswa */}
                  <div
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      simSource === 'pc1'
                        ? 'border-blue-500 bg-blue-50/70 shadow-sm'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white mx-auto flex items-center justify-center shadow-xs">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-black text-slate-900 mt-1.5">PC-1 (Lab Siswa)</div>
                    <div className="text-[10px] font-mono text-slate-500">192.168.10.15</div>
                    <div className="mt-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        VLAN {pc1Vlan}
                      </span>
                    </div>
                  </div>

                  {/* PC-2 Guru */}
                  <div
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      simTarget === 'pc2' || simSource === 'pc2'
                        ? 'border-purple-500 bg-purple-50/70 shadow-sm'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-600 text-white mx-auto flex items-center justify-center shadow-xs">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-black text-slate-900 mt-1.5">PC-2 (Ruang Guru)</div>
                    <div className="text-[10px] font-mono text-slate-500">192.168.20.25</div>
                    <div className="mt-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                        VLAN {pc2Vlan}
                      </span>
                    </div>
                  </div>

                  {/* Server CBT */}
                  <div
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      simTarget === 'server'
                        ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-xs">
                      <Server className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-black text-slate-900 mt-1.5">Server Ujian CBT</div>
                    <div className="text-[10px] font-mono text-slate-500">192.168.30.100</div>
                    <div className="mt-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        VLAN {serverVlan}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulation Result Box */}
              {simulationResult && (
                <div
                  className={`mt-4 p-4 rounded-2xl border animate-in fade-in duration-200 ${
                    simulationResult.success
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50/80 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      {simulationResult.success ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                      <h4 className="text-xs sm:text-sm font-black">{simulationResult.title}</h4>
                    </div>
                    {simulationResult.latency && (
                      <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-emerald-200 font-bold">
                        Latensi: {simulationResult.latency}
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed mb-2 opacity-90">
                    {simulationResult.explanation}
                  </p>
                  {simulationResult.solution && (
                    <div className="text-xs font-bold text-amber-800 bg-amber-100/70 p-2.5 rounded-xl border border-amber-200">
                      💡 Solusi: {simulationResult.solution}
                    </div>
                  )}

                  {/* Flow Path Breadcrumbs */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-slate-200/40 text-[11px] font-mono">
                    <span className="font-bold text-slate-600">Alur Paket:</span>
                    {simulationResult.path.map((p, i) => (
                      <React.Fragment key={i}>
                        <span className="bg-white/80 px-2 py-0.5 rounded border text-slate-700 font-bold">
                          {p}
                        </span>
                        {i < simulationResult.path.length - 1 && <span className="text-slate-400">→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Controls Panel (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Control 1: Test Action Box */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-black text-slate-900">Uji Kirim Paket</h3>
              </div>

              {/* Mode Toggle */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTestMode('ping')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    testMode === 'ping'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Ping ICMP
                </button>
                <button
                  onClick={() => setTestMode('http')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    testMode === 'http'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  HTTP Web (CBT)
                </button>
              </div>

              {/* Source Select */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Pengirim (Source):</label>
                <select
                  value={simSource}
                  onChange={(e) => setSimSource(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="pc1">PC-1 Siswa (VLAN {pc1Vlan})</option>
                  <option value="pc2">PC-2 Guru (VLAN {pc2Vlan})</option>
                </select>
              </div>

              {/* Target Select */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Tujuan (Destination):</label>
                <select
                  value={simTarget}
                  onChange={(e) => setSimTarget(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="server">Server Ujian CBT (VLAN {serverVlan})</option>
                  <option value="pc2">PC-2 Guru (VLAN {pc2Vlan})</option>
                </select>
              </div>

              {/* Run Button */}
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  isSimulating ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25'
                }`}
              >
                {isSimulating ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>Paket Sedang Berjalan...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Jalankan Pengujian</span>
                  </>
                )}
              </button>
            </div>

            {/* Control 2: VLAN & Router Assignment */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-black text-slate-900">Ubah Nomor VLAN Port</h3>
              </div>

              {/* PC-1 Port VLAN */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Port PC-1 (Fa0/1):</label>
                <select
                  value={pc1Vlan}
                  onChange={(e) => setPc1Vlan(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="10">VLAN 10 (Siswa Lab)</option>
                  <option value="20">VLAN 20 (Guru Staff)</option>
                  <option value="30">VLAN 30 (Server Farm)</option>
                </select>
              </div>

              {/* Server Port VLAN */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Port Server CBT (Fa0/3):</label>
                <select
                  value={serverVlan}
                  onChange={(e) => setServerVlan(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="30">VLAN 30 (Server Farm - Default)</option>
                  <option value="10">VLAN 10 (Jadikan 1 VLAN dengan Siswa)</option>
                </select>
              </div>

              {/* Router-on-a-Stick Switch */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Router-on-a-Stick</div>
                  <div className="text-[10px] text-slate-500">Merutekan paket lintas-VLAN</div>
                </div>
                <button
                  onClick={() => setInterVlanRouting(!interVlanRouting)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    interVlanRouting ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 shadow-xs ${
                      interVlanRouting ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
