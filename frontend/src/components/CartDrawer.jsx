import React, { useState } from "react";

const dummyItems = [
  { id: 1, name: "Margherita Pizza", price: 8.99 },
  { id: 2, name: "Veggie Burger", price: 5.99 },
  { id: 3, name: "Pasta Alfredo", price: 9.49 },
];

export default function CartDrawer() {
  // preload dummy items with quantity 1
  const [cartItems, setCartItems] = useState(
    dummyItems.map((item) => ({ ...item, quantity: 1 }))
  );

  const addToCart = (item) => {
    setCartItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="cartDrawer"
        aria-labelledby="cartDrawerLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="cartDrawerLabel">
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
              Your cart is empty.
            </div>
          ) : (
            <>
              <ul className="list-group mb-3">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      <small>
                        ${item.price.toFixed(2)} × {item.quantity}
                      </small>
                    </div>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-top pt-3 d-flex justify-content-between fw-bold fs-5">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
