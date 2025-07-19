import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // setSubmitted(true);
    // submitForm(formData);
    // navigate("/Menu", { replace: true });

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      setErrorMessage(null);
      setSuccessMessage(null);
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/user/login",
        payload
      );
      console.log("Login Data: ", response.data);
      setSuccessMessage(
        `${response.data.message}: ${response.data.body.name}` ||
          `User LoggedIn Successfully: ${response.body.data.name}`
      );

      localStorage.setItem("user", JSON.stringify(response.data.body));
    } catch (error) {
      console.log("Error while login: ", error);
      setErrorMessage("Failed to signup user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage || "LoggedIn Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      setSubmitted(true);
      navigate("/", { replace: true }); // Navigate to Home
    }

    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, [successMessage, errorMessage, navigate]);

  return (
    <section
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: "url('images/foodherobg.avif')",
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
                  Welcome Back
                </h2>
                <p className="text-center text-muted mb-4">
                  Login to continue enjoying Flavor Fusion
                </p>
                {submitted && (
                  <div className="alert alert-success">
                    Login successful — welcome back!
                  </div>
                )}
                <form onSubmit={handleSubmit}>
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
                  <button
                    type="submit"
                    className="btn w-100"
                    style={{
                      backgroundColor: "#e69c00",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    {loading ? "Loading..." : "Log In"}
                  </button>
                </form>
                <div className="text-center mt-3">
                  <small>
                    New to Flavor Fusion?{" "}
                    <Link to="/Signup" style={{ color: "#e69c00" }}>
                      Sign up
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

export default LoginPage;
