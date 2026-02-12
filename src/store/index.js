import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import toast from "react-hot-toast";

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
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
export const useSearchStore = create((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
export const useShopStore = create(
  persist(
    (set, get) => ({
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
          toast.success("Quantity increased in cart!");
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
          toast.success("Book added to cart!");
        }
      },

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      increaseQuantity: (productId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }));
        toast.success("Quantity increased!");
      },

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
          toast.error("Quantity decreased!");
        } else {
          set({
            cart: cart.filter((i) => i.id !== productId),
          });
          toast.success("Book removed from cart!");
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
          toast.success("Book removed from wishlist!");
        } else {
          set({ wishlist: [...wishlist, product] });
          toast.success("Book added to wishlist!");
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
