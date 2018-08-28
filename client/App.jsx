import React from 'react';
import RestaurantAdder from './RestaurantAdder';
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';
import './styles.css';

const axios = require('axios');
const moment = require('moment');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      chosenRestaurant: null,
      lat: null,
      long: null,
      details: null,
      openDetails: false,
      minimized: true,
      favoriteOn: false,
    };
    this.toggleFavoritesMode = this.toggleFavoritesMode.bind(this);
    this.chooseRestaurant = this.chooseRestaurant.bind(this);
    this.addVisit = this.addVisit.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.clickRestaurant = this.clickRestaurant.bind(this);
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    } else {
      alert('Geolocation not available!');
    }
    axios.get('/restaurants')
      .then((response) => {
        this.setState({
          restaurants: response.data,
        });
      });
  }

  getRestaurantDetails(restaurant) {
    const { lat, long } = this.state;
    axios.get(`/restaurantDetails/${lat}/${long}/${restaurant}`)
      .then((response) => {
        this.setState({
          details: response,
          openDetails: true,
        });
      });
  }

  chooseRestaurant() {
    const { restaurants, favoriteOn } = this.state;
    const possibleRestaurants = restaurants.reduce((acc, restaurant) => {
      if (!favoriteOn) {
        let dateCounter = 0;
        restaurant.visitDates.forEach((date) => {
          if (moment(date).isAfter(moment().subtract(2, 'weeks'))) {
            dateCounter += 1;
          }
        });
        if (dateCounter < 3) {
          acc.push(restaurant);
          if (restaurant.isFavorite) {
            acc.push(restaurant);
          }
        }
        return acc;
      }
      if (restaurant.isFavorite) {
        acc.push(restaurant);
      }
      return acc;
    }, []);
    const chosenRestaurant = possibleRestaurants[Math.floor(possibleRestaurants.length * Math.random())];
    this.setState({
      chosenRestaurant,
    });
    this.getRestaurantDetails(chosenRestaurant.name);
    console.log(chosenRestaurant);
  }

  toggleFavoritesMode() {
    const { favoriteOn } = this.state;
    this.setState({
      favoriteOn: !favoriteOn,
    })
  }

  toggleMenu() {
    const { minimized } = this.state;
    this.setState({
      minimized: !minimized,
    });
  }

  toggleNewMode() {

  }

  // toggleFavoritesMode(e) {
  //   const { favoritesMode } = this.state;
  //   this.setState({
  //     favoritesMode: !favoritesMode,
  //   });
  // }

  clickRestaurant(restaurant) {
    this.getRestaurantDetails(restaurant);
  }

  addVisit(e, restaurant, dateToAdd) {
    e.preventDefault();
    const { restaurants } = this.state;
    for (let i = 0; i < restaurants.length; i += 1) {
      if (restaurants[i].name === restaurant) {
        axios.post('/restaurants', {
          name: restaurant,
          date: dateToAdd,
        })
          .then((response) => {
            console.log(response);
            alert('Visit List Updated!');
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }
    }
    const newRestaurant = {
      name: restaurant,
      visitDates: [dateToAdd],
      isFavorite: false,
    };
    axios.post('newRestaurant', {
      details: newRestaurant,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(error);
      });
    restaurants.push(newRestaurant);
    this.setState({
      restaurants,
    });
  }

  render() {
    const { restaurants, chosenRestaurant, lat, long, details, openDetails, minimized } = this.state;
    return (
      <div>
        <h2>
          Hungry but suffering from analysis paralysis?
        </h2>
        <div className="buttons">
          <button type="button" onClick={this.toggleMenu}>Settings</button>
          <button type="button" onClick={this.chooseRestaurant}>Pick for me!</button>
        </div>
        <div className="panelContainer">
          <div className="leftPanel">
            {!minimized && (
              <div>
                <RestaurantAdder addVisit={this.addVisit} />
                <RestaurantList restaurants={restaurants} clickRestaurant={this.clickRestaurant} />
                <div>
                  <input type="checkbox" name="favorites" className="checkbox" onChange={this.toggleFavoritesMode} />
                  <label for="favorites">Favorites Only Mode</label>
                </div>
                <div>
                  <input type="checkbox" name="newRestaurants" className="checkbox" onChange={this.toggleNewMode} />
                  <label for="newRestaurants">Show Me Something New!</label>
                </div>
              </div>
            )}
          </div>
          <div className="rightPanel">
            <RestaurantDetails restaurant={chosenRestaurant} lat={lat} long={long} details={details} openDetails={openDetails} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
