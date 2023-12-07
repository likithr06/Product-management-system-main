import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ setId, setSaveEnabled, setFormData }) => {
  const navigates = useNavigate();

  const resetData = () => {
    setId(0);
    setSaveEnabled(true);
    setFormData({
      productName: "",
      description: "",
      quantity: "",
      price: "",
      category: "",
    });
    navigates("/new");
  };
  const handleNew = () => {
    resetData();
  };

  return (
    <>
      <div className="nav-bar">
        <div className="heading-div">
          <p>Product Management System</p>
          {/* new and summary buttons */}
          <div className="button-div">
            <button className="new-btn" onClick={handleNew}>
              New
            </button>
            <button
              className="summary-btn"
              onClick={() => navigates("/summary")}
            >
              Summary
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
