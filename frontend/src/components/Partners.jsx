import React from "react";

const Partners = () => {
  const apps = [
    { name: "Uber Eats", logo: "images/ubereats.svg" },
    { name: "Grubhub", logo: "images/grubhub.svg" },
    { name: "Postmates", logo: "images/postmates.svg" },
    { name: "DoorDash", logo: "images/doordash.svg" },
    { name: "foodpanda", logo: "images/foodpanda.svg" },
    { name: "Deliveroo", logo: "images/deliveroo.svg" },
    { name: "Instacart", logo: "images/instacart.svg" },
    { name: "Just Eat", logo: "images/justeat.svg" },
    { name: "DiDi Food", logo: "images/didifood.svg" },
  ];

  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container py-5">
        <div className="row align-items-center">
          {/* left text block */}
          <div className="col-lg-5 mb-4 mb-lg-0">
            <h2 className="fw-bold mb-4" style={{ fontSize: "5rem" }}>
              You can order through apps
            </h2>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
              bibendum sed et aliquet risus tempor semper.
            </p>
          </div>
          {/* right logos grid */}
          <div className="col-lg-7">
            <div className="row gx-4 gy-4">
              {" "}
              {/* horizontal + vertical gap */}
              {apps.map((app, index) => (
                <div className="col-4" key={index}>
                  <div
                    className="rounded-4 p-3 d-flex justify-content-center align-items-center"
                    style={{ height: "100px" }} // consistent card height
                  >
                    <img
                      src={app.logo}
                      alt={app.name}
                      style={{ maxHeight: "80px", objectFit: "contain" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
