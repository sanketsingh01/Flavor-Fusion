import React from "react";
import { CalendarCheck, User, Phone, Users } from "lucide-react";
import { toast } from "react-hot-toast";

function handleClick() {
  if (true) {
    toast.success("Registered Successfully");
  }
}
const Booking = () => {
  return (
    <section
      className="py-5 mt-5"
      style={{
        background: "linear-gradient(135deg, #f8f9fa, #f0f4ff, #e6ecff)",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ fontSize: "3rem" }}>
            Reserve Your{" "}
            <span
              style={{
                color: "#ffbe33",
              }}
            >
              Table
            </span>
          </h2>
          <p className="text-muted lead">
            Make your reservation for an unforgettable experience.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="shadow rounded-4 p-4"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(10px)",
              }}
            >
              <form>
                <div className="mb-3">
                  <label className="form-label">
                    <User size={18} className="me-1" />
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <Phone size={18} className="me-1" />
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <Users size={18} className="me-1" />
                    Number of Guests
                  </label>
                  <select className="form-select rounded-pill">
                    <option selected disabled>
                      How many persons?
                    </option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label">
                    <CalendarCheck size={18} className="me-1" />
                    Date
                  </label>
                  <input type="date" className="form-control rounded-pill" />
                </div>
                <div className="text-center">
                  <button
                    className="btn rounded-pill px-4 shadow"
                    style={{
                      color: "#000000",
                      background: "#ffbe33",
                    }}
                    onClick={handleClick}
                  >
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
