import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Network,
  Terminal,
  Cpu,
  ShieldCheck,
  ChevronRight,
  Lightbulb,
  Check
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

// Comprehensive Subject-Specific Question Bank for SIJA
const QUESTION_BANK = {
  networking: {
    id: 'networking',
    title: 'Jaringan Komputer & Cisco',
    icon: Network,
    color: 'from-blue-600 to-cyan-600',
    badge: 'Cisco & Routing',
    desc: 'Kumpulan soal seputar subnetting IPv4, VLAN 802.1Q, routing protokol OSPF, model OSI, dan switching.',
    questions: [
      {
        id: 'net-1',
        question: 'Pada prefix CIDR /27 (255.255.255.224), berapakah jumlah Host Valid yang dapat dialokasikan ke komputer siswa?',
        options: [
          '32 Host',
          '30 Host',
          '62 Host',
          '14 Host'
        ],
        correctIndex: 1,
        explanation: 'Prefix /27 menyisakan 32 - 27 = 5 bit host. Total alamat IP = 2^5 = 32. Host valid = 32 - 2 = 30 host (karena 1 IP untuk Network ID dan 1 IP untuk Broadcast ID).'
      },
      {
        id: 'net-2',
        question: 'Sebuah frame Ethernet yang keluar dari Access Port pada Cisco Catalyst Switch menuju komputer siswa memiliki karakteristik seperti apa?',
        options: [
          'Memiliki header tag 802.1Q setebal 4 Byte',
          'Frame Ethernet standar tanpa tag VLAN (Untagged)',
          'Terenkapsulasi dalam paket GRE Tunnel',
          'Hanya membawa alamat multicast BGP'
        ],
        correctIndex: 1,
        explanation: 'Access Port didesain untuk end-device (PC, laptop). Switch secara otomatis melepaskan tag VLAN 802.1Q sebelum meneruskan frame keluar dari access port sehingga frame menjadi untagged biasa.'
      },
      {
        id: 'net-3',
        question: 'Pada protokol routing Open Shortest Path First (OSPF), metrik yang digunakan untuk menentukan jalur terbaik dihitung berdasarkan parameter apa?',
        options: [
          'Hop Count (jumlah lompatan router)',
          'Cost yang berbanding terbalik dengan Bandwidth link',
          'Kombinasi MTU dan Delay antarmuka',
          'Beban trafik CPU router pengirim'
        ],
        correctIndex: 1,
        explanation: 'OSPF menggunakan metrik Cost dengan rumus default: Cost = Reference Bandwidth (10^8) / Bandwidth antarmuka. Semakin besar kapasitas bandwidth link, semakin kecil cost-nya dan semakin disukai.'
      },
      {
        id: 'net-4',
        question: 'Perangkat switch Layer 2 konvensional mempelajari dan mencatat pemetaan antarmuka pada tabel CAM berdasarkan informasi apa?',
        options: [
          'IP Address Tujuan (Destination IP)',
          'MAC Address Asal (Source MAC Address)',
          'Port TCP/UDP yang sedang dibuka',
          'Nilai TTL (Time to Live) paket ICMP'
        ],
        correctIndex: 1,
        explanation: 'Ketika frame masuk ke port switch, switch membaca Source MAC Address dari header frame dan menyimpannya ke tabel CAM bersamaan dengan nomor port tempat frame tersebut diterima.'
      },
      {
        id: 'net-5',
        question: 'Berapakah nilai Administrative Distance (AD) default untuk rute statik (Static Route) pada router Cisco?',
        options: [
          '0',
          '1',
          '90',
          '110'
        ],
        correctIndex: 1,
        explanation: 'Administrative Distance default untuk rute statik adalah 1. Sebagai perbandingan: Connected = 0, EIGRP = 90, OSPF = 110, dan RIP = 120.'
      }
    ]
  },

  linux: {
    id: 'linux',
    title: 'Administrasi Server & Linux',
    icon: Terminal,
    color: 'from-emerald-600 to-teal-600',
    badge: 'SysAdmin & Linux',
    desc: 'Bank soal seputar manajemen berkas bash, hak akses chmod, daemon systemd, DNS Bind9, dan web server Nginx.',
    questions: [
      {
        id: 'lin-1',
        question: 'Hak akses nilai oktal `chmod 755 script.sh` memberikan hak izin kepada pemilik berkas (User), grup, dan pengguna lain (Others) sebagai apa?',
        options: [
          'User: Read Write Execute (rwx) | Group & Others: Read Execute (r-x)',
          'User: Read Write (rw-) | Group & Others: Read Only (r--)',
          'User, Group, dan Others semuanya mendapatkan hak penuh (rwxrwxrwx)',
          'User: Execute Only (--x) | Group & Others: No Access (---)'
        ],
        correctIndex: 0,
        explanation: 'Nilai 7 = 4(r) + 2(w) + 1(x) = rwx untuk User. Nilai 5 = 4(r) + 0 + 1(x) = r-x untuk Group. Nilai 5 = 4(r) + 0 + 1(x) = r-x untuk Others.'
      },
      {
        id: 'lin-2',
        question: 'Pada server DNS Bind9, berkas konfigurasi manakah yang digunakan secara khusus untuk mendefinisikan deklarasi nama zona forward dan reverse?',
        options: [
          '/etc/resolv.conf',
          '/etc/bind/named.conf.local',
          '/etc/network/interfaces',
          '/etc/default/bind9'
        ],
        correctIndex: 1,
        explanation: 'Pada Debian/Ubuntu, deklarasi zona lokal (`zone "sijalab.sch.id" { type master; file "..."; };`) ditempatkan pada berkas `/etc/bind/named.conf.local`.'
      },
      {
        id: 'lin-3',
        question: 'Perintah utilitas Linux modern apakah yang paling tepat untuk memeriksa daftar port TCP/UDP yang sedang dalam status listening beserta nama proses daemon-nya?',
        options: [
          'ip route show',
          'ss -tulpn',
          'cat /etc/services',
          'ping -c 4 localhost'
        ],
        correctIndex: 1,
        explanation: '`ss -tulpn` (Socket Statistics: TCP, UDP, Listening, Process, Numeric) adalah pengganti modern dari `netstat` yang cepat dan menampilkan port yang sedang terbuka.'
      },
      {
        id: 'lin-4',
        question: 'Layanan DHCP Server (isc-dhcp-server) menggunakan protokol transport dan nomor port standar berapa pada sisi Server dan Klien?',
        options: [
          'TCP Port 80 & 443',
          'UDP Port 67 (Server) & Port 68 (Klien)',
          'TCP Port 22 & 23',
          'UDP Port 53 & TCP Port 53'
        ],
        correctIndex: 1,
        explanation: 'DHCP beroperasi menggunakan UDP: Port 67 digunakan oleh DHCP Server untuk mendengarkan permintaan, dan Port 68 digunakan oleh DHCP Klien untuk menerima konfigurasi IP.'
      },
      {
        id: 'lin-5',
        question: 'Perintah apa yang digunakan untuk menguji keabsahan sintaks konfigurasi Nginx sebelum me-reload daemon ke lingkungan produksi?',
        options: [
          'systemctl status nginx',
          'nginx -t',
          'service nginx check',
          'curl -I http://localhost'
        ],
        correctIndex: 1,
        explanation: 'Perintah `nginx -t` (test configuration) memvalidasi semua berkas virtual host Nginx untuk memastikan tidak ada kesalahan titik koma atau penulisan direktori sebelum server direstart.'
      }
    ]
  },

  siot: {
    id: 'siot',
    title: 'Internet of Things & Embedded System',
    icon: Cpu,
    color: 'from-amber-600 to-orange-600',
    badge: 'ESP32 & Sensors',
    desc: 'Bank soal seputar arsitektur mikrokontroler ESP32, pinout GPIO, ADC, PWM, sensor lingkungan, dan aktuator relay.',
    questions: [
      {
        id: 'iot-1',
        question: 'Berapakah batas tegangan logika (Logic Level) maksimal yang aman untuk dihubungkan langsung ke pin GPIO mikrokontroler ESP32?',
        options: [
          '5.0 Volt',
          '3.3 Volt',
          '12 Volt',
          '1.8 Volt'
        ],
        correctIndex: 1,
        explanation: 'ESP32 bekerja pada logika 3.3V dan TIDAK 5V tolerant! Menghubungkan sinyal 5V langsung ke pin GPIO berisiko merusak transistor internal chip ESP32.'
      },
      {
        id: 'iot-2',
        question: 'Mengapa lampu LED 5mm wajib dipasangkan sebuah resistor pembatas arus (misal 220Ω - 330Ω) saat dihubungkan ke pin output mikrokontroler?',
        options: [
          'Agar lampu LED berkedip secara otomatis',
          'Membatasi arus listrik (mA) agar tidak melampaui batas maksimal LED dan pin GPIO',
          'Mengubah sinyal arus searah (DC) menjadi arus bolak-balik (AC)',
          'Menyimpan energi listrik cadangan saat tegangan turun'
        ],
        correctIndex: 1,
        explanation: 'LED memiliki resistansi internal yang sangat rendah. Tanpa resistor pembatas, arus berlebih (overcurrent) akan mengalir seketika, menyebabkan LED putus terbakar dan merusak pin mikrokontroler.'
      },
      {
        id: 'iot-3',
        question: 'Pada sensor suhu dan kelembaban digital DHT22/DHT11, protokol komunikasi kabel apa yang digunakan untuk mengirimkan data ke pin ESP32?',
        options: [
          'I2C Bus (SDA dan SCL)',
          'SPI Bus (MOSI, MISO, SCK)',
          '1-Wire Single Bus (Single Data Wire)',
          'UART Serial (TX dan RX)'
        ],
        correctIndex: 2,
        explanation: 'DHT22 menggunakan protokol komunikasi 1-Wire khusus berpemilik (single-bus) di mana sinyal start, respons, dan 40-bit data suhu/kelembaban dikirimkan melalui 1 helai kabel data.'
      },
      {
        id: 'iot-4',
        question: 'Komponen apakah pada modul relay yang berfungsi mengisolasi sirkuit tegangan rendah mikrokontroler (3.3V) dari percikan arus listrik beban tinggi (220V AC)?',
        options: [
          'Optocoupler (Photo-coupler)',
          'Dioda Penyearah Silikon',
          'Kapasitor Elektrolit',
          'Potensiometer'
        ],
        correctIndex: 0,
        explanation: 'Optocoupler memisahkan sinyal secara optik menggunakan pancaran cahaya LED infra-merah internal dan phototransistor, mencegah lonjakan tegangan 220V merusak ESP32.'
      },
      {
        id: 'iot-5',
        question: 'Fitur mikrokontroler apakah yang digunakan untuk mengatur tingkat kecerahan lampu LED atau kecepatan putaran motor DC secara halus?',
        options: [
          'ADC (Analog to Digital Converter)',
          'PWM (Pulse Width Modulation)',
          'RTC (Real Time Clock)',
          'EEPROM Non-Volatile'
        ],
        correctIndex: 1,
        explanation: 'PWM (Pulse Width Modulation) mengatur daya rata-rata dengan memvariasikan siklus kerja (Duty Cycle) sinyal digital berkecepatan tinggi.'
      }
    ]
  },

  troubleshoot: {
    id: 'troubleshoot',
    title: 'Keamanan & Troubleshooting SIJA',
    icon: ShieldCheck,
    color: 'from-rose-600 to-indigo-700',
    badge: 'Security & SOP',
    desc: 'Bank soal penanganan insiden jaringan: IP conflict, diagnosa kabel LAN Tester, isolasi gateway, dan firewall UFW.',
    questions: [
      {
        id: 'tb-1',
        question: 'Sebuah PC klien tidak dapat mengakses internet dan mendapatkan pesan "Destination Host Unreachable" saat ping ke 192.168.10.1 (IP Gateway). Apa langkah diagnosa awal yang paling tepat?',
        options: [
          'Langsung menginstall ulang sistem operasi Windows pada PC',
          'Periksa status link fisik kabel LAN (lampu indikator NIC) dan pastikan subnet IP klien sama dengan gateway',
          'Menghapus seluruh konfigurasi switch di ruang server',
          'Mengganti kabel serat optik utama ISP'
        ],
        correctIndex: 1,
        explanation: 'SOP Troubleshooting SIJA: Selalu mulai dari Layer 1 Fisik (kabel colok, link LED hijau) dan Layer 2/3 (periksa alokasi IP Address dan Default Gateway yang sesuai subnet).'
      },
      {
        id: 'tb-2',
        question: 'Saat menguji kabel UTP Cat6 standar Straight-Through T568B menggunakan LAN Tester, lampu LED nomor 1 sampai 8 menyala berurutan kecuali nomor 3 dan 6 yang mati. Masalah apa yang terjadi?',
        options: [
          'Kabel berfungsi normal sebagai kabel Cross-Over',
          'Kawat hijau-putih dan hijau (pin 3 dan 6) putus atau tidak terjepit sempurna di pin RJ45',
          'Baterai 9V pada alat LAN Tester habis',
          'Kabel terlalu panjang melewati batas 100 meter'
        ],
        correctIndex: 1,
        explanation: 'Pada susunan T568B, Pin 3 adalah Putih-Hijau dan Pin 6 adalah Hijau (pasangan Receive RX). Jika kedua LED ini mati, berarti kedua kawat tersebut tidak terhubung atau crimping tidak sempurna.'
      },
      {
        id: 'tb-3',
        question: 'Perintah firewall UFW pada server Linux apakah yang digunakan untuk membuka izin akses port Web Server HTTP standar (port 80)?',
        options: [
          'ufw deny 80/tcp',
          'sudo ufw allow 80/tcp',
          'iptables -F DROP 80',
          'ufw delete allow http'
        ],
        correctIndex: 1,
        explanation: '`sudo ufw allow 80/tcp` (atau `sudo ufw allow http`) menambahkan aturan firewall untuk mengizinkan paket incoming traffic pada port 80 protokol TCP.'
      }
    ]
  }
};

