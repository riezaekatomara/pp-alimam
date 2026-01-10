import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* TODO: Sections lainnya akan ditambah di sini */}
      </main>
      <Footer />
    </>
  );
}
