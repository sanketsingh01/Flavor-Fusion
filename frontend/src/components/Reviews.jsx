import React from "react";
import { StarFill } from "react-bootstrap-icons";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Moana Michell",
      title: "Foodie",
      review:
        "Absolutely loved the Margherita Pizza! Fresh, delicious, and served hot. Will definitely order again.",
      rating: 5,
      img: "images/client1.jpg",
    },
    {
      id: 2,
      name: "Mike Hamell",
      title: "Chef",
      review:
        "Great variety on the menu and fast delivery. The Pasta Alfredo was creamy and perfect!",
      rating: 4,
      img: "images/client2.jpg",
    },
    {
      id: 3,
      name: "Mickel",
      title: "Customer",
      review:
        "Good food. The taste of pizza is really purely italian and food service is fast.",
      rating: 5,
      img: "images/client2.jpg",
    },
  ];

  return (
    <>
      <section className="py-5 mt-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2
              style={{ color: "#23282b", fontWeight: "bold", fontSize: "4rem" }}
            >
              What Our Customers Say
            </h2>
            <p
              className="text-muted"
              style={{
                fontSize: "1rem",
              }}
            >
              Hear directly from our happy food lovers
            </p>
          </div>
          <div className="row g-4">
            {reviews.map((review) => (
              <div className="col-md-4" key={review.id}>
                <div className="card shadow-lg rounded-4 p-4 h-100">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={review.img}
                      alt={review.name}
                      className="rounded-circle me-3"
                      width="60"
                      height="60"
                      style={{ objectFit: "cover" }}
                    />
                    <div>
                      <h5 className="mb-0">{review.name}</h5>
                      <small className="text-muted">{review.title}</small>
                    </div>
                  </div>
                  <p className="mb-3">{review.review}</p>
                  <div>
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <StarFill key={idx} color="#e69c00" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
