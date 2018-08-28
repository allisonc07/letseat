import React from 'react';

const RestaurantList = (props) => {
  const { restaurants, clickRestaurant } = props;
  return (
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
  )
}

export default RestaurantList;