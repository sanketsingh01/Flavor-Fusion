import React, { useState, useEffect } from "react";
import {
  Pencil,
  Lock,
  LogOut,
  Facebook,
  Instagram,
  UserCircle2,
  ShoppingBag,
  Heart,
  Trash,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { replace, useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("USer Data: ", user);

  const navigate = useNavigate();

  const userData = {
    name: user.name,
    email: user.email,
    photo: user.imageUrl,
    phone: user.phone,
    address: user.address,
    about:
      "Passionate foodie and software engineer who loves exploring new tastes and building beautiful user experiences.",
    createdAt: user.createdAt,
    loyaltyPoints: 240,
    social: {
      facebook: "https://facebook.com/sanket",
      instagram: "https://instagram.com/sanket",
    },
    pastOrders: [],
  };

  const [activeTab, setActiveTab] = useState("profile");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
    imageUrl: userData.photo,
    about: userData.about,
  });

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChnage = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      imageUrl: formData.imageUrl,
    };

    try {
      setSuccessMessage(null);
      setErrorMessage(null);
      setLoading(true);

      const userId = user._id;
      const response = await axios.put(
        `http://localhost:3000/user/updateUser/${userId}`,
        payload
      );
      localStorage.setItem("user", JSON.stringify(response.data.body));
      console.log("Updated data: ", response.data);
      setSuccessMessage(response.data.message || "User details updated!");
    } catch (error) {
      console.log("Error while updating: ", error);
      setErrorMessage("Failed to updated user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage || "User updated Successfully");
    }

    if (errorMessage) {
      toast.error(errorMessage || "failed to update the User");
    }
  }, [successMessage, errorMessage]);
  const handlePasswordSave = () => {
    console.log("New password", newPassword);
    setShowPasswordModal(false);
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/wishlist/${user._id}`);
      const items = res.data.body?.items || [];

      const productPromises = items.map((item) =>
        axios.get(`http://localhost:3000/admin/getProduct/${item.productId}`)
      );

      const productResponses = await Promise.all(productPromises);

      const detailedWishlist = productResponses.map((res) => ({
        id: res.data.body._id,
        name: res.data.body.name,
        price: res.data.body.price,
      }));

      setWishlistItems(detailedWishlist);
    } catch (err) {
      console.error("Error fetching wishlist items:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/wishlist/removeFromWishlist/${user._id}`,
        { data: { productId } }
      );
      toast.success("Removed from wishlist");
      fetchWishlist(); // refresh the wishlist
    } catch (err) {
      console.error("Error removing from wishlist: ", err);
      toast.error("Failed to remove item from wishlist");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
    toast.success("User LoggedOut Successfully");
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
              Joined on {new Date(userData.createdAt).toLocaleString()}
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
          <li className="nav-item flex-fill" role="presentation">
            <button
              className={`nav-link w-100 d-flex align-items-center justify-content-center gap-1 ${
                activeTab === "wishlist" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("wishlist")}
              style={{ color: "#000000" }}
            >
              <Heart className="text-danger" size={18} /> Wishlist
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
                  <strong>UserName:</strong> {formData.name}
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
                <button
                  onClick={handleLogout}
                  className="btn btn-danger d-flex align-items-center gap-1"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
          {activeTab === "orders" && (
            <div>
              <h5 className="fw-semibold mb-3">Order History</h5>
              {user.history && user.history.length > 0 ? (
                user.history.map((order, idx) => (
                  <div
                    key={idx}
                    className="card mb-3 p-3 rounded-4 shadow-sm"
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    <h6 className="fw-bold mb-2">Order #{idx + 1}</h6>
                    <ul className="list-group list-group-flush">
                      {order.items.map((item, index) => (
                        <li
                          key={index}
                          className="list-group-item bg-transparent border-0 d-flex justify-content-between"
                        >
                          <span>
                            {item.quantity} × {item.name}
                          </span>
                          <span className="text-muted">
                            ${item.price.toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 text-end fw-semibold">
                      Total: ${order.totalAmount.toFixed(2)}
                    </div>
                    <div className="text-muted text-end small">
                      Ordered on: {new Date(order.orderAt).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-muted">No orders found.</div>
              )}
            </div>
          )}
        </div>
        {activeTab === "wishlist" && (
          <div>
            <h5 className="fw-semibold mb-3">My Wishlist</h5>
            {wishlistItems.length === 0 ? (
              <div className="text-muted">Your wishlist is empty.</div>
            ) : (
              <ul className="list-group">
                {wishlistItems.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0"
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      <span className="text-muted">${item.price}</span>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <Trash size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
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
              <form onSubmit={handleEditSave}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">
                    UserName
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChnage}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChnage}
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
                    onChange={handleChnage}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    rows={2}
                    onChange={handleChnage}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    Image Url
                  </label>

                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    className="form-control"
                    value={formData.imageUrl}
                    rows={1}
                    onChange={handleChnage}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="about" className="form-label">
                    About
                  </label>

                  <textarea
                    id="about"
                    name="about"
                    className="form-control"
                    value={formData.about}
                    rows={2}
                    onChange={handleChnage}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    onClick={handleEditSave}
                    style={{
                      background: "#ffbe33",
                      color: "#000000",
                    }}
                  >
                    {loading ? "Loading..." : "Save Changes"}
                  </button>
                </div>
              </form>
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
