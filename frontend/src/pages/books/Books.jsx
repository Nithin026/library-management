// Import
import { useEffect, useState } from "react";

// Import navigation
import { useNavigate, Link } from "react-router-dom";

// Import service
import { getBooks } from "../../services/bookService";

import "../../styles/books.css";

// Books page
function Books() {
  // Navigate
  const navigate = useNavigate();

  // Store books
  const [books, setBooks] = useState([]);

  // Search text
  const [search, setSearch] = useState("");

  // Load books
  useEffect(() => {
    loadBooks();
  }, []);

  // Get books
  const loadBooks = async () => {
    try {
      const data = await getBooks();

      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Search books
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="books-page">
      <div className="books-header">
        <h1>Library Books</h1>

        <input
          type="text"
          placeholder="🔍 Search by title, author or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="books-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>

                <td>
                  <Link to={`/books/${book.id}`} className="book-title-link">
                    {book.title}
                  </Link>
                </td>

                <td>{book.author}</td>

                <td>{book.category}</td>

                <td>
                  <span
                    className={
                      book.available_copies === 0
                        ? "status unavailable"
                        : "status available"
                    }
                  >
                    {book.available_copies}
                  </span>
                </td>

                <td>
                  <button
                    className="borrow-btn"
                    onClick={() => navigate(`/borrow/${book.id}`)}
                    disabled={book.available_copies === 0}
                  >
                    {book.available_copies === 0 ? "Unavailable" : "Borrow"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Export
export default Books;
