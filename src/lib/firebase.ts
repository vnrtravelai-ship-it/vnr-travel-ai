import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage, ref, uploadBytes, getDownloadURL as storageGetDownloadURL, deleteObject } from "firebase/storage";
import { getAnalytics, logEvent as firebaseLogEvent } from "firebase/analytics";
import firebaseAppletConfig from "../../firebase-applet-config.json";

const appletConfig = firebaseAppletConfig as any;

// Firebase Configuration using Vite Environment Variables and Local Fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || appletConfig.apiKey || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain || "",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || appletConfig.databaseURL || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || appletConfig.appId || "",
};

const hasFirebase = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

if (!hasFirebase) {
  console.log("Firebase disabled (missing configuration)");
}

const hasRealtimeDatabase = !!(
  hasFirebase &&
  firebaseConfig.databaseURL &&
  firebaseConfig.databaseURL.startsWith("https://")
);

if (!hasRealtimeDatabase) {
  console.log("Firebase Realtime Database disabled (missing configuration)");
}

// Initialize Firebase App instance conditionally
export const app = hasFirebase ? initializeApp(firebaseConfig) : null;

// Initialize safe mocks for UI components so they don't throw TypeErrors on null
const createSafeAuthMock = () => {
  return new Proxy({
    currentUser: null,
    onAuthStateChanged: (next: any) => {
      if (typeof next === "function") {
        setTimeout(() => next(null), 0);
      }
      return () => {};
    },
    onIdTokenChanged: (next: any) => {
      if (typeof next === "function") {
        setTimeout(() => next(null), 0);
      }
      return () => {};
    }
  } as any, {
    get(target, prop) {
      if (prop in target) {
        return (target as any)[prop];
      }
      return () => {};
    }
  });
};

const createSafeDbMock = () => {
  const mockDb: any = new Proxy({
    type: "firestore",
    _databaseId: { projectId: "dummy", database: "(default)" }
  }, {
    get(target, prop) {
      if (prop in target) {
        return (target as any)[prop];
      }
      return mockDb;
    }
  });
  return mockDb;
};

// Initialize Firebase services and export them safely
export const auth = app ? getAuth(app) : createSafeAuthMock();

const databaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID || appletConfig.firestoreDatabaseId || "";
export const db = app ? (databaseId && databaseId !== "(default)" ? getFirestore(app, databaseId) : getFirestore(app)) : createSafeDbMock();

export const rtdb =
  hasRealtimeDatabase
    ? getDatabase(app!)
    : null;
export const storage = app ? getStorage(app) : null;

// 3. Firebase App Check integration with reCAPTCHA Enterprise
// Temporarily disabled for compatibility with AI Studio preview environments and sandbox uploads.

// 4. Google Analytics safe initialization and helper
let analytics: any = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    console.warn("Firebase Analytics initialization skipped or failed in sandboxed iframe environment:", err);
  }
}

export function logGoogleAnalyticsEvent(eventName: string, params?: Record<string, any>) {
  if (analytics) {
    try {
      firebaseLogEvent(analytics, eventName, params);
      console.log(`[Google Analytics Event] ${eventName}:`, params);
    } catch (err) {
      console.warn(`[Google Analytics Event Error] ${eventName}:`, err);
    }
  } else {
    console.log(`[Google Analytics Simulation Logging] ${eventName}:`, params);
  }
}

/**
 * Checks if Firebase Storage is fully initialized, supported by the project configuration,
 * and not running in a restricted sandbox preview environment.
 */
export function isStorageAvailable(): boolean {
  try {
    if (!storage) {
      return false;
    }
    const bucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || storage.app?.options?.storageBucket;
    if (!bucket || bucket === "" || bucket.includes("placeholder") || bucket === "your-storage-bucket") {
      return false;
    }
    
    // Check if running in a limited sandbox or iframe preview
    if (typeof window !== "undefined") {
      const isIframe = window.self !== window.top;
      const isDevHost = window.location.hostname.includes("ais-dev-") || window.location.hostname.includes("ais-pre-") || window.location.hostname.includes("run.app");
      const isSandbox = window.location.hostname.includes("sandbox") || window.location.hostname.includes("stackblitz") || window.location.hostname.includes("codesandbox");
      
      if (isIframe || isDevHost || isSandbox) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.warn("Storage availability detection error:", error);
    return false;
  }
}

// 2. Firebase Storage upload, delete, and download url helper mechanics
export async function uploadImage(pathAndFilename: string, fileBytes: Blob | Uint8Array | ArrayBuffer): Promise<string | null> {
  try {
    if (!isStorageAvailable()) {
      console.warn("Firebase Storage is unavailable. Bypassing upload for:", pathAndFilename);
      return null;
    }
    const storageRef = ref(storage, pathAndFilename);
    const result = await uploadBytes(storageRef, fileBytes);
    return await storageGetDownloadURL(result.ref);
  } catch (error) {
    console.warn(`[Storage Safe Fallback] Failed to upload image to path '${pathAndFilename}':`, error);
    return null;
  }
}

export async function deleteImage(pathAndFilename: string): Promise<boolean | null> {
  try {
    if (!isStorageAvailable()) {
      console.warn("Firebase Storage is unavailable. Bypassing delete for:", pathAndFilename);
      return null;
    }
    const storageRef = ref(storage, pathAndFilename);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.warn(`[Storage Safe Fallback] Failed to delete image at path '${pathAndFilename}':`, error);
    return null;
  }
}

export async function getDownloadURL(pathAndFilename: string): Promise<string | null> {
  try {
    if (!isStorageAvailable()) {
      console.warn("Firebase Storage is unavailable. Bypassing getDownloadURL for:", pathAndFilename);
      return null;
    }
    const storageRef = ref(storage, pathAndFilename);
    return await storageGetDownloadURL(storageRef);
  } catch (error) {
    console.warn(`[Storage Safe Fallback] Failed to getDownloadURL for path '${pathAndFilename}':`, error);
    return null;
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Helper to safely prepare the users/{uid}/private/info sub-collection structure
export async function setupPrivateProfile(firebaseUser: any) {
  if (!app || !hasFirebase) {
    return;
  }
  if (!firebaseUser || !firebaseUser.emailVerified) {
    console.warn("Auto-creation of private profile structure bypassed: Email is not verified yet.");
    return;
  }
  const privateDocRef = doc(db, "users", firebaseUser.uid, "private", "info");
  try {
    const docSnap = await getDoc(privateDocRef);
    if (!docSnap.exists()) {
      await setDoc(privateDocRef, {
        userId: firebaseUser.uid,
        email: firebaseUser.email || "",
        phoneNumber: "00000000", // Default matching rules size requirements (8-20 characters)
        emailVerified: true,
        marketingConsent: false,
        updatedAt: serverTimestamp()
      });
      console.log("Successfully prepared public-private profile split under users/{uid}/private/info");
    }
  } catch (err) {
    console.warn("Auto-creation of private profile structure bypassed. (This typically means email is unverified or firestore rules restricted the anonymous write until verified):", err);
  }
}

export default app;
