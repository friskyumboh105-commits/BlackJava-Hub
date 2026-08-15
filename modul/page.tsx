"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowLeft, CheckCircle2, Clock, Filter, Search, Sparkles, Bookmark, Award, Flame } from "lucide-react";

export default function ModulPage() {
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [pencarian, setPencarian] = useState("");
  const [hanyaBookmark, setHanyaBookmark] = useState(false);

  // Data Modul dengan status bookmark interaktif
  const [daftarModul, setDaftarModul] = useState([
    {
      id: 1,
      judul: "Farmakoterapi Penyakit Kardiovaskular & Gagal Jantung",
      kategori: "Kardiologi",
      durasi: "45 Menit",
      status: "Selesai",
      tingkat: "Lanjutan",
      isBookmarked: true,
    },
    {
      id: 2,
      judul: "Penatalaksanaan Klinis & Terapi Insulin Diabetes Mellitus Tipe 2",
      kategori: "Endokrin",
      durasi: "60 Menit",
      status: "Sedang Dipelajari",
      tingkat: "Menengah",
      isBookmarked: false,
    },
    {
      id: 3,
      judul: "Farmakokinetik Klinik & Penyesuaian Dosis Gagal Ginjal",
      kategori: "Farmakokinetik",
      durasi: "50 Menit",
      status: "Belum Dimulai",
      tingkat: "Ahli",
      isBookmarked: true,
    },
    {
      id: 4,
      judul: "Manajemen Terapi Antimikroba & Resistensi Antibiotik",
      kategori: "Infeksi",
      durasi: "75 Menit",
      status: "Belum Dimulai",
      tingkat: "Menengah",
      isBookmarked: false,
    },
    {
      id: 5,
      judul: "Validasi Metode Analisis Spektrofotometri UV-Vis & HPLC",
      kategori: "Analisis",
      durasi: "90 Menit",
      status: "Selesai",
      tingkat: "Ahli",
      isBookmarked: false,
    }
  ]);

  const kategoriList = ["Semua", "Kardiologi", "Endokrin", "Farmakokinetik", "Infeksi", "Analisis"];

  // Toggle Bookmark
  const toggleBookmark = (id: number) => {
    setDaftarModul(daftarModul.map(m => m.id === id ? { ...m, isBookmarked: !m.isBookmarked } : m));
  };

  // Filter Modul
  const modulTampil = daftarModul.filter((modul) => {
    const sesuaiKategori = filterKategori === "Semua" || modul.kategori === filterKategori;
    const sesuaiPencarian = modul.judul.toLowerCase().includes(pencarian.toLowerCase());
    const sesuaiBookmark = hanyaBookmark ? modul.isBookmarked : true;
    return sesuaiKategori && sesuaiPencarian && sesuaiBookmark;
  });

  // Hitung statistik progress
  const totalModul = daftarModul.length;
  const selesaiModul = daftarModul.filter(m => m.status === "Selesai").length;
  const persentaseProgress = Math.round((selesaiModul / totalModul) * 100);

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Tombol Kembali */}
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-java transition">
          <ArrowLeft size={16} className="mr-2" /> Kembali ke Dashboard
        </Link>
      </div>

      {/* Header Utama */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal-700 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <BookOpen className="text-java mr-3" size={32} /> Modul Pembelajaran & Literatur
          </h1>
          <p className="text-gray-400">Pusat materi klinis, farmakoterapi, dan bank riset akademik.</p>
        </div>
        <div className="bg-charcoal-800 border border-charcoal-700 px-4 py-2.5 rounded-xl text-xs text-java flex items-center space-x-2 shadow">
          <Flame size={16} className="text-amber-500 animate-bounce" /> <span>Streak Belajar Aktif</span>
        </div>
      </div>

      {/* Kotak Statistik Progress Belajar (Fitur Baru) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-charcoal-800 border border-charcoal-700 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Progress Keseluruhan</span>
            <div className="text-2xl font-bold text-white mt-1">{persentaseProgress}% <span className="text-xs text-java font-normal">Selesai</span></div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-charcoal-900 border border-charcoal-700 flex items-center justify-center text-java">
            <Award size={24} />
          </div>
        </div>

        <div className="bg-charcoal-800 border border-charcoal-700 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Modul Dikuasai</span>
            <div className="text-2xl font-bold text-white mt-1">{selesaiModul} <span className="text-xs text-gray-400 font-normal">dari {totalModul} modul</span></div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-charcoal-900 border border-charcoal-700 flex items-center justify-center text-emerald-400">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-charcoal-800 border border-charcoal-700 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Materi Tersimpan</span>
            <div className="text-2xl font-bold text-white mt-1">{daftarModul.filter(m => m.isBookmarked).length} <span className="text-xs text-gray-400 font-normal">bookmark</span></div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-charcoal-900 border border-charcoal-700 flex items-center justify-center text-amber-400">
            <Bookmark size={24} />
          </div>
        </div>
      </div>

      {/* Bar Pencarian & Filter Canggih */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-charcoal-800 p-4 rounded-2xl border border-charcoal-700 shadow-lg">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
          <input 
            type="text"
            placeholder="Cari topik farmakoterapi..."
            value={pencarian}
            onChange={(e) => setPencarian(e.target.value)}
            className="w-full bg-charcoal-900 border border-charcoal-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-java focus:outline-none transition"
          />
        </div>

        {/* Filter Kategori & Tombol Bookmark */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button
            onClick={() => setHanyaBookmark(!hanyaBookmark)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${hanyaBookmark ? "bg-amber-500 text-charcoal-900 shadow" : "bg-charcoal-900 text-gray-300 hover:text-white border border-charcoal-700"}`}
          >
            <Bookmark size={14} /> <span>Disimpan</span>
          </button>
          
          <div className="h-6 w-[1px] bg-charcoal-700 mx-1"></div>

          {kategoriList.map((kat) => (
            <button
              key={kat}
              onClick={() => setFilterKategori(kat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${filterKategori === kat ? "bg-java text-charcoal-900 shadow" : "bg-charcoal-900 text-gray-300 hover:text-white border border-charcoal-700"}`}
            >
              {kat}
            </button>
          ))}
        </div>
      </div>

      {/* Daftar Kartu Modul */}
      <div className="space-y-4">
        {modulTampil.length > 0 ? (
          modulTampil.map((modul) => (
            <div 
              key={modul.id}
              className="bg-charcoal-800 border border-charcoal-700 rounded-2xl p-6 hover:border-java transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl group relative"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xs font-bold text-java bg-charcoal-900 px-3 py-1 rounded-full uppercase tracking-wider border border-charcoal-700">
                    {modul.kategori}
                  </span>
                  <span className="text-xs text-gray-400 bg-charcoal-900 px-2.5 py-1 rounded-full border border-charcoal-700">
                    {modul.tingkat}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white group-hover:text-java transition mt-1 mb-2">
                  {modul.judul}
                </h3>

                <div className="flex items-center text-xs text-gray-400 space-x-6">
                  <span className="flex items-center"><Clock size={14} className="mr-1.5 text-gray-500" /> {modul.durasi}</span>
                  <span className={`flex items-center font-medium ${modul.status === 'Selesai' ? 'text-emerald-400' : modul.status === 'Sedang Dipelajari' ? 'text-java' : 'text-gray-400'}`}>
                    <CheckCircle2 size={14} className="mr-1.5" /> {modul.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                {/* Tombol Bookmark */}
                <button 
                  onClick={() => toggleBookmark(modul.id)}
                  className={`p-3 rounded-xl border transition ${modul.isBookmarked ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-charcoal-900 border-charcoal-700 text-gray-400 hover:text-white'}`}
                  title="Simpan Materi"
                >
                  <Bookmark size={18} fill={modul.isBookmarked ? "currentColor" : "none"} />
                </button>

                <button className="flex-1 md:flex-none bg-charcoal-900 group-hover:bg-java group-hover:text-charcoal-900 text-white text-xs font-bold px-6 py-3 rounded-xl transition border border-charcoal-700 group-hover:border-java shadow">
                  Baca Materi
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-charcoal-800 rounded-2xl border border-charcoal-700">
            <p className="text-gray-400 text-sm">Tidak ada modul yang cocok dengan filter atau pencarian.</p>
          </div>
        )}
      </div>
    </div>
  );
}