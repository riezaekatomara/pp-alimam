"use client";

import { useState, useEffect } from "react";
import {
  User,
  Users,
  MapPin,
  School,
  Heart,
  Phone,
  Mail,
  Save,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import WilayahSelector from "@/components/form/WilayahSelector";

// ============================================
// TYPES
// ============================================

interface DataDiriSantri {
  nik: string;
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  agama: string;
  kewarganegaraan: string;
  anak_ke: number;
  jumlah_saudara: number;
  golongan_darah: string;
  tinggi_badan: number;
  berat_badan: number;
  riwayat_penyakit: string;
  // Alamat
  alamat_lengkap: string;
  rt: string;
  rw: string;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kode_pos: string;
  // Kontak
  no_hp: string;
  email: string;
  // Sekolah asal
  asal_sekolah: string;
  nisn: string;
  alamat_sekolah: string;
  tahun_lulus: string;
}

interface DataOrangTua {
  nama_lengkap: string;
  nik: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  agama: string;
  pendidikan_terakhir: string;
  pekerjaan: string;
  penghasilan: string;
  no_hp: string;
  email: string;
  alamat: string;
  status_hidup: string;
}

interface DataWali {
  hubungan: string;
  nama_lengkap: string;
  nik: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  agama: string;
  pendidikan_terakhir: string;
  pekerjaan: string;
  penghasilan: string;
  no_hp: string;
  email: string;
  alamat: string;
  rt: string;
  rw: string;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kode_pos: string;
}

interface FormData {
  santri: DataDiriSantri;
  ayah: DataOrangTua;
  ibu: DataOrangTua;
  wali: DataWali;
  wali_sama_dengan_ortu: boolean;
}

// ============================================
// CONSTANTS
// ============================================

const AGAMA_OPTIONS = [
  "Islam",
  "Kristen Protestan",
  "Kristen Katolik",
  "Hindu",
  "Buddha",
  "Konghucu",
];

const GOLONGAN_DARAH_OPTIONS = ["A", "B", "AB", "O", "Tidak Tahu"];

const PENDIDIKAN_OPTIONS = [
  "Tidak Sekolah",
  "SD/MI Sederajat",
  "SMP/MTs Sederajat",
  "SMA/MA/SMK Sederajat",
  "D1",
  "D2",
  "D3",
  "D4/S1",
  "S2",
  "S3",
];

const PEKERJAAN_OPTIONS = [
  "PNS/ASN",
  "TNI/Polri",
  "Karyawan Swasta",
  "Wiraswasta",
  "Petani",
  "Pedagang",
  "Buruh",
  "Guru/Dosen",
  "Dokter",
  "Tidak Bekerja",
  "Pensiunan",
  "Lainnya",
];

const PENGHASILAN_OPTIONS = [
  "< Rp 1.000.000",
  "Rp 1.000.000 - Rp 2.500.000",
  "Rp 2.500.000 - Rp 5.000.000",
  "Rp 5.000.000 - Rp 10.000.000",
  "> Rp 10.000.000",
];

const INITIAL_SANTRI: DataDiriSantri = {
  nik: "",
  nama_lengkap: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  jenis_kelamin: "",
  agama: "Islam",
  kewarganegaraan: "Indonesia",
  anak_ke: 1,
  jumlah_saudara: 1,
  golongan_darah: "",
  tinggi_badan: 0,
  berat_badan: 0,
  riwayat_penyakit: "",
  alamat_lengkap: "",
  rt: "",
  rw: "",
  kelurahan: "",
  kecamatan: "",
  kabupaten: "",
  provinsi: "",
  kode_pos: "",
  no_hp: "",
  email: "",
  asal_sekolah: "",
  nisn: "",
  alamat_sekolah: "",
  tahun_lulus: "",
};

const INITIAL_ORTU: DataOrangTua = {
  nama_lengkap: "",
  nik: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  agama: "Islam",
  pendidikan_terakhir: "",
  pekerjaan: "",
  penghasilan: "",
  no_hp: "",
  email: "",
  alamat: "",
  status_hidup: "Masih Hidup",
};

const INITIAL_WALI: DataWali = {
  hubungan: "",
  nama_lengkap: "",
  nik: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  agama: "Islam",
  pendidikan_terakhir: "",
  pekerjaan: "",
  penghasilan: "",
  no_hp: "",
  email: "",
  alamat: "",
  rt: "",
  rw: "",
  kelurahan: "",
  kecamatan: "",
  kabupaten: "",
  provinsi: "",
  kode_pos: "",
};

// ============================================
// COMPONENTS
// ============================================

interface SectionHeaderProps {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  isCompleted?: boolean;
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  isOpen,
  onToggle,
  isCompleted,
}: SectionHeaderProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-amber-50 rounded-xl border-2 border-teal-100 hover:border-teal-300 transition-all"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${isCompleted
            ? "bg-green-500 text-white"
            : "bg-teal-500 text-white"
            }`}
        >
          {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
        </div>
        <div className="text-left">
          <h3 className="font-bold text-stone-900">{title}</h3>
          {subtitle && <p className="text-sm text-stone-500">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isCompleted && (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
            Lengkap
          </span>
        )}
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-stone-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-stone-400" />
        )}
      </div>
    </button>
  );
}

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: string[];
  maxLength?: number;
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  disabled,
  options,
  maxLength,
}: InputFieldProps) {
  if (options) {
    return (
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full px-4 py-2.5 border-2 border-stone-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors disabled:bg-stone-100 disabled:text-stone-500"
        >
          <option value="" disabled={value !== ""}>Pilih {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={3}
          className="w-full px-4 py-2.5 border-2 border-stone-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none transition-colors disabled:bg-stone-100"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className="w-full px-4 py-2.5 border-2 border-stone-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors disabled:bg-stone-100 disabled:text-stone-500"
      />
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function DataLengkapForm() {
  const [formData, setFormData] = useState<FormData>({
    santri: INITIAL_SANTRI,
    ayah: INITIAL_ORTU,
    ibu: INITIAL_ORTU,
    wali: INITIAL_WALI,
    wali_sama_dengan_ortu: true,
  });

  const [openSections, setOpenSections] = useState({
    santri: true,
    ayah: false,
    ibu: false,
    wali: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/pendaftar/data-lengkap");
        const result = await response.json();

        if (result.success && result.data) {
          setFormData((prev) => ({
            ...prev,
            santri: { ...prev.santri, ...result.data.santri },
            ayah: { ...prev.ayah, ...result.data.ayah },
            ibu: { ...prev.ibu, ...result.data.ibu },
            wali: {
              ...prev.wali,
              ...result.data.wali,
              alamat: result.data.wali.alamat_wali || result.data.wali.alamat || "",
              rt: result.data.wali.rt_wali || "",
              rw: result.data.wali.rw_wali || "",
              kelurahan: result.data.wali.kelurahan_wali || "",
              kecamatan: result.data.wali.kecamatan_wali || "",
              kabupaten: result.data.wali.kabupaten_wali || "",
              provinsi: result.data.wali.provinsi_wali || "",
              kode_pos: result.data.wali.kode_pos_wali || "",
            },
            wali_sama_dengan_ortu: result.data.wali_sama_dengan_ortu ?? true,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateSantri = (field: keyof DataDiriSantri, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      santri: { ...prev.santri, [field]: value },
    }));
  };

  const updateAyah = (field: keyof DataOrangTua, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ayah: { ...prev.ayah, [field]: value },
    }));
  };

  const updateIbu = (field: keyof DataOrangTua, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ibu: { ...prev.ibu, [field]: value },
    }));
  };

  const updateWali = (field: keyof DataWali, value: string) => {
    setFormData((prev) => ({
      ...prev,
      wali: { ...prev.wali, [field]: value },
    }));
  };

  const handleSantriAddressChange = (val: any) => {
    setFormData((prev) => ({
      ...prev,
      santri: {
        ...prev.santri,
        provinsi: val.provinsi,
        kabupaten: val.kabupaten,
        kecamatan: val.kecamatan,
        kelurahan: val.kelurahan,
        kode_pos: val.kode_pos,
      },
    }));
  };

  const handleWaliAddressChange = (val: any) => {
    setFormData((prev) => ({
      ...prev,
      wali: {
        ...prev.wali,
        provinsi: val.provinsi,
        kabupaten: val.kabupaten,
        kecamatan: val.kecamatan,
        kelurahan: val.kelurahan,
        kode_pos: val.kode_pos,
      },
    }));
  };

  // Check if both parents are deceased - wali becomes required
  const bothParentsDeceased =
    formData.ayah.status_hidup === "Sudah Meninggal" &&
    formData.ibu.status_hidup === "Sudah Meninggal";

  // Auto-set wali_sama_dengan_ortu to false when both parents are deceased
  useEffect(() => {
    if (bothParentsDeceased && formData.wali_sama_dengan_ortu) {
      setFormData((prev) => ({
        ...prev,
        wali_sama_dengan_ortu: false,
      }));
      // Auto-open wali section
      setOpenSections((prev) => ({ ...prev, wali: true }));
    }
  }, [bothParentsDeceased, formData.wali_sama_dengan_ortu]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await fetch("/api/pendaftar/data-lengkap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Gagal menyimpan data");
      }

      showToast("success", "Data berhasil disimpan!");
    } catch (error: any) {
      showToast("error", error.message || "Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  // Check section completion
  const isSantriComplete =
    formData.santri.nama_lengkap &&
    formData.santri.tempat_lahir &&
    formData.santri.tanggal_lahir &&
    formData.santri.alamat_lengkap;

  const isAyahComplete =
    formData.ayah.nama_lengkap && formData.ayah.pekerjaan;

  const isIbuComplete =
    formData.ibu.nama_lengkap && formData.ibu.pekerjaan;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin" />
        <p className="text-stone-600">Memuat data...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 ${toast.type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
            }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-bold">
              Petunjuk Pengisian Data
            </p>
            <ul className="text-sm text-amber-700 mt-1 space-y-1">
              <li>
                &bull; Isi data dengan lengkap dan benar sesuai dokumen resmi
              </li>
              <li>&bull; Data yang bertanda (*) wajib diisi</li>
              <li>
                &bull; Pastikan nomor telepon dan email aktif untuk komunikasi
              </li>
              <li>
                &bull; Klik tombol "Simpan Data" setelah selesai mengisi
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section: Data Diri Santri */}
      <div className="space-y-4">
        <SectionHeader
          icon={User}
          title="Data Diri Calon Santri"
          subtitle="Informasi pribadi calon santri/santriwati"
          isOpen={openSections.santri}
          onToggle={() => toggleSection("santri")}
          isCompleted={isSantriComplete}
        />

        {openSections.santri && (
          <div className="bg-white rounded-xl border-2 border-stone-200 p-6 space-y-6">
            {/* Identitas */}
            <div>
              <h4 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-teal-500 text-white rounded text-xs flex items-center justify-center">
                  1
                </span>
                Identitas Diri
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField
                  label="NIK"
                  name="nik"
                  value={formData.santri.nik}
                  onChange={(v) => updateSantri("nik", v)}
                  placeholder="16 digit NIK"
                  maxLength={16}
                  required
                />
                <InputField
                  label="Nama Lengkap"
                  name="nama_lengkap"
                  value={formData.santri.nama_lengkap}
                  onChange={(v) => updateSantri("nama_lengkap", v)}
                  placeholder="Sesuai akta kelahiran"
                  required
                />
                <InputField
                  label="Tempat Lahir"
                  name="tempat_lahir"
                  value={formData.santri.tempat_lahir}
                  onChange={(v) => updateSantri("tempat_lahir", v)}
                  placeholder="Kota/Kabupaten"
                  required
                />
                <InputField
                  label="Tanggal Lahir"
                  name="tanggal_lahir"
                  value={formData.santri.tanggal_lahir}
                  onChange={(v) => updateSantri("tanggal_lahir", v)}
                  type="date"
                  required
                />
                <InputField
                  label="Jenis Kelamin"
                  name="jenis_kelamin"
                  value={formData.santri.jenis_kelamin}
                  onChange={(v) => updateSantri("jenis_kelamin", v)}
                  options={["Laki-laki", "Perempuan"]}
                  required
                />
                <InputField
                  label="Agama"
                  name="agama"
                  value={formData.santri.agama}
                  onChange={(v) => updateSantri("agama", v)}
                  options={AGAMA_OPTIONS}
                  required
                />
                <InputField
                  label="Kewarganegaraan"
                  name="kewarganegaraan"
                  value={formData.santri.kewarganegaraan}
                  onChange={(v) => updateSantri("kewarganegaraan", v)}
                  placeholder="Indonesia"
                  required
                />
                <InputField
                  label="Anak Ke"
                  name="anak_ke"
                  value={formData.santri.anak_ke}
                  onChange={(v) => updateSantri("anak_ke", parseInt(v) || 1)}
                  type="number"
                />
                <InputField
                  label="Jumlah Saudara"
                  name="jumlah_saudara"
                  value={formData.santri.jumlah_saudara}
                  onChange={(v) =>
                    updateSantri("jumlah_saudara", parseInt(v) || 1)
                  }
                  type="number"
                />
              </div>
            </div>

            {/* Data Fisik */}
            <div>
              <h4 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-teal-500 text-white rounded text-xs flex items-center justify-center">
                  2
                </span>
                Data Fisik & Kesehatan
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <InputField
                  label="Golongan Darah"
                  name="golongan_darah"
                  value={formData.santri.golongan_darah}
                  onChange={(v) => updateSantri("golongan_darah", v)}
                  options={GOLONGAN_DARAH_OPTIONS}
                />
                <InputField
                  label="Tinggi Badan (cm)"
                  name="tinggi_badan"
                  value={formData.santri.tinggi_badan || ""}
                  onChange={(v) =>
                    updateSantri("tinggi_badan", parseInt(v) || 0)
                  }
                  type="number"
                  placeholder="150"
                />
                <InputField
                  label="Berat Badan (kg)"
                  name="berat_badan"
                  value={formData.santri.berat_badan || ""}
                  onChange={(v) =>
                    updateSantri("berat_badan", parseInt(v) || 0)
                  }
                  type="number"
                  placeholder="45"
                />
                <div className="md:col-span-2 lg:col-span-1">
                  <InputField
                    label="Riwayat Penyakit"
                    name="riwayat_penyakit"
                    value={formData.santri.riwayat_penyakit}
                    onChange={(v) => updateSantri("riwayat_penyakit", v)}
                    placeholder="Kosongkan jika tidak ada"
                  />
                </div>
              </div>
            </div>

            {/* Alamat */}
            <div>
              <h4 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-teal-500 text-white rounded text-xs flex items-center justify-center">
                  3
                </span>
                Alamat Tempat Tinggal
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <InputField
                    label="Alamat Lengkap"
                    name="alamat_lengkap"
                    value={formData.santri.alamat_lengkap}
                    onChange={(v) => updateSantri("alamat_lengkap", v)}
                    type="textarea"
                    placeholder="Jalan, nomor rumah, nama perumahan/kampung"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="RT"
                    name="rt"
                    value={formData.santri.rt}
                    onChange={(v) => updateSantri("rt", v)}
                    placeholder="001"
                    maxLength={3}
                  />
                  <InputField
                    label="RW"
                    name="rw"
                    value={formData.santri.rw}
                    onChange={(v) => updateSantri("rw", v)}
                    placeholder="002"
                    maxLength={3}
                  />
                </div>

                <div className="md:col-span-2">
                  <WilayahSelector
                    value={{
                      provinsi: formData.santri.provinsi,
                      kabupaten: formData.santri.kabupaten,
                      kecamatan: formData.santri.kecamatan,
                      kelurahan: formData.santri.kelurahan,
                      kode_pos: formData.santri.kode_pos,
                    }}
                    onChange={handleSantriAddressChange}
                  />
                </div>
              </div>
            </div>

            {/* Kontak */}
            <div>
              <h4 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-teal-500 text-white rounded text-xs flex items-center justify-center">
                  4
                </span>
                Kontak
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Nomor HP/WhatsApp"
                  name="no_hp"
                  value={formData.santri.no_hp}
                  onChange={(v) => updateSantri("no_hp", v)}
                  placeholder="08xxxxxxxxxx"
                  required
                />
                <InputField
                  label="Email"
                  name="email"
                  value={formData.santri.email}
                  onChange={(v) => updateSantri("email", v)}
                  type="email"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Sekolah Asal */}
            <div>
              <h4 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-teal-500 text-white rounded text-xs flex items-center justify-center">
                  5
                </span>
                Asal Sekolah
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Nama Sekolah Asal"
                  name="asal_sekolah"
                  value={formData.santri.asal_sekolah}
                  onChange={(v) => updateSantri("asal_sekolah", v)}
                  placeholder="SDN/MI/SMP/MTs ..."
                  required
                />
                <InputField
                  label="NISN"
                  name="nisn"
                  value={formData.santri.nisn}
                  onChange={(v) => updateSantri("nisn", v)}
                  placeholder="10 digit NISN"
                  maxLength={10}
                />
                <div className="md:col-span-2">
                  <InputField
                    label="Alamat Sekolah"
                    name="alamat_sekolah"
                    value={formData.santri.alamat_sekolah}
                    onChange={(v) => updateSantri("alamat_sekolah", v)}
                    placeholder="Alamat lengkap sekolah asal"
                  />
                </div>
                <InputField
                  label="Tahun Lulus"
                  name="tahun_lulus"
                  value={formData.santri.tahun_lulus}
                  onChange={(v) => updateSantri("tahun_lulus", v)}
                  placeholder="2026"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section: Data Ayah */}
      <div className="space-y-4">
        <SectionHeader
          icon={Users}
          title="Data Ayah Kandung"
          subtitle="Informasi orang tua (ayah)"
          isOpen={openSections.ayah}
          onToggle={() => toggleSection("ayah")}
          isCompleted={isAyahComplete}
        />

        {openSections.ayah && (
          <div className="bg-white rounded-xl border-2 border-stone-200 p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                label="Nama Lengkap Ayah"
                name="nama_lengkap_ayah"
                value={formData.ayah.nama_lengkap}
                onChange={(v) => updateAyah("nama_lengkap", v)}
                placeholder="Sesuai KTP"
                required
              />
              <InputField
                label="NIK Ayah"
                name="nik_ayah"
                value={formData.ayah.nik}
                onChange={(v) => updateAyah("nik", v)}
                placeholder="16 digit NIK"
                maxLength={16}
                disabled={formData.ayah.status_hidup === "Sudah Meninggal"}
              />
              <InputField
                label="Status"
                name="status_ayah"
                value={formData.ayah.status_hidup}
                onChange={(v) => updateAyah("status_hidup", v)}
                options={["Masih Hidup", "Sudah Meninggal"]}
                required
              />
              <InputField
                label="Tempat Lahir"
                name="tempat_lahir_ayah"
                value={formData.ayah.tempat_lahir}
                onChange={(v) => updateAyah("tempat_lahir", v)}
                placeholder="Kota/Kabupaten"
              />
              <InputField
                label="Tanggal Lahir"
                name="tanggal_lahir_ayah"
                value={formData.ayah.tanggal_lahir}
                onChange={(v) => updateAyah("tanggal_lahir", v)}
                type="date"
              />
              <InputField
                label="Agama"
                name="agama_ayah"
                value={formData.ayah.agama}
                onChange={(v) => updateAyah("agama", v)}
                options={AGAMA_OPTIONS}
              />
              <InputField
                label="Pendidikan Terakhir"
                name="pendidikan_ayah"
                value={formData.ayah.pendidikan_terakhir}
                onChange={(v) => updateAyah("pendidikan_terakhir", v)}
                options={PENDIDIKAN_OPTIONS}
                required
              />
              <InputField
                label="Pekerjaan"
                name="pekerjaan_ayah"
                value={formData.ayah.pekerjaan}
                onChange={(v) => updateAyah("pekerjaan", v)}
                options={PEKERJAAN_OPTIONS}
                required={formData.ayah.status_hidup !== "Sudah Meninggal"}
                disabled={formData.ayah.status_hidup === "Sudah Meninggal"}
              />
              <InputField
                label="Penghasilan/Bulan"
                name="penghasilan_ayah"
                value={formData.ayah.penghasilan}
                onChange={(v) => updateAyah("penghasilan", v)}
                options={PENGHASILAN_OPTIONS}
                required={formData.ayah.status_hidup !== "Sudah Meninggal"}
                disabled={formData.ayah.status_hidup === "Sudah Meninggal"}
              />
              <InputField
                label="No HP Ayah"
                name="no_hp_ayah"
                value={formData.ayah.no_hp}
                onChange={(v) => updateAyah("no_hp", v)}
                placeholder="08xxxxxxxxxx"
                required={formData.ayah.status_hidup !== "Sudah Meninggal"}
                disabled={formData.ayah.status_hidup === "Sudah Meninggal"}
              />
              <InputField
                label="Email Ayah"
                name="email_ayah"
                value={formData.ayah.email}
                onChange={(v) => updateAyah("email", v)}
                type="email"
                placeholder="email@example.com"
                disabled={formData.ayah.status_hidup === "Sudah Meninggal"}
              />
            </div>
          </div>
        )}
      </div>

      {/* Section: Data Ibu */}
      <div className="space-y-4">
        <SectionHeader
          icon={Heart}
          title="Data Ibu Kandung"
          subtitle="Informasi orang tua (ibu)"
          isOpen={openSections.ibu}
          onToggle={() => toggleSection("ibu")}
          isCompleted={isIbuComplete}
        />

        {openSections.ibu && (
          <div className="bg-white rounded-xl border-2 border-stone-200 p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                label="Nama Lengkap Ibu"
                name="nama_lengkap_ibu"
                value={formData.ibu.nama_lengkap}
                onChange={(v) => updateIbu("nama_lengkap", v)}
                placeholder="Sesuai KTP"
                required
              />
              <InputField
                label="NIK Ibu"
                name="nik_ibu"
                value={formData.ibu.nik}
                onChange={(v) => updateIbu("nik", v)}
                placeholder="16 digit NIK"
                maxLength={16}
                disabled={formData.ibu.status_hidup === "Sudah Meninggal"}
              />
              <InputField
                label="Status"
                name="status_ibu"
                value={formData.ibu.status_hidup}
                onChange={(v) => updateIbu("status_hidup", v)}
                options={["Masih Hidup", "Sudah Meninggal"]}
                required
              />
              <InputField
                label="Tempat Lahir"
                name="tempat_lahir_ibu"
                value={formData.ibu.tempat_lahir}
                onChange={(v) => updateIbu("tempat_lahir", v)}
                placeholder="Kota/Kabupaten"
              />
              <InputField
                label="Tanggal Lahir"
                name="tanggal_lahir_ibu"
                value={formData.ibu.tanggal_lahir}
                onChange={(v) => updateIbu("tanggal_lahir", v)}
                type="date"
              />
              <InputField
                label="Agama"
                name="agama_ibu"
                value={formData.ibu.agama}
                onChange={(v) => updateIbu("agama", v)}
                options={AGAMA_OPTIONS}
              />
              <InputField
                label="Pendidikan Terakhir"
                name="pendidikan_ibu"
                value={formData.ibu.pendidikan_terakhir}
                onChange={(v) => updateIbu("pendidikan_terakhir", v)}
                options={PENDIDIKAN_OPTIONS}
                required
              />
              <InputField
                label="Pekerjaan"
                name="pekerjaan_ibu"
                value={formData.ibu.pekerjaan}
                onChange={(v) => updateIbu("pekerjaan", v)}
                options={PEKERJAAN_OPTIONS}
                required={formData.ibu.status_hidup !== "Sudah Meninggal"}
                disabled={formData.ibu.status_hidup === "Sudah Meninggal"}
              />
              <InputField
                label="Penghasilan/Bulan"
                name="penghasilan_ibu"
                value={formData.ibu.penghasilan}
                onChange={(v) => updateIbu("penghasilan", v)}
                options={PENGHASILAN_OPTIONS}
                disabled={formData.ibu.status_hidup === "Sudah Meninggal"}
              />
              <InputField
                label="No HP Ibu"
                name="no_hp_ibu"
                value={formData.ibu.no_hp}
                onChange={(v) => updateIbu("no_hp", v)}
                placeholder="08xxxxxxxxxx"
                required={formData.ibu.status_hidup !== "Sudah Meninggal"}
                disabled={formData.ibu.status_hidup === "Sudah Meninggal"}
              />
              <InputField
                label="Email Ibu"
                name="email_ibu"
                value={formData.ibu.email}
                onChange={(v) => updateIbu("email", v)}
                type="email"
                placeholder="email@example.com"
                disabled={formData.ibu.status_hidup === "Sudah Meninggal"}
              />
            </div>
          </div>
        )}
      </div>

      {/* Section: Data Wali */}
      <div className="space-y-4">
        <SectionHeader
          icon={Users}
          title={bothParentsDeceased ? "Data Wali (WAJIB)" : "Data Wali (Opsional)"}
          subtitle={bothParentsDeceased
            ? "Wajib diisi karena kedua orang tua sudah meninggal"
            : "Isi jika wali berbeda dengan orang tua kandung"}
          isOpen={openSections.wali}
          onToggle={() => toggleSection("wali")}
        />

        {openSections.wali && (
          <div className="bg-white rounded-xl border-2 border-stone-200 p-6 space-y-4">
            {/* Show warning if both parents deceased */}
            {bothParentsDeceased && (
              <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-300 rounded-lg mb-4">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  <strong>Perhatian:</strong> Karena kedua orang tua sudah meninggal, data wali wajib diisi lengkap.
                </p>
              </div>
            )}

            {/* Only show checkbox if both parents are NOT deceased */}
            {!bothParentsDeceased && (
              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                <input
                  type="checkbox"
                  id="wali_sama"
                  checked={formData.wali_sama_dengan_ortu}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      wali_sama_dengan_ortu: e.target.checked,
                    }))
                  }
                  className="w-5 h-5 text-teal-600 rounded"
                />
                <label htmlFor="wali_sama" className="text-sm text-blue-800">
                  Wali sama dengan orang tua (Ayah/Ibu)
                </label>
              </div>
            )}

            {/* Show wali form if not same as parents OR if both parents deceased */}
            {(!formData.wali_sama_dengan_ortu || bothParentsDeceased) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField
                  label="Hubungan dengan Santri"
                  name="hubungan_wali"
                  value={formData.wali.hubungan}
                  onChange={(v) => updateWali("hubungan", v)}
                  options={[
                    "Kakek",
                    "Nenek",
                    "Paman",
                    "Bibi",
                    "Kakak",
                    "Lainnya",
                  ]}
                  required
                />
                <InputField
                  label="Nama Lengkap Wali"
                  name="nama_lengkap_wali"
                  value={formData.wali.nama_lengkap}
                  onChange={(v) => updateWali("nama_lengkap", v)}
                  placeholder="Sesuai KTP"
                  required
                />
                <InputField
                  label="NIK Wali"
                  name="nik_wali"
                  value={formData.wali.nik}
                  onChange={(v) => updateWali("nik", v)}
                  placeholder="16 digit NIK"
                  maxLength={16}
                  required={bothParentsDeceased}
                />
                {/* Additional fields when both parents deceased */}
                {bothParentsDeceased && (
                  <>
                    <InputField
                      label="Tempat Lahir"
                      name="tempat_lahir_wali"
                      value={formData.wali.tempat_lahir}
                      onChange={(v) => updateWali("tempat_lahir", v)}
                      placeholder="Kota/Kabupaten"
                    />
                    <InputField
                      label="Tanggal Lahir"
                      name="tanggal_lahir_wali"
                      value={formData.wali.tanggal_lahir}
                      onChange={(v) => updateWali("tanggal_lahir", v)}
                      type="date"
                    />
                    <InputField
                      label="Agama"
                      name="agama_wali"
                      value={formData.wali.agama}
                      onChange={(v) => updateWali("agama", v)}
                      options={AGAMA_OPTIONS}
                    />
                    <InputField
                      label="Pendidikan Terakhir"
                      name="pendidikan_wali"
                      value={formData.wali.pendidikan_terakhir}
                      onChange={(v) => updateWali("pendidikan_terakhir", v)}
                      options={PENDIDIKAN_OPTIONS}
                      required
                    />
                  </>
                )}
                <InputField
                  label="Pekerjaan Wali"
                  name="pekerjaan_wali"
                  value={formData.wali.pekerjaan}
                  onChange={(v) => updateWali("pekerjaan", v)}
                  options={PEKERJAAN_OPTIONS}
                  required={bothParentsDeceased}
                />
                {bothParentsDeceased && (
                  <InputField
                    label="Penghasilan/Bulan"
                    name="penghasilan_wali"
                    value={formData.wali.penghasilan}
                    onChange={(v) => updateWali("penghasilan", v)}
                    options={PENGHASILAN_OPTIONS}
                    required
                  />
                )}
                <InputField
                  label="No HP Wali"
                  name="no_hp_wali"
                  value={formData.wali.no_hp}
                  onChange={(v) => updateWali("no_hp", v)}
                  placeholder="08xxxxxxxxxx"
                  required
                />
                {bothParentsDeceased && (
                  <InputField
                    label="Email Wali"
                    name="email_wali"
                    value={formData.wali.email}
                    onChange={(v) => updateWali("email", v)}
                    type="email"
                    placeholder="email@example.com"
                  />
                )}
                {/* Alamat Wali - Hanya muncul jika kedua orang tua meninggal */}
                {bothParentsDeceased && (
                  <>
                    <div className="md:col-span-2 lg:col-span-3 border-t border-stone-200 pt-4 mt-2">
                      <h5 className="font-bold text-stone-700 mb-2">Alamat Wali</h5>
                    </div>

                    <div className="md:col-span-2 lg:col-span-3">
                      <InputField
                        label="Alamat Lengkap"
                        name="alamat_wali"
                        value={formData.wali.alamat}
                        onChange={(v) => updateWali("alamat", v)}
                        type="textarea"
                        placeholder="Jalan, nomor rumah, nama perumahan/kampung"
                        required={bothParentsDeceased}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="RT"
                        name="rt_wali"
                        value={formData.wali.rt}
                        onChange={(v) => updateWali("rt", v)}
                        placeholder="001"
                        maxLength={3}
                      />
                      <InputField
                        label="RW"
                        name="rw_wali"
                        value={formData.wali.rw}
                        onChange={(v) => updateWali("rw", v)}
                        placeholder="002"
                        maxLength={3}
                      />
                    </div>

                    <div className="md:col-span-2 lg:col-span-3">
                      <WilayahSelector
                        value={{
                          provinsi: formData.wali.provinsi,
                          kabupaten: formData.wali.kabupaten,
                          kecamatan: formData.wali.kecamatan,
                          kelurahan: formData.wali.kelurahan,
                          kode_pos: formData.wali.kode_pos,
                        }}
                        onChange={handleWaliAddressChange}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Simpan Data</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
