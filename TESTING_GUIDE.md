# 🧪 PANDUAN TESTING PERBAIKAN SIDEBAR DASHBOARD PPDB

## Pre-Testing Setup

Pastikan aplikasi sudah running:
```bash
cd D:/ALIMAM/pp-alimam
pnpm dev
# Aplikasi akan running di http://localhost:3000
```

---

## 📋 TEST CASE 1: SIDEBAR NAVIGATION

### 1.1 Verifikasi Urutan Menu
**Step:**
1. Buka halaman dashboard: `http://localhost:3000/dashboard/pendaftar`
2. Lihat sidebar di sebelah kiri

**Expected Result:**
```
Urutan dari atas ke bawah:
1. 📋 Data Pendaftaran
2. 💰 Pembayaran Pendaftaran
3. 📄 Kelengkapan Berkas
4. 📅 Undangan Seleksi
5. 🏆 Pengumuman
6. ✅ Daftar Ulang
7. 👤 Profil
```

**Pass/Fail:** ☐ PASS ☐ FAIL

---

### 1.2 Verifikasi Icon Menu
**Step:**
1. Amati icon di sebelah kiri setiap menu item
2. Bandingkan dengan daftar icon di bawah

**Expected Icon:**
| Menu | Icon | Keterangan |
|------|------|-----------|
| Data Pendaftaran | 📋 Clipboard | ClipboardList icon |
| Pembayaran Pendaftaran | 💳 CreditCard | CreditCard icon |
| Kelengkapan Berkas | 📄 FileCheck | FileCheck icon |
| Undangan Seleksi | 📅 Calendar | Calendar icon |
| Pengumuman | 🏆 Trophy | Trophy icon |
| Daftar Ulang | ✅ CheckCircle | CheckCircle icon |
| Profil | ⚙️ Settings | Settings icon |

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## 🔗 TEST CASE 2: ROUTING & NAVIGATION

### 2.1 Test Setiap Link Menu

**Test Data Pendaftaran:**
1. Klik menu "Data Pendaftaran"
2. URL harus berubah ke `/dashboard/pendaftar`
3. Halaman ditampilkan dengan benar

**Pass/Fail:** ☐ PASS ☐ FAIL

**Test Pembayaran Pendaftaran:**
1. Klik menu "Pembayaran Pendaftaran"
2. URL harus berubah ke `/dashboard/pendaftar/pembayaran-pendaftaran`
3. Halaman pembayaran ditampilkan (tidak 404)

**Pass/Fail:** ☐ PASS ☐ FAIL

**Test Kelengkapan Berkas:**
1. Klik menu "Kelengkapan Berkas"
2. URL harus berubah ke `/dashboard/pendaftar/kelengkapan-berkas`
3. Halaman dengan 3 tab ditampilkan

**Pass/Fail:** ☐ PASS ☐ FAIL

**Test Undangan Seleksi:**
1. Klik menu "Undangan Seleksi"
2. URL harus berubah ke `/dashboard/pendaftar/undangan-seleksi`

**Pass/Fail:** ☐ PASS ☐ FAIL

**Test Pengumuman:**
1. Klik menu "Pengumuman"
2. URL harus berubah ke `/dashboard/pendaftar/pengumuman`

**Pass/Fail:** ☐ PASS ☐ FAIL

**Test Daftar Ulang:**
1. Klik menu "Daftar Ulang"
2. URL harus berubah ke `/dashboard/pendaftar/daftar-ulang`
3. Halaman ditampilkan (placeholder OK)

**Pass/Fail:** ☐ PASS ☐ FAIL

**Test Profil:**
1. Klik menu "Profil"
2. URL harus berubah ke `/dashboard/pendaftar/profil`

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## 🎯 TEST CASE 3: ACTIVE STATE (ACTIVE MENU HIGHLIGHTING)

### 3.1 Test Active State di Desktop

**Step:**
1. Navigate ke halaman Kelengkapan Berkas
2. Amati sidebar menu

**Expected Result:**
- Menu "Kelengkapan Berkas" harus **highlighted dengan background teal dan text white**
- Menu lain harus normal (gray text)

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## 📄 TEST CASE 4: TAB KELENGKAPAN BERKAS

### 4.1 Tab Navigation

**Step:**
1. Navigate ke `/dashboard/pendaftar/kelengkapan-berkas`
2. Lihat 3 tab di bawah header:
   - 📋 Lihat Data
   - 📄 Upload Berkas
   - 💾 Download Berkas

**Pass/Fail:** ☐ PASS ☐ FAIL

---

### 4.2 Tab "Lihat Data"

**Step:**
1. Klik tab "Lihat Data"
2. Tab harus aktif (underline teal)
3. Amati konten yang ditampilkan

**Expected Content:**
- ✓ Nomor Pendaftaran (format: MTI20260006)
- ✓ Nama Lengkap
- ✓ Email
- ✓ Nomor Ponsel
- ✓ Info box: "Data pendaftaran Anda sudah tersimpan..."

**Pass/Fail:** ☐ PASS ☐ FAIL

---

### 4.3 Tab "Upload Berkas"

**Step:**
1. Klik tab "Upload Berkas"
2. Tab harus aktif

