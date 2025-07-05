import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer_section">
        <div className="container">
          <div className="row">
            <div className="col-md-4 footer-col">
              <div className="footer_contact">
                <h4>Contact Us</h4>
                <div className="contact_link_box">
                  <a href="">
                    <i className="fa fa-map-marker" aria-hidden="true" />
                    <span>Location</span>
                  </a>
                  <a href="">
                    <i className="fa fa-phone" aria-hidden="true" />
                    <span>Call +01 1234567890</span>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope" aria-hidden="true" />
                    <span>demo@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 footer-col">
              <div className="footer_detail">
                <a
                  href=""
                  className="footer-logo"
                  style={{
                    fontSize: "4rem",
                  }}
                >
                  Flavor Fusion
                </a>
                <p>
                  Necessary, making this the first true generator on the
                  Internet. It uses a dictionary of over 200 Latin words,
                  combined with
                </p>
                <div className="footer_social">
                  <a href="">
                    <i className="fa-brands fa-facebook" aria-hidden="true" />
                  </a>
                  <a href="">
                    <i className="fa-brands fa-twitter" aria-hidden="true" />
                  </a>
                  <a href="">
                    <i className="fa-brands fa-linkedin" aria-hidden="true" />
                  </a>
                  <a href="">
                    <i className="fa-brands fa-instagram" aria-hidden="true" />
                  </a>
                  <Link href="">
                    <i className="fa-brands fa-pinterest" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 footer-col">
              <h4>Opening Hours</h4>
              <p>Everyday</p>
              <p>10.00 Am -10.00 Pm</p>
            </div>
          </div>
          <div className="footer-info">
            <p>
              &copy; <span id="displayYear" /> All Rights Reserved By
              <a href="https://html.design/"> Flavor Fusion</a>
              <br />
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
