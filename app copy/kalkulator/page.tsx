"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowLeft, Sparkles, ShieldCheck, RefreshCw, Layers } from "lucide-react";

export default function KalkulatorPage() {
  const [mode, setMode] = useState("dosis");

  // State Input Terintegrasi
  const [form, setForm] = useState({
    // Mode Dosis & Sediaan
    dosisDiminta: "", satuanDiminta: "mg",
    dosisTersedia: "", satuanTersedia: "mg",
    volumeTersedia: "", satuanVolume: "mL",

    // Mode Pengenceran (C1V1 = C2V2)
    c1: "", v1: "", c2: "", v2: "", satuanC1: "M", satuanV1: "mL", satuanC2: "M", satuanV2: "mL",

    // Mode Molaritas & Mol
    massaZat: "", satuanMassa: "g",
    mrZat: "",
    volLarutan: "", satuanVolLarutan: "mL",

    // Mode Persen & Batch Sediaan
    jumlahTarget: "", jumlahFormulaAwal: "10", bobotSatuSatuan: ""
  });

  const [hasil, setHasil] = useState<string | null>(null);
  const [detailRumus, setDetailRumus] = useState<string>("");

  // Logger otomatis ke Dashboard Utama
  const logAktivitas = (pesan: string) => {
    if (typeof window !== 'undefined') {
      const history = JSON.parse(localStorage.getItem("bj_history") || "[]");
      const newHistory = [`${pesan} (${new Date().toLocaleTimeString()})`, ...history].slice(0, 10);
      localStorage.setItem("bj_history", JSON.stringify(newHistory));
    }
  };

  // Fungsi Konversi Satuan Massa ke Gram (Basis Standar)
  const toGram = (val: number, sat: string) => {
    if (sat === "mg") return val / 1000;
    if (sat === "mcg") return val / 1000000;
    return val; // gram
  };

  // Fungsi Konversi Satuan Volume ke Liter / mL
  const toML = (val: number, sat: string) => {
    if (sat === "L") return val * 1000;
    return val; // mL
  };

  const hitungKalkulasi = (e: React.FormEvent) => {
    e.preventDefault();
    let res = 0;
    let keterangan = "";

    if (mode === "dosis") {
      // Konversi satuan fleksibel (mg/g/mcg)
      const dReq = toGram(parseFloat(form.dosisDiminta), form.satuanDiminta);
      const dAvail = toGram(parseFloat(form.dosisTersedia), form.satuanTersedia);
      const vAvail = parseFloat(form.volumeTersedia) || 1;

      res = (dReq / dAvail) * vAvail;
      keterangan = `Jumlah sediaan yang diambil (${form.satuanVolume})`;
      logAktivitas(`Menghitung Dosis/Sediaan: ${res.toFixed(2)} ${form.satuanVolume}`);

    } else if (mode === "pengenceran") {
      // C1V1 = C2V2
      const valC1 = parseFloat(form.c1);
      const valV1 = parseFloat(form.v1);
      const valC2 = parseFloat(form.c2);
      const valV2 = parseFloat(form.v2);

      if (!isNaN(valC2) && !isNaN(valV2) && !isNaN(valC1) && valC1 > 0) {
        res = (valC2 * valV2) / valC1;
        keterangan = `Volume awal (V1) yang harus diambil (${form.satuanV1})`;
        logAktivitas(`Menghitung Pengenceran C1V1: ${res.toFixed(2)} ${form.satuanV1}`);
      }
    } else if (mode === "molaritas") {
      const massa = toGram(parseFloat(form.massaZat), form.satuanMassa);
      const mr = parseFloat(form.mrZat);
      const volL = toML(parseFloat(form.volLarutan), form.satuanVolLarutan) / 1000; // ubah ke Liter

      if (mr > 0 && volL > 0) {
        const mol = massa / mr;
        res = mol / volL;
        keterangan = `Molaritas larutan (M / mol/L)`;
        logAktivitas(`Menghitung Molaritas: ${res.toFixed(4)} M`);
      }
    } else if (mode === "batch") {
      const target = parseFloat(form.jumlahTarget);
      const awal = parseFloat(form.jumlahFormulaAwal);
      if (awal > 0) {
        res = target / awal;
        keterangan = `Faktor Pengali Batch (Faktor Skala Formula)`;
        logAktivitas(`Menghitung Faktor Batch: ${res}x`);
      }
    }

    setHasil(res ? res.toFixed(4) : "0.00");
    setDetailRumus(keterangan);
  };

  const resetForm = () => {
    setHasil(null);
    setDetailRumus("");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-200">
      <Link href="/" className="flex items-center text-sm text-gray-400 hover:text-white mb-6 transition">
        <ArrowLeft size={16} className="mr-2" /> Kembali ke Command Center
      </Link>

      <div className="bg-charcoal-800 border border-charcoal-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-charcoal-700 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <Calculator className="text-java mr-3" size={28} /> Kalkulator & Cheat Sheet Farmasi
            </h1>
            <p className="text-gray-400 text-sm">Disesuaikan dengan standar mini handbook praktikum farmasi.</p>
          </div>
          <div className="flex items-center space-x-2 bg-charcoal-900 border border-charcoal-700 px-4 py-2 rounded-xl text-xs text-java">
            <ShieldCheck size={16} /> <span>Konversi Satuan Otomatis</span>
          </div>
        </div>

        {/* Tab Menu Kalkulator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 bg-charcoal-900 p-2 rounded-2xl border border-charcoal-700">
          {[
            { id: "dosis", label: "Dosis & Sediaan" },
            { id: "pengenceran", label: "Pengenceran (C1V1)" },
            { id: "molaritas", label: "Molaritas (M = n/V)" },
            { id: "batch", label: "Faktor Batch & Skala" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setMode(tab.id); resetForm(); }}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center ${mode === tab.id ? "bg-java text-charcoal-900 shadow-lg" : "text-gray-400 hover:text-white"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={hitungKalkulasi} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {/* MODE 1: DOSIS & SEDIAAN */}
            {mode === "dosis" && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Dosis Diminta Resep</label>
                  <div className="flex gap-2">
                    <input type="number" step="any" required placeholder="Contoh: 500" value={form.dosisDiminta} onChange={e => setForm({...form, dosisDiminta: e.target.value})} className="flex-1 bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-white text-sm" />
                    <select value={form.satuanDiminta} onChange={e => setForm({...form, satuanDiminta: e.target.value})} className="bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-java text-sm font-bold">
                      <option value="mg">mg</option><option value="g">g</option><option value="mcg">mcg</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Dosis Sediaan Tersedia</label>
                  <div className="flex gap-2">
                    <input type="number" step="any" required placeholder="Contoh: 250" value={form.dosisTersedia} onChange={e => setForm({...form, dosisTersedia: e.target.value})} className="flex-1 bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-white text-sm" />
                    <select value={form.satuanTersedia} onChange={e => setForm({...form, satuanTersedia: e.target.value})} className="bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-java text-sm font-bold">
                      <option value="mg">mg</option><option value="g">g</option><option value="mcg">mcg</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Volume / Isi Sediaan</label>
                  <div className="flex gap-2">
                    <input type="number" step="any" required placeholder="Contoh: 5 (atau 1 untuk tablet)" value={form.volumeTersedia} onChange={e => setForm({...form, volumeTersedia: e.target.value})} className="flex-1 bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-white text-sm" />
                    <select value={form.satuanVolume} onChange={e => setForm({...form, satuanVolume: e.target.value})} className="bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-java text-sm font-bold">
                      <option value="mL">mL</option><option value="tablet">tablet</option><option value="kapsul">kapsul</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* MODE 2: PENGENCERAN C1V1 = C2V2 */}
            {mode === "pengenceran" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Konsentrasi Awal (C1)</label>
                    <input type="number" step="any" required placeholder="C1" value={form.c1} onChange={e => setForm({...form, c1: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Konsentrasi Target (C2)</label>
                    <input type="number" step="any" required placeholder="C2" value={form.c2} onChange={e => setForm({...form, c2: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-white text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Volume Target (V2 dalam mL)</label>
                  <input type="number" step="any" required placeholder="Contoh: 100" value={form.v2} onChange={e => setForm({...form, v2: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-white text-sm" />
                </div>
              </>
            )}

            {/* MODE 3: MOLARITAS */}
            {mode === "molaritas" && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Massa Zat Terlarut (m)</label>
                  <div className="flex gap-2">
                    <input type="number" step="any" required placeholder="Contoh: 0.5844" value={form.massaZat} onChange={e => setForm({...form, massaZat: e.target.value})} className="flex-1 bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-white text-sm" />
                    <select value={form.satuanMassa} onChange={e => setForm({...form, satuanMassa: e.target.value})} className="bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-java text-sm font-bold">
                      <option value="g">g</option><option value="mg">mg</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Massa Molekul Relatif (Mr)</label>
                  <input type="number" step="any" required placeholder="Contoh: 58.44 (NaCl)" value={form.mrZat} onChange={e => setForm({...form, mrZat: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Volume Larutan Total</label>
                  <input type="number" step="any" required placeholder="Contoh: 100 (mL)" value={form.volLarutan} onChange={e => setForm({...form, volLarutan: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-white text-sm" />
                </div>
              </>
            )}

            {/* MODE 4: FAKTOR BATCH */}
            {mode === "batch" && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Jumlah yang Ingin Dibuat (Target)</label>
                  <input type="number" step="any" required placeholder="Contoh: 100 tablet" value={form.jumlahTarget} onChange={e => setForm({...form, jumlahTarget: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Jumlah pada Formula Awal</label>
                  <input type="number" step="any" required placeholder="Contoh: 10 tablet" value={form.jumlahFormulaAwal} onChange={e => setForm({...form, jumlahFormulaAwal: e.target.value})} className="w-full bg-charcoal-900 border border-charcoal-700 p-3.5 rounded-xl text-white text-sm" />
                </div>
              </>
            )}

            <button type="submit" className="w-full bg-java text-charcoal-900 font-bold py-4 rounded-xl hover:bg-java-light transition flex items-center justify-center shadow-lg">
              <Sparkles size={18} className="mr-2" /> Hitung Perhitungan Presisi
            </button>
          </div>

          {/* Sisi Kanan: Panel Hasil */}
          <div className="bg-charcoal-900 border border-charcoal-700 rounded-2xl p-8 flex flex-col justify-between shadow-inner">
            <div>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold block mb-2">Hasil Analisis Kalkulasi</span>
              <div className="text-4xl font-mono font-extrabold text-java my-4 tracking-tight">
                {hasil !== null ? hasil : "0.0000"}
              </div>
              <p className="text-xs text-gray-400 mt-2">{detailRumus || "Pilih parameter dan masukkan angka untuk melihat hasil terverifikasi."}</p>
            </div>

            <div className="bg-charcoal-800 p-4 rounded-xl border border-charcoal-700 text-xs text-gray-400 mt-6 flex items-start space-x-2">
              <Layers size={16} className="text-java shrink-0 mt-0.5" />
              <span>Mengikuti acuan Cheat Sheet Farmasi: Selalu cek satuan, tentukan nilai diketahui, dan hitung dengan presisi klinis.</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}