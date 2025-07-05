import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="hero_area mt-4">
        <div className="bg-box d-flex justify-content-center mt-5">
          <img src="images/foodherobg.avif" alt="" />
        </div>
        {/* slider section */}
        <section className="slider_section ">
          <div
            id="customCarousel1"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container w-100">
                  <div className="row text-center d-flex justify-content-center">
                    <div className="detail-box">
                      <h1
                        className="text-center mb-5 text-dark w-50"
                        style={{
                          fontSize: "7rem",
                          marginTop: "7rem",
                          lineHeight: "7rem",
                        }}
                      >
                        Best Food for your taste
                      </h1>
                      <p
                        className="w-50 font-weight-bold text-dark"
                        style={{
                          fontSize: "1rem",
                        }}
                      >
                        Flavor Fusion is a fast food resturant which deliver you
                        to the bast and fast food and authentic taste of
                        itallian pizza and fastest deliver possible at your door
                        step. Wanted to try? Order Now!
                      </p>
                      <div className="btn-box mt-3">
                        <Link to="/Menu" className="btn1">
                          Order Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end slider section */}
      </div>
    </>
  );
};

export default Hero;
