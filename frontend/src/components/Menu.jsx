import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const menuItems = [
  {
    id: 1,
    name: "Delicious Pizza",
    category: "pizza",
    price: 20,
    img: "images/f1.png",
    description:
      "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
  },
  {
    id: 2,
    name: "Delicious Burger",
    category: "burger",
    price: 15,
    img: "images/f2.png",
    description:
      "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
  },
  {
    id: 3,
    name: "Delicious Pizza",
    category: "pizza",
    price: 17,
    img: "images/f3.png",
    description:
      "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
  },
  {
    id: 4,
    name: "Delicious Pasta",
    category: "pasta",
    price: 18,
    img: "images/f4.png",
    description:
      "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
  },
  {
    id: 5,
    name: "French Fries",
    category: "fries",
    price: 10,
    img: "images/f5.png",
    description:
      "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
  },
  {
    id: 6,
    name: "Delicious Pizza",
    category: "pizza",
    price: 15,
    img: "images/f6.png",
    description:
      "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
  },
  {
    id: 7,
    name: "Tasty Burger",
    category: "burger",
    price: 12,
    img: "images/f7.png",
    description:
      "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
  },
  {
    id: 8,
    name: "Tasty Burger",
    category: "burger",
    price: 14,
    img: "images/f8.png",
    description:
      "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
  },
  {
    id: 9,
    name: "Delicious Pasta",
    category: "pasta",
    price: 10,
    img: "images/f9.png",
    description:
      "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
  },
];

const handleclick = () => {
  if (true) {
    toast.success("Added to cart successfully");
  }
};

const Menu = () => {
  const [filter, setFilter] = useState("all");

  const filteredItems =
    filter === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === filter);

  return (
    <>
      <section className="food_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our Menu</h2>
          </div>
          <ul className="filters_menu">
            {["all", "burger", "pizza", "pasta", "fries"].map((cat) => (
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
              {filteredItems.map((item) => (
                <div key={item.id} className="col-sm-6 col-lg-4">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="detail-box">
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                        <div className="options">
                          <h6>${item.price}</h6>
                          <Link onClick={handleclick}>
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
