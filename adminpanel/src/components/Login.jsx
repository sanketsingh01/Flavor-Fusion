import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.email === "admin@example.com" && data.password === "password") {
      localStorage.setItem("token", "admin-token");
      setIsLoggedIn(true);
      navigate("/", { replace: true });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="form-control"
            placeholder="admin@example.com"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
            className="form-control"
            placeholder="password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
