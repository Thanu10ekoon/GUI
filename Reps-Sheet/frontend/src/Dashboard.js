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

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Day names
const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function Dashboard() {
  const [searchDate, setSearchDate] = useState("");
  const [logs, setLogs] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(""); // for user’s profile image

  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) {
      navigate("/GUI/login");
      return;
    }
    fetchWeeklyData();
    fetchProfileImage();
    // eslint-disable-next-line
  }, []);

  // --- fetch user’s profile image from /getUserProfile
  const fetchProfileImage = () => {
    axios
      .post("http://localhost:8082/getUserProfile", { username: userName })
      .then((res) => {
        if (res.data && res.data.profile_image) {
          setProfilePic(res.data.profile_image);
        } else {
          // If no image, use default
          setProfilePic(`${process.env.PUBLIC_URL}/resources/pro.png`);
        }
      })
      .catch((err) => {
        console.error(err);
        setProfilePic(`${process.env.PUBLIC_URL}/resources/pro.png`);
      });
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/GUI/login");
  };

  // Handle fetching workouts for chosen date
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

  // Fetch last 7 days of data
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

  // For each date from DB, figure out which day of week
  weekData.forEach((item) => {
    const dayIndex = new Date(item.date).getDay(); 
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex];
    dayTotals[dayName] += item.totalReps;
  });

  // Chart data config
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

  // Chart options
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
        ticks:{display:false},
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "This Week",
        color: "#fff",
        font: { size: 30 },
      },
    },
  };

  const finalProfilePic = profilePic || `${process.env.PUBLIC_URL}/resources/pro.png`;

  return (
    <div className="pdashboard-container">
      {/* Background video */}
      <video className="pdashboard-background-video" autoPlay muted loop>
        <source
          src={`${process.env.PUBLIC_URL}/resources/dloop.mp4`}
          type="video/mp4"
        />
      </video>

      {/* Navbar */}
      <nav className="pnavbar">
        <div className="pnav-left">
          <Link to="/GUI/">
            <img
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt="logo"
              className="pnav-logo"
            />
          </Link>
        </div>

        {/* Nav links */}
        <div className={`pnav-right ${menuOpen ? "popen" : ""}`}>
          <Link to="/GUI/record" onClick={() => setMenuOpen(false)}>
            Record Workout
          </Link>
          <Link to="/GUI/" onClick={handleLogout}>
            Logout
          </Link>

          {/* Profile icon */}
          <Link to="/GUI/profile" onClick={() => setMenuOpen(false)}>
            <img
              src={finalProfilePic}
              alt="profile"
              className="pnav-profile-pic"
            />
          </Link>
        </div>

        {/* Hamburger icon */}
        <div className="phamburger" onClick={toggleMenu} style={{ marginRight: "15px" }}>
          <span className="pbar"></span>
          <span className="pbar"></span>
          <span className="pbar"></span>
        </div>
      </nav>
      <div className="dwelcome"><h2 className="dh2">Welcome, {userName}</h2></div>

      {/* Main content container */}
      <div className="pdashboard-content">
        {/* LEFT CARD */}
        <div className="pdashboard-card pdashboard-left-card">
          
          <h3 className="dh3">Workout Log</h3>
          <form onSubmit={handleGetWorkouts} className="pdate-form">
            <label>Select Date:</label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <button type="submit" className="pbtn-get-workouts">
              Get Workouts
            </button>
          </form>

          <div className="pworkout-logs">
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

        {/* RIGHT CARD */}
        <div className="pdashboard-card">
          <div className="pchart-container">
            <Bar data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
