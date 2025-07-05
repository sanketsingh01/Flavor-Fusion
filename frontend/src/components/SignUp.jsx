import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    navigate("/Menu", { replace: true });
  };

  return (
    <section
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: "url('images/bglogin.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 col-md-8">
            <div
              className="card rounded-4 shadow-lg"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(5px)",
              }}
            >
              <div className="card-body p-5">
                <h2
                  className="text-center mb-2"
                  style={{ color: "#23282b", fontWeight: 700 }}
                >
                  Join Flavor Fusion
                </h2>
                <p className="text-center text-muted mb-4">
                  Sign up to explore delicious food and offers!
                </p>
                {submitted && (
                  <div className="alert alert-success">
                    Welcome, {formData.name}! Your signup was successful.
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="phoneno" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneno"
                      name="phoneno"
                      className="form-control"
                      value={formData.phoneno}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn w-100"
                    style={{
                      backgroundColor: "#e69c00",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Sign Up
                  </button>
                </form>
                <div className="text-center mt-3">
                  <small>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#e69c00" }}>
                      Login
                    </Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
