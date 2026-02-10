import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

export default function SignupPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* ================= API (Strapi Configured) ================= */
  const handleSignup = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          // Strapi يتطلب username إجبارياً، لذا نضع فيه قيمة الإيميل
          username: values.email,
          email: values.email,
          password: values.password,
        },
      );

      // Strapi يعيد التوكن في حقل jwt
      const token = res.data.jwt;

      sessionStorage.setItem("token", token);

      // التوجيه لصفحة تسجيل الدخول أو الصفحة الرئيسية حسب منطق تطبيقك
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
      // عرض رسالة الخطأ القادمة من Strapi
      alert(error.response?.data?.error?.message || "Registration failed ❌");
    }
  };

  /* ================= Validation ================= */
  const registerSchema = Yup.object({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .min(8, "Password must be 8+ characters")
      .required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password required"),
  });

  /* ================= UI (Unchanged) ================= */
  return (
    <main className="flex-grow flex justify-center items-center bg-gray-50 py-20 px-4 text-black">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={handleSignup}
      >
        <Form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl space-y-4">
          {/* First Name */}
          <div>
            <label className="font-bold text-sm">First Name</label>
            <Field
              name="firstName"
              className="w-full p-3 border rounded-lg"
              placeholder="First name"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="font-bold text-sm">Last Name</label>
            <Field
              name="lastName"
              className="w-full p-3 border rounded-lg"
              placeholder="Last name"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-bold text-sm">Email</label>
            <Field
              name="email"
              type="email"
              className="w-full p-3 border rounded-lg"
              placeholder="example@gmail.com"
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
              className="w-full p-3 border rounded-lg pr-10"
              placeholder="Enter password"
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

          {/* Confirm */}
          <div className="relative">
            <label className="font-bold text-sm">Confirm Password</label>
            <Field
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              className="w-full p-3 border rounded-lg pr-10"
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-10 text-gray-400"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#d81b60] text-white py-3 rounded-lg font-bold hover:bg-[#b0154b]"
          >
            Sign Up
          </button>

          {/* Links */}
          <p className="text-center text-sm">
            Already have an account?
            <Link to="/login" className="text-pink-600 font-bold ml-2">
              Login
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
