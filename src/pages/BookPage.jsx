import React, { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ShoppingCart,
  Heart,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import books from "../books.json";
import { Link, useNavigate } from "react-router-dom";
import { useShopStore } from "../store";

export default function BookPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [sort, setSort] = useState("");

  const { toggleWishlist, addToCart, wishlist, searchQuery } = useShopStore();
  const [search, setSearch] = useState(searchQuery);
  useEffect(() => {
    setSearch(searchQuery); // ✅ لما السيرش يتغير في الهيدر يتحدث هنا
  }, [searchQuery]);
  const navigate = useNavigate();

  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All Categories" || b.category === activeCategory; // تأكد أن ملف JSON يحتوي على حقل category

    return matchesSearch && matchesCategory;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const priceA = parseFloat(a.price.replace("$", ""));
    const priceB = parseFloat(b.price.replace("$", ""));
    if (sort === "priceLow") return priceA - priceB;
    if (sort === "priceHigh") return priceB - priceA;
    return 0;
  });

  const totalPages = Math.ceil(sortedBooks.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const currentBooks = sortedBooks.slice(startIndex, startIndex + pageSize);

  const categories = [
    { name: "All Categories", count: books.length },
    {
      name: "Business",
      count: books.filter((b) => b.category === "Business").length,
    },
    {
      name: "Self Help",
      count: books.filter((b) => b.category === "Self Help").length,
    },
    {
      name: "Programming",
      count: books.filter((b) => b.category === "Programming").length,
    },
    {
      name: "Fiction",
      count: books.filter((b) => b.category === "Fiction").length,
    },
  ];

  const tags = [
    "All Categories",
    "Business",
    "Self Help",
    "Programming",
    "Fiction",
    "History",
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen p-4 md:p-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 border-b pb-4">
              <SlidersHorizontal size={20} className="text-gray-600" />
              <h2 className="text-xl font-bold text-gray-800">Filter</h2>
            </div>

            <div className="collapse collapse-arrow bg-white border border-gray-100 rounded-xl overflow-hidden">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-pink-500 font-medium text-lg">
                Categories
              </div>
              <div className="collapse-content">
                <div className="space-y-3">
                  {categories.map((cat, i) => (
                    <label
                      key={i}
                      className="flex items-center justify-between cursor-pointer group"
                      onClick={() => {
                        setActiveCategory(cat.name);
                        setPage(1);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="cat"
                          checked={activeCategory === cat.name}
                          className="radio radio-xs radio-error "
                          readOnly
                        />
                        <span
                          className={`text-sm ${activeCategory === cat.name ? "text-pink-600 font-bold" : "text-gray-600"}`}
                        >
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        ({cat.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                placeholder="Search by title or author..."
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full text-black bg-white border border-gray-200 py-3 px-12 rounded-full focus:ring-1 focus:ring-pink-500 outline-none"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-gray-200 px-4 py-3 rounded-lg text-gray-500 text-sm outline-none"
            >
              <option value="">Sort by</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveCategory(tag);
                  setPage(1);
                }}
                className={`px-5 py-2 rounded-md text-sm transition-all border ${
                  activeCategory === tag
                    ? "bg-[#d81b60] text-white border-[#d81b60]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#d81b60]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => {
                const isInWishlist = wishlist.some(
                  (item) => item.id === book.id,
                );
                return (
                  <div
                    key={book.id}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-50 flex flex-col md:flex-row gap-6"
                  >
                    <Link to={`/productdetails/${book.id}`}>
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full md:w-36 h-52 object-cover rounded-md shadow-md"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-gray-900">
                            {book.title}
                          </h3>
                          <span className="text-[10px] text-orange-500 border border-orange-200 px-2 py-1 rounded bg-orange-50 font-bold uppercase">
                            Code: {book.discountCode}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Author:{" "}
                          <span className="text-gray-700 font-bold">
                            {book.author}
                          </span>{" "}
                          | Category:{" "}
                          <span className="text-pink-500">{book.category}</span>
                        </p>
                        <div className="flex items-center gap-1 mt-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                            />
                          ))}
                          <span className="text-xs text-gray-400 ml-2">
                            ({book.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-2xl font-bold text-gray-800">
                          {book.price}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              addToCart(book);
                              navigate("/cart");
                            }}
                            className="bg-[#d81b60] text-white px-6 py-2 rounded-md flex items-center gap-2 text-sm font-semibold hover:bg-[#ad1457] transition-all"
                          >
                            Add To Cart <ShoppingCart size={16} />
                          </button>
                          <button
                            onClick={() => toggleWishlist(book)}
                            className="p-2 border border-gray-200 rounded-md text-[#d81b60] hover:bg-pink-50"
                          >
                            <Heart
                              fill={isInWishlist ? "#E11D74" : "none"}
                              size={20}
                              className={isInWishlist ? "text-[#E11D74]" : ""}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-dashed">
                No books found in this category.
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="p-2 text-pink-400 disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-8 h-8 rounded-md text-sm ${page === i + 1 ? "bg-[#d81b60] text-white" : "bg-white text-gray-600 border"}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-2 text-pink-400 disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
