import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <section
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#23282b",
          color: "#fff",
          padding: "2rem",
        }}
      >
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8">
              <img
                src="images/f2.png"
                alt="404 food image"
                className="img-fluid mb-4 rounded-4 shadow"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />
              <h1 className="display-3 fw-bold">404</h1>
              <h2 className="mb-3">Page Not Found</h2>
              <p className="text-light mb-4">
                Oops! The page you’re looking for doesn’t exist. Maybe you’d
                like to go back to our menu and find something tasty instead?
              </p>
              <Link
                to="/"
                className="btn btn-lg"
                style={{
                  backgroundColor: "#e69c00",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
