import React, { useState } from "react";

import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        className="btn btn-primary position-fixed top-0 start-0 m-2"
        onClick={() => setShow(!show)}
      >
        ☰
      </button>

      {/* Sidebar navigation */}
      <nav className={`sidebar bg-light ${show ? "show" : ""}`}>
        <ul className="nav flex-column p-3">
          <li className="nav-item mb-2">
            <Link className="nav-link" to="/" onClick={() => setShow(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              className="nav-link"
              to="/customers"
              onClick={() => setShow(false)}
            >
              All Customers
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              className="nav-link"
              to="/products"
              onClick={() => setShow(false)}
            >
              All Products
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              className="nav-link"
              to="/add-product"
              onClick={() => setShow(false)}
            >
              Add Product
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
