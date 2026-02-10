import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import { useAuthStore } from "../store";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // 1. اجلب دالة الـ login من الـ Store
  const login = useAuthStore((state) => state.login);

  /* ================= API ================= */
  const handleLogin = async (values) => {
    try {
      const res = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: values.email,
        password: values.password,
      });

      const token = res.data.jwt;

      // 2. استخدم دالة الـ Store بدلاً من localStorage.setItem يدوياً
      // دي هتخلي isAuthenticated تبقى true فوراً والـ Router يشوفها
      login(token);

      // 3. التوجيه هيشتغل دلوقتي لأن الـ Store اتحدث
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      alert(error.response?.data?.error?.message || "Login failed ❌");
    }
  };

  /* ================= Validation ================= */
  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().required("Password required"),
  });

  /* ================= UI (Unchanged) ================= */
  return (
    <main className="flex-grow flex justify-center items-center bg-gray-50 py-20 px-4 text-black">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        <Form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl space-y-4">
          {/* Email */}
          <div>
            <label className="font-bold text-sm">Email</label>
            <Field
              name="email"
              type="email"
              placeholder="example@gmail.com"
              className="w-full p-3 border rounded-lg"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="font-bold text-sm">Password</label>
            <Field
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full p-3 border rounded-lg pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="flex items-end justify-end">
            <Link to="/forget-password" className="text-[#d81b60] mr-5">
              Forget Password ?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#d81b60] text-white py-3 rounded-lg font-bold hover:bg-[#b0154b] disabled:opacity-60"
          >
            Login
          </button>

          {/* Links */}
          <p className="text-center text-sm">
            Don't have an account?
            <Link to="/signup" className="text-pink-600 font-bold ml-2">
              Signup
            </Link>
          </p>

          {/* Social */}
          <div className="space-y-2">
            <button className="w-full border py-3 rounded-lg flex justify-center gap-2">
              <FcGoogle /> Google
            </button>
            <button className="w-full border py-3 rounded-lg flex justify-center gap-2">
              <FaFacebook className="text-blue-600" /> Facebook
            </button>
          </div>
        </Form>
      </Formik>
    </main>
  );
}
