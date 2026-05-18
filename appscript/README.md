# README - Deploy Apps Script Template

Panduan ini digunakan untuk membuat Apps Script baru dari template `Code.gs`, lalu menghubungkannya ke dashboard melalui halaman **Project Setup**.

## Tujuan

Apps Script dipakai sebagai penghubung antara dashboard dan Google Drive. Dashboard akan memakai Apps Script untuk membaca folder Drive, test akses folder, dan sinkronisasi dokumen/media.

## Yang Dibutuhkan

- Akun Google/Gmail yang akan menjadi owner Apps Script
- Akses ke semua folder Google Drive project
- File template `Code.gs`
- Link dashboard project
- Akun admin dashboard

## 1. Buat Project Apps Script Baru

1. Buka Google Apps Script:
   `https://script.google.com`
2. Klik **New project**.
3. Ganti nama project, contoh:
   `Apps Script - Nama Project Dashboard`
4. Buka file default `Code.gs`.
5. Hapus isi lama.
6. Paste isi dari template `Code.gs`.
7. Klik **Save**.

## 2. Deploy sebagai Web App

1. Klik **Deploy**.
2. Pilih **New deployment**.
3. Klik ikon gear / settings.
4. Pilih type:
   `Web app`
5. Isi description, contoh:
   `Dashboard Drive Connector`
6. Set:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone with the link`
7. Klik **Deploy**.
8. Jika diminta authorization, klik **Authorize access**.
9. Pilih akun Google owner.
10. Jika muncul warning Google, klik **Advanced** lalu **Go to project**.
11. Klik **Allow**.
12. Copy **Web app URL**.

Contoh format URL:

```txt
https://script.google.com/macros/s/XXXXX/exec
```

## 3. Masukkan URL ke Dashboard

1. Buka dashboard project.
2. Login sebagai admin.
3. Buka menu **Project Setup**.
4. Paste URL Apps Script ke field:
   `Apps Script Web App URL`
5. Isi folder Google Drive:
   - Foto
   - Video
   - SketchUp / 3D
   - RKM
   - Kategori dokumen
   - Surat Masuk
   - Surat Keluar
6. Klik **Test Folder**.
7. Jika semua folder OK, klik **Simpan Setup**.

## 4. Test di Halaman Dokumen

1. Buka menu **Dokumen**.
2. Klik **Refresh Drive**.
3. Pastikan dokumen, kategori, RKM preview, dan tombol folder muncul sesuai setup.

## 5. Jika Ada Perubahan Code.gs

Jika template `Code.gs` diperbarui:

1. Buka Apps Script project.
2. Update isi `Code.gs`.
3. Klik **Save**.
4. Klik **Deploy**.
5. Pilih **Manage deployments**.
6. Pilih deployment aktif.
7. Klik ikon edit.
8. Pada bagian version, pilih **New version**.
9. Klik **Deploy**.

Gunakan Web App URL yang sama, tidak perlu ganti URL di dashboard jika deployment yang sama diperbarui.

## 6. Troubleshooting

### Test Folder gagal

Cek:

- Apps Script URL sudah benar
- Apps Script sudah di-deploy sebagai Web App
- Access diset ke `Anyone with the link`
- Execute as diset ke `Me`
- Akun owner Apps Script punya akses ke folder Drive
- Link folder Drive yang dimasukkan benar

### Refresh Drive tidak muncul data

Cek:

- Project Setup sudah disimpan
- Folder Drive tidak kosong
- File di Drive bisa diakses oleh akun Apps Script
- Apps Script tidak error saat dipanggil

### Error authorization

Buka Apps Script, jalankan deploy ulang, lalu authorize lagi dengan akun Google owner.

## Catatan Penting

- Satu project dashboard sebaiknya punya satu Apps Script deployment sendiri.
- Akun Google yang deploy Apps Script harus punya akses ke folder Drive project.

## Ringkasan Cepat

```txt
1. Buka script.google.com
2. New project
3. Paste Code.gs
4. Save
5. Deploy as Web App
6. Execute as: Me
7. Access: Anyone with the link
8. Copy Web App URL
9. Paste URL di Project Setup
10. Isi folder Drive
11. Test Folder
12. Simpan Setup
13. Refresh Drive di halaman Dokumen
```
