import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import View from "../components/View";
import Profile from "../components/Profile";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      setUserDetails(JSON.parse(sessionStorage.getItem("user")).username)
    }else{
      setUserDetails("")
    }
    
  },[])


  
  return (
    <>
      <Header insideDashboard={true} />
      <div
        style={{ marginTop: "100px", height: "100vh" }}
        className="container-fluid"
      >
        <div className="row mt-3">
          <div className="col-lg-8 mt-5">
            <h1 className=" mb-5">
              Welcome <span className="text-warning">{userDetails.split(" ")[0]}</span>
            </h1>
            <View />
          </div>
          <div className="col-lg-4">
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
