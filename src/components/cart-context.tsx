"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { menu, type MenuItem, type MenuUnit } from "@/data/menu";

export type CartLine = {
  itemId: string;
  name: string;
  unit: MenuUnit;
  price: number;
  quantity: number;
};

export type CartToast = { id: number; message: string } | null;

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  total: number;
  toast: CartToast;
  addItem: (item: MenuItem) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  undo: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "3cm-ticket-v1";
const emptyCart: CartLine[] = [];
const listeners = new Set<() => void>();
let cachedItems = emptyCart;
let lastStorageValue: string | null | undefined;
let storageUnavailable = false;
let cachedToast: CartToast = null;
let undoItems: CartLine[] | null = null;
let toastId = 0;
let toastTimer: ReturnType<typeof setTimeout> | undefined;

export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function parseStoredCart(stored: string | null): CartLine[] {
  try {
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((line): CartLine[] => {
      const item = menu.find((menuItem) => menuItem.id === line?.itemId);
      if (!item || !Number.isInteger(line?.quantity) || line.quantity < 1) return [];
      return [{
        itemId: item.id,
        name: item.name,
        unit: item.unit,
        price: item.price,
        quantity: Math.min(20, line.quantity),
      }];
    });
  } catch {
    return [];
  }
}

function getCartSnapshot() {
  if (storageUnavailable) return cachedItems;

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored !== lastStorageValue) {
      lastStorageValue = stored;
      cachedItems = parseStoredCart(stored);
    }
  } catch {
    storageUnavailable = true;
  }

  return cachedItems;
}

function subscribeToCart(listener: () => void) {
  listeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key && event.key !== storageKey) return;
    lastStorageValue = undefined;
    listeners.forEach((currentListener) => currentListener());
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function getServerSnapshot() {
  return emptyCart;
}

function getToastSnapshot() {
  return cachedToast;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function persistCart() {
  try {
    const serialized = JSON.stringify(cachedItems);
    localStorage.setItem(storageKey, serialized);
    lastStorageValue = serialized;
  } catch {
    storageUnavailable = true;
  }
}

function showToast(message: string, previous: CartLine[] | null) {
  if (toastTimer) clearTimeout(toastTimer);
  undoItems = previous;
  cachedToast = { id: ++toastId, message };
  const activeId = toastId;
  toastTimer = setTimeout(() => {
    if (cachedToast?.id !== activeId) return;
    cachedToast = null;
    undoItems = null;
    notifyListeners();
  }, 5000);
}

function updateCart(update: (current: CartLine[]) => CartLine[], message: (previous: CartLine[], next: CartLine[]) => string) {
  const previous = getCartSnapshot();
  const next = update(previous);
  if (next === previous) return;
  cachedItems = next;
  showToast(message(previous, next), previous);
  persistCart();
  notifyListeners();
}

function undoLastChange() {
  if (!undoItems) return;
  cachedItems = undoItems;
  undoItems = null;
  if (toastTimer) clearTimeout(toastTimer);
  cachedToast = null;
  persistCart();
  notifyListeners();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribeToCart, getCartSnapshot, getServerSnapshot);
  const toast = useSyncExternalStore(subscribeToCart, getToastSnapshot, () => null);

  function addItem(item: MenuItem) {
    updateCart((current) => {
      const existing = current.find((line) => line.itemId === item.id);
      if (existing?.quantity === 20) return current;
      if (existing) {
        return current.map((line) =>
          line.itemId === item.id ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }

      return [
        ...current,
        {
          itemId: item.id,
          name: item.name,
          unit: item.unit,
          price: item.price,
          quantity: 1,
        },
      ];
    }, () => `${item.name} added`);
  }

  function setQuantity(itemId: string, quantity: number) {
    updateCart(
      (current) =>
        quantity < 1
          ? current.filter((line) => line.itemId !== itemId)
          : current.map((line) =>
              line.itemId === itemId ? { ...line, quantity: Math.min(20, quantity) } : line,
            ),
      (previous, next) => {
        const item = previous.find((line) => line.itemId === itemId);
        if (!next.some((line) => line.itemId === itemId)) return `${item?.name ?? "Item"} removed`;
        return `${item?.name ?? "Item"} quantity updated`;
      },
    );
  }

  function removeItem(itemId: string) {
    const item = items.find((line) => line.itemId === itemId);
    if (!item) return;
    updateCart((current) => current.filter((line) => line.itemId !== itemId), () => `${item?.name ?? "Item"} removed`);
  }

  function clearCart() {
    if (items.length === 0) return;
    updateCart(() => [], () => "Ticket cleared");
  }

  const value = {
    items,
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    toast,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
    undo: undoLastChange,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}