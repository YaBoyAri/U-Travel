const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'u_travel',
});

app.post('/register', upload.fields([
  { name: 'ktp', maxCount: 1 },
  { name: 'kendaraan', maxCount: 1 }
]), (req, res) => {
  const {
    namaDriver, NIK, platNomor, email, password
  } = req.body;

  const ktp = req.files['ktp']?.[0]?.filename || null;
  const kendaraan = req.files['kendaraan']?.[0]?.filename || null;

  const sql = `INSERT INTO driver 
    (namaDriver, NIK, platNomor, email, password, ktp, kendaraan) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [namaDriver, NIK, platNomor, email, password, ktp, kendaraan], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Driver registered successfully', id: result.insertId });
  });
});

app.post('/user', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length > 0) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});