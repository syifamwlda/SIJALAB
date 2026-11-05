import React, { useState } from 'react';
import {
  Cpu,
  Search,
  Bookmark,
  Share2,
  X,
  Layers,
  Zap,
  Radio,
  Server,
  ArrowRight,
  Info,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DICTIONARY_CATEGORIES } from '../../data/dictionaryData';

export const TechDictionaryView = () => {
  const {
    dictionary,
    activeEquipmentId,
    setActiveEquipmentId,
    userProfile,
    toggleBookmark,
    unlockBadge,
    showToast
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected item for modal
  const selectedItem = dictionary.find((d) => d.id === activeEquipmentId);

  // Alphabet list
  const ALPHABET = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const handleOpenDetail = (item) => {
    setActiveEquipmentId(item.id);

    // Track dictionary exploration badge
    if (!userProfile.unlockedBadges.includes('badge-tech-explorer')) {
      const currentViews = (userProfile.viewedDictCount || 0) + 1;
      userProfile.viewedDictCount = currentViews;
      if (currentViews >= 10) {
        unlockBadge('badge-tech-explorer');
      }
    }
  };

  // Filtering
  const filteredItems = dictionary.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      item.nameId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc?.toLowerCase().includes(searchQuery.toLowerCase());

    const firstChar = item.nameId.charAt(0).toUpperCase();
    const matchLetter = selectedLetter === 'ALL' || firstChar === selectedLetter;

    return matchCat && matchSearch && matchLetter;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Tech Dictionary
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-teal-100 text-teal-800 rounded-full">
              {dictionary.length} Perangkat & Komponen
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Ensiklopedia visual peralatan jaringan komputer, mikrokontroler, dan komponen SIoT SMK SIJA.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama perangkat (Router, ESP32, Relay)..."
            className="w-full pl-9 pr-3.5 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {DICTIONARY_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          );
        })}
      </div>

      {/* Alphabetical Browsing Bar */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-slate-600 uppercase px-2 shrink-0">
          Indeks A-Z:
        </span>
        {ALPHABET.map((letter) => {
          const isSelected = selectedLetter === letter;
          return (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Grid of Equipment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const isBookmarked = userProfile.bookmarkedItems.includes(item.id);
          const isNetworking = item.category === 'networking';

          return (
            <div
              key={item.id}
              onClick={() => handleOpenDetail(item)}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:border-teal-400 hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer card-hover-lift"
            >
              <div className="space-y-3">
                {/* Top Badge & Bookmark */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isNetworking
                        ? 'bg-blue-50 text-blue-700 border border-blue-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}
                  >
                    {item.categoryLabel}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(item.id);
                    }}
                    className="p-1 text-slate-400 hover:text-amber-500 cursor-pointer"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`}
                    />
                  </button>
                </div>

                {/* Device Icon Avatar Banner */}
                <div
                  className={`w-full h-28 rounded-2xl flex flex-col items-center justify-center p-3 text-center transition-transform group-hover:scale-[1.02] ${
                    isNetworking
                      ? 'bg-linear-to-br from-blue-500/10 via-indigo-500/10 to-blue-500/5 text-blue-700 border border-blue-100'
                      : 'bg-linear-to-br from-teal-500/10 via-emerald-500/10 to-teal-500/5 text-teal-700 border border-teal-100'
                  }`}
                >
                  {isNetworking ? (
                    <Server className="w-9 h-9 mb-1 text-blue-600" />
                  ) : (
                    <Cpu className="w-9 h-9 mb-1 text-teal-600" />
                  )}
                  <span className="text-xs font-extrabold text-slate-800 line-clamp-1">
                    {item.nameEn}
                  </span>
                  <span className="text-[10px] text-slate-600 font-medium">Standard SIJA Hardware</span>
                </div>

                {/* Indonesian Name & English Name */}
                <div>
                  <h3 className="text-base font-extrabold text-slate-800 group-hover:text-teal-600 transition-colors">
                    {item.nameId}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">{item.nameEn}</p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.shortDesc}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
                <span>Pelajari Detail Pinout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Cpu className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700">Perangkat tidak ditemukan</h3>
          <p className="text-xs text-slate-400 mt-1">Coba pilih huruf alfabet lain atau reset kata kunci.</p>
        </div>
      )}

      {/* DETAIL MODAL / POPUP OVERLAY */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-linear-to-r from-slate-50 to-teal-50/50 border-b border-slate-200 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-100 text-teal-800">
                  {selectedItem.categoryLabel}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedItem.nameId}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {selectedItem.nameEn}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedItem.id)}
                  className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      userProfile.bookmarkedItems.includes(selectedItem.id)
                        ? 'fill-amber-500 text-amber-500'
                        : ''
                    }`}
                  />
                </button>
                <button
                  onClick={() => setActiveEquipmentId(null)}
                  className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  Deskripsi Lengkap
                </h4>
                <p className="leading-relaxed text-slate-700 font-medium">
                  {selectedItem.description}
                </p>
              </div>

              {/* Main Functions */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Fungsi Utama
                </h4>
                <ul className="space-y-1.5 text-xs font-medium">
                  {selectedItem.mainFunctions?.map((func, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{func}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How it Works */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  Prinsip & Cara Kerja
                </h4>
                <p className="leading-relaxed text-slate-700 text-xs sm:text-sm font-medium">
                  {selectedItem.howItWorks}
                </p>
              </div>

              {/* Pins or Components Visual List */}
              {selectedItem.keyPinsOrComponents && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800">
                    {selectedItem.category === 'siot'
                      ? 'Pemetaan Pin & Komponen Kritis'
                      : 'Komponen Antarmuka & Port Penting'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedItem.keyPinsOrComponents.map((pin, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-teal-50/50 border border-teal-100 text-xs"
                      >
                        <span className="font-bold text-teal-900 block mb-0.5">
                          {pin.name}
                        </span>
                        <span className="text-slate-600 text-[11px] leading-relaxed">
                          {pin.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications Table */}
              {selectedItem.specs && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Spesifikasi Teknis
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {Object.entries(selectedItem.specs).map(([key, value]) => (
                      <div key={key} className="p-2.5 bg-slate-100 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-600 uppercase block">
                          {key}
                        </span>
                        <span className="font-bold text-slate-800 text-[11px]">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Usage Examples */}
              {selectedItem.usageExamples && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Contoh Penggunaan Nyata
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                    {selectedItem.usageExamples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveEquipmentId(null)}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-teal-500/20"
              >
                Tutup Ensiklopedia
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

