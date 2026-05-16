// Import fungsi SDK Firebase menggunakan URL CDN untuk Browser
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Konfigurasi Firebase dari proyek Anda
const firebaseConfig = {
  apiKey: "AIzaSyAODy_elaXrTtPVykpt4AD3bg04Ie_e5CA",
  authDomain: "proyek-web-01.firebaseapp.com",
  projectId: "proyek-web-01",
  storageBucket: "proyek-web-01.firebasestorage.app",
  messagingSenderId: "96907154747",
  appId: "1:96907154747:web:40212831e21cc1a816531e",
  measurementId: "G-NT256FCSXE",
};

// Initialize Firebase App, Auth, dan Database
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Wajib di-export agar bisa dipakai oleh file index.html, dashboard.html, dll
export { app, auth, db, firebaseConfig };
