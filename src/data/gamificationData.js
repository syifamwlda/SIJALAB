// SIJALAB Gamification & User State Data

export const INITIAL_USER_PROFILE = {
  name: 'Syifa Maulida',
  nisn: '0078921443',
  schoolClass: 'XII SIJA 1',
  major: 'Sistem Informatika, Jaringan, dan Aplikasi',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  bio: 'Siswa SMK SIJA yang antusias di bidang Network Infrastructure, Cloud Computing, dan Embedded IoT System.',
  joinedDate: 'Juli 2024',
  xp: 320,
  streakDays: 5,
  longestStreak: 12,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedMaterials: ['mat-osi-tcpip', 'mat-linux-commands'],
  completedLabs: ['lab-utp-crimping'],
  completedChallenges: ['tech-detective'],
  bookmarkedItems: ['mat-ip-subnetting', 'net-switch', 'iot-esp32', 'lab-cisco-vlan-trunk'],
  unlockedBadges: ['badge-first-step', 'badge-tech-explorer', 'badge-consistent-learner'],
  dailyChallengeCompletedDate: null
};

export const LEVEL_TIERS = [
  { level: 1, title: 'Novice SysAdmin', minXp: 0, maxXp: 150, color: 'text-slate-600 bg-slate-100', icon: 'Shield' },
  { level: 2, title: 'Network Cadet', minXp: 150, maxXp: 400, color: 'text-blue-600 bg-blue-100', icon: 'Network' },
  { level: 3, title: 'Linux Explorer', minXp: 400, maxXp: 800, color: 'text-emerald-600 bg-emerald-100', icon: 'Terminal' },
  { level: 4, title: 'IoT Specialist', minXp: 800, maxXp: 1400, color: 'text-amber-600 bg-amber-100', icon: 'Cpu' },
  { level: 5, title: 'Cloud Architect', minXp: 1400, maxXp: 2200, color: 'text-indigo-600 bg-indigo-100', icon: 'Cloud' },
  { level: 6, title: 'SIJA Grandmaster', minXp: 2200, maxXp: 99999, color: 'text-rose-600 bg-rose-100', icon: 'Award' },
];

export const ALL_BADGES = [
  {
    id: 'badge-first-step',
    name: 'First Step',
    title: 'Langkah Pertama',
    description: 'Menyelesaikan materi pembelajaran pertama di Knowledge Center.',
    icon: 'Footprints',
    color: 'from-blue-500 to-indigo-500',
    xpReward: 30,
    category: 'Learning'
  },
  {
    id: 'badge-curious-mind',
    name: 'Curious Mind',
    title: 'Pikiran Penasaran',
    description: 'Menyelesaikan 5 materi pembelajaran yang berbeda.',
    icon: 'Lightbulb',
    color: 'from-amber-400 to-orange-500',
    xpReward: 60,
    category: 'Learning'
  },
  {
    id: 'badge-tech-explorer',
    name: 'Tech Explorer',
    title: 'Penjelajah Teknologi',
    description: 'Membuka dan mempelajari 10 perangkat pada Tech Dictionary.',
    icon: 'Compass',
    color: 'from-cyan-400 to-blue-500',
    xpReward: 50,
    category: 'Dictionary'
  },
  {
    id: 'badge-network-rookie',
    name: 'Network Rookie',
    title: 'Ksatria Jaringan',
    description: 'Menyelesaikan kuis Network Challenge dengan nilai sempurna.',
    icon: 'Radio',
    color: 'from-teal-400 to-emerald-500',
    xpReward: 70,
    category: 'Challenge'
  },
  {
    id: 'badge-linux-explorer',
    name: 'Linux Champion',
    title: 'Pendekar Terminal Linux',
    description: 'Menyelesaikan modul Linux Command Master.',
    icon: 'Terminal',
    color: 'from-emerald-500 to-green-600',
    xpReward: 75,
    category: 'Challenge'
  },
  {
    id: 'badge-consistent-learner',
    name: 'Consistent Learner',
    title: 'Pembelajar Istiqomah',
    description: 'Mencapai learning streak aktif selama 5 hari berturut-turut.',
    icon: 'Flame',
    color: 'from-orange-500 to-rose-500',
    xpReward: 100,
    category: 'Streak'
  },
  {
    id: 'badge-sija-master',
    name: 'SIJA Master',
    title: 'Mahaguru SIJA',
    description: 'Meraih lebih dari 1000 total XP dan menuntaskan minimal 3 praktikum lab.',
    icon: 'Trophy',
    color: 'from-purple-500 to-pink-500',
    xpReward: 200,
    category: 'Mastery'
  }
];

export const DEMO_LEADERBOARD = [
  { rank: 1, name: 'Fikri Haikal', class: 'XII SIJA 1', xp: 1480, streak: 14, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', badge: 'Cloud Architect' },
  { rank: 2, name: 'Alya Rahmadhani', class: 'XII SIJA 2', xp: 1210, streak: 9, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', badge: 'IoT Specialist' },
  { rank: 3, name: 'Bima Satria', class: 'XII SIJA 1', xp: 950, streak: 7, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80', badge: 'IoT Specialist' },
  { rank: 4, name: 'Syifa Maulida (Kamu)', class: 'XII SIJA 1', xp: 320, streak: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', isCurrentUser: true, badge: 'Network Cadet' },
  { rank: 5, name: 'Dimas Prasetyo', class: 'XI SIJA 1', xp: 280, streak: 3, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', badge: 'Novice SysAdmin' },
  { rank: 6, name: 'Zahra Nabila', class: 'XI SIJA 2', xp: 210, streak: 4, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80', badge: 'Novice SysAdmin' }
];

export const DAILY_CHALLENGE_QUESTION = {
  id: 'daily-2026-11-05',
  date: '2026-11-05',
  topic: 'Cisco Switching & VLAN',
  title: 'Tantangan Harian: Mode Port Cisco Switch',
  question: 'Pada switch Cisco Catalyst, jenis port apakah yang digunakan untuk menghubungkan port switch ke PC siswa biasa (bukan antar-switch) dan hanya membawa satu VLAN tanpa disisipkan tag 802.1Q?',
  options: [
    'Trunk Port',
    'Access Port',
    'Dynamic Desirable Port',
    'Tunnel Port'
  ],
  correctIndex: 1,
  xpReward: 40,
  explanation: 'Access Port didesain khusus untuk menghubungkan end-device (PC, printer, server tunggal). Frame Ethernet yang keluar dari access port selalu berupa standar untagged frame biasa.'
};

