import React, { useState } from "react";
import {
  Pencil,
  Lock,
  LogOut,
  Facebook,
  Instagram,
  UserCircle2,
  ShoppingBag,
} from "lucide-react";

const Profile = () => {
  const userData = {
    name: "Sanket Singh",
    email: "sanket@example.com",
    photo: "images/client2.jpg",
    phone: "+91 9876543210",
    address: "123 Street, Mukerian, Punjab",
    about:
      "Passionate foodie and software engineer who loves exploring new tastes and building beautiful user experiences.",
    createdAt: "2023-02-15",
    loyaltyPoints: 240,
    social: {
      facebook: "https://facebook.com/sanket",
      instagram: "https://instagram.com/sanket",
    },
    pastOrders: [
      { id: 1, item: "Margherita Pizza", price: 8.99, date: "2025-07-01" },
      { id: 2, item: "Pasta Alfredo", price: 9.49, date: "2025-06-28" },
      { id: 3, item: "Veggie Burger", price: 5.99, date: "2025-06-22" },
    ],
  };

  const [activeTab, setActiveTab] = useState("profile");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [formData, setFormData] = useState({
    name: userData.name,
    phone: userData.phone,
    address: userData.address,
    about: userData.about,
  });

  const [newPassword, setNewPassword] = useState("");

  const handleEditSave = () => {
    console.log("Updated data", formData);
    setShowEditModal(false);
  };

  const handlePasswordSave = () => {
    console.log("New password", newPassword);
    setShowPasswordModal(false);
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center mt-5"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8f9fa, #e0eafc, #cfdef3, #e0eafc)",
      }}
    >
      <div
        className="card border-0 shadow-lg rounded-4 p-4"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.65)",
          maxWidth: "650px",
          width: "100%",
        }}
      >
        {/* Profile header */}
        <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
          <img
            src={userData.photo}
            alt="profile"
            className="rounded-circle me-3 shadow"
            width="80"
            height="80"
            style={{ objectFit: "cover", border: "3px solid #ffbe33" }}
          />
          <div>
            <h4 className="mb-0 fw-bold">{userData.name}</h4>
            <small className="text-muted">{userData.email}</small>
            <br />
            <small className="text-secondary fst-italic">
              Joined on {userData.createdAt}
            </small>
          </div>
          <button
            className="btn ms-auto d-flex align-items-center gap-1"
            onClick={() => setShowEditModal(true)}
            style={{
              background: "#ffbe33",
              color: "#000000",
            }}
          >
            <Pencil size={16} /> Edit
          </button>
        </div>

        {/* Tabs */}
        <ul className="nav nav-pills mb-3 gap-2" role="tablist">
          <li className="nav-item flex-fill" role="presentation">
            <button
              className={`nav-link w-100 d-flex align-items-center justify-content-center gap-1 ${
                activeTab === "profile" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("profile")}
              style={{
                color: "#000000",
              }}
            >
              <UserCircle2 size={18} /> Profile
            </button>
          </li>
          <li className="nav-item flex-fill" role="presentation">
            <button
              className={`nav-link w-100 d-flex align-items-center justify-content-center gap-1 ${
                activeTab === "orders" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("orders")}
              style={{
                color: "#000000",
              }}
            >
              <ShoppingBag size={18} /> Orders
            </button>
          </li>
        </ul>

        {/* Tab contents */}
        <div className="tab-content">
          {activeTab === "profile" && (
            <div>
              <h5 className="fw-semibold mb-3">Account Information</h5>
              <div className="list-group list-group-flush mb-3">
                <div className="list-group-item bg-transparent border-0">
                  <strong>Name:</strong> {formData.name}
                </div>
                <div className="list-group-item bg-transparent border-0">
                  <strong>Email:</strong> {userData.email}
                </div>
                <div className="list-group-item bg-transparent border-0">
                  <strong>Phone:</strong> {formData.phone}
                </div>
                <div className="list-group-item bg-transparent border-0">
                  <strong>Address:</strong> {formData.address}
                </div>
                <div className="list-group-item bg-transparent border-0">
                  <strong>About:</strong> {formData.about}
                </div>
              </div>
              <div className="mb-3">
                <strong>Loyalty Points:</strong>{" "}
                <span className="badge bg-success">
                  {userData.loyaltyPoints}
                </span>
              </div>
              <div className="mt-4 d-flex justify-content-end gap-2">
                <button
                  className="btn btn-outline-secondary d-flex align-items-center gap-1"
                  onClick={() => setShowPasswordModal(true)}
                >
                  <Lock size={16} /> Change Password
                </button>
                <button className="btn btn-danger d-flex align-items-center gap-1">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
          {activeTab === "orders" && (
            <div>
              <h5 className="fw-semibold mb-3">Past Orders</h5>
              {userData.pastOrders.length > 0 ? (
                <>
                  <div className="progress mb-3" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{
                        width: `${(userData.pastOrders.length / 10) * 100}%`,
                      }}
                      aria-valuenow={userData.pastOrders.length}
                      aria-valuemin="0"
                      aria-valuemax="10"
                    ></div>
                  </div>
                  <div className="list-group">
                    {userData.pastOrders.map((order) => (
                      <div
                        key={order.id}
                        className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0"
                      >
                        <div>
                          <strong>{order.item}</strong>
                          <br />
                          <small className="text-muted">{order.date}</small>
                        </div>
                        <span className="fw-bold text-success">
                          ${order.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-muted">No orders yet.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <div
        className={`modal fade ${showEditModal ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button
                className="btn-close"
                onClick={() => setShowEditModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label className="form-label">Name</label>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Phone</label>
                <input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Address</label>
                <input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label className="form-label">About</label>
                <textarea
                  value={formData.about}
                  onChange={(e) =>
                    setFormData({ ...formData, about: e.target.value })
                  }
                  className="form-control"
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn"
                onClick={handleEditSave}
                style={{
                  background: "#ffbe33",
                  color: "#000000",
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <div
        className={`modal fade ${showPasswordModal ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header">
              <h5 className="modal-title">Change Password</h5>
              <button
                className="btn-close"
                onClick={() => setShowPasswordModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handlePasswordSave}>
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
