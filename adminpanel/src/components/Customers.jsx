import React, { useState, useEffect } from "react";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/allUsers");
        const users = res?.data?.body || [];

        const formatted = users.map((user) => ({
          id: user._id,
          image: user.imageUrl,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          joinDate: user.createdAt,
          gender: user.gender || "Male",
        }));

        setCustomers(formatted);
      } catch (error) {
        console.error("Error while fetching all users:", error);
        setCustomers([]); // fallback
      }
    };

    fetchCustomers();
  }, []);

  // const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search related
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // 🔍 Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // 🔍 Filtered Customers List
  const filteredCustomers = customers.filter((customer) => {
    const values =
      `${customer.name} ${customer.email} ${customer.phone}`.toLowerCase();
    return values.includes(searchQuery);
  });

  const handleViewProfile = (customer) => {
    setSelectedCustomer(customer);
    setEditData(customer);
    setShowModal(true);
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/user/updateUser/${editData.id}`,
        editData
      );

      const updatedUser = response.data.body;

      setCustomers((prev) =>
        prev.map((cust) =>
          cust.id === updatedUser._id
            ? {
                id: updatedUser._id,
                image: updatedUser.imageUrl,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
                joinDate: updatedUser.createdAt,
                gender: updatedUser.gender || "Male",
              }
            : cust
        )
      );

      setSelectedCustomer({
        id: updatedUser._id,
        image: updatedUser.imageUrl,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        joinDate: updatedUser.createdAt,
        gender: updatedUser.gender || "Male",
      });

      setEditData({
        id: updatedUser._id,
        image: updatedUser.imageUrl,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        joinDate: updatedUser.createdAt,
        gender: updatedUser.gender || "Male",
      });

      setIsEditing(false);
    } catch (error) {
      console.log("Error while updating user: ", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary mb-0">
            <i className="bi bi-people-fill me-2"></i>All Customers
          </h2>
          {/* 🔍 Search Input */}
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by name, email or phone..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="row">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <div key={customer.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center">
                    <img
                      src={customer.image}
                      alt={customer.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                      className="mb-3"
                    />
                    <h5 className="text-dark mb-2">{customer.name}</h5>
                    <p className="text-muted mb-1">
                      <i className="bi bi-envelope me-2"></i>
                      {customer.email}
                    </p>
                    <p className="text-muted mb-3">
                      <i className="bi bi-telephone me-2"></i>
                      {customer.phone}
                    </p>
                    <button
                      className="btn btn-primary btn-sm w-100"
                      onClick={() => handleViewProfile(customer)}
                    >
                      <i className="bi bi-eye me-2"></i>View Full Profile
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">No customers found.</div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {showModal && selectedCustomer && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-person-circle me-2"></i>User Profile
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 text-center">
                    <img
                      src={editData.image}
                      alt={editData.name}
                      className="rounded-circle border border-3 border-primary mb-3"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                    <h4 className="text-primary">{editData.name}</h4>
                    <span
                      className={`badge ${
                        editData.gender === "Male"
                          ? "bg-success"
                          : "bg-secondary"
                      } mb-3`}
                    >
                      {editData.gender}
                    </span>
                  </div>
                  <div className="col-md-8">
                    <div className="row g-3">
                      {[
                        { label: "Email", name: "email", icon: "bi-envelope" },
                        { label: "Phone", name: "phone", icon: "bi-telephone" },
                        {
                          label: "Address",
                          name: "address",
                          icon: "bi-geo-alt",
                        },
                        {
                          label: "Join Date",
                          name: "joinDate",
                          icon: "bi-calendar",
                        },
                      ].map(({ label, name, icon }) => (
                        <div className="col-sm-6" key={name}>
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="card-title text-muted mb-1">
                                <i className={`bi ${icon} me-2`}></i>
                                {label}
                              </h6>
                              {isEditing ? (
                                <input
                                  type="text"
                                  className="form-control"
                                  name={name}
                                  value={editData[name]}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <p className="card-text mb-0">
                                  {selectedCustomer[name]}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                {!isEditing ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditToggle}
                  >
                    <i className="bi bi-pencil me-2"></i>Edit
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSave}
                  >
                    <i className="bi bi-check-lg me-2"></i>Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Customers;
