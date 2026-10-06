import { initializeApp, getApps, getApp, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

/**
 * Singleton factory untuk inisialisasi Firebase Admin SDK di lingkungan Next.js Server.
 * Aman dari re-inisialisasi duplikat pada hot reload maupun serverless invocation.
 */
function getFirebaseAdminApp(): App {
  if (getApps().length > 0) {
    return getApp();
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    "bali-tour-portfolio";

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined;

  // Jika Service Account Key lengkap disediakan
  if (clientEmail && privateKey) {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
    });
  }

  // Fallback: inisialisasi dengan Project ID (misal via Google Application Default Credentials)
  return initializeApp({
    projectId,
  });
}

const adminApp: App = getFirebaseAdminApp();
const adminDb: Firestore = getFirestore(adminApp);
const adminAuth: Auth = getAuth(adminApp);

export { adminApp, adminDb, adminAuth };
export default adminDb;
