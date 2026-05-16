# README - Setup Dashboard Baru

Tujuan dokumen ini: panduan singkat untuk menyiapkan 1 dashboard baru dengan database, link, Apps Script, dan Google Drive yang terpisah.

## Konsep Singkat

```
1 proyek = 1 Firebase Project + 1 Firestore Database + 1 Hosting URL + 1 Apps Script + 1 Google Drive Folder
```

Source code dashboard boleh dicopy dari template lama, tetapi Firebase config dan Project Setup harus diganti untuk proyek baru.

---

## 1. Yang Perlu Disiapkan

- Akun Gmail owner/admin Firebase.
- Source code dashboard terbaru.
- Node.js LTS dan Firebase CLI di 1 device teknis saja.
- Google Drive folder proyek baru.
- Apps Script template lama yang sudah berjalan.
- Email admin pertama untuk proyek baru.

User biasa tidak perlu Node.js, npm, atau Firebase CLI. Mereka hanya perlu browser dan link dashboard.

---

## 2. Install di Device Teknis

### Windows

Install Node.js LTS dari website resmi Node.js.

Cek di PowerShell:

```powershell
node -v
npm -v
```

Install Firebase CLI:

```powershell
npm install -g firebase-tools
firebase --version
firebase login
firebase projects:list
```

Login dengan Gmail yang punya akses ke Firebase project.

---

## 3. Buat Firebase Project Baru

Di Firebase Console:

1. Klik Add project.
2. Buat nama project, contoh: `project-web-002`.
3. Masuk ke project baru.
4. Add app -> pilih Web `</>`.
5. Copy Firebase config.

Aktifkan layanan:

- Authentication -> Sign-in method -> Email/Password -> Enable.
- Firestore Database -> Create database -> Production mode -> region `asia-southeast1`.
- Hosting akan dipakai lewat Firebase CLI.

---

## 4. Update Source Code

Pastikan struktur folder seperti ini:

```
dashboard-project/
├─ firebase.json
├─ .firebaserc
├─ firestore.rules
├─ firestore.indexes.json
└─ public/
   ├─ index.html
   ├─ dashboard.html
   ├─ documents.html
   ├─ setup.html
   ├─ users.html
   ├─ firebase-config.js
   ├─ ui.css
   └─ 404.html
```

### Update `public/firebase-config.js`

Ganti config lama dengan config dari Firebase project baru.

Pastikan `projectId` sudah benar, contoh:

```js
projectId: "project-web-002"
```

Jangan hapus bagian export:

```js
export { app, auth, db, firebaseConfig };
```

### Update `.firebaserc`

Isi dengan project ID baru:

```json
{
  "projects": {
    "default": "project-web-002"
  }
}
```

---

## 5. Inisialisasi Firebase CLI

Kalau folder sudah punya `firebase.json`, `.firebaserc`, dan `firestore.rules`, biasanya tidak perlu `firebase init` lagi.

Cukup jalankan:

```powershell
firebase use project-web-002
```

Kalau tetap perlu `firebase init`, pilih hanya:

- Firestore
- Hosting

Jawaban penting:

- Public directory: `public`
- Single-page app rewrite: `No`
- GitHub automatic deploy: `No`
- Kalau diminta overwrite file lama: pilih `No`

Jangan pilih:

- App Hosting
- Functions
- SQL Connect
- Genkit
- AI Logic
- Realtime Database

---

## 6. Deploy Website dan Rules

Jalankan dari folder project:

```powershell
firebase deploy --only hosting,firestore:rules
```

Setelah berhasil, Firebase akan memberi link seperti:

```
https://project-web-002.web.app
```

---

## 7. Buat Admin Pertama

Admin pertama harus dibuat manual 1 kali di Firebase Console.

### A. Buat user login

Firebase Console -> Authentication -> Users -> Add user.

Contoh:

```
Email: admin@client.com
Password: password sementara
```

Copy UID user tersebut.

### B. Buat role admin di Firestore

Firestore Database -> Data -> Start collection.

Collection ID:

```
users
```

Document ID: paste UID dari Authentication.

Fields:

| Field | Type | Value |
|---|---|---|
| name | string | Client Admin |
| email | string | admin@client.com |
| role | string | admin |
| active | boolean | true |
| status | string | active |

Catatan: `active` harus boolean `true`, bukan string `"true"`.

Setelah admin pertama berhasil login, user berikutnya bisa dibuat dari halaman User Management di website.

---

## 8. Setup Apps Script dan Google Drive

### Google Drive

Buat folder proyek baru, contoh:

```
Project Name - Dashboard Drive
├─ 01_RKM
├─ 02_Administrasi
├─ 03_Uji_Mutu
├─ 04_Checklist_Bangunan_Gedung
├─ 05_Material_Approval
├─ 06_Shop_Drawing
├─ 07_RFI
├─ 08_MC-0
├─ 09_Addendum
├─ 10_TKDN
├─ 11_HSE_K3
├─ 12_Evaluasi_Kinerja
├─ Media
│  ├─ Foto
│  ├─ Video
│  └─ SketchUp_3D
└─ Surat
   ├─ Surat_Masuk
   └─ Surat_Keluar
```

### Apps Script

1. Copy Apps Script template lama.
2. Deploy -> New deployment -> Web app.
3. Execute as: Me.
4. Who has access: Anyone with the link.
5. Copy Web App URL.

Folder Drive tidak perlu diedit manual di code jika setup dilakukan dari halaman Project Setup.

---

## 9. Setup dari Website

Login ke dashboard sebagai admin.

Buka:

```
Project Setup
```

Isi:

- Project ID
- Project Name
- Apps Script Web App URL
- Folder Foto
- Folder Video
- Folder SketchUp / 3D
- Folder RKM
- Folder kategori dokumen
- Folder Surat Masuk
- Folder Surat Keluar

Lalu klik:

1. Test Folder
2. Simpan Setup

Setelah itu buka halaman Dokumen dan klik:

```
Refresh Drive
```

---

## 10. Checklist Validasi

Sebelum handover, pastikan:

- Login admin berhasil.
- Menu User Management dan Project Setup muncul.
- Project Setup bisa Test Folder dan Simpan Setup.
- Dokumen bisa Refresh Drive.
- Dashboard terbuka tanpa error permission.
- Executive Summary bisa disimpan.
- S-Curve bisa input/upload.
- Checklist bisa digunakan.
- Arsip Mingguan bisa dibuka.
- User viewer bisa login dan tidak melihat tombol admin.

Console browser tidak boleh ada error:

```
FirebaseError: Missing or insufficient permissions
```

Warning Tailwind CDN atau log SketchUp/Trimble masih boleh selama fitur terlihat berjalan.

---

## Ringkasan Paling Pendek

Untuk proyek baru:

1. Buat Firebase project baru.
2. Enable Authentication, Firestore, Hosting.
3. Copy source code dashboard.
4. Ganti `firebase-config.js`.
5. Ganti `.firebaserc`.
6. Deploy `hosting` dan `firestore:rules`.
7. Buat admin pertama manual di Firebase.
8. Copy dan deploy Apps Script.
9. Login ke website.
10. Isi Project Setup.
11. Test Folder dan Simpan Setup.
12. Refresh Drive.
13. Test admin dan viewer.
14. Handover link dashboard ke client.
