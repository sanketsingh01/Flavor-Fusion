import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

function AddProduct() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const watchImageUrl = watch("imageUrl");

  React.useEffect(() => {
    if (watchImageUrl) {
      setImagePreview(watchImageUrl);
    }
  }, [watchImageUrl]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const response = await axios.post(
        "http://localhost:3000/admin/addProduct",
        data
      );
      console.log("Added Product: ", response.data);
      toast.success("Product added Successfully");
    } catch (error) {
      console.log("Error while adding Product: ", error);
      toast.error("Failed to add New Product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Fast Food",
    "Healthy",
    "Dessert",
    "Beverages",
    "Appetizers",
    "Main Course",
    "Snacks",
  ];

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white">
                <h2 className="mb-0">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add New Product
                </h2>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    {/* Image Preview Section */}
                    <div className="col-md-4 mb-4">
                      <div className="text-center">
                        <div
                          className="border rounded p-3 bg-light"
                          style={{ minHeight: "200px" }}
                        >
                          {imagePreview ? (
                            <img
                              src={imagePreview || "/placeholder.svg"}
                              alt="Product Preview"
                              className="img-fluid rounded"
                              style={{ maxHeight: "180px", objectFit: "cover" }}
                              onError={() => setImagePreview("")}
                            />
                          ) : (
                            <div className="d-flex flex-column justify-content-center align-items-center h-100">
                              <i className="bi bi-image display-4 text-muted"></i>
                              <p className="text-muted mt-2">Image Preview</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">
                            <i className="bi bi-tag me-2"></i>Product Name *
                          </label>
                          <input
                            {...register("name", {
                              required: "Product name is required",
                              minLength: {
                                value: 2,
                                message: "Name must be at least 2 characters",
                              },
                            })}
                            className={`form-control ${
                              errors.name ? "is-invalid" : ""
                            }`}
                            placeholder="Enter product name"
                          />
                          {errors.name && (
                            <div className="invalid-feedback">
                              {errors.name.message}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">
                            <i className="bi bi-currency-dollar me-2"></i>Price
                            *
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input
                              {...register("price", {
                                required: "Price is required",
                                pattern: {
                                  value: /^\d+(\.\d{1,2})?$/,
                                  message: "Enter valid price",
                                },
                              })}
                              className={`form-control ${
                                errors.price ? "is-invalid" : ""
                              }`}
                              placeholder="0.00"
                              type="number"
                              step="0.01"
                            />
                            {errors.price && (
                              <div className="invalid-feedback">
                                {errors.price.message}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">
                            <i className="bi bi-list me-2"></i>Category *
                          </label>
                          <select
                            {...register("category", {
                              required: "Category is required",
                            })}
                            className={`form-select ${
                              errors.category ? "is-invalid" : ""
                            }`}
                          >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                          {errors.category && (
                            <div className="invalid-feedback">
                              {errors.category.message}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">
                            <i className="bi bi-box me-2"></i>Stock Quantity *
                          </label>
                          <input
                            {...register("stock", {
                              required: "Stock quantity is required",
                              min: {
                                value: 0,
                                message: "Stock cannot be negative",
                              },
                            })}
                            className={`form-control ${
                              errors.stock ? "is-invalid" : ""
                            }`}
                            placeholder="Enter stock quantity"
                            type="number"
                            min="0"
                          />
                          {errors.stock && (
                            <div className="invalid-feedback">
                              {errors.stock.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label fw-bold">
                        <i className="bi bi-image me-2"></i>Image URL *
                      </label>
                      <input
                        {...register("imageUrl", {
                          required: "Image URL is required",
                          pattern: {
                            value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                            message: "Enter valid image URL",
                          },
                        })}
                        className={`form-control ${
                          errors.imageUrl ? "is-invalid" : ""
                        }`}
                        placeholder="https://example.com/image.jpg"
                      />
                      {errors.imageUrl && (
                        <div className="invalid-feedback">
                          {errors.imageUrl.message}
                        </div>
                      )}
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-bold">
                        <i className="bi bi-text-paragraph me-2"></i>Description
                        *
                      </label>
                      <textarea
                        {...register("description", {
                          required: "Description is required",
                          minLength: {
                            value: 10,
                            message:
                              "Description must be at least 10 characters",
                          },
                        })}
                        className={`form-control ${
                          errors.description ? "is-invalid" : ""
                        }`}
                        rows="4"
                        placeholder="Enter detailed product description..."
                      ></textarea>
                      {errors.description && (
                        <div className="invalid-feedback">
                          {errors.description.message}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        <i className="bi bi-list-ul me-2"></i>Ingredients
                      </label>
                      <textarea
                        {...register("ingredients")}
                        className="form-control"
                        rows="3"
                        placeholder="Enter ingredients separated by commas..."
                      ></textarea>
                      <small className="text-muted">
                        Separate multiple ingredients with commas
                      </small>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        <i className="bi bi-info-circle me-2"></i>Additional
                        Info
                      </label>
                      <div className="row">
                        <div className="col-6">
                          <label className="form-label">
                            Preparation Time (min)
                          </label>
                          <input
                            {...register("prepTime")}
                            className="form-control"
                            type="number"
                            placeholder="15"
                            min="1"
                          />
                        </div>
                        <div className="col-6">
                          <label className="form-label">Calories</label>
                          <input
                            {...register("calories")}
                            className="form-control"
                            type="number"
                            placeholder="250"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                          type="button"
                          className="btn btn-outline-secondary me-md-2"
                          onClick={() => {
                            reset();
                            setImagePreview("");
                          }}
                        >
                          <i className="bi bi-arrow-clockwise me-2"></i>Reset
                          Form
                        </button>
                        <button
                          type="submit"
                          className="btn btn-success btn-lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Adding Product...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-plus-circle me-2"></i>Add
                              Product
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
