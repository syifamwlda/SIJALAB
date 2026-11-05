import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Bookmark,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Share2,
  Tag,
  CheckCircle,
  Layers,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { KNOWLEDGE_CATEGORIES } from '../../data/knowledgeData';

export const KnowledgeCenterView = () => {
  const {
    materials,
    activeMaterialId,
    setActiveMaterialId,
    userProfile,
    markMaterialComplete,
    toggleBookmark,
    showToast
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Selected Material for Detail View
  const selectedMaterial = materials.find((m) => m.id === activeMaterialId);

  // Filtering
  const filteredMaterials = materials.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchDiff = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
    const matchSearch =
      searchFilter.trim() === '' ||
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.tags?.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase())) ||
      item.summaryShort?.toLowerCase().includes(searchFilter.toLowerCase());

    return matchCat && matchDiff && matchSearch;
  });

  // If a material is currently opened for reading:
  if (selectedMaterial) {
    const isCompleted = userProfile.completedMaterials.includes(selectedMaterial.id);
    const isBookmarked = userProfile.bookmarkedItems.includes(selectedMaterial.id);

    const relatedItems = materials.filter((m) =>
      selectedMaterial.relatedIds?.includes(m.id)
    );

    return (
      <div className="space-y-6 pb-16 animate-in fade-in duration-200">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveMaterialId(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Materi</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(selectedMaterial.id)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-600 border-amber-300'
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
              }`}
              title={isBookmarked ? 'Hapus Simpanan' : 'Simpan Materi'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Tautan materi disalin ke clipboard!', 'info');
              }}
              className="p-2 rounded-xl bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Bagikan Materi"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Material Main Article Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8 max-w-4xl mx-auto">
          {/* Header Metadata */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                {selectedMaterial.categoryLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600">
                Level: {selectedMaterial.difficulty}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {selectedMaterial.duration}
              </span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                +{selectedMaterial.xp} XP
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {selectedMaterial.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {selectedMaterial.summaryShort}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedMaterial.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[11px] font-semibold text-slate-500 bg-slate-100 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* 1. Learning Objectives */}
          <div className="bg-linear-to-br from-blue-50/60 to-indigo-50/40 border border-blue-200/80 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-extrabold text-blue-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Tujuan Pembelajaran (Learning Objectives)
            </h3>
            <ul className="space-y-2">
              {selectedMaterial.objectives?.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Introduction */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-800">1. Pengantar Konseptual</h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {selectedMaterial.introduction}
            </p>
          </div>

          {/* 3. Interactive Diagrams / Illustration Visualizer */}
          {selectedMaterial.diagram && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                {selectedMaterial.diagram.title}
              </h3>

              {/* OSI Layer Stack Visualization */}
              {selectedMaterial.diagram.type === 'layers' && (
                <div className="space-y-2">
                  {selectedMaterial.diagram.layers.map((layer, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${layer.color}`}
                    >
                      <div className="font-bold text-xs sm:text-sm">{layer.osi}</div>
                      <div className="text-xs font-semibold px-2 py-0.5 bg-white/70 rounded-md">
                        TCP/IP: {layer.tcp} | PDU: {layer.pdu}
                      </div>
                      <div className="text-xs text-slate-600 sm:max-w-xs">{layer.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Subnet / Table Visualization */}
              {selectedMaterial.diagram.type === 'table' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-blue-600 text-white uppercase text-[10px] tracking-wider">
                      <tr>
                        {selectedMaterial.diagram.headers.map((h, i) => (
                          <th key={i} className="p-2.5 font-bold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white font-medium">
                      {selectedMaterial.diagram.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-2.5 text-slate-700">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ESP32 Pinout Diagram */}
              {selectedMaterial.diagram.type === 'esp32_pinout' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedMaterial.diagram.pins.map((pin, i) => (
                    <div key={i} className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <span className="font-bold text-blue-700 block">{pin.pin}</span>
                      <span className="text-slate-600 text-[11px]">{pin.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. Detailed Sections Content */}
          <div className="space-y-6">
            {selectedMaterial.sections?.map((sec, idx) => (
              <div key={idx} className="space-y-2.5">
                <h3 className="text-base font-bold text-slate-800">{sec.title}</h3>
                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-normal">
                  {sec.content}
                </div>
              </div>
            ))}
          </div>

          {/* 5. Practical Applications */}
          {selectedMaterial.practicalApplication && (
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                🛠️ Penerapan Nyata di Industri & Lab SIJA
              </h3>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                {selectedMaterial.practicalApplication}
              </p>
            </div>
          )}

          {/* 6. Summary */}
          {selectedMaterial.summary && (
            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                📌 Ringkasan Inti
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {selectedMaterial.summary}
              </p>
            </div>
          )}

          {/* Completion Toggle Button */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-slate-700">
                {isCompleted ? 'Materi ini telah kamu selesaikan.' : 'Sudah memahami seluruh materi ini?'}
              </p>
              <p className="text-[11px] text-slate-400">
                Tandai selesai untuk menambahkan +{selectedMaterial.xp} XP ke profilmu.
              </p>
            </div>

            <button
              onClick={() => markMaterialComplete(selectedMaterial.id)}
              disabled={isCompleted}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-none cursor-default'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
              }`}
            >
              {isCompleted ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Selesai Dipelajari</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tandai Selesai (+{selectedMaterial.xp} XP)</span>
                </>
              )}
            </button>
          </div>

          {/* Related Materials Navigation */}
          {relatedItems.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Materi Lanjutan Terkait
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedItems.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => setActiveMaterialId(rel.id)}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-[10px] font-bold text-blue-600 block mb-1">
                      {rel.categoryLabel}
                    </span>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                      {rel.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Otherwise, Show Materials Catalog
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Knowledge Center
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-100 text-blue-800 rounded-full">
              {materials.length} Modul
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Pusat modul materi teori, standar protokol, arsitektur sistem, dan panduan belajar SIJA.
          </p>
        </div>

        {/* Search input in Knowledge */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Cari topik pembelajaran..."
            className="w-full pl-9 pr-3.5 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Categories Horizontal Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {KNOWLEDGE_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map((item) => {
          const isCompleted = userProfile.completedMaterials.includes(item.id);
          const isBookmarked = userProfile.bookmarkedItems.includes(item.id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group card-hover-lift"
            >
              <div className="space-y-3">
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-100">
                    {item.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1">
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Tuntas
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(item.id);
                      }}
                      className="p-1 text-slate-400 hover:text-amber-500 cursor-pointer"
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3
                  onClick={() => setActiveMaterialId(item.id)}
                  className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
                >
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                  {item.summaryShort}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 font-medium bg-slate-100 text-slate-600 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {item.duration}
                </span>

                <button
                  onClick={() => setActiveMaterialId(item.id)}
                  className="inline-flex items-center gap-1 text-blue-600 font-bold group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Buka Materi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700">Tidak ada materi yang sesuai</h3>
          <p className="text-xs text-slate-400 mt-1">Coba sesuaikan filter kategori atau kata kunci pencarian.</p>
        </div>
      )}
    </div>
  );
};

