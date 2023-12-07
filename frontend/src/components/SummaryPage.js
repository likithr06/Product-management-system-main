import React, { useEffect, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "./NavBar";
import "./SummaryPage.css";

const SummaryPage = ({ setSaveEnabled, setId, setFormData }) => {
  const navigates = useNavigate();

  const [rowData, setRowData] = useState([]);

  //fetching data from database
  const fetchData = async () => {
    const result = await axios.get("http://localhost:5000/products");
    setRowData(result.data);
  };

  //View a product
  const viewProduct = (id) => {
    setSaveEnabled(false);
    setId(id);
    navigates("/new");
  };

  //row editing funtion
  const editRow = (id) => {
    setId(id);
    setSaveEnabled(true);
    navigates(`/new`);
  };

  //row deletion
  const deleteRow = async (id) => {
    try {
      let del = await axios
        .delete(`http://localhost:5000/products/${id}`)
        .then(() => fetchData());
    } catch (e) {
      console.log("Deletion Error:", e);
    }
  };

  const actionButtons = (data) => {
    return (
      <div className="action-icons-row-container">
        <div
          className="action-icons"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div className="view-icon">
            <i
              className="far fa-eye"
              onClick={() => viewProduct(data.data._id)}
            ></i>
          </div>
          <div className="edit-icon">
            <i
              className="fas fa-pencil-alt"
              onClick={() => editRow(data.data._id)}
            ></i>
          </div>
          <div className="delete-icon">
            <i
              className="fas fa-trash-alt"
              onClick={() => deleteRow(data.data._id)}
            ></i>
          </div>
        </div>
      </div>
    );
  };

  const defaultColDefs = {
    flex: 1,
  };

  const [colDefs, setColDefs] = useState([
    { headerName: "Product Name", field: "name" },
    { headerName: "Description", field: "description", sortable: false },
    { headerName: "Quantity", field: "quantity", sortable: false },
    { headerName: "Category", field: "category" },
    { headerName: "Price", field: "price.$numberDecimal" },
    {
      field: "Actions",
      sortable: false,
      cellRenderer: actionButtons,
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NavBar
        setId={setId}
        setSaveEnabled={setSaveEnabled}
        setFormData={setFormData}
      />
      <div className="main-div">
        <div>
          {/* ag grid */}
          <div className="ag-theme-quartz-dark">
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColDefs}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className="icons-info-div">
          <i className="far fa-eye"></i>
          <p>View</p>

          <i className="fas fa-pencil-alt"></i>
          <p>Edit</p>

          <i className="fas fa-trash-alt"></i>
          <p>Delete</p>
        </div>
      </div>
    </>
  );
};

export default SummaryPage;
