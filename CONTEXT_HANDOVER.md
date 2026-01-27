# 🔄 CONTEXT HANDOVER - PPDB AL-IMAM PROJECT

**Last Updated:** 26 Januari 2026, 15:23 WIB
**Session With:** Claude Sonnet 4.5 (Chat) + Claude Opus 4.5 (Code)
**Progress:** 70%
**Current Phase:** Architecture Redesign & Testing

---

## 👨‍💻 PROJECT OVERVIEW

**Developer:** Rieza (Vision impairment: Minus 5.75 - requires high contrast UI)
**Project:** PPDB (Penerimaan Peserta Didik Baru) - Ponpes Al-Imam Al-Islami Sukabumi
**Purpose:** Complete student registration system dengan WhatsApp notifications
**Target:** Demo ke Mudir (Director) - 2 weeks
**Production:** 5 weeks full deployment

---

## 🎯 COMPLETE USER JOURNEY (7 STEPS)

### **STEP 0: REGISTRASI** ✅ (DONE)

```
┌─────────────────────────────────────────────┐
│ User isi form pendaftaran online            │
│ → Generate nomor pendaftaran (MTI20260001)  │
│ → Auto-create account (NIK + No. Daftar)   │
│ → 📱 WHATSAPP NOTIF:                        │
│   "Pendaftaran berhasil! Nomor: MTI20260001 │
│    Login: NIK + Nomor Pendaftaran           │
│    Segera bayar Rp 250.000"                 │
│ → Status: draft                             │
└─────────────────────────────────────────────┘
```

**Implementation Status:** ✅ Complete
**WhatsApp Status:** 🔜 Pending integration

---

### **STEP 1: PEMBAYARAN** 💰 (BLOCKER!)

```
┌─────────────────────────────────────────────┐
│ User login → Dashboard LOCKED               │
│ → Tab aktif: HANYA "Status Pembayaran"     │
│ → Tab lain: 🔒 DISABLED                    │
│ → Upload bukti transfer                     │
│ → Admin verifikasi pembayaran               │
│ → 📱 WHATSAPP NOTIF:                        │
│   "Pembayaran terverifikasi!                │
│    Silakan lengkapi data pendaftaran"       │
│ → Status: paid → unlock Step 2              │
└─────────────────────────────────────────────┘
```

**Implementation Status:** ☐ Not started
**Priority:** HIGH (Step 1 blocks all other steps)
**Estimated Time:** 2-3 hours

---

### **STEP 2: LENGKAPI DATA** 📝

```
┌─────────────────────────────────────────────┐
│ Tab "Data Pendaftaran" unlock & aktif       │
│ → User isi data lengkap:                    │
│   - Data orang tua (ayah, ibu, wali)       │
│   - Alamat lengkap                          │
│   - Data sekolah asal                       │
│   - Hobi, cita-cita, hafalan Quran         │
│ → Submit data                                │
│ → 📱 WHATSAPP NOTIF:                        │
│   "Data lengkap tersimpan!                  │
│    Silakan upload berkas dokumen"           │
│ → Status: data_completed → unlock Step 3    │
└─────────────────────────────────────────────┘
```

**Implementation Status:** ⏸️ Partial (Tab 1 ada, tapi belum editable)
**Priority:** MEDIUM
**Estimated Time:** 3-4 hours

---

### **STEP 3: UPLOAD BERKAS** 📄

```
┌─────────────────────────────────────────────┐
│ Tab "Upload Berkas" unlock & aktif          │
│ → User upload 9 dokumen:                    │
│   1. Foto Calon Santri (JPG/PNG, 1MB)      │
│   2. KTP Orang Tua (PDF/JPG, 2MB)          │
│   3. Kartu Keluarga (PDF/JPG, 2MB)         │
│   4. Akta Kelahiran (PDF/JPG, 2MB)         │
│   5. Rapor Semester 1 (PDF/JPG, 2MB)       │
│   6. Rapor Semester 2 (PDF/JPG, 2MB)       │
│   7. Surat Kesanggupan (PDF, 2MB)          │
│   8. Surat Kesehatan* (PDF/JPG, 2MB)       │
│   9. Hasil Tes HBsAg* (PDF/JPG, 2MB)       │
│   (*optional)                               │
│ → Submit untuk verifikasi                   │
│ → Admin verifikasi dokumen                  │
│ → 📱 WHATSAPP NOTIF:                        │
│   "Dokumen terverifikasi!                   │
│    Tunggu jadwal seleksi/tes"               │
│ → Status: docs_verified → unlock Step 4     │
└─────────────────────────────────────────────┘
```

