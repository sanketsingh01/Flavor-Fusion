import React from "react";

function Products() {
  const dummyProducts = [
    { id: 1, name: "Pizza", price: "$10", category: "Fast Food" },
    { id: 2, name: "Burger", price: "$5", category: "Fast Food" },
  ];

  return (
    <>
      <div className="container mt-4">
        <div className="card p-4 shadow">
          <h2>All Products</h2>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {dummyProducts.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Products;
