import React, { useState } from "react";
import { getBooksByType } from "./book-search.service";
import "./BookSearch.css";
import BookDetails from "../book-details/BookDetails";
const debounce = require("lodash.debounce");

const BookSearch = () => {
  const [bookType, updateBookType] = useState("");
  const [allAvailableBooks, setAllAvailableBooks] = useState([]);
  const [wishlistBooks, setWishlistBooks] = useState<Array<any>>([]);

  async function requestBooks(type: any) {
    if (type) {
      const allBooks = await getBooksByType(type);
      setAllAvailableBooks(allBooks.items);
    }
  }

  const addBookToWishlist = (book: any) => {
    setWishlistBooks(wishlistBooks.concat(book));
  };

  const removeBookWishlist = (index: any) => {
    setWishlistBooks(
      wishlistBooks.filter((book: any, bookIndex: any) => {
        return bookIndex !== index;
      })
    );
  };

  const fetchBooksHandler = debounce((text: any) => {
    updateBookType(text);
    requestBooks(text);
  }, 500);

  return (
    <div className="book--container">
      <div className="search-params">
        <div className="search-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              requestBooks(bookType);
            }}
          >
            <input
              className="full-width"
              autoFocus
              name="gsearch"
              type="search"
              placeholder="Search for books to add to your reading list and press Enter"
              onChange={(e) => fetchBooksHandler(e.target.value)}
            />
          </form>
        </div>
        {!bookType ? (
          <div className="empty-search">
            <p>
              Try searching for a topic, for example
              <a
                onClick={() => {
                  updateBookType("Javascript");
                }}
              >
                {" "}
                "Javascript"
              </a>
            </p>
          </div>
        ) : (
          <div className="search-result">
            {allAvailableBooks &&
              allAvailableBooks.map((book: any, index: any) => (
                <BookDetails
                  book={book.volumeInfo}
                  key={index}
                  addBookToWishlist={addBookToWishlist}
                  wishlistBooks={wishlistBooks}
                />
              ))}
          </div>
        )}
      </div>

      <div className="reading-wishlist">
        <div className="reading-wishlist-header">
          My Reading Wishlist
          {wishlistBooks.length > 0 && `(${wishlistBooks.length})`}
        </div>
        <div className="reading-wishlist-content">
          {wishlistBooks &&
            wishlistBooks.map((book, index: any) => (
              <div className="reading-wishlist-book">
                <div key={index} className="reading-wishlist-bookname">{`${
                  index + 1
                }. ${book.title}`}</div>
                <button
                  className="reading-wishlist-cnclBtn"
                  onClick={() => removeBookWishlist(index)}
                >
                  X
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
