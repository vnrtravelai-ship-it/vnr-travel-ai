import React, { useState, useEffect, Suspense, lazy } from "react";
import RailwayApp from "./app/RailwayApp";

// Lazy-load the developer workspace to guarantee zero-overhead on Production builds
const InternalWorkspace = lazy(() => import("./app/InternalWorkspace"));

export default function App() {
  const [showInternal, setShowInternal] = useState<boolean | null>(null);

  useEffect(() => {
    let displayInternal = false;
    
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("internal") === "true") {
        displayInternal = true;
      }
    }
    
    setShowInternal(displayInternal);
  }, []);

  // Soft fallback while environment flags and search parameters resolve
  if (showInternal === null) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (showInternal) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-4 border-[#01411C] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-550 font-medium font-mono">Khởi chạy bảng quản trị... / Loading Admin...</p>
        </div>
      }>
        <InternalWorkspace />
      </Suspense>
    );
  }

  return <RailwayApp />;
}
