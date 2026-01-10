import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins, Amiri } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pondok Pesantren Al-Imam Al-Islami | PPDB 2026/2027",
  description:
    "Pendaftaran Santri Baru Pondok Pesantren Al-Imam Al-Islami. Pendidikan berbasis Al-Qur'an dan As-Sunnah sesuai pemahaman salafus shalih.",
  keywords:
    "ponpes al-imam, pesantren sukabumi, ppdb 2026, pendaftaran santri, pesantren salafi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${poppins.variable} ${amiri.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
