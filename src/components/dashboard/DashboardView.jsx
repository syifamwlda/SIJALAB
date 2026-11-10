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
  Trophy,
  Check,
  Calendar,
  Layers,
  ArrowUpRight,
  Target
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DAILY_CHALLENGE_QUESTION, DEMO_LEADERBOARD } from '../../data/gamificationData';

export const DashboardView = () => {
  const {
    userProfile,
    materials,
    labs,
    dictionary,
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

  // Daily Quests
  const quests = [
    { id: 'q1', text: 'Jelajahi 1 materi di Knowledge Center', done: userProfile.completedMaterials.length > 0, xp: 25 },
    { id: 'q2', text: 'Pecahkan Tantangan Harian (Daily Challenge)', done: isDailyDone || hasSubmitted, xp: 40 },
    { id: 'q3', text: 'Coba 1 simulator di Arena Praktik & Game', done: userProfile.completedChallenges?.length > 0, xp: 35, action: 'cli-terminal' }
  ];

  // 4 Core Learning Pathways
  const LEARNING_TRACKS = [
    {
      id: 'networking',
      title: 'Jaringan Komputer & Cisco',
      desc: 'Subnetting IPv4, VLAN 802.1Q, Routing OSPF, dan Switch Catalyst.',
      icon: Network,
      color: 'bg-blue-500',
      tag: 'Cisco & Network',
      count: '4 Modul',
      category: 'cisco'
    },
    {
      id: 'linux',
      title: 'Administrasi Linux Server',
      desc: 'Navigasi CLI Bash, izin chmod, DNS Bind9, dan Web Server Nginx.',
      icon: Terminal,
      color: 'bg-emerald-500',
      tag: 'Server & OS',
      count: '3 Modul',
      category: 'linux'
    },
    {
      id: 'iot',
      title: 'Internet of Things (SIoT)',
      desc: 'Pemrograman ESP32, sensor suhu DHT22, dan modul relay AC 220V.',
      icon: Cpu,
      color: 'bg-amber-500',
      tag: 'ESP32 & Sensor',
      count: '3 Modul',
      category: 'iot'
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting & Lab SOP',
      desc: 'Crimping kabel UTP Cat6, diagnosa IP conflict, dan isolasi gateway.',
      icon: Wrench,
      color: 'bg-indigo-500',
      tag: 'SOP & Analisis',
      count: '8 Kasus',
      tabTarget: 'troubleshoot'
    }
  ];

  // Top 3 Leaderboard
  const topStudents = DEMO_LEADERBOARD.slice(0, 3);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 1. WELCOME HERO CARD (Airy, Modern, Vibrant & Clean) */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        {/* Subtle decorative color aura */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-blue-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-linear-to-tr from-cyan-100/40 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Greeting & Info */}
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-bold text-blue-700">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Digital Learning Universe • XII SIJA 1</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Selamat Datang Kembali, {userProfile.name.split(' ')[0]}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Platform pembelajaran terpadu kurikulum SIJA: kuasai infrastruktur jaringan, konfigurasi server Linux, dan otomasi mikrokontroler IoT secara interaktif.
            </p>

            {/* Quick Action Pills */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => {
                  setActiveTab('knowledge');
                  setActiveMaterialId(continueItem?.id);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Lanjut Belajar: {continueItem?.title?.substring(0, 24)}...</span>
              </button>

              <button
                onClick={() => setActiveTab('challenges')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Buka Simulator Praktik</span>
              </button>
            </div>
          </div>

          {/* Right Streak & Level Card */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-linear-to-br from-slate-50 to-blue-50/50 border border-blue-100/80 rounded-2xl p-5 shadow-xs shrink-0">
            {/* Streak flame indicator */}
            <div className="flex items-center gap-3 pr-4 sm:border-r sm:border-slate-200">
              <div className="w-13 h-13 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                <Flame className="w-7 h-7 text-amber-500 fill-amber-500 animate-bounce" />
              </div>
              <div className="text-left">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">{userProfile.streakDays}</span>
                  <span className="text-xs font-bold text-amber-700 uppercase">Hari</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium block">Streak Aktif 🔥</span>
              </div>
            </div>

            {/* Level status */}
            <div className="text-left space-y-1 pl-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Peringkat Keahlian</span>
              <span className="text-sm font-black text-blue-700 block">{levelInfo.tier.title}</span>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                <span>{userProfile.xp} XP</span>
                <span>•</span>
                <span>Level {levelInfo.tier.level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATS ROW (4 Balanced, Clean Metric Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total XP & Next Level Progress */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all card-hover-lift">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Poin Pengalaman</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">{userProfile.xp}</span>
            <span className="text-xs font-bold text-blue-600">XP</span>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
              <span>Progres Level</span>
              <span>{levelInfo.progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Materi Tuntas */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all card-hover-lift">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Materi Tuntas</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">{userProfile.completedMaterials.length}</span>
            <span className="text-xs font-medium text-slate-500">/ {materials.length} Topik</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{Math.round((userProfile.completedMaterials.length / materials.length) * 100)}% Kurikulum Tuntas</span>
          </div>
        </div>

        {/* Card 3: Praktikum Lab Selesai */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-sky-300 transition-all card-hover-lift">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Praktikum Lab</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">{userProfile.completedLabs.length}</span>
            <span className="text-xs font-medium text-slate-500">/ {labs.length} Panduan</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-sky-700 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Keterampilan Praktik</span>
          </div>
        </div>

        {/* Card 4: Lencana Koleksi */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-purple-300 transition-all card-hover-lift">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Lencana Koleksi</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">{userProfile.unlockedBadges.length}</span>
            <span className="text-xs font-medium text-slate-500">Lencana Diraih</span>
          </div>
          <button
            onClick={() => setActiveTab('gamification')}
            className="mt-3 flex items-center gap-1 text-xs text-purple-700 font-bold hover:text-purple-800 cursor-pointer"
          >
            <span>Buka Showcase</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. MAIN WORKBENCH: 2 BALANCED COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Primary Learning Tracks - 2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning Spotlight Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                <h2 className="text-base font-extrabold text-slate-900">Lanjutkan Modul Belajar</h2>
              </div>
              <button
                onClick={() => setActiveTab('knowledge')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat Semua ({materials.length})</span>
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
                    <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      +{continueItem.xp} XP
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
                  <Play className="w-4 h-4 fill-white" />
                  <span>Mulai Membaca</span>
                </button>
              </div>
            )}
          </div>

          {/* 4 Core Learning Pathways */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Jalur Kompetensi SIJA</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Pilar utama pembelajaran kejuruan Sistem Informatika, Jaringan, dan Aplikasi.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LEARNING_TRACKS.map((track) => {
                const Icon = track.icon;
                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      if (track.tabTarget) {
                        setActiveTab(track.tabTarget);
                      } else {
                        setActiveTab('knowledge');
                      }
                    }}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all cursor-pointer flex flex-col justify-between group space-y-3 card-hover-lift"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className={`w-9 h-9 rounded-xl ${track.color} text-white flex items-center justify-center shadow-sm`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {track.count}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                          {track.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium line-clamp-2">
                          {track.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                      <span className="text-[11px] text-slate-400 font-medium">{track.tag}</span>
                      <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Buka Jalur</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Hardware & Simulator Workstation Shortcuts */}
          <div className="bg-linear-to-br from-indigo-50/50 via-blue-50/30 to-white rounded-3xl p-6 border border-blue-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">Pintasan Simulator Interaktif</h3>
              </div>
              <button
                onClick={() => setActiveTab('challenges')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Arena Lengkap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: 'CLI Terminal', desc: 'Ubuntu & Cisco', icon: Terminal, id: 'cli-terminal', color: 'text-emerald-600 bg-emerald-50' },
                { title: 'Topologi', desc: 'Simulasi Packet Ping', icon: Network, id: 'topology-canvas', color: 'text-blue-600 bg-blue-50' },
                { title: 'Rakit IoT', desc: 'ESP32 & Sensor', icon: Cpu, id: 'iot-breadboard', color: 'text-amber-600 bg-amber-50' },
                { title: 'Crimping', desc: 'Kabel UTP T568B', icon: Wrench, id: 'utp-crimping', color: 'text-indigo-600 bg-indigo-50' }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab('challenges');
                      setActiveChallengeId(item.id);
                    }}
                    className="p-3 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer group space-y-2"
                  >
                    <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center font-bold`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-slate-800 group-hover:text-blue-600 block leading-tight">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Daily Challenge, Daily Quests & Leaderboard (1 Col) */}
        <div className="space-y-6">
          {/* Daily Technical Challenge Card */}
          <div className="bg-linear-to-br from-amber-50 via-orange-50/40 to-white rounded-3xl p-6 border border-amber-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <Zap className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider block">
                    Daily Challenge
                  </span>
                  <h3 className="text-sm font-black text-slate-900">
                    {DAILY_CHALLENGE_QUESTION.topic}
                  </h3>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-black rounded-lg">
                +{DAILY_CHALLENGE_QUESTION.xpReward} XP
              </span>
            </div>

            <p className="text-xs font-medium text-slate-700 leading-relaxed bg-white/80 p-3.5 rounded-2xl border border-amber-100">
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
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-black'
                        : showWrong
                        ? 'bg-rose-100 border-rose-400 text-rose-900 font-bold'
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
              <div className="p-3.5 bg-amber-100/70 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed">
                <span className="font-bold block mb-1">💡 Penjelasan Teknis:</span>
                {DAILY_CHALLENGE_QUESTION.explanation}
              </div>
            )}
          </div>

          {/* Daily Quests Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-black text-slate-900">Misi Belajar Hari Ini</h3>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
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
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 font-bold'
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

          {/* Mini Leaderboard Preview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-black text-slate-900">Peringkat Pelajar SIJA</h3>
              </div>
              <button
                onClick={() => setActiveTab('gamification')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Lengkap &rarr;
              </button>
            </div>

            <div className="space-y-2.5">
              {topStudents.map((st, i) => (
                <div
                  key={st.name}
                  className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        i === 0
                          ? 'bg-amber-400 text-slate-950 shadow-xs'
                          : i === 1
                          ? 'bg-slate-300 text-slate-800'
                          : 'bg-amber-700 text-white'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <img
                      src={st.avatar}
                      alt={st.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{st.name}</p>
                      <span className="text-[10px] text-slate-400 font-medium">{st.class}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-blue-700">{st.xp} XP</span>
                </div>
              ))}

              {/* Current user rank indicator */}
              <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                    4
                  </span>
                  <img
                    src={userProfile.avatarUrl}
                    alt={userProfile.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-blue-500/30"
                  />
                  <div>
                    <p className="text-xs font-black text-blue-900">{userProfile.name} (Kamu)</p>
                    <span className="text-[10px] text-blue-600 font-bold">{userProfile.schoolClass}</span>
                  </div>
                </div>
                <span className="text-xs font-black text-blue-700">{userProfile.xp} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
