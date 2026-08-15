import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlackJava - Pharmacy AI",
  description: "Personal Pharmacy Academic Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased bg-charcoal-900 text-white flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-charcoal-800 border-r border-charcoal-700 flex flex-col hidden md:flex">
          <div className="h-16 flex items-center px-6 border-b border-charcoal-700">
            <span className="font-mono font-bold text-lg tracking-widest text-white">
              BLACK<span className="text-java">JAVA</span>
            </span>
          </div>
          <div className="flex-1 p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Menu Utama</p>
            <div className="px-3 py-2 text-sm font-medium text-white bg-charcoal-700 rounded-md cursor-pointer">
              Dashboard
            </div>
          </div>
        </aside>

        {/* Konten Utama */}
        <main className="flex-1 flex flex-col h-screen">
          <header className="h-16 bg-charcoal-800 border-b border-charcoal-700 flex items-center justify-between px-8">
            <div className="text-java font-mono font-semibold tracking-wider text-sm">
              PRIVATE MODE ACTIVE
            </div>
            <div className="text-sm text-gray-400">
              Academic Command Center
            </div>
          </header>
          <div className="flex-1 overflow-auto p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}