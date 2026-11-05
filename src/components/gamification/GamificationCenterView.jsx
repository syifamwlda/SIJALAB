import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Award,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
  TrendingUp,
  Star,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ALL_BADGES, LEVEL_TIERS, DEMO_LEADERBOARD } from '../../data/gamificationData';

export const GamificationCenterView = () => {
  const { userProfile, getCurrentLevel } = useApp();
  const levelInfo = getCurrentLevel();

  const [leaderboardTab, setLeaderboardTab] = useState('weekly');

  // Days of current month for visual calendar
  const currentDaysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  // Active days simulation based on streak
  const activeDays = [1, 2, 3, 4, 5];

  // Dynamic leaderboard sorting
  const dynamicLeaderboard = [...DEMO_LEADERBOARD]
    .map((item) => (item.isCurrentUser ? { ...item, xp: userProfile.xp, streak: userProfile.streakDays } : item))
    .sort((a, b) => b.xp - a.xp)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-6 sm:p-8 shadow-xl shadow-purple-500/15">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              Gamification & Achievement Center
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Pusat Prestasi & Konsistensi Belajar
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 font-medium max-w-xl leading-relaxed">
              Kumpulkan poin pengalaman (XP), tingkatkan rank keahlian, pertahankan rekor streak harian, dan raih lencana kehormatan siswa SIJA!
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-purple-200 block">Rank Keahlian Saat Ini</span>
            <span className="text-xl font-black text-amber-300 block">{levelInfo.tier.title}</span>
            <span className="text-xs text-white font-semibold">{userProfile.xp} Total XP</span>
          </div>
        </div>
      </div>

      {/* 1. LEARNING STREAK & CALENDAR SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Streak Highlight Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              Learning Streak
            </h2>
            <span className="text-xs font-extrabold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
              Aktif
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-linear-to-br from-amber-50 to-orange-50/50 border border-amber-200 text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 text-orange-500 mx-auto flex items-center justify-center">
              <Flame className="w-10 h-10 fill-orange-500 animate-bounce" />
            </div>
            <div>
              <span className="text-4xl font-black text-slate-900 tracking-tight">
                {userProfile.streakDays}
              </span>
              <span className="text-sm font-bold text-orange-700 ml-1.5 uppercase">
                Hari Berturut-turut
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Rekor terpanjangmu: <span className="font-bold text-slate-800">{userProfile.longestStreak} hari</span>
            </p>
          </div>

          {/* Weekly Tracker Pills (Mon-Sun) */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Aktivitas Pekan Ini</span>
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, i) => {
                const isPassed = i < userProfile.streakDays;
                return (
                  <div
                    key={day}
                    className={`p-2 rounded-xl border text-[11px] font-bold ${
                      isPassed
                        ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    <span>{day}</span>
                    <span className="block text-[9px] mt-0.5">{isPassed ? '✓' : '•'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Monthly Activity Calendar */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-extrabold text-slate-800">
                Kalender Pembelajaran Bulanan
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-semibold">November 2026</span>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Kotak bertanda api menyala menunjukkan hari di mana kamu aktif menyelesaikan modul pembelajaran, praktikum, atau tantangan teknis.
          </p>

          <div className="grid grid-cols-7 sm:grid-cols-10 gap-2 pt-2">
            {currentDaysInMonth.map((day) => {
              const isActive = activeDays.includes(day);

              return (
                <div
                  key={day}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isActive
                      ? 'bg-orange-50 border-orange-300 text-orange-700 font-black shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 text-slate-400 font-medium'
                  }`}
                >
                  <span className="text-xs block">{day}</span>
                  <span className="text-[10px] block mt-0.5">
                    {isActive ? '🔥' : '–'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-md bg-orange-500" />
              <span>Hari Aktif Belajar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-md bg-slate-200" />
              <span>Belum Ada Aktivitas</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ACHIEVEMENT BADGES SHOWCASE */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            <h2 className="text-base font-extrabold text-slate-800">
              Showcase Lencana Prestasi ({userProfile.unlockedBadges.length} / {ALL_BADGES.length} Terbuka)
            </h2>
          </div>
          <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            Koleksi SIJA
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = userProfile.unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-white border-purple-200 shadow-xs hover:border-purple-400 hover:shadow-md'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${
                        isUnlocked
                          ? `bg-linear-to-tr ${badge.color}`
                          : 'bg-slate-300 text-slate-500 shadow-none'
                      }`}
                    >
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isUnlocked
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isUnlocked ? 'Terbuka' : 'Terkunci'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800">
                      {badge.name} ({badge.title})
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                      {badge.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-bold text-slate-400">
                  <span>Reward: +{badge.xpReward} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. LEADERBOARD RANKINGS */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-extrabold text-slate-800">
              Papan Peringkat Pelajar (Leaderboard)
            </h2>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            {['weekly', 'monthly', 'all-time'].map((tab) => (
              <button
                key={tab}
                onClick={() => setLeaderboardTab(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  leaderboardTab === tab
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab === 'weekly' ? 'Pekan Ini' : tab === 'monthly' ? 'Bulan Ini' : 'Sepanjang Masa'}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider font-extrabold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Peringkat</th>
                <th className="py-3 px-4">Siswa</th>
                <th className="py-3 px-4">Kelas</th>
                <th className="py-3 px-4">Lencana Rank</th>
                <th className="py-3 px-4 text-center">Streak</th>
                <th className="py-3 px-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {dynamicLeaderboard.map((item) => (
                <tr
                  key={item.name}
                  className={`transition-colors ${
                    item.isCurrentUser
                      ? 'bg-blue-50/70 border-l-4 border-l-blue-600 font-bold'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black ${
                        item.rank === 1
                          ? 'bg-amber-400 text-slate-900 shadow-xs'
                          : item.rank === 2
                          ? 'bg-slate-300 text-slate-800'
                          : item.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'text-slate-500'
                      }`}
                    >
                      {item.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 flex items-center gap-2.5">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-slate-800">
                      {item.name} {item.isCurrentUser && '(Kamu)'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{item.class}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-50 text-indigo-700">
                      {item.badge}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-orange-600 font-extrabold">
                    🔥 {item.streak}
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-blue-700">
                    {item.xp} XP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

