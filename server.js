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

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});