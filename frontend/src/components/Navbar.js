import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../actions/userAction";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      dispatch(userLogOut());
      navigate("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    background: "#ffffff",
    borderBottom: "2px solid #e5e5e5",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const logoStyle = {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#6a9438",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  };

  const linkContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333333",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "16px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#6a9438",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#4a7225",
  };

  return (
    <nav style={navbarStyle}>
      <Link to="/" style={logoStyle}>
        ArtistryHub
      </Link>
      <div style={linkContainerStyle}>
        <Link to="/whatsnew" style={linkStyle}>
          What’s New
        </Link>
        <Link to="/artists" style={linkStyle}>
          Artists
        </Link>
        <Link to="/artworks" style={linkStyle}>
          Artworks
        </Link>
        {user && user.type === "ARTIST" && (
          <Link
            to="/artist-dashboard"
            style={{
              ...linkStyle,
              backgroundColor: "#6a9438",
              color: "#ffffff",
            }}
          >
            My Dashboard
          </Link>
        )}
        {user && user.role === "BUYER" && (
          <Link
            to="/profile"
            style={{
              ...linkStyle,
              backgroundColor: "#6a9438",
              color: "#ffffff",
            }}
          >
            My Profile
          </Link>
        )}
        {isAuthenticated === true ? (
          <button
            onClick={handleLogout}
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/auth"
            style={{
              ...linkStyle,
              backgroundColor: "#6a9438",
              color: "#ffffff",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4a7225")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#6a9438")}
          >
            Login/Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
