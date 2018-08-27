var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mealpicker', {
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});
db.once('open', () => {
  console.log('mongoose connection successful');
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  visitDates: [Date],
  visitsThisWeek: Number,
  isFavorite: Boolean,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const getAllRestuarants = (callback) => {
  Restaurant.find({}, (err, results) => {
    if (err) {
      throw err;
    } else {
      callback(null, results);
    }
  })
};

const addRestaurant = (details, callback) => {
  const restaurantToAdd = new Restaurant(details);
  restaurantToAdd.save((err) => {
    if (err) {
      throw err;
    }
  });
}

const updateRestaurant = ([details], callback) => {
  Restaurant.update({ name: details.name }, { $push { visitDates: details.date } }, (err, response) => {
    if (err) {
      throw err;
    } else {
      callback(null, reponse);
    }
  })
}

module.exports = {
  getAllRestuarants,
  addRestaurant,
  updateRestaurant
}
