import React, { Component } from 'react';

import './App.css';

import Api from './Api';
// import BooksList from './components/BooksList/BooksList';
import Book from './components/Book/Book';

import SelectionList from './components/SelectionList/SelectionList';

class App extends Component {
  constructor() {
    super();
    this.api = new Api();
    this.state = {
      books: [],
      selectedBooks: [
        {
          title: 'temp1'
        },
        {
          title: 'temp2'
        }
      ]
    };
    this.handleChevronClick = this.handleChevronClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  async componentDidMount() {
    let books = await this.api.getBooks();
    this.setState({
      books,
      currentBook: 0
    });
  }

  handleChevronClick(direction) {
    let { currentBook, books } = this.state;
    let booksCount = books.length - 1;
    if (direction === 'right') {
      currentBook < booksCount ? (currentBook += 1) : (currentBook = 0);
    } else {
      currentBook === 0 ? (currentBook = booksCount) : (currentBook -= 1);
    }
    this.setState({ currentBook });
  }

  onDelete(book) {
    let { selectedBooks } = this.state;
    let newSelectedBooks = selectedBooks.filter(item => {
      return item.title !== book;
    });

    console.log(newSelectedBooks);
  }

  render() {
    let { books, currentBook, selectedBooks } = this.state;
    let book = books[currentBook];

    return (
      <div className="app">
        <div className="books-container">
          <i className="fa fa-chevron-left" aria-hidden="true" onClick={() => this.handleChevronClick('left')} />
          <Book className="books-list" {...book} />
          <i className="fa fa-chevron-right" aria-hidden="true" onClick={() => this.handleChevronClick('right')} />
        </div>
        <div className="selection-container">
          <SelectionList books={selectedBooks} onDelete={this.onDelete} />
        </div>
      </div>
    );
  }
}

export default App;
