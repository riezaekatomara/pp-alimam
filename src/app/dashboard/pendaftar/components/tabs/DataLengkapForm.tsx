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
  Send,
  Info
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
      className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 border ${isOpen
          ? "bg-white border-teal-200 shadow-clay-md"
          : "bg-surface-50 border-white/50 hover:bg-white hover:border-teal-100"
        }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isCompleted
              ? "bg-emerald-100 text-emerald-600"
              : isOpen
                ? "bg-teal-100 text-teal-600"
                : "bg-surface-200 text-ink-400"
            }`}
        >
          {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
        </div>
        <div className="text-left">
          <h3 className={`font-bold text-lg ${isOpen ? "text-ink-900" : "text-ink-600"}`}>{title}</h3>
          {subtitle && <p className="text-sm text-ink-400 font-medium">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {isCompleted && (
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg uppercase tracking-wide">
            Lengkap
          </span>
        )}
        <div className={`p-2 rounded-full transition-all ${isOpen ? "bg-surface-100 rotate-180" : "bg-transparent"}`}>
          <ChevronDown className={`w-5 h-5 ${isOpen ? "text-ink-900" : "text-ink-400"}`} />
        </div>
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
  const baseInputClass = "w-full px-4 py-3 bg-white border border-ink-200 rounded-xl text-ink-900 placeholder:text-ink-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none disabled:bg-surface-100 disabled:text-ink-400 font-medium";

  if (options) {
    return (
      <div className="space-y-1.5">
        <label className="block text-sm font-bold text-ink-700 ml-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <div className="relative">
          <select
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`${baseInputClass} appearance-none cursor-pointer`}
          >
            <option value="" disabled={value !== ""}>Pilih {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
        </div>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="space-y-1.5">
        <label className="block text-sm font-bold text-ink-700 ml-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={3}
          className={`${baseInputClass} resize-none`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-bold text-ink-700 ml-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={baseInputClass}
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
  const [requestStatus, setRequestStatus] = useState<any>(null);

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

  // Check if both parents are deceased
  const bothParentsDeceased =
    formData.ayah.status_hidup === "Sudah Meninggal" &&
    formData.ibu.status_hidup === "Sudah Meninggal";

  useEffect(() => {
    if (bothParentsDeceased && formData.wali_sama_dengan_ortu) {
      setFormData((prev) => ({
        ...prev,
        wali_sama_dengan_ortu: false,
      }));
      setOpenSections((prev) => ({ ...prev, wali: true }));
    }
  }, [bothParentsDeceased, formData.wali_sama_dengan_ortu]);

  const [toastMessage, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();

        const [dataRes, reqRes] = await Promise.all([
          fetch("/api/pendaftar/data-lengkap"),
          session.pendaftar_id ? fetch(`/api/pendaftar/request-edit?pendaftar_id=${session.pendaftar_id}`) : Promise.resolve(null)
        ]);

        const result = await dataRes.json();
        if (result.success && result.data) {
          setFormData((prev) => ({
            ...prev,
            santri: { ...prev.santri, ...result.data.santri },
            ayah: { ...prev.ayah, ...result.data.ayah },
            ibu: { ...prev.ibu, ...result.data.ibu },
            wali: {
              ...prev.wali,
              ...result.data.wali,
              alamat: result.data.wali.alamat_wali || result.data.wali.alamat || "", // Fallback
              rt: result.data.wali.rt_wali || "",
              rw: result.data.wali.rw || "",
              kelurahan: result.data.wali.kelurahan_wali || "",
              kecamatan: result.data.wali.kecamatan_wali || "",
              kabupaten: result.data.wali.kabupaten_wali || "",
              provinsi: result.data.wali.provinsi_wali || "",
              kode_pos: result.data.wali.kode_pos_wali || "",
            },
            wali_sama_dengan_ortu: result.data.wali_sama_dengan_ortu ?? true,
          }));
        }

        if (reqRes) {
          const reqJson = await reqRes.json();
          if (reqJson.success) setRequestStatus(reqJson.data);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

      if (requestStatus?.status === 'approved_to_edit') {
        const reqUpdate = await fetch("/api/pendaftar/request-edit", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            request_id: requestStatus.id,
            status: 'submitted'
          })
        });

        const reqJson = await reqUpdate.json();
        if (reqJson.success) {
          setRequestStatus(reqJson.data);
          showToast("success", "Perubahan data berhasil diajukan untuk verifikasi!");
        } else {
          showToast("success", "Data tersimpan, namun gagal update status request.");
        }
      } else {
        showToast("success", "Data berhasil disimpan!");
      }

    } catch (error: any) {
      showToast("error", error.message || "Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  const isSantriComplete = Boolean(
    formData.santri.nama_lengkap &&
    formData.santri.tempat_lahir &&
    formData.santri.tanggal_lahir &&
    formData.santri.alamat_lengkap
  );

  const isAyahComplete = Boolean(
    formData.ayah.nama_lengkap && formData.ayah.pekerjaan
  );

  const isIbuComplete = Boolean(
    formData.ibu.nama_lengkap && formData.ibu.pekerjaan
  );

  const isEditMode = requestStatus?.status === 'approved_to_edit';

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
        <p className="text-ink-500 font-medium">Memuat data...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">

      {toastMessage && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-clay-lg flex items-center gap-3 animate-in slide-in-from-right duration-300 ${toastMessage.type === "success"
            ? "bg-emerald-500 text-white shadow-emerald-500/20"
            : "bg-red-500 text-white shadow-red-500/20"
            }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span className="font-bold text-sm tracking-wide">{toastMessage.message}</span>
        </div>
      )}

      {/* Info Box */}
      {isEditMode ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-emerald-800 font-bold mb-1">
                Mode Edit Aktif
              </p>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Anda diizinkan admin untuk mengubah data. Silakan perbaiki data yang salah, lalu klik tombol <strong>"Simpan & Ajukan Verifikasi"</strong> di bawah.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
            <Info className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-amber-900 font-bold mb-1">
              Petunjuk Pengisian Data
            </p>
            <ul className="text-sm text-amber-800 space-y-1 font-medium opacity-80 list-disc list-inside">
              <li>Isi data dengan lengkap dan benar sesuai dokumen resmi</li>
              <li>Data yang bertanda (*) wajib diisi</li>
              <li>Klik tombol "Simpan Data" setelah selesai mengisi</li>
            </ul>
          </div>
        </div>
      )}

      {/* SECTIONS */}
      {/* 1. Data Diri Santri */}
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
          <div className="glass-panel p-6 md:p-8 rounded-[2rem] space-y-8 animate-in slide-in-from-top-4 duration-300">

            {/* Identitas */}
            <div>
              <h4 className="flex items-center gap-2 text-lg font-bold text-ink-900 mb-6 pb-2 border-b border-ink-100">
                <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center text-sm">1</span>
                Identitas Utama
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField label="NIK" name="nik" value={formData.santri.nik} onChange={(v) => updateSantri("nik", v)} placeholder="16 digit NIK" maxLength={16} required />
                <InputField label="Nama Lengkap" name="nama_lengkap" value={formData.santri.nama_lengkap} onChange={(v) => updateSantri("nama_lengkap", v)} placeholder="Sesuai akta kelahiran" required />
                <InputField label="Tempat Lahir" name="tempat_lahir" value={formData.santri.tempat_lahir} onChange={(v) => updateSantri("tempat_lahir", v)} placeholder="Kota/Kabupaten" required />
                <InputField label="Tanggal Lahir" name="tanggal_lahir" value={formData.santri.tanggal_lahir} onChange={(v) => updateSantri("tanggal_lahir", v)} type="date" required />
                <InputField label="Jenis Kelamin" name="jenis_kelamin" value={formData.santri.jenis_kelamin} onChange={(v) => updateSantri("jenis_kelamin", v)} options={["Laki-laki", "Perempuan"]} required />
                <InputField label="Agama" name="agama" value={formData.santri.agama} onChange={(v) => updateSantri("agama", v)} options={AGAMA_OPTIONS} required />
                <InputField label="Kewarganegaraan" name="kewarganegaraan" value={formData.santri.kewarganegaraan} onChange={(v) => updateSantri("kewarganegaraan", v)} placeholder="Indonesia" required />
                <InputField label="Anak Ke" name="anak_ke" value={formData.santri.anak_ke} onChange={(v) => updateSantri("anak_ke", parseInt(v) || 1)} type="number" />
                <InputField label="Jumlah Saudara" name="jumlah_saudara" value={formData.santri.jumlah_saudara} onChange={(v) => updateSantri("jumlah_saudara", parseInt(v) || 1)} type="number" />
              </div>
            </div>

            {/* Fisik */}
            <div>
              <h4 className="flex items-center gap-2 text-lg font-bold text-ink-900 mb-6 pb-2 border-b border-ink-100">
                <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center text-sm">2</span>
                Fisik & Kesehatan
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InputField label="Golongan Darah" name="golongan_darah" value={formData.santri.golongan_darah} onChange={(v) => updateSantri("golongan_darah", v)} options={GOLONGAN_DARAH_OPTIONS} />
                <InputField label="Tinggi Badan (cm)" name="tinggi_badan" value={formData.santri.tinggi_badan || ""} onChange={(v) => updateSantri("tinggi_badan", parseInt(v) || 0)} type="number" placeholder="150" />
                <InputField label="Berat Badan (kg)" name="berat_badan" value={formData.santri.berat_badan || ""} onChange={(v) => updateSantri("berat_badan", parseInt(v) || 0)} type="number" placeholder="45" />
                <div className="md:col-span-2 lg:col-span-1">
                  <InputField label="Riwayat Penyakit" name="riwayat_penyakit" value={formData.santri.riwayat_penyakit} onChange={(v) => updateSantri("riwayat_penyakit", v)} placeholder="-" />
                </div>
              </div>
            </div>

            {/* Alamat */}
            <div>
              <h4 className="flex items-center gap-2 text-lg font-bold text-ink-900 mb-6 pb-2 border-b border-ink-100">
                <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center text-sm">3</span>
                Alamat Tempat Tinggal
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <InputField label="Alamat Lengkap" name="alamat_lengkap" value={formData.santri.alamat_lengkap} onChange={(v) => updateSantri("alamat_lengkap", v)} type="textarea" placeholder="Jalan, nomor rumah, RT/RW..." required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="RT" name="rt" value={formData.santri.rt} onChange={(v) => updateSantri("rt", v)} placeholder="001" maxLength={3} />
                  <InputField label="RW" name="rw" value={formData.santri.rw} onChange={(v) => updateSantri("rw", v)} placeholder="002" maxLength={3} />
                </div>
                <div className="md:col-span-2">
                  <WilayahSelector value={{
                    provinsi: formData.santri.provinsi,
                    kabupaten: formData.santri.kabupaten,
                    kecamatan: formData.santri.kecamatan,
                    kelurahan: formData.santri.kelurahan,
                    kode_pos: formData.santri.kode_pos
                  }} onChange={handleSantriAddressChange} />
                </div>
              </div>
            </div>

            {/* Kontak */}
            <div>
              <h4 className="flex items-center gap-2 text-lg font-bold text-ink-900 mb-6 pb-2 border-b border-ink-100">
                <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center text-sm">4</span>
                Kontak & Sekolah Asal
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Nomor HP/WhatsApp" name="no_hp" value={formData.santri.no_hp} onChange={(v) => updateSantri("no_hp", v)} placeholder="08xxxxxxxxxx" required />
                <InputField label="Email" name="email" value={formData.santri.email} onChange={(v) => updateSantri("email", v)} type="email" placeholder="email@example.com" />
                <InputField label="Nama Sekolah Asal" name="asal_sekolah" value={formData.santri.asal_sekolah} onChange={(v) => updateSantri("asal_sekolah", v)} placeholder="Nama Sekolah" required />
                <InputField label="NISN" name="nisn" value={formData.santri.nisn} onChange={(v) => updateSantri("nisn", v)} placeholder="10 digit NISN" maxLength={10} />
                <InputField label="Tahun Lulus" name="tahun_lulus" value={formData.santri.tahun_lulus} onChange={(v) => updateSantri("tahun_lulus", v)} placeholder="2024" maxLength={4} />
                <InputField label="Alamat Sekolah" name="alamat_sekolah" value={formData.santri.alamat_sekolah} onChange={(v) => updateSantri("alamat_sekolah", v)} placeholder="Alamat lengkap sekolah" />
              </div>
            </div>

          </div>
        )}
      </div>

      {/* 2. Data Ayah */}
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
          <div className="glass-panel p-6 md:p-8 rounded-[2rem] animate-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField label="Nama Lengkap Ayah" name="nama_lengkap_ayah" value={formData.ayah.nama_lengkap} onChange={(v) => updateAyah("nama_lengkap", v)} placeholder="Sesuai KTP" required />
              <InputField label="NIK" name="nik_ayah" value={formData.ayah.nik} onChange={(v) => updateAyah("nik", v)} placeholder="16 digit NIK" maxLength={16} disabled={formData.ayah.status_hidup === "Sudah Meninggal"} />
              <InputField label="Status" name="status_ayah" value={formData.ayah.status_hidup} onChange={(v) => updateAyah("status_hidup", v)} options={["Masih Hidup", "Sudah Meninggal"]} required />

              {/* Conditional Fields based on Status Hidup */}
              <InputField label="Tempat Lahir" name="tempat_lahir_ayah" value={formData.ayah.tempat_lahir} onChange={(v) => updateAyah("tempat_lahir", v)} placeholder="Kota" />
              <InputField label="Tanggal Lahir" name="tanggal_lahir_ayah" value={formData.ayah.tanggal_lahir} onChange={(v) => updateAyah("tanggal_lahir", v)} type="date" />
              <InputField label="Agama" name="agama_ayah" value={formData.ayah.agama} onChange={(v) => updateAyah("agama", v)} options={AGAMA_OPTIONS} />
              <InputField label="Pendidikan Terakhir" name="pendidikan_ayah" value={formData.ayah.pendidikan_terakhir} onChange={(v) => updateAyah("pendidikan_terakhir", v)} options={PENDIDIKAN_OPTIONS} required />

              <InputField label="Pekerjaan" name="pekerjaan_ayah" value={formData.ayah.pekerjaan} onChange={(v) => updateAyah("pekerjaan", v)} options={PEKERJAAN_OPTIONS} required={formData.ayah.status_hidup !== "Sudah Meninggal"} disabled={formData.ayah.status_hidup === "Sudah Meninggal"} />
              <InputField label="Penghasilan" name="penghasilan_ayah" value={formData.ayah.penghasilan} onChange={(v) => updateAyah("penghasilan", v)} options={PENGHASILAN_OPTIONS} required={formData.ayah.status_hidup !== "Sudah Meninggal"} disabled={formData.ayah.status_hidup === "Sudah Meninggal"} />

              <InputField label="No HP" name="no_hp_ayah" value={formData.ayah.no_hp} onChange={(v) => updateAyah("no_hp", v)} placeholder="08xxx" required={formData.ayah.status_hidup !== "Sudah Meninggal"} disabled={formData.ayah.status_hidup === "Sudah Meninggal"} />
              <InputField label="Email" name="email_ayah" value={formData.ayah.email} onChange={(v) => updateAyah("email", v)} type="email" placeholder="email@example.com" disabled={formData.ayah.status_hidup === "Sudah Meninggal"} />
            </div>
          </div>
        )}
      </div>

      {/* 3. Data Ibu */}
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
          <div className="glass-panel p-6 md:p-8 rounded-[2rem] animate-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField label="Nama Lengkap Ibu" name="nama_lengkap_ibu" value={formData.ibu.nama_lengkap} onChange={(v) => updateIbu("nama_lengkap", v)} placeholder="Sesuai KTP" required />
              <InputField label="NIK" name="nik_ibu" value={formData.ibu.nik} onChange={(v) => updateIbu("nik", v)} placeholder="16 digit NIK" maxLength={16} disabled={formData.ibu.status_hidup === "Sudah Meninggal"} />
              <InputField label="Status" name="status_ibu" value={formData.ibu.status_hidup} onChange={(v) => updateIbu("status_hidup", v)} options={["Masih Hidup", "Sudah Meninggal"]} required />

              <InputField label="Tempat Lahir" name="tempat_lahir_ibu" value={formData.ibu.tempat_lahir} onChange={(v) => updateIbu("tempat_lahir", v)} placeholder="Kota" />
              <InputField label="Tanggal Lahir" name="tanggal_lahir_ibu" value={formData.ibu.tanggal_lahir} onChange={(v) => updateIbu("tanggal_lahir", v)} type="date" />
              <InputField label="Agama" name="agama_ibu" value={formData.ibu.agama} onChange={(v) => updateIbu("agama", v)} options={AGAMA_OPTIONS} />
              <InputField label="Pendidikan Terakhir" name="pendidikan_ibu" value={formData.ibu.pendidikan_terakhir} onChange={(v) => updateIbu("pendidikan_terakhir", v)} options={PENDIDIKAN_OPTIONS} required />

              <InputField label="Pekerjaan" name="pekerjaan_ibu" value={formData.ibu.pekerjaan} onChange={(v) => updateIbu("pekerjaan", v)} options={PEKERJAAN_OPTIONS} required={formData.ibu.status_hidup !== "Sudah Meninggal"} disabled={formData.ibu.status_hidup === "Sudah Meninggal"} />
              <InputField label="Penghasilan" name="penghasilan_ibu" value={formData.ibu.penghasilan} onChange={(v) => updateIbu("penghasilan", v)} options={PENGHASILAN_OPTIONS} disabled={formData.ibu.status_hidup === "Sudah Meninggal"} />

              <InputField label="No HP" name="no_hp_ibu" value={formData.ibu.no_hp} onChange={(v) => updateIbu("no_hp", v)} placeholder="08xxx" required={formData.ibu.status_hidup !== "Sudah Meninggal"} disabled={formData.ibu.status_hidup === "Sudah Meninggal"} />
              <InputField label="Email" name="email_ibu" value={formData.ibu.email} onChange={(v) => updateIbu("email", v)} type="email" placeholder="email@example.com" disabled={formData.ibu.status_hidup === "Sudah Meninggal"} />
            </div>
          </div>
        )}
      </div>

      {/* 4. Data Wali */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="wali_ortu"
              checked={formData.wali_sama_dengan_ortu}
              onChange={(e) => {
                const checked = e.target.checked;
                setFormData(prev => ({ ...prev, wali_sama_dengan_ortu: checked }));
                setOpenSections(prev => ({ ...prev, wali: !checked }));
              }}
              disabled={bothParentsDeceased}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-ink-300 bg-white checked:border-teal-500 checked:bg-teal-500 hover:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <CheckCircle className="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" />
          </div>
          <label htmlFor="wali_ortu" className="text-sm font-bold text-ink-700 cursor-pointer select-none">
            Data Wali sama dengan Ayah/Ibu
          </label>
        </div>

        <SectionHeader
          icon={Users}
          title="Data Wali"
          subtitle="Diisi jika wali bukan orang tua kandung"
          isOpen={openSections.wali}
          onToggle={() => toggleSection("wali")}
          isCompleted={false}
        />

        {openSections.wali && (
          <div className="glass-panel p-6 md:p-8 rounded-[2rem] animate-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField label="Hubungan" name="hubungan_wali" value={formData.wali.hubungan} onChange={(v) => updateWali("hubungan", v)} placeholder="Paman, Kakek, dll" required={bothParentsDeceased} />
              <InputField label="Nama Lengkap" name="nama_lengkap_wali" value={formData.wali.nama_lengkap} onChange={(v) => updateWali("nama_lengkap", v)} placeholder="Sesuai KTP" required={bothParentsDeceased} />
              <InputField label="NIK" name="nik_wali" value={formData.wali.nik} onChange={(v) => updateWali("nik", v)} placeholder="16 digit NIK" maxLength={16} required={bothParentsDeceased} />
              <InputField label="No HP" name="no_hp_wali" value={formData.wali.no_hp} onChange={(v) => updateWali("no_hp", v)} placeholder="08xxx" required={bothParentsDeceased} />
            </div>

            <div className="mt-8 pt-6 border-t border-ink-100">
              <h5 className="font-bold text-ink-800 mb-4 bg-surface-100 inline-block px-3 py-1 rounded-lg text-sm">Alamat Wali</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <InputField label="Alamat Lengkap" name="alamat_wali" value={formData.wali.alamat} onChange={(v) => updateWali("alamat", v)} type="textarea" placeholder="Jalan..." required={bothParentsDeceased} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="RT" name="rt_wali" value={formData.wali.rt} onChange={(v) => updateWali("rt", v)} placeholder="001" maxLength={3} />
                  <InputField label="RW" name="rw_wali" value={formData.wali.rw} onChange={(v) => updateWali("rw", v)} placeholder="002" maxLength={3} />
                </div>
                <div className="md:col-span-2">
                  <WilayahSelector
                    value={{
                      provinsi: formData.wali.provinsi,
                      kabupaten: formData.wali.kabupaten,
                      kecamatan: formData.wali.kecamatan,
                      kelurahan: formData.wali.kelurahan,
                      kode_pos: formData.wali.kode_pos
                    }}
                    onChange={handleWaliAddressChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-8">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:transform-none"
        >
          {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : isEditMode ? <Send className="w-6 h-6" /> : <Save className="w-6 h-6" />}
          <span>{saving ? "Menyimpan..." : isEditMode ? "Simpan & Ajukan Verifikasi" : "Simpan Data"}</span>
        </button>
      </div>

    </form>
  );
}
