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
  Lightbulb,
  Check,
  BookOpen,
  ArrowRight,
  Power,
  Radio,
  Thermometer,
  ShieldAlert,
  Info
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

// Standard Vocational Practical Tasks (UKK SIJA)
const WIRING_COMPONENTS = [
  {
    id: 'ultrasonic',
    name: 'Sensor Jarak Ultrasonik (HC-SR04)',
    tag: '4 Pin Sensor',
    icon: Radio,
    color: 'from-blue-600 to-cyan-600',
    desc: 'Mengukur jarak rintangan dengan gelombang suara 40 kHz untuk sistem parkir otomatis / robotik.',
    componentPins: [
      { id: 'vcc', name: 'VCC', expectedEspPin: 'vin', wireColor: 'bg-rose-500 text-white', label: 'Daya 5V' },
      { id: 'trig', name: 'Trig', expectedEspPin: 'g5', wireColor: 'bg-emerald-500 text-white', label: 'Trigger Pulsa' },
      { id: 'echo', name: 'Echo', expectedEspPin: 'g18', wireColor: 'bg-amber-500 text-slate-900', label: 'Echo Pantulan' },
      { id: 'gnd', name: 'GND', expectedEspPin: 'gnd', wireColor: 'bg-slate-900 text-white', label: 'Ground' }
    ],
    testResult: {
      title: 'Gelombang Ultrasonik Berhasil Membaca!',
      detail: 'Trig memancarkan 8 pulsa ultrasonik 40kHz, Echo menerima pantulan balik dalam waktu 1046µs. Jarak benda terdeteksi: 18.0 cm.',
      sensorVal: '18 cm'
    }
  },
  {
    id: 'dht22',
    name: 'Sensor Suhu & Kelembaban (DHT22)',
    tag: '3 Pin Digital',
    icon: Thermometer,
    color: 'from-teal-600 to-emerald-600',
    desc: 'Membaca iklim ruangan server data center melalui protokol komunikasi kabel digital 1-Wire.',
    componentPins: [
      { id: 'vcc', name: 'VCC', expectedEspPin: '3v3', wireColor: 'bg-rose-500 text-white', label: 'Daya 3.3V' },
      { id: 'data', name: 'DATA', expectedEspPin: 'g4', wireColor: 'bg-teal-500 text-white', label: 'Sinyal 1-Wire' },
      { id: 'gnd', name: 'GND', expectedEspPin: 'gnd', wireColor: 'bg-slate-900 text-white', label: 'Ground' }
    ],
    testResult: {
      title: 'Pembacaan Suhu & Kelembaban Berhasil!',
      detail: 'Checksum 40-bit terverifikasi valid via GPIO 4. Suhu ruangan server: 26.8°C | Kelembaban udara: 60.2% RH.',
      sensorVal: '26.8°C | 60% RH'
    }
  },
  {
    id: 'relay',
    name: 'Modul Relay 1-Channel (Beban 220V)',
    tag: '3 Pin Aktuator',
    icon: Power,
    color: 'from-amber-600 to-orange-600',
    desc: 'Saklar elektromagnetik terisolasi optocoupler untuk mengendalikan lampu listrik rumah tangga AC 220V.',
    componentPins: [
      { id: 'vcc', name: 'VCC', expectedEspPin: 'vin', wireColor: 'bg-rose-500 text-white', label: 'Daya 5V' },
      { id: 'in', name: 'IN', expectedEspPin: 'g23', wireColor: 'bg-blue-500 text-white', label: 'Pemicu Logika' },
      { id: 'gnd', name: 'GND', expectedEspPin: 'gnd', wireColor: 'bg-slate-900 text-white', label: 'Ground' }
    ],
    testResult: {
      title: 'Relay Berbunyi "KLIK!" — Lampu 220V Menyala!',
      detail: 'Sinyal LOW pada GPIO 23 memicu phototransistor optocoupler. Kontak Normally Open (NO) menutup sehingga arus 220V AC mengalir.',
      sensorVal: 'Lampu 220V AKTIF'
    }
  },
  {
    id: 'led',
    name: 'Rangkaian Lampu LED + Resistor 220Ω',
    tag: '2 Pin Output',
    icon: Zap,
    color: 'from-rose-600 to-pink-600',
    desc: 'Komponen output dasar visual untuk indikator peringatan atau notifikasi sistem IoT.',
    componentPins: [
      { id: 'anode', name: 'Anoda (+)', expectedEspPin: 'g18', wireColor: 'bg-rose-500 text-white', label: 'Kaki Panjang (+ Resistor)' },
      { id: 'cathode', name: 'Katoda (-)', expectedEspPin: 'gnd', wireColor: 'bg-slate-900 text-white', label: 'Kaki Pendek' }
    ],
    testResult: {
      title: 'Lampu LED Menyala Terang & Aman!',
      detail: 'Arus dibatasi secara sempurna oleh Resistor 220Ω sehingga LED tidak mengalami overcurrent (tegangan jatuh 2.0V @ 15mA).',
      sensorVal: 'LED ON ⚡'
    }
  }
];

