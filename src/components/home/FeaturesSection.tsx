import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function FeaturesSection() {
  const benefits = [
    {
      icon: "fa-book-open",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      title: "Kurikulum Terpadu",
      description:
        "Kurikulum yang mengintegrasikan Diknas (K13), kepesantrenan (diniyyah), dan tahfidz Al-Qur'an untuk pendidikan yang komprehensif.",
      details: ["K13 Diknas", "Diniyyah Salaf", "Tahfidz Qur'an"],
    },
    {
      icon: "fa-award",
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      title: "Akreditasi A Nasional",
      description:
        'Terakreditasi "A" dari Badan Akreditasi Nasional untuk jenjang MTs dan MA, menjamin mutu pendidikan yang unggul.',
      details: ["MTs: Terakreditasi A", "MA: Terakreditasi A", "BAN S/M"],
    },
    {
      icon: "fa-chalkboard-teacher",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      title: "Tenaga Pengajar Berkompeten",
      description:
        "Diajar oleh ustadz/ustadzah yang kompeten, berpengalaman, dan berkomitmen pada pendidikan Islami.",
      details: ["50+ Pengajar", "Berpengalaman", "Kompetensi Teruji"],
    },
    {
      icon: "fa-kaaba",
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      title: "Program Tahfidz Qur'an",
      description:
        "Program hafalan Al-Qur'an dengan metode efektif, bimbingan khusus, dan target pencapaian yang terukur.",
      details: ["Hafalan Terprogram", "Muroja'ah Rutin", "Setoran Harian"],
    },
    {
      icon: "fa-home",
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-50 to-pink-50",
      title: "Asrama & Fasilitas Lengkap",
      description:
        "Lingkungan asrama yang nyaman, masjid, perpustakaan, laboratorium, dan sarana olahraga yang memadai.",
      details: ["Asrama Nyaman", "Masjid Besar", "Fasilitas Lengkap"],
    },
    {
      icon: "fa-globe-asia",
      gradient: "from-teal-500 to-emerald-600",
      bgGradient: "from-teal-50 to-emerald-50",
      title: "Pengembangan Bahasa",
      description:
        "Pembelajaran bahasa Arab dan Inggris intensif untuk komunikasi global dan pemahaman ilmu syar'i.",
      details: ["Bahasa Arab", "Bahasa Inggris", "Praktik Harian"],
    },
    {
      icon: "fa-futbol",
      gradient: "from-indigo-500 to-blue-600",
      bgGradient: "from-indigo-50 to-blue-50",
      title: "Ekstrakurikuler Islami",
      description:
        "Beragam kegiatan ekstrakurikuler untuk pengembangan bakat dan karakter santri secara Islami.",
      details: ["Pramuka", "Pencak Silat", "Seni Islami"],
    },
    {
      icon: "fa-chart-line",
      gradient: "from-lime-500 to-green-600",
      bgGradient: "from-lime-50 to-green-50",
      title: "Prestasi & Pengakuan",
      description:
        "Santri berprestasi di berbagai kompetisi tingkat regional dan nasional dalam bidang akademik dan non-akademik.",
      details: ["Kompetisi Regional", "Olimpiade Nasional", "Festival Islami"],
    },
  ];

  return (
    <Section
      spacing="xl"
      className="bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden"
    >
      <Container size="lg">
        {/* Badge */}
        <div className="text-center mb-6 animate-fadeInUp">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg border border-green-100">
            <i className="fas fa-trophy text-white"></i>
            <span>Keunggulan Al-Imam Al-Islami</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 animate-fadeInUp delay-100">
          Mengapa Memilih{" "}
          <span className="text-green-600">Pondok Pesantren</span>{" "}
          <span className="text-emerald-600">Al-Imam Al-Islami</span>?
        </h2>
        <p className="text-gray-600 text-center max-w-4xl mx-auto mb-12 text-base md:text-lg animate-fadeInUp delay-200">
          Pendidikan terpadu yang mengintegrasikan ilmu agama dan ilmu umum
          dengan metode pembelajaran efektif untuk membentuk generasi muslim
          yang rabbani, berilmu, dan bermanfaat
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Feature Card */}
          <div className="p-6 md:p-8 text-center bg-gradient-to-br from-green-600 to-emerald-700 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] border-0 group cursor-pointer rounded-2xl animate-fadeInUp delay-300 col-span-1 lg:col-span-3">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white/20 rounded-2xl flex items-center justify-center mb-4 lg:mb-0 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-mosque text-white text-4xl lg:text-5xl"></i>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-xl md:text-2xl mb-3 leading-tight">
                  Pendidikan Islami Berbasis Al-Qur'an & Sunnah
                </h3>
                <p className="text-green-100 text-base leading-relaxed">
                  Mengintegrasikan pendidikan agama dengan ilmu umum dalam
                  sistem pendidikan yang holistik, mengacu pada pemahaman
                  salafus shalih dengan metode pembelajaran modern dan efektif.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit Cards */}
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`p-5 md:p-6 bg-gradient-to-br ${benefit.bgGradient} shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border border-gray-100 group cursor-pointer rounded-xl animate-fadeInUp`}
              style={{ animationDelay: `${400 + idx * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}
                >
                  <i
                    className={`fas ${benefit.icon} text-white text-xl md:text-2xl`}
                  ></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 text-base md:text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    {benefit.description}
                  </p>

                  {/* Detail tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {benefit.details.map((detail, detailIdx) => (
                      <span
                        key={detailIdx}
                        className="px-2 py-1 bg-white/80 text-xs font-medium text-gray-700 rounded-full border border-gray-200"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className="mt-12 text-center animate-fadeInUp"
          style={{ animationDelay: "1300ms" }}
        >
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
              <i className="fas fa-graduation-cap text-green-600 text-3xl"></i>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                Siap Bergabung dengan Kami?
              </h3>
            </div>
            <p className="text-gray-700 mb-6 text-base md:text-lg">
              Daftarkan putra-putri Anda untuk mendapatkan pendidikan terbaik
              yang mengintegrasikan ilmu dunia dan akhirat dalam lingkungan
              Islami yang kondusif.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="shadow-xl hover:shadow-2xl" asChild>
                <Link href="/daftar">
                  <i className="fas fa-file-signature mr-2"></i>
                  <span>Daftar Sekarang</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="#kontak">
                  <i className="fas fa-phone mr-2"></i>
                  <span>Hubungi Kami</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
