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

app.get('/api/levels', async (req, res) => {
    const { name } = req.query;

    console.log("name:", name);

    const result = await pool.query(
        'SELECT * FROM levels WHERE name ILIKE $1',
        [`%${name}%`]
    );

    console.log("results:", result.rows);

    res.json(result.rows);
});

app.post('/api/levels', async (req, res) => {

    for (const level of req.body) {
        const { id, name, difficulty, uploader } = level;

        const query = `
            INSERT INTO levels(id, name, difficulty, uploader)
            VALUES($1, $2, $3, $4)
            ON CONFLICT (id) DO NOTHING
        `;

        const values = [id, name, difficulty, uploader];

        await pool.query(query, values);
    }

    res.send("Success!");

});

app.get('/api/completions/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const query = `
        SELECT c.level_id, c.pos, c.attempts, l.name, l.difficulty, l.uploader
        FROM completions c
        JOIN levels l on l.id = c.level_id
        WHERE c.user_id = $1
        ORDER BY c.pos
    `;
    const result = await pool.query(query, [user_id]);
    res.json(result.rows);
});

app.post('/api/completions/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { level_id } = req.body;
    const query = `
        INSERT INTO completions (user_id, level_id, pos)
        VALUES ($1, $2, COALESCE((SELECT MAX(pos) FROM completions WHERE user_id = $1), 0) + 1)

    `;
    await pool.query(query, [user_id, level_id]);
    res.send("Success");
});

app.delete('/api/completions/:user_id/:level_id', async (req, res) => {
    const { user_id, level_id } = req.params;
    const query = `
        DELETE FROM completions WHERE user_id = $1 AND level_id = $2
    `;
    await pool.query(query, [user_id, level_id])
    res.send("Success");
});
