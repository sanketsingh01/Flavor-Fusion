import React from "react";

function Customers() {
  const dummyCustomers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "111-222-3333",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "444-555-6666",
    },
  ];

  return (
    <>
      <div className="container mt-4">
        <div className="card p-4 shadow">
          <h2>All Customers</h2>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {dummyCustomers.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Customers;
