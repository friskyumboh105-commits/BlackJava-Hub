"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, ExternalLink, Cpu, Code, Image as ImageIcon, FileText, Mic, Globe } from "lucide-react";

export default function BabuDashboard() {
  const aiList = [
    {
      name: "ChatGPT (OpenAI)",
      category: "General & Conversational",
      desc: "Cocok untuk percintaan, brainstorming ide, ringkasan teks umum, dan tanya jawab cepat.",
      url: "https://chatgpt.com",
      icon: <Sparkles className="text-emerald-400" size={24} />,
      tag: "Multipurpose"
    },
    {
      name: "Claude AI (Anthropic)",
      category: "Writing, Logic & Coding",
      desc: "Sangat jago untuk merangkum jurnal panjang, menulis esai rapi, dan debugging kodingan kompleks.",
      url: "https://claude.ai",
      icon: <Cpu className="text-orange-400" size={24} />,
      tag: "Best for Docs"
    },
    {
      name: "Google Gemini",
      category: "Real-time & Google Ecosystem",
      desc: "Terintegrasi langsung dengan ekosistem Google, pencarian internet terkini, dan analisis gambar.",
      url: "https://gemini.google.com",
      icon: <Globe className="text-blue-400" size={24} />,
      tag: "Web Search"
    },
    {
      name: "Groq Cloud",
      category: "Lightning Fast LLM",
      desc: "Menyediakan model open-source (Llama, Mistral) dengan kecepatan proses tercepat di dunia.",
      url: "https://console.groq.com",
      icon: <ZapIcon className="text-yellow-400" size={24} />,
      tag: "Ultra Fast"
    },
    {
      name: "Perplexity AI",
      category: "AI Search & Research",
      desc: "Pengganti Google Search berbasis AI yang langsung memberikan jawaban lengkap beserta sumber/jurnal aslinya.",
      url: "https://www.perplexity.ai",
      icon: <FileText className="text-cyan-400" size={24} />,
      tag: "Research"
    },
    {
      name: "v0 by Vercel",
      category: "UI / Web Development",
      desc: "AI pembuat desain antarmuka (UI) website dan komponen React/Tailwind secara instan dari teks.",
      url: "https://v0.dev",
      icon: <Code className="text-purple-400" size={24} />,
      tag: "Frontend UI"
    },
    {
      name: "Midjourney / Bing Image",
      category: "AI Image Generation",
      desc: "Pencipta gambar visual, mockup produk, dan ilustrasi estetis beresolusi tinggi dari deskripsi teks.",
      url: "https://www.bing.com/create",
      icon: <ImageIcon className="text-pink-400" size={24} />,
      tag: "Visual Art"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-200">
      {/* Navigasi Kembali */}
      <div className="mb-6">
        <Link href="/" className="flex items-center text-sm text-gray-400 hover:text-white transition">
          <ArrowLeft size={16} className="mr-2" /> Kembali ke Command Center
        </Link>
      </div>

      {/* Header Dashboard */}
      <div className="bg-charcoal-800 border border-charcoal-700 rounded-3xl p-8 shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles size={120} className="text-java" />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-2 flex items-center">
          <span className="text-java mr-3">🚀</span> Dashboard BABU-BABU
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Base & Action Hub for Useful Universal Bots. Kumpulan jalan pintas portal AI global terbaik di dunia berdasarkan masing-masing keunggulannya, siap pakai, dan tanpa ribet bayar!
        </p>
      </div>

      {/* Grid Daftar AI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiList.map((ai, index) => (
          <a 
            key={index} 
            href={ai.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-charcoal-800 border border-charcoal-700 p-6 rounded-3xl hover:border-java transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-charcoal-900 border border-charcoal-700 rounded-2xl group-hover:scale-110 transition-transform">
                  {ai.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-charcoal-900 text-java border border-charcoal-700 px-3 py-1 rounded-full">
                  {ai.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-java transition flex items-center justify-between">
                <span>{ai.name}</span>
                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-java" />
              </h3>
              <p className="text-xs text-pharma font-medium mb-3">{ai.category}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{ai.desc}</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-charcoal-700/50 flex items-center justify-between text-xs font-bold text-gray-300 group-hover:text-java transition">
              <span>Buka Platform</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Icon helper pendukung
function ZapIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );
}