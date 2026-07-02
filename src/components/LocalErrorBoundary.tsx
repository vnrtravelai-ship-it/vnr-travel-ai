import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { o11y } from "../lib/observability";

interface Props {
  children: ReactNode;
  featureName: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class LocalErrorBoundary extends Component<Props, State> {
  // Explicitly declare component properties to satisfy compiler bindings
  public props!: Props;
  public state!: State;
  public setState!: any;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    o11y.logError(
      "system",
      `Feature Crashed: ${this.props.featureName}`,
      {
        componentStack: errorInfo.componentStack,
        error: error.message,
      },
      error.stack
    );
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center space-y-3 max-w-md mx-auto my-4 shadow-sm">
          <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-700">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-xs text-rose-900 uppercase tracking-wider">
              {this.props.featureName} Gặp Sự Cố
            </h4>
            <p className="text-[11px] text-rose-700 leading-relaxed">
              Tính năng này tạm thời bị gián đoạn. Các khu vực khác của ứng dụng vẫn đang hoạt động ổn định.
            </p>
          </div>
          <button
            onClick={this.handleRetry}
            className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[10px] px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer uppercase"
          >
            <RefreshCw className="w-3 h-3" />
            Thử lại ngay
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
