import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  BookOpen,
  Cpu,
  FlaskConical,
  LifeBuoy,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    materials,
    dictionary,
    labs,
    troubleshoots,
    setActiveTab,
    setActiveMaterialId,
    setActiveEquipmentId,
    setActiveLabId,
    setActiveTroubleshootId
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmedQuery = query.toLowerCase().trim();

  // Search Results
  const matchedMaterials = query.trim()
    ? materials.filter(
        (m) =>
          m.title.toLowerCase().includes(trimmedQuery) ||
          m.tags?.some((t) => t.toLowerCase().includes(trimmedQuery)) ||
          m.summaryShort?.toLowerCase().includes(trimmedQuery)
      )
    : materials.slice(0, 3);

  const matchedDictionary = query.trim()
    ? dictionary.filter(
        (d) =>
          d.nameId.toLowerCase().includes(trimmedQuery) ||
          d.nameEn.toLowerCase().includes(trimmedQuery) ||
          d.shortDesc?.toLowerCase().includes(trimmedQuery)
      )
    : dictionary.slice(0, 3);

  const matchedLabs = query.trim()
    ? labs.filter(
        (l) =>
          l.title.toLowerCase().includes(trimmedQuery) ||
          l.objective?.toLowerCase().includes(trimmedQuery)
      )
    : labs.slice(0, 2);

  const matchedTroubleshoots = query.trim()
    ? troubleshoots.filter(
        (t) =>
          t.title.toLowerCase().includes(trimmedQuery) ||
          t.symptoms?.some((s) => s.toLowerCase().includes(trimmedQuery))
      )
    : troubleshoots.slice(0, 2);

  const totalResults =
    (query.trim() ? matchedMaterials.length : 0) +
    (query.trim() ? matchedDictionary.length : 0) +
    (query.trim() ? matchedLabs.length : 0) +
    (query.trim() ? matchedTroubleshoots.length : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik kata kunci (contoh: VLAN, ESP32, OSPF, Crimping, Ping)..."
            className="w-full text-sm sm:text-base font-medium text-slate-800 placeholder-slate-400 bg-transparent outline-hidden"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="px-2 py-0.5 text-xs font-semibold text-slate-400 bg-white border border-slate-200 rounded-md">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5 divide-y divide-slate-100">
          {query.trim() && totalResults === 0 && (
            <div className="py-12 text-center">
              <p className="text-slate-500 font-medium">Tidak ada materi atau perangkat yang cocok dengan "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci lain seperti "Subnet", "Switch", atau "DHT22".</p>
            </div>
          )}

          {/* 1. Knowledge Materials */}
          {matchedMaterials.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider px-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Knowledge Center ({matchedMaterials.length})</span>
              </div>
              <div className="space-y-1">
                {matchedMaterials.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab('knowledge');
                      setActiveMaterialId(item.id);
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 hover:bg-indigo-50/60 rounded-xl text-left group transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-700">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{item.summaryShort}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Tech Dictionary */}
          {matchedDictionary.length > 0 && (
            <div className="pt-3 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider px-2">
                <Cpu className="w-3.5 h-3.5" />
                <span>Tech Dictionary ({matchedDictionary.length})</span>
              </div>
              <div className="space-y-1">
                {matchedDictionary.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab('dictionary');
                      setActiveEquipmentId(item.id);
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 hover:bg-teal-50/60 rounded-xl text-left group transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
                        {item.nameId} <span className="text-[11px] font-normal text-slate-400">({item.nameEn})</span>
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{item.shortDesc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Lab Guides */}
          {matchedLabs.length > 0 && (
            <div className="pt-3 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider px-2">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Panduan Praktikum Lab ({matchedLabs.length})</span>
              </div>
              <div className="space-y-1">
                {matchedLabs.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab('lab');
                      setActiveLabId(item.id);
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 hover:bg-sky-50/60 rounded-xl text-left group transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-sky-700">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{item.objective}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Troubleshooting */}
          {matchedTroubleshoots.length > 0 && (
            <div className="pt-3 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider px-2">
                <LifeBuoy className="w-3.5 h-3.5" />
                <span>Troubleshooting ({matchedTroubleshoots.length})</span>
              </div>
              <div className="space-y-1">
                {matchedTroubleshoots.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab('troubleshoot');
                      setActiveTroubleshootId(item.id);
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 hover:bg-rose-50/60 rounded-xl text-left group transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-rose-700">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{item.symptoms?.[0]}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-rose-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Pencarian Cepat Semantik SIJALAB</span>
          </div>
          <span>Tekan ESC untuk menutup</span>
        </div>
      </div>
    </div>
  );
};

