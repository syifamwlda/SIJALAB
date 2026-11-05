import React, { useState } from 'react';
import {
  LifeBuoy,
  Search,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Stethoscope,
  Terminal,
  ShieldAlert,
  HelpCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TROUBLESHOOT_CATEGORIES } from '../../data/troubleshootingData';

export const TroubleshootingView = () => {
  const {
    troubleshoots,
    activeTroubleshootId,
    setActiveTroubleshootId,
    setActiveTab,
    setActiveMaterialId
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCase = troubleshoots.find((t) => t.id === activeTroubleshootId);

  // Filtering
  const filteredCases = troubleshoots.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symptoms?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.possibleCauses?.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCat && matchSearch;
  });

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  // Detail View
  if (selectedCase) {
    return (
      <div className="space-y-6 pb-16 animate-in fade-in duration-200 max-w-4xl mx-auto">
        {/* Back navigation */}
        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveTroubleshootId(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-rose-600 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Knowledge Base Troubleshooting</span>
          </button>

          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${getSeverityBadge(
              selectedCase.severity
            )}`}
          >
            Severity: {selectedCase.severity}
          </span>
        </div>

        {/* Case Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
          {/* Header */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
              {selectedCase.categoryLabel}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {selectedCase.title}
            </h1>
          </div>

          {/* 1. Symptoms */}
          <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-extrabold text-rose-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Gejala Masalah yang Muncul (Symptoms)
            </h3>
            <ul className="space-y-2">
              {selectedCase.symptoms?.map((sym, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Possible Root Causes */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              Kemungkinan Akar Penyebab (Possible Causes)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedCase.possibleCauses?.map((cause, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-start gap-2.5">
                  <span className="font-bold text-amber-600 shrink-0">•</span>
                  <span>{cause}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Diagnostic Steps */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-blue-600" />
              Langkah Diagnosis & Pengecekan Sistem
            </h3>
            <div className="space-y-3">
              {selectedCase.diagnosticSteps?.map((diag) => (
                <div key={diag.order} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    {diag.order}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{diag.step}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-medium">{diag.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Solutions */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600" />
              Solusi Penanganan yang Direkomendasikan
            </h3>
            <div className="space-y-3">
              {selectedCase.solutions?.map((sol, i) => (
                <div key={i} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                  <h4 className="text-xs font-extrabold text-emerald-900">{sol.title}</h4>
                  <div className="text-xs text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                    {sol.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Verification Steps */}
          <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Langkah Verifikasi (Memastikan Masalah Tuntas)
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 font-medium">
              {selectedCase.verificationSteps?.map((ver, i) => (
                <li key={i}>{ver}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Catalog View
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Troubleshooting Center
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-rose-100 text-rose-800 rounded-full">
              {troubleshoots.length} Studi Kasus
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Knowledge base pemecahan kendala teknis jaringan, konfigurasi Cisco, server Linux, dan sirkuit mikrokontroler.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kendala (Ping, SSH, DNS, Port)..."
            className="w-full pl-9 pr-3.5 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {TROUBLESHOOT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCases.map((cs) => (
          <div
            key={cs.id}
            onClick={() => setActiveTroubleshootId(cs.id)}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:border-rose-300 hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer card-hover-lift"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-700 border border-rose-100">
                  {cs.categoryLabel}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getSeverityBadge(cs.severity)}`}>
                  {cs.severity}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-800 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
                {cs.title}
              </h3>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-700 block text-[11px]">Gejala Umum:</span>
                <p className="line-clamp-2 font-medium">{cs.symptoms?.[0]}</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600">
              <span className="text-slate-400 font-medium">{cs.solutions?.length || 1} Solusi Tersedia</span>
              <button
                onClick={() => setActiveTroubleshootId(cs.id)}
                className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Lihat Panduan Solusi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

