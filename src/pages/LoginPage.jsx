import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import { useAuthStore } from "../store";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const login = useAuthStore((state) => state.login);
  const updateUser = useAuthStore((state) => state.updateUser);

  const handleLogin = async (values) => {
    try {
      const res = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: values.email,
        password: values.password,
      });
      const token = res.data.jwt;
      if (token) {
        login(token);
        updateUser(res.data.user);
        toast.success("Logged in Successfully!");
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      toast.error(error.response?.data?.error?.message || "Login failed ❌");
    }
  };

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().required("Password required"),
  });

  return (
    <main className="grow flex justify-center items-center bg-gray-50 py-20 px-4 text-black">
      <Toaster />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        <Form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl space-y-4">
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

          <button
            type="submit"
            className="w-full bg-[#d81b60] text-white py-3 rounded-lg font-bold hover:bg-[#b0154b] disabled:opacity-60"
          >
            Login
          </button>

          <p className="text-center text-sm">
            Don't have an account?
            <Link to="/signup" className="text-pink-600 font-bold ml-2">
              Signup
            </Link>
          </p>

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
