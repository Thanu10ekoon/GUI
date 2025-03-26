/***************************************************
 * Profile.js – Profile Page (centered heading & image)
 **************************************************/
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

// Get the base URL from the .env file
const BASE_URL = process.env.REACT_APP_API_URL;

function Profile() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const [menuOpen, setMenuOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    age: "",
    weight: "",
    height: "",
    email: "",
    password: "",
    profileImage: "", // holds Base64-encoded string
  });

  // On page load, fetch/create user_profile row
  useEffect(() => {
    if (!userName) {
      // If not logged in, go to login
      navigate("/GUI/login");
      return;
    }

    axios
      .post(`${BASE_URL}/getUserProfile`, { username: userName })
      .then((res) => {
        if (typeof res.data === "string") {
          alert(res.data);
        } else if (res.data.username) {
          // We got the user profile
          setFormData({
            username: res.data.username,
            name: res.data.name || "",
            age: res.data.age || "",
            weight: res.data.weight || "",
            height: res.data.height || "",
            email: res.data.email || "",
            password: res.data.password || "",
            profileImage: res.data.profile_image || "",
          });
        }
      })
      .catch((err) => console.error(err));
  }, [userName, navigate]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/GUI/login");
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file input (read as Base64)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.includes("@")) {
      alert("Invalid email address.");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    axios
      .post(`${BASE_URL}/updateUserProfile`, formData)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => console.error(err));
  };

  // Preview if we have a Base64 image
  const imagePreview = formData.profileImage ? (
    <img
      src={formData.profileImage}
      alt="Profile Preview"
      style={{
        width: "150px",
        height: "150px",
        objectFit: "cover",
        borderRadius: "50%",
      }}
    />
  ) : (
    <p>No profile image.</p>
  );

  return (
    <div className="dhome-container">
      {/* Background video */}
      <video className="dbackground-video" autoPlay muted loop>
        <source
          src={`${process.env.PUBLIC_URL}/resources/ploop.mp4`}
          type="video/mp4"
        />
      </video>

      {/* Navbar */}
      <nav className="dnavbar">
        <div className="dnav-left">
          <Link to="/GUI/">
            <img
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt="logo"
              className="dnav-logo"
            />
          </Link>
        </div>

        <div className={`dnav-right ${menuOpen ? "open" : ""}`}>
          <Link to="/GUI/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
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

      {/* Main content container */}
      <div className="dcontent-container">
        <div className="dcard dleft-card">
          {/* Centered heading & image */}
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            {imagePreview}
            {/* e.g. "Thanu's Profile" */}
            <h2 style={{ marginTop: "1rem" }}>
              {formData.username ? `${formData.username}'s Profile` : "Profile"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="dform-container">
            {/* If you want to remove the Username field from the form, 
                just comment these out. Otherwise, keep them: */}
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled
            />

            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />

            <label>Weight (kg):</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />

            <label>Height (cm):</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <label>Profile Image:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <button type="submit" className="getworkoutbut">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
