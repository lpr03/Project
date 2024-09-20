const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin', 
    password: 'admin', 
    database: 'formDB' 
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.post('/submit', (req, res) => {
    console.log(req.body); 
    const { formType, name, countryCode, phoneNumber } = req.body;

    if (!formType || !name || !countryCode || !phoneNumber) {
        return res.status(400).send("All fields are required");
    }

    const query = 'INSERT INTO formEntries (formType, name, countryCode, phoneNumber) VALUES (?, ?, ?, ?)';
    db.query(query, [formType, name, countryCode, phoneNumber], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).send("Error inserting data");
        }
        res.send('Data inserted successfully');
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
