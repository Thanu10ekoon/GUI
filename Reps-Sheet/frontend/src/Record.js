import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Record.css";

// Get the base URL from .env file
const BASE_URL = process.env.REACT_APP_API_URL;

function Record() {
    const [workout, setWorkout] = useState("");
    const [reps, setReps] = useState("");
    const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().slice(0, 10));
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [logs, setLogs] = useState([]);
    const [editingWorkout, setEditingWorkout] = useState(null);
    const [profilePic, setProfilePic] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const userName = localStorage.getItem("userName");
    const navigate = useNavigate();

    const fetchWorkouts = useCallback((date) => {
        axios
            .post(`${BASE_URL}/getWorkouts`, { name: userName, workoutDate: date })
            .then((res) => setLogs(res.data))
            .catch((err) => console.error("Error fetching workouts:", err));
    }, [userName]);

    useEffect(() => {
        if (!userName) {
            navigate("/GUI/login");
            return;
        }
        fetchWorkouts(selectedDate);
        fetchProfileImage();
    }, [selectedDate, fetchWorkouts, userName, navigate]);

    const fetchProfileImage = () => {
        axios
            .post(`${BASE_URL}/getUserProfile`, { username: userName })
            .then((res) => {
                if (res.data && res.data.profile_image) {
                    setProfilePic(res.data.profile_image);
                } else {
                    setProfilePic(`${process.env.PUBLIC_URL}/resources/pro.png`);
                }
            })
            .catch((err) => {
                console.error(err);
                setProfilePic(`${process.env.PUBLIC_URL}/resources/pro.png`);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("userName");
        navigate("/GUI/login");
    };

    const handleAddWorkout = (e) => {
        e.preventDefault();
        if (editingWorkout) {
            handleUpdateWorkout(editingWorkout.id);
        } else {
            axios
                .post(`${BASE_URL}/addWorkout`, {
                    name: userName,
                    workout,
                    reps,
                    workoutDate,
                })
                .then(() => {
                    alert("Workout added successfully!");
                    fetchWorkouts(selectedDate);
                    resetForm();
                })
                .catch((err) => console.error("Error adding workout:", err));
        }
    };

    const handleDeleteWorkout = (id) => {
        axios
            .post(`${BASE_URL}/deleteWorkout`, { id })
            .then(() => {
                alert("Workout deleted successfully!");
                fetchWorkouts(selectedDate);
            })
            .catch((err) => console.error("Error deleting workout:", err));
    };

    const handleEditWorkout = (workoutData) => {
        setWorkout(workoutData.workout);
        setReps(workoutData.reps);
        setWorkoutDate(selectedDate);
        setEditingWorkout(workoutData);
    };

    const handleUpdateWorkout = (id) => {
        axios
            .post(`${BASE_URL}/updateWorkout`, {
                id,
                workout,
                reps,
                workoutDate,
            })
            .then(() => {
                alert("Workout updated successfully!");
                fetchWorkouts(selectedDate);
                resetForm();
            })
            .catch((err) => console.error("Error updating workout:", err));
    };

    const resetForm = () => {
        setWorkout("");
        setReps("");
        setWorkoutDate(new Date().toISOString().slice(0, 10));
        setEditingWorkout(null);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="rhome-container">
            {/* Background Video */}
            <video className="rbackground-video" autoPlay muted loop>
                <source src={`${process.env.PUBLIC_URL}/resources/dloop.mp4`} type="video/mp4" />
            </video>

            {/* Navbar Section */}
            <nav className="rnavbar">
                <div className="rnav-left">
                    <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" className="rnav-logo" />
                </div>
                <div className={`rnav-right ${menuOpen ? "rnav-open" : ""}`}>
                    <Link to="/GUI/dashboard">Dashboard</Link>
                    <Link to="/GUI/" onClick={handleLogout}>Logout</Link>
                    <Link to="/GUI/profile">
                        <img src={profilePic} alt="profile" className="rnav-profile-pic" />
                    </Link>
                </div>
                <div className="rhamburger" onClick={toggleMenu}>
                    <span className="rbar"></span>
                    <span className="rbar"></span>
                    <span className="rbar"></span>
                </div>
            </nav>

            {/* Main Content Section */}
            <div className="rcontent-container">
                {/* Left Card - Workout Log with Date Picker and Delete/Edit */}
                <div className="rform-container">
                    <h3 className="rh3">Change Log</h3>
                    <label>Select Date:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <div className="rworkout-list-container">
                        {logs.length > 0 ? (
                            logs.map((log) => (
                                <div key={log.id} className="rworkout-card">
                                    <p><strong>Workout:</strong> {log.workout}</p>
                                    <p><strong>Reps:</strong> {log.reps}</p>
                                    <button onClick={() => handleEditWorkout(log)} className="redit-button">Edit</button>
                                    <button onClick={() => handleDeleteWorkout(log.id)} className="rdelete-button">Delete</button>
                                </div>
                            ))
                        ) : (
                            <p>No workouts available for this date.</p>
                        )}
                    </div>
                </div>

                {/* Right Card - Add or Update Workout Form */}
                <div className="rform-container">
                    <h3 className="rh3">{editingWorkout ? "Update Workout" : "Add New Workout"}</h3>
                    <form onSubmit={handleAddWorkout}>
                        <input
                            type="text"
                            placeholder="Workout Name"
                            value={workout}
                            onChange={(e) => setWorkout(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Reps"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            value={workoutDate}
                            onChange={(e) => setWorkoutDate(e.target.value)}
                            required
                        />
                        <button type="submit">
                            {editingWorkout ? "Update Workout" : "Add Workout"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Record;
