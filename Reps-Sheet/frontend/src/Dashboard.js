import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-container">
      {/* Background Video */}
      <video className="background-video" autoPlay muted loop>
        <source
          src={`${process.env.PUBLIC_URL}/resources/dloop.mp4`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <img
            src={`${process.env.PUBLIC_URL}/logo192.png`}
            alt="logo"
            className="nav-logo"
          />
        </div>
        <div className={`nav-right ${menuOpen ? "open" : ""}`}>
          <a href="/GUI/signup" onClick={() => setMenuOpen(false)}>
            Register
          </a>
          <a href="/GUI/login" onClick={() => setMenuOpen(false)}>
            Sign In
          </a>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="hero-content">
        {/* Translucent box containing text, CTA button, etc. */}
        
      </div>
    </div>
  );
}

export default Dashboard;