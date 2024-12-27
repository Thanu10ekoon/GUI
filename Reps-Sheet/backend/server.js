const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"

    // host: "bp2juxysn0nszxvmkkzj-mysql.services.clever-cloud.com",
    // user: "udflccbdblfustx7",
    // password: "qgnCvYDdKjXJIfaLe8hL",
    // database: "bp2juxysn0nszxvmkkzj",
    // port: 3306
});

// Signup endpoint (unchanged, still stores name/email/password in `login`)
app.post('/signup', (req, res) => {                                         //replace '/bp2juxysn0nszxvmkkzj' with '/signup'
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Signup Error:", err);
            return res.json("Error");
        }
        return res.json("Signup Successful");
    });
});

// Login endpoint (modified to return user’s name)
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error("Login Error:", err);
            return res.json("Error");
        }
        if (data.length > 0) {
            // data[0] is the user row we found. We’ll return an object:
            // { status: "Login Success", name: user’s name from DB }
            return res.json({ status: "Login Success", name: data[0].name });
        } else {
            return res.json("Invalid Email or Password");
        }
    });
});

// Add a workout (store user’s name, workout, reps, date)
app.post('/addWorkout', (req, res) => {
    const { name, workout, reps, workoutDate } = req.body;
    const sql = "INSERT INTO workout (`name`, `workout`, `reps`, `workout_date`) VALUES (?)";
    const values = [name, workout, reps, workoutDate];
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("addWorkout Error:", err);
            return res.json("Error");
        }
        return res.json("Workout added successfully!");
    });
});

// Get workouts for a specific name + date
app.post('/getWorkouts', (req, res) => {
    const { name, workoutDate } = req.body;
    const sql = "SELECT * FROM workout WHERE `name` = ? AND `workout_date` = ?";
    db.query(sql, [name, workoutDate], (err, data) => {
        if (err) {
            console.error("getWorkouts Error:", err);
            return res.json("Error");
        }
        return res.json(data); // an array of workout objects
    });
});

// Start the server
app.listen(8082, () => {
    console.log("Listening on port 8082");
});
