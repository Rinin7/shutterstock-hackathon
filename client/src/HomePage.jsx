import React from "react";
import axios from "axios";
import "./HomePage.scss";

// apiUsername = "g7pamN78drpuk78IhPLBfLJrUyCZhvoT";
// apiPassword = "t8uM9TYDNyfQQGSW";
// const apiKey = "?api_key=g7pamN78drpuk78IhPLBfLJrUyCZhvoT";
// const apiUrl = "https://api.shutterstock.com/v2/images/search";
const SHUTTERSTOCK_API_TOKEN =
  "v2/ZzdwYW1ONzhkcnB1azc4SWhQTEJmTEpyVXlDWmh2b1QvMjkyMTAyOTMxL2N1c3RvbWVyLzMvVm1SQWlVQTE2VWVYUmVuX01mUDhrYTdhT19UdVJ0ejJLbTMzekJkMmZwN1JUZmNEdUktSzI1dVJBMWZsUXRtS1BpRDZMSGNJdXJDb2hQOEhpRVhPZWVoSF9BX3AwWllIQnlYbndCcmJib1lXbm5vbFZQZ3BrYlIxM3JOTUs1cDFYVWhDem9WN2tiWi12a3R3RjQwUm41TExiRWNjOEVVMkRkYlJCRy1uSTVHN3JmUnJCT25YV19TX1RZeGQ3ZHFOVkRaUEkzYVZNejFCLS1LNEtMODZkQQ";

class HomePage extends React.Component {
  state = {
    imageArray: [],
    searchInput: "",
  };

  componentDidMount() {
    axios
      .get("https://api.shutterstock.com/v2/images/search", {
        params: {
          query: "kittens",
          fields: "data(id,assets/preview/url)",
        },
        headers: {
          Authorization: `Bearer ${SHUTTERSTOCK_API_TOKEN}`,
          // "User-Agent": "request",
        },
      })
      .then((res) => {
        // console.log(res);
        // console.log(JSON.stringify(data.data, null, 2));
        this.setState({
          imageArray: res.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidUpdate;

  searchImages(event) {
    event.preventDefault();
    this.setState({
      searchInput: event.target.search.value,
    });
    axios
      .get(`https://api.shutterstock.com/v2/images/search`, {
        params: {
          query: event.target.search.value,
        },
        headers: {
          Authorization: `Bearer ${SHUTTERSTOCK_API_TOKEN}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          imageArray: res.data.data,
          searchInput: "",
        });
      });
  }

  clickHandler = (event) => {
    event.preventDefault();
    console.log(this.state.searchInput);
    // console.log(event);
    this.setState({
      searchInput: event.target.innerText,
    });
    axios
      .get(`https://api.shutterstock.com/v2/images/search`, {
        params: {
          query: event.target.innerText,
        },
        headers: {
          Authorization: `Bearer ${SHUTTERSTOCK_API_TOKEN}`,
        },
      })
      .then((res) => {
        console.log(this.state.searchInput);
        this.setState({
          imageArray: res.data.data,
          searchInput: "",
        });
      });
  };

  changeHandler = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  render() {
    console.log(this.state.imageArray);

    return (
      <div className="home">
        <h1>SHUTTERSTOCK HOME</h1>
        <form className="home__form" onSubmit={(event) => this.searchImages(event)}>
          <input type="text" className="home__form-searchbar" id="search" name="search" onChange={this.changeHandler} value={this.state.searchInput} placeholder="Search for images" />
          <button type="submit" className="home__form-submit">
            Search
          </button>
        </form>
        <div className="home__trending-container">
          <div className="home__trending-gallery">
            <div className="home__images">
              {this.state.imageArray.map((image) => (
                <div className="home__images-card" key={image.id}>
                  <img src={image.assets.preview.url} className="home__images-preview" />
                </div>
              ))}
            </div>
          </div>
          <div className="home__trending-other">
            <h2 className="home__trending-other-subheader">Other Trending...</h2>
            <ol className="home__trending-other-list">
              <li className="home__trending-other-item">#biden</li>
              <li className="home__trending-other-item">#biden</li>
              <li className="home__trending-other-item">#biden</li>
              <li className="home__trending-other-item">#biden</li>
              <li className="home__trending-other-item">#biden</li>
              <li className="home__trending-other-item">#biden</li>
              <li className="home__trending-other-item">#biden</li>
              <li className="home__trending-other-item">#biden</li>
              <li className="home__trending-other-item">#biden</li>
              <li className="home__trending-other-item">#biden</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
