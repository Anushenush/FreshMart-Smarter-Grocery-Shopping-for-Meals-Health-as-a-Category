
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface ToastMessage {
  id: string;
  emoji: string;
  title: string;
  source: string;
  itemCount?: number;
  type?: "recipe" | "health" | "product" | "bundle";
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (msg: Omit<ToastMessage, "id">) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((msg: Omit<ToastMessage, "id">) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev.slice(-3), { ...msg, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
