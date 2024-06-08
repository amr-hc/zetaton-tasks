import React from "react";
import { MyNavbar } from "../components/MyNavbar";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <MyNavbar />
      <div className="m-3 flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
