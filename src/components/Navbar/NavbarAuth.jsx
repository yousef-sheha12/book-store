import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Menu } from "lucide-react";
import LinkItem from "../ui/LinkItem";
import NavbarLogo from "./NavbarLogo";
import { useAuthStore, useShopStore } from "../../store";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function NavbarAuth() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const userData = useAuthStore((state) => state.userData);
  const cart = useShopStore((state) => state.cart);
  const wishlist = useShopStore((state) => state.wishlist);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <>
      <nav className="w-full fixed md:gap-4 top-0 left-0 z-50 flex items-center justify-between py-4 px-4 md:px-8 lg:px-35 bg-[#FFFFFF33] ">
        <NavbarLogo />

        <div className="hidden md:flex items-center gap-6 lg:gap-10 mx-auto">
          <LinkItem to={"/"}>home</LinkItem>
          <LinkItem to={"/books"}>books</LinkItem>
          <LinkItem to={"/about"}>about us</LinkItem>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/cart" className="relative">
            <ShoppingCart
              size={24}
              className="text-gray-700 hover:text-gray-900"
            />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#E11D74] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-short shadow-md border-2 border-white">
                {cart.length}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className="relative">
            <Heart size={24} className="text-gray-700 hover:text-gray-900" />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#E11D74] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md border-2 border-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow-lg z-40 border-t border-gray-200">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
            >
              <img
                src={userData?.avatar || "https://via.placeholder.com/40"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full border-2 border-gray-300 object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {userData?.first_name || "User Name"}
                </p>
                <p className="text-gray-500 text-sm">
                  {userData?.email || "user@example.com"}
                </p>
              </div>
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="btn btn-danger rounded-2xl p-3 text-sm w-full"
            >
              LogOut
            </button>
          </div>
        </div>
      )}
    </>
  );
}
