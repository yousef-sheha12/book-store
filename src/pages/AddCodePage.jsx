import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddCodePage() {
  const [code, setCode] = useState("");
  //   const location = useLocation();
  const navigate = useNavigate();

  // تأمين الوصول: لو مفيش إيميل ارجع لصفحة نسيان الباسورد
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forget-password");
    }
  }, [email, navigate]);

  const handleCheckCode = async (e) => {
    e.preventDefault();
    if (code.length < 4) return alert("Please enter the full code");

    try {
      const res = await axios.post(
        "https://bookstore.eraasoft.pro/api/check-otp",
        {
          email: email,
          code: code,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      if (res.status === 200 || res.status === 201) {
        // بننقل الإيميل والكود لصفحة تعيين الباسورد الجديد
        navigate("/reset-password", { state: { email, code } });
      }
    } catch (err) {
      console.error("Error details:", err.response?.data);
      alert(err.response?.data?.message || "Invalid Code! Please try again.");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#f8f9fa] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm flex flex-col items-center">
        <h2 className="text-[#d81b60] text-2xl font-bold mb-2">
          Reset your password!
        </h2>
        <p className="text-black text-sm mb-8 text-center">
          Enter the code that you received on your email: <br />
          <span className="text-black font-semibold">{email}</span>
        </p>

        <form onSubmit={handleCheckCode} className="w-full">
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="0000"
              maxLength="6" // الـ API ساعات بيطلب 4 وساعات 6، ظبطها حسب حاجتك
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 border text-black border-gray-300 rounded-md text-center text-3xl tracking-[15px] font-bold focus:border-[#d81b60] outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#d81b60] hover:bg-[#ad1457] text-white py-3 rounded-md font-bold transition-colors disabled:bg-gray-400"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Didn't receive a code?{" "}
          <button className="text-[#d81b60] font-bold hover:underline">
            Send again
          </button>
        </p>
      </div>
    </div>
  );
}
