import React from "react";
import { ShoppingCart, Percent } from "lucide-react";

const OfferSection = () => {
  return (
    <section className="py-5 mt-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ fontSize: "4rem" }}>
            Special{" "}
            <span
              style={{
                color: "#ffbe33",
              }}
            >
              Offers
            </span>
          </h2>
          <p className="text-muted lead">
            Save more, taste more! Check out our latest exclusive deals.
          </p>
        </div>
        <div className="row g-4">
          <div className="col-md-6">
            <div
              className="rounded-4 shadow p-4 d-flex align-items-center"
              style={{
                background: "#ffffffcc",
                backdropFilter: "blur(8px)",
              }}
            >
              <img
                src="images/o1.jpg"
                alt="Tasty Thursdays"
                className="rounded-4 me-4"
                style={{ width: "140px", height: "140px", objectFit: "cover" }}
              />
              <div className="flex-grow-1">
                <h4 className="fw-bold mb-1">Tasty Thursdays</h4>
                <p className="text-muted mb-2">
                  Every Thursday, enjoy a delicious discount on our chef’s
                  specials.
                </p>
                <div className="d-flex align-items-center mb-2">
                  <Percent className="me-2 text-success" />
                  <span className="fw-bold text-success">20% Off</span>
                </div>
                <a
                  href="#"
                  className="btn btn-sm rounded-pill"
                  style={{
                    color: "#000000",
                    background: "#ffbe33",
                    textAlign: "center",
                  }}
                >
                  <ShoppingCart size={16} className="me-2" />
                  Order Now
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="rounded-4 shadow p-4 d-flex align-items-center"
              style={{
                background: "#ffffffcc",
                backdropFilter: "blur(8px)",
              }}
            >
              <img
                src="images/o2.jpg"
                alt="Pizza Days"
                className="rounded-4 me-4"
                style={{ width: "140px", height: "140px", objectFit: "cover" }}
              />
              <div className="flex-grow-1">
                <h4 className="fw-bold mb-1">Pizza Days</h4>
                <p className="text-muted mb-2">
                  Indulge in cheesy goodness with special pizza discounts.
                </p>
                <div className="d-flex align-items-center mb-2">
                  <Percent className="me-2 text-success" />
                  <span className="fw-bold text-success">15% Off</span>
                </div>
                <a
                  href="#"
                  className="btn btn-sm rounded-pill"
                  style={{
                    color: "#000000",
                    background: "#ffbe33",
                    textAlign: "center",
                  }}
                >
                  <ShoppingCart size={16} className="me-2" />
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
