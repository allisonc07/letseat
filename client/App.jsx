import React from 'react';

const axios = require('axios');
const moment = require('moment');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
    };
  }

  componentDidMount() {
    axios.get('/restaurants')
      .then((response) => {
        this.setState({
          restaurants: response.data,
        });
      });
  }

  chooseRestaurant() {
    const { restaurants, favoriteOn } = this.state;
    const possibleRestaurants = restaurants.reduce((acc, restaurant) => {
      dateCounter = 0;
      restaurant.visitDates.forEach((date) => {
        if (moment(date).isAfter(moment().subtract(2, 'weeks'))) {
          dateCounter++;
        }
      });
      if (dateCounter < 3) {
        acc.push(c);
        if (favoriteOn && restaurant.isFavorite) {
          acc.push(c);
        }
      }
      return acc;
    }, []);
    return possibleRestaurants[Math.floor(possibleRestaurants.length * Math.random())];
  }

  addVisit(restaurant, dateToAdd) {
    const { restaurants } = this.state;
    for (let i = 0; i < restaurants.length; i += 1) {
      if (restaurants[i].name === restaurant) {
        axios.post('/restaurants', {
          name: restaurant,
          date: dateToAdd,
        })
          .then((response) => {
            console.log(response);
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
      details: newRestaurant
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
    const { restaurants } = this.state;
    return (
      <div>
        <h1>
          Hungry but suffering from analysis paralysis? Let&apos;s get started!
        </h1>
        <ul>
          {
            restaurants.map(restaurant => <li>{restaurant.name}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default App;
