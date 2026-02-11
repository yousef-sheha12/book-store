import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function SecondAuthLayout() {
  return (
    <div className="auth-layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
