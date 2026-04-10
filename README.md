# 📘 Online Bookstore & Inventory Management System

A full-stack web application that allows users to browse and purchase books while enabling administrators to manage inventory and visualize data through interactive dashboards.

## 🚀 Live Features

### 🛒 Online Bookstore
- Browse and purchase books
- Dynamic availability updates
- Responsive and modern UI

### 📦 Inventory Management (Admin)
- Add, update, and manage books
- Filter by availability
- Track stock levels in real-time

### 📊 Data Visualization
- Bar Chart: Books by Genre
- Pie Chart: Stock Availability Distribution

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- Chart.js / Recharts
- CSS

### Backend
- Node.js
- Express.js
- Prisma ORM

### Database
- PostgreSQL / MySQL

### Tools
- Prisma Client
- Nodemon
- Postman
- Git & GitHub

---

## 📂 Project Structure
online-bookstore/
├── backend/
├── frontend/
├── docs/
├── bookstore.pptx
├── README.md
└── LICENSE


---

## 🗄️ Database Schema

```prisma
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
📚 Get All Books

GET /api/books

🛒 Purchase a Book

POST /api/purchase

{
  "title": "Clean Code"
}
➕ Add a New Book

POST /api/add-book

{
  "title": "New Book",
  "author": "Author",
  "genre": "Genre",
  "price": 350,
  "availability": "In Stock"
}
✏️ Update Book Information

PUT /api/update-book/:id

{
  "title": "Updated Title",
  "price": 499
}
⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/habinrahman/online-bookstore.git
cd online-bookstore
2️⃣ Backend Setup
cd backend
npm install

Create a .env file:

DATABASE_URL="your_database_connection_url"

Run Prisma migrations:

npx prisma migrate dev

Start the backend:

npm run dev

Backend runs at: http://localhost:5000

3️⃣ Frontend Setup
cd ../frontend
npm install
npm start

Frontend runs at: http://localhost:3000

🧪 Running Tests
Backend
npm test
Frontend
npm test
🎥 Demo

A complete walkthrough is included in:

📁 bookstore.pptx

✨ Key Highlights
Full-stack MERN-style architecture
RESTful API with Prisma ORM
Interactive charts and dashboards
Responsive and modern UI
Clean and modular code structure
Real-world database integration
Production-ready documentation
📈 Future Enhancements
User authentication and authorization (JWT)
Payment gateway integration (Stripe/Razorpay)
Docker containerization
Cloud deployment (AWS/Vercel/Render)
Order history and user profiles
Search and recommendation system
👨‍💻 Author

Habin Rahman
🎓 Master of Computer Applications (MCA)
💼 Software Engineer | Full-Stack Developer

🌐 GitHub: https://github.com/habinrahman
📧 Email: habin936@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/habinrahman
📄 License

This project is licensed under the MIT License
