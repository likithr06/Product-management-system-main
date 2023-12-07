import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "./NewPage.css";
import { cleanup } from "@testing-library/react";

const NewPage = ({
  formData,
  setFormData,
  saveEnabled,
  id,
  setSaveEnabled,
  setId,
}) => {
  const navigates = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  const resetData = () => {
    setFormData({
      productName: "",
      description: "",
      quantity: "",
      price: "",
      category: "",
    });
    setId(0);
    setSaveEnabled(true);
    navigates("/new");
  };

  const handleSave = async () => {
    try {
      //updating details of an existing product
      if (saveEnabled === true && id !== 0) {
        let a = axios
          .put(`http://localhost:5000/products/${id}`, {
            name: formData.productName,
            description: formData.description,
            quantity: formData.quantity,
            price: formData.price,
            category: formData.category,
          })
          .then(() => {
            navigates("/summary");
          });
      } //creating new product in the database
      else if (saveEnabled === true && id === 0) {
        let a = axios
          .post("http://localhost:5000/products", {
            name: formData.productName,
            description: formData.description,
            quantity: formData.quantity,
            price: formData.price,
            category: formData.category,
          })
          .then(() => {
            navigates("/summary");
          });
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  //handling cancel button
  const handleCancel = () => {
    resetData();
  };

  //fetching data from database and placing values on input fields for edit or view
  const fetchData = async (id) => {
    const result = await axios
      .get(`http://localhost:5000/products/${id}`)
      .then((result) => {
        const productData = result.data;
        setFormData({
          productName: productData[0].name,
          description: productData[0].description,
          quantity: productData[0].quantity,
          price: productData[0].price.$numberDecimal,
          category: productData[0].category,
        });
      })
      .catch((err) => console.log(err));
  };

  //fetch data only when requested to view or edit
  useEffect(() => {
    if (id !== 0) {
      fetchData(id);
    }

    return () => {
      cleanup();
    };
  }, []);

  //To enable or disable save button
  const savebtn = saveEnabled ? (
    <button type="submit" className="save-btn">
      SAVE
    </button>
  ) : (
    <button className="disable-save-btn" disabled>
      SAVE
    </button>
  );

  return (
    <>
      <NavBar
        setId={setId}
        setSaveEnabled={setSaveEnabled}
        setFormData={setFormData}
      />
      {/* input form  */}
      <div className="form-container">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <div className="name-container">
              <div>Name:</div>
              <div>
                <input
                  required
                  name="productName"
                  type="text"
                  value={formData.productName}
                  disabled={!saveEnabled}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="description-container">
              <div>Description:</div>
              <div>
                <input
                  required
                  name="description"
                  type="text"
                  value={formData.description}
                  disabled={!saveEnabled}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="quantity-container">
              <div>Quantity:</div>
              <div>
                <input
                  required
                  name="quantity"
                  type="number"
                  min={0}
                  value={formData.quantity}
                  disabled={!saveEnabled}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="price-container">
              <div>Price:</div>
              <div>
                <input
                  required
                  name="price"
                  type="number"
                  step="any"
                  min={0}
                  value={formData.price}
                  disabled={!saveEnabled}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="category-container">
              <div>Category:</div>
              <div>
                <select
                  required
                  name="category"
                  id="category"
                  value={formData.category}
                  disabled={!saveEnabled}
                  onChange={handleChange}
                >
                  <option value="" hidden>
                    Select an option
                  </option>
                  <option>Electronics</option>
                  <option>Apparel</option>
                  <option>Food & Beverages</option>
                  <option>Home & Kitchen Appliances</option>
                  <option>Tools & Hardware</option>
                  <option>Health & Beauty Products</option>
                  <option>Books & Stationery</option>
                  <option>Automotive Parts</option>
                  <option>Others</option>
                </select>
              </div>
            </div>
          </div>
          {/* save and cancel buttons */}
          <div className="buttons-container">
            <div>
              <span style={{ marginRight: "6px" }}>
                <button className="cancel-btn" onClick={handleCancel}>
                  CANCEL
                </button>
              </span>

              <span style={{ marginLeft: "6px" }}>{savebtn}</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPage;
