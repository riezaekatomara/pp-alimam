
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hcknodoayqarjbrzcgrp.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhja25vZG9heXFhcmpicnpjZ3JwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODE3MTg5MywiZXhwIjoyMDgzNzQ3ODkzfQ.FQjPyAkO6TBQRCDI6HnbhE_AqdmfDDgLa1Gpe8kj-9s';

const prisma = new PrismaClient();
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function main() {
    console.log('Start seeding...');

    // 0. SCHEMA PATCH (Temporary Fix for missing columns)
    try {
        console.log('Patching Schema...');
        // ... (existing code)

        // DEBUG CHECK CONSTRAINT
        const constraint = await prisma.$queryRaw`
            SELECT pg_get_constraintdef(oid) AS constraint_def
            FROM pg_constraint
            WHERE conname = 'dokumen_jenis_dokumen_check';
        `;
        console.log('=== CONSTRAINT DEBUG ===');
        console.log(JSON.stringify(constraint, null, 2));
        console.log('========================');

        console.log('Dropping restrictive constraints...');
        await prisma.$executeRawUnsafe(`ALTER TABLE dokumen DROP CONSTRAINT IF EXISTS dokumen_jenis_dokumen_check;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE orang_tua ADD COLUMN IF NOT EXISTS alamat_wali TEXT;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE orang_tua ADD COLUMN IF NOT EXISTS rt_wali TEXT;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE orang_tua ADD COLUMN IF NOT EXISTS rw_wali TEXT;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE orang_tua ADD COLUMN IF NOT EXISTS kelurahan_wali TEXT;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE orang_tua ADD COLUMN IF NOT EXISTS kecamatan_wali TEXT;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE orang_tua ADD COLUMN IF NOT EXISTS kabupaten_wali TEXT;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE orang_tua ADD COLUMN IF NOT EXISTS provinsi_wali TEXT;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE orang_tua ADD COLUMN IF NOT EXISTS kode_pos_wali TEXT;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE orang_tua ADD COLUMN IF NOT EXISTS hubungan_wali TEXT;`);
        console.log('Schema Patched.');
    } catch (e) {
        console.error('Schema Patch Failed (ignoring if unrelated):', e);
    }

    // 1. Seed Tahun Ajaran
    let tahunAjaran = await prisma.tahunAjaran.findFirst({
        where: { is_active: true }
    });

    if (tahunAjaran) {
        console.log('Found existing active Tahun Ajaran:', tahunAjaran.id);
        try {
            tahunAjaran = await prisma.tahunAjaran.update({
                where: { id: tahunAjaran.id },
                data: {
                    nama: '2025/2026',
                    tahun_mulai: 2025,
                    tahun_selesai: 2026,
                }
            });
        } catch (e) {
            console.log('Update active year failed, using as is.');
        }
    } else {
        console.log('No active year found, attempting to create seed year...');
        try {
            tahunAjaran = await prisma.tahunAjaran.upsert({
                where: { id: '11111111-1111-1111-1111-111111111111' },
                update: { is_active: true },
                create: {
                    id: '11111111-1111-1111-1111-111111111111',
                    tahun_mulai: 2025,
                    tahun_selesai: 2026,
                    nama: '2025/2026',
                    is_active: true,
                    tanggal_buka_pendaftaran: new Date('2025-01-01'),
                    tanggal_tutup_pendaftaran: new Date('2025-12-31'),
                    biaya_pendaftaran: 250000,
                },
            });
        } catch (error) {
            tahunAjaran = await prisma.tahunAjaran.findFirst({ where: { is_active: true } });
            if (!tahunAjaran) throw error;
        }
    }

    console.log('Using Tahun Ajaran:', tahunAjaran.nama);

    // 2. Create Users in Supabase Auth & Seed Profiles
    const usersToCreate = [
        { email: 'admin@alimam.com', password: 'password123', role: 'admin', name: 'Super Admin', phone: '081234567890', label: 'ADMIN' },
        { email: 'user.draft@example.com', password: 'password123', role: 'pendaftar', name: 'Ahmad Draft', phone: '081234567891', label: 'DRAFT' },
        { email: 'user.pending@example.com', password: 'password123', role: 'pendaftar', name: 'Budi Pending', phone: '081234567892', label: 'PENDING' },
        { email: 'user.verified@example.com', password: 'password123', role: 'pendaftar', name: 'Citra Verified', phone: '081234567893', label: 'VERIFIED' },
        { email: 'user.completed@example.com', password: 'password123', role: 'pendaftar', name: 'Dewi Completed', phone: '081234567894', label: 'COMPLETED' },
    ];

    const createdUsers: Record<string, string> = {};

    for (const u of usersToCreate) {
        console.log(`Processing user: ${u.email}...`);

        let userId;
        const { data: { users } } = await supabase.auth.admin.listUsers();
        const existingUser = users.find(x => x.email === u.email);

        if (existingUser) {
            userId = existingUser.id;
            console.log(`User exists: ${userId}`);
        } else {
            console.log(`Creating new user...`);
            const { data, error } = await supabase.auth.admin.createUser({
                email: u.email,
                password: u.password,
                email_confirm: true,
                user_metadata: { full_name: u.name }
            });

            if (error) {
                console.error(`Error creating user ${u.email}:`, error.message);
                throw error;
            }
            userId = data.user.id;
        }

        createdUsers[u.label] = userId;

        // Upsert Profile
        await prisma.profile.upsert({
            where: { id: userId },
            update: {
                role: u.role,
                full_name: u.name,
                phone: u.phone
            },
            create: {
                id: userId,
                role: u.role,
                full_name: u.name,
                phone: u.phone
            }
        });
    }

    console.log('Created/Verified Users & Profiles');

    // 3. Seed Pendaftar
    const { ADMIN, DRAFT, PENDING, VERIFIED, COMPLETED } = createdUsers;

    // --- Case 1: Draft (MTs) ---
    console.log('Seeding DRAFT...');
    await prisma.pendaftar.upsert({
        where: { nomor_pendaftaran: 'REG-2025-001' },
        update: {},
        create: {
            user_id: DRAFT,
            tahun_ajaran_id: tahunAjaran.id,
            nomor_pendaftaran: 'REG-2025-001',
            nik: '3201000000000001',
            nama_lengkap: 'Ahmad Draft',
            jenis_kelamin: 'L',
            jenjang: 'MTs',
            status_pendaftaran: 'draft',
            verifikasi_status: 'pending',
        },
    });

    // --- Case 2: Pending (MA) - Represents Payment Verification ---
    console.log('Seeding PENDING...');
    const pendaftarPending = await prisma.pendaftar.upsert({
        where: { nomor_pendaftaran: 'REG-2025-002' },
        update: {},
        create: {
            user_id: PENDING,
            tahun_ajaran_id: tahunAjaran.id,
            nomor_pendaftaran: 'REG-2025-002',
            nik: '3201000000000002',
            nama_lengkap: 'Budi Pending',
            jenis_kelamin: 'L',
            jenjang: 'MA',
            tempat_lahir: 'Jakarta',
            tanggal_lahir: new Date('2010-01-01'),
            alamat: 'Jl. Merdeka No. 1',
            no_hp: '081234567892',
            status_pendaftaran: 'payment_verification',
            verifikasi_status: 'verified',
        },
    });

    await prisma.orangTua.upsert({
        where: { pendaftar_id: pendaftarPending.id },
        update: {},
        create: {
            pendaftar_id: pendaftarPending.id,
            nama_ayah: 'Ayah Budi',
            no_hp_ayah: '08111111111',
        }
    });

    // --- Case 3: Verified (MTs) ---
    console.log('Seeding VERIFIED...');
    const pendaftarVerified = await prisma.pendaftar.upsert({
        where: { nomor_pendaftaran: 'REG-2025-003' },
        update: {},
        create: {
            user_id: VERIFIED,
            tahun_ajaran_id: tahunAjaran.id,
            nomor_pendaftaran: 'REG-2025-003',
            nik: '3201000000000003',
            nama_lengkap: 'Citra Verified',
            jenis_kelamin: 'P',
            jenjang: 'MTs',
            tempat_lahir: 'Bandung',
            tanggal_lahir: new Date('2010-02-02'),
            alamat: 'Jl. Asia Afrika No. 10',
            status_pendaftaran: 'verified',
            verifikasi_status: 'verified',
        },
    });

    // CORRECTED: document types
    const doks = ['kartu_keluarga', 'akta_kelahiran'];
    for (const d of doks) {
        const count = await prisma.dokumen.count({ where: { pendaftar_id: pendaftarVerified.id, jenis_dokumen: d } });
        if (count === 0) {
            await prisma.dokumen.create({
                data: {
                    pendaftar_id: pendaftarVerified.id,
                    jenis_dokumen: d,
                    file_name: `${d}.pdf`,
                    file_path: `uploads/${d}.pdf`,
                    is_verified: true,
                    verified_by: ADMIN,
                    verified_at: new Date(),
                }
            });
        }
    }

    await prisma.pembayaran.deleteMany({ where: { pendaftar_id: pendaftarVerified.id } });
    await prisma.pembayaran.create({
        data: {
            pendaftar_id: pendaftarVerified.id,
            tahun_ajaran_id: tahunAjaran.id,
            metode_pembayaran: 'manual', // CORRECTED: 'manual_transfer' -> 'manual'
            jumlah: 250000,
            status_pembayaran: 'verified',
            verified_by: ADMIN,
            verified_at: new Date(),
        }
    });

    // --- Case 4: Completed (MA) ---
    console.log('Seeding ACCEPTED...');
    const pendaftarCompleted = await prisma.pendaftar.upsert({
        where: { nomor_pendaftaran: 'REG-2025-004' },
        update: {},
        create: {
            user_id: COMPLETED,
            tahun_ajaran_id: tahunAjaran.id,
            nomor_pendaftaran: 'REG-2025-004',
            nik: '3201000000000004',
            nama_lengkap: 'Dewi Completed',
            jenis_kelamin: 'P',
            jenjang: 'MA',
            status_pendaftaran: 'accepted',
            verifikasi_status: 'verified',
        },
    });

    console.log('Seeding finished successfully.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        const fs = await import('fs');
        fs.writeFileSync('seed_error.txt', JSON.stringify(e, null, 2) + '\n' + e.toString());
        await prisma.$disconnect();
        process.exit(1);
    });
