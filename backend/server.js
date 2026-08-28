const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"aredl-companion",
    password:process.env.PGPASSWORD,
    port:5432
});

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});

app.get('/api/search', async (req, res) => {
    const { name } = req.query;

    console.log("name:", name);

    const result = await pool.query(
        'SELECT * FROM levels WHERE name ILIKE $1',
        [`%${name}%`]
    );

    console.log("results:", result.rows);

    res.json(result.rows);
});