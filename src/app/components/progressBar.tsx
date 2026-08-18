"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

interface ProgressBarContextType {
  start: () => void;
  done: () => void;
}

const ProgressBarContext = createContext<ProgressBarContextType | null>(null);

// Optional — call this manually if you ever trigger navigation from code
// (e.g. router.push inside an onClick) instead of a plain <Link>/<a>.
export function useProgressBar() {
  const ctx = useContext(ProgressBarContext);
  if (!ctx) {
    throw new Error("useProgressBar must be used within ProgressBarProvider");
  }
  return ctx;
}

export function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pathname = usePathname();

  const start = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setVisible(true);
    setProgress(10);
    intervalRef.current = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + Math.random() * 10));
    }, 200);
  }, []);

  const done = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 200);
  }, []);

  // The pathname only updates once the new route has actually rendered,
  // so this is what marks navigation as finished.
  useEffect(() => {
    done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Catch clicks on any internal link — product cards included — and
  // start the bar immediately, before Next.js finishes the navigation.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("localhost") || href.startsWith("#")) return;
      if (anchor.target === "_blank") return;
      if (href === window.location.pathname) return;

      start();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [start]);

  return (
    <ProgressBarContext.Provider value={{ start, done }}>
      {visible && (
        <div className="fixed top-0 left-0 right-0 z-[999] h-[3px] bg-transparent pointer-events-none">
          <div
            className="h-full bg-orange-600  transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {children}
    </ProgressBarContext.Provider>
  );
}