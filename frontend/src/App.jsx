import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Bookstore from "./pages/Bookstore";
import Inventory from "./pages/Inventory";
import AddBook from "./pages/AddBook";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Bookstore />} />
        <Route path="/home" element={<HomePage books={[]} />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  );
}
