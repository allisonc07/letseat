const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

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

app.post('/newRestaurant', (req, res) => {
  console.log('post received');
  db.addRestaurant(req.body.details, (err) => {
    if (err) {
      throw err;
    } else {
      res.send('new restaurant added!');
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

module.exports = app;