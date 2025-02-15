import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import "../styles/Table.css";

const Table = ({ data }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];
    
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortConfig.direction === "ascending" ? valueA - valueB : valueB - valueA;
    }
    
    if (valueA instanceof Date && valueB instanceof Date) {
      return sortConfig.direction === "ascending" ? valueA - valueB : valueB - valueA;
    }
    
    const strA = String(valueA).toLowerCase();
    const strB = String(valueB).toLowerCase();
    return sortConfig.direction === "ascending" 
      ? strA.localeCompare(strB)
      : strB.localeCompare(strA);
  });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (sortConfig && sortConfig.key === key && sortConfig.direction === "descending") {
      // Clear sorting if clicking the same column again
      setSortConfig(null);
      return;
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th key="name" onClick={() => handleSort("name")} className="sortable-header">
              Name
              <span className="sort-indicator">
                {sortConfig?.key === "name" ? (sortConfig.direction === "ascending" ? "▲" : "▼") : "↕"}
              </span>
            </th>
            <th key="email" onClick={() => handleSort("email")} className="sortable-header">
              Email
              <span className="sort-indicator">
                {sortConfig?.key === "email" ? (sortConfig.direction === "ascending" ? "▲" : "▼") : "↕"}
              </span>
            </th>

          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((val, i) => (
                <td key={i}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination>{paginationItems}</Pagination>

    </div>
  );
};

export default Table;
