import { db, auth } from "./firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { o11y } from "./observability";

export interface AutoSaveData {
  departure: string;
  arrival: string;
  daysCount: number;
  budgetLevel: string;
  travelStyle: string;
  companion: string;
  travelDate: string;
  travelInterests: string[];
  lang: "vi" | "en";
  chatHistory: Array<{ role: "user" | "model"; text: string }>;
  savedTrips?: any[];
  updatedAt?: string;
}

let lastSavedString = "";
let saveTimeout: any = null;

export const autoSaveManager = {
  /**
   * Saves data to localStorage immediately, and syncs to Firestore on a debounced delay.
   */
  save: (data: AutoSaveData, immediateLocal = true) => {
    try {
      // Avoid saving duplicates by hashing/stringifying and comparing
      const dataToCompare = {
        departure: data.departure,
        arrival: data.arrival,
        daysCount: data.daysCount,
        budgetLevel: data.budgetLevel,
        travelStyle: data.travelStyle,
        companion: data.companion,
        travelDate: data.travelDate,
        travelInterests: [...(data.travelInterests || [])].sort(),
        lang: data.lang,
        chatHistory: data.chatHistory.map(h => ({ role: h.role, text: h.text })),
      };

      const dataStr = JSON.stringify(dataToCompare);
      if (dataStr === lastSavedString) {
        return; // Skip duplicate writes
      }

      const payload = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      if (immediateLocal) {
        localStorage.setItem("vnr_autosave_data", JSON.stringify(payload));
      }

      // Debounce Firestore backup writes
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      saveTimeout = setTimeout(async () => {
        lastSavedString = dataStr;
        const startTime = Date.now();

        // Save local copy
        localStorage.setItem("vnr_autosave_data", JSON.stringify(payload));

        // Firestore Sync (priority: Cloud Backup)
        const user = auth.currentUser;
        if (user && db && typeof db.type === "string" && db.type !== "dummy") {
          try {
            const docRef = doc(db, "autosaves", user.uid);
            await setDoc(docRef, {
              ...payload,
              userId: user.uid,
              serverUpdatedAt: serverTimestamp(),
            }, { merge: true });

            const latency = Date.now() - startTime;
            o11y.logLatency("firestore", "AutoSave Cloud Sync", latency);
          } catch (err) {
            o11y.logError("firestore", "Cloud AutoSave failed", { error: String(err) });
          }
        } else {
          o11y.logInfo("system", "Saved draft locally (Offline/Guest mode)");
        }
      }, 3000); // 3-second debounce window
    } catch (e) {
      o11y.logError("system", "AutoSave process encountered a failure", { error: String(e) });
    }
  },

  /**
   * Restores data from Firestore (if authenticated) or local storage (if guest/offline).
   */
  restore: async (): Promise<Partial<AutoSaveData> | null> => {
    try {
      const startTime = Date.now();
      const user = auth.currentUser;

      // 1. Try cloud backup if online & authenticated
      if (user && db && typeof db.type === "string" && db.type !== "dummy") {
        try {
          const docRef = doc(db, "autosaves", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const cloudData = docSnap.data() as AutoSaveData;
            o11y.logLatency("firestore", "AutoSave Cloud Restore", Date.now() - startTime);
            return cloudData;
          }
        } catch (err) {
          o11y.logWarn("firestore", "Failed restoring cloud auto-save, falling back to local storage", { error: String(err) });
        }
      }

      // 2. Fallback to Local Storage
      const stored = localStorage.getItem("vnr_autosave_data");
      if (stored) {
        const localData = JSON.parse(stored) as AutoSaveData;
        o11y.logInfo("system", "AutoSave data recovered from LocalStorage");
        return localData;
      }
    } catch (e) {
      o11y.logError("system", "AutoSave restore process failed", { error: String(e) });
    }
    return null;
  }
};
