import React from 'react';
import './Book.css';

import Rating from '../Rating/Rating';

const Book = ({ title, description, rating, author, price }) => {
  return (
    <div className="book">
      <header>
        <h3>{title}</h3>
        <input type="checkbox" />
      </header>
      <hr />
      <h4>{author}</h4>
      <main>
        <p>{description}</p>
      </main>
      <footer>
        <span>
          Rating: <Rating value={rating} />
        </span>
        <p>Price: ${price}</p>
      </footer>
    </div>
  );
};

export default Book;
