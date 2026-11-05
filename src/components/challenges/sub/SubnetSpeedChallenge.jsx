import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const SubnetSpeedChallenge = () => {
  const { addXP } = useApp();

  const SUBNET_PROBLEMS = [
    {
      id: 1,
      ipPrefix: '192.168.10.45/27',
      netmask: '255.255.255.224',
      correctNetwork: '192.168.10.32',
      correctFirst: '192.168.10.33',
      correctLast: '192.168.10.62',
      correctBroadcast: '192.168.10.63',
      totalUsable: 30
    },
    {
      id: 2,
      ipPrefix: '172.16.5.70/26',
      netmask: '255.255.255.192',
      correctNetwork: '172.16.5.64',
      correctFirst: '172.16.5.65',
      correctLast: '172.16.5.126',
      correctBroadcast: '172.16.5.127',
      totalUsable: 62
    },
    {
      id: 3,
      ipPrefix: '10.0.0.14/29',
      netmask: '255.255.255.248',
      correctNetwork: '10.0.0.8',
      correctFirst: '10.0.0.9',
      correctLast: '10.0.0.14',
      correctBroadcast: '10.0.0.15',
      totalUsable: 6
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [networkInput, setNetworkInput] = useState('');
  const [firstInput, setFirstInput] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [broadcastInput, setBroadcastInput] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const problem = SUBNET_PROBLEMS[currentIndex];

  const handleCheckAnswers = (e) => {
    e.preventDefault();
    setIsChecked(true);

    const netOk = networkInput.trim() === problem.correctNetwork;
    const firstOk = firstInput.trim() === problem.correctFirst;
    const lastOk = lastInput.trim() === problem.correctLast;
    const bcastOk = broadcastInput.trim() === problem.correctBroadcast;

    const allOk = netOk && firstOk && lastOk && bcastOk;
    setIsSuccess(allOk);

    if (allOk) {
      addXP(60, `Kalkulasi Subnetting ${problem.ipPrefix} Tepat 100%!`);
    }
  };

  const handleNextProblem = () => {
    if (currentIndex + 1 < SUBNET_PROBLEMS.length) {
      setCurrentIndex((prev) => prev + 1);
      setNetworkInput('');
      setFirstInput('');
      setLastInput('');
      setBroadcastInput('');
      setIsChecked(false);
      setIsSuccess(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-2xl mx-auto">
      {/* Card Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2">
        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
          Subnet Calculator Quiz Game
        </span>
        <h2 className="text-xl font-black text-slate-900">
          Tantangan Hitung Cepat Subnetting CIDR
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Diberikan sebuah IP host dan prefix. Hitunglah Network ID, rentang Host Valid, dan Broadcast ID.
        </p>
      </div>

      {/* Problem Challenge Box */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-400">
            Soal {currentIndex + 1} dari {SUBNET_PROBLEMS.length}
          </span>
          <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 font-black text-xs rounded-full border border-amber-500/30">
            +60 XP
          </span>
        </div>

        {/* Big IP target */}
        <div className="p-5 rounded-2xl bg-linear-to-r from-blue-900/50 to-indigo-900/50 border border-blue-500/30 text-center space-y-1">
          <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest font-bold">
            Target IP Host:
          </span>
          <h3 className="text-3xl font-mono font-black text-white tracking-wider">
            {problem.ipPrefix}
          </h3>
          <p className="text-xs text-slate-300 font-mono">
            Subnet Mask: <span className="font-bold text-amber-300">{problem.netmask}</span>
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCheckAnswers} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1">Network Address:</label>
              <input
                type="text"
                value={networkInput}
                onChange={(e) => setNetworkInput(e.target.value)}
                placeholder="192.168.x.x"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold outline-hidden focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-slate-300 font-bold block mb-1">First Usable Host:</label>
              <input
                type="text"
                value={firstInput}
                onChange={(e) => setFirstInput(e.target.value)}
                placeholder="192.168.x.x"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold outline-hidden focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-slate-300 font-bold block mb-1">Last Usable Host:</label>
              <input
                type="text"
                value={lastInput}
                onChange={(e) => setLastInput(e.target.value)}
                placeholder="192.168.x.x"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold outline-hidden focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-slate-300 font-bold block mb-1">Broadcast Address:</label>
              <input
                type="text"
                value={broadcastInput}
                onChange={(e) => setBroadcastInput(e.target.value)}
                placeholder="192.168.x.x"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold outline-hidden focus:border-cyan-400"
              />
            </div>
          </div>

          {!isChecked ? (
            <button
              type="submit"
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-cyan-500/25 cursor-pointer"
            >
              Periksa Hasil Kalkulasi Subnet
            </button>
          ) : (
            <div className="space-y-3">
              <div
                className={`p-4 rounded-xl border text-xs font-bold ${
                  isSuccess
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : 'bg-rose-950 border-rose-500 text-rose-300'
                }`}
              >
                {isSuccess ? (
                  <p>🎉 Keren! Seluruh perhitungan network, host range, dan broadcast tepat!</p>
                ) : (
                  <div>
                    <p className="mb-1">❌ Masih ada yang keliru. Kunci jawaban yang tepat:</p>
                    <p className="font-mono text-[11px] text-slate-300">
                      Network: {problem.correctNetwork} | Range: {problem.correctFirst} s/d {problem.correctLast} | Broadcast: {problem.correctBroadcast}
                    </p>
                  </div>
                )}
              </div>

              {currentIndex + 1 < SUBNET_PROBLEMS.length && (
                <button
                  type="button"
                  onClick={handleNextProblem}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Lanjut ke Soal Berikutnya &rarr;
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

