import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="admin-dashboard-wrapper">
      <p>Dashboard</p>
      <div className="admin-dashboard-links">
        <Link to="/artists-lists">Artists</Link>
        <Link to="/buyer-lists">Buyers</Link>
      </div>
    </div>
  );
};

export default SideBar;
