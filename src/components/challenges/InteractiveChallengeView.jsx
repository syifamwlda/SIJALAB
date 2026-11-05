import React, { useState } from 'react';
import {
  Gamepad2,
  Sparkles,
  ArrowLeft,
  Terminal,
  Network,
  Cpu,
  Wrench,
  Calculator,
  Grid,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Zap,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CliTerminalSimulator } from './sub/CliTerminalSimulator';
import { NetworkTopologySimulator } from './sub/NetworkTopologySimulator';
import { VirtualBreadboardSimulator } from './sub/VirtualBreadboardSimulator';
import { UtpCrimpingGame } from './sub/UtpCrimpingGame';
import { SubnetSpeedChallenge } from './sub/SubnetSpeedChallenge';
import { TECHNICAL_CROSSWORD_DATA } from '../../data/challengesData';

export const InteractiveChallengeView = () => {
  const {
    activeChallengeId,
    setActiveChallengeId,
    addXP
  } = useApp();

  const CHALLENGE_MODES = [
    {
      id: 'cli-terminal',
      title: 'Live CLI Terminal Lab',
      tagline: 'Praktik langsung mengetik perintah terminal nyata pada Ubuntu Linux dan Cisco IOS Switch.',
      category: 'Simulasi Terminal',
      icon: Terminal,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Interactive CLI',
      xpReward: 80,
      difficulty: 'Menengah'
    },
    {
      id: 'topology-canvas',
      title: 'Visual Topology Config Simulator',
      tagline: 'Klik perangkat pada topologi untuk konfigurasi IP, subnet, dan uji simulasi pengiriman paket ping.',
      category: 'Simulasi Topologi',
      icon: Network,
      color: 'from-blue-600 to-cyan-500',
      badge: 'Live Canvas',
      xpReward: 90,
      difficulty: 'Lanjutan'
    },
    {
      id: 'iot-breadboard',
      title: 'Virtual Breadboard & IoT Wiring',
      tagline: 'Rakit dan susun komponen LED, Resistor 220Ω, DHT22, dan Relay ke mikrokontroler ESP32.',
      category: 'Menyusun Komponen',
      icon: Cpu,
      color: 'from-amber-500 to-orange-500',
      badge: 'Hardware Workbench',
      xpReward: 85,
      difficulty: 'Menengah'
    },
    {
      id: 'utp-crimping',
      title: 'RJ45 Cable Crimping Game',
      tagline: 'Susun 8 warna kawat standar T568B ke konektor RJ45 dan uji kelayakan kontinuitas di LAN Tester.',
      category: 'Game Praktik',
      icon: Wrench,
      color: 'from-indigo-600 to-blue-500',
      badge: 'Perakitan Fisik',
      xpReward: 80,
      difficulty: 'Dasar'
    },
    {
      id: 'subnet-speed',
      title: 'Subnetting Speed Challenge',
      tagline: 'Teka-teki hitung cepat Network ID, host valid, dan broadcast dari prefix CIDR acak.',
      category: 'Teka-Teki Hitung',
      icon: Calculator,
      color: 'from-purple-600 to-pink-500',
      badge: 'Speed Puzzle',
      xpReward: 60,
      difficulty: 'Menengah'
    },
    {
      id: 'tech-crossword',
      title: 'Technical Crossword (TTS SIJA)',
      tagline: 'Teka-Teki Silang kosakata esensial jaringan, server, dan IoT SMK SIJA.',
      category: 'Teka-Teki Kata',
      icon: Grid,
      color: 'from-cyan-600 to-blue-600',
      badge: 'Kosakata SIJA',
      xpReward: 70,
      difficulty: 'Dasar'
    }
  ];

  // Crossword state
  const [crosswordInputs, setCrosswordInputs] = useState({});
  const [crosswordChecked, setCrosswordChecked] = useState(false);

  const handleCrosswordChange = (num, val) => {
    setCrosswordInputs((prev) => ({
      ...prev,
      [num]: val.toUpperCase()
    }));
  };

  const checkCrossword = () => {
    setCrosswordChecked(true);
    let allOk = true;
    TECHNICAL_CROSSWORD_DATA.clues.forEach((c) => {
      if (crosswordInputs[c.number] !== c.answer) {
        allOk = false;
      }
    });

    if (allOk) {
      addXP(70, 'Teka-Teki Silang SIJA tuntas 100%!');
    }
  };

  // --- RUNNER VIEW FOR SELECTED SIMULATOR / GAME ---
  if (activeChallengeId) {
    const currentMeta = CHALLENGE_MODES.find((m) => m.id === activeChallengeId);

    return (
      <div className="space-y-6 pb-16 animate-in fade-in duration-200">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveChallengeId(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Arena Simulator & Game SIJA</span>
          </button>

          <span className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            +{currentMeta?.xpReward || 50} XP Reward
          </span>
        </div>

        {/* Dynamic Simulator Renderer */}
        {activeChallengeId === 'cli-terminal' && <CliTerminalSimulator />}
        {activeChallengeId === 'topology-canvas' && <NetworkTopologySimulator />}
        {activeChallengeId === 'iot-breadboard' && <VirtualBreadboardSimulator />}
        {activeChallengeId === 'utp-crimping' && <UtpCrimpingGame />}
        {activeChallengeId === 'subnet-speed' && <SubnetSpeedChallenge />}

        {/* Crossword Runner */}
        {activeChallengeId === 'tech-crossword' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl font-black text-slate-900">Teka-Teki Silang Kosakata SIJA</h2>
              <p className="text-xs text-slate-500 font-medium">Ketik jawaban dengan huruf KAPITAL pada kotak nomor petunjuk.</p>
            </div>

            <div className="space-y-3">
              {TECHNICAL_CROSSWORD_DATA.clues.map((c) => {
                const userVal = crosswordInputs[c.number] || '';
                const isCorrect = userVal === c.answer;

                return (
                  <div key={c.number} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-700">
                      <span>No {c.number} ({c.direction === 'across' ? 'Mendatar' : 'Menurun'}) — {c.answer.length} Huruf</span>
                      {crosswordChecked && (
                        <span className={isCorrect ? 'text-emerald-600' : 'text-rose-600 font-bold'}>
                          {isCorrect ? '✓ Benar!' : `Salah (Jawaban: ${c.answer})`}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 font-medium">{c.clue}</p>
                    <input
                      type="text"
                      maxLength={c.answer.length}
                      value={userVal}
                      onChange={(e) => handleCrosswordChange(c.number, e.target.value)}
                      placeholder={`Ketik kata (${c.answer.length} huruf)...`}
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-200 font-mono font-black text-slate-800 uppercase outline-hidden focus:border-cyan-500"
                    />
                  </div>
                );
              })}
            </div>

            <button
              onClick={checkCrossword}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              Periksa Jawaban Teka-Teki Silang
            </button>
          </div>
        )}
      </div>
    );
  }

  // --- CATALOG VIEW: INTERACTIVE LABS & GAMES HUB ---
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Interactive Lab & Gaming Hub
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-black bg-amber-100 text-amber-800 rounded-full">
              6 Mode Simulator
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Bukan sekadar kuis pilihan ganda! Praktik langsung dengan terminal CLI nyata, simulasi paket topologi jaringan, dan perakitan komponen IoT.
          </p>
        </div>
      </div>

      {/* Grid of 6 Distinct Interactive Simulators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHALLENGE_MODES.map((mode) => {
          const Icon = mode.icon;

          return (
            <div
              key={mode.id}
              onClick={() => setActiveChallengeId(mode.id)}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer card-hover-lift"
            >
              <div className="space-y-4">
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-linear-to-tr ${mode.color} text-white flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-6 h-6 fill-white text-white" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-50 text-amber-800 border border-amber-200">
                    +{mode.xpReward} XP
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">
                    {mode.category}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                    {mode.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                    {mode.tagline}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span className="text-slate-400 font-semibold">{mode.difficulty}</span>
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Buka Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
