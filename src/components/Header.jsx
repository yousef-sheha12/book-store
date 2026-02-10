// components/Header.jsx
import { Search } from "lucide-react";
import Navbar from "./Navbar/Navbar";
import BackgroundImg from "../assets/images/Home.png";
import { useAuthStore } from "../store"; // تأكد من المسار
import NavbarAuth from "./Navbar/NavbarAuth";

export default function Header({ variant }) {
  // جلب حالة التسجيل وبيانات التوكن من Zustand
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // const token = useAuthStore((state) => state.token);

  // ملاحظة: بما أنك لم تضف حقول إضافية في Strapi،
  // سنقوم بفك التوكن أو الاعتماد على البيانات المخزنة في الـ Store
  // سنفترض أنك قمت بتخزين الـ user داخل الـ store أو سنمرر الـ token فقط

  return (
    <header className="relative w-full overflow-hidden bg-[#1f1d2b]">
      {/* 1. الخلفية الثابتة */}
      <div className="absolute inset-0 z-0">
        <img
          src={BackgroundImg}
          alt="background"
          className={`w-full h-full object-cover ${variant !== "books" ? "h-screen" : "h-60"} brightness-[0.6]`}
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* 2. النافبار - نمرر التوكن أو بيانات المستخدم هنا */}
      <div className="relative z-50">
        {isAuthenticated ? <NavbarAuth /> : <Navbar />}
      </div>

      {/* 3. المحتوى المتغير (Home, About, Books) */}
      <div className="relative z-10 w-full">
        {variant === "home" && (
          <div className="h-screen w-full flex flex-col items-center justify-center pt-20">
            <div className="w-full max-w-2xl px-6 relative group">
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="w-full bg-white/90 backdrop-blur-md rounded-2xl py-4 px-6 text-black text-lg focus:outline-none focus:ring-4 focus:ring-pink-500/30 transition-all placeholder:text-gray-500"
                  placeholder="search books..."
                />
                <button className="absolute right-2 bg-[#d81b60] p-3 rounded-xl hover:bg-[#ad1457] transition-colors text-white">
                  <Search size={28} />
                </button>
              </div>
              <p className="text-white/70 mt-4 text-center text-sm font-medium">
                Find your favorite books, authors, and more...
              </p>
            </div>
          </div>
        )}

        {variant === "about" && (
          <div className="h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              About Bookshop
            </h1>
            <p className="max-w-3xl text-xl md:text-2xl text-gray-200 leading-relaxed drop-shadow-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              minus unde repellat aut hic voluptatum ullam molestiae asperiores
              possimus, tenetur, voluptas id at.
            </p>
          </div>
        )}

        {variant === "books" && (
          <div className="h-40 flex items-center justify-center"></div>
        )}
        {variant === "cart" && (
          <div className="h-40 flex items-center justify-center"></div>
        )}
        {variant === "wishlist" && (
          <div className="h-40 flex items-center justify-center"></div>
        )}
        {variant === "profile" && (
          <div className="h-80 flex items-center justify-center"></div>
        )}
      </div>
    </header>
  );
}
