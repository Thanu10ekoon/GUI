import React, { useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [workout, setWorkout] = useState("");
  const [reps, setReps] = useState("");
  const [workoutDate, setWorkoutDate] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [logs, setLogs] = useState([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Get user email from localStorage
  const userEmail = localStorage.getItem("userEmail");

  // Add a new workout
  const handleAddWorkout = (e) => {
    e.preventDefault();

    if (!workout || !reps || !workoutDate) {
      alert("Please fill all fields");
      return;
    }

    axios
      .post("http://localhost:8082/addWorkout", {
        email: userEmail,
        workout,
        reps,
        workoutDate,
      })
      .then((res) => {
        alert(res.data);
        // Clear fields
        setWorkout("");
        setReps("");
        setWorkoutDate("");
      })
      .catch((err) => console.log(err));
  };

  // Fetch workouts by date
  const handleGetWorkouts = (e) => {
    e.preventDefault();

    if (!searchDate) {
      alert("Please select a date");
      return;
    }

    axios
      .post("http://localhost:8082/getWorkouts", {
        email: userEmail,
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
    <div className="home-container">
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

      {/* The main content area */}
      <div className="dashboard-content">
        <h2>Welcome, {userEmail}</h2>

        {/* Form to add workout */}
        <div className="workout-form">
          <h3>Add Workout</h3>
          <form onSubmit={handleAddWorkout}>
            <label>
              Workout Name:
              <input
                type="text"
                value={workout}
                onChange={(e) => setWorkout(e.target.value)}
              />
            </label>
            <label>
              Reps:
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                value={workoutDate}
                onChange={(e) => setWorkoutDate(e.target.value)}
              />
            </label>
            <button type="submit">Add Workout</button>
          </form>
        </div>

        {/* Form to fetch workouts */}
        <div className="search-form">
          <h3>View Workouts By Date</h3>
          <form onSubmit={handleGetWorkouts}>
            <label>
              Select Date:
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </label>
            <button type="submit">Get Workouts</button>
          </form>
        </div>

        {/* Display fetched workout logs */}
        <div className="workout-logs">
          <h3>Workout Logs</h3>
          {logs.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Workout</th>
                  <th>Reps</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.workout}</td>
                    <td>{log.reps}</td>
                    <td>{log.workout_date}</td>
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
  );
}

export default Dashboard;