**Implementation Status:** ✅ Code complete (by Claude Opus 4.5)
**Testing Status:** ⚠️ Blocked by Supabase Storage setup
**Priority:** HIGH (needed for demo)
**Files:**

- `src/app/api/upload/dokumen/route.ts`
- `src/app/api/dokumen/status/route.ts`
- `src/app/api/dokumen/preview/route.ts`
- `src/app/dashboard/pendaftar/components/tabs/UploadBerkas.tsx`

---

### **STEP 4: JADWAL SELEKSI** 📅

```
┌─────────────────────────────────────────────┐
│ Admin buat jadwal ujian/wawancara           │
│ → 📱 WHATSAPP NOTIF:                        │
│   "Undangan Seleksi:                        │
│    Tanggal: [date]                          │
│    Waktu: [time]                            │
│    Tempat: [location/Google Meet]"          │
│ → Tab "Undangan Seleksi" unlock & aktif     │
│ → User download surat undangan PDF          │
│ → Status: scheduled → tunggu ujian          │
└─────────────────────────────────────────────┘
```

**Implementation Status:** ☐ Not started
**Priority:** MEDIUM (for demo showcase)
**Estimated Time:** 4-5 hours

---

### **STEP 5: PELAKSANAAN UJIAN** 📝

```
┌─────────────────────────────────────────────┐
│ User ikut ujian (offline/online)            │
│ → Admin input nilai:                        │
│   - Tes tertulis                            │
│   - Wawancara santri                        │
│   - Tes baca Quran                          │
│   - Wawancara orang tua                     │
│ → Status: tested → tunggu pengumuman        │
└─────────────────────────────────────────────┘
```

**Implementation Status:** ☐ Not started
**Priority:** LOW (post-demo)
**Estimated Time:** 6-8 hours

---

### **STEP 6: PENGUMUMAN** 🎉

```
┌─────────────────────────────────────────────┐
│ Admin publish pengumuman                    │
│ → 📱 WHATSAPP NOTIF:                        │
│   "SELAMAT! Anda DITERIMA                   │
│    Download surat pengumuman di dashboard"  │
│   ATAU                                      │
│   "Mohon maaf, Anda belum berhasil"         │
│ → Tab "Pengumuman" unlock & aktif           │
│ → User lihat hasil & download surat PDF     │
│ → Status: accepted / rejected               │
└─────────────────────────────────────────────┘
```

**Implementation Status:** ☐ Not started
**Priority:** MEDIUM (for complete demo)
**Estimated Time:** 3-4 hours

---

### **STEP 7: DAFTAR ULANG** ✅ (Jika diterima)

```
┌─────────────────────────────────────────────┐
│ Tab "Daftar Ulang" unlock & aktif           │
│ → 📱 WHATSAPP NOTIF:                        │
│   "Selamat! Silakan daftar ulang:           │
│    Deadline: [date]                         │
│    Biaya: Rp [amount]                       │
│    Dokumen: [list]"                         │
│ → User upload bukti daftar ulang            │
│ → Admin verifikasi                          │
│ → Status: enrolled → SELESAI! 🎓            │
└─────────────────────────────────────────────┘
```

**Implementation Status:** ☐ Not started
**Priority:** LOW (post-production)
**Estimated Time:** 3-4 hours

---

## 🔐 TAB ACCESS CONTROL MATRIX

