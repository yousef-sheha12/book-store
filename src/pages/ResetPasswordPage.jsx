import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // استلام البيانات من الصفحة اللي فاتت (AddCodePage)
  const email = location.state?.email;
  const code = location.state?.code;

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation)
      return alert("Passwords do not match!");

    try {
      const res = await axios.post(
        "http://localhost:1337/api/auth/reset-password",
        {
          code: code, // الكود الذي استلمه المستخدم في الإيميل
          password: password,
          passwordConfirmation: passwordConfirmation, // التسمية الخاصة بـ Strapi
        },
      );

      if (res.status === 200) {
        alert("Password changed successfully!");
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.error?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex h-screen bg-white flex-col items-center justify-center py-20 px-4">
      <h2 className="text-[#d81b60] text-xl font-bold mb-2">
        Create new password!
      </h2>
      <p className="text-gray-500 text-sm mb-8 text-center max-w-sm">
        Create a strong password for{" "}
        <span className="font-bold text-black">{email}</span>
      </p>

      <form
        onSubmit={handleResetPassword}
        className="w-full max-w-md space-y-4"
      >
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#d81b60]"
            required
            minLength={8}
          />
          <p className="text-[10px] text-black mt-1">
            Must be at least 8 characters
          </p>
        </div>

        <div>
          <label className="block text-black text-sm font-bold mb-2">
            Confirm password
          </label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirm password"
            className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#d81b60]"
            required
          />
        </div>

        <div className="flex items-center gap-2 py-2">
          <input type="checkbox" className="accent-[#d81b60]" />
          <span className="text-xs text-gray-600">Remember me</span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#d81b60] hover:bg-[#ad1457] text-white font-bold py-3 px-4 rounded-md transition-colors disabled:bg-gray-400"
        >
          Reset Passsword
        </button>
      </form>
    </div>
  );
}
