// import React, { useEffect, useState } from "react";
// import axios from "axios";
import {
  Truck,
  CreditCard,
  RotateCcw,
  Headphones,
  ShoppingCart,
  Star,
  ChevronRight,
  Heart,
  ChevronLeft,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import books from "../books.json";
import { useShopStore } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const features = [
    {
      icon: <Truck size={32} className="text-gray-600" />,
      title: "Fast & Reliable Shipping",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    },
    {
      icon: <CreditCard size={32} className="text-gray-600" />,
      title: "Secure Payment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    },
    {
      icon: <RotateCcw size={32} className="text-gray-600" />,
      title: "Easy Returns",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    },
    {
      icon: <Headphones size={32} className="text-gray-600" />,
      title: "24/7 Customer Support",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    },
  ];

  // const [recommendedBooks, setRecommendedBooks] = useState([]);
  // const [books, setBooks] = useState([]);
  // const [sale, setSale] = useState([]);
  // const getRecommen = async () => {
  //   try {
  //     const res = await axios.get("https://bookstore.eraasoft.pro/api/home");
  //     setRecommendedBooks(res.data.data.recommended || []);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error.error);
  //   }
  // };
  // const getAllBooks = async () => {
  //   try {
  //     const res = await axios.get("https://bookstore.eraasoft.pro/api/home");
  //     setBooks(res.data.data.best_selling_image || []);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error.error);
  //   }
  // };
  // const getFlashSale = async () => {
  //   try {
  //     const res = await axios.get("https://bookstore.eraasoft.pro/api/home");
  //     setSale(res.data.data.flashSales || []);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error.error);
  //   }
  // };
  // useEffect(() => {
  //   getRecommen();
  //   getAllBooks();
  //   getFlashSale();
  // }, []);

  const { toggleWishlist, addToCart, wishlist } = useShopStore();
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-[#f8f9fa] py-25 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-start space-y-4">
              <div className="mb-2">{item.icon}</div>

              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>

              <p className="text-gray-500 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#3b2d4a] py-20 px-4 text-white text-center">
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Best Seller</h2>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
            leo.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12 w-full">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            loop={books.length > 6}
            autoplay={
              books.length > 1
                ? {
                    delay: 1200,
                    disableOnInteraction: false,
                  }
                : false
            }
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="mySwiper pb-14"
          >
            {books.slice(10, 20).map((book) => (
              <SwiperSlide key={book.id}>
                <div
                  onClick={() => navigate(`/productdetails/${book.id}`)}
                  className="transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={book.image}
                    width={100}
                    height={100}
                    alt={book.title}
                    className="w-full h-auto rounded-lg shadow-2xl border border-gray-700"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Link to="/books">
          <button className="bg-[#d81b60] hover:bg-[#ad1457] text-white font-semibold py-3 px-10 rounded-lg transition-colors duration-300">
            Shop now
          </button>
        </Link>

        <style>
          {`
    .swiper-pagination-bullet {
      background: #fff;
      opacity: 0.5;
    }
    .swiper-pagination-bullet-active {
      background: #d81b60;
      opacity: 1;
    }
  `}
        </style>
      </section>
      <div className="font-sans antialiased">
        <section className="bg-[#f8f9fa] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Recommended For You
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {books.slice(5, 9).map((book) => {
                const isInWishlist = wishlist.some(
                  (item) => item.id === book.id,
                );
                return (
                  <div
                    key={book.id}
                    className="bg-white p-6 rounded-sm shadow-sm flex flex-col sm:flex-row gap-6 border border-gray-100"
                  >
                    <Link to={`/productdetails/${book.id}`}>
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full sm:w-40 h-56 object-cover rounded-sm shadow-md"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2 underline">
                          Author: {book.author}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-3">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Mauris et ultricies est. Aliquam in justo
                          varius, sagittis neque ut, malesuada leo.
                        </p>

                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(4)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <Star size={14} className="text-gray-300" />
                          <span className="text-xs text-gray-400 ml-2">
                            ({book.reviews} Review)
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-semibold mb-2">
                          Rate: {book.rating}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold text-gray-800">
                          ${book.price}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              addToCart(book);
                              navigate("/cart");
                            }}
                            className="bg-[#d81b60] text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-semibold hover:bg-[#ad1457] transition-colors"
                          >
                            Add To Cart <ShoppingCart size={16} />
                          </button>
                          <button
                            onClick={() => toggleWishlist(book)}
                            className="p-2 border border-pink-200 rounded-md text-[#d81b60] hover:bg-pink-50 transition-colors"
                          >
                            <Heart
                              fill={isInWishlist ? "#E11D74" : "none"}
                              size={20}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 px-4 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Flash Sale
                </h2>
                <p className="text-gray-400 max-w-md text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris et ultricies est. Aliquam in justo varius.
                </p>
              </div>
              <div className="hidden md:flex gap-2">
                <button className="p-2 bg-gray-100 rounded-full text-gray-400 hover:bg-gray-200">
                  <ChevronLeft size={24} />
                </button>
                <button className="p-2 bg-gray-100 rounded-full text-gray-400 hover:bg-gray-200">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {books.slice(0, 2).map((book) => {
                const isInWishlist = wishlist.some(
                  (item) => item.id === book.id,
                );
                return (
                  <div
                    key={book.id}
                    className="bg-white p-6 rounded-sm shadow-sm flex flex-col sm:flex-row gap-6 border border-gray-100"
                  >
                    <Link to={`/productdetails/${book.id}`}>
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full sm:w-40 h-56 object-cover rounded-sm shadow-md"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2 underline">
                          Author: {book.author}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-3">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Mauris et ultricies est. Aliquam in justo
                          varius, sagittis neque ut, malesuada leo.
                        </p>

                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(4)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <Star size={14} className="text-gray-300" />
                          <span className="text-xs text-gray-400 ml-2">
                            ({book.reviews} Review)
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-semibold mb-2">
                          Rate: {book.rating}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold text-gray-800">
                          ${book.price}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              addToCart(book);
                              navigate("/cart");
                            }}
                            className="bg-[#d81b60] text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-semibold hover:bg-[#ad1457] transition-colors"
                          >
                            Add To Cart <ShoppingCart size={16} />
                          </button>
                          <button
                            onClick={() => toggleWishlist(book)}
                            className="p-2 border border-pink-200 rounded-md text-[#d81b60] hover:bg-pink-50 transition-colors"
                          >
                            <Heart
                              fill={isInWishlist ? "#E11D74" : "none"}
                              size={20}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      {/* <Toaster /> */}
    </>
  );
}