// ESP32 Available Sockets / Pins
const ESP32_PINS = [
  { id: '3v3', name: '3V3', desc: 'Daya Logika 3.3V (Maks 500mA)', badge: 'Power 3.3V' },
  { id: 'vin', name: 'VIN (5V)', desc: 'Daya 5V dari Port USB', badge: 'Power 5V' },
  { id: 'gnd', name: 'GND', desc: 'Ground / Netral', badge: 'Ground' },
  { id: 'g4', name: 'GPIO 4', desc: 'Pin Komunikasi 1-Wire DHT', badge: 'Digital IO' },
  { id: 'g5', name: 'GPIO 5', desc: 'Pin Trigger Ultrasonik', badge: 'Digital IO' },
  { id: 'g18', name: 'GPIO 18', desc: 'Pin Echo / PWM LED', badge: 'Digital PWM' },
  { id: 'g23', name: 'GPIO 23', desc: 'Pin Sinyal Relay AC', badge: 'Digital IO' }
];

export const VirtualBreadboardSimulator = () => {
  const { addXP, showToast } = useApp();

  const [activeCompId, setActiveCompId] = useState('ultrasonic');
  const currentComp = WIRING_COMPONENTS.find((c) => c.id === activeCompId) || WIRING_COMPONENTS[0];

  // Selected Pin to Connect (from Component)
  const [selectedCompPin, setSelectedCompPin] = useState(null);

  // Connected Wires Mapping: { componentPinId: espPinId }
  const [connectedWires, setConnectedWires] = useState({});

  // Circuit Test Result
  const [testResult, setTestResult] = useState(null);

  // Handle clicking a component pin
  const handleSelectCompPin = (pinId) => {
    setSelectedCompPin(pinId);
    setTestResult(null);
  };

  // Handle connecting to an ESP32 pin
  const handleConnectToEsp = (espPinId) => {
    if (!selectedCompPin) {
      if (showToast) showToast('Pilih salah satu pin pada komponen di sebelah kiri terlebih dahulu!', 'info');
      return;
    }

    setConnectedWires((prev) => ({
      ...prev,
      [selectedCompPin]: espPinId
    }));
    setSelectedCompPin(null);
    setTestResult(null);
  };

  // Remove a wire
  const handleRemoveWire = (compPinId) => {
    setConnectedWires((prev) => {
      const copy = { ...prev };
      delete copy[compPinId];
      return copy;
    });
    setTestResult(null);
  };

  // Auto-connect properly (Panduan Perakitan Cepat)
  const handleAutoConnect = () => {
    const autoMap = {};
    currentComp.componentPins.forEach((p) => {
      autoMap[p.id] = p.expectedEspPin;
    });
    setConnectedWires(autoMap);
    setTestResult(null);
    if (showToast) showToast('Semua kabel jumper berhasil dipasang sesuai standar!', 'success');
  };

  // Reset wires
  const handleResetWires = () => {
    setConnectedWires({});
    setSelectedCompPin(null);
    setTestResult(null);
  };

  // Test Circuit Simulation
  const handleTestCircuit = () => {
    // 1. Check if all component pins are connected
    const totalPins = currentComp.componentPins.length;
    const connectedCount = Object.keys(connectedWires).length;

    if (connectedCount < totalPins) {
      setTestResult({
        success: false,
        type: 'incomplete',
        title: '⚠️ Rangkaian Belum Lengkap!',
        msg: `Masih ada pin yang belum terhubung (${connectedCount}/${totalPins} pin terpasang). Lengkapi seluruh kabel jumper agar sirkuit dapat dialiri daya.`
      });
      return;
    }

    // 2. Check for short-circuit fatal error (e.g., VCC connected to GND)
    if (connectedWires['vcc'] === 'gnd' || (connectedWires['anode'] && connectedWires['anode'] === 'gnd')) {
      setTestResult({
        success: false,
        type: 'short-circuit',
        title: '🛑 BAHAYA KORSLETING (SHORT CIRCUIT)!',
        msg: 'Kamu menghubungkan pin Daya (VCC/Anoda) langsung ke pin Ground (GND)! Dalam dunia nyata, regulator ESP32 akan berasap dan rusak terbakar seketika!'
      });
      return;
    }

    // 3. Check correctness against expected pins
    let allCorrect = true;
    const mismatches = [];

    currentComp.componentPins.forEach((p) => {
      const connectedEsp = connectedWires[p.id];
      if (connectedEsp !== p.expectedEspPin) {
        allCorrect = false;
        const expectedPinObj = ESP32_PINS.find((ep) => ep.id === p.expectedEspPin);
        mismatches.push(`Pin [${p.name}] dicolok ke [${connectedEsp}], seharusnya ke [${expectedPinObj?.name}]`);
      }
    });

    if (!allCorrect) {
      setTestResult({
        success: false,
        type: 'wrong-pin',
        title: '❌ Sirkuit Gagal Berfungsi: Pin Tertukar!',
        msg: `Data sensor tidak terbaca karena salah memasang kabel: ${mismatches.join('; ')}.`
      });
      return;
    }

    // 4. All Correct!
    setTestResult({
      success: true,
      type: 'success',
      title: `✨ ${currentComp.testResult.title}`,
      msg: currentComp.testResult.detail,
      sensorVal: currentComp.testResult.sensorVal
    });
    addXP(40);
    if (showToast) showToast('Perakitan Kabel Jumper Sempurna! (+40 XP)', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. HERO EXPLANATION BANNER */}
      <div className="bg-linear-to-r from-teal-600 via-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-teal-100">
            <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
            <span>Studio Colok Kabel Jumper IoT (Pin-to-Pin Wiring)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Praktek Merakit Kabel Sensor ke ESP32 🛠️
          </h2>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Cara paling mudah dan berguna untuk menguasai elektronika SIJA: <strong>Klik pin pada sensor di sebelah kiri</strong>, lalu <strong>klik pin tujuan pada papan ESP32 di sebelah kanan</strong>. Uji apakah kabelmu terpasang sempurna atau terjadi korsleting!
          </p>
        </div>
      </div>

      {/* 2. COMPONENT TASK SELECTOR */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {WIRING_COMPONENTS.map((comp) => {
            const Icon = comp.icon;
            const isSelected = activeCompId === comp.id;

            return (
              <button
                key={comp.id}
                onClick={() => {
                  setActiveCompId(comp.id);
                  handleResetWires();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{comp.name.split('(')[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoConnect}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 border border-blue-200"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bantu Pasang Standar</span>
          </button>
          <button
            onClick={handleResetWires}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Cabut Semua Kabel</span>
          </button>
        </div>
      </div>

      {/* 3. INTERACTIVE PIN-TO-PIN WIRING WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Component Pins (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">Langkah 1: Pilih Pin</span>
              <h3 className="text-sm font-black text-slate-900">{currentComp.name}</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
              {currentComp.tag}
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            {currentComp.desc}
          </p>

          {/* Component Pins List */}
          <div className="space-y-2.5 pt-1">
            {currentComp.componentPins.map((pin) => {
              const isSelected = selectedCompPin === pin.id;
              const connectedToEspId = connectedWires[pin.id];
              const connectedEspObj = ESP32_PINS.find((ep) => ep.id === connectedToEspId);

              return (
                <div
                  key={pin.id}
                  onClick={() => handleSelectCompPin(pin.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-400'
                      : connectedToEspId
                      ? 'border-emerald-300 bg-emerald-50/50'
                      : 'border-slate-200 hover:border-blue-300 bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs shadow-xs ${pin.wireColor}`}>
                      {pin.name.slice(0, 3)}
                    </span>
                    <div>
                      <div className="text-xs font-black text-slate-900">Pin {pin.name}</div>
                      <div className="text-[10px] text-slate-500">{pin.label}</div>
                    </div>
                  </div>

                  {connectedToEspId ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-800">
                        ➔ {connectedEspObj?.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveWire(pin.id);
                        }}
                        className="text-slate-400 hover:text-rose-600 text-xs px-1 cursor-pointer"
                        title="Lepas kabel ini"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {isSelected ? 'Klik Pin ESP32 ➔' : 'Pilih Pin'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Wires Overview & Actions (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4 flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-sm font-black text-slate-900">Status Kabel Jumper</h3>
              <span className="text-xs font-bold text-slate-500">
                {Object.keys(connectedWires).length}/{currentComp.componentPins.length} Terpasang
              </span>
            </div>

            {/* List of Connected Cables */}
            {Object.keys(connectedWires).length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl space-y-2">
                <Activity className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Belum ada kabel terhubung. <strong>Pilih pin di kiri</strong> lalu <strong>pilih pin ESP32 di kanan</strong> untuk memasang kabel jumper.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {Object.entries(connectedWires).map(([compPinId, espPinId]) => {
                  const compPin = currentComp.componentPins.find((p) => p.id === compPinId);
                  const espPin = ESP32_PINS.find((ep) => ep.id === espPinId);

                  return (
                    <div
                      key={compPinId}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${compPin?.wireColor.split(' ')[0]}`} />
                        <span className="font-bold text-slate-800">{compPin?.name}</span>
                        <span className="text-slate-400">─────</span>
                        <span className="font-bold text-blue-700">{espPin?.name}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveWire(compPinId)}
                        className="text-slate-400 hover:text-rose-600 font-sans text-xs px-1 cursor-pointer"
                      >
                        Cabut
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Test Circuit Action Button */}
          <div className="space-y-3 pt-3">
            <button
              onClick={handleTestCircuit}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-md shadow-blue-500/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>⚡ Uji Aliran Listrik & Respons Sirkuit</span>
            </button>

            {/* Test Feedback Display */}
            {testResult && (
              <div
                className={`p-3.5 rounded-2xl border text-xs animate-in fade-in ${
                  testResult.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : testResult.type === 'short-circuit'
                    ? 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="font-black mb-1">{testResult.title}</div>
                <div className="leading-relaxed opacity-95">{testResult.msg}</div>
                {testResult.sensorVal && (
                  <div className="mt-2 pt-2 border-t border-emerald-200 font-mono font-bold text-emerald-700 flex items-center justify-between">
                    <span>Data Sensor Terbaca:</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-emerald-300">{testResult.sensorVal}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: ESP32 Target Pins (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Langkah 2: Target ESP32</span>
              <h3 className="text-sm font-black text-slate-900">Pin Header ESP32 DOIT</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
              30 Pin Header
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Pilih pin target pada mikrokontroler tempat kabel jumper akan dicolokkan:
          </p>

          {/* ESP32 Pins Sockets List */}
          <div className="space-y-2 pt-1">
            {ESP32_PINS.map((espPin) => {
              const isOccupied = Object.values(connectedWires).includes(espPin.id);

              return (
                <button
                  key={espPin.id}
                  onClick={() => handleConnectToEsp(espPin.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isOccupied
                      ? 'border-emerald-300 bg-emerald-50/70 text-slate-900'
                      : selectedCompPin
                      ? 'border-blue-400 hover:border-blue-600 bg-blue-50/40 hover:bg-blue-50 text-slate-800'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-slate-800 text-white font-mono text-[10px] font-black flex items-center justify-center">
                      PIN
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">{espPin.name}</div>
                      <div className="text-[10px] text-slate-500">{espPin.desc}</div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isOccupied ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-slate-100 text-slate-500'}`}>
                    {isOccupied ? 'Tercolok ✓' : espPin.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. REFERENCE CONTEKAN PINOUT UKK SIJA */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-black text-slate-900">Contekan Standar Pinout Uji Kompetensi Kejuruan (UKK SIJA)</h3>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Perangkat Sensor/Aktuator</th>
                <th className="p-3">Pin Perangkat</th>
                <th className="p-3">Pin ESP32 yang Wajib</th>
                <th className="p-3">Warna Kabel Standar</th>
                <th className="p-3">Alasan Teknis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr>
                <td className="p-3 font-bold" rowSpan={4}>HC-SR04 (Ultrasonik)</td>
                <td className="p-3">VCC</td>
                <td className="p-3 font-mono font-bold text-rose-600">VIN (5V)</td>
                <td className="p-3">🔴 Merah</td>
                <td className="p-3">Transduser piezo 40kHz membutuhkan daya 5V</td>
              </tr>
              <tr>
                <td className="p-3">Trig</td>
                <td className="p-3 font-mono font-bold text-emerald-600">GPIO 5</td>
                <td className="p-3">🟢 Hijau</td>
                <td className="p-3">Mengirim pulsa pemicu gelombang</td>
              </tr>
              <tr>
                <td className="p-3">Echo</td>
                <td className="p-3 font-mono font-bold text-amber-600">GPIO 18</td>
                <td className="p-3">🟡 Kuning</td>
                <td className="p-3">Menerima pantulan gelombang pantul</td>
              </tr>
              <tr>
                <td className="p-3">GND</td>
                <td className="p-3 font-mono font-bold text-slate-700">GND</td>
                <td className="p-3">⚫ Hitam</td>
                <td className="p-3">Jalur netral penutup rangkaian</td>
              </tr>

              <tr>
                <td className="p-3 font-bold" rowSpan={3}>DHT22 (Suhu Lingkungan)</td>
                <td className="p-3">VCC</td>
                <td className="p-3 font-mono font-bold text-rose-600">3V3 (3.3V)</td>
                <td className="p-3">🔴 Merah</td>
                <td className="p-3">Menghindari overvoltage sinyal data ke pin ADC</td>
              </tr>
              <tr>
                <td className="p-3">DATA</td>
                <td className="p-3 font-mono font-bold text-teal-600">GPIO 4</td>
                <td className="p-3">🟢 Hijau</td>
                <td className="p-3">Komunikasi digital seri 1-Wire</td>
              </tr>
              <tr>
                <td className="p-3">GND</td>
                <td className="p-3 font-mono font-bold text-slate-700">GND</td>
                <td className="p-3">⚫ Hitam</td>
                <td className="p-3">Jalur ground referensi logika</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
