# 📋 Todo App

Aplikasi todolist sederhana dgn stack:
- Frontend: React + Vite + TypeScript + TailwindCSS
- Backend: FastAPI (Python)
- Database: PostgreSQL

## 🚀 Cara Menjalankan Aplikasi

### Prasyarat
- Docker & Docker Compose udh terinstall di komputermu
- Port 3000, 8000, dan 5432 gak lagi dipake aplikasi lain

### Langkah-langkah

1. Clone repository ini
   ```bash
   git clone https://github.com/rfflsy16/FS_ISI_TEST_SILABAN_RAFLES_YOHANES.git
   ```

2. Jalanin aplikasi pake Docker Compose
   ```bash
   docker-compose up -d
   ```
   > ℹ️ Perintah ini akan build dan jalanin semua container (frontend, backend, database)

3. Tunggu bentar sampe semua container jalan dengan baik (biasanya 1-2 menit)

4. Aplikasi bisa diakses di:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Database: PostgreSQL di port 5432

5. Untuk menghentikan aplikasi:
   ```bash
   docker-compose down
   ```

## 🔄 Alur Penggunaan Aplikasi

1. Buka http://localhost:3000 di browser
2. Kamu akan melihat 2 bagian utama:
   - Form untuk menambah task baru
   - Daftar task (ongoing dan completed)

3. **Menambah Task Baru**:
   - Isi judul task di form input
   - Klik tombol "Add Task"

4. **Mengedit Task**:
   - Klik icon pensil (✏️) di samping judul task
   - Form akan berubah jadi mode edit
   - Ubah judul task
   - Klik "Update Task" untuk menyimpan perubahan
   - Klik "Cancel" untuk membatalkan

5. **Menyelesaikan Task**:
   - Klik icon lingkaran (⭕) di ongoing task
   - Task akan pindah ke bagian "Completed Task"

6. **Menghapus Task**:
   - Klik icon silang (❌) di samping task
   - Task akan dihapus permanen

## 🔧 API Endpoints

Backend API tersedia di http://localhost:8000 dengan endpoint:

- `GET /api/tasks`: Mendapatkan semua task
- `GET /api/tasks/ongoing`: Mendapatkan task yg belum selesai
- `GET /api/tasks/completed`: Mendapatkan task yg sudah selesai
- `POST /api/tasks`: Membuat task baru
- `PUT /api/tasks/{id}`: Update task
- `DELETE /api/tasks/{id}`: Hapus task

## 🛠️ Troubleshooting

1. **Frontend Error**:
   - Cek logs: `docker-compose logs frontend`
   - Pastikan backend berjalan dgn baik

2. **Backend Error**:
   - Cek logs: `docker-compose logs backend`
   - Pastikan koneksi database ok

3. **Database Error**:
   - Cek logs: `docker-compose logs db`
   - Coba restart container: `docker-compose restart db`

---

Selamat mencoba! 🎉
