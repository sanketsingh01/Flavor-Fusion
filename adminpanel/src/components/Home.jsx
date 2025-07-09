import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const stats = [
    {
      title: "Total Customers",
      value: "1,234",
      icon: "bi-people-fill",
      color: "primary",
      change: "+12%",
    },
    {
      title: "Total Products",
      value: "89",
      icon: "bi-box-seam",
      color: "success",
      change: "+5%",
    },
    {
      title: "Total Orders",
      value: "456",
      icon: "bi-cart-fill",
      color: "warning",
      change: "+18%",
    },
  ];

  const quickActions = [
    {
      title: "Add Product",
      description: "Add new product to inventory",
      icon: "bi-plus-circle",
      color: "success",
      path: "/add-product",
    },
    {
      title: "View Customers",
      description: "Manage customer accounts",
      icon: "bi-people",
      color: "primary",
      path: "/customers",
    },
    {
      title: "View Products",
      description: "Browse all products",
      icon: "bi-box-seam",
      color: "info",
      path: "/products",
    },
    {
      title: "Analytics",
      description: "View detailed reports",
      icon: "bi-graph-up",
      color: "warning",
      path: "#",
    },
  ];

  return (
    <>
      <div className="container mt-5">
        {/* Welcome Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card bg-gradient-primary text-white shadow-lg border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h1 className="display-6 mb-2">
                      <i className="bi bi-speedometer2 me-3"></i>
                      Welcome Back, Admin!
                    </h1>
                    <p className="lead mb-0">
                      Here's what's happening with your business today.
                    </p>
                  </div>
                  <div className="text-end">
                    <button
                      className="btn btn-light btn-lg"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="row mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">{stat.title}</h6>
                      <h3 className="mb-0">{stat.value}</h3>
                      <small className="text-success">
                        <i className="bi bi-arrow-up me-1"></i>
                        {stat.change} from last month
                      </small>
                    </div>
                    <div className={`text-${stat.color}`}>
                      <i className={`${stat.icon} display-6`}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          {/* Quick Actions */}
          <div className="col-lg-8 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0">
                <h5 className="mb-0">
                  <i className="bi bi-lightning-fill me-2 text-warning"></i>
                  Quick Actions
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {quickActions.map((action, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <div
                        className="card border-0 bg-light h-100 quick-action-card"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          action.path !== "#" && navigate(action.path)
                        }
                      >
                        <div className="card-body text-center p-3">
                          <div className={`text-${action.color} mb-2`}>
                            <i className={`${action.icon} display-6`}></i>
                          </div>
                          <h6 className="card-title">{action.title}</h6>
                          <p className="card-text text-muted small">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0">
                <h5 className="mb-0">
                  <i className="bi bi-graph-up me-2 text-success"></i>
                  Performance Overview
                </h5>
              </div>
              <div className="card-body text-center py-5">
                <i className="bi bi-graph-up display-1 text-muted"></i>
                <h4 className="text-muted mt-3">Analytics Dashboard</h4>
                <p className="text-muted">
                  Detailed charts and analytics will be displayed here
                </p>
                <button className="btn btn-primary">
                  <i className="bi bi-plus me-2"></i>
                  Add Analytics Integration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        }
        .quick-action-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .quick-action-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
}

export default Home;
