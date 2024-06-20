import React, { useContext, useEffect, useState } from "react";
import Add from "../components/Add";
import Edit from "../components/Edit";
import { getUserProjectAPI, removeProjectAPI } from "../service/AllAPI";
import {
  addResponseContext,
  editResponseContext,
} from "../contexts/ContextAPI";
const View = () => {
  const [userProjects, setUserProjects] = useState([]);
  const { addResponse, setAddResponse } = useContext(addResponseContext);
  // console.log(userProjects);
  const { editResponse, setEditResponse } = useContext(editResponseContext);

  useEffect(() => {
    getUserProjects();
  }, [addResponse, editResponse]);

  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getUserProjectAPI(reqHeader);
        console.log(result);
        if (result.status == 200) {
          setUserProjects(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeleteProject = async (pid) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      try {
        const result = await removeProjectAPI(pid,reqHeader)
        if (result.status==200) {
          getUserProjects()
        } else {
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2 className="text-warning">All Projects</h2>
        <div>
          <Add />
        </div>
      </div>
      <div className="mt-4">
        {userProjects?.length > 0 ? (
          userProjects.map((project) => (
            <div
              key={project?._id}
              className="border rounded p-2 d-flex justify-content-between mb-3"
            >
              <h3>{project?.title}</h3>
              <div className="d-flex align-items-center">
                <div>
                  <Edit project={project} />
                </div>
                <div className="btn">
                  <a href={project?.github} target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
                <button onClick={()=>handleDeleteProject(project?._id)} className="btn text-danger">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="fw-bolder text-danger m-5 text-center">
            No projects uploaded yet
          </div>
        )}
      </div>
    </>
  );
};

export default View;
