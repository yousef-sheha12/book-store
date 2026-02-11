import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const getVariant = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname === "/about") return "about";
    if (location.pathname.startsWith("/books")) return "books";
    if (location.pathname === "/signup") return "signup";
    if (location.pathname === "/login") return "login";
    if (location.pathname === "/cart") return "cart";
    if (location.pathname === "/wishlist") return "wishlist";
    if (location.pathname === "/checkout") return "checkout";
    if (location.pathname === "/profile") return "profile";
    return "home";
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header variant={getVariant()} />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
