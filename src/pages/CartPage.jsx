import React, { useEffect } from "react";
import { useShopStore } from "../store";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useShopStore();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.03;
  const total = subtotal + tax;

  return (
    <div className="max-w-7xl mx-auto py-6 text-black">
      <div className="space-y-4 px-4 md:px-8">
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-lg">Your cart is empty</p>
            <button
              onClick={() => navigate("/books")}
              className="mt-4 text-[#ed4c89] font-bold underline"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          cart.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm border border-gray-50 transition-all hover:shadow-md"
            >
              <div className="flex gap-4 w-full md:flex-2">
                <img
                  src={book.image}
                  className="w-20 h-28 md:w-24 md:h-32 object-cover rounded-xl"
                  alt={book.title}
                />
                <div className="flex flex-col justify-center space-y-1 grow">
                  <h3 className="font-bold text-gray-800 text-sm md:text-base line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-400 italic">{book.author}</p>
                  <div className="hidden md:block">
                    <p className="text-[10px] text-gray-400 max-w-xs leading-tight line-clamp-2">
                      {book.title} provides deep insights into philosophy...
                    </p>
                  </div>
                  <div className="pt-1">
                    <span className="bg-gray-50 text-[10px] text-gray-500 py-1 px-2 rounded-md border border-gray-100">
                      Free Shipping
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full md:w-auto md:flex-[1.5] gap-4 border-t md:border-t-0 pt-3 md:pt-0">
                <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-full border border-gray-100">
                  <button
                    onClick={() => decreaseQuantity(book.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-pink-500"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-sm min-w-5 text-center">
                    {book.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(book.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-pink-500"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="font-bold text-gray-800 text-lg">
                  ${(book.price * book.quantity).toFixed(0)}
                </div>

                <button
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  onClick={() => removeFromCart(book.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="mt-10 mx-4 md:mx-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="order-2 lg:order-1">
            <h3 className="font-bold text-lg mb-2">Have a Promo Code?</h3>
            <p className="text-xs text-gray-400 mb-4">
              Apply your code to get an instant discount on your order.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Promo Code"
                className="input input-bordered flex-1 bg-gray-50 focus:border-[#ed4c89] rounded-xl outline-none"
              />
              <button className="btn bg-[#3d344d] text-white hover:bg-black px-6 rounded-xl border-none">
                Apply
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-3">
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Shipping</span>
              <span className="font-bold text-green-600">Free Delivery</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Tax (3%)</span>
              <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
            </div>
            <div className="h-px bg-gray-100 my-4"></div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-xl">Total</span>
              <span className="font-black text-3xl text-[#ed4c89]">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => navigate("/checkout")}
                className="btn w-full bg-[#ed4c89] border-none text-white hover:bg-[#d81b60] h-14 rounded-2xl shadow-lg shadow-pink-100 text-lg"
              >
                Check out
              </button>
              <button
                onClick={() => navigate("/books")}
                className="btn w-full btn-outline border-gray-200 text-gray-500 hover:bg-gray-50 h-14 rounded-2xl border-2"
              >
                Keep Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
