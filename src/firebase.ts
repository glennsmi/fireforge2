import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

if (import.meta.env.VITE_USE_EMULATORS === 'true') {
  const host = import.meta.env.VITE_EMULATORS_HOST || 'localhost';
  const authPort = Number(import.meta.env.VITE_EMULATORS_AUTH_PORT || 9099);
  const firestorePort = Number(import.meta.env.VITE_EMULATORS_FIRESTORE_PORT || 8080);
  const storagePort = Number(import.meta.env.VITE_EMULATORS_STORAGE_PORT || 9199);
  // Avoid reconnecting in tests/hot reload loops
  // @ts-expect-error no upstream type for _emulatorStarted
  if (!(auth as any)._emulatorStarted) {
    connectAuthEmulator(auth, `http://${host}:${authPort}`);
    // @ts-expect-error
    (auth as any)._emulatorStarted = true;
  }
  connectFirestoreEmulator(db, host, firestorePort);
  connectStorageEmulator(storage, host, storagePort);
}


