import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { User2Icon, ShoppingCartIcon, SearchIcon } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [authUser, setAuthUser] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let color = "transparent";
  if (location.pathname != "/") {
    color = "#23282b";
  }

  return (
    <>
      <header
        className="header_section"
        style={{
          backgroundColor: "#ffffff",
          color: "#23282b",
          transition: "background-color 0.4s ease",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="container">
          <nav className="navbar navbar-expand-lg custom_nav-container d-flex justify-content-between">
            <Link className="navbar-brand" to="/">
              <span>Flavor Fusion</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className=""> </span>
            </button>
            <div
              className="collapse navbar-collapse d-flex justify-content-between"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li
                  className={
                    location.pathname == "/"
                      ? "nav-item active hover-underline"
                      : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only"></span>
                  </Link>
                </li>
                <li
                  className={
                    location.pathname == "/Menu"
                      ? "nav-item active hover-underline"
                      : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/Menu">
                    Menu
                  </Link>
                </li>
                <li
                  className={
                    location.pathname == "/About"
                      ? "nav-item active hover-underline"
                      : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/About">
                    About
                  </Link>
                </li>
                <li
                  className={
                    location.pathname == "/bookTable"
                      ? "nav-item active hover-underline"
                      : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/bookTable">
                    Book Table
                  </Link>
                </li>
              </ul>
              {!authUser ? (
                <div className="user_option">
                  <Link
                    style={{
                      color: "#000000",
                    }}
                    to="/Signup"
                  >
                    Signup
                  </Link>
                  <Link to="/login" className="order_online">
                    log in
                  </Link>
                </div>
              ) : (
                <div className="user_option">
                  <Link to="/profile" className="user_link">
                    <User2Icon className="fa fa-user" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#cartDrawer"
                    aria-controls="cartDrawer"
                  >
                    <ShoppingCartIcon className="text-dark" />
                  </button>
                  {/* <form className="form-inline">
                    <button
                      className="btn my-2 my-sm-0 nav_search-btn text-dark"
                      type="submit"
                    >
                      <SearchIcon className="fa fa-search" aria-hidden="true" />
                    </button>
                  </form> */}
                  <Link to="/Menu" className="order_online">
                    Order Online
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
