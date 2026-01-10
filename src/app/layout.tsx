import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins, Amiri } from "next/font/google";
import "./globals.css";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FONTS CONFIGURATION (Same as Blade PHP)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Plus Jakarta Sans - Main sans-serif
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

// Poppins - Display font (headings)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

// Amiri - Arabic text
const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SEO METADATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const metadata: Metadata = {
  metadataBase: new URL("https://ponpesalimam.ac.id"), // Ganti dengan domain asli
  title: {
    default: "Ponpes Al-Imam | Pendaftaran Santri Baru 2025/2026",
    template: "%s | Ponpes Al-Imam",
  },
  description:
    "Pondok Pesantren Al-Imam - Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2025/2026. Program Madrasah Aliyah, Madrasah Tsanawiyah, dan I'dad Lughowi. Mendidik generasi Qur'ani yang berakhlak mulia.",
  keywords: [
    "ponpes al-imam",
    "pondok pesantren al-imam",
    "pesantren",
    "pendaftaran santri",
    "ppdb pesantren",
    "madrasah aliyah",
    "madrasah tsanawiyah",
    "i'dad lughowi",
    "pesantren tahfidz",
    "pendidikan islam",
  ],
  authors: [{ name: "Ponpes Al-Imam" }],
  creator: "Ponpes Al-Imam",
  publisher: "Ponpes Al-Imam",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ponpesalimam.ac.id",
    siteName: "Pondok Pesantren Al-Imam",
    title: "Ponpes Al-Imam | Pendaftaran Santri Baru 2025/2026",
    description:
      "Pendaftaran Peserta Didik Baru (PPDB) Pondok Pesantren Al-Imam. Program MA, MTs, dan I'dad Lughowi. Mendidik generasi Qur'ani berakhlak mulia.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pondok Pesantren Al-Imam",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ponpes Al-Imam | Pendaftaran Santri Baru 2025/2026",
    description:
      "Pendaftaran Peserta Didik Baru (PPDB) Pondok Pesantren Al-Imam. Program MA, MTs, dan I'dad Lughowi.",
    images: ["/images/og-image.jpg"],
    creator: "@ponpesalimam", // Ganti dengan handle Twitter asli
  },
  verification: {
    google: "your-google-site-verification-code", // Nanti dari Google Search Console
  },
  alternates: {
    canonical: "https://ponpesalimam.ac.id",
  },
  category: "education",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROOT LAYOUT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${poppins.variable} ${amiri.variable}`}
    >
      <body className={plusJakartaSans.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
