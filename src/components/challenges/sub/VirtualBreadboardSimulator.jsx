import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  Activity,
  Radio,
  Sliders,
  Lightbulb,
  Check,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Power
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const VirtualBreadboardSimulator = () => {
  const { addXP, showToast } = useApp();

  // Selected Lab Topic
  const [activeLab, setActiveLab] = useState('led'); // 'led', 'dht22', 'relay'

  // Component Specific States
  // 1. LED State
  const [ledHasResistor, setLedHasResistor] = useState(true);
  const [ledPin, setLedPin] = useState('GPIO 18');
  const [ledPowerState, setLedPowerState] = useState(false);

  // 2. DHT22 State
  const [dhtVoltage, setDhtVoltage] = useState('3.3V'); // '3.3V' or '5V'
  const [dhtPin, setDhtPin] = useState('GPIO 4');
  const [dhtReadState, setDhtReadState] = useState(false);

  // 3. Relay State
  const [relayTrigger, setRelayTrigger] = useState(false);

  // Feedback Notification State
  const [alertInfo, setAlertInfo] = useState(null);

  // Handle LED Test
  const handleToggleLed = () => {
    if (!ledHasResistor) {
      setLedPowerState(false);
      setAlertInfo({
        type: 'danger',
        title: '⚠️ BAHAYA: LED HANGUS / OVERCURRENT!',
        msg: 'Kamu menyalakan LED tanpa Resistor pembatas arus (220Ω). Dalam dunia nyata, LED akan meledak kecil atau putus terbakar dan merusak pin GPIO ESP32!',
        solution: 'Pasang Resistor 220Ω terlebih dahulu dengan mengaktifkan toggle resistor.'
      });
      return;
    }

    const nextState = !ledPowerState;
    setLedPowerState(nextState);
    if (nextState) {
      setAlertInfo({
        type: 'success',
        title: '✨ Rangkaian LED Menyala Sempurna!',
        msg: `Arus mengalir aman dari ${ledPin} (3.3V) melewati Resistor 220Ω menuju kaki Anoda (+), lalu kembali ke GND lewat Katoda (-).`,
        solution: null
      });
      addXP(30);
      if (showToast) showToast('Rangkaian LED Sukses! (+30 XP)', 'success');
    } else {
      setAlertInfo(null);
    }
  };

  // Handle DHT22 Test
  const handleReadDht = () => {
    if (dhtVoltage === '5V') {
      setDhtReadState(false);
      setAlertInfo({
        type: 'warning',
        title: '⚠️ TEGANGAN TERLALU TINGGI!',
        msg: 'Sensor dicolok ke pin 5V (VIN). ESP32 memiliki toleransi logika maksimal 3.6V. Menghubungkan data 5V berisiko merusak pin ADC/GPIO ESP32!',
        solution: 'Pindahkan kabel VCC ke pin 3.3V (3V3) ESP32.'
      });
      return;
    }

    setDhtReadState(true);
    setAlertInfo({
      type: 'success',
      title: '🌡️ Sensor Berhasil Membaca Lingkungan!',
      msg: `Data diterima via 1-Wire pada ${dhtPin}: Suhu Ruang Lab = 27.4°C, Kelembaban Udara = 62.5% RH.`,
      solution: null
    });
    addXP(40);
    if (showToast) showToast('Sensor Lingkungan Sukses! (+40 XP)', 'success');
  };

  // Handle Relay Test
  const handleToggleRelay = () => {
    const nextState = !relayTrigger;
    setRelayTrigger(nextState);
    if (nextState) {
      setAlertInfo({
        type: 'success',
        title: '🔌 Relay Terpicu: Lampu Rumah 220V Menyala!',
        msg: 'Sinyal LOW/HIGH dari GPIO 23 memicu koil elektromagnetik relay (terdengar bunyi "KLIK!"). Kontak Normally Open (NO) menutup sehingga arus listrik AC 220V mengalir menyalakan lampu.',
        solution: null
      });
      addXP(40);
      if (showToast) showToast('Kontrol Saklar Relay Berhasil! (+40 XP)', 'success');
    } else {
      setAlertInfo(null);
    }
  };

  const handleResetAll = () => {
    setLedHasResistor(true);
    setLedPowerState(false);
    setDhtVoltage('3.3V');
    setDhtReadState(false);
    setRelayTrigger(false);
    setAlertInfo(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. PENJELASAN KONSEP UNTUK SISWA (Mudah Dipelajari) */}
      <div className="bg-linear-to-r from-teal-600 via-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-teal-100">
            <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
            <span>Dasar Elektronika & SIoT (Internet of Things)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Cara Belajar Merakit di Virtual Breadboard 🛠️
          </h2>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            <strong>Breadboard</strong> adalah papan uji coba tanpa perlu menyolder komponen. Di sini kamu akan belajar menghubungkan pin mikrokontroler <strong>ESP32</strong> dengan komponen elektronika nyata. Pastikan polaritas kaki komponen dan resistor pembatas arus sudah tepat sebelum menyalakan daya!
          </p>
        </div>
      </div>

      {/* 2. LAB SELECTOR PILLS */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setActiveLab('led');
              setAlertInfo(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeLab === 'led'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Praktikum 1: Lampu LED + Resistor</span>
          </button>

          <button
            onClick={() => {
              setActiveLab('dht22');
              setAlertInfo(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeLab === 'dht22'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Praktikum 2: Sensor Suhu DHT22</span>
          </button>

          <button
            onClick={() => {
              setActiveLab('relay');
              setAlertInfo(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeLab === 'relay'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>Praktikum 3: Saklar Relay 220V</span>
          </button>
        </div>

        <button
          onClick={handleResetAll}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sirkuit</span>
        </button>
      </div>

      {/* 3. MAIN WORKBENCH: VISUAL BREADBOARD & PINOUT TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Workbench Canvas (Col 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-black text-slate-900">
                Papan Rangkaian Prototipe (Breadboard & ESP32)
              </h3>
              <p className="text-xs text-slate-500">Amati aliran daya dan respons visual komponen</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
              ESP32 Ready (3.3V Logic)
            </span>
          </div>

          {/* Realistic Clean Breadboard Mockup */}
          <div className="rounded-2xl bg-linear-to-b from-slate-100 to-slate-200 p-6 border border-slate-300 shadow-inner flex flex-col md:flex-row items-center justify-around gap-6 relative">
            {/* ESP32 Microcontroller Board */}
            <div className="w-44 bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 flex flex-col items-center text-white shadow-lg">
              <div className="w-16 h-6 bg-linear-to-r from-amber-600 to-yellow-600 rounded text-[9px] font-mono font-black text-slate-950 flex items-center justify-center mb-2">
                ESP-WROOM
              </div>
              <Cpu className="w-8 h-8 text-cyan-400 my-1 animate-pulse" />
              <div className="text-xs font-black">ESP32 DOIT V1</div>
              <div className="text-[9px] font-mono text-cyan-300">30 Pins NodeMCU</div>

              {/* Pins labels */}
              <div className="w-full mt-3 grid grid-cols-2 gap-1 text-[9px] font-mono text-center">
                <span className="bg-slate-800 text-blue-300 p-1 rounded font-bold">G18 (PWM)</span>
                <span className="bg-slate-800 text-emerald-300 p-1 rounded font-bold">3V3 / GND</span>
                <span className="bg-slate-800 text-teal-300 p-1 rounded font-bold">G4 (DATA)</span>
                <span className="bg-slate-800 text-rose-300 p-1 rounded font-bold">G23 (RELAY)</span>
              </div>
            </div>

            {/* Breadboard Connection Component Box */}
            <div className="flex-1 w-full max-w-xs bg-white rounded-2xl p-5 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center shadow-xs min-h-[220px]">
              {/* COMPONENT 1: LED */}
              {activeLab === 'led' && (
                <div className="space-y-3">
                  <div
                    className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all ${
                      ledPowerState
                        ? 'bg-rose-500 shadow-2xl shadow-rose-500/80 ring-8 ring-rose-200'
                        : 'bg-rose-100 border-2 border-rose-300'
                    }`}
                  >
                    <Zap
                      className={`w-10 h-10 ${
                        ledPowerState ? 'text-white fill-white animate-bounce' : 'text-rose-400'
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900">Lampu LED Merah 5mm</h4>
                    <p className="text-[11px] text-slate-500">
                      Resistor: {ledHasResistor ? '✅ 220Ω Terpasang' : '❌ Tanpa Resistor (Bahaya!)'}
                    </p>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-black ${
                      ledPowerState ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    Status: {ledPowerState ? 'MENYALA TERANG ⚡' : 'MATI (OFF)'}
                  </span>
                </div>
              )}

              {/* COMPONENT 2: DHT22 */}
              {activeLab === 'dht22' && (
                <div className="space-y-3">
                  <div
                    className={`w-20 h-20 rounded-2xl mx-auto flex items-center justify-center transition-all ${
                      dhtReadState
                        ? 'bg-teal-500 shadow-2xl shadow-teal-500/60 ring-8 ring-teal-200'
                        : 'bg-teal-100 border-2 border-teal-300'
                    }`}
                  >
                    <Activity
                      className={`w-10 h-10 ${dhtReadState ? 'text-white' : 'text-teal-600'}`}
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900">Sensor Suhu & Kelembaban DHT22</h4>
                    <p className="text-[11px] text-slate-500">Tegangan Masukan: {dhtVoltage}</p>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-black ${
                      dhtReadState ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {dhtReadState ? '27.4°C | 62.5% RH' : 'Menunggu Pembacaan'}
                  </span>
                </div>
              )}

              {/* COMPONENT 3: RELAY */}
              {activeLab === 'relay' && (
                <div className="space-y-3">
                  <div
                    className={`w-20 h-20 rounded-2xl mx-auto flex items-center justify-center transition-all ${
                      relayTrigger
                        ? 'bg-amber-500 shadow-2xl shadow-amber-500/60 ring-8 ring-amber-200'
                        : 'bg-amber-100 border-2 border-amber-300'
                    }`}
                  >
                    <Power
                      className={`w-10 h-10 ${relayTrigger ? 'text-white' : 'text-amber-700'}`}
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900">Modul Relay 1-Channel</h4>
                    <p className="text-[11px] text-slate-500">Saklar Beban Listrik Rumah (220V AC)</p>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-black ${
                      relayTrigger ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {relayTrigger ? 'RELAY AKTIF (KLIK!) — LAMPU ON' : 'RELAY NONAKTIF (OPEN)'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Feedback & Alert Box */}
          {alertInfo && (
            <div
              className={`p-4 rounded-2xl border animate-in fade-in ${
                alertInfo.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : alertInfo.type === 'danger'
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {alertInfo.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <h4 className="text-xs sm:text-sm font-black">{alertInfo.title}</h4>
              </div>
              <p className="text-xs leading-relaxed opacity-90">{alertInfo.msg}</p>
              {alertInfo.solution && (
                <div className="text-xs font-bold mt-2 p-2 rounded-lg bg-white/80 border border-slate-200 text-slate-800">
                  💡 Solusi: {alertInfo.solution}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Wiring Table & Interactive Controls (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Box 1: Interactive Wiring Controls */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900">Pengaturan Rangkaian Komponen</h3>
            </div>

            {/* CONTROLS FOR LED */}
            {activeLab === 'led' && (
              <div className="space-y-3">
                {/* Resistor Switch Toggle */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Resistor Pembatas Arus (220Ω)</div>
                    <div className="text-[10px] text-slate-500">Mencegah arus berlebih merusak LED</div>
                  </div>
                  <button
                    onClick={() => setLedHasResistor(!ledHasResistor)}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      ledHasResistor ? 'bg-emerald-500' : 'bg-rose-400'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 shadow-xs ${
                        ledHasResistor ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Target Pin Selection */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Pin Sinyal ESP32:</label>
                  <select
                    value={ledPin}
                    onChange={(e) => setLedPin(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="GPIO 18">GPIO 18 (PWM Pin)</option>
                    <option value="GPIO 2">GPIO 2 (Onboard LED Pin)</option>
                    <option value="GPIO 4">GPIO 4 (General IO)</option>
                  </select>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleToggleLed}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    ledPowerState
                      ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/25'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25'
                  }`}
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>{ledPowerState ? 'Matikan Lampu LED' : 'Nyalakan Lampu LED (Uji Rangkaian)'}</span>
                </button>
              </div>
            )}

            {/* CONTROLS FOR DHT22 */}
            {activeLab === 'dht22' && (
              <div className="space-y-3">
                {/* Voltage Input Choice */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Tegangan Daya (VCC):</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDhtVoltage('3.3V')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        dhtVoltage === '3.3V'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      3.3V (Disarankan)
                    </button>
                    <button
                      onClick={() => setDhtVoltage('5V')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        dhtVoltage === '5V'
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      5V (Beresiko)
                    </button>
                  </div>
                </div>

                {/* Data Pin Choice */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Pin Komunikasi Data:</label>
                  <select
                    value={dhtPin}
                    onChange={(e) => setDhtPin(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="GPIO 4">GPIO 4 (1-Wire Bus)</option>
                    <option value="GPIO 15">GPIO 15</option>
                  </select>
                </div>

                {/* Read Button */}
                <button
                  onClick={handleReadDht}
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Activity className="w-4 h-4" />
                  <span>Baca Sensor Suhu & Kelembaban</span>
                </button>
              </div>
            )}

            {/* CONTROLS FOR RELAY */}
            {activeLab === 'relay' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Modul relay bertindak sebagai saklar elektrik terisolasi (optocoupler) untuk mengontrol lampu rumah AC 220V dari tegangan rendah ESP32.
                </p>

                <button
                  onClick={handleToggleRelay}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    relayTrigger
                      ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/25'
                      : 'bg-slate-800 hover:bg-slate-900 shadow-slate-800/25'
                  }`}
                >
                  <Power className="w-4 h-4" />
                  <span>{relayTrigger ? 'Lepas Relay (OFF)' : 'Picu Sinyal Relay (ON)'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Box 2: Tabel Panduan Kaki & Kabel (Wiring Table Guide) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-black text-slate-900">Tabel Jalur Kabel (Wiring Guide)</h3>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Kaki Komponen</th>
                    <th className="p-2.5">Pin ESP32</th>
                    <th className="p-2.5">Warna Kabel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {activeLab === 'led' && (
                    <>
                      <tr>
                        <td className="p-2.5 font-bold">Kaki Panjang (Anoda +)</td>
                        <td className="p-2.5 font-mono">GPIO 18 (+ Resistor)</td>
                        <td className="p-2.5"><span className="text-blue-600 font-bold">🔴 Merah / Biru</span></td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Kaki Pendek (Katoda -)</td>
                        <td className="p-2.5 font-mono">GND (Ground)</td>
                        <td className="p-2.5"><span className="text-slate-800 font-bold">⚫ Hitam</span></td>
                      </tr>
                    </>
                  )}

                  {activeLab === 'dht22' && (
                    <>
                      <tr>
                        <td className="p-2.5 font-bold">Pin 1 (VCC)</td>
                        <td className="p-2.5 font-mono">3V3 (3.3V)</td>
                        <td className="p-2.5"><span className="text-rose-600 font-bold">🔴 Merah</span></td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Pin 2 (DATA)</td>
                        <td className="p-2.5 font-mono">GPIO 4</td>
                        <td className="p-2.5"><span className="text-teal-600 font-bold">🟢 Hijau</span></td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Pin 4 (GND)</td>
                        <td className="p-2.5 font-mono">GND</td>
                        <td className="p-2.5"><span className="text-slate-800 font-bold">⚫ Hitam</span></td>
                      </tr>
                    </>
                  )}

                  {activeLab === 'relay' && (
                    <>
                      <tr>
                        <td className="p-2.5 font-bold">Pin VCC</td>
                        <td className="p-2.5 font-mono">VIN (5V)</td>
                        <td className="p-2.5"><span className="text-rose-600 font-bold">🔴 Merah</span></td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Pin IN (Signal)</td>
                        <td className="p-2.5 font-mono">GPIO 23</td>
                        <td className="p-2.5"><span className="text-amber-600 font-bold">🟡 Kuning</span></td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Pin GND</td>
                        <td className="p-2.5 font-mono">GND</td>
                        <td className="p-2.5"><span className="text-slate-800 font-bold">⚫ Hitam</span></td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-800 leading-relaxed">
              💡 <strong>Tips SIJA:</strong> Selalu gunakan kabel warna hitam untuk GND dan merah untuk VCC agar kamu tidak salah colok saat praktikum perangkat keras di lab sekolah.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
