import React, { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const resposnse = await axios.get(
          "http://localhost:3000/admin/allProducts"
        );
        const products = resposnse.data.body || [];

        const formatted = products.map((product) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.imageUrl,
          description: product.description,
          rating: 4.2,
          reviews: 60,
          ingredients: product.ingredients,
        }));

        setProducts(formatted);
      } catch (error) {
        console.log("Error while fetching all the Products: ", error);
        setProducts([]);
      }
    };

    fetchproducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditData(product);
    setShowModal(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:3000/admin/deleteProduct/${productToDelete.id}`
      );
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error while deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setShowDeleteModal(false);
      setProductToDelete(null);
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);

      const payload = {
        ...editData,
        imageUrl: editData.image, // Map 'image' to 'imageUrl'
      };

      const response = await axios.put(
        `http://localhost:3000/admin/updateProduct/${editData.id}`,
        payload
      );

      const updatedProduct = response.data.body;

      setProducts((prev) =>
        prev.map((product) =>
          product.id === updatedProduct._id
            ? {
                id: updatedProduct._id,
                name: updatedProduct.name,
                price: updatedProduct.price,
                category: updatedProduct.category,
                image: updatedProduct.imageUrl,
                rating: updatedProduct.rating || 4.2,
                reviews: updatedProduct.reviews || 60,
                description: updatedProduct.description,
                ingredients: updatedProduct.ingredients,
              }
            : product
        )
      );

      setShowModal(false);
      setSelectedProduct(null);
      toast.success("Product Details updated Successfully");
    } catch (error) {
      console.log("Error while updating the product data: ", error);
      toast.error("Error while updating the Product");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="bi bi-star text-warning"></i>
      );
    }
    return stars;
  };

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary">
            <i className="bi bi-box-seam me-2"></i>
            All Products
          </h2>
          <span className="badge bg-info fs-6">
            {filteredProducts.length} Products
          </span>
        </div>

        {/* Search & Filter */}
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text">
                <SearchIcon className="w-5 h-5" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-lg-6 col-xl-4 mb-4">
              <div className="card h-100 shadow-sm border-0 product-card">
                <div className="position-relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <span className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">{product.category}</span>
                  </span>
                </div>

                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title text-dark mb-0">
                      {product.name}
                    </h5>
                    <h4 className="text-success mb-0">$ {product.price}</h4>
                  </div>

                  <div className="d-flex align-items-center mb-2">
                    <div className="me-2">{renderStars(product.rating)}</div>
                    <small className="text-muted">
                      {product.rating} ({product.reviews} reviews)
                    </small>
                  </div>

                  <p className="card-text text-muted flex-grow-1">
                    {product.description}
                  </p>

                  <div className="mb-3">
                    <h6 className="text-muted mb-2">Ingredients:</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {product.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="badge bg-light text-dark border"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEditClick(product)}
                      >
                        <i className="bi bi-pencil me-2"></i>Edit Product
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-search display-1 text-muted"></i>
            <h4 className="text-muted mt-3">No products found</h4>
            <p className="text-muted">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && selectedProduct && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Edit Product</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={editData.price}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={editData.category}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={editData.image}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleSaveEdit}>
                  {loading ? "Loading..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* delete Modal */}
      {showDeleteModal && productToDelete && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete the product{" "}
                  <strong>{productToDelete.name}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .product-card {
          transition: transform 0.2s ease-in-out;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </>
  );
}

export default Products;
