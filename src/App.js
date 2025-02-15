import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "./redux/tableSlice";
import * as XLSX from "xlsx";
import Table from "./components/Table";
import Form from "./components/Form";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table.data);
  const [filteredData, setFilteredData] = useState(tableData);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   dispatch(setData([{ name: "John Doe", email: "john@example.com" }])); // Replace with actual data source
  // }, [dispatch]);
  useEffect(() => {
    const dummyData = [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Smith", email: "jane@example.com" },
      { name: "Alice Johnson", email: "alice@example.com" },
      { name: "Bob Brown", email: "bob@example.com" },
      { name: "Charlie White", email: "charlie@example.com" },
      { name: "David Black", email: "david@example.com" },
      { name: "Eve Adams", email: "eve@example.com" },
      { name: "Franklin Carter", email: "franklin@example.com" },
      { name: "Grace Hall", email: "grace@example.com" },
      { name: "Henry Miller", email: "henry@example.com" },
      { name: "Ivy Wilson", email: "ivy@example.com" },
      { name: "Jack Thompson", email: "jack@example.com" },
      { name: "Katherine Clark", email: "katherine@example.com" },
      { name: "Leo Walker", email: "leo@example.com" },
      { name: "Mia Harris", email: "mia@example.com" },
      { name: "Nathan Lee", email: "nathan@example.com" },
      { name: "Olivia Martin", email: "olivia@example.com" },
      { name: "Peter Scott", email: "peter@example.com" },
      { name: "Quincy Baker", email: "quincy@example.com" },
      { name: "Rachel Young", email: "rachel@example.com" }
    ];
  
    dispatch(setData(dummyData));
  }, [dispatch]);


  useEffect(() => {
    setFilteredData(
      tableData.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    );
  }, [searchQuery, tableData]);
  
    const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  // Get the field names from the first data item
  const fields = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container">
      <div className="controls-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="success" onClick={exportToExcel}>Download Excel</button>
        </div>
        <Button 
          className="primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Hide Form' : 'Add New Entry'}
        </Button>
      </div>
      {showForm && (
        <div className="form-section">
          <Form fields={fields} />
        </div>
      )}
      <div className="table-section">
        <Table data={filteredData} />
      </div>
    </div>
  );

};

export default App;
