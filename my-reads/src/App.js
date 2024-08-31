import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Bookshelf from "./components/Home";
import BookSearch from "./components/BookSearch";
import * as BookAPI from './components/BooksAPI';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const allBooks = await BookAPI.getAll();
      setBooks(allBooks);
    };
    fetchBooks();
  }, []);

  const handleChangeShelf = (book, shelf) => {
    BookAPI.update(book, shelf).then(() => {
      setBooks((prevBooks) => {
        const updatedBooks = prevBooks.filter((b) => b.id !== book.id);
        book.shelf = shelf;
        return [...updatedBooks, book];
      });
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<Bookshelf books={books} onChangeShelf={handleChangeShelf} />}
        />
        <Route
          path="/search"
          element={<BookSearch books={books} onChangeShelf={handleChangeShelf} />}
        />
      </Routes>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default App;
