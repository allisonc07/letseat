import React from 'react';

const RestaurantDetails = (props) => {
  const { details, openDetails } = props;
  if (openDetails) {
    return (
      <div>
        <h3>{details.data.name}</h3>
        <div className="detailsContainer">
          <div className="imgDiv">
            <img src={details.data.image_url} />
          </div>
          <div className="detailsText">
            <div>
              <div className="header">
                Ratings
              </div>
              <div className="details">
                {details.data.rating}
              </div>
            </div>
            <div>
              <div className="header">
                Categories
              </div>
              {details.data.categories.map(category => (
                <div className="details">
                  {category.title}
                </div>
              ))}
            </div>
            <div>
              <div className="header">
                Price
              </div>
              <div className="details">
                {details.data.price}
              </div>
            </div>
            <div>
              <div className="header">
                Address
              </div>
              <div className="details">
                {details.data.location.display_address[0]}
                <br />
                {details.data.location.display_address[1]}
              </div>
            </div>
            <div>
              <div className="header">
                Phone Number
              </div>
              <div className="details">
                {details.data.display_phone}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default RestaurantDetails;