import React, { useEffect, useState } from "react";
import {
  Star,
  Share2,
  Facebook,
  Instagram,
  Truck,
  CheckCircle2,
  Heart,
  ShoppingCart,
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
  const [mainImage, setMainImage] = useState(book?.image);

  // useEffect(() => {
  //   if (book) setMainImage(book.image);
  // }, [id, book]);

  if (!book) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl font-bold">
        Book Not Found
      </div>
    );
  }

  const isInWishlist = wishlist.some((item) => item.id === book.id);

  return (
    <div className="min-h-screen bg-gray-50/50 p-3 md:p-12 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end gap-3 mb-4 text-gray-500 overflow-x-auto pb-2">
          <Facebook size={18} className="text-blue-600 cursor-pointer" />
          <Instagram size={18} className="text-pink-500 cursor-pointer" />
          <FaXTwitter size={18} className="text-black cursor-pointer" />
          <FaWhatsapp size={18} className="text-green-500 cursor-pointer" />
          <Share2 size={18} className="cursor-pointer" />
        </div>

        <div className="bg-white rounded-3xl md:rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden p-5 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-white">
                <img
                  src={mainImage}
                  alt={book.title}
                  className="w-full h-auto max-h-100 md:max-h-none object-contain md:object-cover"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {[book.image, book.image1, book.image3].map(
                  (imgSrc, i) =>
                    imgSrc && (
                      <div
                        key={i}
                        onClick={() => setMainImage(imgSrc)}
                        className={`min-w-17.5 w-20 h-24 rounded-lg overflow-hidden border-2 cursor-pointer transition-all shrink-0 ${
                          mainImage === imgSrc
                            ? "border-pink-500 shadow-md scale-95"
                            : "border-transparent opacity-60"
                        }`}
                      >
                        <img
                          src={imgSrc}
                          className="w-full h-full object-cover"
                          alt="thumb"
                        />
                      </div>
                    ),
                )}
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {book.title}
              </h1>

              <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">
                {book.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo."}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 bg-gray-50 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                    Author
                  </span>
                  <span className="font-bold text-xs md:text-sm">
                    {book.author}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                    Year
                  </span>
                  <span className="font-bold text-xs md:text-sm">
                    {book.year}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                    Format
                  </span>
                  <span className="font-bold text-xs md:text-sm">
                    Hardcover
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                    Language
                  </span>
                  <span className="font-bold text-xs md:text-sm">English</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full border border-green-100">
                  <CheckCircle2 size={12} /> In Stock
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold rounded-full border border-gray-100">
                  <Truck size={12} /> Free Shipping
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-500 text-[10px] font-bold rounded-full border border-orange-100">
                  Code: {book.discountCode || "Ne212"}
                </span>
              </div>

              <div className="mt-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-gray-100 pt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-gray-900">
                      ${book.price}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      $250
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start gap-6 bg-gray-50 px-4 py-2 rounded-xl w-full sm:w-auto">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-pink-500 active:scale-90 transition-transform"
                    >
                      <MinusCircle size={28} />
                    </button>
                    <span className="text-xl font-bold w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-pink-500 active:scale-90 transition-transform"
                    >
                      <PlusCircle size={28} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      for (let i = 0; i < quantity; i++) addToCart(book);
                    }}
                    className="flex-1 flex items-center justify-center gap-3 py-4 bg-[#E11D74] text-white rounded-2xl font-bold shadow-lg shadow-pink-100 active:scale-[0.98] transition-all"
                  >
                    Add To Cart <ShoppingCart size={20} />
                  </button>

                  <button
                    onClick={() => toggleWishlist(book)}
                    className={`p-4 border rounded-2xl transition-all ${
                      isInWishlist
                        ? "bg-pink-50 border-pink-200 text-pink-500"
                        : "border-gray-200 text-gray-400"
                    }`}
                  >
                    <Heart fill={isInWishlist ? "#E11D74" : "none"} size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16 border-t border-gray-100 pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b-4 border-[#E11D74] w-fit pb-2">
              Technical Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              <DetailItem label="Book Title" value={book.title} />
              <DetailItem label="Author" value={book.author} />
              <DetailItem label="Publication Date" value={book.year} />
              <DetailItem label="Pages" value="336" />
              <DetailItem label="Language" value="English" />
              <DetailItem label="Format" value="Hard Cover" />
            </div>
          </div>
        </div>
      </div>
      {/* <Toaster /> */}
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between md:justify-start border-b border-gray-50 md:border-none pb-2 md:pb-0">
    <span className="font-bold text-gray-900 text-xs md:text-sm md:min-w-37.5">
      {label}:
    </span>
    <span className="text-gray-600 text-xs md:text-sm">{value}</span>
  </div>
);

export default ProductDetails;
