"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Activity, Calculator, ArrowRight, FileText, Sparkles, Terminal, Shield, LogOut } from "lucide-react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Cek status login, jika belum ada sesi, arahkan ke halaman login
    const auth = localStorage.getItem("bj_auth");
    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("bj_auth");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-12 overflow-x-hidden">
      {/* Decorative Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Top Bar with System Status & Logout */}
      <div className="relative max-w-5xl mx-auto mb-8 flex justify-between items-center">
        <div className="flex items-center gap-3 text-emerald-400 font-mono text-xs tracking-[0.2em] uppercase">
          <Terminal size={16} />
          <span>System Online: BlackJava OS v4.0</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-400 bg-[#18181b] border border-[#27272a] px-4 py-2 rounded-xl transition"
        >
          <LogOut size={14} /> Keluar
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative max-w-5xl mx-auto mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            Command
          </span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            Center
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
          Sistem operasi akademik pribadi yang terintegrasi. Mengelola riset farmasi, perhitungan klinis, dan portal AI dalam satu antarmuka yang terpusat.
        </p>

        {/* Status Badge */}
        <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
          <Shield size={14} className="text-emerald-400" />
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Secure & Private Mode</span>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { href: "/modul", icon: BookOpen, title: "Modul", desc: "Materi klinis & literatur riset.", color: "emerald" },
          { href: "/database", icon: Activity, title: "Database", desc: "Farmakope & data obat global.", color: "amber" },
          { href: "/kalkulator", icon: Calculator, title: "Kalkulator", desc: "Alat hitung dosis & konversi.", color: "blue" },
          { href: "/catatan", icon: FileText, title: "Catatan Studi", desc: "Dokumentasi kasus & jurnal.", color: "violet" },
          { href: "/babu", icon: Sparkles, title: "Dashboard Babu-Babu", desc: "Portal pintas semua AI gratis.", color: "yellow" },
        ].map((item, i) => (
          <Link key={i} href={item.href} className="group relative bg-[#18181b]/50 border border-[#27272a] p-8 rounded-3xl backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-2xl flex flex-col justify-between">
            <div>
              <div className={`text-${item.color}-400 mb-6 bg-${item.color}-500/10 p-4 w-fit rounded-2xl`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white transition">{item.title}</h3>
              <p className="text-sm text-gray-400 mb-6">{item.desc}</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-300 group-hover:text-white transition">
              <span>Buka Menu</span> <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}