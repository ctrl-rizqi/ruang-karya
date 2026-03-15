# TASK 7: Sistem Like Karya Siswa

Tujuan: Mengimplementasikan fitur apresiasi berupa "Like" pada karya siswa agar tercipta interaksi dan ekosistem apresiasi di platform.

## Plan & Strategi

- [ ] **Database & Migrasi:**
    - Membuat tabel pivot `karya_likes`:
        - `id`
        - `user_id` (foreign key ke users)
        - `karya_id` (foreign key ke karyas)
        - `timestamps`
    - Menambahkan indeks unik pada pasangan `user_id` dan `karya_id` untuk mencegah duplikasi like.

- [ ] **Model & Relationship:**
    - Update `Karya.php`:
        - Relasi `likes()` (BelongsToMany ke User).
        - Attribute `is_liked` (boolean) untuk mendeteksi status like user saat ini.
        - Relasi `likesCount()` atau penggunaan `withCount('likes')`.
    - Update `User.php`:
        - Relasi `likedKaryas()` (BelongsToMany ke Karya).

- [ ] **Backend Controller:**
    - Membuat `KaryaLikeController`:
        - Method `toggle()`: Menambah like jika belum ada, menghapus jika sudah ada (Toggle logic).
        - Memastikan hanya user yang sudah login yang bisa memberikan like.

- [ ] **Routing:**
    - Menambahkan route POST `karya/{karya}/like`.

- [ ] **Refactor UI - Tombol Like:**
    - Membuat komponen `LikeButton.tsx` (Reusable).
    - Update `@resources/js/pages/student/home.tsx`: Menampilkan jumlah like dan tombol like pada kartu karya.
    - Update `@resources/js/pages/portfolio/show.tsx`: Memungkinkan pengunjung login untuk memberikan like.
    - Update `@resources/js/pages/student/karya/index.tsx`.

- [ ] **Optimasi Data:**
    - Eager loading `likes` pada controller terkait untuk menghindari N+1 query.
    - Mengirimkan data `likes_count` dan `is_liked` dari backend ke frontend.
