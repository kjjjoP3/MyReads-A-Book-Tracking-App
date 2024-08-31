import React from "react";
import BookList from "./BookList";
import { Link } from "react-router-dom";
import { SHELVES } from "../constants/constants";

const Bookshelf = ({ books, onChangeShelf }) => {
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {SHELVES.map((shelf) => {
            const booksInShelf = books.filter(
              (book) => book.shelf === shelf.title
            );

            return (
              <div className="bookshelf" key={shelf.title}>
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <div className="bookshelf-books">
                  {booksInShelf.length > 0 ? (
                    <BookList
                      books={booksInShelf}
                      onChangeShelves={onChangeShelf}
                    />
                  ) : (
                    <p>No books</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
