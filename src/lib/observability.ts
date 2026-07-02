import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface LogPayload {
  level: "info" | "warn" | "error" | "debug";
  category: "api" | "gemini" | "firestore" | "auth" | "affiliate" | "booking" | "performance" | "system";
  message: string;
  latencyMs?: number;
  metadata?: Record<string, any>;
  stackTrace?: string;
  timestamp: string;
}

const errorGroups = new Map<string, number>();

class ObservabilityManager {
  private static instance: ObservabilityManager;
  private logsQueue: LogPayload[] = [];
  private isSyncing = false;

  private constructor() {
    if (typeof window !== "undefined") {
      this.setupGlobalListeners();
      this.monitorPerformanceMetrics();
    }
  }

  public static getInstance(): ObservabilityManager {
    if (!ObservabilityManager.instance) {
      ObservabilityManager.instance = new ObservabilityManager();
    }
    return ObservabilityManager.instance;
  }

  private setupGlobalListeners() {
    // Intercept JS exceptions
    window.addEventListener("error", (event) => {
      this.logError("system", event.message, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      }, event.error?.stack);
    });

    // Intercept unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      const reason = event.reason;
      const msg = reason?.message || String(reason || "Unhandled Rejection");
      this.logError("system", `Unhandled Rejection: ${msg}`, {}, reason?.stack);
    });
  }

  private monitorPerformanceMetrics() {
    if (!window.performance || !window.PerformanceObserver) return;

    // Monitor Long Tasks
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            this.logInfo("performance", `Long Task Detected: ${entry.duration.toFixed(1)}ms`, {
              name: entry.name,
              entryType: entry.entryType,
              startTime: entry.startTime,
            });
          }
        });
      });
      observer.observe({ entryTypes: ["longtask"] });
    } catch (e) {
      // Ignore if not supported
    }

    // Capture memory info if available
    const memory = (performance as any).memory;
    if (memory) {
      setTimeout(() => {
        this.logInfo("performance", "System memory usage sample", {
          usedJSHeapSizeMb: (memory.usedJSHeapSize / 1024 / 1024).toFixed(1),
          totalJSHeapSizeMb: (memory.totalJSHeapSize / 1024 / 1024).toFixed(1),
          jsHeapSizeLimitMb: (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(1),
        });
      }, 3000);
    }
  }

  private cleanSensitiveData(data: Record<string, any>): Record<string, any> {
    const sensitiveKeys = ["password", "token", "apiKey", "secret", "credential", "auth", "key"];
    const cleaned = { ...data };
    for (const key in cleaned) {
      if (sensitiveKeys.some((s) => key.toLowerCase().includes(s))) {
        cleaned[key] = "[REDACTED_SENSITIVE_DATA]";
      } else if (typeof cleaned[key] === "object" && cleaned[key] !== null) {
        cleaned[key] = this.cleanSensitiveData(cleaned[key]);
      }
    }
    return cleaned;
  }

  private shouldLog(category: string, message: string): boolean {
    const groupKey = `${category}:${message}`;
    const now = Date.now();
    const lastLogged = errorGroups.get(groupKey);

    // Group and throttle duplicates to avoid spamming the database or console (de-duplication)
    if (lastLogged && now - lastLogged < 10000) {
      return false;
    }
    errorGroups.set(groupKey, now);
    return true;
  }

  public logInfo(category: LogPayload["category"], message: string, metadata?: Record<string, any>) {
    this.addLog({
      level: "info",
      category,
      message,
      metadata: metadata ? this.cleanSensitiveData(metadata) : undefined,
      timestamp: new Date().toISOString(),
    });
  }

  public logWarn(category: LogPayload["category"], message: string, metadata?: Record<string, any>) {
    if (!this.shouldLog(category, message)) return;
    this.addLog({
      level: "warn",
      category,
      message,
      metadata: metadata ? this.cleanSensitiveData(metadata) : undefined,
      timestamp: new Date().toISOString(),
    });
  }

  public logError(category: LogPayload["category"], message: string, metadata?: Record<string, any>, stack?: string) {
    if (!this.shouldLog(category, message)) return;
    this.addLog({
      level: "error",
      category,
      message,
      metadata: metadata ? this.cleanSensitiveData(metadata) : undefined,
      stackTrace: stack || new Error().stack,
      timestamp: new Date().toISOString(),
    });
  }

  public logLatency(category: LogPayload["category"], operation: string, latencyMs: number, metadata?: Record<string, any>) {
    this.addLog({
      level: "info",
      category,
      message: `${operation} latency: ${latencyMs}ms`,
      latencyMs,
      metadata,
      timestamp: new Date().toISOString(),
    });
  }

  private addLog(payload: LogPayload) {
    console.log(`[Observability ${payload.level.toUpperCase()}] [${payload.category}] ${payload.message}`, payload.metadata || "");
    this.logsQueue.push(payload);
    this.scheduleSync();
  }

  private async scheduleSync() {
    if (this.isSyncing || this.logsQueue.length === 0) return;
    this.isSyncing = true;

    setTimeout(async () => {
      const batch = this.logsQueue.splice(0, 10);
      try {
        if (db && typeof db.type === "string" && db.type !== "dummy") {
          for (const item of batch) {
            await addDoc(collection(db, "observability_logs"), {
              ...item,
              syncTimestamp: serverTimestamp(),
            });
          }
        }
      } catch (e) {
        // Fallback to local queue storage if offline or firestore rules block
        console.warn("[Observability Sync Fallback] Saving logs offline:", e);
        try {
          const offlineLogs = JSON.parse(localStorage.getItem("vnr_offline_logs") || "[]");
          localStorage.setItem("vnr_offline_logs", JSON.stringify([...offlineLogs, ...batch].slice(-100)));
        } catch (localErr) {
          // absolute fallback
        }
      } finally {
        this.isSyncing = false;
        if (this.logsQueue.length > 0) {
          this.scheduleSync();
        }
      }
    }, 2000);
  }
}

export const o11y = ObservabilityManager.getInstance();