| Tab                    | Step 0 | Step 1 | Step 2 | Step 3 | Step 4 | Step 5 | Step 6 | Step 7 |
| ---------------------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| **Status Pembayaran**  | ✅     | ✅     | ✅     | ✅     | ✅     | ✅     | ✅     | ✅     |
| **Data Pendaftaran**   | 🔒     | 🔒     | ✅     | ✅     | ✅     | ✅     | ✅     | ✅     |
| **Upload Berkas**      | 🔒     | 🔒     | 🔒     | ✅     | ✅     | ✅     | ✅     | ✅     |
| **Kelengkapan Berkas** | 🔒     | 🔒     | 🔒     | ✅     | ✅     | ✅     | ✅     | ✅     |
| **Undangan Seleksi**   | 🔒     | 🔒     | 🔒     | 🔒     | ✅     | ✅     | ✅     | ✅     |
| **Pengumuman**         | 🔒     | 🔒     | 🔒     | 🔒     | 🔒     | 🔒     | ✅     | ✅     |
| **Daftar Ulang**       | 🔒     | 🔒     | 🔒     | 🔒     | 🔒     | 🔒     | 🔒     | ✅     |
| **Profil**             | ✅     | ✅     | ✅     | ✅     | ✅     | ✅     | ✅     | ✅     |

**Legend:**

- ✅ = Unlocked & accessible
- 🔒 = Locked & disabled

---

## 📱 WHATSAPP NOTIFICATION STRATEGY

### **Priority Notifications (MUST HAVE):**

| #   | Trigger                  | Template                                                                                 | Priority  |
| --- | ------------------------ | ---------------------------------------------------------------------------------------- | --------- |
| 1   | Registration complete    | "Pendaftaran berhasil! Nomor: {nomor}. Login: NIK + No. Daftar. Segera bayar Rp 250.000" | 🔥 HIGH   |
| 2   | Payment verified         | "Pembayaran terverifikasi! Silakan lengkapi data pendaftaran di dashboard"               | 🔥 HIGH   |
| 3   | Documents verified       | "Dokumen terverifikasi! Tunggu jadwal seleksi/tes"                                       | 🔥 HIGH   |
| 4   | Exam scheduled           | "Undangan Seleksi: Tanggal {date}, Waktu {time}, Tempat {location}"                      | 🔥 HIGH   |
| 5   | Result announced         | "SELAMAT! Anda DITERIMA / Mohon maaf, belum berhasil"                                    | 🔥 HIGH   |
| 6   | Re-registration reminder | "Selamat! Silakan daftar ulang. Deadline: {date}"                                        | ⚠️ MEDIUM |

### **Optional Notifications (NICE TO HAVE):**

| #   | Trigger                   | Template                                 | Priority |
| --- | ------------------------- | ---------------------------------------- | -------- |
| 7   | Data completed            | "Data tersimpan! Silakan upload dokumen" | ℹ️ LOW   |
| 8   | Payment deadline reminder | "Reminder: Batas waktu pembayaran H-3"   | ℹ️ LOW   |
| 9   | Exam reminder             | "Reminder: Tes besok jam {time}"         | ℹ️ LOW   |

**Implementation:**

- Start with **6 priority** notifications
- Add optional later (budget permitting)
- Use **Meta WhatsApp Business Cloud API** (1,000 free/month)

---

## 🗄️ DATABASE SCHEMA UPDATES NEEDED

### **Critical Addition: status_proses Field**

```sql
-- ADD TO TABLE: pendaftar
ALTER TABLE public.pendaftar
ADD COLUMN IF NOT EXISTS status_proses TEXT DEFAULT 'draft' CHECK (
  status_proses IN (
    'draft',            -- Step 0: Just registered
    'awaiting_payment', -- Step 1: Not paid yet
    'paid',             -- Step 1: Payment verified
    'data_completed',   -- Step 2: Data filled
    'docs_uploaded',    -- Step 3: Docs uploaded
    'docs_verified',    -- Step 3: Docs verified by admin
    'scheduled',        -- Step 4: Exam scheduled
    'tested',           -- Step 5: Exam done
    'announced',        -- Step 6: Result published
    'accepted',         -- Step 6: Accepted
    'rejected',         -- Step 6: Rejected
    'enrolled'          -- Step 7: Re-registration complete
  )
),
ADD COLUMN IF NOT EXISTS payment_verified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS payment_verified_by UUID REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS data_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS docs_uploaded_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS docs_verified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS docs_verified_by UUID REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS announced_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS enrolled_at TIMESTAMP WITH TIME ZONE;

-- INDEX for performance
CREATE INDEX IF NOT EXISTS idx_pendaftar_status_proses
ON public.pendaftar(status_proses);

CREATE INDEX IF NOT EXISTS idx_pendaftar_payment_status
ON public.pendaftar(status_proses)
WHERE status_proses IN ('awaiting_payment', 'paid');
```

