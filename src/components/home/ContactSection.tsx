"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  FileSignature,
  FileText,
  School,
  HelpCircle,
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    subjek: "",
    pesan: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const validateField = (name: string, value: string) => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} wajib diisi`;
    }
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Format email tidak valid";
    }
    if (name === "telepon" && !/^[0-9+\-\s]{10,15}$/.test(value)) {
      return "Format nomor telepon tidak valid";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowSuccess(false);
    setShowError(false);

    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowError(true);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setShowSuccess(true);
      setFormData({ nama: "", email: "", telepon: "", subjek: "", pesan: "" });
      setIsSubmitting(false);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  return (
    <Section
      id="kontak"
      spacing="xl"
      className="bg-gradient-to-br from-green-50 via-emerald-50 to-white"
    >
      <Container size="lg">
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg border border-green-100">
            <Phone className="w-4 h-4" />
            KONTAK & LOKASI
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
          <span className="text-gray-900">Hubungi </span>
          <span className="block text-green-600">
            Pondok Pesantren Al-Imam Al-Islami
          </span>
        </h2>

        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-base md:text-lg">
          Kami siap membantu konsultasi pendidikan dan pendaftaran santri baru
        </p>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Alamat */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                <MapPin className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Alamat Pesantren</h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              Jl. Pelabuhan Ratu II KM 18,
              <br />
              Kp. Pupunjul, Desa Cikembar,
              <br />
              Kec. Cikembar, Kab. Sukabumi,
              <br />
              Jawa Barat 43157
            </p>
            <a
              href="https://maps.google.com/?q=Pondok+Pesantren+Al-Imam+Al-Islami"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-green-600 hover:text-green-700 text-xs font-medium"
            >
              <MapPin className="w-3 h-3 inline mr-1" />
              Lihat di Google Maps
            </a>
          </div>

          {/* Telepon */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                <Phone className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Telepon & WhatsApp</h3>
            <div className="space-y-1">
              <a
                href="tel:+6285722253236"
                className="block text-gray-600 hover:text-green-600 transition-colors"
              >
                <Phone className="w-3 h-3 inline mr-1" />
                +62 857-2225-3236
              </a>
              <a
                href="https://wa.me/6285722253236"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium border border-green-100"
              >
                <i className="fab fa-whatsapp mr-1"></i>
                Chat WhatsApp
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                <Mail className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">
              Email & Media Sosial
            </h3>
            <div className="space-y-1">
              <a
                href="mailto:alimamalislami@gmail.com"
                className="block text-gray-600 hover:text-green-600 transition-colors text-xs"
              >
                <Mail className="w-3 h-3 inline mr-1" />
                alimamalislami@gmail.com
              </a>
              <div className="flex justify-center gap-3 mt-3">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <i className="fab fa-facebook text-lg"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-pink-600 transition-colors"
                >
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <i className="fab fa-youtube text-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form & Map Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mt-4">
          {/* Contact Form */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></span>
              <Send className="w-5 h-5 text-green-600" />
              Kirim Pesan Konsultasi
            </h3>

            {/* Success Message */}
            {showSuccess && (
              <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-3 rounded-lg">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-green-800 font-medium">
                      Pesan Terkirim!
                    </p>
                    <p className="text-green-600 text-sm">
                      Tim kami akan menghubungi Anda dalam 1x24 jam.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {showError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-3 rounded-lg">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="text-red-700 text-sm">
                    Harap periksa kembali data yang Anda masukkan
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nama Anda"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-colors"
                  />
                  {errors.nama && (
                    <p className="text-red-500 text-xs mt-1">{errors.nama}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="email@contoh.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nomor Telepon *
                </label>
                <input
                  type="tel"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="08xx xxxx xxxx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-colors"
                />
                {errors.telepon && (
                  <p className="text-red-500 text-xs mt-1">{errors.telepon}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Subjek Pesan *
                </label>
                <select
                  name="subjek"
                  value={formData.subjek}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-colors bg-white"
                >
                  <option value="">Pilih subjek...</option>
                  <option value="pendaftaran">Pendaftaran Santri Baru</option>
                  <option value="informasi">Informasi Pendidikan</option>
                  <option value="kunjungan">Jadwal Kunjungan</option>
                  <option value="konsultasi">Konsultasi Pendidikan</option>
                  <option value="lainnya">Lainnya</option>
                </select>
                {errors.subjek && (
                  <p className="text-red-500 text-xs mt-1">{errors.subjek}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Pesan *
                </label>
                <textarea
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  placeholder="Tulis pesan Anda di sini..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm resize-none transition-colors"
                ></textarea>
                {errors.pesan && (
                  <p className="text-red-500 text-xs mt-1">{errors.pesan}</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>{isSubmitting ? "Mengirim..." : "Kirim Pesan"}</span>
              </button>
            </div>
          </div>

          {/* Map & Info */}
          <div className="space-y-4">
            {/* Google Maps */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.456!2d106.860!3d-6.910!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzYuMCJTIDEwNsKwNTEnMzYuMCJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Pondok Pesantren Al-Imam Al-Islami"
                ></iframe>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                  <p className="text-xs font-medium text-gray-800">
                    <MapPin className="w-3 h-3 inline mr-1 text-green-600" />
                    Sukabumi, Jawa Barat
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-3">
                    Jam Pelayanan
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                      <span className="text-gray-700 font-medium">
                        Senin - Kamis
                      </span>
                      <span className="text-gray-900 font-bold">
                        08:00 - 16:00
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                      <span className="text-gray-700 font-medium">Jum'at</span>
                      <span className="text-gray-900 font-bold">
                        08:00 - 11:30
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                      <span className="text-gray-700 font-medium">Sabtu</span>
                      <span className="text-gray-900 font-bold">
                        08:00 - 14:00
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-gray-600 text-xs flex items-center gap-1">
                        <i className="fas fa-info-circle text-green-600"></i>
                        <span>
                          Untuk kunjungan, harap konfirmasi terlebih dahulu
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                <i className="fas fa-link text-green-600 mr-2"></i>
                Tautan Cepat
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/daftar"
                  className="p-2 bg-white rounded-lg border border-green-100 hover:border-green-300 transition-colors text-center"
                >
                  <FileSignature className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <span className="text-xs font-medium text-gray-700">
                    Pendaftaran
                  </span>
                </Link>
                <Link
                  href="/brosur"
                  className="p-2 bg-white rounded-lg border border-green-100 hover:border-green-300 transition-colors text-center"
                >
                  <FileText className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <span className="text-xs font-medium text-gray-700">
                    Brosur
                  </span>
                </Link>
                <Link
                  href="/fasilitas"
                  className="p-2 bg-white rounded-lg border border-green-100 hover:border-green-300 transition-colors text-center"
                >
                  <School className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <span className="text-xs font-medium text-gray-700">
                    Fasilitas
                  </span>
                </Link>
                <Link
                  href="/faq"
                  className="p-2 bg-white rounded-lg border border-green-100 hover:border-green-300 transition-colors text-center"
                >
                  <HelpCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <span className="text-xs font-medium text-gray-700">FAQ</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
