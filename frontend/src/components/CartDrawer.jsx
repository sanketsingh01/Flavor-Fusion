import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusIcon, MinusIcon } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CartDrawer() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchCartItems = async () => {
      if (!user || !user.cart || user.cart.length === 0) return;

      const productIds = user.cart.map((item) => item.productId);

      try {
        const res = await axios.post("http://localhost:3000/cart/products", {
          productIds,
        });
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
    // refreshCartItems();
  }, []);

  useEffect(() => {
    refreshCartItems();

    const handleCartUpdate = () => {
      refreshCartItems();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const refreshCartItems = async () => {
    const updatedUser = JSON.parse(localStorage.getItem("user"));
    if (!updatedUser || !updatedUser.cart || updatedUser.cart.length === 0) {
      setCartItems([]);
      return;
    }

    const productIds = updatedUser.cart.map((item) => item.productId);
    try {
      const res = await axios.post("http://localhost:3000/cart/products", {
        productIds,
      });

      const merged = res.data.body.map((product) => {
        const cartItem = updatedUser.cart.find(
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
      console.error("Failed to refresh cart items:", err);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleIncreaseQuantity = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.post(
        `http://localhost:3000/cart/increaseQuantity/${user._id}`,
        { productId }
      );
      localStorage.setItem("user", JSON.stringify(response.data.body));
      console.log("Item quanttity increased");
      refreshCartItems();
    } catch (error) {
      console.log("error while increasing itme's Quantity: ", error);
      toast.error("Error while Increasing Item's Quantity");
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const resposne = await axios.post(
        `http://localhost:3000/cart/decreaseQuantity/${user._id}`,
        { productId }
      );
      localStorage.setItem("user", JSON.stringify(resposne.data.body));
      refreshCartItems();
    } catch (error) {
      console.log("Error while decreasing Item's Quantity", error);
      toast.error("Error while decreasing item's Quantity");
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end shadow-sm"
      tabIndex="-1"
      id="cartDrawer"
      aria-labelledby="cartDrawerLabel"
      style={{ width: "400px", borderRadius: "10px" }}
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title fw-bold" id="cartDrawerLabel">
          🛒 Your Cart
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
          <div className="text-center text-muted mt-5">
            <i className="bi bi-cart-x" style={{ fontSize: "3rem" }}></i>
            <p className="mt-3 fw-semibold">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <ul className="list-group list-group-flush mb-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                  style={{
                    padding: "1rem 0.5rem",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <div className="flex-grow-1 pe-2">
                    <h6 className="mb-1 fw-semibold">{item.name}</h6>
                    <div className="text-muted small">
                      ${item.price.toFixed(2)} × {item.quantity} ={" "}
                      <strong className="text-dark">
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </div>
                  </div>

                  <div className="d-flex flex-column align-items-center gap-2">
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="btn btn-sm btn-outline-dark p-1 r"
                    >
                      <PlusIcon size={16} />
                    </button>
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="btn btn-sm btn-outline-dark p-1"
                    >
                      <MinusIcon size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-top pt-3 d-flex justify-content-between fw-bold fs-5">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <button className="btn btn-dark mt-4 w-100 py-2 fw-semibold shadow-sm">
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
