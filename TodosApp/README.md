# TodosApp - CRUD React Native + Expo + Firebase Firestore

## Cara menjalankan

1. Buat project Expo baru:
   npx create-expo-app@latest TodosApp --template blank
   cd TodosApp

2. Install dependensi:
   npx expo install firebase @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context @expo/vector-icons

3. Salin file dari folder ini ke project (timpa App.js): App.js, config.js, folder Screens/

4. Siapkan Firebase:
   - Buka https://console.firebase.google.com, buat project
   - Build > Firestore Database > Create database (pilih test mode untuk belajar)
   - Project settings > Add app (Web </>) > salin firebaseConfig ke config.js
   - Collection "todos" akan otomatis terbuat saat Anda menambah todo pertama

5. Jalankan:
   npx expo start
   Scan QR dengan aplikasi Expo Go (HP), atau tekan "a" untuk emulator Android.

## Rules Firestore (hanya untuk belajar)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{id} { allow read, write: if true; }
  }
}

## Pemetaan CRUD
- Create : addTodo()    di Screens/Home.js
- Read   : onSnapshot() di Screens/Home.js (useEffect)
- Update : updateTodo() di Screens/Detail.js
- Delete : deleteTodo() di Screens/Home.js
