import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6 shadow-lg">
      <Link className="hover:text-blue-400 font-semibold" to="/">
        📚 Bookstore
      </Link>
      <Link className="hover:text-blue-400 font-semibold" to="/inventory">
        📦 Inventory
      </Link>
      <Link className="hover:text-blue-400 font-semibold" to="/add-book">
         ➕ Add Book
      </Link>

    </nav>
  );
}