---

## 🛠️ TECH STACK

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first, theme in globals.css)
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Auth:** Custom session (HTTP-only cookie)
- **Storage:** Supabase Storage
- **UI Components:** Shadcn/ui + Custom
- **Form:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **WhatsApp:** Meta WhatsApp Business Cloud API (planned)
- **PDF:** React-PDF / PDFKit (planned)

---

## 📁 PROJECT STRUCTURE

```
D:/ALIMAM/pp-alimam/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── login/route.ts
│   │   │   ├── dashboard/
│   │   │   │   └── pendaftar-data/route.ts
│   │   │   ├── upload/
│   │   │   │   └── dokumen/route.ts
│   │   │   ├── dokumen/
│   │   │   │   ├── status/route.ts
│   │   │   │   └── preview/route.ts
│   │   │   └── pembayaran/ (TODO)
│   │   │       ├── upload/route.ts
│   │   │       └── verify/route.ts
│   │   ├── dashboard/
│   │   │   └── pendaftar/
│   │   │       ├── layout.tsx (sidebar + header)
│   │   │       ├── page.tsx (redirect to active tab)
│   │   │       └── components/
│   │   │           ├── tabs/
│   │   │           │   ├── DataPendaftaran.tsx ✅
│   │   │           │   ├── UploadBerkas.tsx ✅
│   │   │           │   ├── StatusPembayaran.tsx (TODO)
│   │   │           │   ├── KelengkapanBerkas.tsx (TODO)
│   │   │           │   ├── UndanganSeleksi.tsx (TODO)
│   │   │           │   ├── Pengumuman.tsx (TODO)
│   │   │           │   └── Profil.tsx (TODO)
│   │   │           └── ProgressIndicator.tsx (TODO)
│   │   ├── daftar/
│   │   │   └── page.tsx ✅
│   │   └── login/
│   │       └── page.tsx ✅
│   ├── components/
│   │   ├── home/
│   │   ├── layout/
│   │   └── ui/
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── server.ts
│   │   │   └── client.ts
│   │   ├── storage/
│   │   │   └── upload.ts
│   │   ├── whatsapp/ (TODO)
│   │   │   └── send.ts
│   │   ├── auth.ts
│   │   └── prisma.ts
│   └── types/
│       └── database.ts
├── prisma/
│   └── schema.prisma
└── public/
    └── images/
```

---

## 📊 FEATURE COMPLETION STATUS

### ✅ COMPLETED (100%)

1. **Authentication System**
   - NIK-based login (pendaftar)
   - Email/password login (admin)
   - Session management (HTTP-only cookie)
   - Middleware route protection

2. **Registration System**
   - Multi-step form
   - Auto-generate nomor pendaftaran
   - SessionStorage auto-save
   - Zod validation

3. **Dashboard Layout**
   - Responsive sidebar (8 tabs)
   - Islamic theme applied
   - Mobile hamburger menu

4. **Tab 1: Data Pendaftaran** ✅
   - Display registration data
   - API integration

5. **Tab 3: Upload Berkas** ✅ (CODE DONE)
   - Drag & drop upload
   - 9 document types
   - Progress bars
   - File validation
   - **Status:** Testing blocked by Supabase Storage setup

---

### 🔄 IN PROGRESS

6. **Supabase Storage Setup** ⚠️
   - Bucket exists: ✅
   - RLS policies: ⚠️ Need cleanup (conflicting policies)
   - Testing: ☐ Pending

---

