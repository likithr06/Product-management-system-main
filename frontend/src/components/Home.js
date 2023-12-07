import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Home = ({ setId, setFormData, setSaveEnabled }) => {
  const navigates = useNavigate();
  return (
    <>
      <NavBar
        setId={setId}
        setFormData={setFormData}
        setSaveEnabled={setSaveEnabled}
      />
      <div className="main-div" style={{ width: "700px" }}>
        <div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontSize: "50px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                Welcome to
              </div>
              <div>Product Management System</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
