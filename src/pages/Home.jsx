import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "../assets/heroImg.png";
import ProjectCard from "../components/ProjectCard";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getHomeProjectAPI } from "../service/AllAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const existingUserToken = sessionStorage.getItem("token")
  const [homeProjects,setHomeProjects] = useState([])
  const navigate = useNavigate()
  // console.log(homeProjects);

  useEffect(()=>{
    getHomeProjects()
  },[])

  const getHomeProjects = async ()=>{
    try {
      const result = await getHomeProjectAPI()
      console.log(result);
      if(result.status == 200){
        setHomeProjects(result.data)
      }
      
    } catch (err) {
      console.log(err);
      
    }
  }
  const handleProjects=() =>{
    if(existingUserToken){
      navigate('/projects')
    }else{
      toast.warning("Please login to get full access to our projects")
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    }
  }
  return (
    <>
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex jsutify-content-center align-items-center rounded shadow w-100"
      >
        <div className="container shadow py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1>
                <i className="fa-brands fa-r-project text-danger me-4"></i>
                Project Holder
              </h1>
              <p style={{ textAlign: "justify" }}>
                One Stop Destination for all Software Development Projects.
                Where User can add and manage their projects. As well as access
                all projects available in our website ... What are you waiting
                for !!!
              </p>

              {
                existingUserToken?
                <Link to="/dashboard" className="btn btn-warning">
                Manage your Projects
              </Link>

                :
                <Link to="/login" className="btn btn-warning">
                Start to Explore
              </Link>

              }
              
            </div>
            <div className="col-lg-6">
              <img className="w-100 img-fluid" src={heroImg} alt="heroImg" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 mb-5 text-center">
        <h1 className="mb-5">Explore Our Projects</h1>
        <marquee>
          <div className="d-flex">
            {
              homeProjects?.length>0 &&
              homeProjects?.map(project=>(
                <div key={project?.id} className="me-5">
                <ProjectCard displayData={project}/>
              </div>

              ))
            }

          </div>
        </marquee>
        <button onClick={handleProjects} className="btn btn-link mt-5">Click here to view more</button>
      </div>
      <div className="d-flex align-items-center mb-5 mt-5 flex-column">
        <h1 className="mb-5">Our Testimonials</h1>
        <div className="d-flex align-items-center justify-content-evenly w-100">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title className="d-flex align-items-center justify-content-center flex-column">
                <img
                  width={"60px"}
                  height={"60px"}
                  className="rounded-circle img-fluid mb-3"
                  src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png"
                />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-center">
                  <div className="fa-solid fa-star text-warning"></div>
                  <div className="fa-solid fa-star text-warning"></div>
                  <div className="fa-solid fa-star text-warning"></div>
                  <div className="fa-solid fa-star text-warning"></div>

                </div>
                <p>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title className="d-flex align-items-center justify-content-center flex-column">
                <img
                  width={"60px"}
                  height={"60px"}
                  className="rounded-circle img-fluid mb-3"
                  src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png"
                />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-center">
                  <div className="fa-solid fa-star text-warning"></div>
                  <div className="fa-solid fa-star text-warning"></div>
                  <div className="fa-solid fa-star text-warning"></div>
                  <div className="fa-solid fa-star text-warning"></div>

                </div>
                <p>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title className="d-flex align-items-center justify-content-center flex-column">
                <img
                  width={"60px"}
                  height={"60px"}
                  className="rounded-circle img-fluid mb-3"
                  src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png"
                />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-center">
                  <div className="fa-solid fa-star text-warning"></div>
                  <div className="fa-solid fa-star text-warning"></div>
                  <div className="fa-solid fa-star text-warning"></div>
                  <div className="fa-solid fa-star text-warning"></div>

                </div>
                <p>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <ToastContainer position="bottom-left" autoClose={2000} theme="colored" />
    </>
  );
};

export default Home;
