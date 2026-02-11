import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ticket, Truck, MinusCircle, PlusCircle } from "lucide-react";
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
      alert("Order confirmed successfully 🎉 Check console for details.");
      clearCart();
    },
  });

  const subtotal = useMemo(() => {
    return (cart || []).reduce((total, item) => {
      const price = Number(String(item.price).replace(/[^\d.]/g, "")) || 0;
      const quantity = Number(item.quantity) || 0;

      return total + price * quantity;
    }, 0);
  }, [cart]);

  const tax = subtotal * 0.05;
  const total = subtotal + tax - discount;

  const handleApplyPromo = () => {
    if (promo === "BOOK10") setDiscount(subtotal * 0.1);
    else setDiscount(0);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-12 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form
          onSubmit={formik.handleSubmit}
          className="lg:col-span-7 space-y-6"
        >
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6">Shipping information</h3>
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
            <h3 className="text-lg font-bold mb-6">Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <PaymentOption
                id="online"
                value="online"
                label="Online payment"
                formik={formik}
              />
              <PaymentOption
                id="cash"
                value="cash"
                label="Cash on delivery"
                formik={formik}
              />
              <PaymentOption
                id="pos"
                value="pos"
                label="POS on delivery"
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
              placeholder="Add note"
              className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-pink-500 min-h-[120px]"
            />
          </div>
        </form>

        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
            <h2 className="text-xl font-bold mb-6">Order summary</h2>

            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-24 object-cover rounded-lg"
                  />
                  <div className="grow space-y-1">
                    <h4 className="font-bold text-sm leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-400">
                      Author: {item.author}
                    </p>
                    <div className="flex items-center text-[10px] text-gray-500 bg-gray-50 w-fit px-2 py-1 rounded border border-gray-100">
                      <Truck size={12} className="mr-1" /> Free Shipping
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-lg">
                        $
                        {(
                          parseFloat(
                            String(item.price).replace(/[^0-9.]/g, ""),
                          ) || 0
                        ).toFixed(0)}
                      </span>
                      <div className="flex items-center gap-3">
                        <MinusCircle
                          size={20}
                          onClick={() => decreaseQuantity(item.id)}
                          className="text-pink-500 cursor-pointer"
                        />
                        <span className="font-bold">{item.quantity}</span>
                        <PlusCircle
                          size={20}
                          onClick={() => increaseQuantity(item.id)}
                          className="text-pink-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mb-2">Have a discount code?</p>
            <div className="flex gap-2 mb-8">
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Enter Promo Code"
                className="grow p-3 border border-gray-200 rounded-lg text-sm outline-none"
              />
              <button
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
                <span>Tax</span>
                <span className="text-gray-900 font-bold">
                  ${tax.toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm pb-4">
                <span>Shipping</span>
                <span className="text-gray-900 font-bold">$0</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <span className="text-gray-500 font-bold">Total (USD)</span>
                <span className="text-2xl font-black text-[#E11D74]">
                  ${total.toFixed(0)}
                </span>
              </div>
            </div>

            <button
              onClick={() => formik.handleSubmit()}
              className="w-full mt-8 py-4 bg-[#E11D74] text-white rounded-xl font-bold text-lg hover:bg-[#c01863] transition-all shadow-lg shadow-pink-100"
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
  <div className="flex flex-col gap-1 w-full">
    <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
      {label}
    </label>
    <input
      {...formik.getFieldProps(name)}
      type={type}
      placeholder={placeholder}
      className={`w-full p-3 bg-white border ${formik.touched[name] && formik.errors[name] ? "border-red-500" : "border-gray-200"} rounded-lg outline-none focus:border-pink-500 text-sm transition-all`}
    />
  </div>
);

const PaymentOption = ({ id, value, label, formik }) => {
  const isSelected = formik.values.paymentMethod === value;
  return (
    <label
      htmlFor={id}
      className={`flex items-center justify-center gap-2 p-4 border rounded-xl cursor-pointer transition-all ${
        isSelected
          ? "border-pink-500 bg-pink-50 text-pink-600"
          : "border-gray-200 text-gray-500"
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
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-pink-500" : "border-gray-300"}`}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-pink-500" />}
      </div>
      <span className="text-xs font-bold">{label}</span>
    </label>
  );
};

export default CheckoutPage;
