export default class API {

  async getProfiles() {
    try {
      let response = await fetch('http://duda-api-test.herokuapp.com/profiles');
      let profiles = await response.json();
      return profiles;
    } catch (error) {
      console.log(error);
    }
  }

  async getProfileById(id) {
    try {
      let response = await fetch(`http://duda-api-test.herokuapp.com/profile/${id}`);
      let profile = await response.json();
      return profile;
    } catch (error) {
      console.log(error);
    }
  }

  async getImageById(id) {
    try {
      let response = await fetch(`http://graph.facebook.com/${id}/picture/`);
      return response.url;
    } catch (error) {
      console.log(error);
    }
  }
}
