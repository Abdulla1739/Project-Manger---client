import React, { useContext, useState } from "react";
import loginImg from "../assets/Login.png";
import { Form, FloatingLabel, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPI, registerAPI } from "../service/AllAPI";
import { tokenAuthContext } from "../contexts/AuthContext";

const Auth = ({ insideRegister }) => {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [userData, setUSerData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // console.log(userData);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userData.username && userData.email && userData.password) {
      try {
        const result = await registerAPI(userData);
        console.log(result);
        if (result.status == 200) {
          toast.warning(
            `Welcome ${result?.data?.username}... Please login to explore our website`
          );
          setUSerData({ username: "", email: "", password: "" });
          navigate("/login");
        } else {
          if (result.response.status == 406) {
            toast.error(result.response.data);
            setUSerData({ username: "", email: "", password: "" });
          }
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.info("Please fill the form completely");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (userData.email && userData.password) {
      try {
        const result = await loginAPI(userData);
        if (result.status == 200) {
          setIsloggedIn(true);
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          setIsAuthorised(true)
          toast.warning(
            `Welcome ${result?.data?.user?.username} to Project Manager`
          );

          setTimeout(() => {
            setUSerData({ email: "", password: "" });
            setIsloggedIn(false);
            navigate("/");
          }, 3000);
        } else {
          if (result.response.status == 404) {
            toast.error(result.response.data);
            setUSerData({ email: "", password: "" });
          }
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.info("Please fill the form completely");
    }
  };

  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="container w-75">
        <div className="card shadow p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src={loginImg} className="w-100" alt="login" />
            </div>
            <div className="col-lg-6 p-3">
              <h1 className="fw-bolder mt-2">
                <i className="fa-brands fa-r-project text-danger me-4"></i>
                Project Holder
              </h1>
              <h5 className="fw-bolder t-2">
                Sign {insideRegister ? "up" : "In"} to your Account
              </h5>
              <Form>
                {insideRegister && (
                  <FloatingLabel
                    controlId="floatingInput1"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={userData.username}
                      onChange={(e) =>
                        setUSerData({ ...userData, username: e.target.value })
                      }
                    />
                  </FloatingLabel>
                )}
                <FloatingLabel
                  controlId="floatingInput2"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={userData.email}
                    onChange={(e) =>
                      setUSerData({ ...userData, email: e.target.value })
                    }
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Enter your Password"
                    value={userData.password}
                    onChange={(e) =>
                      setUSerData({ ...userData, password: e.target.value })
                    }
                  />
                </FloatingLabel>
                {insideRegister ? (
                  <div className="mt-3">
                    <button
                      onClick={handleRegister}
                      className="btn btn-primary mb-2"
                    >
                      Register
                    </button>
                    <p>
                      Already have an account? Click here to{" "}
                      <Link to={"/login"}>Login</Link>{" "}
                    </p>
                  </div>
                ) : (
                  <div className="mt-3">
                    <button
                      onClick={handleLogin}
                      className="btn btn-primary mb-2 d-flex align-items-center "
                    >
                      Login
                      {isLoggedIn && (
                        <Spinner
                          animation="border"
                          variant="light"
                          className="ms-3"
                        />
                      )}
                    </button>
                    <p>
                      New User? Click here to{" "}
                      <Link to={"/register"}>Register</Link>{" "}
                    </p>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-left" autoClose={3000} theme="colored" />
    </div>
  );
};

export default Auth;
