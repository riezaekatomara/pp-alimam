import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase with Service Role Key to bypass RLS
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

function hashOTP(otp: string): string {
    const crypto = require("crypto");
    return crypto.createHash("sha256").update(otp).digest("hex");
}

export async function POST(request: NextRequest) {
    try {
        const { no_hp, otp_code } = await request.json();

        if (!no_hp || !otp_code) {
            return NextResponse.json(
                { success: false, error: "Data tidak lengkap" },
                { status: 400 }
            );
        }

        // NORMALIZE PHONE (Important: must match how it was saved)
        let normalizedPhone = no_hp.replace(/[^\d+]/g, "");
        if (normalizedPhone.startsWith("0")) {
            normalizedPhone = "+62" + normalizedPhone.substring(1);
        }
        if (normalizedPhone.startsWith("8")) {
            normalizedPhone = "+62" + normalizedPhone;
        }
        if (!normalizedPhone.startsWith("+")) {
            normalizedPhone = "+" + normalizedPhone;
        }

        // 1. VERIFY OTP
        const hashedOTP = hashOTP(otp_code);

        const { data: otpRecord, error: otpError } = await supabase
            .from("otp_verifications")
            .select("*")
            .eq("phone", normalizedPhone)
            .eq("otp_hash", hashedOTP)
            .gt("expires_at", new Date().toISOString())
            .single();

        if (otpError || !otpRecord) {
            return NextResponse.json(
                { success: false, error: "Kode OTP salah atau kadaluarsa" },
                { status: 400 }
            );
        }

        // 2. RETRIEVE REGISTRATION DATA
        // Data pendaftaran disimpan di kolom registration_data pada tabel OTP
        const registrationData = JSON.parse(otpRecord.registration_data);

        if (!registrationData) {
            return NextResponse.json(
                { success: false, error: "Data pendaftaran tidak ditemukan" },
                { status: 404 }
            );
        }

        // 3. GENERATE NOMOR PENDAFTARAN
        // Format: [PREFIX][TAHUN][RANDOM]
        // Prefix: MT/IL/MA + I(Ikhwan)/A(Akhwat)
        const year = new Date().getFullYear();
        const prefix = registrationData.jenis_kelamin === "L"
            ? (registrationData.jenjang === "MTs" ? "MTI" : registrationData.jenjang === "IL" ? "ILI" : "MAI")
            : (registrationData.jenjang === "MTs" ? "MTA" : registrationData.jenjang === "IL" ? "ILA" : "MAA");

        // Generate random 4 digit
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const nomorPendaftaran = `${prefix}${year}${randomNum}`;

        // 4. GET ACTIVE TAHUN AJARAN & USER ID (To satisfy FK constraints)

        // Get Active Tahun Ajaran
        const { data: activeTahunAjaran, error: taError } = await supabase
            .from("tahun_ajaran")
            .select("id")
            .eq("is_active", true)
            .single();

        let tahunAjaranId = "";
        if (activeTahunAjaran) {
            tahunAjaranId = activeTahunAjaran.id;
        } else {
            // Fallback: Get ANY tahun ajaran if no active one (just to prevent crash, though logic might be wrong)
            const { data: anyTahunAjaran } = await supabase
                .from("tahun_ajaran")
                .select("id")
                .limit(1)
                .single();
            if (anyTahunAjaran) {
                tahunAjaranId = anyTahunAjaran.id;
            } else {
                return NextResponse.json({ success: false, error: "Tidak ada data Tahun Ajaran aktif. Hubungi admin." }, { status: 500 });
            }
        }

        let userId = "";

        // Check user by phone
        const { data: existingUser } = await supabase
            .from("profiles")
            .select("id")
            .eq("phone", normalizedPhone)
            .single();

        if (existingUser) {
            userId = existingUser.id;
        } else {
            // Create Auth User via Admin API
            const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
                phone: normalizedPhone,
                email_confirm: true,
                phone_confirm: true,
                user_metadata: { full_name: registrationData.nama_lengkap }
            });

            if (authError || !authUser.user) {
                console.error("Failed to create auth user:", authError);
                return NextResponse.json({ success: false, error: "Gagal membuat akun pengguna: " + (authError?.message || "Unknown error") }, { status: 500 });
            }
            userId = authUser.user.id;
        }

        // 5. INSERT TO PENDAFTAR
        const { data: pendaftar, error: insertError } = await supabase
            .from("pendaftar")
            .insert({
                nik: registrationData.nik,
                nama_lengkap: registrationData.nama_lengkap,
                nisn: "",
                tempat_lahir: "",
                tanggal_lahir: new Date(registrationData.tanggal_lahir),
                jenis_kelamin: registrationData.jenis_kelamin,
                alamat: "",
                jenjang: registrationData.jenjang,
                no_hp: registrationData.no_hp,
                email: "",
                status_pendaftaran: "draft",

                user_id: userId,
                tahun_ajaran_id: tahunAjaranId,
                nomor_pendaftaran: nomorPendaftaran,
            })
            .select() // Add select to return the inserted data
            .single();

        if (insertError) {
            console.error("Insert Pendaftar Error:", insertError);
            return NextResponse.json(
                { success: false, error: "Gagal membuat data pendaftar: " + insertError.message },
                { status: 500 }
            );
        }

        // 6. DELETE USED OTP
        await supabase.from("otp_verifications").delete().eq("id", otpRecord.id);

        return NextResponse.json({
            success: true,
            data: {
                nomor_pendaftaran: nomorPendaftaran,
                nama_lengkap: registrationData.nama_lengkap,
                jenjang: registrationData.jenjang,
                jenis_kelamin: registrationData.jenis_kelamin,
                nik: registrationData.nik,
                otp_id: otpRecord.id
            }
        });

    } catch (error: any) {
        console.error("Verify API Error:", error);
        return NextResponse.json(
            { success: false, error: "Terjadi kesalahan internal server" },
            { status: 500 }
        );
    }
}
