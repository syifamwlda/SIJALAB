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
  Sliders
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const VirtualBreadboardSimulator = () => {
  const { addXP } = useApp();

  // Selected Component from Rack
  const [selectedComp, setSelectedComp] = useState('led'); // 'led', 'dht22', 'relay'

  // Wiring Configuration State
  const [wiring, setWiring] = useState({
    led: {
      hasResistor: true,
      targetPin: 'GPIO 18',
      groundPin: 'GND',
      state: 'OFF'
    },
    dht22: {
      powerPin: '3V3',
      dataPin: 'GPIO 4',
      groundPin: 'GND',
      hasPullup: true,
      state: 'IDLE'
    },
    relay: {
      vccPin: 'VIN (5V)',
      inPin: 'GPIO 23',
      groundPin: 'GND',
      state: 'OFF'
    }
  });

  const [isRunning, setIsRunning] = useState(false);
  const [serialOutput, setSerialOutput] = useState([
    '[SIJALAB-ESP32] Firmware Bootloader ready...',
    'Menunggu instruksi pengetesan sirkuit komponen.'
  ]);
  const [circuitAlert, setCircuitAlert] = useState(null);

  const handleTestCircuit = () => {
    setIsRunning(true);
    setCircuitAlert(null);

    const newLogs = [...serialOutput];

    setTimeout(() => {
      setIsRunning(false);

      if (selectedComp === 'led') {
        if (!wiring.led.hasResistor) {
          setCircuitAlert({
            type: 'danger',
            title: 'BAHAYA OVERCURRENT!',
            msg: 'LED 5mm kelebihan arus (tanpa Resistor 220Ω). Dalam praktikum nyata, lampu LED akan putus/meledak dan merusak pin GPIO ESP32!'
          });
          newLogs.push('[ERROR] Overcurrent on GPIO 18! Peak current exceeded 40mA.');
        } else if (wiring.led.targetPin === 'GPIO 18') {
          setWiring((prev) => ({
            ...prev,
            led: { ...prev.led, state: 'ON' }
          }));
          setCircuitAlert({
            type: 'success',
            title: 'Sirkuit LED Berhasil!',
            msg: 'LED Merah menyala sempurna dengan perlindungan resistor 220Ω pada pin PWM GPIO 18.'
          });
          newLogs.push('[ESP32-GPIO18] ledcWrite(18, 255) -> LED ON @ 100% Duty Cycle');
          addXP(50, 'Berhasil merakit dan menyalakan sirkuit LED ESP32!');
        }
      } else if (selectedComp === 'dht22') {
        if (wiring.dht22.powerPin === 'VIN (5V)') {
          setCircuitAlert({
            type: 'warning',
            title: 'PERHATIAN TEGANGAN!',
            msg: 'Pin VCC dicolok ke 5V. ESP32 membutuhkan level logika 3.3V agar pin data tidak mengalami overvoltage.'
          });
          newLogs.push('[WARN] DHT22 data signal > 3.6V! Risk of damage to ESP32 ADC.');
        } else {
          setWiring((prev) => ({
            ...prev,
            dht22: { ...prev.dht22, state: 'ACTIVE' }
          }));
          setCircuitAlert({
            type: 'success',
            title: 'Pembacaan Sensor Sukses!',
            msg: 'Sensor suhu & kelembaban DHT22 merespons melalui single-bus GPIO 4.'
          });
          newLogs.push('[DHT22-GPIO4] Checksum OK -> Suhu: 27.8°C | Kelembaban: 64.2% RH');
          addXP(60, 'Berhasil merakit sensor lingkungan DHT22!');
        }
      } else if (selectedComp === 'relay') {
        setWiring((prev) => ({
          ...prev,
          relay: { ...prev.relay, state: 'ON' }
        }));
        setCircuitAlert({
          type: 'success',
          title: 'Relay Active LOW Sukses!',
          msg: 'Optocoupler terpicu, kontak mekanis NO (Normally Open) menutup dengan bunyi "KLIK!".'
        });
        newLogs.push('[RELAY-GPIO23] digitalWrite(23, LOW) -> Relay Switched ON (AC Load Active)');
        addXP(60, 'Berhasil mengendalikan modul saklar relay!');
      }

      setSerialOutput(newLogs);
    }, 900);
  };

  const handleReset = () => {
    setWiring({
      led: { hasResistor: true, targetPin: 'GPIO 18', groundPin: 'GND', state: 'OFF' },
      dht22: { powerPin: '3V3', dataPin: 'GPIO 4', groundPin: 'GND', hasPullup: true, state: 'IDLE' },
      relay: { vccPin: 'VIN (5V)', inPin: 'GPIO 23', groundPin: 'GND', state: 'OFF' }
    });
    setCircuitAlert(null);
    setSerialOutput([
      '[SIJALAB-ESP32] Firmware Bootloader ready...',
      'Rangkaian di-reset ke kondisi awal.'
    ]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
      {/* VIRTUAL BREADBOARD & WIRING CANVAS (2 Cols) */}
      <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
        {/* Canvas Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
              Virtual Breadboard & Microcontroller Workbench
            </span>
            <h3 className="text-sm font-extrabold text-white">
              Sirkuit Prototipe Elektronika SIoT
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sirkuit</span>
          </button>
        </div>

        {/* Visual Workbench Center: ESP32 + Breadboard */}
        <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6 relative">
          {/* Microcontroller ESP32 Board */}
          <div className="w-48 bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 flex flex-col items-center shadow-2xl relative">
            <div className="w-16 h-8 bg-linear-to-r from-amber-600 to-yellow-600 rounded-md mb-2 flex items-center justify-center text-[10px] font-mono font-black text-slate-900 shadow-inner">
              ESP-WROOM
            </div>
            <Cpu className="w-10 h-10 text-cyan-400 my-1 animate-pulse" />
            <span className="text-xs font-black text-white">ESP32 DOIT V1</span>
            <span className="text-[10px] font-mono text-cyan-300">Dual Core 240MHz</span>

            {/* Pins indicator badges */}
            <div className="mt-3 w-full grid grid-cols-2 gap-1 text-[10px] font-mono text-center">
              <span className="bg-slate-900 text-blue-300 p-1 rounded font-bold">G18 (PWM)</span>
              <span className="bg-slate-900 text-emerald-300 p-1 rounded font-bold">3V3 / GND</span>
              <span className="bg-slate-900 text-teal-300 p-1 rounded font-bold">G4 (DATA)</span>
              <span className="bg-slate-900 text-rose-300 p-1 rounded font-bold">G23 (RELAY)</span>
            </div>
          </div>

          {/* Connected Virtual Component View */}
          <div className="flex-1 w-full max-w-xs bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3 min-h-[220px]">
            {selectedComp === 'led' && (
              <div className="space-y-3">
                <div
                  className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-all ${
                    wiring.led.state === 'ON'
                      ? 'bg-rose-500 shadow-2xl shadow-rose-500/80 ring-8 ring-rose-400/30'
                      : 'bg-rose-950/80 border-2 border-rose-800'
                  }`}
                >
                  <Zap
                    className={`w-8 h-8 ${
                      wiring.led.state === 'ON' ? 'text-white fill-white' : 'text-rose-700'
                    }`}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Lampu LED Merah 5mm</h4>
                  <p className="text-[11px] text-slate-400">
                    Resistor Pembatas: {wiring.led.hasResistor ? '✅ 220Ω Terpasang' : '❌ Tanpa Resistor'}
                  </p>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-black ${
                    wiring.led.state === 'ON'
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  Status: {wiring.led.state}
                </span>
              </div>
            )}

            {selectedComp === 'dht22' && (
              <div className="space-y-3">
                <div
                  className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center transition-all ${
                    wiring.dht22.state === 'ACTIVE'
                      ? 'bg-teal-500 shadow-2xl shadow-teal-500/80 ring-8 ring-teal-400/30'
                      : 'bg-teal-950/80 border-2 border-teal-800'
                  }`}
                >
                  <Activity
                    className={`w-8 h-8 ${
                      wiring.dht22.state === 'ACTIVE' ? 'text-white' : 'text-teal-700'
                    }`}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Sensor Lingkungan DHT22</h4>
                  <p className="text-[11px] text-slate-400">VCC Power: {wiring.dht22.powerPin} (Logika 3.3V)</p>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-black ${
                    wiring.dht22.state === 'ACTIVE'
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {wiring.dht22.state === 'ACTIVE' ? '27.8°C | 64% RH' : 'Standby'}
                </span>
              </div>
            )}

            {selectedComp === 'relay' && (
              <div className="space-y-3">
                <div
                  className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center transition-all ${
                    wiring.relay.state === 'ON'
                      ? 'bg-amber-500 shadow-2xl shadow-amber-500/80 ring-8 ring-amber-400/30'
                      : 'bg-amber-950/80 border-2 border-amber-800'
                  }`}
                >
                  <Radio
                    className={`w-8 h-8 ${
                      wiring.relay.state === 'ON' ? 'text-white' : 'text-amber-700'
                    }`}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Modul Relay Optocoupler</h4>
                  <p className="text-[11px] text-slate-400">Terminal: COM & Normally Open (NO)</p>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-black ${
                    wiring.relay.state === 'ON'
                      ? 'bg-amber-500 text-slate-900 font-extrabold'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  Relay: {wiring.relay.state === 'ON' ? 'KLIK! (Active LOW)' : 'OFF'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Live Serial Monitor Output */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1 border-b border-slate-900">
            <span>ESP32 Serial Monitor @ 115200 baud</span>
            <span className="text-emerald-400">COM3 (Online)</span>
          </div>
          <div className="max-h-24 overflow-y-auto space-y-1 text-slate-300">
            {serialOutput.map((log, i) => (
              <p key={i} className="leading-snug">{log}</p>
            ))}
          </div>
        </div>

        {/* Test Circuit Action Button */}
        <button
          onClick={handleTestCircuit}
          disabled={isRunning}
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>{isRunning ? 'Sedang Mengeksekusi Firmware...' : '⚡ Jalankan Sirkuit / Flash Firmware'}</span>
        </button>

        {/* Alert Feedback */}
        {circuitAlert && (
          <div
            className={`p-4 rounded-2xl border text-xs font-bold animate-in fade-in flex items-start gap-3 ${
              circuitAlert.type === 'danger'
                ? 'bg-rose-950/90 border-rose-500 text-rose-200'
                : circuitAlert.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500 text-amber-200'
                : 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
            }`}
          >
            {circuitAlert.type === 'danger' ? (
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="block font-black text-sm mb-0.5">{circuitAlert.title}</span>
              <p className="leading-relaxed font-medium">{circuitAlert.msg}</p>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: COMPONENT RACK & PARAMETER CONTROLS */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Rak Komponen & Wiring
            </h3>
          </div>
        </div>

        {/* Component Selector Tabs */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">Pilih Komponen Praktik</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedComp('led')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                selectedComp === 'led'
                  ? 'bg-rose-50 border-rose-400 text-rose-700 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              LED 5mm
            </button>
            <button
              onClick={() => setSelectedComp('dht22')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                selectedComp === 'dht22'
                  ? 'bg-teal-50 border-teal-400 text-teal-700 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Sensor DHT22
            </button>
            <button
              onClick={() => setSelectedComp('relay')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                selectedComp === 'relay'
                  ? 'bg-amber-50 border-amber-400 text-amber-800 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Modul Relay
            </button>
          </div>
        </div>

        {/* Parameters for LED */}
        {selectedComp === 'led' && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">Gunakan Resistor 220Ω?</span>
              <input
                type="checkbox"
                checked={wiring.led.hasResistor}
                onChange={(e) =>
                  setWiring((prev) => ({
                    ...prev,
                    led: { ...prev.led, hasResistor: e.target.checked }
                  }))
                }
                className="w-4 h-4 text-rose-600 rounded cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              💡 Coba matikan centang resistor untuk melihat bagaimana sistem mendeteksi kerusakan overcurrent!
            </p>
          </div>
        )}

        {/* Parameters for DHT22 */}
        {selectedComp === 'dht22' && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Pin Catu Daya VCC</label>
              <select
                value={wiring.dht22.powerPin}
                onChange={(e) =>
                  setWiring((prev) => ({
                    ...prev,
                    dht22: { ...prev.dht22, powerPin: e.target.value }
                  }))
                }
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"
              >
                <option value="3V3">3V3 (Tegangan Logika ESP32 Aman)</option>
                <option value="VIN (5V)">VIN 5V (Overvoltage Hazard)</option>
              </select>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              ESP32 tidak toleran 5V. Sambungkan ke 3V3 agar chip aman dari tegangan berlebih.
            </p>
          </div>
        )}

        {/* Parameters for Relay */}
        {selectedComp === 'relay' && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-800 block">Konfigurasi Relay:</span>
            <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
              Pin IN terhubung ke GPIO 23 dengan logika Active LOW. Optocoupler mengisolasi lonjakan listrik AC 220V dari chip ESP32.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

