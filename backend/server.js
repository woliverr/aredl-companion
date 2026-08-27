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

app.get('/api/message', (req, res) => {
    res.json({ text: "Hello from the backend!" });
});


app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});

async function testDatabase() {
    try {
        const result = await pool.query('SELECT * FROM levels');
        console.log(result.rows);
    } catch (err) {
        console.error(err);
    }
}

testDatabase();