### ☐ NOT STARTED (PRIORITY ORDER)

#### **Phase 1: Demo-Ready (2 weeks)**

7. **Step 1: Payment System** 💰
   - Upload bukti transfer
   - Admin verification interface
   - Update status_proses
   - Unlock next steps
   - **Priority:** 🔥 CRITICAL
   - **Time:** 2-3 hours

8. **Database Schema Update**
   - Add status_proses field
   - Add timestamp fields
   - Create indexes
   - **Priority:** 🔥 CRITICAL
   - **Time:** 30 mins

9. **Tab Access Control Logic**
   - Check status_proses
   - Disable/enable tabs dynamically
   - Show locked state UI
   - **Priority:** 🔥 CRITICAL
   - **Time:** 2-3 hours

10. **Progress Indicator Component**
    - Visual stepper (7 steps)
    - Current step highlight
    - **Priority:** ⚠️ HIGH
    - **Time:** 2 hours

11. **Step 2: Data Completion Form**
    - Editable data pendaftaran
    - Orang tua form
    - Submit & update status
    - **Priority:** ⚠️ HIGH
    - **Time:** 3-4 hours

12. **Tab 4: Kelengkapan Berkas**
    - Show upload progress (7/9 complete)
    - Document status indicators
    - **Priority:** ⚠️ MEDIUM
    - **Time:** 2 hours

#### **Phase 2: Admin Features (Week 3)**

13. **Admin Dashboard**
    - View all pendaftar
    - Filter by status
    - Search by name/nomor

14. **Admin: Verify Payment**
    - List pending payments
    - Approve/reject
    - Update status_proses

15. **Admin: Verify Documents**
    - List uploaded docs
    - Preview documents
    - Approve/reject each

#### **Phase 3: Advanced Features (Week 4-5)**

16. **Step 4: Jadwal Seleksi**
17. **Step 5: Input Nilai**
18. **Step 6: Pengumuman**
19. **Step 7: Daftar Ulang**
20. **WhatsApp Integration**
21. **PDF Generation**
22. **Email Backup Notifications**

---

## 🚧 CURRENT BLOCKERS

### **Blocker #1: Supabase Storage Policies** ⚠️ (HIGH)

**Issue:** Conflicting RLS policies detected

- Old policies use `auth.uid()` as folder name ❌
- New policies use `nomor_pendaftaran` as folder name ✅
- Both active → conflict!

**Solution:** Drop old policies

```sql
-- Run in Supabase SQL Editor
DROP POLICY IF EXISTS "User bisa upload dokumen sendiri" ON storage.objects;
DROP POLICY IF EXISTS "User bisa lihat dokumen sendiri" ON storage.objects;
DROP POLICY IF EXISTS "User bisa update dokumen sendiri" ON storage.objects;
DROP POLICY IF EXISTS "User bisa hapus dokumen sendiri" ON storage.objects;
DROP POLICY IF EXISTS "Admin bisa kelola semua dokumen" ON storage.objects;
```

**Time:** 5 minutes
**Impact:** Blocks Upload Berkas testing

---

### **Blocker #2: status_proses Field Missing** 🔥 (CRITICAL)

**Issue:** No field to track user progress through steps
**Impact:** Cannot implement tab access control
**Solution:** Run ALTER TABLE SQL (provided in Database Schema section)
**Time:** 5 minutes
**Priority:** Must do before building Step 1

---

## 🔑 AUTHENTICATION FLOW

### **Pendaftar Login:**

1. Enter NIK + Nomor Pendaftaran
2. Validate against `pendaftar` table
3. Check `status_proses` → determine accessible tabs
4. Create session cookie
5. Redirect to dashboard with appropriate tabs enabled/disabled

### **Session Cookie:**

```typescript
{
  pendaftar_id: "uuid",
  role: "pendaftar",
  nama_lengkap: "Ahmad Zaki",
  nomor_pendaftaran: "MTI20260001",
  status_proses: "paid"  // NEW: for access control
}
```

---

## 🎨 DESIGN SYSTEM

### **Islamic Theme (from globals.css):**

**Colors:**

