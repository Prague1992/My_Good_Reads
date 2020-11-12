import React from "react";
import "./BookDetails.css";

function BookDetails(props) {
  const {
    title,
    description,
    authors,
    publisher,
    publishedDate,
    imageLinks,
  } = props.book;

  return (
    <div className="book-details-main">
      {/* the first row */}
      <div className="book-details-firstrow">
        <div className="book-details-img">
          <img src={imageLinks.thumbnail} alt={title} />
        </div>
        <div className="book-details-info">
          {/* Book Title */}
          <div className="book-details-title">{title}</div>
          {/* Book Authors */}
          <div className="book-details-details">
            {authors &&
              authors.map((author, index) => {
                if (index === authors.length - 1) {
                  return <div key={index}>{` ${author} `}</div>;
                }
                return <div key={index}>{` ${author}, `}</div>;
              })}
          </div>
          {/* Book publisher */}
          <div className="book-details-details">{publisher}</div>
          {/* Book published date */}
          <div className="book-details-details">{publishedDate}</div>
        </div>
        {/* Add to wishlist button */}
        <div className="book-details-btn">
          <button
            onClick={() => props.addBookToWishlist(props.book)}
            disabled={props.wishlistBooks.indexOf(props.book) !== -1}
          >
            {props.wishlistBooks.indexOf(props.book) !== -1
              ? "In the wishlist"
              : "Add to Wishlist"}
          </button>
        </div>
      </div>
      {/* the second row - description */}
      <div
        className="book-details-secondrow"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}

export default BookDetails;
