import { create } from "zustand";

export type User = { email: string; name: string };

type AuthState = {
  user: User | null;
  modalOpen: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  openModal: () => void;
  closeModal: () => void;
};

const STORAGE_KEY = "82video_user";

const loadUser = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

export const useAuth = create<AuthState>((set) => ({
  user: loadUser(),
  modalOpen: false,
  signIn: async (email) => {
    await new Promise((r) => setTimeout(r, 900));
    const user: User = { email, name: email.split("@")[0] || "Creator" };
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user, modalOpen: false });
  },
  signUp: async (name, email) => {
    await new Promise((r) => setTimeout(r, 1100));
    const user: User = { email, name };
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user, modalOpen: false });
  },
  signOut: () => {
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
    set({ user: null });
  },
  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
}));
