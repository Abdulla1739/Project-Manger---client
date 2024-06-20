import React from "react";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import serverURL from "../service/serverURL";

const ProjectCard = ({displayData}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        <Card
          onClick={handleShow}
          className="shadow btn"
          style={{ width: "21rem" }}
        >
          <Card.Body>
            <Card.Title className="d-flex align-items-center justify-content-center flex-column">
              <img
                width={"100%"}
                height={"200px"}
                className=" img-fluid mb-3"
                src={`${serverURL}/uploads/${displayData?.projectImg}`}
              />
              <span>{displayData?.title}</span>
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
      <Modal centered size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className="img-fluid w-100 rounded-5" src={`${serverURL}/uploads/${displayData?.projectImg}`} alt="Modal Img" />
            </div>
            <div className="col-lg-6">
              <h3>{displayData?.title}</h3>
              <h6>
                <span className="fw-bolder">Language Used:</span>{" "}
                <span className="text-danger">{displayData?.languages}</span>
              </h6>
              <p style={{ textAlign: "justify" }}>
                {" "}
                <span className="fw-bolder">Project Overview:</span> {displayData?.overview}.{" "}
              </p>
            </div>
          </div>
          <div className="float-start mt-4">
            <a href={displayData?.github} target="_blank" className="btn btn-danger me-3">
              <i class="fa-brands fa-github"></i>
            </a>
            <a href={displayData?.website} target="_blank" className="btn btn-danger me-3">
              <i class="fa-solid fa-link"></i>
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProjectCard;
