import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import upload from "../assets/upload.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProjectAPI } from "../service/AllAPI";
import { addResponseContext } from "../contexts/ContextAPI";

const Add = () => {
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState(upload);

  const handleClose = () => {
    setProjectsDetails({
      title: "",
      languages: "",
      github: "",
      website: "",
      overview: "",
      projectImg: "",
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [imgFileStatus, setImgFileStatus] = useState(false);
  const [projectsDetails, setProjectsDetails] = useState({
    title: "",
    languages: "",
    github: "",
    website: "",
    overview: "",
    projectImg: "",
  });
  // console.log(projectsDetails);

  useEffect(() => {
    if (
      projectsDetails.projectImg.type == "image/jpeg" ||
      projectsDetails.projectImg.type == "image/jpg" ||
      projectsDetails.projectImg.type == "image/png"
    ) {
      setImgFileStatus(true);
      setPreview(URL.createObjectURL(projectsDetails.projectImg));
    } else {
      setImgFileStatus(false);
      setPreview(upload);
      setProjectsDetails({ ...projectsDetails, projectImg: "" });
    }
  }, [projectsDetails.projectImg]);

  const handleAddProject = async () => {
    const { title, languages, github, website, overview, projectImg } = projectsDetails;
    if (
      projectsDetails.title &&
      projectsDetails.languages &&
      projectsDetails.github &&
      projectsDetails.website &&
      projectsDetails.overview &&
      projectsDetails.projectImg
    ) {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);
      reqBody.append("projectImg", projectImg);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await addProjectAPI(reqBody,reqHeader);
          console.log(result);
          if (result.status == 200) {
            handleClose();
            toast.success("Project added successfully");
            setAddResponse(result)
          } else {
            toast.warning(result.response.data);
          }
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      toast.info(`Please fill the form completely`);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary">
        <i className="fa-solid fa-plus me-3"></i>Add Projects
      </button>
      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Project Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProjectsDetails({
                      ...projectsDetails,
                      projectImg: e.target.files[0],
                    })
                  }
                />
                <img
                  height={"200px"}
                  className="img-fluid w-100"
                  src={preview}
                  alt=""
                />
              </label>
              {!imgFileStatus && (
                <div className="text-warning fw-bolder my-2">
                  *Upload only the following file types (jpeg, jpg, png) here
                </div>
              )}
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={projectsDetails.title}
                  onChange={(e) =>
                    setProjectsDetails({
                      ...projectsDetails,
                      title: e.target.value,
                    })
                  }
                  placeholder="Project Tilte"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={projectsDetails.languages}
                  onChange={(e) =>
                    setProjectsDetails({
                      ...projectsDetails,
                      languages: e.target.value,
                    })
                  }
                  placeholder="Languages used in Project"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={projectsDetails.github}
                  onChange={(e) =>
                    setProjectsDetails({
                      ...projectsDetails,
                      github: e.target.value,
                    })
                  }
                  placeholder="Project Github Link"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={projectsDetails.website}
                  onChange={(e) =>
                    setProjectsDetails({
                      ...projectsDetails,
                      website: e.target.value,
                    })
                  }
                  placeholder="Project Deployed Link"
                />
              </div>
            </div>
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              value={projectsDetails.overview}
              onChange={(e) =>
                setProjectsDetails({
                  ...projectsDetails,
                  overview: e.target.value,
                })
              }
              placeholder="Project Overview"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddProject} variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="bottom-left" autoClose={3000} theme="colored" />
    </>
  );
};

export default Add;
