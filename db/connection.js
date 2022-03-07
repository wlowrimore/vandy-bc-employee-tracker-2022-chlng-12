const mysql = require('mysql2');

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


module.exports = db;