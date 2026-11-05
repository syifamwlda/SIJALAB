import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Cpu,
  FlaskConical,
  LifeBuoy,
  Gamepad2,
  Trophy,
  Users,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    isSidebarOpen,
    setIsSidebarOpen,
    materials,
    dictionary,
    labs,
    troubleshoots,
    userProfile
  } = useApp();

  const NAV_ITEMS = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      color: 'text-blue-600',
      activeBg: 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
    },
    {
      id: 'knowledge',
      label: 'Knowledge Center',
      icon: BookOpen,
      badge: materials.length,
      badgeColor: 'bg-blue-100 text-blue-700 font-bold',
      color: 'text-indigo-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
    },
    {
      id: 'dictionary',
      label: 'Tech Dictionary',
      icon: Cpu,
      badge: dictionary.length,
      badgeColor: 'bg-teal-100 text-teal-700 font-bold',
      color: 'text-teal-600',
      activeBg: 'bg-teal-600 text-white shadow-md shadow-teal-500/25'
    },
    {
      id: 'lab',
      label: 'Lab Guide',
      icon: FlaskConical,
      badge: labs.length,
      badgeColor: 'bg-sky-100 text-sky-700 font-bold',
      color: 'text-sky-600',
      activeBg: 'bg-sky-600 text-white shadow-md shadow-sky-500/25'
    },
    {
      id: 'troubleshoot',
      label: 'Troubleshooting Center',
      icon: LifeBuoy,
      badge: troubleshoots.length,
      badgeColor: 'bg-rose-100 text-rose-700 font-bold',
      color: 'text-rose-600',
      activeBg: 'bg-rose-600 text-white shadow-md shadow-rose-500/25'
    },
    {
      id: 'challenges',
      label: 'Interactive Lab & Games',
      icon: Gamepad2,
      badge: 'Game & CLI',
      badgeColor: 'bg-amber-100 text-amber-800 font-extrabold',
      color: 'text-amber-600',
      activeBg: 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
    },
    {
      id: 'gamification',
      label: 'Gamification Center',
      icon: Trophy,
      badge: `${userProfile.unlockedBadges.length} Badge`,
      badgeColor: 'bg-purple-100 text-purple-700 font-bold',
      color: 'text-purple-600',
      activeBg: 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
    },
    {
      id: 'student-corner',
      label: 'Student Corner',
      icon: Users,
      badge: 'Diskusi',
      badgeColor: 'bg-emerald-100 text-emerald-700 font-bold',
      color: 'text-emerald-600',
      activeBg: 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
    },
    {
      id: 'profile',
      label: 'My Learning & Profil',
      icon: UserCheck,
      badge: null,
      color: 'text-blue-700',
      activeBg: 'bg-blue-700 text-white shadow-md shadow-blue-700/25'
    }
  ];

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-white border-r border-slate-200/90 transition-all duration-300 flex flex-col justify-between shadow-xs ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Top Header / Brand Logo */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 text-left group cursor-pointer overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform shrink-0">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            {isSidebarOpen && (
              <div className="transition-opacity duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight bg-linear-to-r from-blue-700 via-indigo-700 to-cyan-600 bg-clip-text text-transparent">
                    SIJALAB
                  </span>
                  <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-black rounded-md tracking-wider">
                    PRO
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-slate-500 tracking-tight">
                  Discover. Learn. Explore.
                </p>
              </div>
            )}
          </button>

          {/* Collapse Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title={isSidebarOpen ? 'Ciutkan Sidebar' : 'Perluas Sidebar'}
          >
            {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items List */}
        <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-210px)]">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl font-bold text-xs transition-all group cursor-pointer ${
                  isActive
                    ? item.activeBg
                    : 'text-slate-600 hover:bg-slate-100/90 hover:text-slate-900'
                }`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <Icon
                  className={`w-4.5 h-4.5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : item.color
                  }`}
                />

                {isSidebarOpen && (
                  <div className="flex-1 flex items-center justify-between text-left truncate">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ${
                          isActive ? 'bg-white/25 text-white font-black' : item.badgeColor
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Hub Info */}
      {isSidebarOpen ? (
        <div className="p-3 m-3 bg-linear-to-br from-blue-50 to-indigo-50/70 border border-blue-100 rounded-2xl">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-bold text-blue-900">Lab Siswa SIJA</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
            Simulasi jaringan, praktik CLI Linux & Cisco, serta perakitan komponen IoT.
          </p>
          <div className="mt-2 pt-2 border-t border-blue-100 flex items-center justify-between text-[10px] font-bold text-blue-700">
            <span>SMK Hebat</span>
            <span>V2.0</span>
          </div>
        </div>
      ) : (
        <div className="p-3 flex justify-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-black">
            SIJA
          </div>
        </div>
      )}
    </aside>
  );
};
