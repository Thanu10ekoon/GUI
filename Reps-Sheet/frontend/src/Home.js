import React, { useState } from "react";
import { Link } from "react-router-dom"; // <-- Import Link
import "./Home.css";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-container">
      <video className="background-video" autoPlay muted loop>
        <source src={`${process.env.PUBLIC_URL}/resources/hloop.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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

      <div className="hero-content">
        {/* Use a Link in place of <button> */}
        <Link to="/GUI/signup" className="btn-start">
          Start free
        </Link>
        <a href="#how-it-works" className="hero-link">
          {/* Possibly show "See how it works" here */}
        </a>
      </div>
    </div>
  );
}

export default Home;
