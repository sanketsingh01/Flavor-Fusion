import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import bgImage from "../../public/images/foodherobg.avif";

const carouselData = [
  {
    image:
      "https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?w=600&auto=format&fit=crop",
    title: "BreakFast",
    description: "We provide the best and most delicious Breakfast...",
    badge: "HOT DEAL",
  },
  {
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop",
    title: "Lunch",
    description: "Experience our great and Authentic Indian Lunch...",
    badge: null,
  },
  {
    image:
      "https://media.istockphoto.com/id/868408746/photo/assorted-indian-dish.webp?a=1&b=1&s=612x612&w=0&k=20&c=LWxNqGlUSb5jfhv3Fu8lzYdXOebquU0_0WUKl0f5zxk=",
    title: "Dinner",
    description:
      "Taste the authentic and permium Indian Thali and make dinner awesome...",
    badge: null,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS22yWb4xO6ADSmxKVfHIMc_zvmrm8hKzc2A&s",
    title: "Siddu",
    description: "Taste the best and authentic Siddu in the area...",
    badge: null,
  },
  {
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop",
    title: "Special Momos",
    description: "Enjoy our handmade authenctic Momos...",
    badge: null,
  },
];

const Hero = () => {
  // return (
  //   <>
  //     <div className="hero_area mt-4">
  //       <div className="bg-box d-flex justify-content-center mt-5">
  //         <img src="images/foodherobg.avif" alt="" />
  //       </div>
  //       {/* slider section */}
  //       <section className="slider_section ">
  //         <div
  //           id="customCarousel1"
  //           className="carousel slide"
  //           data-bs-ride="carousel"
  //         >
  //           <div className="carousel-inner">
  //             <div className="carousel-item active">
  //               <div className="container w-100">
  //                 <div className="row text-center d-flex justify-content-center">
  //                   <div className="detail-box">
  //                     <h1
  //                       className="text-center mb-5 text-dark w-50"
  //                       style={{
  //                         fontSize: "7rem",
  //                         marginTop: "7rem",
  //                         lineHeight: "7rem",
  //                       }}
  //                     >
  //                       Best Food for your taste
  //                     </h1>
  //                     <p
  //                       className="w-50 font-weight-bold text-dark"
  //                       style={{
  //                         fontSize: "1rem",
  //                       }}
  //                     >
  //                       Flavor Fusion is a fast food resturant which deliver you
  //                       to the bast and fast food and authentic taste of
  //                       itallian pizza and fastest deliver possible at your door
  //                       step. Wanted to try? Order Now!
  //                     </p>
  //                     <div className="btn-box mt-3">
  //                       <Link to="/Menu" className="btn1">
  //                         Order Now
  //                       </Link>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //       {/* end slider section */}
  //     </div>
  //   </>
  // );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
  };

  const getSlide = (indexOffset) => {
    const index =
      (currentIndex + indexOffset + carouselData.length) % carouselData.length;
    return carouselData[index];
  };

  return (
    <>
      <section className="min-vh-100 py-5 position-relative text-white overflow-hidden mt-4">
        <img
          src="images/foodherobg.avif"
          alt="Hero section Image"
          style={{
            position: "absolute",
            width: "100%",
            zIndex: "-4",
          }}
        />
        <div
          className="container text-center mb-4 mt-5"
          style={{
            marginTop: "50px",
          }}
        >
          <h1 className="display-5 fw-bold text-black">
            Provide the{" "}
            <span className="fst-italic text-warning">best food</span> for you
          </h1>
          <p
            className="text-black"
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "20px",
            }}
          >
            {carouselData[currentIndex].description}
          </p>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-4">
          {/* Carousel container */}
          <div
            className="position-relative d-flex justify-content-center align-items-center "
            style={{
              width: "100%",
              maxWidth: "1000px",
              height: "350px",
              marginTop: "4rem",
            }}
          >
            {[getSlide(-1), getSlide(0), getSlide(1)].map((slide, i) => {
              const position = i - 1;
              const isCenter = position === 0;

              return (
                <div
                  key={slide.title}
                  className="position-absolute"
                  style={{
                    width: "280px",
                    height: "280px",
                    transition: "all 0.6s ease",
                    transform: `translateX(${position * 320}px) scale(${
                      isCenter ? 1.1 : 0.85
                    })`,
                    zIndex: isCenter ? 2 : 1,
                    opacity: 1,
                    boxShadow: isCenter
                      ? "0 0px 35px rgb(249, 218, 11, 0.8)"
                      : "0 4px 12px rgba(249, 218, 11, 0.1)",
                    borderRadius: "60px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "20px",
                      filter: isCenter ? "brightness(1)" : "brightness(0.8)",
                      transition: "filter 0.6s ease",
                    }}
                  />
                  {slide.badge && (
                    <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-3 px-3 py-2">
                      {slide.badge}
                    </span>
                  )}
                  <div
                    className="position-absolute bottom-0 start-0 end-0 text-white p-3"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
                      textAlign: "center",
                      fontSize: "40px",
                    }}
                  >
                    <h5 className="m-0">{slide.title}</h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="d-flex justify-content-center mt-3 gap-1">
          {carouselData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`btn rounded-circle p-0 ${
                i === currentIndex ? "btn-warning" : "btn-secondary"
              }`}
              style={{
                width: "12px",
                height: "12px",
                transform: i === currentIndex ? "scale(1.2)" : "scale(1)",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
