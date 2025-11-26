📘 Online Bookstore & Inventory Management — Full Stack Application

A full-stack web application that allows users to browse and purchase books, while providing administrators with inventory management and data visualization capabilities.

🚀 Tech Stack
Frontend

React.js

Axios

Chart.js / Recharts



Backend

Node.js + Express

Prisma ORM

PostgreSQL / MySQL



Tools

Prisma Client

Nodemon

Postman

GitHub (Private Repository)

📁 Project Structure
root/
 ├── backend/
 │    ├── src/
 │    │    ├── index.js
 │    │    ├── routes/
 │    │    ├── controllers/
 │    │    ├── prisma/
 │    ├── prisma/
 │    │    ├── schema.prisma
 │    │    └── migrations/
 │    ├── package.json
 │
 ├── frontend/
 │    ├── src/
 │    ├── public/
 │    ├── package.json
 │
 ├── README.md
 ├── project-demo.mp4 (screen recording)
 ├── .env.example

🗄️ Database Schema (Prisma)

Your Prisma schema defines a single model for books:

model Book {
  id           Int      @id @default(autoincrement())
  title        String
  author       String
  genre        String
  price        Float
  availability String
  createdAt    DateTime @default(now())
}

📌 API Documentation
1. Get All Books

GET /api/books
Returns a list of all books.

2. Purchase a Book

POST /api/purchase

Request Body:
{
  "title": "Clean Code"
}

Action:

Changes availability from "In Stock" → "Out of Stock"

3. Add a New Book

POST /api/add-book

Request Body:
{
  "title": "New Book",
  "author": "Author",
  "genre": "Genre",
  "price": 350,
  "availability": "In Stock"
}

4. Update Book Information

PUT /api/update-book/:id

Request Body:
{
  "title": "Updated Title",
  "price": 499
}

🎨 Frontend Features
Screen 1 — Online Bookstore

✔ View all books
✔ Purchase a book
✔ Availability updates dynamically
✔ Modern UI, responsive design

Screen 2 — Inventory Management (Admin)

✔ Manage all books
✔ Filter by availability
✔ Summary Cards:

In Stock Count

Out of Stock Count

Data Visualizations

✔ Bar Chart — Books count by genre
✔ Pie Chart — Availability distribution

🛠️ Setup Instructions
1. Clone the Repository
git clone <your-private-repo-url>
cd project-folder

⚙️ Backend Setup
cd backend
npm install

Create .env file
DATABASE_URL="your-postgres-or-mysql-connection-url"


Or use the .env.example provided.

Run Migrations
npx prisma migrate dev

Start Backend
npm run dev


Backend will run at:
👉 http://localhost:5000

🎨 Frontend Setup
cd frontend
npm install
npm start


Frontend will run at:
👉 http://localhost:3000

🧪 Running Tests

(If you added tests)

Backend Tests (Jest)
npm test

Frontend Tests (React Testing Library)
npm test

🎥 Demo Video

A complete screen recording demonstrating all functionalities is included in:

project-demo.mp4

🧱 Project Highlights

Fully responsive UI

Clean REST API design

Prisma ORM with migrations

Real RDBMS (PostgreSQL/MySQL)

Interactive charts

Proper folder structure

Error handling & validation

Professional documentation

👤 Author

Habin Rahman