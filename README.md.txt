🚀 Online Bookstore & Inventory Management
    HABIN RAHMAN

A full-stack web application built using React + Tailwind (frontend) and Flask + SQLAlchemy (backend) with SQLite / PostgreSQL as the database.

This project was built as a part of the Taghash Full Stack Internship Take-Home Challenge.

📌 Features
🔹 Online Bookstore (Customer View)

Browse all available books

View title, author, genre, price, and availability

Purchase books → availability updates to Out of Stock

🔹 Inventory Management Dashboard (Admin View)

View full inventory in a table

Filter by:

All

In Stock

Out of Stock

Summary counters

Bar Chart – Books by genre

Pie Chart – Availability distribution

Auto-updates from database

🔹 Admin: Add New Book

Add new books from the frontend

Fields: Title, Author, Genre, Price

Automatically saved to database via /api/add-book

🏗 Tech Stack
Frontend

React + Vite

Tailwind CSS

Axios

React Router DOM

Chart.js + react-chartjs-2

Backend

Python Flask

Flask-CORS

SQLAlchemy ORM

SQLite (development) / PostgreSQL (deployment)

Python Dotenv