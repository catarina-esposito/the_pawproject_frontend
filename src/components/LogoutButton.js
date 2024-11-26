import React from "react";
import axios from "axios";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8080/api/users/logout", 
        {},
        { withCredentials: true }
      );
      alert("Logged Out Successfully!");
    } catch (err) {
      alert("Logout Failed.");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
