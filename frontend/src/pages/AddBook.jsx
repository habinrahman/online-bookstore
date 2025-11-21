import { useState } from "react";
import API from "../api";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    price: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.author || !form.genre || !form.price) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/api/add-book", {
        title: form.title,
        author: form.author,
        genre: form.genre,
        price: parseFloat(form.price)
      });

      setMessage("Book added successfully!");
      setForm({
        title: "",
        author: "",
        genre: "",
        price: ""
      });
    } catch (error) {
      setMessage("Error adding book");
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">➕ Add New Book</h1>

      {message && (
        <div className="mb-4 text-blue-600 font-semibold">{message}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border rounded p-2"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            className="w-full border rounded p-2"
            value={form.author}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Genre</label>
          <input
            type="text"
            name="genre"
            className="w-full border rounded p-2"
            value={form.genre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            className="w-full border rounded p-2"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-lg"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