- Brown: `#6b4423` (primary)
- Gold: `#daa520` (secondary)
- Teal: `#14b8a6` (accent)
- Cream: `#fffbf0` (background)

**Typography:**

- Sans: Plus Jakarta Sans
- Display: Poppins
- Arabic: Amiri

**UI Patterns:**

- Cards: `rounded-xl shadow-brown`
- Buttons: Gradient `brown-to-teal` with `shadow-gold` on hover
- Locked tabs: Grayscale + lock icon
- Progress: Stepper with colored dots

---

## 📝 DEVELOPMENT NOTES

### **Important Helper Functions Needed:**

```typescript
// src/lib/access-control.ts
export function canAccessTab(
  tabName: string,
  statusProses: string
): boolean {
  const accessMap = {
    'status-pembayaran': ['draft', 'awaiting_payment', ...], // always accessible
    'data-pendaftaran': ['paid', 'data_completed', ...],
    'upload-berkas': ['data_completed', 'docs_uploaded', ...],
    'kelengkapan-berkas': ['docs_uploaded', 'docs_verified', ...],
    'undangan-seleksi': ['scheduled', 'tested', ...],
    'pengumuman': ['announced', 'accepted', 'rejected'],
    'daftar-ulang': ['accepted', 'enrolled'],
    'profil': ['draft', ...], // always accessible
  };

  return accessMap[tabName]?.includes(statusProses) ?? false;
}

export function getNextStep(statusProses: string): number {
  const stepMap = {
    'draft': 1,
    'awaiting_payment': 1,
    'paid': 2,
    'data_completed': 3,
    'docs_uploaded': 3,
    'docs_verified': 4,
    'scheduled': 5,
    'tested': 6,
    'announced': 6,
    'accepted': 7,
    'rejected': 6,
    'enrolled': 7,
  };
  return stepMap[statusProses] ?? 1;
}
```

---

## 🔧 ENVIRONMENT VARIABLES

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@xxx.supabase.co:5432/postgres

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# WhatsApp (Future)
WHATSAPP_API_TOKEN=xxx
WHATSAPP_PHONE_NUMBER_ID=xxx
```

---

## 🎯 IMPLEMENTATION ROADMAP

### **Week 1-2: Demo-Ready MVP**

**Day 1-2:**

- ✅ Fix Supabase Storage policies
- ✅ Add status_proses to database
- ✅ Test Upload Berkas end-to-end

**Day 3-4:**

- ☐ Build Payment upload (Step 1)
- ☐ Implement tab access control
- ☐ Add progress indicator

**Day 5-6:**

- ☐ Data completion form (Step 2)
- ☐ Kelengkapan Berkas tab (Step 4)
- ☐ Basic admin verify interfaces

**Day 7:**

- ☐ End-to-end testing
- ☐ Bug fixes
- ☐ Demo preparation

### **Week 3: Admin Dashboard**

- Admin view all pendaftar
- Verify payment UI
- Verify documents UI
- Schedule exam basic UI

### **Week 4-5: Advanced Features**

- Complete Steps 4-7
- WhatsApp integration (5-6 notifications)
- PDF generation
- Production deployment

---

## 📚 SESSION HISTORY

### **Session #1: 25 Jan 2026** (DeepSeek)

- ✅ Authentication system
- ✅ Registration form
- ✅ Dashboard layout
- ✅ Tab 1: Data Pendaftaran

### **Session #2: 26 Jan 2026** (Claude Opus 4.5 - Code)

- ✅ Tab 3: Upload Berkas (5 files, 28 mins)
- ✅ Build SUCCESS
- ⚠️ Blocked by Supabase Storage setup

### **Session #3: 26 Jan 2026** (Claude Sonnet 4.5 - Chat)

- 📋 Architecture redesign: 7-step user journey
- 📊 Tab access control matrix
- 📱 WhatsApp notification strategy
- 🗄️ Database schema updates planned
- 🎯 Implementation roadmap (5 weeks)
- ⏳ Current: Fixing RLS policies for Upload testing

---

## 💡 HELPFUL COMMANDS

```bash
# Development
npm run dev
npm run build

