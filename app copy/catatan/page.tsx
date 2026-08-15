"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Plus, Trash2, Calendar, ShieldCheck, Sparkles, Tag } from "lucide-react";

interface CatatanItem {
  id: number;
  title: string;
  category: string;
  content: string;
  date: string;
}

export default function CatatanPage() {
  const [notes, setNotes] = useState<CatatanItem[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Farmakoterapi");
  const [content, setContent] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("bj_notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const saveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNote: CatatanItem = {
      id: Date.now(),
      title,
      category,
      content,
      date: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem("bj_notes", JSON.stringify(updatedNotes));

    // Reset Form
    setTitle("");
    setContent("");
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("bj_notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-200">
      {/* Navigasi Kembali */}
      <div className="mb-6">
        <Link href="/" className="flex items-center text-sm text-gray-400 hover:text-white transition">
          <ArrowLeft size={16} className="mr-2" /> Kembali ke Command Center
        </Link>
      </div>

      {/* Header */}
      <div className="bg-charcoal-800 border border-charcoal-700 rounded-3xl p-8 shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <FileText size={120} className="text-java" />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center">
          <FileText className="text-java mr-3" size={32} /> Clinical Case & Journal Notes
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Pusat pencatatan mandiri untuk analisis resep, studi kasus farmakoterapi, ringkasan jurnal, dan hasil praktikum farmasimu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Tambah Catatan */}
        <div className="lg:col-span-1 bg-charcoal-800 border border-charcoal-700 p-6 rounded-3xl shadow-xl h-fit">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <Plus size={18} className="mr-2 text-java" /> Buat Catatan Baru
          </h2>
          <form onSubmit={saveNote} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Judul Kasus / Topik</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Analisis Kasus Hipertensi..."
                className="w-full bg-charcoal-900 border border-charcoal-700 rounded-2xl px-4 py-3 text-white text-sm focus:border-java focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Kategori</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-charcoal-900 border border-charcoal-700 rounded-2xl px-4 py-3 text-white text-sm focus:border-java focus:outline-none transition"
              >
                <option value="Farmakoterapi">Farmakoterapi</option>
                <option value="Farmasetika">Farmasetika</option>
                <option value="Kimia Farmasi">Kimia Farmasi</option>
                <option value="Jurnal & Literatur">Jurnal & Literatur</option>
                <option value="Praktikum">Praktikum</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Isi Catatan / Pembahasan</label>
              <textarea 
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tuliskan hasil analisis, dosis, atau kesimpulan..."
                className="w-full bg-charcoal-900 border border-charcoal-700 rounded-2xl px-4 py-3 text-white text-sm focus:border-java focus:outline-none transition resize-none"
                required
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-java hover:bg-java-light text-charcoal-900 font-bold py-3.5 rounded-2xl transition text-sm shadow-lg">
              Simpan Catatan
            </button>
          </form>
        </div>

        {/* Daftar Catatan Tersimpan */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
            <span>Dokumentasi Studi Tersimpan</span>
            <span className="text-xs bg-charcoal-800 border border-charcoal-700 px-3 py-1 rounded-full text-java">
              {notes.length} Catatan
            </span>
          </h2>

          {notes.length > 0 ? (
            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="bg-charcoal-800 border border-charcoal-700 p-6 rounded-3xl shadow-xl relative group hover:border-java/50 transition">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-charcoal-900 text-java border border-charcoal-700 px-3 py-1 rounded-full mr-2">
                        {note.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center inline-flex mt-1">
                        <Calendar size={12} className="mr-1" /> {note.date}
                      </span>
                    </div>
                    <button 
                      onClick={() => deleteNote(note.id)}
                      className="text-gray-500 hover:text-red-400 transition p-2 bg-charcoal-900 border border-charcoal-700 rounded-xl"
                      title="Hapus Catatan"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{note.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap bg-charcoal-900/50 p-4 rounded-2xl border border-charcoal-700/50">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-charcoal-800 border border-charcoal-700 rounded-3xl p-12 text-center text-gray-400">
              <FileText size={48} className="mx-auto mb-3 opacity-20 text-java" />
              <p className="text-sm font-medium">Belum ada catatan studi tersimpan.</p>
              <p className="text-xs text-gray-500 mt-1">Gunakan form di samping untuk mulai mendokumentasikan kasus farmasimu.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}