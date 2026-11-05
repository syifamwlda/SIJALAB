import React, { useState } from 'react';
import {
  Flame,
  Sparkles,
  BookOpen,
  Cpu,
  FlaskConical,
  Award,
  ArrowRight,
  CheckCircle2,
  Play,
  Clock,
  Zap,
  TrendingUp,
  Terminal,
  Network,
  Wrench,
  Radio,
  ChevronRight,
  Send,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DAILY_CHALLENGE_QUESTION } from '../../data/gamificationData';

export const DashboardView = () => {
  const {
    userProfile,
    materials,
    labs,
    getCurrentLevel,
    setActiveTab,
    setActiveMaterialId,
    setActiveLabId,
    setActiveChallengeId,
    markDailyChallengeComplete,
    addXP,
    showToast
  } = useApp();

  const levelInfo = getCurrentLevel();

  // Daily Challenge Interactive State
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const isDailyDone = userProfile.dailyChallengeCompletedDate === today;

  // Interactive Live Ping Workstation Widget State
  const [pingTarget, setPingTarget] = useState('192.168.10.1');
  const [isPinging, setIsPinging] = useState(false);
  const [pingLogs, setPingLogs] = useState([
    'SIJALAB Network Ping Workstation v2.0 ready.',
    'Pilih target cepat atau ketik IP/Domain untuk menguji latensi jaringan.'
  ]);

  const handleRunQuickPing = (targetIp) => {
    const target = targetIp || pingTarget;
    setIsPinging(true);
    setPingLogs((prev) => [
      ...prev,
      `--- PING ${target} (56 data bytes) ---`
    ]);

    setTimeout(() => {
      setIsPinging(false);
      const isOk = !target.includes('999');
      if (isOk) {
        const timeMs = (Math.random() * 2 + 0.5).toFixed(2);
        setPingLogs((prev) => [
          ...prev,
          `64 bytes from ${target}: icmp_seq=1 ttl=64 time=${timeMs} ms`,
          `64 bytes from ${target}: icmp_seq=2 ttl=64 time=${(parseFloat(timeMs) + 0.1).toFixed(2)} ms`,
          `✓ 2 packets transmitted, 2 received, 0% packet loss (RTT ${timeMs}ms)`
        ]);
        showToast(`Ping ke ${target} sukses! (RTT ${timeMs}ms)`, 'success');
      } else {
        setPingLogs((prev) => [
          ...prev,
          `Request timed out for icmp_seq 1`,
          `Destination host unreachable.`
        ]);
      }
    }, 700);
  };

  const handleDailySubmit = (index) => {
    if (isDailyDone || hasSubmitted) return;
    setSelectedAnswer(index);
    setHasSubmitted(true);

    if (index === DAILY_CHALLENGE_QUESTION.correctIndex) {
      markDailyChallengeComplete(DAILY_CHALLENGE_QUESTION.xpReward);
    } else {
      showToast('Jawaban kurang tepat. Coba pahami penjelasannya ya!', 'info');
    }
  };

  // Continue Learning: First uncompleted material
  const uncompletedMaterials = materials.filter(
    (m) => !userProfile.completedMaterials.includes(m.id)
  );
  const continueItem = uncompletedMaterials[0] || materials[0];

  // Daily Quests Simulation
  const quests = [
    { id: 'q1', text: 'Uji konektivitas di stasiun Live Ping Lab', done: pingLogs.length > 2, xp: 20 },
    { id: 'q2', text: 'Pecahkan Tantangan Harian (Daily Challenge)', done: isDailyDone || hasSubmitted, xp: 40 },
    { id: 'q3', text: 'Praktik 1 misi di Live CLI Terminal', done: false, xp: 35, action: 'cli-terminal' }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 1. WELCOME HERO WORKSTATION BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white p-6 sm:p-8 shadow-xl shadow-blue-500/15">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Digital Universe Siswa SIJA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Halo, {userProfile.name.split(' ')[0]}! Siap Praktik Hari Ini? ⚡
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Jelajahi simulator topologi jaringan, buka terminal Linux & Cisco, serta rakit komponen IoT secara interaktif.
            </p>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => {
                  setActiveTab('challenges');
                  setActiveChallengeId('cli-terminal');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-black text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-slate-900/10 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-emerald-600" />
                <span>Buka Terminal CLI</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('challenges');
                  setActiveChallengeId('topology-canvas');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-700/60 hover:bg-blue-700/80 text-white border border-white/20 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
              >
                <Network className="w-4 h-4 text-cyan-300" />
                <span>Simulasi Topologi</span>
              </button>
            </div>
          </div>

          {/* Streak & Level Hero Card */}
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-5 flex items-center gap-4 shrink-0 shadow-inner">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center shrink-0">
              <Flame className="w-8 h-8 text-amber-300 fill-amber-400 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-3xl font-black tracking-tight">{userProfile.streakDays}</span>
                <span className="text-xs uppercase font-black tracking-wider text-amber-200">
                  Hari Aktif
                </span>
              </div>
              <p className="text-xs text-blue-100 font-semibold">{levelInfo.tier.title} • {userProfile.xp} XP</p>
              <span className="inline-block mt-1 text-[10px] bg-amber-400 text-slate-900 font-black px-2 py-0.5 rounded-full">
                🔥 Streak Aktif
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE LIVE WORKSTATION: NETWORK PING MONITOR & QUICK LAUNCH TOOLBELT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Live Interactive Ping Station (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-950 rounded-3xl p-6 border border-slate-800 text-white shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <h3 className="text-xs font-black uppercase text-slate-300 tracking-wider">
                Live Interactive Network Ping Station
              </h3>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">ICMP Test Socket Online</span>
          </div>

          {/* Quick Target Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-bold">Target Cepat:</span>
            {[
              { label: 'Router Gateway', ip: '192.168.10.1' },
              { label: 'Core Switch', ip: '192.168.10.2' },
              { label: 'DNS Cloudflare', ip: '1.1.1.1' },
              { label: 'ESP32 IoT Node', ip: '192.168.10.45' }
            ].map((tgt) => (
              <button
                key={tgt.ip}
                onClick={() => {
                  setPingTarget(tgt.ip);
                  handleRunQuickPing(tgt.ip);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors cursor-pointer"
              >
                {tgt.label} ({tgt.ip})
              </button>
            ))}
          </div>

          {/* Manual Ping Input Form */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-bold">ping -c 2</span>
            <input
              type="text"
              value={pingTarget}
              onChange={(e) => setPingTarget(e.target.value)}
              placeholder="Ketik IP atau hostname..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono text-white outline-hidden focus:border-cyan-400"
            />
            <button
              onClick={() => handleRunQuickPing(pingTarget)}
              disabled={isPinging}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              {isPinging ? 'Menguji...' : 'Kirim ICMP'}
            </button>
          </div>

          {/* Terminal Logs Output */}
          <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 font-mono text-xs max-h-32 overflow-y-auto space-y-1 text-slate-300">
            {pingLogs.map((log, i) => (
              <p key={i} className="leading-snug">{log}</p>
            ))}
          </div>
        </div>

        {/* Right: Daily Quest Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h3 className="text-sm font-black text-slate-900">Misi Harian Siswa</h3>
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
              Daily Quests
            </span>
          </div>

          <div className="space-y-2.5">
            {quests.map((q) => (
              <div
                key={q.id}
                onClick={() => {
                  if (q.action) {
                    setActiveTab('challenges');
                    setActiveChallengeId(q.action);
                  }
                }}
                className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between gap-2 transition-all ${
                  q.done
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs ${
                      q.done ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                    }`}
                  >
                    {q.done && '✓'}
                  </div>
                  <span>{q.text}</span>
                </div>
                <span className="text-[10px] font-black text-amber-600 shrink-0">
                  +{q.xp} XP
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. HARDWARE & INTERACTIVE SIMULATOR SHORTCUTS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'CLI Terminal Lab',
            desc: 'Ubuntu & Cisco Switch Console',
            icon: Terminal,
            id: 'cli-terminal',
            color: 'from-emerald-500 to-teal-600',
            border: 'hover:border-emerald-400'
          },
          {
            title: 'Simulasi Topologi',
            desc: 'Uji Packet Ping & Gateway',
            icon: Network,
            id: 'topology-canvas',
            color: 'from-blue-600 to-cyan-500',
            border: 'hover:border-blue-400'
          },
          {
            title: 'Rakit Komponen IoT',
            desc: 'ESP32, LED, Relay & Sensor',
            icon: Cpu,
            id: 'iot-breadboard',
            color: 'from-amber-500 to-orange-500',
            border: 'hover:border-amber-400'
          },
          {
            title: 'Perakitan Kabel UTP',
            desc: 'Game Crimping RJ45 T568B',
            icon: Wrench,
            id: 'utp-crimping',
            color: 'from-indigo-600 to-purple-600',
            border: 'hover:border-indigo-400'
          }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => {
                setActiveTab('challenges');
                setActiveChallengeId(item.id);
              }}
              className={`p-4 bg-white rounded-3xl border border-slate-200/90 shadow-xs ${item.border} hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group card-hover-lift`}
            >
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-2xl bg-linear-to-tr ${item.color} text-white flex items-center justify-center shadow-md`}>
                  <Icon className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Buka Alat</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. MAIN WORKBENCH: 2 COLUMNS (CONTINUE LEARNING vs DAILY CHALLENGE) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-black text-slate-900">Lanjutkan Pembelajaran</h2>
              </div>
              <button
                onClick={() => setActiveTab('knowledge')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Semua Materi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {continueItem && (
              <div className="p-5 rounded-2xl bg-linear-to-br from-slate-50 to-blue-50/40 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-700">
                      {continueItem.categoryLabel}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {continueItem.duration}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-800">
                    {continueItem.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                    {continueItem.summaryShort}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('knowledge');
                    setActiveMaterialId(continueItem.id);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-blue-500/20 shrink-0 cursor-pointer"
                >
                  <span>Mulai Baca</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Daily Technical Challenge */}
        <div className="bg-linear-to-br from-amber-50 via-orange-50/50 to-white rounded-3xl p-6 border border-amber-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <div>
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider block">
                  Daily Challenge
                </span>
                <h3 className="text-sm font-black text-slate-800">
                  {DAILY_CHALLENGE_QUESTION.topic}
                </h3>
              </div>
            </div>
            <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-lg">
              +{DAILY_CHALLENGE_QUESTION.xpReward} XP
            </span>
          </div>

          <p className="text-xs font-medium text-slate-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-amber-100">
            {DAILY_CHALLENGE_QUESTION.question}
          </p>

          <div className="space-y-2">
            {DAILY_CHALLENGE_QUESTION.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === DAILY_CHALLENGE_QUESTION.correctIndex;
              const showSuccess = (hasSubmitted || isDailyDone) && isCorrect;
              const showWrong = hasSubmitted && isSelected && !isCorrect;

              return (
                <button
                  key={idx}
                  disabled={isDailyDone || hasSubmitted}
                  onClick={() => handleDailySubmit(idx)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-between ${
                    showSuccess
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : showWrong
                      ? 'bg-rose-100 border-rose-400 text-rose-900'
                      : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/60 text-slate-700'
                  }`}
                >
                  <span>{opt}</span>
                  {showSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {(hasSubmitted || isDailyDone) && (
            <div className="p-3 bg-amber-100/70 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
              <span className="font-bold block mb-1">💡 Penjelasan Teknis:</span>
              {DAILY_CHALLENGE_QUESTION.explanation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
