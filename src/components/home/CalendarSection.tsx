import Link from "next/link";
import {
  Calendar,
  BookOpen,
  GraduationCap,
  Download,
  Info,
  Flag,
  BookText,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function CalendarSection() {
  const importantDates = [
    {
      icon: BookOpen,
      title: "Mulai Tahun Ajaran",
      date: "15 Juli 2026",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: BookText,
      title: "Munasabah Al-Qur'an",
      date: "17-20 Ramadhan 1448 H",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  const upcomingEvents = [
    {
      date: "15 Juli 2026",
      title: "Mulai Tahun Ajaran",
      icon: GraduationCap,
      color: "text-green-600",
    },
    {
      date: "22 Juli 2026",
      title: "Pengajian Umum",
      icon: BookText,
      color: "text-blue-600",
    },
    {
      date: "24 Juli 2026",
      title: "Munasabah Qur'an",
      icon: BookText,
      color: "text-purple-600",
    },
  ];

  const academicStructure = [
    {
      icon: BookOpen,
      title: "Semester 1",
      period: "Juli - Des 2026",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: BookText,
      title: "Ramadhan 1448 H",
      period: "Mar - Apr 2027",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
      iconColor: "text-amber-600",
    },
    {
      icon: BookOpen,
      title: "Semester 2",
      period: "Jan - Jun 2027",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: GraduationCap,
      title: "Wisuda",
      period: "Juni 2027",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const calendarDays = [
    // Week 1
    { day: 29, isGray: true },
    { day: 30, isGray: true },
    { day: 1, isGray: true },
    { day: 2, isGray: true },
    { day: 3, isGray: true },
    { day: 4 },
    { day: 5 },
    // Week 2
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9 },
    { day: 10 },
    { day: 11 },
    { day: 12 },
    // Week 3
    { day: 13 },
    { day: 14 },
    { day: 15, isHighlighted: true, event: "Mulai Tahun Ajaran" },
    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    // Week 4
    { day: 20 },
    { day: 21 },
    { day: 22, isSpecial: "blue" },
    { day: 23 },
    { day: 24, isSpecial: "purple" },
    { day: 25 },
    { day: 26 },
    // Week 5
    { day: 27 },
    { day: 28 },
    { day: 29 },
    { day: 30 },
    { day: 31 },
    { day: 1, isGray: true },
    { day: 2, isGray: true },
  ];

  return (
    <Section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 md:py-16">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* Left Content */}
          <div className="animate-fadeInUp">
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider shadow-sm border border-green-100">
                <Calendar className="inline w-3 h-3 mr-1 -mt-0.5" />
                KALENDER AKADEMIK 2026/2027
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Kalender Kegiatan{" "}
              <span className="text-green-600">Pesantren Al-Imam</span>
            </h2>

            <div className="space-y-3 mb-6">
              <p className="text-gray-700 text-sm leading-relaxed">
                Panduan kegiatan pembelajaran, ujian, dan acara khusus Pondok
                Pesantren Al-Imam Al-Islami selama tahun ajaran 2026/2027.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Setiap kegiatan dirancang untuk mengoptimalkan proses pendidikan
                santri secara komprehensif, mencakup akademik, tahfidz, dan
                pengembangan karakter.
              </p>
            </div>

            {/* Important Dates */}
            <div className="space-y-3 mb-8">
              {importantDates.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl border border-green-100 shadow-sm"
                >
                  <div
                    className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <item.icon className={`${item.iconColor} w-6 h-6`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-gray-700 text-sm">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button size="md" className="shadow-sm hover:shadow-md" asChild>
                <Link href="/kalender">
                  <Calendar className="w-4 h-4" />
                  <span>Lihat Kalender Lengkap</span>
                  <span>→</span>
                </Link>
              </Button>
              <Button
                size="md"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
                asChild
              >
                <Link href="/uploads/kalender-2026-2027.pdf">
                  <Download className="w-4 h-4" />
                  <span>Unduh PDF</span>
                  <Download className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Calendar */}
          <div className="animate-fadeInLeft">
            {/* Calendar Container */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Juli 2026 (CONTOH)</h3>
                    <p className="text-green-100 text-xs opacity-90">
                      Awal Tahun Ajaran 2026/2027
                    </p>
                  </div>
                  <div className="bg-white text-green-600 font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm border border-green-100">
                    <Flag className="inline w-3 h-3 mr-1 -mt-0.5" />
                    BULAN PERTAMA
                  </div>
                </div>
              </div>

              {/* Calendar Body */}
              <div className="p-4">
                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["M", "S", "S", "R", "K", "J", "S"].map((day, idx) => (
                    <div
                      key={idx}
                      className="text-center text-gray-500 font-semibold text-xs p-1"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((item, idx) => (
                    <div
                      key={idx}
                      className={`text-center text-xs p-1.5 rounded cursor-pointer transition-colors ${
                        item.isGray
                          ? "text-gray-300"
                          : item.isHighlighted
                          ? "text-white bg-green-600 font-medium relative group"
                          : item.isSpecial === "blue"
                          ? "text-white bg-blue-600 font-medium"
                          : item.isSpecial === "purple"
                          ? "text-white bg-purple-600 font-medium"
                          : "text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {item.day}
                      {item.isHighlighted && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          <GraduationCap className="inline w-3 h-3 mr-1 -mt-0.5" />
                          {item.event}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendar Footer */}
              <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-gray-600 text-xs">
                    <span className="font-medium">Kegiatan terdekat:</span>
                    <span className="text-green-600 ml-1">
                      15 Juli - Mulai Tahun Ajaran
                    </span>
                  </div>
                  <Link
                    href="/kalender?bulan=juli-2026"
                    className="text-green-600 hover:text-green-700 text-xs font-semibold inline-flex items-center gap-1"
                  >
                    <Info className="w-3 h-3" />
                    Detail →
                  </Link>
                </div>
              </div>
            </div>

            {/* Legend & Upcoming Events */}
            <div className="mt-4">
              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-green-600 rounded-sm" />
                  <span className="text-gray-700">
                    <GraduationCap className="inline w-3 h-3 mr-1 -mt-0.5" />
                    Mulai Tahun Ajaran
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-blue-600 rounded-sm" />
                  <span className="text-gray-700">
                    <BookText className="inline w-3 h-3 mr-1 -mt-0.5" />
                    Pengajian Umum
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-purple-600 rounded-sm" />
                  <span className="text-gray-700">
                    <BookText className="inline w-3 h-3 mr-1 -mt-0.5" />
                    Munasabah Qur'an
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-amber-500 rounded-sm" />
                  <span className="text-gray-700">
                    <BookOpen className="inline w-3 h-3 mr-1 -mt-0.5" />
                    Ujian Tengah Semester
                  </span>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 text-sm mb-3">
                  <Calendar className="inline w-4 h-4 text-green-600 mr-2 -mt-0.5" />
                  Agenda Mendatang
                </h4>
                <div className="space-y-2">
                  {upcomingEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-gray-700">{event.date}</span>
                      <span className={`font-medium ${event.color}`}>
                        <event.icon className="inline w-3 h-3 mr-1 -mt-0.5" />
                        {event.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Year Structure */}
        <div
          className="mt-12 animate-fadeInUp"
          style={{ animationDelay: "300ms" }}
        >
          <div className="bg-white rounded-xl border border-green-100 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-4">
              <TrendingUp className="inline w-5 h-5 text-green-600 mr-2 -mt-1" />
              Struktur Tahun Ajaran 2026/2027
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {academicStructure.map((item, idx) => (
                <div
                  key={idx}
                  className={`text-center p-4 ${item.bgColor} rounded-lg border ${item.borderColor}`}
                >
                  <div className="text-2xl mb-2">
                    <item.icon
                      className={`${item.iconColor} w-8 h-8 mx-auto`}
                    />
                  </div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-gray-600 text-sm">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
