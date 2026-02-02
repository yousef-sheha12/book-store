import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// export const useCounterStore = create((set) => ({
//     // initial state
//     counter: 0,
//     // setstate
//     increament: () => {
//         set(state => ({ counter: state.counter + 1 }))
//     },
//     // setstate
//     decreament: () => {
//         set(state => ({ counter: state.counter - 1 }))
//     },
// }))

export const useAuthStore = create(persist(
    (set) => ({
        token: null,
        isAuthenticated: false,

        login: (token) => {
            set({
                token,
                isAuthenticated: true
            })
        },

        logout: () => {
            set({
                token: null,
                isAuthenticated: false
            })
        }
    }),
    {
        name: "auth-token",
        storage: createJSONStorage((rememberMe = true) => rememberMe ? localStorage : sessionStorage)
    }
))