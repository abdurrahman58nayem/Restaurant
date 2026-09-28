"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

export interface Toast {
  id: number;
  message: string;
  tone: "success" | "info" | "error";
}

interface ToastCtx {
  toast: (message: string, tone?: Toast["tone"]) => void;
}

const Ctx = createContext<ToastCtx>({ toast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, tone: Toast["tone"] = "success") => {
      const id = ++idRef.current;
      setToasts((t) => [...t.slice(-2), { id, message, tone }]);
      window.setTimeout(() => dismiss(id), 3200);
    },
    [dismiss]
  );

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex flex-col items-center gap-2 px-4 sm:bottom-8"
      >
        {toasts.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => dismiss(t.id)}
            className={`pointer-events-auto max-w-sm animate-toast-in rounded-full px-5 py-2.5 text-sm font-medium text-ivory shadow-lift ${
              t.tone === "error" ? "bg-clay-600" : "bg-charcoal-400"
            }`}
          >
            {t.message}
          </button>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  return useContext(Ctx);
}
