const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET all departments
const viewAllDepartments = () => {
  router.get('/department', (req, res) => {
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
};
viewAllDepartments();

// GET a single department
viewSingleDept = async () => {
  router.get('/department/:id', (req, res) => {
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
  startQs();
}


// DELETE a department
deleteDept = async () => {
  router.delete('/department/:id', (req, res) => {
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
  startQs();
}


// CREATE a department
createDept = async () => {
  router.post('/department', ({ body }, res) => {
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
  startQs();
}


module.exports = router;

module.exports = viewAllDepartments;