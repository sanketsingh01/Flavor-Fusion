import React from "react";

import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CartDrawer from "../CartDrawer";

const Layout = () => {
  const location = useLocation();

  const hideHeaderFooterRoutes = ["/login", "/Signup"];

  const shouldhide = hideHeaderFooterRoutes.includes(location.pathname);
  return (
    <>
      {!shouldhide && <Navbar />}
      <CartDrawer />
      <Outlet />
      {!shouldhide && <Footer />}
    </>
  );
};

export default Layout;
