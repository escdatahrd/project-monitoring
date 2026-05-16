# README - Setup Dashboard Proyek Baru

Dokumen ini menjelaskan langkah-langkah untuk menyiapkan dashboard untuk proyek baru.

**Konsep utama:**

- 1 proyek = 1 Firebase project, 1 database, 1 link dashboard, 1 Apps Script, dan 1 struktur Google Drive.
- Source code dashboard boleh dicopy dari template lama.
- Nama Firebase project bebas mengikuti nama proyek yang sedang dijalankan. Contoh: `dashboard-rs-manado-2026`, `dashboard-gedung-abc`, atau nama lain yang mudah dikenali.
- Setelah website berhasil dideploy, pengaturan Drive dan Apps Script dilakukan dari halaman **Project Setup** di website.

---

## 1. Siapkan 1 Device Teknis

Device teknis hanya dipakai untuk deploy/update website. User biasa tidak perlu install apa pun.

Install:

1. Node.js LTS
2. Firebase CLI
3. Browser Chrome/Edge
4. Source code dashboard terbaru

Cek Node.js dan npm:

```powershell
node -v
npm -v
```

Install Firebase CLI:

```powershell
npm install -g firebase-tools
firebase --version
```

Login Firebase:

```powershell
firebase login
firebase projects:list
```

---

## 2. Buat Firebase Project Baru

Di Firebase Console, klik **Add project**.

Nama project bebas mengikuti nama proyek yang dikerjakan. Gunakan nama yang jelas, misalnya:

```txt
dashboard-nama-proyek
dashboard-nama-client-2026
dashboard-rkm-nama-proyek
```

Setelah project dibuat, aktifkan layanan berikut:

1. **Authentication** - pilih Email/Password.
2. **Firestore Database** - pilih region `asia-southeast1`.
3. **Hosting** - untuk link website dashboard.

---

## 3. Daftarkan Web App

Di Firebase Console:

```txt
Project Overview -> Add app -> Web
```

Isi nickname bebas, misalnya:

```txt
Dashboard Web App
```

Firebase akan memberikan `firebaseConfig`.

Copy config tersebut, lalu ganti isi config lama di file:

```txt
public/firebase-config.js
```

Yang diganti hanya bagian:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

Bagian export di bawahnya jangan dihapus.

---

## 4. Hubungkan Folder Source Code ke Firebase Project

Buka file:

```txt
.firebaserc
```

Isi dengan Firebase Project ID yang baru dibuat:

```json
{
  "projects": {
    "default": "ISI_DENGAN_FIREBASE_PROJECT_ID"
  }
}
```

Contoh Project ID harus menyesuaikan project yang dibuat klien. Jangan wajib memakai nama contoh tertentu.

---

## 5. Deploy Website dan Rules

Buka terminal di folder source code dashboard.

Pastikan folder memiliki struktur seperti ini:

```txt
firebase.json
.firebaserc
firestore.rules
firestore.indexes.json
public/
```

Jalankan:

```powershell
firebase use ISI_DENGAN_FIREBASE_PROJECT_ID
firebase deploy --only hosting,firestore:rules
```

Setelah berhasil, Firebase akan menampilkan link website, misalnya:

```txt
https://nama-project.web.app
```

Link ini adalah link dashboard untuk proyek tersebut.

---

## 6. Buat Admin Pertama

Admin pertama harus dibuat sekali dari Firebase Console. Setelah itu, admin bisa membuat user lain dari website.

### A. Buat user login

Firebase Console:

```txt
Authentication -> Users -> Add user
```

Isi email dan password awal.

Setelah user dibuat, copy **UID** user tersebut.

### B. Buat data role admin

Firebase Console:

```txt
Firestore Database -> Data -> Start collection
```

Collection ID:

```txt
users
```

Document ID:

```txt
PASTE_UID_DARI_AUTHENTICATION
```

Isi field berikut:

| Field    | Type    | Value       |
| -------- | ------- | ----------- |
| `name`   | string  | Nama Admin  |
| `email`  | string  | email admin |
| `role`   | string  | admin       |
| `active` | boolean | true        |
| `status` | string  | active      |

Catatan: field `active` harus type **boolean**, bukan string.

---

## 7. Apps Script dan Google Drive

Untuk setiap proyek, siapkan:

1. Google Drive folder proyek.
2. Copy Apps Script template lama.
3. Deploy Apps Script sebagai Web App.
4. Copy Apps Script Web App URL.

Contoh struktur Drive:

```txt
Project Drive
├─ RKM
├─ Administrasi
├─ Uji Mutu
├─ Shop Drawing
├─ RFI
├─ HSE/K3
├─ Media Foto
├─ Media Video
├─ SketchUp / 3D
├─ Surat Masuk
└─ Surat Keluar
```

Folder boleh disesuaikan dengan kebutuhan proyek.

---

## 8. Setup dari Website

Setelah website sudah bisa dibuka, login sebagai admin.

Buka:

```txt
Project Setup
```

Isi:

1. Project ID
2. Nama Project
3. Apps Script Web App URL
4. Folder Foto
5. Folder Video
6. Folder SketchUp / 3D
7. Folder RKM
8. Kategori dokumen dan folder Drive masing-masing
9. Folder Surat Masuk
10. Folder Surat Keluar

Klik:

```txt
Test Folder
```

Jika sudah benar, klik:

```txt
Simpan Setup
```

Setelah itu buka halaman **Dokumen**, lalu klik **Refresh Drive**.

---

## 9. Tambah User Lain dari Website

Setelah admin pertama berhasil login, user berikutnya bisa dibuat dari website:

```txt
User Management -> Tambah User
```

Role yang tersedia:

- `admin` - akses penuh
- `viewer` - lihat data saja
- `contractor` - akses tim kontraktor

---

## Ringkasan Cepat

```txt
1. Install Node.js + Firebase CLI di 1 device teknis.
2. Buat Firebase project baru sesuai nama proyek.
3. Aktifkan Authentication, Firestore, dan Hosting.
4. Daftarkan Web App dan copy firebaseConfig.
5. Update public/firebase-config.js.
6. Update .firebaserc dengan Project ID baru.
7. Deploy hosting dan firestore rules.
8. Buat admin pertama di Authentication dan Firestore.
9. Deploy/copy Apps Script template.
10. Login ke website dan isi Project Setup.
11. Tambah user lain dari User Management.
```

---

## Catatan Penting

- User biasa hanya membutuhkan link dashboard dan akun login.
- Node.js, npm, dan Firebase CLI hanya dibutuhkan di device teknis untuk deploy.
- Klien boleh menamai Firebase project sesuai nama proyek yang sedang dikerjakan.
- Untuk kebutuhan audit, setiap proyek sebaiknya punya Firebase project, database, Hosting URL, Apps Script, dan Drive folder masing-masing.
