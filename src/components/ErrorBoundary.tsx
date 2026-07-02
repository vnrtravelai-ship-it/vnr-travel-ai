import React, { ErrorInfo, ReactNode } from "react";
import { AlertOctagon, RefreshCw, Undo, ShieldAlert } from "lucide-react";
import { db, logGoogleAnalyticsEvent } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  // Explicitly declare component properties to satisfy compiler bindings
  public props!: Props;
  public state!: State;
  public setState!: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  private logCrash = async (errorMsg: string, stack: string = "", source: string = "React Boundary") => {
    // 1. Console Logger
    console.error(`[VNR SRE telemetry] Failure caught (${source}): ${errorMsg}`);

    // 2. Google Analytics crash event logging
    try {
      logGoogleAnalyticsEvent("exception_detected", {
        description: errorMsg,
        fatal: true,
        source: source,
        stackTrace: stack.substring(0, 500)
      });
    } catch (e) {
      console.warn("Could not dispatch exception log to Google Analytics:", e);
    }

    // 3. Firestore Logging
    try {
      if (db) {
        await addDoc(collection(db, "crashes"), {
          message: errorMsg,
          stack: stack,
          source: source,
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent,
          url: window.location.href,
          environment: "production"
        });
        console.log("[VNR SRE] Crash telemetry synced to Firestore crashes collection.");
      }
    } catch (e) {
      console.warn("Could not save fallback crash report to Firestore:", e);
    }
  };

  public componentDidMount() {
    // Dynamic binding of top-level window error monitors
    window.onerror = (message, source, lineno, colno, error) => {
      const errorMsg = message?.toString() || "Unknown Runtime Error";
      const stack = error?.stack || `at ${source}:${lineno}:${colno}`;
      this.logCrash(errorMsg, stack, "window.onerror");
      this.setState({
        hasError: true,
        error: error || new Error(errorMsg),
        errorInfo: { componentStack: stack }
      });
      return false; // let default handling work as well
    };

    window.addEventListener("unhandledrejection", this.handleUnhandledRejection);
  }

  public componentWillUnmount() {
    window.onerror = null;
    window.removeEventListener("unhandledrejection", this.handleUnhandledRejection);
  }

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const error = event.reason;
    const errorMsg = error?.message || error?.toString() || "Unhandled Promise Rejection Event";
    const stack = error?.stack || "No promise rejection stack trace";
    this.logCrash(errorMsg, stack, "unhandledrejection");
    // Warn in console instead of crashing the entire user interface for background network or transaction failures
    console.warn("[VNR SRE telemetry] Caught background promise rejection:", errorMsg, stack);
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.logCrash(error.toString(), errorInfo.componentStack || "", "React componentDidCatch");
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#01411c_0%,transparent_60%)] opacity-30 pointer-events-none" />
          
          <div className="max-w-xl w-full bg-slate-850/80 backdrop-blur-md border border-red-500/30 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center text-red-550 shrink-0 animate-pulse">
                <AlertOctagon className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E65F2B] font-bold block">
                  SRE EMERGENCY SHIELD ACTIVATED
                </span>
                <h2 className="text-lg font-black text-white">VNR Travel AI - Lỗi Giao Diện Trình Diễn</h2>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="text-[9px] font-mono text-slate-500 block uppercase font-black">Exception Diagnostic Log</span>
              <p className="text-xs text-rose-400 font-mono break-all font-bold">
                {this.state.error && this.state.error.toString()}
              </p>
              {this.state.errorInfo && (
                <pre className="text-[9px] text-slate-450 font-mono leading-relaxed overflow-x-auto max-h-40 p-2 bg-slate-950 rounded-lg">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Hệ thống bảo vệ của VNR Travel AI đã tự động khoanh vùng lỗi giao diện để bảo vệ các dữ liệu lập trình mác tàu và giao dịch liên kết của bạn. Hãy nhấn nạp lại trang để kết nối trực tiếp hoặc thoát ra trang chủ.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 bg-[#01411C] hover:bg-green-800 text-white font-extrabold py-3 px-4 rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all shadow-md text-xs"
              >
                <RefreshCw className="w-4 h-4 animate-spin-slow text-yellow-300" />
                NẠP LẠI TRANG THỜI GIAN THỰC
              </button>

              <button
                onClick={this.handleReset}
                className="bg-slate-850 hover:bg-slate-700 text-slate-200 border border-slate-700 font-extrabold py-3 px-5 rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all text-xs"
              >
                <Undo className="w-4 h-4" />
                VỀ TRANG CHỦ
              </button>
            </div>

            <div className="flex justify-between items-center text-[9px] text-slate-500 border-t border-slate-800/60 pt-4 font-mono">
              <span className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> Core VM Shielded</span>
              <span>vnr-travel-ai-v2.0.0</span>
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
