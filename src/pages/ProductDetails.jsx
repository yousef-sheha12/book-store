import React, { useEffect, useState } from "react";
import {
  Star,
  Share2,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Truck,
  CheckCircle2,
  Heart,
  ShoppingCart,
  MinusCircle,
  PlusCircle,
} from "lucide-react";

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-12">
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
              <img
                src="https://m.media-amazon.com/images/I/81BE7eeKzAL._AC_UF1000,1000_QL80_.jpg"
                alt="Main Product"
                className="w-full h-125 object-cover"
              />
            </div>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-24 h-32 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${i === 1 ? "border-[#E11D74]" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img
                    src="https://m.media-amazon.com/images/I/81BE7eeKzAL._AC_UF1000,1000_QL80_.jpg"
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl font-black text-gray-900 leading-tight">
                Rich Dad And Poor Dad
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <Facebook
                    size={20}
                    className="text-blue-600 cursor-pointer"
                  />
                  <Instagram
                    size={20}
                    className="text-pink-600 cursor-pointer"
                  />
                  <Twitter size={20} className="text-black cursor-pointer" />
                  <MessageCircle
                    size={20}
                    className="text-green-500 cursor-pointer"
                  />
                </div>
                <Share2
                  size={20}
                  className="text-gray-400 cursor-pointer ml-2"
                />
              </div>
            </div>

            <p className="text-gray-500 text-lg leading-relaxed mb-6 max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
              ultricies est. Aliquam in justo varius, sagittis neque ut,
              malesuada leo. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.
            </p>

            <div className="flex flex-wrap gap-8 mb-8 pb-8 border-b border-gray-100">
              <div>
                <span className="text-xs text-gray-400 block mb-1">Author</span>
                <span className="font-bold text-gray-800">
                  Robert T. Kiyosaki
                </span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block mb-1">
                  Publication Year
                </span>
                <span className="font-bold text-gray-800">1997</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block mb-1">Book</span>
                <span className="font-bold text-gray-800">1 Of 1</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block mb-1">Pages</span>
                <span className="font-bold text-gray-800">336</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block mb-1">
                  Language
                </span>
                <span className="font-bold text-gray-800">English</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4].map((n) => (
                    <Star key={n} size={18} fill="currentColor" />
                  ))}
                  <Star
                    size={18}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </div>
                <span className="text-sm font-bold text-gray-400">
                  (210 Review)
                </span>
                <span className="text-sm font-black text-gray-800 ml-2">
                  Rate: 4.2
                </span>
              </div>
              <div className="flex gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">
                  <CheckCircle2 size={14} /> In Stock
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-full border border-gray-100">
                  <Truck size={14} /> Free Shipping Today
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full border border-orange-100">
                  Discount code: Ne212
                </span>
              </div>
            </div>

            <div className="flex items-center gap-10 mt-auto">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black text-gray-900">
                  $40.00
                </span>
                <span className="text-xl text-gray-400 line-through font-medium">
                  $40.00
                </span>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-pink-500 hover:scale-110 transition-transform"
                >
                  <MinusCircle size={28} />
                </button>
                <span className="text-xl font-black w-8 text-center text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-pink-500 hover:scale-110 transition-transform"
                >
                  <PlusCircle size={28} />
                </button>
              </div>

              <div className="flex gap-3 grow">
                <button className="grow flex items-center justify-center gap-3 py-4 bg-[#E11D74] text-white rounded-2xl font-bold text-lg hover:bg-[#c01863] transition-all shadow-lg shadow-pink-100">
                  Add To Cart <ShoppingCart size={20} />
                </button>
                <button className="p-4 border-2 border-pink-100 text-pink-500 rounded-2xl hover:bg-pink-50 transition-colors">
                  <Heart size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100">
          <div className="flex gap-12 px-12 border-b border-gray-100">
            {["Product Details", "Customer Reviews", "Recomended For You"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`py-6 text-xl font-bold transition-all relative ${activeTab.includes(tab.toLowerCase().split(" ")[0]) ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
                >
                  {tab}
                  {activeTab.includes(tab.toLowerCase().split(" ")[0]) && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#E11D74] rounded-t-full" />
                  )}
                </button>
              ),
            )}
          </div>

          <div className="p-12 max-w-4xl">
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "Book Title", value: "Rich Dad And Poor Dad" },
                { label: "Author", value: "Robert T. Kiyosaki" },
                { label: "Publication Date", value: "1997" },
                { label: "ASIN", value: "B09TWSRMCB" },
                { label: "Language", value: "English" },
                { label: "Publisher", value: "Printer" },
                { label: "Pages", value: "336" },
                { label: "Book Format", value: "Hard Cover" },
                { label: "Best Seller Rank", value: "#3" },
              ].map((row, i) => (
                <div key={i} className="flex items-center">
                  <span className="w-48 font-black text-gray-800">
                    {row.label} :
                  </span>
                  <span className="text-gray-600 font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
