import React from "react";
import {
  Ticket,
  Truck,
  MinusCircle,
  PlusCircle,
  PencilLine,
} from "lucide-react";

const InputField = ({ label, placeholder, type = "text" }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-pink-500 transition-colors text-gray-700"
    />
  </div>
);

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Shipping & Payment */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Information Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Shipping information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Name" placeholder="John Smith" />
              <InputField label="Phone" placeholder="123456789" />
              <InputField label="Email" placeholder="Johnsmith@gmail.com" />
              <InputField label="City" placeholder="Maadi" />
              <InputField label="State" placeholder="Cairo" />
              <InputField label="Zip" placeholder="11311" />
              <div className="md:col-span-2">
                <InputField
                  label="Address"
                  placeholder="Maadi, Cairo, Egypt."
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  className="accent-pink-500 w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-600">
                  Online payment
                </span>
              </label>
              <label className="flex items-center gap-3 p-4 border-2 border-pink-100 bg-pink-50/50 rounded-xl cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                  className="accent-pink-500 w-4 h-4"
                />
                <span className="text-sm font-bold text-pink-600">
                  Cash on delivery
                </span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  className="accent-pink-500 w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-600">
                  POS on delivery
                </span>
              </label>
            </div>
          </div>

          {/* Note Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Note</h2>
            <div className="relative">
              <textarea
                placeholder="Add note"
                className="w-full h-32 p-4 pt-10 border border-gray-200 rounded-xl outline-none focus:border-pink-500 resize-none text-gray-600"
              />
              <PencilLine
                className="absolute top-4 left-4 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Order summary
            </h2>

            {/* Products List */}
            <div className="space-y-6 mb-8">
              {[1, 2].map((item) => (
                <div key={item} className="flex gap-4">
                  <img
                    src="https://m.media-amazon.com/images/I/81BE7eeKzAL._AC_UF1000,1000_QL80_.jpg"
                    alt="Book"
                    className="w-20 h-28 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">
                        Rich Dad And Poor Dad
                      </h4>
                      <p className="text-xs text-gray-400">
                        Author: Robert T. Kiyosaki
                      </p>
                      <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-[10px] bg-gray-50 text-gray-500 border border-gray-100">
                        <Truck size={10} className="mr-1" /> Free Shipping
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-gray-900">
                        $40
                      </span>
                      <div className="flex items-center gap-3">
                        <MinusCircle
                          size={20}
                          className="text-pink-400 cursor-pointer"
                        />
                        <span className="font-bold text-gray-700">1</span>
                        <PlusCircle
                          size={20}
                          className="text-pink-400 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <p className="text-sm text-gray-400 mb-2">Have a discount code?</p>
            <div className="flex gap-2 mb-8">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Enter Promo Code"
                  className="w-full p-3 pl-10 bg-white border border-gray-200 rounded-lg text-sm outline-none"
                />
                <Ticket
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />
              </div>
              <button className="px-6 py-3 bg-[#332D41] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors">
                Apply
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-3 border-t border-gray-100 pt-6">
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>Subtotal</span>
                <span className="text-gray-900 font-bold">$80</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>Tax</span>
                <span className="text-gray-900 font-bold">$4</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>Shipping</span>
                <span className="text-gray-900 font-bold">$0</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <span className="text-gray-500 font-bold uppercase tracking-tight">
                  Total (USD)
                </span>
                <span className="text-2xl font-black text-[#E11D74]">$84</span>
              </div>
            </div>

            {/* Confirm Button */}
            <button className="w-full mt-8 py-4 bg-[#E11D74] text-white rounded-xl font-bold text-lg hover:bg-[#c01863] transition-all shadow-lg shadow-pink-100">
              Confirm order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
