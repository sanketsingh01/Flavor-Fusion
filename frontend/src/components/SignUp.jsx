import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    imageUrl: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSubmitted(true);
    // console.log(formData);
    // submitContact(formData);
    // navigate("/Menu", { replace: true });

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      imageUrl: formData.imageUrl,
    };

    try {
      setErrorMessage("");
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        payload
      );
      console.log("SIgnUp data: ", response.data);
      setSuccessMessage(
        response.data.message || "User registered successfully"
      );
    } catch (error) {
      console.log("Error while signup: ", error);
      setErrorMessage("Failed to signup user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage || "SignUp Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      setSubmitted(true);

      navigate("/login", { replace: true });
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
        backgroundImage: "url('images/bglogin.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container py-5 w-100">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div
              className="card rounded-4 shadow-lg w-100"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(5px)",
              }}
            >
              <div className="card-body p-4">
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
                  <div className="form-group mb-3">
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
                  <div className="form-group mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="address" className="form-label">
                      Your Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      className="form-control"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={1}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="imageUrl" className="form-label">
                      Profile Image URL
                    </label>
                    <input
                      type="text"
                      id="imageUrl"
                      name="imageUrl"
                      className="form-control"
                      value={formData.imageUrl}
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
                    {loading ? "Loading..." : "Sign Up"}
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
