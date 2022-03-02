const mysql = require('mysql2');
const express = require('express');
const inputCheck = require('./utils/inputCheck');

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

// GET all departments
app.get('/api/department', (req, res) => {
  const sql = `SELECT role.*, department.dep_name
                AS dep_name
                FROM role
                LEFT JOIN department
                ON role.id = department.id`;

  db.query(sql, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// GET a single department
app.get('/api/department/:id', (req, res) => {
  const sql = `SELECT role.*, department.dep_name
                AS dep_name
                FROM role
                LEFT JOIN department
                ON role.id = department.id
                WHERE department.id = ?`;
  const params = [req.params.id];
  
  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// DELETE a department
app.delete('/api/department/:id', (req, res) => {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Department not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// CREATE a department
app.post('/api/department', ({ body }, res) => {
  const errors = inputCheck(body, 'dep_name');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO department (dep_name) VALUES (?)`;
  const params = [body.dep_name,];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});