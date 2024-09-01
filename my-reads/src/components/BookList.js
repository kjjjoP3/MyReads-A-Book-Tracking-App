import React from 'react';
import Book from './Book';

const BookList = ({ books, onChangeShelves }) => {
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <Book key={book.id} book={book} onChangeShelves={onChangeShelves} />
      ))}
    </ol>
  );
};

export default BookList;