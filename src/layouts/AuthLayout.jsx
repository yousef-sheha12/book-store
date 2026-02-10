import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
