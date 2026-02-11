import React, { useEffect } from "react";
import { useShopStore } from "../store";
import { Trash2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const { wishlist, toggleWishlist, addToCart } = useShopStore();

  const totalWishlistPrice = wishlist.reduce((acc, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return acc + price;
  }, 0);

  const handleMoveAllToCart = () => {
    wishlist.forEach((item) => addToCart(item));
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto mt-16">
        <div className="space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-10 text-gray-400 font-bold bg-white rounded-xl border border-dashed">
              Your wishlist is empty
            </div>
          ) : (
            wishlist.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg p-4 flex items-center shadow-sm border border-gray-100"
              >
                <div className="flex col-span-2 gap-4 flex-1">
                  <img
                    src={book.image}
                    className="w-24 rounded-md"
                    alt={book.title}
                  />
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-800">{book.title}</h3>
                    <p className="text-xs text-gray-400">{book.author}</p>
                    <p className="text-[10px] text-gray-400 max-w-xs leading-tight">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    </p>
                    <span className="badge badge-ghost text-[10px] text-gray-400 py-3 px-2">
                      Free Shipping
                    </span>
                  </div>
                </div>

                <div className="flex-1 text-center font-bold text-gray-700">
                  {book.price}
                </div>

                <button
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                  title="Remove item"
                  onClick={() => toggleWishlist(book)}
                >
                  <Trash2 size={22} />
                </button>
              </div>
            ))
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleMoveAllToCart}
              className="px-8 py-3 rounded-lg border-2 border-pink-200 text-pink-500 font-semibold hover:bg-pink-50 transition-colors w-full sm:w-auto"
            >
              Move to cart
            </button>

            <button
              onClick={() => navigate("/checkout")}
              className="flex items-center justify-between px-6 py-3 rounded-lg bg-[#E11D74] text-white font-semibold hover:bg-[#c01863] transition-all w-full sm:w-64 shadow-lg shadow-pink-200"
            >
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] opacity-80 uppercase">
                  {wishlist.length} Items
                </span>
                <span className="text-lg">
                  ${totalWishlistPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>Check out</span>
                <div className="bg-white/20 p-1 rounded-md">
                  <ArrowRight size={18} />
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