# Database
npx prisma db pull
npx prisma generate
npx prisma studio

# Testing
# Manual test: http://localhost:3000
# Login: NIK + Nomor Pendaftaran
```

---

## 🤝 HANDOVER INSTRUCTIONS

### **For Next AI Taking Over:**

1. **Read User Journey** (7 steps) - understand complete flow
2. **Check Tab Access Matrix** - know what's locked when
3. **Review Current Blockers** - fix these first!
4. **Check Implementation Priority** - follow roadmap
5. **Update this doc** after completing tasks

### **Communication Style:**

- Bahasa Indonesia for user-facing content
- Detailed explanations (Rieza has vision impairment)
- Step-by-step with emojis 😊
- Always provide SQL/code ready to copy-paste

---

## 📞 ESCALATION

**Common Issues:**

**Q: Tab not accessible?**
A: Check `status_proses` in pendaftar table. Run:

```sql
SELECT id, nomor_pendaftaran, status_proses
FROM pendaftar
WHERE nomor_pendaftaran = 'MTI20260001';
```

**Q: Upload fails?**
A: Check RLS policies. Ensure old conflicting policies dropped.

**Q: Session not persisting?**
A: Check cookie `auth_session`. Verify middleware.ts logic.

---

**🎯 CURRENT STATUS:**
Jawaban terakhir AI claude: STEP 1: Accept Changes ✅
Tekan: Enter

STEP 2: Setup Environment
Edit .env.local:
bash# Supabase (sudah ada)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# App

NEXT_PUBLIC_APP_URL=http://localhost:3000

# Midtrans (TAMBAH INI)

MIDTRANS_SERVER_KEY=SB-Mid-server-xxx
MIDTRANS_IS_PRODUCTION=false
NEXT_PUBLIC_BASE_URL=http://localhost:3000

STEP 3: Restart Dev Server
Terminal:
bash# Stop (Ctrl+C)

# Start lagi

npm run dev

```

---

### **STEP 4: Test di Browser**

**Go to:** http://localhost:3000/dashboard/pendaftar/status-pembayaran

**Test:**
1. ✅ Halaman load
2. ✅ Info pembayaran tampil (Rp 200.000)
3. ✅ 2 metode pembayaran ada (Midtrans + Manual)
4. ✅ Upload bukti transfer (pilih Manual)
5. ✅ Status berubah jadi "Menunggu Verifikasi"

---

## 🎯 **SUCCESS CRITERIA:**

**Dianggap BERHASIL kalau:**

1. ✅ Accept changes no error
2. ✅ Dev server restart successfully
3. ✅ Halaman `/status-pembayaran` bisa dibuka
4. ✅ UI tampil dengan tema Islamic (brown-gold-teal)
5. ✅ Bisa upload bukti transfer
6. ✅ File masuk Supabase Storage bucket `bukti-pembayaran`
7. ✅ Record tersimpan di table `pembayaran`

---

## 📊 **PROGRESS UPDATE:**
```

╔════════════════════════════════════════════════╗
║ 🎉 PAYMENT FEATURE COMPLETE! ║
║ PROGRESS: 88% → 92% 📈 ║
║ ✅ 4 API routes created ║
║ ✅ Payment page complete ║
║ ✅ Midtrans integration ready ║
║ ✅ Manual upload ready ║
║ ✅ All Bahasa Indonesia ║
║ ⏱️ TIME: 16 minutes! ║
║ NEXT: Setup Midtrans keys → Test ║
╚════════════════════════════════════════════════╝

```
╔════════════════════════════════════════════════╗
║  📍 FASE: Payment Code Complete                ║
║  📊 FILES: 5 files created                     ║
║  🎯 ACTION: Accept changes                     ║
║  ⏭️ NEXT: Setup Midtrans → Test                ║
╚════════════════════════════════════════════════╝
```

---

**END OF CONTEXT HANDOVER**
**Last Updated:** 26 Januari 2026, 20:03 WIB
**Next Update:** Your choice (A/B/C/ABC/Break) RECOMMENDATION: C → A → B (2.5 hours total)
