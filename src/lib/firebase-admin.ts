import { initializeApp, getApps, getApp, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

/**
 * Singleton factory untuk inisialisasi Firebase Admin SDK di lingkungan Next.js Server.
 * Aman dari re-inisialisasi duplikat pada hot reload maupun serverless invocation.
 * Menggunakan lazy initialization agar tidak memicu unhandled exception saat kredensial belum tersedia.
 */
let adminAppInstance: App | null = null;
let adminDbInstance: Firestore | null = null;
let adminAuthInstance: Auth | null = null;

export function getFirebaseAdminApp(): App | null {
  try {
    if (adminAppInstance) return adminAppInstance;
    if (getApps().length > 0) {
      adminAppInstance = getApp();
      return adminAppInstance;
    }

    const projectId =
      process.env.FIREBASE_PROJECT_ID ||
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
      "guidebali";

    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined;

    // Jika Service Account Key lengkap disediakan
    if (clientEmail && privateKey) {
      adminAppInstance = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        projectId,
      });
      return adminAppInstance;
    }

    // Fallback: inisialisasi dengan Project ID
    adminAppInstance = initializeApp({
      projectId,
    });
    return adminAppInstance;
  } catch (err) {
    console.warn("Peringatan: Inisialisasi Firebase Admin SDK dilewati:", err);
    return null;
  }
}

export function getAdminFirestore(): Firestore | null {
  if (adminDbInstance) return adminDbInstance;
  const app = getFirebaseAdminApp();
  if (!app) return null;
  try {
    adminDbInstance = getFirestore(app);
    return adminDbInstance;
  } catch {
    return null;
  }
}

export function getAdminAuth(): Auth | null {
  if (adminAuthInstance) return adminAuthInstance;
  const app = getFirebaseAdminApp();
  if (!app) return null;
  try {
    adminAuthInstance = getAuth(app);
    return adminAuthInstance;
  } catch {
    return null;
  }
}

// Proksi aman untuk kompatibilitas ke belakang tanpa crash saat import
export const adminApp = new Proxy({} as App, {
  get(_, prop) {
    const app = getFirebaseAdminApp();
    return app ? (app as any)[prop] : undefined;
  },
});

export const adminDb = new Proxy({} as Firestore, {
  get(_, prop) {
    const db = getAdminFirestore();
    return db ? (db as any)[prop] : undefined;
  },
});

export const adminAuth = new Proxy({} as Auth, {
  get(_, prop) {
    const auth = getAdminAuth();
    return auth ? (auth as any)[prop] : undefined;
  },
});

export default adminDb;
