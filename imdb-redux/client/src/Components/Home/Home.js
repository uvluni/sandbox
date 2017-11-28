import React, { Component } from 'react';
import Api from '../Api/Api';
import style from './Home.css';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
import CardList from '../CardList/CardList';

class Home extends Component {
  constructor() {
    super();
    this.api = new Api();
    this.state = { selected: null, data: [{ title: '', imageUrl: '', id: '' }] };
    this.handleClick = this.handleClick.bind(this);
    console.log('Home loaded');
  }

  async componentWillMount() {
    console.log('componentWillMount', this.state);
    let data = await this.api.getData();
    this.setState({ data });
  }

  handleClick(selected) {
    let data = this.state.data.map(item => {
      if (item.id === selected) {
        return {
          ...item,
          selected: 'selected'
        };
      } else {
        return {
          ...item,
          selected: ''
        };
      }
    });
    this.setState({ data });
  }

  render() {
    let { data } = this.state;

    return (
      <div className={style.container}>
        <Aside data={data} onClick={this.handleClick} />
        <CardList data={data} />
        <Footer />
      </div>
    );
  }
}

export default Home;
