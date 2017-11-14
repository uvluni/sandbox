export default class Api {
  async getWeather(lat, lon) {
    try {
      let response = await fetch(
        `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`
      );
      this.weather = await response.json();
    } catch (error) {
      console.log(error);
    }
  }
}
