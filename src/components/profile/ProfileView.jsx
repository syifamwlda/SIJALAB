import React, { useState } from 'react';
import {
  User,
  Flame,
  Award,
  Sparkles,
  BookOpen,
  FlaskConical,
  Bookmark,
  Edit3,
  CheckCircle2,
  Calendar,
  Save,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileView = () => {
  const {
    userProfile,
    setUserProfile,
    materials,
    labs,
    dictionary,
    getCurrentLevel,
    setActiveTab,
    setActiveMaterialId,
    setActiveEquipmentId,
    setActiveLabId,
    showToast
  } = useApp();

  const levelInfo = getCurrentLevel();

  // Edit Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editClass, setEditClass] = useState(userProfile.schoolClass);
  const [editBio, setEditBio] = useState(userProfile.bio);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile((prev) => ({
      ...prev,
      name: editName,
      schoolClass: editClass,
      bio: editBio
    }));
    setIsEditing(false);
    showToast('Profil siswa berhasil diperbarui!', 'success');
  };

  // Completed items resolution
  const completedMaterialItems = materials.filter((m) =>
    userProfile.completedMaterials.includes(m.id)
  );

  const completedLabItems = labs.filter((l) =>
    userProfile.completedLabs.includes(l.id)
  );

  // Bookmarked items resolution
  const bookmarkedMaterials = materials.filter((m) =>
    userProfile.bookmarkedItems.includes(m.id)
  );
  const bookmarkedDict = dictionary.filter((d) =>
    userProfile.bookmarkedItems.includes(d.id)
  );

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200 max-w-4xl mx-auto">
      {/* 1. PROFILE HEADER CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-blue-500/20 shadow-md shrink-0"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-slate-900">{userProfile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  {userProfile.schoolClass}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500">
                NISN: {userProfile.nisn} • Bergabung: {userProfile.joinedDate}
              </p>
              <span className="inline-block text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200">
                {userProfile.major}
              </span>
              <p className="text-xs text-slate-600 mt-2 font-medium max-w-md leading-relaxed">
                "{userProfile.bio}"
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Batal Edit' : 'Edit Profil'}</span>
          </button>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form
            onSubmit={handleSaveProfile}
            className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 animate-in fade-in"
          >
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Ubah Informasi Siswa
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2 text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Kelas</label>
                <input
                  type="text"
                  value={editClass}
                  onChange={(e) => setEditClass(e.target.value)}
                  className="w-full p-2 text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Bio Ringkas</label>
              <textarea
                rows={2}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full p-2 text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan</span>
            </button>
          </form>
        )}

        {/* Level & XP Progress Summary Bar */}
        <div className="p-4 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-blue-900">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Rank Status: {levelInfo.tier.title} (Level {levelInfo.tier.level})</span>
            </div>
            <span>{userProfile.xp} XP</span>
          </div>
          <div className="w-full h-3 bg-blue-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${levelInfo.progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-blue-700 font-semibold">
            <span>{levelInfo.tier.minXp} XP</span>
            <span>Target Level Berikutnya: {levelInfo.nextTier.minXp} XP</span>
          </div>
        </div>
      </div>

      {/* 2. COMPLETED MATERIALS & PRACTICAL LABS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Completed Materials */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-extrabold text-slate-800">Materi Tuntas</h2>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              {completedMaterialItems.length} Selesai
            </span>
          </div>

          <div className="space-y-2">
            {completedMaterialItems.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                Belum ada materi yang ditandai tuntas.
              </p>
            ) : (
              completedMaterialItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveTab('knowledge');
                    setActiveMaterialId(item.id);
                  }}
                  className="p-3 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-200 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-500">{item.categoryLabel}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Completed Practical Labs */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-sky-600" />
              <h2 className="text-base font-extrabold text-slate-800">Praktikum Tuntas</h2>
            </div>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full">
              {completedLabItems.length} Selesai
            </span>
          </div>

          <div className="space-y-2">
            {completedLabItems.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                Belum ada praktikum yang diselesaikan.
              </p>
            ) : (
              completedLabItems.map((lab) => (
                <div
                  key={lab.id}
                  onClick={() => {
                    setActiveTab('lab');
                    setActiveLabId(lab.id);
                  }}
                  className="p-3 bg-slate-50 hover:bg-sky-50/50 rounded-xl border border-slate-200 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-sky-700">
                      {lab.title}
                    </h4>
                    <span className="text-[10px] text-slate-500">{lab.categoryLabel}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 3. BOOKMARKED ITEMS REPOSITORY */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
          <h2 className="text-base font-extrabold text-slate-800">
            Daftar Simpanan (Bookmarks)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bookmarkedMaterials.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setActiveTab('knowledge');
                setActiveMaterialId(m.id);
              }}
              className="p-3 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 text-left transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-blue-600 block">Modul Teori</span>
                <p className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                  {m.title}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </button>
          ))}

          {bookmarkedDict.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setActiveTab('dictionary');
                setActiveEquipmentId(d.id);
              }}
              className="p-3 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/30 text-left transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-teal-600 block">Tech Dictionary</span>
                <p className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
                  {d.nameId} ({d.nameEn})
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

