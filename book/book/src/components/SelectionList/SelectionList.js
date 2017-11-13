import React, { Component } from 'react';
import './SelectionList.css';

import SelectedBook from '../SelectedBook/SelectedBook';

class SelectionList extends Component {
  constructor() {
    super();
    this.state = { books: [] };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    let { books, onDelete } = this.state;
    return (
      <div className="selection-list">
        {books.map(book => <SelectedBook key={book.title} title={book.title} onDelete={onDelete} />)}
      </div>
    );
  }
}
export default SelectionList;
