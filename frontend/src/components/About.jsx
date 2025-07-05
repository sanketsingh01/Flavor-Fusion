import React from "react";
import { Award, Smile, CalendarCheck, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
      }}
      className="py-5 d-flex align-items-center mt-5"
    >
      <div className="container">
        {/* About Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6 mb-4 mb-md-0">
            <div
              className="rounded-4 shadow overflow-hidden"
              style={{
                border: "5px solid #fff",
                transform: "rotate(-2deg)",
                background:
                  "linear-gradient(135deg, #f8f9fa, #f0f4ff, #e6ecff)",
              }}
            >
              <img
                src="images/about-img.png"
                alt="About Flavor Fusion"
                className="img-fluid"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <h1
                className="fw-bold mb-3"
                style={{
                  fontSize: "2.5rem",
                  color: "#1f1f1f",
                  lineHeight: "1.2",
                }}
              >
                About{" "}
                <span
                  style={{
                    color: "#ffbe33",
                    fontSize: "4rem",
                  }}
                >
                  Flavor Fusion
                </span>
              </h1>
              <p className="text-muted mb-4">
                Since our founding, Flavor Fusion has been dedicated to
                redefining the art of dining through passion, quality, and
                innovation. We blend authentic ingredients with creative
                techniques to deliver a truly unforgettable experience for our
                guests. Our commitment to excellence has made us a trusted name
                for food lovers across the region.
              </p>
              <Link
                to="/About"
                className="btn btn-lg rounded-pill px-4 shadow"
                style={{
                  background: "#ffbe33",
                  color: "#000000",
                }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Bento Achievements */}
        <div className="row g-4 mt-5">
          <div className="col-md-3 col-6">
            <div
              className="p-4 rounded-4 shadow text-center h-100"
              style={{ background: "#ffffffee", backdropFilter: "blur(10px)" }}
            >
              <CalendarCheck size={36} className="text-primary mb-2" />
              <h5 className="fw-bold mb-1">10+ Years</h5>
              <p className="text-muted small mb-0">Culinary Excellence</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div
              className="p-4 rounded-4 shadow text-center h-100"
              style={{ background: "#ffffffee", backdropFilter: "blur(10px)" }}
            >
              <Utensils size={36} className="text-success mb-2" />
              <h5 className="fw-bold mb-1">150+ Dishes</h5>
              <p className="text-muted small mb-0">Curated with Love</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div
              className="p-4 rounded-4 shadow text-center h-100"
              style={{ background: "#ffffffee", backdropFilter: "blur(10px)" }}
            >
              <Smile size={36} className="text-warning mb-2" />
              <h5 className="fw-bold mb-1">5000+ Guests</h5>
              <p className="text-muted small mb-0">Happily Served</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div
              className="p-4 rounded-4 shadow text-center h-100"
              style={{ background: "#ffffffee", backdropFilter: "blur(10px)" }}
            >
              <Award size={36} className="text-danger mb-2" />
              <h5 className="fw-bold mb-1">15 Awards</h5>
              <p className="text-muted small mb-0">Recognized Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
