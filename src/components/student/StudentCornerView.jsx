import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Heart,
  Bookmark,
  Share2,
  Plus,
  Search,
  Sparkles,
  X,
  Send,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentCornerView = () => {
  const {
    studentPosts,
    addStudentPost,
    toggleLikePost,
    userProfile,
    showToast
  } = useApp();

  const [selectedTag, setSelectedTag] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Networking');
  const [newPostContent, setNewPostContent] = useState('');

  const CATEGORIES = ['all', 'Networking', 'SIoT', 'Linux', 'Cisco', 'Tips'];

  const filteredPosts = studentPosts.filter((post) => {
    return selectedTag === 'all' || post.category.toLowerCase() === selectedTag.toLowerCase();
  });

  const handleSubmitNewPost = (e) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      showToast('Harap lengkapi judul dan isi catatan.', 'info');
      return;
    }

    addStudentPost({
      title: newPostTitle,
      category: newPostCategory,
      categoryBadge: 'bg-blue-100 text-blue-700 border-blue-200',
      content: newPostContent
    });

    setNewPostTitle('');
    setNewPostContent('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Student Corner
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full">
              Ruang Kolaborasi SIJA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Berbagi rangkuman materi, tips menghafal port & kabel, catatan praktikum, dan referensi belajar bersama.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Catatan Baru</span>
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedTag(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all capitalize cursor-pointer ${
              selectedTag === cat
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'Semua Topik' : cat}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4 hover:border-emerald-300 transition-all"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{post.author}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {post.authorClass}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{post.createdDate}</span>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {post.category}
              </span>
            </div>

            {/* Post Title & Content */}
            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                {post.title}
              </h3>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                {post.content}
              </div>
            </div>

            {/* Post Actions (Like, Comment, Share) */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-semibold border-t border-slate-100">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleLikePost(post.id)}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                    post.userHasLiked ? 'text-rose-600 font-bold' : 'hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.userHasLiked ? 'fill-rose-500' : ''}`} />
                  <span>{post.likes} Suka</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.commentsCount} Komentar</span>
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast('Tautan catatan disalin!', 'info');
                }}
                className="flex items-center gap-1 hover:text-slate-800 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Bagikan</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* NEW NOTE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Bagikan Catatan & Tips Praktikum
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewPost} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Kategori Topik
                </label>
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="w-full p-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-emerald-500"
                >
                  <option value="Networking">Networking (Jaringan)</option>
                  <option value="SIoT">SIoT & Mikrokontroler</option>
                  <option value="Linux">Linux Administration</option>
                  <option value="Cisco">Cisco IOS</option>
                  <option value="Tips">Tips Belajar & UKK</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Judul Catatan
                </label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Contoh: Cara Cepat Mengingat Kode Warna Kabel..."
                  className="w-full p-2.5 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Isi Catatan atau Ringkasan
                </label>
                <textarea
                  rows={6}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Tuliskan pengalaman, catatan troubleshooting, atau tips praktikummu di sini..."
                  className="w-full p-3 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-emerald-500 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-bold">
                  🎁 Dapatkan +30 XP saat mempublikasikan catatan!
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Terbitkan</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

