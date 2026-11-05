import React, { useState } from 'react';
import {
  FlaskConical,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  AlertTriangle,
  ShieldAlert,
  Wrench,
  CheckSquare,
  Square
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LAB_CATEGORIES } from '../../data/labGuideData';

export const LabGuideView = () => {
  const {
    labs,
    activeLabId,
    setActiveLabId,
    userProfile,
    markLabComplete,
    showToast
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);

  // Interactive Checklist State: map of labId -> set of completed stepIds
  const [completedSteps, setCompletedSteps] = useState({});

  const selectedLab = labs.find((l) => l.id === activeLabId);

  const toggleStep = (labId, stepId) => {
    setCompletedSteps((prev) => {
      const currentLabSteps = prev[labId] || [];
      const isAlreadyDone = currentLabSteps.includes(stepId);
      const nextLabSteps = isAlreadyDone
        ? currentLabSteps.filter((id) => id !== stepId)
        : [...currentLabSteps, stepId];
      return { ...prev, [labId]: nextLabSteps };
    });
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard?.writeText(text);
    setCopiedCodeIndex(index);
    showToast('Sintaks konfigurasi disalin ke clipboard!', 'info');
    setTimeout(() => setCopiedCodeIndex(null), 2500);
  };

  // Filtering
  const filteredLabs = labs.filter((lab) => {
    const matchCat = selectedCategory === 'all' || lab.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.objective?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Lab Detail View
  if (selectedLab) {
    const isLabDone = userProfile.completedLabs.includes(selectedLab.id);
    const labStepChecklist = completedSteps[selectedLab.id] || [];
    const totalSteps = selectedLab.steps?.length || 0;
    const progressPercent = totalSteps > 0 ? Math.round((labStepChecklist.length / totalSteps) * 100) : 0;

    return (
      <div className="space-y-6 pb-16 animate-in fade-in duration-200 max-w-4xl mx-auto">
        {/* Top Back Nav */}
        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveLabId(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-sky-600 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Praktikum</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200">
              Reward: +{selectedLab.xpReward} XP
            </span>
          </div>
        </div>

        {/* Lab Document Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
          {/* Header info */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                {selectedLab.categoryLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600">
                Tingkat: {selectedLab.difficulty}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {selectedLab.estimatedTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {selectedLab.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              <span className="font-bold text-slate-800">Tujuan Praktikum: </span>
              {selectedLab.objective}
            </p>
          </div>

          {/* Progress Tracker Checklist Header */}
          <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-sky-900">
              <span className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-sky-600" />
                Checklist Langkah Praktikum Interaktif
              </span>
              <span>{labStepChecklist.length} dari {totalSteps} Langkah Selesai ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-sky-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Safety Notes (if any) */}
          {selectedLab.safetyNotes && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-amber-900">
                <span className="font-extrabold block mb-0.5">Catatan Keselamatan Kerja (K3):</span>
                {selectedLab.safetyNotes}
              </div>
            </div>
          )}

          {/* Equipment & Materials Needed */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-sky-600" />
              Alat dan Bahan Praktikum
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedLab.equipmentNeeded?.map((eq, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                  <span>{eq}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Basic Theory & Preparation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Teori Dasar Singkat
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {selectedLab.basicTheory}
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Persiapan Kerja
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {selectedLab.preparation}
              </p>
            </div>
          </div>

          {/* STEP BY STEP INSTRUCTIONS WITH CHECKLIST & CODE */}
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-slate-900">
              Langkah Kerja Step-by-Step
            </h3>

            <div className="space-y-4">
              {selectedLab.steps?.map((st, idx) => {
                const isStepDone = labStepChecklist.includes(st.id);

                return (
                  <div
                    key={st.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isStepDone
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-white border-slate-200 hover:border-sky-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <button
                          onClick={() => toggleStep(selectedLab.id, st.id)}
                          className="mt-0.5 text-slate-400 hover:text-sky-600 transition-colors cursor-pointer shrink-0"
                          title="Klik untuk menandai langkah ini"
                        >
                          {isStepDone ? (
                            <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>
                        <div>
                          <h4 className={`text-sm font-bold ${isStepDone ? 'text-emerald-900 line-through' : 'text-slate-800'}`}>
                            Langkah {idx + 1}: {st.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-line font-medium">
                            {st.instruction}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Code Snippet if present */}
                    {st.codeOrSnippet && (
                      <div className="mt-3 relative bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2 border-b border-slate-800 pb-1">
                          <span>Konfigurasi Terminal / Skema</span>
                          <button
                            onClick={() => copyToClipboard(st.codeOrSnippet, idx)}
                            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                          >
                            {copiedCodeIndex === idx ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Tersalin!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Salin Sintaks</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-sky-300 leading-relaxed">{st.codeOrSnippet}</pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expected Results & Common Mistakes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                ✅ Hasil yang Diharapkan
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                {selectedLab.expectedResults}
              </p>
            </div>

            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                ⚠️ Kesalahan Umum Siswa
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-xs text-rose-800 font-medium">
                {selectedLab.commonMistakes?.map((cm, i) => (
                  <li key={i}>{cm}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Complete Lab Action Button */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-slate-800">
                {isLabDone ? 'Praktikum ini telah tuntas diverifikasi.' : 'Semua langkah praktikum sudah dikerjakan di lab?'}
              </p>
              <p className="text-[11px] text-slate-400">
                Klaim reward +{selectedLab.xpReward} XP dan tambahkan ke riwayat portofolio keahlianmu.
              </p>
            </div>

            <button
              onClick={() => markLabComplete(selectedLab.id)}
              disabled={isLabDone}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                isLabDone
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-none cursor-default'
                  : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-500/25'
              }`}
            >
              {isLabDone ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Praktikum Tuntas</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Klaim Selesai (+{selectedLab.xpReward} XP)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Catalog View
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Lab Guide
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-sky-100 text-sky-800 rounded-full">
              {labs.length} Panduan Praktikum
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Dokumentasi langkah kerja praktikum terstruktur, skema rangkaian mikrokontroler, dan checklist interaktif.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari praktikum (Crimping, VLAN, SSH)..."
            className="w-full pl-9 pr-3.5 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {LAB_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Lab Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLabs.map((lab) => {
          const isDone = userProfile.completedLabs.includes(lab.id);

          return (
            <div
              key={lab.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:border-sky-300 hover:shadow-lg transition-all flex flex-col justify-between group card-hover-lift"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-50 text-sky-700 border border-sky-100">
                    {lab.categoryLabel}
                  </span>
                  {isDone && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Tuntas
                    </span>
                  )}
                </div>

                <h3
                  onClick={() => setActiveLabId(lab.id)}
                  className="text-base font-bold text-slate-800 group-hover:text-sky-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
                >
                  {lab.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                  {lab.objective}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{lab.estimatedTime}</span>
                  <span>•</span>
                  <span>{lab.steps?.length || 0} Langkah Kerja</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
                <span className="text-slate-400 font-medium">+{lab.xpReward} XP</span>
                <button
                  onClick={() => setActiveLabId(lab.id)}
                  className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Buka Praktikum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

