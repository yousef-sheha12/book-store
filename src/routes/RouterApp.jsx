import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AddCodePage from "../pages/AddCodePage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import HomePage from "../pages/HomePage";
import { useAuthStore } from "../store";
import AuthLayout from "../layouts/AuthLayout";
import SecondAuthLayout from "../layouts/SecondAuthLayout";
import MainLayout from "../layouts/MainLayout";
import AboutPage from "../pages/AboutPage";
import ProfilePage from "../pages/ProfilePage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import BookPage from "../pages/BookPage";
import ProductDetails from "../pages/ProductDetails";
import WishlistPage from "../pages/WishlistPage";

export default function RouterApp() {
  const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // لو مش مسجل، ابعته لصفحة اللوجن
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  };
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="add-code" element={<AddCodePage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="forget-password" element={<ForgetPasswordPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route element={<SecondAuthLayout />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/books" element={<BookPage />} />
              <Route path="/productdetails" element={<ProductDetails />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
