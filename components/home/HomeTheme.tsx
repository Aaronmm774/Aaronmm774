export function HomeTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-slate-950">
      {children}
    </div>
  );
}
