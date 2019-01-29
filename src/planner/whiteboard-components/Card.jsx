import React, { Component } from 'react';

class Card extends Component {
  render() {
    const cardStyle = {
      color: 'white',
      height: '300px',
      width: '260px',
      border: '1px solid black',
      margin: '20px 0 40px'
    }
    return (
      <div className="card" style={cardStyle}>
        <div className="card-header">
          <h4>Eiffel Tower</h4>
        </div>
        <div className="card-body">
          <img src="https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg" alt=""/>
          <p className="address">Champ de Mars, 5 Avenue Anatole</p>
        </div>
      </div>
    );
  }
}

export default Card;