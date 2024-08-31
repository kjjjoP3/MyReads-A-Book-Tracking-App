import React from 'react';
import { SHELVES } from '../constants/constants';

const BookList = ({ books, onChangeShelves }) => {
  return (
    <ol className="books-grid">
      {books.map((book) => (
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
                    : 'none',
                }}
              ></div>
              <div className="book-shelf-changer">
                <select
                  value={book.shelf || 'none'}
                  onChange={(event) => onChangeShelves(book, event.target.value)}
                >
                  <option disabled>Move to...</option>
                  {SHELVES.map(({ title, name }) => (
                    <option value={title} key={title}>
                      {name}
                    </option>
                  ))}
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <h3 className="book-title">{book.title}</h3>
            <p className="book-authors">
              {book.authors?.length ? book.authors.join(', ') : 'Unknown Author'}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default BookList;
