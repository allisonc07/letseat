// const mongoose = require('mongoose');
const faker = require('faker');
const db = require('./database/index.js');

const allRestaurants = ['Subway', 'Taqueria Castillo', 'Halal Guys', 'Khin Khao', 'Little Sheep', 'Flying Falafel', 'Chipotle', 'Panda Express'];

const createRestaurants = () => {
  for (let i = 0; i < 8; i += 1) {
    const restaurant = {};
    restaurant.name = allRestaurants[i];
    restaurant.visitDates = [];
    for (let j = 0; j < Math.floor(5 * Math.random()); j += 1) {
      restaurant.visitDates.push(faker.date.between('2018-06-11', '2018-08-27'));
    }
    restaurant.isFavorite = faker.random.boolean();
    const restaurantDoc = new db.Restaurant(restaurant);
    restaurantDoc.save((err) => {
      if (err) {
        throw err;
      }
    });
  }
};

createRestaurants();
