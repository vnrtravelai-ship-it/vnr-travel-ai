import React from "react";
import DemoPrototype from "../components/DemoPrototype";
import PWAManager from "../components/PWAManager";

export default function RailwayApp() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <div className="w-full min-h-screen">
        <DemoPrototype />
      </div>
      <PWAManager lang="vi" />
    </div>
  );
}
