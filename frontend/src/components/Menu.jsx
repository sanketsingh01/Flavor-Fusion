import React, { useEffect, useState } from "react";
import { ShoppingCart, Heart, HeartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Menu = () => {
  const [filter, setFilter] = useState("all");
  const [menuItems, setMenuItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch wishlist items for the logged-in user
  const fetchWishlist = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.get(`http://localhost:3000/wishlist/${user._id}`);
      const wishlistProductIds =
        res.data.body?.items?.map((item) => item.productId) || [];
      setWishlist(wishlistProductIds);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/allProducts"
        );
        const products = response.data.body || [];

        const formatted = products.map((product) => ({
          id: product._id,
          name: product.name,
          category: product.category,
          price: product.price,
          img: product.imageUrl,
          description: product.description,
        }));

        setMenuItems(formatted);
      } catch (error) {
        console.log("Error while fetching all products: ", error);
      }
    };

    fetchProducts();
    fetchWishlist();
  }, []);

  const filteredItems =
    filter === "all"
      ? menuItems
      : menuItems.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase() === filter.toLowerCase()
        );

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/user/addToCart/${user._id}`,
        { productId }
      );
      localStorage.setItem("user", JSON.stringify(response.data.body));
      toast.success("Item added to cart!");

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error while adding to Cart: ", error);
      toast.error("Error while adding to cart");
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/wishlist/addToWishlist/${user._id}`,
        { productId }
      );
      toast.success("Added to wishlist");
      fetchWishlist();
    } catch (err) {
      console.error("Error adding to wishlist:", err);

      const errorMessage =
        err?.response?.data?.message || "Error adding to wishlist";

      toast.error(errorMessage);
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <section className="food_section layout_padding-bottom">
      <div className="container">
        <div className="heading_container heading_center">
          <h2 style={{ fontSize: "4rem" }}>Our Menu</h2>
        </div>
        <ul className="filters_menu">
          {[
            "all",
            "fast food",
            "healthy",
            "beverages",
            "appertizers",
            "main course",
            "snacks",
            "dessert",
          ].map((cat) => (
            <li
              key={cat}
              className={filter === cat ? "active" : ""}
              style={{ cursor: "pointer" }}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </li>
          ))}
        </ul>

        <div className="filters-content">
          <div className="row grid">
            {filteredItems.length === 0 ? (
              <div className="col-12 text-center">
                <h4 style={{ marginTop: "2rem" }}>
                  Items will be coming soon 🍽️
                </h4>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="col-sm-6 col-lg-4">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img
                          src={item.img}
                          alt={item.name}
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="detail-box">
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                        <div className="options d-flex justify-content-between align-items-center">
                          <h6>${item.price}</h6>
                          <div className="d-flex gap-3 align-items-center">
                            <Link onClick={() => handleAddToCart(item.id)}>
                              <ShoppingCart className="text-light" />
                            </Link>
                            <Link onClick={() => handleAddToWishlist(item.id)}>
                              {isInWishlist(item.id) ? (
                                <Heart style={{ fill: "red", stroke: "red" }} />
                              ) : (
                                <Heart style={{ stroke: "gray" }} />
                              )}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
