import { useEffect, useState } from "react";
import API from "../api";

export default function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/api/books").then((res) => setBooks(res.data));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">

      {/* NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">BookHive</h1>

          <input 
            className="px-4 py-2 border border-gray-300 rounded-full w-1/3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Search for books..."
          />

          <div className="flex gap-6 text-lg">
            <button className="hover:text-indigo-600 transition">Cart 🛒</button>
            <button className="hover:text-indigo-600 transition">Profile</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-32 shadow-lg">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Discover Your Next Favorite Book</h2>
          <p className="text-xl mb-8 opacity-90 max-w-xl">
            Explore bestsellers, classics, and trending reads curated specially for you.
          </p>
          <button className="bg-white text-indigo-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition transform">
            Shop Now
          </button>
        </div>
      </section>

      {/* FEATURED BOOKS HEADER */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="text-indigo-600">★</span> Featured Books
        </h3>

        {/* BOOK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div 
              key={book.id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition transform duration-300"
            >
              <img 
                src={book.image} 
                alt={book.title} 
                className="w-full h-64 object-cover rounded-xl mb-4 shadow-sm"
              />

              <h4 className="font-semibold text-lg leading-tight">{book.title}</h4>
              <p className="text-gray-600 text-sm mb-1">{book.author}</p>
              <p className="font-bold text-indigo-600 mb-3">₹{book.price}</p>

              <span className={`px-3 py-1 text-sm rounded-full ${
                book.availability === "In Stock" 
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {book.availability}
              </span>

              <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl shadow-md transition font-medium">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-8 mt-20 shadow-inner text-center">
        <p className="text-gray-600">© 2025 BookHive — All Rights Reserved</p>
      </footer>

    </div>
  );
}