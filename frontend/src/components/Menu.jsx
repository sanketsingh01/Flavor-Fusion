import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Menu = () => {
  const [filter, setFilter] = useState("all");
  const [menuItems, setMenuItems] = useState([]);

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
  }, []);

  const filteredItems =
    filter === "all"
      ? menuItems
      : menuItems.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase() === filter.toLowerCase()
        );

  const handleclick = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.put(
        `http://localhost:3000/user/addToCart/${user._id}`,
        { productId }
      );

      console.log("Added to cart: ", response.data.body);
      localStorage.setItem("user", JSON.stringify(response.data.body));
      toast.success("Item Added to cart Successfully");
    } catch (error) {
      console.log("Error while adding to Cart: ", error);
      toast.error("Error while adding to cart");
    }
  };

  return (
    <>
      <section className="food_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our Menu</h2>
          </div>
          <ul className="filters_menu">
            {["all", "burger", "pizza", "pasta", "fries", "fast food"].map(
              (cat) => (
                <li
                  key={cat}
                  className={filter === cat ? "active" : ""}
                  style={{ cursor: "pointer" }}
                  onClick={() => setFilter(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </li>
              )
            )}
          </ul>

          <div className="filters-content">
            <div className="row grid">
              {filteredItems.map((item) => (
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
                        <div className="options">
                          <h6>${item.price}</h6>
                          <Link onClick={() => handleclick(item.id)}>
                            <ShoppingCart className="h-auto w-auto text-light" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="btn-box">
            <a href="">View More</a>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Menu;
