import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useAuthStore } from "../store";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login, updateUser } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username: values.email,
          email: values.email,
          password: values.password,
        },
      );

      if (res.data.jwt) {
        const token = res.data.jwt;
        login(token);
        updateUser({
          ...res.data.user,
          first_name: values.firstName,
          last_name: values.lastName,
        });
        toast.success("Registered Successfully! ");
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      console.log("Error Details:", error.response?.data);
      toast.error(
        error.response?.data?.error?.message || "Registration failed ❌",
      );
    }
  };

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

  return (
    <main className="grow flex justify-center items-center bg-gray-50 py-20 px-4 text-black">
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

          <button
            type="submit"
            className="w-full bg-[#d81b60] text-white py-3 rounded-lg font-bold hover:bg-[#b0154b]"
          >
            Sign Up
          </button>

          <p className="text-center text-sm">
            Already have an account?
            <Link to="/login" className="text-pink-600 font-bold ml-2">
              Login
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
      {/* <Toaster /> */}
    </main>
  );
}
