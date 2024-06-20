import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Col, Row } from "react-bootstrap";
import ProjectCard from "../components/ProjectCard";
import { getAllProjectAPI } from "../service/AllAPI";

const Projects = () => {
  const [allProject, setAllProjects] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  // console.log(allProject);

  useEffect(() => {
    getAllProjects();
  }, [searchKey]);

  const getAllProjects = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      try {
        const result = await getAllProjectAPI(searchKey, reqHeader);
        console.log(result);
        if (result.status == 200) {
          setAllProjects(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Header />
      <div style={{ marginTop: "150px" }} className="container container-fluid">
        <div className="d-flex justify-content-between">
          <h1>All Projects</h1>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search Projects By Language Used"
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <Row className="mt-5 mb-5">
          {allProject?.length > 0 ? (
            allProject?.map((project) => (
              <Col
                key={project?.id}
                className="mb-3 d-flex justify-content-evenly align-items-center"
                sm={12}
                md={6}
                lg={4}
              >
                <ProjectCard displayData={project} />
              </Col>
            ))
          ) : (
            <div className="fw-bolder text-danger m-5 text-center">
              Projects Not found
            </div>
          )}
        </Row>
      </div>
    </>
  );
};

export default Projects;
