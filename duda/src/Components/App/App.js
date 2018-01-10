import React, { Component } from 'react';
import API from '../API/API';
import TopMenu from '../TopMenu/TopMenu';
import Cards from '../Cards/Cards';

class App extends Component {
  constructor() {
    super();
    this.api = new API();
    this.state = {
      profiles: [],
      addedProfiles: [],
      selectedProfile: {
        full: '',
        bio: ''
      }
    }
    this.onProfileSelect = this.onProfileSelect.bind(this);
    this.onAddProfile = this.onAddProfile.bind(this);
  }

  async componentWillMount() {
    let profiles = await this.api.getProfiles();
    this.setState({ profiles });
  }

  async onProfileSelect(id) {
    let selectedProfile = await this.api.getProfileById(id);
    this.setState({ selectedProfile });
  }

  async onAddProfile(data) {
    let imageUrl = await this.api.getImageById(data.fbprof);
    let alreadyInserted = this.state.addedProfiles.find((element) => element.id == data.id);
    if (imageUrl !== "https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/_xS7LcbxKS4.gif" && !alreadyInserted) {
      let newProfile = {
        id: data.id,
        full: data.full,
        bio: data.bio,
        imageUrl: imageUrl
      }
      let addedProfiles = this.state.addedProfiles;
      addedProfiles.push(newProfile);
      this.setState({ addedProfiles });
    } else {
      alert("Please make sure you entered valid data without duplication")
    }
  }

  render() {
    return (
      <div>
        <TopMenu profiles={this.state.profiles} onProfileSelect={this.onProfileSelect}
          selectedProfile={this.state.selectedProfile}
          onAddProfile={this.onAddProfile} />
        <Cards cards={this.state.addedProfiles} />
      </div>
    );
  }
}

export default App;
