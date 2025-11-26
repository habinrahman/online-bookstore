require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// GET ALL BOOKS
app.get("/api/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// PURCHASE BOOK
app.post("/api/purchase", async (req, res) => {
  const { title } = req.body;

  try {
    const q = `UPDATE books 
               SET availability = 'Out of Stock' 
               WHERE title = $1
               RETURNING *;`;

    const result = await pool.query(q, [title]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Purchased!", book: result.rows[0] });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Purchase failed" });
  }
});

// ADD BOOK
app.post("/api/add-book", async (req, res) => {
  const { title, author, genre, price } = req.body;

  try {
    const q = `INSERT INTO books (title, author, genre, price, availability)
               VALUES ($1, $2, $3, $4, 'In Stock')
               RETURNING *;`;

    const result = await pool.query(q, [title, author, genre, price]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Insert failed" });
  }
});

// UPDATE BOOK
app.put("/api/update-book/:id", async (req, res) => {
  const id = req.params.id;
  const { title, author, genre, price, availability } = req.body;

  try {
    const q = `UPDATE books
               SET title = COALESCE($1, title),
                   author = COALESCE($2, author),
                   genre = COALESCE($3, genre),
                   price = COALESCE($4, price),
                   availability = COALESCE($5, availability)
               WHERE id = $6
               RETURNING *;`;

    const result = await pool.query(q, [
      title,
      author,
      genre,
      price,
      availability,
      id,
    ]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
