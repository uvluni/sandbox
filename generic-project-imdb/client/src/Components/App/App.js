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
    this.state = { selected: null, data: [{ title: '', imageUrl: '', id: '' }] };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentWillMount() {
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
        <Header />
        <Aside data={data} onClick={this.handleClick} />
        <CardList data={data} />
        <Footer />
      </div>
    );
  }
}

export default App;

// handleSubmitReview(review) {
//   let { reviews } = this.state;
//   let newReview = JSON.parse(review);
//   let user_avatar = `https://robohash.org/${faker.lorem.word()}.png?size=100x100&set=set1`;
//   newReview.user_avatar = user_avatar;
//   reviews.push(newReview);
//   this.setState({ reviews });
// }
