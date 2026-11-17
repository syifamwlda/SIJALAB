import React, { useState, useEffect } from 'react';
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
  Sliders,
  Lightbulb,
  Check,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Power,
  Sun,
  Moon,
  Thermometer,
  Droplets,
  Terminal,
  Code
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const VirtualBreadboardSimulator = () => {
  const { addXP, showToast } = useApp();

  // Active Project Selection
  const [activeProject, setActiveProject] = useState('streetlight'); // 'streetlight', 'server-alarm', 'smart-garden'

  // Active View Tab: 'workbench' (Simulasi), 'code' (Kode Arduino C++), 'wiring' (Skema Pinout)
  const [activeTab, setActiveTab] = useState('workbench');

  // --- PROJECT 1: Smart Street Light (LDR + LED) State ---
  const [lightAmbient, setLightAmbient] = useState(2500); // 0 (Gelap) to 4095 (Terang)
  const [ledPinState, setLedPinState] = useState(false);

  // --- PROJECT 2: Server Overheat Alarm (DHT22 + Buzzer) State ---
  const [serverTemp, setServerTemp] = useState(26); // in Celcius
  const [buzzerAlert, setBuzzerAlert] = useState(false);

  // --- PROJECT 3: Smart Garden Pump (Soil Moisture + Relay) State ---
  const [soilMoisture, setSoilMoisture] = useState(65); // percentage (0 - 100%)
  const [pumpRelayState, setPumpRelayState] = useState(false);

  // Serial Monitor Output
  const [serialLogs, setSerialLogs] = useState([
    '[ESP32] Core 1 running bootloader v4.4...',
    '[ESP32] Hardware GPIO Initialized @ 115200 baud.',
    '[ESP32] Sistem siap menjalankan logika otomasi sensor.'
  ]);

  // Handle Project 1 LDR simulation logic
  useEffect(() => {
    if (activeProject === 'streetlight') {
      const isDark = lightAmbient < 1200;
      setLedPinState(isDark);
      const timestamp = new Date().toLocaleTimeString();
      setSerialLogs((prev) => [
        ...prev.slice(-6),
        `[${timestamp}] [LDR-ADC34] Raw: ${lightAmbient} (${isDark ? 'GELAP' : 'TERANG'}) -> Lampu Jalan: ${isDark ? 'ON (GPIO 18 HIGH)' : 'OFF (GPIO 18 LOW)'}`
      ]);
    }
  }, [lightAmbient, activeProject]);

  // Handle Project 2 Temperature Alarm logic
  useEffect(() => {
    if (activeProject === 'server-alarm') {
      const isOverheat = serverTemp > 32;
      setBuzzerAlert(isOverheat);
      const timestamp = new Date().toLocaleTimeString();
      setSerialLogs((prev) => [
        ...prev.slice(-6),
        `[${timestamp}] [DHT22-GPIO4] Suhu Rak Server: ${serverTemp}°C -> ${isOverheat ? '⚠️ OVERHEAT! BUZZER ALARM ON (1000Hz)' : 'STATUS NORMAL'}`
      ]);
    }
  }, [serverTemp, activeProject]);

  // Handle Project 3 Smart Garden logic
  useEffect(() => {
    if (activeProject === 'smart-garden') {
      const isDry = soilMoisture < 30;
      setPumpRelayState(isDry);
      const timestamp = new Date().toLocaleTimeString();
      setSerialLogs((prev) => [
        ...prev.slice(-6),
        `[${timestamp}] [SOIL-ADC32] Kelembaban: ${soilMoisture}% -> ${isDry ? 'TANAH KERING! RELAY ON (Pompa 220V Nyala)' : 'KELEMBABAN CUKUP (Relay OFF)'}`
      ]);
    }
  }, [soilMoisture, activeProject]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. EDUCATIONAL HERO BANNER */}
      <div className="bg-linear-to-r from-teal-600 via-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-teal-100">
            <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
            <span>Laboratorium Otomasi Embedded IoT (ESP32)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Simulasi Proyek Elektronika & SIoT Nyata 🛠️
          </h2>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Bukan sekadar mencolok kabel! Di sini kamu mempelajari bagaimana mikrokontroler <strong>ESP32</strong> membaca sinyal input dari sensor fisik (LDR, DHT22, Soil Moisture), memproses logika kode C++, dan mengendalikan aktuator output (LED, Buzzer, Relay 220V AC).
          </p>
        </div>
      </div>

      {/* 2. PROJECT SELECTOR BUTTONS */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveProject('streetlight')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeProject === 'streetlight'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Proyek 1: Lampu Jalan Otomatis (LDR + LED)</span>
          </button>

          <button
            onClick={() => setActiveProject('server-alarm')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeProject === 'server-alarm'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Thermometer className="w-4 h-4" />
            <span>Proyek 2: Alarm Overheat Server (DHT22 + Buzzer)</span>
          </button>

          <button
            onClick={() => setActiveProject('smart-garden')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeProject === 'smart-garden'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>Proyek 3: Pompa Irigasi Otomatis (Relay 220V)</span>
          </button>
        </div>

        {/* Tab Sub-views */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setActiveTab('workbench')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'workbench' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Workbench
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'code' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Kode Arduino C++
          </button>
          <button
            onClick={() => setActiveTab('wiring')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'wiring' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Skema Pinout
          </button>
        </div>
      </div>

      {/* 3. MAIN WORKBENCH VIEW */}
      {activeTab === 'workbench' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Visual Hardware Workbench (Col 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  {activeProject === 'streetlight' && 'Proyek 1: Sensor Cahaya LDR & Lampu LED'}
                  {activeProject === 'server-alarm' && 'Proyek 2: Monitoring Suhu Server & Buzzer'}
                  {activeProject === 'smart-garden' && 'Proyek 3: Kelembaban Tanah & Modul Relay'}
                </h3>
                <p className="text-xs text-slate-500">Ubah variabel sensor di panel kanan untuk mengamati respons aktuator</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                ESP32 Logic (3.3V)
              </span>
            </div>

            {/* Visual Hardware Mockup Box */}
            <div className="rounded-2xl bg-linear-to-b from-slate-100 to-slate-200 p-6 border border-slate-300 shadow-inner flex flex-col md:flex-row items-center justify-around gap-6 min-h-[260px]">
              {/* Microcontroller ESP32 */}
              <div className="w-44 bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 flex flex-col items-center text-white shadow-lg">
                <div className="w-16 h-6 bg-linear-to-r from-amber-600 to-yellow-600 rounded text-[9px] font-mono font-black text-slate-950 flex items-center justify-center mb-2">
                  ESP-WROOM
                </div>
                <Cpu className="w-8 h-8 text-cyan-400 my-1 animate-pulse" />
                <div className="text-xs font-black">ESP32 DOIT V1</div>
                <div className="text-[9px] font-mono text-cyan-300">Dual Core 240MHz</div>

                <div className="w-full mt-3 grid grid-cols-2 gap-1 text-[9px] font-mono text-center">
                  <span className="bg-slate-800 text-blue-300 p-1 rounded font-bold">3V3 / GND</span>
                  <span className="bg-slate-800 text-emerald-300 p-1 rounded font-bold">
                    {activeProject === 'streetlight' ? 'GPIO 34 (ADC)' : activeProject === 'server-alarm' ? 'GPIO 4 (DATA)' : 'GPIO 32 (ADC)'}
                  </span>
                  <span className="bg-slate-800 text-teal-300 p-1 rounded font-bold">
                    {activeProject === 'streetlight' ? 'GPIO 18 (PWM)' : activeProject === 'server-alarm' ? 'GPIO 21 (BUZ)' : 'GPIO 23 (RELAY)'}
                  </span>
                  <span className="bg-slate-800 text-rose-300 p-1 rounded font-bold">VIN (5V)</span>
                </div>
              </div>

              {/* Connected Component Box */}
              <div className="flex-1 w-full max-w-xs bg-white rounded-2xl p-5 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center shadow-xs min-h-[200px]">
                {/* PROJECT 1: STREETLIGHT */}
                {activeProject === 'streetlight' && (
                  <div className="space-y-3">
                    <div
                      className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all ${
                        ledPinState
                          ? 'bg-amber-400 shadow-2xl shadow-amber-400/80 ring-8 ring-amber-200'
                          : 'bg-slate-100 border-2 border-slate-300'
                      }`}
                    >
                      <Zap
                        className={`w-10 h-10 ${
                          ledPinState ? 'text-amber-900 fill-amber-900 animate-pulse' : 'text-slate-400'
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900">Lampu Penerangan Jalan (LED)</h4>
                      <p className="text-[11px] text-slate-500">
                        Status Sinyal GPIO 18: <strong>{ledPinState ? 'HIGH (3.3V)' : 'LOW (0V)'}</strong>
                      </p>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-black ${
                        ledPinState ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {ledPinState ? 'LAMPU MENYALA (Malam Hari)' : 'LAMPU PADAM (Siang Hari)'}
                    </span>
                  </div>
                )}

                {/* PROJECT 2: SERVER OVERHEAT ALARM */}
                {activeProject === 'server-alarm' && (
                  <div className="space-y-3">
                    <div
                      className={`w-20 h-20 rounded-2xl mx-auto flex items-center justify-center transition-all ${
                        buzzerAlert
                          ? 'bg-rose-500 shadow-2xl shadow-rose-500/80 ring-8 ring-rose-200 animate-bounce'
                          : 'bg-emerald-100 border-2 border-emerald-300'
                      }`}
                    >
                      <AlertTriangle
                        className={`w-10 h-10 ${buzzerAlert ? 'text-white' : 'text-emerald-600'}`}
                      />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900">Buzzer Peringatan Ruang Server</h4>
                      <p className="text-[11px] text-slate-500">
                        Suhu Terukur: <strong>{serverTemp}°C</strong> (Ambang Batas: 32°C)
                      </p>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-black ${
                        buzzerAlert ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {buzzerAlert ? '⚠️ ALARM BERBUNYI (Buzzer ON)' : 'SUHU AMAN & NORMAL'}
                    </span>
                  </div>
                )}

                {/* PROJECT 3: SMART GARDEN PUMP */}
                {activeProject === 'smart-garden' && (
                  <div className="space-y-3">
                    <div
                      className={`w-20 h-20 rounded-2xl mx-auto flex items-center justify-center transition-all ${
                        pumpRelayState
                          ? 'bg-blue-600 shadow-2xl shadow-blue-500/80 ring-8 ring-blue-200'
                          : 'bg-slate-100 border-2 border-slate-300'
                      }`}
                    >
                      <Power
                        className={`w-10 h-10 ${pumpRelayState ? 'text-white' : 'text-slate-400'}`}
                      />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900">Modul Relay & Pompa Air 220V</h4>
                      <p className="text-[11px] text-slate-500">
                        Kelembaban Tanah: <strong>{soilMoisture}%</strong> (Batas Kering: &lt; 30%)
                      </p>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-black ${
                        pumpRelayState ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {pumpRelayState ? 'RELAY KLIK! POMPA MENYIRAM' : 'POMPA AIR STANDBY'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Serial Monitor Live Terminal */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-800 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ESP32 Serial Monitor (COM4 @ 115200 baud)</span>
                </div>
                <span className="text-emerald-400 font-bold">Online</span>
              </div>
              <div className="h-28 overflow-y-auto space-y-1 pt-1">
                {serialLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed ${
                      log.includes('GELAP') || log.includes('OVERHEAT') || log.includes('KERING')
                        ? 'text-amber-400 font-bold'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Variable Controls (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-black text-slate-900">Uji Variabel Lingkungan Nyata</h3>
              </div>

              {/* PROJECT 1 SLIDER */}
              {activeProject === 'streetlight' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Tingkat Cahaya Sekitar (Sensor LDR):</span>
                      <span className="font-mono text-blue-600">ADC {lightAmbient}</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="4000"
                      step="50"
                      value={lightAmbient}
                      onChange={(e) => setLightAmbient(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold">
                      <span>Malam Hari (Gelap)</span>
                      <span>Batas Ambang (1200)</span>
                      <span>Siang Terik (Terang)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
                    💡 <strong>Ilmu Penting:</strong> Sensor LDR mengubah resistansi berdasarkan cahaya. Ketika gelap, resistansi LDR melonjak sehingga nilai ADC turun di bawah 1200. ESP32 membaca ini via pin GPIO 34 dan menyalakan lampu secara otomatis!
                  </div>
                </div>
              )}

              {/* PROJECT 2 SLIDER */}
              {activeProject === 'server-alarm' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Suhu Ruang Rak Server (DHT22):</span>
                      <span className="font-mono text-rose-600">{serverTemp}°C</span>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="45"
                      step="1"
                      value={serverTemp}
                      onChange={(e) => setServerTemp(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold">
                      <span>Dingin (18°C)</span>
                      <span>Batas Kritis (32°C)</span>
                      <span>Overheat (45°C)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 leading-relaxed">
                    💡 <strong>Ilmu Penting:</strong> Server data center wajib berada pada suhu 18°C - 27°C. Ketika AC ruangan mati dan suhu menembus 32°C, ESP32 membunyikan alarm piezo buzzer agar teknisi sigap mencegah kerusakan CPU server!
                  </div>
                </div>
              )}

              {/* PROJECT 3 SLIDER */}
              {activeProject === 'smart-garden' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Kelembaban Tanah (Soil Moisture):</span>
                      <span className="font-mono text-emerald-600">{soilMoisture}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="95"
                      step="1"
                      value={soilMoisture}
                      onChange={(e) => setSoilMoisture(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold">
                      <span>Kering Kritis (5%)</span>
                      <span>Batas Siram (30%)</span>
                      <span>Basah Lembab (95%)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed">
                    💡 <strong>Ilmu Penting:</strong> Mikrokontroler 3.3V tidak bisa langsung menyalakan pompa air 220V AC. Karena itu digunakan <strong>Modul Relay</strong> ber-optocoupler sebagai saklar isolator elektromagnetik yang aman.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. CODE VIEW (Belajar Kode Arduino Nyata) */}
      {activeTab === 'code' && (
        <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xl text-slate-200 font-mono text-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-slate-100">Kode Skrip Arduino IDE (ESP32 C++)</span>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">firmware.ino</span>
          </div>

          <pre className="whitespace-pre-wrap leading-relaxed text-slate-300">
            {activeProject === 'streetlight' && `// Proyek 1: Otomasi Lampu Jalan ESP32 + Sensor LDR
const int ldrPin = 34;   // Pin Analog ADC untuk sensor LDR
const int ledPin = 18;   // Pin Digital PWM untuk Lampu LED

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int ldrValue = analogRead(ldrPin); // Membaca nilai 0 - 4095
  Serial.print("Nilai Sensor Cahaya: ");
  Serial.println(ldrValue);

  // Jika nilai ADC di bawah 1200 (kondisi gelap / malam hari)
  if (ldrValue < 1200) {
    digitalWrite(ledPin, HIGH); // Nyalakan lampu
  } else {
    digitalWrite(ledPin, LOW);  // Padamkan lampu di siang hari
  }
  delay(1000);
}`}

            {activeProject === 'server-alarm' && `// Proyek 2: Alarm Overheat Server ESP32 + DHT22 + Buzzer
#include "DHT.h"
#define DHTPIN 4
#define DHTTYPE DHT22
#define BUZZER_PIN 21

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  float suhu = dht.readTemperature();
  Serial.print("Suhu Server: ");
  Serial.print(suhu);
  Serial.println(" *C");

  // Jika suhu melewati ambang kritis 32 Derajat Celsius
  if (suhu > 32.0) {
    tone(BUZZER_PIN, 1000); // Bunyikan alarm buzzer 1kHz
  } else {
    noTone(BUZZER_PIN);     // Matikan alarm jika suhu aman
  }
  delay(2000);
}`}

            {activeProject === 'smart-garden' && `// Proyek 3: Smart Garden Otomatis ESP32 + Relay Pompa 220V
const int sensorPin = 32; // Pin Analog Soil Moisture
const int relayPin = 23;  // Pin Digital Pengendali Relay (Active LOW)

void setup() {
  Serial.begin(115200);
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH); // Standby OFF
}

void loop() {
  int nilaiSensor = analogRead(sensorPin);
  int persenKelembaban = map(nilaiSensor, 4095, 1500, 0, 100);

  Serial.print("Kelembaban Tanah: ");
  Serial.print(persenKelembaban);
  Serial.println("%");

  // Jika kelembaban tanah di bawah 30% (Kering)
  if (persenKelembaban < 30) {
    digitalWrite(relayPin, LOW);  // Picu relay menyalakan pompa air
  } else {
    digitalWrite(relayPin, HIGH); // Matikan pompa air
  }
  delay(3000);
}`}
          </pre>
        </div>
      )}

      {/* 5. WIRING SCHEMATIC PINOUT VIEW */}
      {activeTab === 'wiring' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-black text-slate-900">Tabel Pinout Kabel Lengkap</h3>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Nama Komponen</th>
                  <th className="p-3">Pin Komponen</th>
                  <th className="p-3">Pin ESP32</th>
                  <th className="p-3">Warna Kabel Standar</th>
                  <th className="p-3">Fungsi Teknis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {activeProject === 'streetlight' && (
                  <>
                    <tr>
                      <td className="p-3 font-bold">Sensor LDR</td>
                      <td className="p-3">Kaki 1</td>
                      <td className="p-3 font-mono font-bold text-blue-600">3V3</td>
                      <td className="p-3">🔴 Merah</td>
                      <td className="p-3">Tegangan referensi pembagi arus</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Sensor LDR</td>
                      <td className="p-3">Kaki 2 (+ Resistor 10kΩ)</td>
                      <td className="p-3 font-mono font-bold text-blue-600">GPIO 34 (ADC)</td>
                      <td className="p-3">🟡 Kuning</td>
                      <td className="p-3">Sinyal analog tegangan berubah-ubah</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Lampu LED</td>
                      <td className="p-3">Kaki Anoda (+ Resistor 220Ω)</td>
                      <td className="p-3 font-mono font-bold text-blue-600">GPIO 18 (PWM)</td>
                      <td className="p-3">🟢 Hijau</td>
                      <td className="p-3">Sinyal digital pengaktif lampu</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Semua GND</td>
                      <td className="p-3">Katoda LED & Ground Resistor</td>
                      <td className="p-3 font-mono font-bold text-blue-600">GND</td>
                      <td className="p-3">⚫ Hitam</td>
                      <td className="p-3">Jalur netral penutup sirkuit</td>
                    </tr>
                  </>
                )}

                {activeProject === 'server-alarm' && (
                  <>
                    <tr>
                      <td className="p-3 font-bold">Sensor DHT22</td>
                      <td className="p-3">Pin 1 (VCC)</td>
                      <td className="p-3 font-mono font-bold text-blue-600">3V3</td>
                      <td className="p-3">🔴 Merah</td>
                      <td className="p-3">Daya operasional logika 3.3V</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Sensor DHT22</td>
                      <td className="p-3">Pin 2 (DATA)</td>
                      <td className="p-3 font-mono font-bold text-blue-600">GPIO 4</td>
                      <td className="p-3">🟡 Kuning</td>
                      <td className="p-3">Komunikasi digital 1-Wire</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Piezo Buzzer</td>
                      <td className="p-3">Kutub Positif (+)</td>
                      <td className="p-3 font-mono font-bold text-blue-600">GPIO 21</td>
                      <td className="p-3">🟢 Hijau</td>
                      <td className="p-3">Frekuensi nada PWM 1000 Hz</td>
                    </tr>
                  </>
                )}

                {activeProject === 'smart-garden' && (
                  <>
                    <tr>
                      <td className="p-3 font-bold">Soil Moisture</td>
                      <td className="p-3">Pin A0 (Analog)</td>
                      <td className="p-3 font-mono font-bold text-blue-600">GPIO 32 (ADC)</td>
                      <td className="p-3">🟡 Kuning</td>
                      <td className="p-3">Membaca kadar air tanah</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Modul Relay</td>
                      <td className="p-3">Pin IN (Signal)</td>
                      <td className="p-3 font-mono font-bold text-blue-600">GPIO 23</td>
                      <td className="p-3">🟢 Hijau</td>
                      <td className="p-3">Memicu koil saklar optocoupler</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Modul Relay</td>
                      <td className="p-3">Terminal NO (Normally Open)</td>
                      <td className="p-3 font-mono text-slate-500">Kabel Fasa AC 220V</td>
                      <td className="p-3">🟤 Cokelat AC</td>
                      <td className="p-3">Saklar daya pompa air listrik</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
