import React, { useEffect } from "react";
import { useShopStore } from "../store";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function CartPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useShopStore();

  const subtotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return acc + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.03;
  const total = subtotal + tax;

  return (
    <>
      <div className="space-y-4">
        {cart.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            Your cart is empty
          </div>
        ) : (
          cart.map((book) => (
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
                    {book.title} provides deep insights into {book.author}'s
                    philosophy...
                  </p>
                  <span className="badge badge-ghost text-[10px] text-gray-400 py-3 px-2">
                    Free Shipping
                  </span>
                </div>
              </div>

              <div className="flex-1 flex justify-center items-center gap-3">
                <button
                  onClick={() => {
                    decreaseQuantity(book.id);
                  }}
                  className="btn btn-circle btn-xs btn-outline border-pink-400 text-pink-500"
                >
                  -
                </button>
                <span className="font-bold text-black">{book.quantity}</span>
                <button
                  onClick={() => {
                    increaseQuantity(book.id);
                  }}
                  className="btn btn-circle btn-xs btn-outline border-pink-400 text-pink-500"
                >
                  +
                </button>
              </div>

              <div className="flex-1 text-center font-bold text-gray-700">
                {book.price}
              </div>

              <button
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                onClick={() => removeFromCart(book.id)}
              >
                <Trash2 size={22} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 bg-gray-100 p-8 rounded-xl grid grid-cols-2 gap-10">
        <div>
          <h3 className="font-bold text-xl mb-2">Payment Summary</h3>
          <p className="text-xs text-gray-400 mb-6">
            Tax and shipping are calculated at checkout.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Promo Code"
              className="input input-bordered flex-1 bg-gray-50"
            />
            <button className="btn bg-[#3d344d] text-white hover:bg-black px-8">
              Apply
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>{" "}
            <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Shipping</span>{" "}
            <span className="font-bold text-black">Free Delivery</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Tax (3%)</span>{" "}
            <span className="font-bold text-black">${tax.toFixed(2)}</span>
          </div>
          <div className="divider my-1"></div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-2xl text-[#ed4c89]">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="btn w-full bg-[#ed4c89] border-none text-white hover:bg-[#d81b60] mt-4"
          >
            Check out
          </button>
          <button
            onClick={() => navigate("/books")}
            className="btn w-full btn-outline border-[#ed4c89] text-[#ed4c89] hover:bg-[#ed4c89] mt-2"
          >
            Keep Shopping
          </button>
        </div>
      </div>
    </>
  );
}
