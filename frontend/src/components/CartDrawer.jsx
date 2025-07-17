import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CartDrawer() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.cart || user.cart.length === 0) return;

      const productIds = user.cart.map((item) => item.productId);

      try {
        const res = await axios.post("http://localhost:3000/cart/products", {
          productIds,
        });
        console.log("Products Data: ", res.data.body);

        // Attach quantity to each product from user's cart
        const merged = res.data.body.map((product) => {
          const cartItem = user.cart.find(
            (item) => item.productId === product._id
          );
          return {
            id: product._id,
            name: product.name,
            price: product.price,
            quantity: cartItem?.quantity || 1,
          };
        });

        setCartItems(merged);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    };

    fetchCartItems();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div
        className="offcanvas offcanvas-end shadow"
        tabIndex="-1"
        id="cartDrawer"
        aria-labelledby="cartDrawerLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold" id="cartDrawerLabel">
            Your Cart
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column">
          {cartItems.length === 0 ? (
            <div className="text-center text-muted mt-4">
              <i className="bi bi-cart-x" style={{ fontSize: "2rem" }}></i>
              <p className="mt-2">Your cart is empty.</p>
            </div>
          ) : (
            <>
              <ul className="list-group list-group-flush mb-3">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-muted">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </small>
                    </div>
                    <span className="fw-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-top pt-3 d-flex justify-content-between fw-bold fs-5">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <button className="btn btn-dark mt-4 w-100">Checkout</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
