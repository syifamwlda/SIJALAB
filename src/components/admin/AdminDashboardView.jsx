import React, { useState } from 'react';
import {
  ShieldAlert,
  BookOpen,
  Cpu,
  FlaskConical,
  LifeBuoy,
  Users,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  Sparkles,
  Layers,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboardView = () => {
  const {
    materials,
    dictionary,
    labs,
    troubleshoots,
    studentPosts,
    addMaterial,
    deleteMaterial,
    addDictionaryItem,
    deleteDictionaryItem,
    showToast
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('materials');
  const [isAddMatModal, setIsAddMatModal] = useState(false);
  const [isAddDictModal, setIsAddDictModal] = useState(false);

  // New Material Form State
  const [newMatTitle, setNewMatTitle] = useState('');
  const [newMatCat, setNewMatCat] = useState('networking');
  const [newMatDiff, setNewMatDiff] = useState('Dasar');
  const [newMatDur, setNewMatDur] = useState('30 Menit');
  const [newMatDesc, setNewMatDesc] = useState('');

  // New Dict Form State
  const [newDictNameId, setNewDictNameId] = useState('');
  const [newDictNameEn, setNewDictNameEn] = useState('');
  const [newDictCat, setNewDictCat] = useState('networking');
  const [newDictDesc, setNewDictDesc] = useState('');

  const handleCreateMaterial = (e) => {
    e.preventDefault();
    if (!newMatTitle.trim()) {
      showToast('Judul materi wajib diisi.', 'info');
      return;
    }

    addMaterial({
      title: newMatTitle,
      category: newMatCat,
      categoryLabel: newMatCat === 'networking' ? 'Computer Networking' : newMatCat === 'linux' ? 'Linux Administration' : 'SIoT & Electronics',
      difficulty: newMatDiff,
      duration: newMatDur,
      xp: 60,
      tags: ['AdminEntry', newMatCat],
      summaryShort: newMatDesc || 'Materi pembelajaran baru yang ditambahkan oleh Administrator SIJALAB.',
      objectives: ['Memahami konsep dasar materi.', 'Menerapkan di praktikum.'],
      introduction: newMatDesc || 'Pengenalan materi oleh guru SIJA.',
      sections: [{ title: '1. Pembahasan Inti', content: newMatDesc || 'Konten materi lengkap.' }],
      summary: 'Ringkasan materi.'
    });

    setNewMatTitle('');
    setNewMatDesc('');
    setIsAddMatModal(false);
  };

  const handleCreateDict = (e) => {
    e.preventDefault();
    if (!newDictNameId.trim()) {
      showToast('Nama perangkat wajib diisi.', 'info');
      return;
    }

    addDictionaryItem({
      nameId: newDictNameId,
      nameEn: newDictNameEn || newDictNameId,
      category: newDictCat,
      categoryLabel: newDictCat === 'networking' ? 'Perangkat Jaringan' : 'Komponen SIoT & Elektronika',
      shortDesc: newDictDesc || 'Deskripsi singkat perangkat teknis.',
      description: newDictDesc || 'Penjelasan teknis detail.',
      mainFunctions: ['Fungsi operasional di laboratorium SIJA.'],
      howItWorks: 'Prinsip kerja perangkat.',
      keyPinsOrComponents: [{ name: 'Port Utama', desc: 'Antarmuka koneksi' }],
      usageExamples: ['Praktikum di lab SIJA.']
    });

    setNewDictNameId('');
    setNewDictNameEn('');
    setNewDictDesc('');
    setIsAddDictModal(false);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      {/* Admin Notice Banner */}
      <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start justify-between gap-3 text-rose-900 text-xs">
        <div className="flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold block text-sm">
              Administrator & Kurikulum Management Panel (Prototype Mode)
            </span>
            <p className="mt-0.5 text-rose-800 leading-relaxed font-medium">
              Data yang kamu tambah atau hapus di dashboard ini disimpan secara lokal di LocalStorage browser untuk demonstrasi penuh arsitektur CRUD SIJALAB.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Materi</span>
          <span className="text-2xl font-black text-slate-800">{materials.length}</span>
          <span className="text-[11px] text-blue-600 font-semibold block mt-1">Knowledge Center</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Tech Dictionary</span>
          <span className="text-2xl font-black text-slate-800">{dictionary.length}</span>
          <span className="text-[11px] text-teal-600 font-semibold block mt-1">Alat & Sensor</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Panduan Lab</span>
          <span className="text-2xl font-black text-slate-800">{labs.length}</span>
          <span className="text-[11px] text-sky-600 font-semibold block mt-1">SOP Praktikum</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Troubleshoot</span>
          <span className="text-2xl font-black text-slate-800">{troubleshoots.length}</span>
          <span className="text-[11px] text-rose-600 font-semibold block mt-1">Kasus Solusi</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs col-span-2 lg:col-span-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Siswa Aktif</span>
          <span className="text-2xl font-black text-indigo-700">128</span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">XII SIJA 1 & 2</span>
        </div>
      </div>

      {/* Main Content Management Area */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveAdminTab('materials')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeAdminTab === 'materials'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Kelola Materi ({materials.length})
            </button>
            <button
              onClick={() => setActiveAdminTab('dictionary')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeAdminTab === 'dictionary'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Kelola Kamus Perangkat ({dictionary.length})
            </button>
            <button
              onClick={() => setActiveAdminTab('studentPosts')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeAdminTab === 'studentPosts'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Moderasi Catatan Siswa ({studentPosts.length})
            </button>
          </div>

          {activeAdminTab === 'materials' && (
            <button
              onClick={() => setIsAddMatModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Materi Baru</span>
            </button>
          )}

          {activeAdminTab === 'dictionary' && (
            <button
              onClick={() => setIsAddDictModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl hover:bg-teal-700 transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Perangkat Baru</span>
            </button>
          )}
        </div>

        {/* 1. MATERIALS LIST TABLE */}
        {activeAdminTab === 'materials' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider font-extrabold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Judul Modul</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Tingkat</th>
                  <th className="py-3 px-4">Durasi</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {materials.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800">{m.title}</td>
                    <td className="py-3 px-4 text-slate-500">{m.categoryLabel}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600">
                        {m.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{m.duration}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => deleteMaterial(m.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus Materi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. DICTIONARY LIST TABLE */}
        {activeAdminTab === 'dictionary' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider font-extrabold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Nama Perangkat</th>
                  <th className="py-3 px-4">Nama Internasional</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {dictionary.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800">{d.nameId}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{d.nameEn}</td>
                    <td className="py-3 px-4 text-slate-500">{d.categoryLabel}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => deleteDictionaryItem(d.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus Perangkat"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. STUDENT POSTS MODERATION */}
        {activeAdminTab === 'studentPosts' && (
          <div className="space-y-3">
            {studentPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">{post.author}</span>
                    <span className="text-[10px] text-slate-500">({post.authorClass})</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {post.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{post.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {post.content}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-400 font-semibold">{post.likes} Suka</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL: ADD MATERIAL */}
      {isAddMatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-extrabold text-slate-900">Tambah Materi Baru</h3>
              <button onClick={() => setIsAddMatModal(false)} className="cursor-pointer text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateMaterial} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Judul Materi</label>
                <input
                  type="text"
                  value={newMatTitle}
                  onChange={(e) => setNewMatTitle(e.target.value)}
                  placeholder="Contoh: Konfigurasi BGP Routing Protocol..."
                  className="w-full p-2.5 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Kategori</label>
                  <select
                    value={newMatCat}
                    onChange={(e) => setNewMatCat(e.target.value)}
                    className="w-full p-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden"
                  >
                    <option value="networking">Networking</option>
                    <option value="cisco">Cisco IOS</option>
                    <option value="mikrotik">MikroTik</option>
                    <option value="linux">Linux Server</option>
                    <option value="iot">Internet of Things</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tingkat Kesulitan</label>
                  <select
                    value={newMatDiff}
                    onChange={(e) => setNewMatDiff(e.target.value)}
                    className="w-full p-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden"
                  >
                    <option value="Dasar">Dasar</option>
                    <option value="Menengah">Menengah</option>
                    <option value="Lanjutan">Lanjutan</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Ringkasan Materi</label>
                <textarea
                  rows={4}
                  value={newMatDesc}
                  onChange={(e) => setNewMatDesc(e.target.value)}
                  placeholder="Ringkasan penjelasan materi..."
                  className="w-full p-2.5 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-500"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddMatModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 cursor-pointer shadow-md shadow-blue-500/20"
                >
                  Simpan Materi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD DICTIONARY ITEM */}
      {isAddDictModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-extrabold text-slate-900">Tambah Perangkat ke Kamus</h3>
              <button onClick={() => setIsAddDictModal(false)} className="cursor-pointer text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateDict} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nama Indonesia</label>
                  <input
                    type="text"
                    value={newDictNameId}
                    onChange={(e) => setNewDictNameId(e.target.value)}
                    placeholder="Contoh: Modul Bluetooth HC-05"
                    className="w-full p-2.5 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nama Inggris</label>
                  <input
                    type="text"
                    value={newDictNameEn}
                    onChange={(e) => setNewDictNameEn(e.target.value)}
                    placeholder="Contoh: HC-05 Bluetooth Module"
                    className="w-full p-2.5 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-teal-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Kategori</label>
                <select
                  value={newDictCat}
                  onChange={(e) => setNewDictCat(e.target.value)}
                  className="w-full p-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden"
                >
                  <option value="networking">Perangkat Jaringan (Networking)</option>
                  <option value="siot">Komponen SIoT & Elektronika</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  value={newDictDesc}
                  onChange={(e) => setNewDictDesc(e.target.value)}
                  placeholder="Fungsi dan cara kerja perangkat..."
                  className="w-full p-2.5 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-teal-500"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddDictModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl hover:bg-teal-700 cursor-pointer shadow-md shadow-teal-500/20"
                >
                  Simpan Perangkat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