**Expected Content:**
- ✓ 4 info card (Total Dokumen, Sudah Diupload, Terverifikasi, Progress Wajib)
- ✓ Info box kuning dengan petunjuk upload
- ✓ Section "Dokumen Wajib"
- ✓ Section "Dokumen Opsional"
- ✓ Minimal 2 dokumen card

**Pass/Fail:** ☐ PASS ☐ FAIL

---

### 4.4 Tab "Download Berkas"

**Step:**
1. Klik tab "Download Berkas"
2. Tab harus aktif

**Expected Content:**
- ✓ Info box biru dengan teks
- ✓ Section "Dokumen"
- ✓ Jika ada dokumen terverifikasi, tampilkan list dengan tombol Download
- ✓ Jika tidak ada, tampilkan "Belum ada dokumen yang dapat didownload"

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## 📤 TEST CASE 5: UPLOAD DOKUMEN FUNCTIONALITY

### 5.1 Upload via Click

**Step:**
1. Di tab "Upload Berkas", expand salah satu dokumen wajib
2. Klik di area upload atau drag-drop file
3. Pilih file JPG/PNG/PDF

**Expected Result:**
- ✓ Progress bar muncul dan bergerak
- ✓ Setelah selesai, toast notification "File berhasil diupload" muncul
- ✓ File info ditampilkan: nama, ukuran, waktu upload

**Pass/Fail:** ☐ PASS ☐ FAIL

---

### 5.2 Upload via Drag & Drop

**Step:**
1. Buka file explorer dan pilih file
2. Drag file ke area upload di dokumen card
3. Drop file

**Expected Result:**
- ✓ Area berubah warna saat drag (teal)
- ✓ Progress bar tampil dan berjalan
- ✓ Toast success notification muncul

**Pass/Fail:** ☐ PASS ☐ FAIL

---

### 5.3 Re-upload Dokumen

**Step:**
1. Untuk dokumen yang sudah diupload, klik area upload lagi
2. Pilih file baru

**Expected Result:**
- ✓ File lama diganti dengan file baru
- ✓ Toast "File berhasil diupload" muncul

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## 💾 TEST CASE 6: DOWNLOAD DOKUMEN FUNCTIONALITY

### 6.1 Download File

**Step:**
1. Buka tab "Download Berkas"
2. Lihat list dokumen yang sudah verified
3. Klik tombol "Download" pada salah satu dokumen

**Expected Result:**
- ✓ Browser mendownload file
- ✓ Toast notification "Download dimulai..." muncul
- ✓ File tersimpan di folder Downloads

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## 📱 TEST CASE 7: MOBILE RESPONSIVENESS

### 7.1 Test di Mobile (Tablet/Smartphone)

**Step:**
1. Resize browser ke ukuran mobile (max 768px width)
2. ATAU buka di smartphone

**Expected Result:**
- ✓ Sidebar berubah menjadi hamburger menu
- ✓ Header mobile tampil (menu button + Dashboard title)
- ✓ Klik hamburger untuk buka sidebar
- ✓ Sidebar overlay dengan semi-transparent backdrop
- ✓ Klik item menu, sidebar auto-close
- ✓ Tab kelengkapan berkas responsive

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ❌ TEST CASE 8: ERROR HANDLING

### 8.1 API Error

**Step:**
1. Di browser DevTools, buka Network tab
2. Block API call untuk `/api/dokumen/status`
3. Refresh halaman tab "Upload Berkas"

**Expected Result:**
- ✓ Error message ditampilkan
- ✓ Tombol "Coba Lagi" tersedia dan berfungsi

**Pass/Fail:** ☐ PASS ☐ FAIL

---

### 8.2 Invalid File

**Step:**
1. Di tab Upload, coba upload file yang terlalu besar (>2MB)
2. ATAU upload file dengan format invalid (.txt, .exe)

**Expected Result:**
- ✓ Error toast notification muncul
- ✓ File tidak diupload

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ FINAL CHECKLIST

Sebelum mark sebagai complete, verifikasi:

- [ ] Semua 7 menu items visible dan dalam urutan yang benar
- [ ] Setiap menu link berfungsi dan routing OK (tidak 404)
- [ ] Active state menu highlighting bekerja
- [ ] Tab kelengkapan berkas menampilkan 3 tab
- [ ] Setiap tab content sesuai
- [ ] Upload dokumen berfungsi (click & drag-drop)
- [ ] Download dokumen berfungsi
- [ ] Mobile responsiveness OK
- [ ] Error handling bekerja
- [ ] Tidak ada console error atau warning yang critical

---

## 📝 NOTES FOR TESTING

1. **Testing Account:** Gunakan akun yang sudah terdaftar
2. **Test Data:** Siapkan file dokumen (JPG, PNG, PDF) untuk test upload
3. **Browser:** Test di Chrome, Firefox, Safari (jika iOS)
4. **Network:** Pastikan network tab dibuka untuk monitor API calls

---

## 🐛 ISSUE REPORTING

Jika menemukan bug atau issue, catat:
- [ ] **Screenshot** dari masalah
- [ ] **URL** saat error terjadi
- [ ] **Browser console error** (F12 → Console)
- [ ] **Steps to reproduce** (langkah-langkah yang dilakukan)
- [ ] **Expected vs Actual result**

---

**Status:** Ready for Testing  
**Tanggal:** 27 Januari 2026
