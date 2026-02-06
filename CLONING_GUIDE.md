# 🚀 PPDB Template - Cara Cloning Super Mudah!

## 📋 **Cloning untuk Pesantren Baru - 5 Langkah Saja!**

### 🎯 **Langkah 1: Copy Repository**
```bash
# Clone template base
git clone https://github.com/riezaekatomara/pp-alimam.git ppdb-[nama-pesantren]
cd ppdb-[nama-pesantren]
```

### 🎨 **Langkah 2: Ganti Identitas (5 Menit!)**
Buka file: `src/config/ppdb-config.ts`

```typescript
// Ganti bagian ini saja:
pesantren: {
  nama: "Pondok Pesantren MIMBAR",           // ✅ Ganti
  singkatan: "MIMBAR",                      // ✅ Ganti  
  alamat: "Jl. Alamat Pesantren Baru",       // ✅ Ganti
  telepon: "+62 812-xxxx-xxxx",             // ✅ Ganti
  email: "info@mimbar.sch.id",              // ✅ Ganti
},

colors: {
  primary: {
    600: "#1e40af",  // ✅ Ganti warna utama
  }
},

programs: [
  {
    name: "MTs",           // ✅ Sesuaikan program
    fullName: "Madrasah Tsanawiyah MIMBAR",
  }
]
```

### 🖼️ **Langkah 3: Ganti Assets (Copy-Paste!)**
```bash
# Ganti logo dan gambar
src/
├── images/
│   ├── logo.png          → Ganti logo pesantren
│   ├── program-mts.jpg   → Ganti foto MTs
│   ├── program-il.jpg    → Ganti foto I'dad
│   └── hero-bg.jpg      → Ganti background
```

### 🌐 **Langkah 4: Deploy ke Vercel**
1. Push ke GitHub baru
2. Connect ke Vercel
3. Deploy! 🚀

### ✅ **Langkah 5: Testing**
- Buka website
- Test flow pendaftaran
- Done! 🎉

---

## 🎨 **Customization Options**

### 📱 **Warna Otomatis**
Cukup ganti di `ppdb-config.ts`, semua warna berubah otomatis!

### 📝 **Program Pendidikan**
Tambah/hapus program sesuai kebutuhan pesantren.

### 💰 **Biaya Pendaftaran**
Sesuaikan dengan kebijakan pesantren.

---

## ⚡ **Speed Benefits**

### 🚀 **Sebelum vs Sesudah:**
- **Manual Coding**: 2-3 minggu
- **Template Cloning**: 1-2 hari! ⚡

### 📊 **Business Impact:**
- ✅ Bisa handle 5+ client/bulan
- ✅ Revenue scaling cepat
- ✅ Portfolio berkembang pesat

---

## 🎯 **Next Level - Automation**

### 🤖 **Future Plans:**
1. **CLI Tool** - One command cloning
2. **Dashboard Admin** - Client self-service
3. **Auto-Deployment** - Git push → Live
4. **Multi-tenant** - Single codebase, many clients

---

## 📞 **Support**

Butuh bantuan cloning?
- 📧 Email: riezaekatomara@gmail.com
- 💬 WhatsApp: +62 812-3456-7890
- 🐛 Issues: GitHub repository

---

**🚀 Ready untuk scaling business PPDB solutions!**
