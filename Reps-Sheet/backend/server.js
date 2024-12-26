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
});

// Existing signup endpoint
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

// Existing login endpoint
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            // Return “Login Success” so the front end can store the user’s email 
            return res.json("Login Success");
        } else {
            return res.json("Invalid Email or Password");
        }
    });
});

// New endpoint: Add a workout
app.post('/addWorkout', (req, res) => {
    const { email, workout, reps, workoutDate } = req.body;

    const sql = "INSERT INTO workout (`email`, `workout`, `reps`, `workout_date`) VALUES (?)";
    const values = [email, workout, reps, workoutDate];

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err);
            return res.json("Error");
        }
        return res.json("Workout added successfully!");
    });
});

// New endpoint: Get workouts by email + date
app.post('/getWorkouts', (req, res) => {
    const { email, workoutDate } = req.body;

    const sql = "SELECT * FROM workout WHERE email = ? AND workout_date = ?";
    db.query(sql, [email, workoutDate], (err, data) => {
        if (err) {
            console.error(err);
            return res.json("Error");
        }
        return res.json(data);  // Return an array of workouts
    });
});

// Listen
app.listen(8082, () => {
    console.log("Listening on port 8082");
});
