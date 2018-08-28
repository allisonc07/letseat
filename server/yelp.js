const yelp = require('yelp-fusion');
const config = require('../config.js')

const apiKey = config.yelpAPIKey;

const client = yelp.client(apiKey);

module.exports = client;