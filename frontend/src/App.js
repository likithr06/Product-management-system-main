import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import NewPage from "./components/NewPage";
import SummaryPage from "./components/SummaryPage";

function App() {
  const [saveEnabled, setSaveEnabled] = useState(true);
  const [id, setId] = useState(0);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    quantity: "",
    price: "",
    category: "",
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setId={setId}
              setFormData={setFormData}
              setSaveEnabled={setSaveEnabled}
            />
          }
        />
        <Route
          path={"/new"}
          element={
            <NewPage
              formData={formData}
              setFormData={setFormData}
              saveEnabled={saveEnabled}
              id={id}
              setSaveEnabled={setSaveEnabled}
              setId={setId}
            />
          }
        />
        <Route
          path="/summary"
          element={
            <SummaryPage
              setSaveEnabled={setSaveEnabled}
              setId={setId}
              setFormData={setFormData}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
