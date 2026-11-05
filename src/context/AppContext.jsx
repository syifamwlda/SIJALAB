import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_KNOWLEDGE_MATERIALS } from '../data/knowledgeData';
import { TECH_DICTIONARY_ITEMS } from '../data/dictionaryData';
import { LAB_GUIDES } from '../data/labGuideData';
import { TROUBLESHOOTING_CASES } from '../data/troubleshootingData';
import { INITIAL_USER_PROFILE, ALL_BADGES, LEVEL_TIERS } from '../data/gamificationData';
import { INITIAL_STUDENT_POSTS } from '../data/studentCornerData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- 1. LOCAL STORAGE PERSISTENCE KEYS ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('sijalab_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_USER_PROFILE;
  });

  const [materials, setMaterials] = useState(() => {
    const saved = localStorage.getItem('sijalab_materials');
    return saved ? JSON.parse(saved) : INITIAL_KNOWLEDGE_MATERIALS;
  });

  const [dictionary, setDictionary] = useState(() => {
    const saved = localStorage.getItem('sijalab_dictionary');
    return saved ? JSON.parse(saved) : TECH_DICTIONARY_ITEMS;
  });

  const [labs, setLabs] = useState(() => {
    const saved = localStorage.getItem('sijalab_labs');
    return saved ? JSON.parse(saved) : LAB_GUIDES;
  });

  const [troubleshoots, setTroubleshoots] = useState(() => {
    const saved = localStorage.getItem('sijalab_troubleshoots');
    return saved ? JSON.parse(saved) : TROUBLESHOOTING_CASES;
  });

  const [studentPosts, setStudentPosts] = useState(() => {
    const saved = localStorage.getItem('sijalab_student_posts');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_POSTS;
  });

  // --- 2. ACTIVE VIEW NAVIGATION STATE ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeMaterialId, setActiveMaterialId] = useState(null);
  const [activeEquipmentId, setActiveEquipmentId] = useState(null);
  const [activeLabId, setActiveLabId] = useState(null);
  const [activeTroubleshootId, setActiveTroubleshootId] = useState(null);
  const [activeChallengeId, setActiveChallengeId] = useState(null);

  // Search & Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentRole, setCurrentRole] = useState('student'); // 'student' or 'admin'

  // Toast feedback state
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev?.id === toast?.id ? null : prev));
    }, 4000);
  };

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 'notif-1', title: 'Selamat Datang di SIJALAB!', desc: 'Jelajahi Knowledge Center dan selesaikan tantangan pertamamu.', time: 'Baru saja', unread: true },
    { id: 'notif-2', title: 'Tantangan Harian Siap!', desc: 'Selesaikan tantangan harian hari ini dan raih +40 XP.', time: 'Hari ini', unread: true }
  ]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('sijalab_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('sijalab_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('sijalab_dictionary', JSON.stringify(dictionary));
  }, [dictionary]);

  useEffect(() => {
    localStorage.setItem('sijalab_labs', JSON.stringify(labs));
  }, [labs]);

  useEffect(() => {
    localStorage.setItem('sijalab_troubleshoots', JSON.stringify(troubleshoots));
  }, [troubleshoots]);

  useEffect(() => {
    localStorage.setItem('sijalab_student_posts', JSON.stringify(studentPosts));
  }, [studentPosts]);

  // --- 3. STREAK ENGINE ---
  // A streak must only increase once per local calendar day, and repeated activity on the same day must not generate additional streak days.
  const recordDailyActivity = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = userProfile.lastActiveDate;

    if (lastActive === today) {
      // Already recorded today, no duplicate streak bump
      return;
    }

    const todayDate = new Date(today);
    const lastDate = lastActive ? new Date(lastActive) : null;

    let newStreak = userProfile.streakDays;

    if (lastDate) {
      const diffTime = Math.abs(todayDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Consecutive day
        newStreak += 1;
        showToast(`🔥 Streak Meningkat! Kamu aktif ${newStreak} hari berturut-turut!`, 'success');
      } else if (diffDays > 1) {
        // Streak broken, reset to 1
        newStreak = 1;
        showToast(`🔥 Streak Dimulai Kembali! Semangat belajar SIJA!`, 'info');
      }
    } else {
      newStreak = 1;
    }

    const newLongest = Math.max(newStreak, userProfile.longestStreak || 1);

    setUserProfile((prev) => ({
      ...prev,
      streakDays: newStreak,
      longestStreak: newLongest,
      lastActiveDate: today
    }));

    // Check 5-day or 7-day streak badge
    if (newStreak >= 5 && !userProfile.unlockedBadges.includes('badge-consistent-learner')) {
      unlockBadge('badge-consistent-learner');
    }
  };

  // --- 4. XP & LEVEL & BADGE SYSTEM ---
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback if canvas not available
    }
  };

  const addXP = (amount, reason = '') => {
    recordDailyActivity();

    setUserProfile((prev) => {
      const updatedXP = prev.xp + amount;
      return {
        ...prev,
        xp: updatedXP
      };
    });

    fireConfetti();
    showToast(`🎉 +${amount} XP diperoleh! ${reason}`, 'success');

    // Check SIJA Master milestone
    if (userProfile.xp + amount >= 1000 && !userProfile.unlockedBadges.includes('badge-sija-master')) {
      unlockBadge('badge-sija-master');
    }
  };

  const unlockBadge = (badgeId) => {
    if (userProfile.unlockedBadges.includes(badgeId)) return;

    const badge = ALL_BADGES.find((b) => b.id === badgeId);
    setUserProfile((prev) => ({
      ...prev,
      unlockedBadges: [...prev.unlockedBadges, badgeId],
      xp: prev.xp + (badge?.xpReward || 50)
    }));

    fireConfetti();
    showToast(`🏆 Lencana Baru Terbuka: "${badge ? badge.name : badgeId}"!`, 'success');

    setNotifications((prev) => [
      {
        id: `badge-${Date.now()}`,
        title: `Lencana Baru: ${badge?.name || 'Pencapaian'}!`,
        desc: badge?.description || 'Selamat atas pencapaian belajarmu di SIJALAB.',
        time: 'Baru saja',
        unread: true
      },
      ...prev
    ]);
  };

  // --- 5. PROGRESS COMPLETIONS ---
  const markMaterialComplete = (materialId) => {
    if (userProfile.completedMaterials.includes(materialId)) {
      showToast('Materi ini sudah pernah kamu selesaikan.', 'info');
      return;
    }

    const material = materials.find((m) => m.id === materialId);
    const xpReward = material?.xp || 50;

    const updatedMaterials = [...userProfile.completedMaterials, materialId];

    setUserProfile((prev) => ({
      ...prev,
      completedMaterials: updatedMaterials
    }));

    addXP(xpReward, `Materi "${material?.title?.substring(0, 25)}..." tuntas!`);

    if (updatedMaterials.length === 1 && !userProfile.unlockedBadges.includes('badge-first-step')) {
      unlockBadge('badge-first-step');
    }
    if (updatedMaterials.length >= 5 && !userProfile.unlockedBadges.includes('badge-curious-mind')) {
      unlockBadge('badge-curious-mind');
    }
  };

  const markLabComplete = (labId) => {
    if (userProfile.completedLabs.includes(labId)) {
      showToast('Praktikum ini sudah kamu tandai tuntas sebelumnya.', 'info');
      return;
    }

    const lab = labs.find((l) => l.id === labId);
    const xpReward = lab?.xpReward || 80;

    setUserProfile((prev) => ({
      ...prev,
      completedLabs: [...prev.completedLabs, labId]
    }));

    addXP(xpReward, `Praktikum "${lab?.title?.substring(0, 25)}..." selesai!`);
  };

  const markDailyChallengeComplete = (xpEarned = 40) => {
    const today = new Date().toISOString().split('T')[0];
    if (userProfile.dailyChallengeCompletedDate === today) {
      showToast('Kamu sudah menyelesaikan tantangan harian hari ini!', 'info');
      return false;
    }

    setUserProfile((prev) => ({
      ...prev,
      dailyChallengeCompletedDate: today
    }));

    addXP(xpEarned, 'Tantangan Harian berhasil dipecahkan!');
    return true;
  };

  const toggleBookmark = (itemId) => {
    const isBookmarked = userProfile.bookmarkedItems.includes(itemId);
    setUserProfile((prev) => ({
      ...prev,
      bookmarkedItems: isBookmarked
        ? prev.bookmarkedItems.filter((id) => id !== itemId)
        : [...prev.bookmarkedItems, itemId]
    }));

    showToast(isBookmarked ? 'Dihapus dari bookmark' : 'Disimpan ke bookmark!', 'info');
  };

  // Student Post actions
  const addStudentPost = (newPost) => {
    const postObj = {
      ...newPost,
      id: `post-${Date.now()}`,
      author: userProfile.name,
      authorClass: userProfile.schoolClass,
      avatar: userProfile.avatarUrl,
      likes: 1,
      commentsCount: 0,
      createdDate: 'Hari ini',
      isBookmarked: false
    };

    setStudentPosts([postObj, ...studentPosts]);
    addXP(30, 'Berbagi catatan di Student Corner!');
    showToast('Catatanmu berhasil dipublikasikan ke siswa SIJA!', 'success');
  };

  const toggleLikePost = (postId) => {
    setStudentPosts(
      studentPosts.map((post) => {
        if (post.id === postId) {
          const isLiked = post.userHasLiked;
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            userHasLiked: !isLiked
          };
        }
        return post;
      })
    );
  };

  // Helper current level calculation
  const getCurrentLevel = () => {
    const xp = userProfile.xp;
    const currentTier = LEVEL_TIERS.find((tier) => xp >= tier.minXp && xp < tier.maxXp) || LEVEL_TIERS[LEVEL_TIERS.length - 1];
    const nextTier = LEVEL_TIERS.find((tier) => tier.level === currentTier.level + 1) || currentTier;

    const progressInLevel = nextTier.level === currentTier.level
      ? 100
      : Math.min(100, Math.round(((xp - currentTier.minXp) / (nextTier.minXp - currentTier.minXp)) * 100));

    return {
      tier: currentTier,
      nextTier,
      progressPercent: progressInLevel
    };
  };

  // Admin CRUD functions
  const addMaterial = (newMat) => {
    const id = `mat-${Date.now()}`;
    const matObj = { ...newMat, id };
    setMaterials([matObj, ...materials]);
    showToast('Materi baru berhasil ditambahkan ke Knowledge Center!', 'success');
  };

  const deleteMaterial = (id) => {
    setMaterials(materials.filter((m) => m.id !== id));
    showToast('Materi berhasil dihapus.', 'info');
  };

  const addDictionaryItem = (newItem) => {
    const id = `dict-${Date.now()}`;
    setDictionary([{ ...newItem, id }, ...dictionary]);
    showToast('Item perangkat baru ditambahkan ke Tech Dictionary!', 'success');
  };

  const deleteDictionaryItem = (id) => {
    setDictionary(dictionary.filter((d) => d.id !== id));
    showToast('Perangkat berhasil dihapus dari kamus.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        materials,
        dictionary,
        labs,
        troubleshoots,
        studentPosts,
        activeTab,
        setActiveTab,
        activeMaterialId,
        setActiveMaterialId,
        activeEquipmentId,
        setActiveEquipmentId,
        activeLabId,
        setActiveLabId,
        activeTroubleshootId,
        setActiveTroubleshootId,
        activeChallengeId,
        setActiveChallengeId,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isSidebarOpen,
        setIsSidebarOpen,
        currentRole,
        setCurrentRole,
        toast,
        showToast,
        notifications,
        setNotifications,
        addXP,
        unlockBadge,
        markMaterialComplete,
        markLabComplete,
        markDailyChallengeComplete,
        toggleBookmark,
        addStudentPost,
        toggleLikePost,
        getCurrentLevel,
        addMaterial,
        deleteMaterial,
        addDictionaryItem,
        deleteDictionaryItem
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

