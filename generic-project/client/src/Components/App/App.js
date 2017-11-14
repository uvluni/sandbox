import React, { Component } from 'react';
import Api from '../Api/Api';
import style from './App.css';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
import CardList from '../CardList/CardList';

class App extends Component {
  constructor() {
    super();
    this.api = new Api();
    this.state = { selected: null, data: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentWillMount() {
    let data = await this.api.getData();
    this.setState({ data });
  }

  handleClick(selected) {
    console.log(selected);
  }

  render() {
    let { data } = this.state;

    return (
      <div className={style.container}>
        <Header />
        <Aside data={data} onClick={this.handleClick} />
        <CardList data={data} />
        <Footer />
      </div>
    );
  }
}

export default App;
