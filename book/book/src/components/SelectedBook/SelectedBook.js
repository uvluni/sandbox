import React, { Component, PropTypes } from 'react';

import './SelectedBook.css';

class SelectedBook extends Component {
  constructor() {
    super();
  }

  render() {
    let { title } = this.props;
    return (
      <p>
        {title}
        <button className="dlete-btn" onClick={() => this.props.onDelete(this.props.title)}>
          X
        </button>
      </p>
    );
  }
}

export default SelectedBook;
