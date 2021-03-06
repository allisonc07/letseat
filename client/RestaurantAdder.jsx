import React from 'react';

class RestaurantAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
  }

  render() {
    const { addVisit } = this.props;
    const { name, date } = this.state;
    return (
      <form onSubmit={(e) => { addVisit(e, name, date) }}>
        <input name="name" type="text" onChange={this.handleInputChange} />
        <input name="date" type="date" onChange={this.handleInputChange} />
        <button type="submit" className="submit">Submit</button>
      </form>
    );
  }
};

export default RestaurantAdder;