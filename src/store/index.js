import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      userData: null,
      updateUser: (newData) =>
        set((state) => ({
          userData: { ...state.userData, ...newData },
        })),
      login: (token) => set({ token, isAuthenticated: true }),
      logout: () =>
        set({ token: null, isAuthenticated: false, userData: null }),
    }),
    {
      name: "auth-token",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
export const useShopStore = create(
  persist(
    (set, get) => ({
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),

      cart: [],
      wishlist: [],

      addToCart: (product) => {
        const cart = get().cart;
        const isExisted = cart.find((item) => item.id === product.id);

        if (isExisted) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      decreaseQuantity: (productId) => {
        const cart = get().cart;
        const item = cart.find((i) => i.id === productId);
        if (!item) return;

        if (item.quantity > 1) {
          set({
            cart: cart.map((i) =>
              i.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
            ),
          });
        } else {
          set({
            cart: cart.filter((i) => i.id !== productId),
          });
        }
      },

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (product) => {
        const wishlist = get().wishlist;
        const isExisted = wishlist.find((item) => item.id === product.id);

        if (isExisted) {
          set({
            wishlist: wishlist.filter((item) => item.id !== product.id),
          });
        } else {
          set({ wishlist: [...wishlist, product] });
        }
      },

      getCartCount: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),

      getWishlistCount: () => get().wishlist.length,
    }),
    {
      name: "shop-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
