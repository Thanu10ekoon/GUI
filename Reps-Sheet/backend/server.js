const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

const db = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "reps-sheet",

  host: "bp2juxysn0nszxvmkkzj-mysql.services.clever-cloud.com",
  user: "udflccbdblfustx7",
  password: "qgnCvYDdKjXJIfaLe8hL",
  database: "bp2juxysn0nszxvmkkzj",
  port: 3306
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err) => {
    if (err) {
      console.error("Signup Error:", err);
      return res.json("Error");
    }
    return res.json("Signup Successful");
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error("Login Error:", err);
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json({ status: "Login Success", name: data[0].name });
    } else {
      return res.json("Invalid Email or Password");
    }
  });
});


app.post("/addWorkout", (req, res) => {
  const { name, workout, reps, workoutDate } = req.body;
  const sql = "INSERT INTO workout (`name`, `workout`, `reps`, `workout_date`) VALUES (?)";
  const values = [name, workout, reps, workoutDate];
  db.query(sql, [values], (err) => {
    if (err) {
      console.error("addWorkout Error:", err);
      return res.json("Error");
    }
    return res.json("Workout added successfully!");
  });
});

app.post("/deleteWorkout", (req, res) => {
  const { id } = req.body;
  const sql = "DELETE FROM workout WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("deleteWorkout Error:", err);
      return res.json("Error");
    }
    return res.json("Workout deleted successfully!");
  });
});

app.post("/getWorkouts", (req, res) => {
  const { name, workoutDate } = req.body;
  const sql = "SELECT * FROM workout WHERE `name` = ? AND `workout_date` = ?";
  db.query(sql, [name, workoutDate], (err, data) => {
    if (err) {
      console.error("getWorkouts Error:", err);
      return res.json("Error");
    }
    return res.json(data);
  });

  app.post("/updateWorkout", (req, res) => {
    const { id, workout, reps, workoutDate } = req.body;
    const sql = "UPDATE workout SET workout = ?, reps = ?, workout_date = ? WHERE id = ?";
    db.query(sql, [workout, reps, workoutDate, id], (err) => {
      if (err) {
        console.error("updateWorkout Error:", err);
        return res.json("Error updating workout.");
      }
      return res.json("Workout updated successfully!");
    });
  });
});

app.post("/getWeeklyWorkouts", (req, res) => {
  const { name } = req.body;
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
    return res.json(data);
  });
});

app.post("/getUserProfile", (req, res) => {
  const { username } = req.body;
  const checkSql = "SELECT * FROM user_profile WHERE username = ?";
  db.query(checkSql, [username], (err, data) => {
    if (err) {
      console.error("getUserProfile check Error:", err);
      return res.json("Error");
    }
    if (data.length > 0) {

      const row = data[0];
      if (row.profile_image) {
        row.profile_image = row.profile_image.toString();
      }
      return res.json(row);
    } else {
      const loginSql = "SELECT * FROM login WHERE name = ?";
      db.query(loginSql, [username], (err2, loginData) => {
        if (err2) {
          console.error("getUserProfile login Error:", err2);
          return res.json("Error");
        }

        if (loginData.length > 0) {
          const { name, email, password } = loginData[0];
          const insertSql = `
            INSERT INTO user_profile 
              (username, email, password, name, age, weight, height, profile_image)
            VALUES 
              (?, ?, ?, '', NULL, NULL, NULL, NULL)
          `;
          db.query(insertSql, [name, email, password], (err3) => {
            if (err3) {
              console.error("Error inserting user_profile:", err3);
              return res.json("Error");
            }
            db.query(checkSql, [username], (err4, newData) => {
              if (err4) {
                console.error("Error retrieving new user_profile:", err4);
                return res.json("Error");
              }
              if (newData.length > 0) {
                const newRow = newData[0];
                if (newRow.profile_image) {
                  newRow.profile_image = newRow.profile_image.toString();
                }
                return res.json(newRow);
              } else {
                return res.json("No user found (unexpected).");
              }
            });
          });
        } else {
          return res.json("No user found in login table.");
        }
      });
    }
  });
});

app.post("/updateUserProfile", (req, res) => {
  const {
    username,
    name,
    age,
    weight,
    height,
    email,
    password,
    profileImage,
  } = req.body;

  if (!email || !email.includes("@")) {
    return res.json("Invalid email address");
  }
  if (!password || password.length < 6) {
    return res.json("Password must be at least 6 characters");
  }

  // Update the user_profile row
  const sql = `
    UPDATE user_profile
    SET 
      name = ?,
      age = ?,
      weight = ?,
      height = ?,
      email = ?,
      password = ?,
      profile_image = ?
    WHERE username = ?
  `;
  db.query(sql, [name, age, weight, height, email, password, profileImage, username], (err) => {
    if (err) {
      console.error("updateUserProfile Error:", err);
      return res.json("Error updating profile.");
    }
    return res.json("Profile updated successfully!");
  });
});

app.listen(8082, () => {
  console.log("Listening on port 8082");
});
