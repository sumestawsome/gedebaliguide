import { readFileSync, existsSync } from "fs";
import { resolve, join } from "path";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, "utf-8");
    content.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
  }
}

loadEnv();

const projectId =
  process.env.FIREBASE_PROJECT_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  "bali-tour-portfolio";

function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") {
    if (Number.isInteger(val)) return { integerValue: val.toString() };
    return { doubleValue: val };
  }
  if (typeof val === "string") return { stringValue: val };
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(toFirestoreValue) } };
  }
  if (typeof val === "object") {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== undefined) fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

async function writeDocumentViaRest(collectionPath, docId, data) {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionPath}/${docId}`;
  const fields = {};
  for (const [k, v] of Object.entries(data)) {
    fields[k] = toFirestoreValue(v);
  }

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${restAccessToken}`,
    },
    body: JSON.stringify({ fields }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`REST write failed (${response.status}): ${errText}`);
  }
  return await response.json();
}

let adminDb = null;
let restAccessToken = null;

const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  : undefined;

async function getFreshAccessToken(refreshToken) {
  const clientId = "563584335869-fgrhgmd47bqnekij5i8b5pr03ho85qd6.apps.googleusercontent.com"; // Standard Firebase CLI client ID
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.warn("Failed to refresh token with standard clientId, error:", text);
    return null;
  }

  const json = await response.json();
  return json.access_token;
}

const configPath = join(
  process.env.USERPROFILE || process.env.HOME || "",
  ".config",
  "configstore",
  "firebase-tools.json"
);

if (clientEmail && privateKey) {
  let app =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({
          credential: cert({ projectId, clientEmail, privateKey }),
          projectId,
        });
  adminDb = getFirestore(app);
} else if (existsSync(configPath)) {
  const configData = JSON.parse(readFileSync(configPath, "utf-8"));
  if (configData.tokens?.refresh_token) {
    try {
      const freshToken = await getFreshAccessToken(configData.tokens.refresh_token);
      if (freshToken) {
        restAccessToken = freshToken;
      }
    } catch (e) {
      console.warn("Error refreshing token:", e);
    }
  }
  if (!restAccessToken && configData.tokens?.access_token) {
    restAccessToken = configData.tokens.access_token;
  }
}

async function setDoc(collectionName, docId, data) {
  if (adminDb) {
    await adminDb.collection(collectionName).doc(docId).set(data, { merge: true });
  } else if (restAccessToken) {
    await writeDocumentViaRest(collectionName, docId, data);
  } else {
    throw new Error("Tidak ada kredensial Firestore yang valid.");
  }
}

async function syncTheme() {
  const themeData = {
    activePreset: "bali-editorial",
    typography: {
      headingFont: "Libre Baskerville",
      bodyFont: "Inter",
    },
    presets: [
      {
        id: "bali-editorial",
        name: "Bali Editorial",
        colors: {
          brand: "#1878B8",
          trust: "#1878B8",
          secondary: "#0C8C5E",
          accent: "#E67E22",
          canvas: "#FEFDFB",
          surface: "#FFFFFF",
          textPrimary: "#08090A",
          textMuted: "#5E6965",
        },
      },
    ],
    updatedAt: new Date().toISOString(),
  };

  console.log("Updating settings/theme in Firestore...");
  await setDoc("settings", "theme", themeData);
  console.log("SUCCESS: settings/theme updated with new hex codes!");
}

syncTheme().catch((err) => {
  console.error("Error updating theme:", err);
  process.exit(1);
});
