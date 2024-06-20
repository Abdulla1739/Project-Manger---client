import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark py-5 text-light">
      <div className="container mt-5 w-100 ">
        <div className="d-lg-flex justify-content-between">
          <div style={{ width: "40%" }} className="intro ">
            <h5 className="py-2">
            <i className="fa-brands fa-r-project text-danger me-4"></i>Project Holder
            </h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Inventore soluta nulla hic quibusdam ipsa.
            </p>
            <p>Code Licensed Luminar, docs CC by 3.0</p>
            <p>Currently v5.3.2.</p>
          </div>
          <div className="links d-flex flex-column">
            <h5 className="py-2">Links</h5>
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Register
            </Link>
          </div>
          <div className="Guides d-flex flex-column">
            <h5 className="py-2">Guides </h5>
            <a
              href=""
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
            >
              lorem
            </a>
            <a
              href=""
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
            >
              lorem
            </a>
            <a
              href=""
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
            >
              Lorem
            </a>
          </div>
          <div className="Contact d-flex flex-column">
            <h5 className="py-2">Contact Us</h5>
            <div className="d-flex">
              <input
                type="text"
                placeholder="Email id Please"
                className="form-control"
              />
              <button className="btn btn-info ms-2">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <div className="icons d-flex justify-content-between mt-3">
              <a
                href=""
                style={{ textDecoration: "none", color: "white" }}
                target="_blank"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                href=""
                style={{ textDecoration: "none", color: "white" }}
                target="_blank"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href=""
                style={{ textDecoration: "none", color: "white" }}
                target="_blank"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href=""
                style={{ textDecoration: "none", color: "white" }}
                target="_blank"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href=""
                style={{ textDecoration: "none", color: "white" }}
                target="_blank"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href=""
                style={{ textDecoration: "none", color: "white" }}
                target="_blank"
              >
                <i className="fa-solid fa-phone"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center p-4">
          <p>Copyright © 2024 Project Holder. Built with React.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
