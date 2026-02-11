import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");

    try {
      const res = await axios.post(
        "http://localhost:1337/api/auth/forgot-password",
        { email: email },
      );

      if (res.status === 200) {
        navigate("/add-code", { state: { email: email } });
      }
    } catch (err) {
      alert(err.response?.data?.error?.message || "Error occurred");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center py-20 px-4 bg-[#f8f9fa]">
      <h2 className="text-[#d81b60] text-2xl font-bold mb-2">
        Forget Password?
      </h2>
      <p className="text-black text-sm mb-8 text-center">
        Enter your email to reset your password
      </p>

      <form
        onSubmit={handleForgetPassword}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm"
      >
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Example@gmail.com"
            className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-[#d81b60] transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#d81b60] hover:bg-[#ad1457] text-white font-bold py-3 px-4 rounded-md mt-4 transition-colors disabled:bg-gray-400"
        >
          submit
        </button>
      </form>

      <button
        onClick={() => navigate("/login")}
        className="mt-6 text-sm text-gray-500 hover:text-[#d81b60] font-medium"
      >
        Back to Login
      </button>
    </div>
  );
}
