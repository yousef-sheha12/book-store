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
import { Link, useParams } from "react-router-dom";
import books from "../books.json";
import { useShopStore } from "../store";

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const book = books.find((b) => b.id === Number(id));

  const { addToCart, toggleWishlist, wishlist } = useShopStore();

  const [quantity, setQuantity] = useState(1);

  if (!book) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl font-bold">
        Book Not Found
      </div>
    );
  }

  const isInWishlist = wishlist.some((item) => item.id === book.id);

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-12">
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-125 object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl font-black text-gray-900 leading-tight">
                {book.title}
              </h1>
            </div>

            <p className="text-gray-500 text-lg leading-relaxed mb-6 max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <div className="flex flex-wrap gap-8 mb-8 pb-8 border-b border-gray-100">
              <div>
                <span className="text-xs text-gray-400 block mb-1">Author</span>
                <span className="font-bold text-gray-800">{book.author}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block mb-1">
                  Category
                </span>
                <span className="font-bold text-gray-800">{book.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={
                        i < Math.floor(book.rating) ? "currentColor" : "none"
                      }
                      className={
                        i < Math.floor(book.rating)
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-400">
                  ({book.reviews} Reviews)
                </span>
                <span className="text-sm font-black text-gray-800 ml-2">
                  Rate: {book.rating}
                </span>
              </div>
              <div className="flex gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">
                  <CheckCircle2 size={14} /> In Stock
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full border border-orange-100">
                  Discount code: {book.discountCode}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-10 mt-auto">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black text-gray-900">
                  {book.price}
                </span>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-pink-500"
                >
                  <MinusCircle size={28} />
                </button>
                <span className="text-xl font-black w-8 text-center text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-pink-500"
                >
                  <PlusCircle size={28} />
                </button>
              </div>

              <div className="flex gap-3 grow">
                <Link to="/cart">
                  <button
                    onClick={() => {
                      for (let i = 0; i < quantity; i++) {
                        addToCart(book);
                      }
                    }}
                    className="grow flex items-center justify-center gap-3 py-4 bg-[#E11D74] text-white rounded-2xl font-bold text-lg"
                  >
                    Add To Cart <ShoppingCart size={20} />
                  </button>
                </Link>

                <button
                  onClick={() => toggleWishlist(book)}
                  className="p-4 border-2 border-pink-100 text-pink-500 rounded-2xl"
                >
                  <Heart fill={isInWishlist ? "#E11D74" : "none"} size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
