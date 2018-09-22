import React from 'react';

const Navbar = (props) => {
  return (
    <ul className="navbar">
      <li>
        <img src="https://s3-us-west-1.amazonaws.com/letseatmvp/dish.svg" className="icon" />
        Let's Eat!
      </li>
      <li className="settings" onClick={props.toggle}>
        Settings
      </li>
    </ul >
  )
};

export default Navbar;