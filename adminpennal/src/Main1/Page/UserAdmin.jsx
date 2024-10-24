import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is installed and imported
import Table from "react-bootstrap/Table";
import "./useradmin.css";
import { Api_URL } from "../../utills/Server";
// import Table from "react-bootstrap/Table";

export default function UserAdmin({ activeMenuItem }) {
  // Accept activeMenuItem as a prop
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Api_URL + "admin/get");
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4 p-4 bg-box">
      {" "}
      {/* Full box with padding */}
      <div className="row">
        <div className="col">
          <h2 className="text-center mb-4 text-light">Users List</h2>{" "}
          {/* Header */}
          {items && items.length > 0 ? (
            <Table bordered hover responsive className="text-center">
              <thead className="thead-dark bg-header">
                {" "}
                {/* Header background color */}
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="bg-row">
                    {" "}
                    {/* Row background color */}
                    <td>{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-footer">
                {" "}
                {/* Footer background color */}
                <tr>
                  <td colSpan="4">
                    <strong>Total Users: {items.length}</strong>
                  </td>
                </tr>
              </tfoot>
            </Table>
          ) : (
            <div className="alert alert-warning text-center">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
