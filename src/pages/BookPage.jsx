import React from "react";
import { useState } from "react";
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

export default function BookPage() {
  const [activeCategory, setActiveCategory] = useState("Business");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [search, setSearch] = useState("");
  // let filteredBooks =
  //   activeCategory === "All Categories"
  //     ? books
  //     : books.filter((b) =>
  //         b.title.toLowerCase().includes(activeCategory.toLowerCase()),
  //       );
  let filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredBooks.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + pageSize);

  const [sort, setSort] = useState("");
  if (sort === "priceLow") {
    currentBooks.sort(
      (a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)),
    );
  }

  if (sort === "priceHigh") {
    currentBooks.sort(
      (a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)),
    );
  }

  const categories = [
    { name: "All Categories", count: 1450 },
    { name: "Business", count: 140 },
    { name: "Kids", count: 309 },
    { name: "Art", count: 102 },
    { name: "History", count: 204 },
    { name: "Romance", count: 89 },
    { name: "Fantasy", count: 47 },
    { name: "Self Help", count: 163 },
    { name: "Cooking", count: 211 },
    { name: "Sports", count: 92 },
  ];

  const tags = [
    "Business",
    "Self Help",
    "History",
    "Romance",
    "Fantasy",
    "Art",
    "Kids",
    "Music",
    "Cooking",
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-70 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 border-b pb-4">
              <SlidersHorizontal size={20} className="text-gray-600" />
              <h2 className="text-xl font-bold text-gray-800">Filter</h2>
            </div>

            <div className="w-full max-w-xs bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {" "}
              <div className="collapse collapse-arrow rounded-none">
                <input type="checkbox" className="peer" defaultChecked />

                <div className="collapse-title text-pink-500 font-medium text-lg flex justify-between items-center px-4">
                  Categories
                </div>

                <div className="collapse-content px-4">
                  <div className="space-y-3 pt-2">
                    {categories.map((cat, i) => (
                      <label
                        key={i}
                        className="flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 accent-pink-500 cursor-pointer"
                          />
                          <p className="text-sm text-gray-600 group-hover:text-pink-500 transition-colors">
                            {cat.name}
                          </p>
                        </div>
                        <p className="text-xs text-gray-400">({cat.count})</p>
                      </label>
                    ))}

                    <button className="text-pink-500 text-sm font-semibold mt-2 w-full text-center hover:underline">
                      Load More
                    </button>
                  </div>
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
                placeholder="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full text-black bg-white border border-gray-200 py-3 px-12 rounded-full focus:outline-none focus:ring-1 focus:ring-[#d81b60]"
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full border border-gray-100 text-[#d81b60] cursor-pointer shadow-sm">
                <Search size={20} />
              </div>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-gray-200 px-5 pl-2 py-3 rounded-md text-gray-500 text-sm focus:outline-none min-w-[150px]"
            >
              <option value="">Sort by</option>
              <option value="priceLow">price: Low to high</option>
              <option value="priceHigh">price: high to Low</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveCategory(tag)}
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
            {currentBooks.map((book, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-50 flex flex-col md:flex-row gap-6 relative"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full md:w-36 h-52 object-cover rounded-md shadow-md"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-900">
                        {book.title}
                      </h3>
                      <span className="text-[10px] text-[#f0a500] border border-[#f0a500] px-2 py-1 rounded-sm bg-orange-50 font-bold">
                        25% Discount code: {book.discountCode}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris et ultricies est. Aliquam in justo varius, sagittis
                      neque ut, malesuada leo.
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <Star size={14} className="text-gray-200" />
                        <span className="text-xs text-gray-400 ml-1">
                          ({book.reviews} Review)
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-semibold">
                        Rate: {book.rating}
                      </span>
                    </div>

                    <div className="flex gap-10 mt-4 text-[11px] text-gray-400">
                      <div>
                        <p>Author</p>
                        <p className="font-bold text-gray-800">{book.author}</p>
                      </div>
                      <div>
                        <p>Year</p>
                        <p className="font-bold text-gray-800">{book.year}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <span className="text-2xl font-bold text-gray-800">
                      {book.price}
                    </span>
                    <div className="flex gap-2">
                      <button className="bg-[#d81b60] text-white px-6 py-2 rounded-md flex items-center gap-2 text-sm font-semibold hover:bg-[#ad1457] transition-all">
                        Add To Cart <ShoppingCart size={16} />
                      </button>
                      <button className="p-2 border border-gray-200 rounded-md text-[#d81b60] hover:bg-pink-50">
                        <Heart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 text-pink-400 disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-md text-sm bg-white text-black ${
                    page === i + 1
                      ? "bg-[#d81b60] text-red-500"
                      : "hover:bg-[#d81b60] "
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 text-pink-400 disabled:opacity-40"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-400 italic">
              {startIndex + 1} - {Math.min(startIndex + pageSize, books.length)}{" "}
              of {books.length} Books
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
