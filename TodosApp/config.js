// Firebase v9+ (modular API) - kompatibel dengan Expo terbaru
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// GANTI dengan konfigurasi dari Firebase Console
// (Project settings > General > Your apps > SDK setup and configuration)
const firebaseConfig = {
  apiKey: 'AIzaSyAEc-hKMrmEiwEGRJVAp3i_cH_fYVJ2eWo',
  authDomain: 'todosapp-a3726.firebaseapp.com',
  projectId: 'todosapp-a3726',
  storageBucket: 'todosapp-a3726.firebasestorage.app',
  messagingSenderId: '543632688339',
  appId: '1:543632688339:web:218ca7dd93aa3520030026',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
