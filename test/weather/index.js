class Main {
  constructor() {}

  async getWeather(lat, lon) {
    try {
      let response = await fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`);
      this.weather = await response.json();
      console.log(this.weather);
    } catch (error) {
      console.log(error);
    }
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  showPosition(position) {
    main.getWeather(position.coords.latitude, position.coords.longitude);
  }
}

const main = new Main();
main.getLocation();
