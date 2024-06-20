import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import upload from "../assets/upload.png";
import serverURL from "../service/serverURL";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editProjectAPI } from "../service/AllAPI";
import { editResponseContext } from "../contexts/ContextAPI";

const Edit = ({ project }) => {
  const [show, setShow] = useState(false);
  const [imgFileStatus, setImgFileStatus] = useState(true);
  const { editResponse, setEditResponse } = useContext(editResponseContext);

  const handleClose = () => {

    setShow(false);
    setProjectsDetails({
      id: project?._id,
      title: project?.title,
      languages: project?.languages,
      github: project?.github,
      website: project?.website,
      overview: project?.overview,
      projectImg: "",
    });
  };
  const handleShow = () => {
    
    setShow(true);
    setProjectsDetails({
      id: project?._id,
      title: project?.title,
      languages: project?.languages,
      github: project?.github,
      website: project?.website,
      overview: project?.overview,
      projectImg: "",
    });
  };
  const [projectsDetails, setProjectsDetails] = useState({
    id: project?._id,
    title: project?.title,
    languages: project?.languages,
    github: project?.github,
    website: project?.website,
    overview: project?.overview,
    projectImg: "",
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (
      projectsDetails.projectImg.type == "image/jpeg" ||
      projectsDetails.projectImg.type == "image/jpg" ||
      projectsDetails.projectImg.type == "image/png"
    ) {
      setPreview(URL.createObjectURL(projectsDetails.projectImg));
      setImgFileStatus(true);
    } else {
      setImgFileStatus(false);
      setPreview("");
      setProjectsDetails({ ...projectsDetails, projectImg: "" });
    }
  }, [projectsDetails.projectImg]);

  const handleUpdateProject = async () => {
    const {id,title, languages, github, website, overview, projectImg } =
      projectsDetails;
    if (title && languages && github && website && overview) {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);
      preview
        ? reqBody.append("projectImg", projectImg)
        : reqBody.append("projectImg", project.projectImg);
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await editProjectAPI(id, reqBody, reqHeader);
          console.log(result);
          if (result.status == 200) {
            handleClose();
            // pass response to view
            setEditResponse(result);
          } else {
            console.log(result.response);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      toast.info(`Please fill the form completely`);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn">
        <i className="fa-solid fa-edit"></i>
      </button>
      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project Details!!!</Modal.Title>
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
                  src={
                    preview
                      ? preview
                      : `${serverURL}/uploads/${project?.projectImg}`
                  }
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
          <Button variant="primary" onClick={handleUpdateProject}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="bottom-left" autoClose={3000} theme="colored" />
    </>
  );
};

export default Edit;
