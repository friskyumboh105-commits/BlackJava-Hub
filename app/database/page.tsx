"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, BookOpen, FlaskConical, ExternalLink, Activity } from "lucide-react";

export default function DatabasePage() {
  const [query, setQuery] = useState("");

  const sumberReferensi = [
    { name: "Farmakope Indonesia (Online)", url: "https://farmakope.kemkes.go.id/", icon: BookOpen },
    { name: "DrugBank (Global Profile)", url: "https://go.drugbank.com/drugs/", icon: Activity },
    { name: "PubChem (Chemical Data)", url: "https://pubchem.ncbi.nlm.nih.gov/#query=", icon: FlaskConical },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-400 hover:text-pharma flex items-center mb-4">
          ← Kembali ke Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-white mb-2">Pencari Data Farmasi</h1>
        <p className="text-gray-400">Integrasi langsung ke basis data farmasi internasional dan Farmakope Indonesia.</p>
      </div>

      {/* Main Search */}
      <div className="bg-charcoal-800 p-8 rounded-3xl border border-charcoal-700 shadow-2xl mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-4 text-gray-500" size={24} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Masukkan nama obat atau bahan kimia (contoh: Paracetamol)..."
            className="w-full bg-charcoal-900 border border-charcoal-700 rounded-2xl py-4 pl-14 pr-6 text-white text-lg focus:border-pharma outline-none transition"
          />
        </div>
      </div>

      {/* Dynamic Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sumberReferensi.map((sumber) => (
          <a 
            key={sumber.name}
            href={`${sumber.url}${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-charcoal-800 p-6 rounded-2xl border border-charcoal-700 hover:border-pharma transition group flex flex-col items-center text-center"
          >
            <sumber.icon size={32} className="text-pharma mb-4 group-hover:scale-110 transition" />
            <h3 className="font-semibold text-white mb-2">{sumber.name}</h3>
            <span className="text-xs text-pharma group-hover:underline flex items-center">
              Cari Sekarang <ExternalLink size={12} className="ml-1" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}