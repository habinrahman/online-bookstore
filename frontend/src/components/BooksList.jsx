// src/components/BooksList.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', price: '' });
  const [error, setError] = useState(null);

  // Fetch books
  const fetchBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('id', { ascending: true });
    if (error) setError(error.message);
    else setBooks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Purchase: simple update to availability
  const purchaseBook = async (id) => {
    const { data, error } = await supabase
      .from('books')
      .update({ availability: 'Out of Stock' })
      .eq('id', id)
      .select();
    if (error) alert('Purchase error: ' + error.message);
    else {
      // update local state
      setBooks((b) => b.map(x => x.id === id ? data[0] : x));
    }
  };

  // Add book
  const addBook = async (e) => {
    e.preventDefault();
    const priceNum = parseFloat(newBook.price);
    if (!newBook.title || !newBook.author || !newBook.genre || Number.isNaN(priceNum)) {
      alert('Please fill all fields and a valid price');
      return;
    }
    const { data, error } = await supabase
      .from('books')
      .insert([{
        title: newBook.title,
        author: newBook.author,
        genre: newBook.genre,
        price: priceNum,
        availability: 'In Stock'
      }])
      .select();
    if (error) alert('Insert error: ' + error.message);
    else {
      setBooks((b) => [...b, data[0]]);
      setShowAdd(false);
      setNewBook({ title: '', author: '', genre: '', price: '' });
    }
  };

  // Chart data computed from books
  const pieData = useMemo(() => {
    const inStock = books.filter(b => b.availability === 'In Stock').length;
    const outStock = books.length - inStock;
    return {
      labels: ['In Stock', 'Out of Stock'],
      datasets: [{ data: [inStock, outStock], label: 'Availability' }]
    };
  }, [books]);

  const barData = useMemo(() => {
    const groups = {};
    books.forEach(b => groups[b.genre] = (groups[b.genre] || 0) + 1);
    return {
      labels: Object.keys(groups),
      datasets: [{ label: 'Books by Genre', data: Object.values(groups) }]
    };
  }, [books]);

  if (loading) return <div>Loading books…</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Bookstore Inventory</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <button onClick={() => setShowAdd(s => !s)}>{showAdd ? 'Close' : 'Add Book'}</button>

          {showAdd && (
            <form onSubmit={addBook} style={{ marginTop: 12 }}>
              <input placeholder="Title" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} />
              <input placeholder="Author" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} />
              <input placeholder="Genre" value={newBook.genre} onChange={e => setNewBook({ ...newBook, genre: e.target.value })} />
              <input placeholder="Price" value={newBook.price} onChange={e => setNewBook({ ...newBook, price: e.target.value })} />
              <button type="submit">Add</button>
            </form>
          )}

          <table border="1" cellPadding="8" style={{ marginTop: 12, width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr><th>ID</th><th>Title</th><th>Author</th><th>Genre</th><th>Price</th><th>Availability</th><th>Action</th></tr>
            </thead>
            <tbody>
              {books.map(b => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.genre}</td>
                  <td>{b.price}</td>
                  <td>{b.availability}</td>
                  <td>
                    {b.availability !== 'Out of Stock' ? (
                      <button onClick={() => purchaseBook(b.id)}>Purchase</button>
                    ) : (
                      <span style={{ color: '#888' }}>Sold</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ width: 420 }}>
          <div style={{ marginBottom: 24 }}>
            <h4>Availability</h4>
            <Pie data={pieData} />
          </div>

          <div>
            <h4>Books by Genre</h4>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
}
