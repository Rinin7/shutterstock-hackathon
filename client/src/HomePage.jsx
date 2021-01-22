import React from "react";
import axios from "axios";
import "./HomePage.scss";

import "./HomePage.scss";

// apiUsername = "g7pamN78drpuk78IhPLBfLJrUyCZhvoT";
// apiPassword = "t8uM9TYDNyfQQGSW";
// const apiKey = "?api_key=g7pamN78drpuk78IhPLBfLJrUyCZhvoT";
// const apiUrl = "https://api.shutterstock.com/v2/images/search";
const SHUTTERSTOCK_API_TOKEN =
  "v2/ZzdwYW1ONzhkcnB1azc4SWhQTEJmTEpyVXlDWmh2b1QvMjkyMTAyOTMxL2N1c3RvbWVyLzMvVm1SQWlVQTE2VWVYUmVuX01mUDhrYTdhT19UdVJ0ejJLbTMzekJkMmZwN1JUZmNEdUktSzI1dVJBMWZsUXRtS1BpRDZMSGNJdXJDb2hQOEhpRVhPZWVoSF9BX3AwWllIQnlYbndCcmJib1lXbm5vbFZQZ3BrYlIxM3JOTUs1cDFYVWhDem9WN2tiWi12a3R3RjQwUm41TExiRWNjOEVVMkRkYlJCRy1uSTVHN3JmUnJCT25YV19TX1RZeGQ3ZHFOVkRaUEkzYVZNejFCLS1LNEtMODZkQQ";

class HomePage extends React.Component {
  state = {
    imageArray: ["/edit-24px.svg", "kitten", "turtles", "golf"],
    searchInput: "Vancouver",
    showCity: false,
    searchArray: ["react", "kitten", "turtles", "golf"],
    imageThumbs: ["/logo192.png", "kitten", "turtles", "golf"],
    trending: true,
    sideTrending: ["vancouver1", "vancouver2"],
    trendingImages: "#Vancouver Cool Stuff",
  };

  componentDidMount() {
    // axios
    //   .get("https://api.shutterstock.com/v2/images/search", {
    //     params: {
    //       query: "kittens",
    //       fields: "data(id,assets/preview/url)",
    //     },
    //     headers: {
    //       Authorization: `Bearer ${SHUTTERSTOCK_API_TOKEN}`,
    //       // "User-Agent": "request",
    //     },
    //   })
    //   .then((res) => {
    //     // console.log(res);
    //     // console.log(JSON.stringify(data.data, null, 2));
    //     this.setState({
    //       imageArray: res.data.data,
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  componentDidUpdate;

  searchImages(event) {
    // event.preventDefault();
    // this.setState({
    //   searchInput: event.target.search.value,
    // });
    // axios
    //   .get(`https://api.shutterstock.com/v2/images/search`, {
    //     params: {
    //       query: event.target.search.value,
    //     },
    //     headers: {
    //       Authorization: `Bearer ${SHUTTERSTOCK_API_TOKEN}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     this.setState({
    //       imageArray: res.data.data,
    //       searchInput: "",
    //     });
    //   });
  }

  clickHandler = (event) => {
    event.preventDefault();
    this.setState({
      imageArray: ["/check_image.jpg", "kitten", "turtles", "golf"],
      trending: false,
    });
  };

  changeHandler = (event) => {
    this.setState({ searchInput: event.target.value, trending: false });
  };

  showCity = () => {
    this.setState({ showCity: true });
  };

  changeCity = (event) => {
    // console.log(event.target);

    if (event.key === "Enter" && event.target.value !== "") {
      this.setState({ showCity: false, searchInput: "Ottawa" });

      axios.get("http://localhost:8080/trending").then((res) => {
        console.log(res);
        this.setState({ searchArray: res.data, imageThumbs: ["/edit-24px.svg", "kitten", "turtles", "golf"], trending: true, sideTrending: ["Ottawa1", "Ottawa2"] });
      });
    }
  };

  changeGlobal = () => {
    this.setState({ imageThumbs: ["/dancer.gif", "kitten", "turtles", "golf"], trending: true, trendingImages: "#Global Cool Stuff" });
  };

  changeGlobal = () => {
    this.setState({ imageThumbs: ["/edit-24px.svg", "kitten", "turtles", "golf"], trending: true });
  };

  render() {
    console.log(this.state.searchArray);
    console.log(this.state.imageArray);

    return (
      <div className="home">
        <div className="shutterstock__header">
          <img className="shutterstock__header-nav" src="/shutterstock_nav.png" />
        </div>
        <div className="trending__title">
          {this.state.trending && (
            <h1>
              Trending in <span>{this.state.searchInput}</span>
            </h1>
          )}
          {!this.state.trending && (
            <h1>
              Images For <span>{this.state.trendingImages}</span>
            </h1>
          )}

          {this.state.showCity && <input className="trending__title-city" onKeyDown={this.changeCity} type="text" placeholder="City"></input>}
          <img onClick={this.showCity} className="trending__title-edit" src="edit-24px.svg" alt="" />
        </div>
        <p className="trending__body">Top 6 topics currently #trending </p>
        <div className="home__trending-container">
          <div className="home__trending-gallery">
            <div className="home__images">
              {this.state.trending &&
                this.state.imageThumbs.map((image, index) => (
                  <div className="home__images-card" key={image.id}>
                    <img id={this.state.searchArray[index]} onClick={this.clickHandler} src={image} className="home__images-preview" />
                  </div>
                ))}
              {!this.state.trending &&
                this.state.imageArray.map((image) => (
                  <div className="home__images-card" key={image.id}>
                    <img src={image} className="home__images-preview" />
                  </div>
                ))}
            </div>
          </div>
          <div className="home__trending-other">
            <h2 className="home__trending-other-subheader">Other Trending...</h2>
            <img src="/logo192.png" onClick={this.changeGlobal} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
