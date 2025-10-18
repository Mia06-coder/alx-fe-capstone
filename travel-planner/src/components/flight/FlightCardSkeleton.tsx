// src/components/FlightCardSkeleton.tsx
export default function FlightCardSkeleton() {
  return (
    <div className="p-4 border border-[var(--color-border)] rounded-2xl bg-gradient-to-br from-slate-100 via-sky-50 to-sky-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 shadow-md animate-pulse">
      {/* Top section */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
          <div className="w-24 h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
        </div>
        <div className="w-16 h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200 dark:bg-slate-600 mb-3"></div>

      {/* Middle section */}
      <div className="flex justify-between items-center gap-12">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
          <div className="w-16 h-3 bg-slate-300 dark:bg-slate-600 rounded"></div>
          <div className="w-12 h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
        </div>
        <div className="flex-1 border-t border-dashed border-slate-400 mx-4"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
          <div className="w-16 h-3 bg-slate-300 dark:bg-slate-600 rounded"></div>
          <div className="w-12 h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex justify-end mt-4">
        <div className="w-24 h-6 bg-slate-300 dark:bg-slate-600 rounded"></div>
      </div>
    </div>
  );
}
