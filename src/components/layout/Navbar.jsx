import React, { useState } from 'react';
import {
  Search,
  Flame,
  Bell,
  Sparkles,
  ChevronDown,
  User,
  Zap,
  Bookmark
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar = () => {
  const {
    userProfile,
    getCurrentLevel,
    notifications,
    setNotifications,
    setIsSearchOpen,
    setActiveTab,
    showToast
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const levelInfo = getCurrentLevel();
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
    showToast('Semua notifikasi ditandai telah dibaca.', 'info');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Quick Search Trigger */}
        <div className="flex-1 max-w-md">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-500 bg-slate-100/90 hover:bg-slate-200/70 border border-slate-200/80 rounded-2xl transition-all group shadow-xs cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-slate-600">Cari materi, simulator, perangkat...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right side items: Streak, XP, Notif, Profile */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* Learning Streak Pill */}
          <button
            onClick={() => setActiveTab('gamification')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200/90 rounded-full transition-all group cursor-pointer shadow-xs"
            title={`${userProfile.streakDays} Hari Streak Aktif`}
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 group-hover:scale-125 transition-transform animate-pulse" />
            <span className="text-xs font-black text-orange-700 tracking-wide">
              {userProfile.streakDays} Hari
            </span>
          </button>

          {/* XP & Level Pill */}
          <button
            onClick={() => setActiveTab('gamification')}
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-linear-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/90 rounded-full transition-all cursor-pointer shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-black text-blue-700">{userProfile.xp} XP</span>
              <span className="text-slate-300">•</span>
              <span className="font-bold text-indigo-700">{levelInfo.tier.title}</span>
            </div>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
              aria-label="Notifikasi"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-ping" />
              )}
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800">Pemberitahuan</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-full">
                        {unreadCount} baru
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                    >
                      Tandai dibaca
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-400">
                      Tidak ada pemberitahuan baru
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3.5 hover:bg-slate-50 transition-colors ${
                          item.unread ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-slate-800">{item.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 hover:bg-slate-100 rounded-full border border-slate-200/90 transition-all cursor-pointer"
            >
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-blue-500/20"
              />
              <span className="hidden lg:inline text-xs font-bold text-slate-700 max-w-[110px] truncate">
                {userProfile.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 text-sm animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="font-bold text-slate-800 truncate">{userProfile.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{userProfile.schoolClass}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {userProfile.major}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl font-medium text-xs transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  Profil & Statistik Belajar
                </button>

                <button
                  onClick={() => {
                    setActiveTab('gamification');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-amber-50 hover:text-amber-700 rounded-xl font-medium text-xs transition-colors cursor-pointer"
                >
                  <Flame className="w-4 h-4 text-amber-500" />
                  Lencana & Riwayat Streak
                </button>

                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl font-medium text-xs transition-colors cursor-pointer border-t border-slate-100 mt-1"
                >
                  <Bookmark className="w-4 h-4 text-indigo-500" />
                  Koleksi Bookmark ({userProfile.bookmarkedItems.length})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
