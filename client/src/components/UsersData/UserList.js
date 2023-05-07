import React, { useState, useEffect } from "react";
import "./UserList.css";

const API = "http://localhost:5000/api/users/get";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async (url) => {
    try {
      console.log("Fetching data from", url);
      const res = await fetch(url);
      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Fetched data:", data);
      if (users.length > 0) {
        setUsers(data);
      }
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  useEffect(() => {
    fetchUsers(API);
  }, []);

  console.log("Users:", users);

  return (
    <>
      <h1>User Details</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB / Age</th>
            <th>Sex</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Govt ID</th>
            <th>Guardian Details</th>
            <th>Nationality</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.dob}</td>
                <td>{user.sex}</td>
                <td>{user.mobile}</td>
                <td>{user.address}</td>
                <td>{user.govtId}</td>
                <td>{user.guardian}</td>
                <td>{user.nationality}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
