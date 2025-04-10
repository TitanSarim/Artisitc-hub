import React from "react";

import "../../styles/AdminDashboard.css";
import SideBar from "./SideBar";
const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <SideBar />
      <div className="analytics">Analytics</div>
    </div>
  );
};

export default Dashboard;
