import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// index.js (تعديل بسيط)
export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      userData: null,
      // ... بقية الـ state
      updateUser: (newData) =>
        set((state) => ({
          userData: { ...state.userData, ...newData },
        })),
      login: (token) => set({ token, isAuthenticated: true }),
      logout: () => set({ token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-token",
      storage: createJSONStorage(() => localStorage), // التثبيت على localStorage
    },
  ),
);
