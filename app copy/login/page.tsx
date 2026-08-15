"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Kredensial Akses
  const ADMIN_USER = "ikyganteng";
  const ADMIN_PASS = "ikyganteng123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("bj_auth", "true");
      router.push("/"); // Masuk ke dashboard utama
    } else {
      setError("Username atau password salah. Akses ditolak.");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 text-gray-200">
      <div className="w-full max-w-sm bg-[#18181b] border border-[#27272a] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles size={100} className="text-emerald-400" />
        </div>
        
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wider">BLACKJAVA</h1>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-mono">Personal Academic Platform</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 ml-1">USERNAME</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-600" size={16} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full bg-[#09090b] border border-[#27272a] rounded-2xl px-4 py-3 pl-11 text-white text-sm focus:border-emerald-500 focus:outline-none transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 ml-1">PASSWORD</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-600" size={16} />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full bg-[#09090b] border border-[#27272a] rounded-2xl px-4 py-3 pl-11 pr-11 text-white text-sm focus:border-emerald-500 focus:outline-none transition"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-600 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-2xl transition text-sm shadow-lg mt-4"
          >
            LOGIN TO SYSTEM
          </button>
        </form>
      </div>
    </div>
  );
}