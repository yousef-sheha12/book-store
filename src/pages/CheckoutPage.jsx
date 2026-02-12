import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Ticket,
  Truck,
  MinusCircle,
  PlusCircle,
  CreditCard,
  Wallet,
  Banknote,
} from "lucide-react";
import { useShopStore } from "../store";

const CheckoutPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, clearCart } =
    useShopStore();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      state: "",
      zip: "",
      address: "",
      paymentMethod: "cash",
      note: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zip: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      console.log("Order Data:", {
        customer: values,
        items: cart,
        summary: { subtotal, tax, discount, total },
      });
      alert("Order confirmed successfully 🎉");
      clearCart();
    },
  });

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const tax = subtotal * 0.05;
  const total = subtotal + tax - discount;

  const handleApplyPromo = () => {
    if (!promo.trim()) return;

    const validCodes = cart.map((item) => item.discountCode?.toLowerCase());
    const isValid = validCodes.includes(promo.toLowerCase());

    if (isValid) {
      const discountValue = (subtotal + tax) * 0.1;
      setDiscount(discountValue);
      alert("Promo applied 🎉 10% discount added");
    } else {
      setDiscount(0);
      alert("Invalid promo code ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-12 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Section */}
        <form
          onSubmit={formik.handleSubmit}
          className="lg:col-span-7 space-y-6"
        >
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Truck size={20} className="text-pink-500" /> Shipping information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputGroup
                label="Name"
                name="name"
                formik={formik}
                placeholder="John Smith"
              />
              <InputGroup
                label="Phone"
                name="phone"
                formik={formik}
                placeholder="123456789"
              />
              <InputGroup
                label="Email"
                name="email"
                formik={formik}
                placeholder="johnsmith@gmail.com"
                type="email"
              />
              <InputGroup
                label="City"
                name="city"
                formik={formik}
                placeholder="Maadi"
              />
              <InputGroup
                label="State"
                name="state"
                formik={formik}
                placeholder="Cairo"
              />
              <InputGroup
                label="Zip"
                name="zip"
                formik={formik}
                placeholder="11311"
              />
              <div className="md:col-span-2">
                <InputGroup
                  label="Address"
                  name="address"
                  formik={formik}
                  placeholder="Maadi, Cairo, Egypt."
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <CreditCard size={20} className="text-pink-500" /> Payment Method
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <PaymentOption
                id="online"
                value="online"
                label="Online payment"
                icon={<Wallet size={14} />}
                formik={formik}
              />
              <PaymentOption
                id="cash"
                value="cash"
                label="Cash on delivery"
                icon={<Banknote size={14} />}
                formik={formik}
              />
              <PaymentOption
                id="pos"
                value="pos"
                label="POS on delivery"
                icon={<CreditCard size={14} />}
                formik={formik}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4">Note</h3>
            <textarea
              name="note"
              onChange={formik.handleChange}
              value={formik.values.note}
              placeholder="Add any special instructions for your delivery..."
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-pink-500 min-h-30 text-sm"
            />
          </div>
        </form>

        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
            <h2 className="text-xl font-bold mb-6">Order summary</h2>

            <div className="space-y-6 mb-8 max-h-87.5 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-24 object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="grow space-y-1">
                    <h4 className="font-bold text-sm leading-tight text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-400">
                      Author: {item.author}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-gray-900">
                        ${item.price}
                      </span>
                      <div className="flex items-center gap-3 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                        <MinusCircle
                          size={18}
                          onClick={() => decreaseQuantity(item.id)}
                          className="text-pink-500 cursor-pointer hover:text-pink-600"
                        />
                        <span className="font-bold text-sm w-4 text-center">
                          {item.quantity}
                        </span>
                        <PlusCircle
                          size={18}
                          onClick={() => increaseQuantity(item.id)}
                          className="text-pink-500 cursor-pointer hover:text-pink-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mb-2 font-medium">
              Have a discount code?
            </p>
            <div className="flex gap-2 mb-8">
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Enter Promo Code"
                className="grow p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-pink-500"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-6 py-3 bg-[#332D41] text-white rounded-lg text-sm font-bold hover:bg-black transition-colors"
              >
                Apply
              </button>
            </div>

            <div className="space-y-3 border-t border-gray-50 pt-6">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span className="text-gray-900 font-bold">
                  ${subtotal.toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Tax (5%)</span>
                <span className="text-gray-900 font-bold">
                  ${tax.toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm pb-4">
                <span>Shipping</span>
                <span className="text-green-600 font-bold underline decoration-dotted underline-offset-4">
                  Free
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between py-3 px-4 bg-green-50 rounded-xl text-green-700 text-sm border border-green-100 animate-pulse-once">
                  <span className="flex items-center gap-2 font-medium">
                    <Ticket size={16} /> Promo Discount (10%)
                  </span>
                  <span className="font-bold">-${discount.toFixed(0)}</span>
                </div>
              )}

              <div className="flex justify-between pt-6 border-t border-gray-100 mt-4">
                <div className="flex flex-col">
                  <span className="text-gray-600 font-bold">Total Amount</span>
                  <span className="text-[10px] text-gray-400">
                    Tax and discount included
                  </span>
                </div>
                <span className="text-3xl font-black text-[#E11D74]">
                  ${total.toFixed(0)}
                </span>
              </div>
            </div>

            <button
              onClick={() => formik.handleSubmit()}
              className="w-full mt-8 py-4 bg-[#E11D74] text-white rounded-xl font-bold text-lg hover:bg-[#c01863] transition-all shadow-lg shadow-pink-100 flex items-center justify-center gap-2"
            >
              Confirm order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, name, formik, placeholder, type = "text" }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <input
      {...formik.getFieldProps(name)}
      type={type}
      placeholder={placeholder}
      className={`w-full p-3.5 bg-gray-50 border ${
        formik.touched[name] && formik.errors[name]
          ? "border-red-500"
          : "border-gray-200"
      } rounded-xl outline-none focus:border-pink-500 focus:bg-white text-sm transition-all`}
    />
    {formik.touched[name] && formik.errors[name] && (
      <span className="text-[10px] text-red-500 ml-1 font-medium">
        {formik.errors[name]}
      </span>
    )}
  </div>
);

const PaymentOption = ({ id, value, label, icon, formik }) => {
  const isSelected = formik.values.paymentMethod === value;
  return (
    <label
      htmlFor={id}
      className={`flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-2xl cursor-pointer transition-all ${
        isSelected
          ? "border-pink-500 bg-pink-50/30 text-pink-600 shadow-sm"
          : "border-gray-100 text-gray-400 hover:border-gray-200"
      }`}
    >
      <input
        type="radio"
        id={id}
        name="paymentMethod"
        value={value}
        onChange={formik.handleChange}
        checked={isSelected}
        className="hidden"
      />
      <div
        className={`p-2 rounded-full ${isSelected ? "bg-pink-100 text-pink-600" : "bg-gray-100 text-gray-400"}`}
      >
        {icon}
      </div>
      <span className="text-[11px] font-bold text-center leading-tight">
        {label}
      </span>
    </label>
  );
};

export default CheckoutPage;
