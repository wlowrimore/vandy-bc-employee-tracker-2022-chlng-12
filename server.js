const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to Database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '@Vandy#2022_bc/19!',
    database: 'employee_tracker'
  },
  console.log('Connected to the employee_tracker database.')
);

db.query(`SELECT * FROM department`, (err, rows) => {
  console.log(rows);
});

// GET a single department
// db.query(`SELECT * FROM department WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// })

// DELETE a department
// db.query(`DELETE FROM department WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// CREATE a department
const sql = `INSERT INTO department (id, dep_name) VALUES (?,?)`;
const params = [1, 'Electric Guitars'];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});