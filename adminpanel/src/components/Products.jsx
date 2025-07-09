import React, { useState } from "react";
import { SearchIcon } from "lucide-react";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      price: "$12.99",
      category: "Fast Food",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
      description:
        "Classic Italian pizza with fresh tomatoes, mozzarella cheese, and basil leaves",
      rating: 4.5,
      reviews: 128,
      ingredients: ["Tomato Sauce", "Mozzarella", "Fresh Basil", "Olive Oil"],
    },
    {
      id: 2,
      name: "Chicken Burger",
      price: "$8.99",
      category: "Fast Food",
      image:
        "https://plus.unsplash.com/premium_photo-1675864532183-8f37e8834db5?w=600",
      description:
        "Juicy grilled chicken breast with lettuce, tomato, and special sauce",
      rating: 4.2,
      reviews: 89,
      ingredients: [
        "Chicken Breast",
        "Lettuce",
        "Tomato",
        "Special Sauce",
        "Bun",
      ],
    },
    {
      id: 3,
      name: "Caesar Salad",
      price: "$7.99",
      category: "Healthy",
      image:
        "https://images.unsplash.com/photo-1564185722618-ae3ffa1ac5aa?w=600",
      description:
        "Fresh romaine lettuce with parmesan cheese, croutons, and caesar dressing",
      rating: 4.0,
      reviews: 45,
      ingredients: [
        "Romaine Lettuce",
        "Parmesan",
        "Croutons",
        "Caesar Dressing",
      ],
    },
    {
      id: 4,
      name: "Chocolate Cake",
      price: "$5.99",
      category: "Dessert",
      image:
        "https://images.unsplash.com/photo-1605807646983-377bc5a76493?w=600",
      description: "Rich and moist chocolate cake with chocolate frosting",
      rating: 4.8,
      reviews: 67,
      ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter"],
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);

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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editData.id ? editData : p))
    );
    setShowModal(false);
    setSelectedProduct(null);
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
                    <h4 className="text-success mb-0">{product.price}</h4>
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
                      <button className="btn btn-outline-danger btn-sm">
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
                  Save Changes
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
