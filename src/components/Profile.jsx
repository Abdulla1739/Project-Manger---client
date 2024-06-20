import React, { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import ProfileUpload from "../assets/ProfileUpload.png";
import serverURL from "../service/serverURL";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editUserAPI } from "../service/AllAPI";

const Profile = () => {
  const [preview, setPreview] = useState("");
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    profilePic: "",
  });
  const [exisitingImg, setExistingImg] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const existingUserDetails = JSON.parse(sessionStorage.getItem("user"));
      setUserDetails({
        ...userDetails,
        username: existingUserDetails.username,
        email: existingUserDetails.email,
        password: existingUserDetails.password,
        github: existingUserDetails.github,
        linkedin: existingUserDetails.linkedin,
      });
      setExistingImg(existingUserDetails.profilePic);
    }
  }, [open]);
  useEffect(() => {
    if (userDetails.profilePic) {
      setPreview(URL.createObjectURL(userDetails.profilePic));
    } else {
      setPreview("");
    }
  }, [userDetails.profilePic]);


  const handleUpdateProfile =async()=>{
    const{username,email,password,github,linkedin,profilePic}= userDetails
    if(github&&linkedin){
      const reqBody = new FormData();
      reqBody.append('username', username);
      reqBody.append('email', email);
      reqBody.append('password', password);
      reqBody.append('github', github);
      reqBody.append('linkedin', linkedin);
      preview? reqBody.append("profilePic",profilePic):reqBody.append("profilePic",exisitingImg)

      const token = sessionStorage.getItem("token")

      if (token) {
        const reqHeader = {
          "Content-Type": preview?"multipart/form-data":"application/json",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await editUserAPI(reqBody,reqHeader)
          if(result.status==200){
            setOpen(!open)
            sessionStorage.setItem("user",JSON.stringify(result.data))

          }else{
            console.log(result);
          }
        } catch (err) {
          console.log(err);          
        }
      }


    }else(
      toast.info("please fill the form completely")
    )
  }
  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="text-warning mt-5">Profile</h3>
        <button
          onClick={() => setOpen(!open)}
          className="btn textwarning fw-bolder"
        >
          <i className="fa solid fa-chevron-down"></i>
        </button>
      </div>
      <Collapse in={open}>
        <div
          className="row align-items-center justify-content-center shadow rounded p-3"
          id="example-collapse-text"
        >
          <label className="text-center mb-2">
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  profilePic: e.target.files[0]
                })
              }
            />

            {exisitingImg == "" ? (
              <img
                width={"200px"}
                height={"200px"}
                className="rounded-circle"
                src={preview?preview:ProfileUpload}
                alt="profileimg"
              />
            ) : (
              <img
                width={"200px"}
                height={"200px"}
                className="rounded-circle"
                src={preview?preview:`${serverURL}/uploads/${exisitingImg}`}
                alt="profileimg"
              />
            )}
          </label>
          <div className="mb-2">
            <input
              type="text"
              placeholder="GITHUB URL"
              className="form-control"
              value={userDetails?.github}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  github: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="LinkedIn URL"
              className="form-control"
              value={userDetails?.linkedin}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  linkedin: e.target.value,
                })
              }
            />
          </div>
          <div className="d-grid">
            <button onClick={handleUpdateProfile} className="btn btn-warning">Update Profile</button>
          </div>
        </div>
      </Collapse>
      <ToastContainer position="bottom-left" autoClose={3000} theme="colored" />
    </>
  );
};

export default Profile;
