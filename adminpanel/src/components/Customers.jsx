import React, { useState } from "react";

function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      image:
        "https://yt3.googleusercontent.com/MI1A0hpMsLtlxCvHcAojzlqbsKg8s4Hr0fAXBTjGvJcFL2EWOzPPG04t_YfnKsKD4hEz7L05=s900-c-k-c0x00ffffff-no-rj",
      name: "John Doe",
      email: "john@example.com",
      phone: "111-222-3333",
      address: "123 Main St, New York, NY 10001",
      joinDate: "2023-01-15",
      gender: "Male",
    },
    {
      id: 2,
      image:
        "https://yt3.googleusercontent.com/MI1A0hpMsLtlxCvHcAojzlqbsKg8s4Hr0fAXBTjGvJcFL2EWOzPPG04t_YfnKsKD4hEz7L05=s900-c-k-c0x00ffffff-no-rj",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "444-555-6666",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      joinDate: "2023-03-22",
      gender: "Female",
    },
    {
      id: 3,
      image:
        "https://yt3.googleusercontent.com/MI1A0hpMsLtlxCvHcAojzlqbsKg8s4Hr0fAXBTjGvJcFL2EWOzPPG04t_YfnKsKD4hEz7L05=s900-c-k-c0x00ffffff-no-rj",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "777-888-9999",
      address: "789 Pine St, Chicago, IL 60601",
      joinDate: "2023-02-10",
      gender: "Male",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search related
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

  const handleSave = () => {
    const updatedCustomers = customers.map((cust) =>
      cust.id === editData.id ? { ...editData } : cust
    );
    setCustomers(updatedCustomers);
    setSelectedCustomer(editData);
    setIsEditing(false);
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
