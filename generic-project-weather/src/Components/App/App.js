import React, { Component } from 'react';
import Api from '../Api/Api';
import style from './App.css';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

class App extends Component {
  constructor() {
    super();
    this.state = { weather: '' };
    this.api = new Api();
    this.showPosition = this.showPosition.bind(this);
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  async getWeather(lat, lon) {
    try {
      let response = await fetch(
        `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`
      );
      let data = await response.json();
      let location = data.name;
      let weather = data.weather[0];
      this.setState({ weather, location });
    } catch (error) {
      console.log(error);
    }
  }

  showPosition(position) {
    this.getWeather(position.coords.latitude, position.coords.longitude);
  }

  render() {
    let { weather, location } = this.state;

    return (
      <div className={style.container}>
        <Header />
        <Aside />
        <Main weather={weather} location={location} />
        <Footer />
      </div>
    );
  }
}

export default App;
