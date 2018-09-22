import React from 'react';

const RestaurantList = (props) => {
  const { restaurants, clickRestaurant } = props;
  return (
    <div className="restaurantList">
      <h4>My Restaurants</h4>
      <ul>
        {
          restaurants.map((restaurant) => {
            if (restaurant.isFavorite) {
              return <li onClick={() => { clickRestaurant(restaurant.name) }}><b>{restaurant.name}</b></li>
            }
            return <li onClick={() => { clickRestaurant(restaurant.name) }}>{restaurant.name}</li>
          })
        }
      </ul>
    </div>
  )
}

export default RestaurantList;