import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MenuIcon,
  GaugeIcon,
  UsersIcon,
  PackageIcon,
  PlusCircleIcon,
} from "lucide-react";

import "./sidebar.css";

function Sidebar() {
  const [show, setShow] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: <GaugeIcon className="me-2" size={18} />,
    },
    {
      path: "/customers",
      label: "Customers",
      icon: <UsersIcon className="me-2" size={18} />,
    },
    {
      path: "/products",
      label: "Products",
      icon: <PackageIcon className="me-2" size={18} />,
    },
    {
      path: "/add-product",
      label: "Add Product",
      icon: <PlusCircleIcon className="me-2" size={18} />,
    },
  ];

  const handleLinkClick = () => {
    setShow(false);
  };

  return (
    <>
      <button
        className="btn btn-primary position-fixed top-0 start-0 m-2 sidebar-toggle"
        onClick={() => setShow(!show)}
        style={{ zIndex: 1000 }}
      >
        <MenuIcon className="h-5 w-5" style={{ color: "#ffffff" }} />
      </button>

      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${show ? "show" : ""}`}
        onClick={() => setShow(false)}
      ></div>

      {/* Sidebar navigation */}
      <nav className={`sidebar bg-white ${show ? "show" : ""}`}>
        <div className="p-3 border-bottom">
          <h5 className="text-primary mb-0 d-flex align-items-center">
            <PackageIcon size={20} className="me-2" />
            Admin Panel
          </h5>
        </div>

        <ul className="nav flex-column p-3">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item mb-1">
              <Link
                className={`nav-link d-flex align-items-center ${
                  location.pathname === item.path ? "active" : ""
                }`}
                to={item.path}
                onClick={handleLinkClick}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
