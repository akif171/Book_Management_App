import React, { useContext } from "react";
import _ from "lodash";
import Book from "./Book";
import BooksContext from "../context/BooksContext";

const BooksList = () => {
  const { books, setBooks } = useContext(BooksContext);

  console.log(books, setBooks);
  const handleRemoveBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <>
      <div className="book-list">
        {!_.isEmpty(books) ? (
          books.map((book) => (
            <Book key={book.id} {...book} handleRemoveBook={handleRemoveBook} />
          ))
        ) : (
          <p className="message">No Books available. Please add some books.</p>
        )}
      </div>
    </>
  );
};

export default BooksList;
