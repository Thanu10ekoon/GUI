/***************************************************
 * server.js – Node/Express server with MySQL
 **************************************************/
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "reps-sheet"
    
    host: "bp2juxysn0nszxvmkkzj-mysql.services.clever-cloud.com",
    user: "udflccbdblfustx7",
    password: "qgnCvYDdKjXJIfaLe8hL",
    database: "bp2juxysn0nszxvmkkzj",
    port: 3306
});

// Signup endpoint (stores name/email/password in `login`)
app.post('/signup', (req, res) => {
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

// Login endpoint (returns user’s name if success)
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error("Login Error:", err);
            return res.json("Error");
        }
        if (data.length > 0) {
            // Return { status: "Login Success", name: <theUserName> }
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

app.post('/deleteWorkout', (req, res) => {
    const { id } = req.body;
    const sql = "DELETE FROM workout WHERE id = ?";
    db.query(sql, [id], (err, data) => {
      if (err) {
        console.error("deleteWorkout Error:", err);
        return res.json("Error");
      }
      return res.json("Workout deleted successfully!");
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

    app.post('/updateWorkout', (req, res) => {
        const { id, workout, reps, workoutDate } = req.body;
        const sql = "UPDATE workout SET workout = ?, reps = ?, workout_date = ? WHERE id = ?";
        db.query(sql, [workout, reps, workoutDate, id], (err, result) => {
            if (err) {
                console.error("updateWorkout Error:", err);
                return res.json("Error updating workout.");
            }
            return res.json("Workout updated successfully!");
        });
    });
    

});

/**
 * New endpoint: getWeeklyWorkouts
 *
 * Returns total reps per day for the past 7 days (including today),
 * grouped by day (i.e., each date), for the given user name.
 */
app.post('/getWeeklyWorkouts', (req, res) => {
    const { name } = req.body;
    
    // MySQL query to sum reps for each of last 7 days
    const sql = `
        SELECT 
            DATE(workout_date) AS date,
            SUM(reps) AS totalReps
        FROM workout
        WHERE name = ?
          AND workout_date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        GROUP BY DATE(workout_date)
        ORDER BY DATE(workout_date) ASC
    `;
    db.query(sql, [name], (err, data) => {
        if (err) {
            console.error("getWeeklyWorkouts Error:", err);
            return res.json("Error");
        }
        // data looks like: [ { date: '2024-01-01', totalReps: 50 }, ... ]
        return res.json(data);
    });
});

// Start the server
app.listen(8082, () => {
    console.log("Listening on port 8082");
});
