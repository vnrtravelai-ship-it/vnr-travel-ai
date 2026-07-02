import { o11y } from "./observability";

interface RequestState {
  controller: AbortController;
  promise: Promise<any>;
}

class AIOrchestrator {
  private static instance: AIOrchestrator;
  private activeRequests = new Map<string, RequestState>();
  private cache = new Map<string, any>();

  private constructor() {}

  public static getInstance(): AIOrchestrator {
    if (!AIOrchestrator.instance) {
      AIOrchestrator.instance = new AIOrchestrator();
    }
    return AIOrchestrator.instance;
  }

  /**
   * Generates a unique cache key based on prompt parameters.
   */
  private generateKey(endpoint: string, payload: any): string {
    return `${endpoint}:${JSON.stringify(payload)}`;
  }

  /**
   * Executes an optimized AI request.
   * - Aborts any in-flight requests on the same endpoint (concurrency/obsolete control).
   * - Deduplicates and caches identical prompts.
   * - Captures latencies and log events automatically.
   */
  public async executeQuery(endpoint: string, payload: any, fetchFn: (signal: AbortSignal) => Promise<any>): Promise<any> {
    const cacheKey = this.generateKey(endpoint, payload);
    const startTime = Date.now();

    // 1. Check Cache (Deduplication & Cache identical prompts)
    if (this.cache.has(cacheKey)) {
      const cachedResponse = this.cache.get(cacheKey);
      o11y.logInfo("gemini", `Served cached AI response for key: ${cacheKey.substring(0, 60)}...`);
      return cachedResponse;
    }

    // 2. Abort active obsolete request on the same endpoint (Abort obsolete requests)
    if (this.activeRequests.has(endpoint)) {
      const obsolete = this.activeRequests.get(endpoint);
      obsolete?.controller.abort();
      this.activeRequests.delete(endpoint);
      o11y.logInfo("gemini", `Aborted obsolete active generation for endpoint: ${endpoint}`);
    }

    const controller = new AbortController();
    const signal = controller.signal;

    // 3. Initiate the request with retry resilience
    const executeWithRetry = async (retryCount = 2): Promise<any> => {
      try {
        return await fetchFn(signal);
      } catch (err: any) {
        if (err.name === "AbortError") {
          throw err;
        }
        if (retryCount > 0) {
          o11y.logWarn("gemini", `AI call failed, retrying... (${retryCount} retries remaining)`);
          // Wait 1 second before retrying (Exponential/linear retry gap)
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return executeWithRetry(retryCount - 1);
        }
        throw err;
      }
    };

    const promise = executeWithRetry();
    this.activeRequests.set(endpoint, { controller, promise });

    try {
      const result = await promise;
      
      // Save to cache (Cache identical responses)
      this.cache.set(cacheKey, result);

      const latency = Date.now() - startTime;
      o11y.logLatency("gemini", `AI Generation (${endpoint})`, latency);

      return result;
    } catch (err: any) {
      if (err.name === "AbortError") {
        o11y.logInfo("gemini", "In-flight AI request safely aborted as requested.");
      } else {
        o11y.logError("gemini", `AI request failed on endpoint ${endpoint}`, { error: String(err) });
      }
      throw err;
    } finally {
      // Clean up active request slot
      const current = this.activeRequests.get(endpoint);
      if (current && current.controller === controller) {
        this.activeRequests.delete(endpoint);
      }
    }
  }

  /**
   * Safe helper to abort any running request on an endpoint (e.g. if the user cancels or changes input).
   */
  public abortEndpoint(endpoint: string) {
    if (this.activeRequests.has(endpoint)) {
      this.activeRequests.get(endpoint)?.controller.abort();
      this.activeRequests.delete(endpoint);
      o11y.logInfo("gemini", `Explicitly aborted generation on endpoint: ${endpoint}`);
    }
  }
}

export const aiOrchestrator = AIOrchestrator.getInstance();
