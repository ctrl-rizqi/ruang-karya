# TASK 6: Refactor & Perluasan Data Siswa

Tujuan: Menambah informasi yang lebih komprehensif pada profil siswa agar portofolio terlihat lebih profesional dan lengkap bagi industri atau pembimbing.

## Plan & Strategi

- [x] **Analisis & Penambahan Field Database:**
    - Menambahkan field baru pada tabel `users`:
        - `gender`: Jenis Kelamin (L/P).
        - `phone`: Nomor Telepon/WhatsApp.
        - `birth_place`: Tempat Lahir (Melengkapi `birth_date`).
        - `bio`: Bio singkat atau rangkuman profesional.
        - `skills`: Keahlian teknis (format array/json).
        - `achievements`: Prestasi yang pernah diraih (format array/json).
        - `interests`: Bidang minat siswa.

- [x] **Migrasi Database:**
    - Membuat migration baru `add_extended_profile_to_users_table`.

- [x] **Refactor Model & Validation:**
    - Update `User` model (fillable, casts).
    - Update Form Request: `UpdateProfileRequest` (untuk siswa) dan `UpdateUserRequest` (untuk guru di dashboard).

- [x] **Refactor UI Form Profil Siswa:**
    - Update `@resources/js/pages/student/profile.tsx`:
        - Menambahkan input Jenis Kelamin (Select).
        - Menambahkan input Tempat Lahir.
        - Menambahkan input Nomor WhatsApp.
        - Menambahkan input Bio (Textarea).
        - Menambahkan input dinamis untuk Skills dan Achievements.

- [x] **Refactor UI Dashboard Guru (Manajemen User):**
    - Update `@resources/js/pages/dashboard/users/form.tsx` agar Guru juga bisa mengedit data tambahan tersebut jika diperlukan.

- [x] **Refactor UI Portofolio Publik:**
    - Update `@resources/js/pages/portfolio/show.tsx` untuk menampilkan Bio, Skills, dan Prestasi agar lebih menarik bagi pengunjung luar.

- [x] **Refactor UI Halaman Home Siswa:**
    - Menyesuaikan tampilan biodata di tab "Tentang Saya" untuk menyertakan informasi baru.
