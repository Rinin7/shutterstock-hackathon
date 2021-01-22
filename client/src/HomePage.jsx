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
    showCity:false,
    searchArray:["puppies", "kitten", "turtles", "golf"],
    imageThumbs:[]
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

  showCity = () =>{
    this.setState({showCity:true});
  }

  changeCity = (event) => {
    // console.log(event.target);

    if(event.key ==="Enter" && event.target.value !== ""){
      this.setState({showCity:false});
      axios.get("http://localhost:8080/trending")
      .then(res=>{
        console.log(res);
        this.setState({searchArray:res.data});
      })
    }
  }



    // axios
    //   .get(`https://api.shutterstock.com/v2/images/search`, {
    //     params: {
    //       query: event.target.innerText,
    //     },
    //     headers: {
    //       Authorization: `Bearer ${SHUTTERSTOCK_API_TOKEN}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(this.state.searchInput);
    //     this.setState({
    //       imageArray: res.data.data,
    //       searchInput: "",
    //     });
    //   });
  // };


  render() {
    // console.log(this.state.imageArray);

    return (
      <div className="home">
        <div className="shutterstock__header">
          <img src="/shutterstock_nav.png"/>
          <img src="/shutterstock_search.png"/>
        </div>
        <div className="trending__title">
          <h1>Trending in <span>Vancouver</span></h1>
          {this.state.showCity && <input className="trending__title-city" onKeyDown={this.changeCity}type="text" placeholder="City"></input>}
          <img onClick={this.showCity} className="trending__title-edit" src="edit-24px.svg" alt=""/>
        </div>
        <p>Top 6 topics current #trending </p>
        <form className="home__form" onSubmit={(event) => this.searchImages(event)}>
          <input type="text" className="home__form-searchbar" id="search" name="search" onChange={this.changeHandler} value={this.state.searchInput} placeholder="Search for images" />
          <button type="submit" className="home__form-submit">
            Search
          </button>
        </form>
        <div className="home__images">
          {this.state.imageArray.map((image) => (
            <div className="home__image-card" key={image.id}>
              <img src={image.assets.preview.url} className="home__image-preview" />
              <p className="home__image-description">{image.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default HomePage;
