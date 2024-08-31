import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import * as BookAPI from "../API/BooksAPI";
import {
  SHELVES,
  SEARCH_PLACEHOLDER,
  NO_BOOKS_FOUND,
  NOT_FOUND_TEXT,
  INPUT_TEXT_EMPTY,
} from "../constants/constants";

const BookSearch = ({ onChangeShelf, books }) => {
  const [query, setQuery] = useState("");
  const [bookList, setBookList] = useState([]);
  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedQuery) {
        const results = await BookAPI.search(debouncedQuery, 20);
        if (results && !results.error) {
          const updatedBooks = results.map((book) => {
            const matchingBook = books.find((b) => b.id === book.id);
            book.shelf = matchingBook ? matchingBook.shelf : "none";
            return book;
          });
          setBookList(updatedBooks);
        } else {
          setBookList([]);
        }
      } else {
        setBookList([]);
      }
    };
    fetchSearchResults();
    return () => setBookList([]);
  }, [debouncedQuery, books]);

  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder={SEARCH_PLACEHOLDER}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {bookList.length > 0 ? (
            <ol className="books-grid">
              {bookList.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: book.imageLinks
                            ? `url(${book.imageLinks.thumbnail})`
                            : "none",
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select
                          value={book.shelf || "none"}
                          onChange={(e) => onChangeShelf(book, e.target.value)}
                        >
                          <option disabled>Move to...</option>
                          {SHELVES.map((shelf) => (
                            <option value={shelf.title} key={shelf.title}>
                              {shelf.name}
                            </option>
                          ))}
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                      {book.authors?.join(", ") || NOT_FOUND_TEXT}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="notFound">
              {query === "" ? INPUT_TEXT_EMPTY : NO_BOOKS_FOUND}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
