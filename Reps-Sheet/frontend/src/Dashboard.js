/***************************************************
 * Dashboard.js – Improved Layout for Left/Right
 **************************************************/
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function Dashboard() {
  const [searchDate, setSearchDate] = useState("");
  const [logs, setLogs] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const userName = localStorage.getItem("userName");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) navigate("/GUI/login");
    fetchWeeklyData();
    // eslint-disable-next-line
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/GUI/login");
  };

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
      .then((res) => setLogs(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.log(err));
  };

  const fetchWeeklyData = () => {
    axios
      .post("http://localhost:8082/getWeeklyWorkouts", { name: userName })
      .then((res) => {
        if (Array.isArray(res.data)) setWeekData(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Tally up total reps by day name
  const dayTotals = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  weekData.forEach((item) => {
    const dayIndex = new Date(item.date).getDay();
    // dayIndex: Sunday = 0, Monday = 1, ...
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex];
    dayTotals[dayName] += item.totalReps;
  });

  // Prepare chart data
  const chartData = {
    labels: dayNames,
    datasets: [
      {
        label: "Total Reps",
        data: dayNames.map((d) => dayTotals[d]),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#fff" },
      },
      y: {
        grid: { display: false },
        beginAtZero: true,
        ticks: { color: "#fff" },
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Weekly Reps by Day",
        color: "#fff",
        font: { size: 16 },
      },
    },
  };

  return (
    <div className="dhome-container">
      <video className="dbackground-video" autoPlay muted loop>
        <source
          src={`${process.env.PUBLIC_URL}/resources/dloop.mp4`}
          type="video/mp4"
        />
      </video>

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
          <Link to="/GUI/" onClick={handleLogout}>
            Logout
          </Link>
        </div>

        <div className="dhamburger" onClick={toggleMenu}>
          <span className="dbar"></span>
          <span className="dbar"></span>
          <span className="dbar"></span>
        </div>
      </nav>

      {/* Main content container with two "cards" */}
      <div className="dcontent-container">
        {/* LEFT CARD */}
        <div className="dcard dleft-card">
          <h2>Welcome, {userName}</h2>
          <h3>View Workouts By Date</h3>
          <form onSubmit={handleGetWorkouts} className="dform-container">
            <label>Select Date:</label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <button type="submit" className="getworkoutbut">
              Get Workouts
            </button>
          </form>

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

        {/* RIGHT CARD (CHART) */}
        <div className="dcard">
          <div className="chart-container">
            <Bar data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
