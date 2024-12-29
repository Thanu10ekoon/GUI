// Dashboard.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [searchDate, setSearchDate] = useState("");
  const [logs, setLogs] = useState([]);
  
  // Grab the userName from localStorage
  const userName = localStorage.getItem("userName");
  
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Protect this page: redirect to /GUI/login if userName is missing
  useEffect(() => {
    if (!userName) {
      // You can redirect to '/GUI/' (home) or '/GUI/login'
      navigate("/GUI/login");
    }
  }, [userName, navigate]);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Logout handler: remove userName from localStorage and redirect
  const handleLogout = () => {
    localStorage.removeItem("userName");
    // After removing userName, navigate to the home or login page
    navigate("/GUI/login");
  };

  // Function to handle "Get Workouts"
  const handleGetWorkouts = (e) => {
    e.preventDefault();
    if (!searchDate) {
      alert("Please select a date");
      return;
    }
    axios
      .post("http://localhost:8082/getWorkouts", {
        name: userName,
        workoutDate: searchDate,
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setLogs(res.data);
        } else {
          alert("Error retrieving workouts");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="dhome-container">
      {/* Background video */}
      <video className="dbackground-video" autoPlay muted loop>
        <source
          src={`${process.env.PUBLIC_URL}/resources/dloop.mp4`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Navbar */}
      <nav className="dnavbar">
        <div className="dnav-left">
          <img
            src={`${process.env.PUBLIC_URL}/logo192.png`}
            alt="logo"
            className="dnav-logo"
          />
        </div>
        <div className={`dnav-right ${menuOpen ? "open" : ""}`}>
          <Link to="/GUI/record" onClick={() => setMenuOpen(false)}>
            Record Workout
          </Link>
          {/* Logout link */}
          <Link to="/GUI/" onClick={handleLogout}>Logout</Link>
        </div>
        <div className="dhamburger" onClick={toggleMenu}>
          <span className="dbar"></span>
          <span className="dbar"></span>
          <span className="dbar"></span>
        </div>
      </nav>

      {/* Main content */}
      <div className="ddashboard-content">
        <div className="dform-container">
          <h2>Welcome, {userName}</h2>
          <h3>View Workouts By Date</h3>
          <form onSubmit={handleGetWorkouts} className="dater">
            <label className="label1">Select Date:</label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <button type="submit" className="getworkoutbut">
              Get Workouts
            </button>
          </form>

          {/* Workout Logs Table */}
          <div className="dworkout-logs">
            <h3>Workout Log</h3>
            {logs.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Workout</th>
                    <th>Reps</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.workout}</td>
                      <td>{log.reps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No workout logs to display.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
