const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../front-end')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'legends_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

// Route to get all states
app.get('/states', (req, res) => {
    const query = 'SELECT DISTINCT state FROM city';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Route to get cities by state
app.get('/cities/:state', (req, res) => {
    const state = req.params.state;
    const query = 'SELECT DISTINCT city FROM city WHERE state = ?';
    db.query(query, [state], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Route to get places by city
app.get('/places/:city', (req, res) => {
    const city = req.params.city;
    const query = 'SELECT place FROM city WHERE city = ?';
    db.query(query, [city], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Route to get legend by place
app.get('/legend/:place', (req, res) => {
    const place = req.params.place;
    const query = 'SELECT fact FROM legend WHERE place = ?';
    db.query(query, [place], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
