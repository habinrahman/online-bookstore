import { useEffect, useState } from "react";
import API from "../api";
import GenreBarChart from "../charts/GenreBarChart";
import AvailabilityPieChart from "../charts/AvailabilityPieChart";

export default function Inventory() {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    API.get("/api/books").then((res) => setBooks(res.data));
  }, []);

  const filteredBooks = filter === "All"
    ? books
    : books.filter((b) => b.availability === filter);

  const inStock = books.filter((b) => b.availability === "In Stock").length;
  const outStock = books.filter((b) => b.availability === "Out of Stock").length;

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-6 text-gray-900">📦 Inventory Management</h1>

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-100 px-6 py-4 rounded-xl shadow text-green-900 font-semibold">
          In Stock: {inStock}
        </div>

        <div className="bg-red-100 px-6 py-4 rounded-xl shadow text-red-900 font-semibold">
          Out of Stock: {outStock}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {["All", "In Stock", "Out of Stock"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-xl mb-10">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Genre</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id} className="border-b">
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.genre}</td>
                <td className="p-3">₹{book.price}</td>

                <td
                  className={`p-3 font-semibold ${
                    book.availability === "In Stock"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {book.availability}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <GenreBarChart books={books} />
        <AvailabilityPieChart books={books} />
      </div>
    </div>
  );
}
