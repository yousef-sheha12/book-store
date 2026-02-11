import React from "react";
import { Trash2, ShoppingCart, Truck, ArrowRight } from "lucide-react";

const CartItem = ({ title, author, price, image, asin }) => (
  <div className="bg-white p-6 mb-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-md">
    <div className="w-32 h-44 shrink-0">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover rounded-lg shadow-md"
      />
    </div>

    <div className="grow space-y-2 text-center md:text-left">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 font-medium">
        Author: <span className="text-gray-700">{author}</span>
      </p>
      <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
        ultricies est. Aliquam in justo varius.
      </p>

      <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
          <Truck size={12} className="mr-1" /> Free Shipping
        </span>
      </div>
      <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
        ASIN : {asin}
      </p>
    </div>

    <div className="flex items-center gap-12 ml-auto">
      <div className="text-2xl font-bold text-gray-900">${price}</div>

      <button
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
        title="Remove item"
      >
        <Trash2 size={22} />
      </button>
    </div>
  </div>
);

const WishlistPage = () => {
  const cartData = [
    {
      id: 1,
      title: "Rich Dad And Poor Dad",
      author: "Robert T. Kiyosaki",
      price: 40,
      asin: "B09TWSRMCB",
      image:
        "https://m.media-amazon.com/images/I/81BE7eeKzAL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 2,
      title: "Rich Dad And Poor Dad",
      author: "Robert T. Kiyosaki",
      price: 40,
      asin: "B09TWSRMCB",
      image:
        "https://m.media-amazon.com/images/I/81BE7eeKzAL._AC_UF1000,1000_QL80_.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {cartData.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-3 rounded-lg border-2 border-pink-200 text-pink-500 font-semibold hover:bg-pink-50 transition-colors w-full sm:w-auto">
            Move to cart
          </button>

          <button className="flex items-center justify-between px-6 py-3 rounded-lg bg-[#E11D74] text-white font-semibold hover:bg-[#c01863] transition-all w-full sm:w-64 shadow-lg shadow-pink-200">
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] opacity-80 uppercase">2 Items</span>
              <span className="text-lg">$80</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Check out</span>
              <div className="bg-white/20 p-1 rounded-md">
                <ArrowRight size={18} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
