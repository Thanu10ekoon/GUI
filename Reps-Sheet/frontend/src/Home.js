import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-container">
      {/* Background Video */}
      <video className="background-video" autoPlay muted loop>
        <source
          src={`${process.env.PUBLIC_URL}/resources/hloop.mp4`}
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
          <Link to="/GUI/signup" onClick={() => setMenuOpen(false)}>
            Register
          </Link>
          <Link to="/GUI/login" onClick={() => setMenuOpen(false)}>
            Sign In
          </Link>
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
        <div className="hero-overlay">
          <h1>Train Smarter, Get Fitter</h1>
          <img src={`${process.env.PUBLIC_URL}/logo192.png`} className="logo1" alt="logo"></img>
          <p>
            Reps-Sheet helps you track your workouts, push your limits, 
            and reach your goals faster. Whether you're a beginner or 
            seasoned athlete, we make it simple to stay motivated and 
            see real progress.
          </p>
          <Link to="/GUI/signup" className="btn-start">
            Start free
          </Link>
          {/* <a href="#how-it-works" className="hero-link">
            See how it works
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default Home;