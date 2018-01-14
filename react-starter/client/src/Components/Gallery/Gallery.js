import React, { Component } from 'react';
import style from './Gallery.css';
import Card from './Card/Card'

class Gallery extends Component {
  constructor(props){
    super(props);
    this.data = props.data;
    console.log(this.data);
  }
  render() {
    return (
      <div className={`${style.item} ${style.gallery_container}`}>
        <Card/>
      </div>
    );
  }
}

export default Gallery;
