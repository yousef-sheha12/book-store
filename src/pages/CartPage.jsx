import React from "react";

export default function CartPage() {
  return (
    <>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white rounded-lg p-4 flex items-center shadow-sm border border-gray-100"
          >
            <div className="flex col-span-2 gap-4 flex-1">
              <img
                src="book-cover.jpg"
                className="w-24 rounded-md"
                alt="Book"
              />
              <div className="space-y-1">
                <h3 className="font-bold text-gray-800">
                  Rich Dad And Poor Dad
                </h3>
                <p className="text-xs text-gray-400">
                  Author: Robert T. Kiyosaki
                </p>
                <p className="text-[10px] text-gray-400 max-w-xs leading-tight">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>
                <span className="badge badge-ghost text-[10px] text-gray-400 py-3 px-2">
                  Free Shipping
                </span>
                <p className="text-[10px] text-gray-400">ASIN : B09TW5RMDB</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex-1 flex justify-center items-center gap-3">
              <button className="btn btn-circle btn-xs btn-outline border-pink-400 text-pink-500">
                -
              </button>
              <span className="font-bold">1</span>
              <button className="btn btn-circle btn-xs btn-outline border-pink-400 text-pink-500">
                +
              </button>
            </div>

            <div className="flex-1 text-center font-bold text-gray-700">
              $40
            </div>
            <div className="flex-1 text-center font-bold text-gray-700">
              $40
            </div>
            <button className="p-2 text-pink-200 hover:text-pink-500">
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-100 p-8 rounded-xl grid grid-cols-2 gap-10">
        <div>
          <h3 className="font-bold text-xl mb-2">Payment Summary</h3>
          <p className="text-xs text-gray-400 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
            <span className="font-bold text-black">$120</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Shipping</span>{" "}
            <span className="font-bold text-black">Free Delivery</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Tax</span> <span className="font-bold text-black">$4</span>
          </div>
          <div className="divider my-1"></div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-2xl text-[#ed4c89]">$124</span>
          </div>
          <button className="btn w-full bg-[#ed4c89] border-none text-white hover:bg-[#d81b60] mt-4">
            Check out
          </button>
          <button className="btn w-full btn-outline border-[#ed4c89] text-[#ed4c89] hover:bg-[#ed4c89] hover:border-[#ed4c89] mt-2">
            Keep Shopping
          </button>
        </div>
      </div>
    </>
  );
}
