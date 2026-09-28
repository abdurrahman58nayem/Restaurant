"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine } from "@/lib/types";

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addLine: (line: Omit<CartLine, "key">, key: string) => void;
  setQuantity: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "noore-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage may be unavailable */
    }
  }, [lines, hydrated]);

  const addLine = (line: Omit<CartLine, "key">, key: string) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) =>
          l.key === key ? { ...l, quantity: l.quantity + line.quantity } : l
        );
      }
      return [...prev, { ...line, key }];
    });
  };

  const setQuantity = (key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, quantity: qty } : l))
    );
  };

  const removeLine = (key: string) => setLines((prev) => prev.filter((l) => l.key !== key));
  const clear = () => setLines([]);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((s, l) => s + l.quantity, 0);
    const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
    return { lines, count, subtotal, addLine, setQuantity, removeLine, clear };
  }, [lines]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
