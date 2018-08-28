const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const yelpClient = require('./yelp.js');

const app = express();

app.use(express.static(path.join(__dirname, '../public')))

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/restaurants', (req, res) => {
  db.getAllRestuarants((err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(results);
    }
  });
});

app.post('/restaurants', (req, res) => {
  db.updateRestaurant([req.body.name, req.body.date], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.post('/newRestaurant', (req, res) => {
  db.addRestaurant(req.body.details, (err) => {
    if (err) {
      throw err;
    } else {
      res.send('new restaurant added!');
    }
  });
});

app.get('/restaurantDetails/:lat/:long/:name', (req, res) => {
  const searchRequest = {
    latitude: req.params.lat,
    longitude: req.params.long,
    term: req.params.name,
  };
  yelpClient.search(searchRequest).then((response) => {
    const topResult = response.jsonBody.businesses[0];
    res.send(JSON.stringify(topResult));
  }).catch((err) => {
    console.log(err);

  });
});

module.exports = app;