export const QuestionBankQuizChallenge = () => {
  const { addXP, showToast } = useApp();

  const [selectedSubject, setSelectedSubject] = useState('networking');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentCategory = QUESTION_BANK[selectedSubject];
  const questionsList = currentCategory.questions;
  const currentQuestion = questionsList[currentQuestionIndex];

  const handleSelectAnswer = (index) => {
    if (hasSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || hasSubmitted) return;
    setHasSubmitted(true);

    if (selectedAnswer === currentQuestion.correctIndex) {
      setUserScore((prev) => prev + 1);
      addXP(20);
      if (showToast) showToast('Jawaban Benar! (+20 XP)', 'success');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsList.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setHasSubmitted(false);
    } else {
      setQuizCompleted(true);
      addXP(50);
      if (showToast) showToast('Kuis Bidang Selesai! (+50 XP Bonus)', 'success');
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setUserScore(0);
    setQuizCompleted(false);
  };

  const handleSwitchCategory = (catId) => {
    setSelectedSubject(catId);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setUserScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. HEADER & SUBJECT SELECTOR */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">Bank Soal & Tanya Jawab Bidang SIJA</h2>
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded-full">
                  Latihan Mandiri
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Pilih bidang materi kejuruan untuk melatih penguasaan teori, istilah teknis, dan kalkulasi jaringan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRestartQuiz}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Kuis</span>
            </button>
          </div>
        </div>

        {/* Category Subject Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          {Object.values(QUESTION_BANK).map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedSubject === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSwitchCategory(cat.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200/80 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white bg-linear-to-tr ${cat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                    {cat.questions.length} Soal
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 leading-snug">{cat.title}</h4>
                  <span className="text-[10px] text-slate-500 font-medium">{cat.badge}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. QUESTION WORKBENCH */}
      {!quizCompleted ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
          {/* Progress & Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-800">
                Soal {currentQuestionIndex + 1} dari {questionsList.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">Bidang: {currentCategory.title}</span>
            </div>

            <div className="text-xs font-bold text-slate-600">
              Skor: <span className="text-blue-600 font-black">{userScore} Benar</span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQuestion.correctIndex;

              let btnStyle = 'border-slate-200 hover:border-blue-300 hover:bg-slate-50/80 bg-white text-slate-800';

              if (hasSubmitted) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-medium';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'border-blue-600 bg-blue-50 text-blue-950 font-bold ring-1 ring-blue-500';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={hasSubmitted}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </div>

                  {hasSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {hasSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Explanation upon Submission */}
          {hasSubmitted && (
            <div
              className={`p-4 rounded-2xl border animate-in fade-in duration-200 ${
                selectedAnswer === currentQuestion.correctIndex
                  ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/90 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 font-black text-xs sm:text-sm">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>
                  {selectedAnswer === currentQuestion.correctIndex
                    ? 'Tepat Sekali! Analisis Konsep:'
                    : 'Kurang Tepat. Pembahasan Konsep:'}
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-95">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2 flex justify-end">
            {!hasSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all cursor-pointer shadow-md ${
                  selectedAnswer !== null
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25'
                    : 'bg-slate-300 cursor-not-allowed shadow-none'
                }`}
              >
                Kirim Jawaban
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-blue-500/25 cursor-pointer flex items-center gap-2"
              >
                <span>{currentQuestionIndex < questionsList.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completion Card */
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 text-center max-w-xl mx-auto space-y-5 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900">Latihan Soal Bidang Selesai! 🎉</h3>
            <p className="text-xs text-slate-500 mt-1">
              Kamu telah menyelesaikan seluruh soal pada bidang <strong>{currentCategory.title}</strong>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block w-full max-w-xs">
            <div className="text-3xl font-black text-slate-900">
              {userScore} / {questionsList.length}
            </div>
            <div className="text-xs text-slate-500 font-bold mt-1">
              Persentase Kelulusan: {Math.round((userScore / questionsList.length) * 100)}%
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Ulangi Bidang Ini
            </button>
            <button
              onClick={() => {
                const keys = Object.keys(QUESTION_BANK);
                const nextKey = keys[(keys.indexOf(selectedSubject) + 1) % keys.length];
                handleSwitchCategory(nextKey);
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Coba Bidang Lain</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

