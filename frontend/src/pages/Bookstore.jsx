import { useEffect, useState } from "react";
import API from "../api";

export default function Bookstore() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/api/books").then((res) => setBooks(res.data));
  }, []);

  const purchaseBook = async (title) => {
    await API.post("/api/purchase", { title });
    const updated = await API.get("/api/books");
    setBooks(updated.data);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📚 Online Bookstore</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-xl p-5 shadow bg-white hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
            <p className="text-gray-700">Author: {book.author}</p>
            <p className="text-gray-700">Genre: {book.genre}</p>
            <p className="mt-2 font-semibold">₹{book.price}</p>

            <p className="mt-2">
              Status:{" "}
              <span
                className={
                  book.availability === "In Stock"
                    ? "text-green-600 font-bold"
                    : "text-red-500 font-bold"
                }
              >
                {book.availability}
              </span>
            </p>

            {book.availability === "In Stock" && (
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-800 text-white w-full py-2 rounded-lg"
                onClick={() => purchaseBook(book.title)}
              >
                Buy Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
