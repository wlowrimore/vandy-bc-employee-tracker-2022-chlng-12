const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// GET all roles
router.get('/role', (req, res) => {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// GET a single role
router.get('/role/:id', (req, res) => {
  const sql = `SELECT * FROM role WHERE id = ?`;
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

// DELETE a role
router.delete('/role/:id', (req, res) => {
  const sql = `DELETE FROM role WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      // checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: 'Role not found'
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

module.exports = router;