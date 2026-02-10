import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import LinkItem from "../ui/LinkItem";
import NavbarLogo from "./NavbarLogo";
import { useAuthStore } from "../../store";

export default function NavbarAuth() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const userData = useAuthStore((state) => state.userData);
  const handleLogout = () => {
    // 1. مسح البيانات من الـ Store (وبالتالي سيتم مسحها من localStorage تلقائياً بسبب persist)
    logout();

    // 2. توجيه المستخدم لصفحة تسجيل الدخول
    navigate("/login");
  };
  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex items-center justify-between py-4 px-6 md:px-20 lg:px-35 bg-[#FFFFFF33] ">
      <NavbarLogo />

      {/* الروابط: تظهر فقط في الشاشات الكبيرة */}
      <div className="hidden md:flex items-center gap-6 lg:gap-10 mx-auto">
        <LinkItem to={"/"}>home</LinkItem>
        <LinkItem to={"/books"}>books</LinkItem>
        <LinkItem to={"/about"}>about us</LinkItem>
      </div>

      {/* معلومات المستخدم والأيقونات */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* صورة المستخدم ومعلوماته */}
        <Link to="/profile">
          <div className="flex items-center gap-2">
            <img
              src={userData?.avatar || "https://via.placeholder.com/40"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border-2 border-gray-300 object-cover"
            />
            <div className="hidden md:block text-sm">
              <p className="font-semibold text-gray-800">
                {userData?.first_name || "User Name"}
              </p>
              <p className="text-gray-500">
                {userData?.email || "user@example.com"}
              </p>
            </div>
          </div>
        </Link>

        {/* أيقونة السلة */}
        <Link to="/cart" className="relative">
          <ShoppingCart
            size={24}
            className="text-gray-700 hover:text-gray-900"
          />
          {/* عدد العناصر في السلة (اختياري) */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            0
          </span>
        </Link>

        {/* أيقونة المفضلة */}
        <Link to="/wishlist" className="relative">
          <Heart size={24} className="text-gray-700 hover:text-gray-900" />
          {/* عدد العناصر في المفضلة (اختياري) */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            0
          </span>
        </Link>

        <div>
          <button
            className="btn btn-primary rounded-2xl p-5"
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
      </div>
    </nav>
  );
}
