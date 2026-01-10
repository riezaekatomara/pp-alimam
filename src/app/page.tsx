import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda",
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-islamic">
      <div className="text-center space-y-6 px-4">
        {/* Logo/Title */}
        <div className="animate-fadeInDown">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gradient-green">
            Pondok Pesantren Al-Imam
          </h1>
          <p className="text-xl md:text-2xl text-text-600 mt-4 font-sans">
            Pendaftaran Peserta Didik Baru 2025/2026
          </p>
        </div>

        {/* Arabic Text */}
        <div className="animate-fadeIn delay-200">
          <p className="arabic-text text-green-700 text-2xl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {/* CTA Button */}
        <div className="animate-fadeInUp delay-300">
          <button className="bg-gradient-green text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-green transition-all duration-300 hover:scale-105">
            Daftar Sekarang
          </button>
        </div>

        {/* Status Badge */}
        <div className="animate-fadeIn delay-500">
          <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
            <p className="text-sm text-text-700">
              🚀{" "}
              <span className="font-semibold">
                Website sedang dalam development
              </span>
            </p>
            <p className="text-xs text-text-500 mt-1">
              Next.js 14 • Tailwind v4 • TypeScript
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
