import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AddProduct() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    alert(`Product added: ${JSON.stringify(data)}`);
    reset();
  };

  return (
    <>
      <div className="container mt-4">
        <div className="card p-4 shadow">
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                {...register("name", { required: true })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                {...register("price", { required: true })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                {...register("category", { required: true })}
                className="form-control"
              />
            </div>
            <button className="btn btn-success">Add Product</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
