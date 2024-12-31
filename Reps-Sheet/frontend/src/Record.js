// Record.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Record.css";

function Record() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/GUI/login");
  };

  const [workout, setWorkout] = useState("");
  const [reps, setReps] = useState("");
  const [workoutDate, setWorkoutDate] = useState("");

  const userName = localStorage.getItem("userName");
  
  const [menuOpen, setMenuOpen] = useState(false);
    
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAddWorkout = (e) => {
    e.preventDefault();
    if (!workout || !reps || !workoutDate) {
      alert("Please fill all fields");
      return;
    }
    axios
      .post("http://localhost:8082/addWorkout", {
        name: userName,
        workout,
        reps,
        workoutDate,
      })
      .then((res) => {
        alert(res.data);
        setWorkout("");
        setReps("");
        setWorkoutDate("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="rhome-container">
      {/* Background video */}
      <video className="rbackground-video" autoPlay muted loop>
        <source
          src={`${process.env.PUBLIC_URL}/resources/dloop.mp4`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Navbar */}
      <nav className="rnavbar">
        <div className="rnav-left">
          <img
            src={`${process.env.PUBLIC_URL}/logo192.png`}
            alt="logo"
            className="rnav-logo"
          />
        </div>
        <div className={`rnav-right ${menuOpen ? "open" : ""}`}>
          <Link to="/GUI/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/GUI/" onClick={handleLogout}>Logout</Link>
        </div>
        <div className="rhamburger" onClick={toggleMenu}>
          <span className="rbar"></span>
          <span className="rbar"></span>
          <span className="rbar"></span>
        </div>
      </nav>

      {/* Main content */}
      <div className="rrecord-content">

        {/* Add Workout Form */}
        <div className="rform-container">
          <h3>Add Workout</h3>
          <form onSubmit={handleAddWorkout}>
            <label>Workout Name:</label>
            <input
              type="text"
              placeholder="e.g. Crunches"
              value={workout}
              onChange={(e) => setWorkout(e.target.value)}
            />
            <label>Reps:</label>
            <input
              type="number"
              placeholder="e.g. 50"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
            <label>Date:</label>
            <input
              type="date"
              value={workoutDate}
              onChange={(e) => setWorkoutDate(e.target.value)}
            />
            <button type="submit">Add Workout</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Record;
