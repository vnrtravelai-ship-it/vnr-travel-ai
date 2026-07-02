import React from "react";

interface SkeletonProps {
  className?: string;
}

export function Shimmer({ className = "" }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden bg-slate-100 rounded-lg ${className}`}>
      {/* Absolute shimmer gloss highlight overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="p-6 md:p-10 lg:p-12 w-full space-y-6">
      <Shimmer className="h-6 w-32" />
      <Shimmer className="h-12 w-3/4 max-w-xl" />
      <Shimmer className="h-4 w-5/6 max-w-2xl" />
      <Shimmer className="h-4 w-2/3 max-w-lg" />
      <div className="flex gap-4 pt-2">
        <Shimmer className="h-12 w-40 rounded-xl" />
        <Shimmer className="h-12 w-36 rounded-xl" />
      </div>
    </div>
  );
}

export function ItinerarySkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-150 overflow-hidden text-left shadow-sm p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Shimmer className="h-5 w-28 rounded-md" />
          <Shimmer className="h-4 w-24 rounded-md" />
        </div>
        <Shimmer className="h-7 w-3/4 rounded-lg" />
        <Shimmer className="h-4 w-5/6 rounded-md" />
      </div>

      {/* Tabs Row */}
      <div className="flex gap-2 border-b border-slate-100 pb-2">
        <Shimmer className="h-8 w-20 rounded-lg" />
        <Shimmer className="h-8 w-24 rounded-lg" />
        <Shimmer className="h-8 w-28 rounded-lg" />
      </div>

      {/* Days Lists or Schedule Elements */}
      <div className="space-y-4 pt-2">
        <div className="flex gap-4 items-start">
          <Shimmer className="w-10 h-10 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-5 w-1/3 rounded-md" />
            <Shimmer className="h-4 w-full rounded-md" />
            <Shimmer className="h-4 w-5/6 rounded-md" />
          </div>
        </div>
        <div className="flex gap-4 items-start pt-4 border-t border-slate-50">
          <Shimmer className="w-10 h-10 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-5 w-1/4 rounded-md" />
            <Shimmer className="h-4 w-full rounded-md" />
          </div>
        </div>
      </div>

      {/* Price / Summary Box */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex justify-between items-center">
        <div className="space-y-2">
          <Shimmer className="h-3 w-20" />
          <Shimmer className="h-5 w-36" />
        </div>
        <Shimmer className="h-10 w-28 rounded-xl" />
      </div>
    </div>
  );
}

export function HotelsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col h-[380px]">
          <Shimmer className="h-44 w-full rounded-b-none" />
          <div className="p-4 flex-1 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Shimmer className="h-4 w-16" />
                <Shimmer className="h-3 w-20" />
              </div>
              <Shimmer className="h-5 w-5/6" />
              <Shimmer className="h-3.5 w-full" />
              <Shimmer className="h-3.5 w-4/5" />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-50">
              <div className="space-y-1">
                <Shimmer className="h-3 w-12" />
                <Shimmer className="h-4 w-24" />
              </div>
              <Shimmer className="h-9 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ToursListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
          <div className="flex justify-between items-center">
            <Shimmer className="h-5 w-24" />
            <Shimmer className="h-4 w-16" />
          </div>
          <Shimmer className="h-6 w-5/6" />
          <Shimmer className="h-10 w-full" />
          <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
            <Shimmer className="h-4 w-20" />
            <Shimmer className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChatBotResponseSkeleton() {
  return (
    <div className="flex justify-start items-start gap-2 max-w-[85%] animate-pulse">
      <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
      <div className="bg-slate-100 rounded-2xl rounded-tl-none p-3 space-y-2 flex-1">
        <Shimmer className="h-3.5 w-5/6" />
        <Shimmer className="h-3.5 w-full" />
        <Shimmer className="h-3.5 w-2/3" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
      <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
        <Shimmer className="w-16 h-16 rounded-full" />
        <div className="space-y-2 flex-1">
          <Shimmer className="h-5 w-48" />
          <Shimmer className="h-4 w-36" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Shimmer className="h-3 w-20" />
          <Shimmer className="h-10 w-full" />
        </div>
        <div className="space-y-1.5">
          <Shimmer className="h-3 w-24" />
          <Shimmer className="h-10 w-full" />
        </div>
        <Shimmer className="h-12 w-32 rounded-xl pt-2" />
      </div>
    </div>
  );
}
