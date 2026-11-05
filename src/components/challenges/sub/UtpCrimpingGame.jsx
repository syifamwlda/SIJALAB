import React, { useState } from 'react';
import {
  Wrench,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Play,
  Sparkles,
  Info,
  Check,
  Zap
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const UtpCrimpingGame = () => {
  const { addXP, unlockBadge } = useApp();

  const CORRECT_T568B = [
    { id: 'wo', name: 'Putih-Oranye', color: 'bg-orange-200 border-2 border-orange-500' },
    { id: 'o', name: 'Oranye', color: 'bg-orange-500 border-2 border-orange-600' },
    { id: 'wg', name: 'Putih-Hijau', color: 'bg-emerald-200 border-2 border-emerald-500' },
    { id: 'b', name: 'Biru', color: 'bg-blue-600 border-2 border-blue-700' },
    { id: 'wb', name: 'Putih-Biru', color: 'bg-blue-200 border-2 border-blue-500' },
    { id: 'g', name: 'Hijau', color: 'bg-emerald-600 border-2 border-emerald-700' },
    { id: 'wbr', name: 'Putih-Cokelat', color: 'bg-amber-200 border-2 border-amber-800' },
    { id: 'br', name: 'Cokelat', color: 'bg-amber-800 border-2 border-amber-900' }
  ];

  // Available wires in pool (shuffled initially)
  const [wirePool, setWirePool] = useState(() => {
    return [...CORRECT_T568B].sort(() => Math.random() - 0.5);
  });

  // Wires inserted in RJ45 (max 8)
  const [insertedWires, setInsertedWires] = useState([]);

  // Crimping and tester state
  const [isCrimped, setIsCrimped] = useState(false);
  const [testerLedIndex, setTesterLedIndex] = useState(null);
  const [resultEvaluation, setResultEvaluation] = useState(null);

  const handleSelectWire = (wire) => {
    if (insertedWires.length >= 8 || isCrimped) return;
    setInsertedWires((prev) => [...prev, wire]);
    setWirePool((prev) => prev.filter((w) => w.id !== wire.id));
  };

  const handleRemoveWire = (index) => {
    if (isCrimped) return;
    const removed = insertedWires[index];
    setInsertedWires((prev) => prev.filter((_, i) => i !== index));
    setWirePool((prev) => [...prev, removed]);
  };

  const handleReset = () => {
    setInsertedWires([]);
    setWirePool([...CORRECT_T568B].sort(() => Math.random() - 0.5));
    setIsCrimped(false);
    setTesterLedIndex(null);
    setResultEvaluation(null);
  };

  const runCrimpingAndTest = () => {
    if (insertedWires.length < 8) return;
    setIsCrimped(true);

    // Simulate LAN Tester sequential light scan 1-8
    let currentPin = 1;
    const interval = setInterval(() => {
      setTesterLedIndex(currentPin);
      currentPin++;
      if (currentPin > 8) {
        clearInterval(interval);
        evaluateResult();
      }
    }, 250);
  };

  const evaluateResult = () => {
    const isExact = insertedWires.every((w, idx) => w.id === CORRECT_T568B[idx].id);

    if (isExact) {
      setResultEvaluation({
        success: true,
        title: 'PERAKITAN 100% SEMPURNA! (T568B STRAIGHT)',
        desc: 'Semua pin 1 sampai 8 terhubung lurus dan sinkron di LAN Tester. Kabel siap digunakan untuk koneksi Gigabit Ethernet 1000BASE-T.'
      });
      addXP(80, 'Perakitan crimping kabel UTP T568B berhasil!');
      unlockBadge('badge-curious-mind');
    } else {
      setResultEvaluation({
        success: false,
        title: 'URUTAN WARNA KAWAT KELIRU (MISWIRED)',
        desc: 'Lampu LAN Tester melompat atau tidak sejajar. Ingat aturan T568B: Putih-Hijau di Pin 3 dan Hijau di Pin 6 membungkus pasangan Biru di Pin 4-5.'
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-3xl mx-auto">
      {/* Game Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
            Interactive Hardware Game
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Simulasi Crimping Kabel UTP & LAN Tester
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Susun 8 kawat tembaga ke dalam konektor transparan RJ45 sesuai standar baku TIA/EIA-568-B.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Kabel</span>
        </button>
      </div>

      {/* Main Assembly Arena */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
        {/* RJ45 Head Visualizer */}
        <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 text-center space-y-4">
          <div className="inline-block px-3 py-1 bg-slate-800 rounded-full text-xs font-mono font-bold text-cyan-400">
            Konektor RJ45 Modular Plug (8 Pin Slots)
          </div>

          {/* 8 Pin slots in connector */}
          <div className="flex items-end justify-center gap-2 max-w-md mx-auto pt-4">
            {Array.from({ length: 8 }, (_, idx) => {
              const wire = insertedWires[idx];

              return (
                <div
                  key={idx}
                  onClick={() => wire && handleRemoveWire(idx)}
                  className={`w-10 h-28 rounded-t-xl border-2 flex flex-col items-center justify-between p-1.5 transition-all cursor-pointer ${
                    wire
                      ? `${wire.color} shadow-lg scale-105`
                      : 'border-dashed border-slate-700 bg-slate-900/50 hover:border-slate-500'
                  }`}
                  title={wire ? `Pin ${idx + 1}: ${wire.name} (Klik untuk lepas)` : `Pin ${idx + 1}: Kosong`}
                >
                  <span className="text-[10px] font-black font-mono text-slate-900 bg-white/80 px-1 rounded">
                    {idx + 1}
                  </span>

                  {wire ? (
                    <span className="text-[8px] font-bold text-slate-900 bg-white/90 px-0.5 rounded rotate-90 whitespace-nowrap mb-4">
                      {wire.name}
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-600 font-bold mb-2">Slot</span>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-400 font-medium">
            {insertedWires.length === 8
              ? '✅ 8 Kawat telah dimasukkan ke konektor RJ45!'
              : `Masukkan ${8 - insertedWires.length} kawat lagi dari kumpulan di bawah.`}
          </p>
        </div>

        {/* Wire Pool (Unplaced wires) */}
        {!isCrimped && (
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Kawat Tersedia (Klik untuk Memasukkan ke Pin Terdekat):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {wirePool.map((wire) => (
                <button
                  key={wire.id}
                  onClick={() => handleSelectWire(wire)}
                  className={`p-3 rounded-xl border text-xs font-bold text-slate-900 transition-all flex items-center justify-between gap-2 shadow-xs hover:scale-105 cursor-pointer ${wire.color}`}
                >
                  <span>{wire.name}</span>
                  <span className="text-slate-900 font-black">+</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Crimping Action Button */}
        {!isCrimped && (
          <button
            onClick={runCrimpingAndTest}
            disabled={insertedWires.length < 8}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Wrench className="w-4 h-4" />
            <span>🔧 Lakukan Press Tang Crimping & Uji di LAN Tester</span>
          </button>
        )}

        {/* LAN TESTER SIMULATION BAR */}
        {isCrimped && (
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">
                LAN Cable Tester 9V Scanning...
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Master & Remote Unit</span>
            </div>

            {/* 8 LED indicators */}
            <div className="grid grid-cols-8 gap-2 max-w-sm mx-auto">
              {Array.from({ length: 8 }, (_, i) => {
                const pinNum = i + 1;
                const isLighting = testerLedIndex === pinNum;

                return (
                  <div key={pinNum} className="text-center space-y-1">
                    <div
                      className={`w-7 h-7 rounded-full mx-auto flex items-center justify-center font-mono font-bold text-xs transition-all ${
                        isLighting
                          ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/80 scale-125 ring-4 ring-emerald-300/40'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {pinNum}
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono">P{pinNum}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Result Evaluation Output */}
        {resultEvaluation && (
          <div
            className={`p-5 rounded-2xl border text-xs font-bold animate-in fade-in flex items-start gap-3 ${
              resultEvaluation.success
                ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950 border-rose-500/50 text-rose-300'
            }`}
          >
            {resultEvaluation.success ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="block font-black text-sm mb-1">{resultEvaluation.title}</span>
              <p className="leading-relaxed font-medium">{resultEvaluation.desc}</p>
            </div>
          </div>
        )}
      </div>

      {/* Jembatan Keledai Tips Card */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs space-y-1 text-amber-950 font-medium">
        <span className="font-extrabold block text-amber-900">💡 Jembatan Keledai Urutan T568B:</span>
        <p className="leading-relaxed">
          1. Putih-Oranye, 2. Oranye, 3. Putih-Hijau, 4. Biru, 5. Putih-Biru, 6. Hijau, 7. Putih-Cokelat, 8. Cokelat. (Warna hijau selalu membungkus warna biru di tengah).
        </p>
      </div>
    </div>
  );
};

