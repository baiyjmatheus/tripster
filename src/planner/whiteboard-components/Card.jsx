import React, { Component } from 'react';

class Card extends Component {
  render() {
    const cardStyle = {
      color: 'white',
      height: '320px',
      width: '300px',
      border: '1px solid black',
      margin: '20px 0 40px'
    }
    return (
      <div className="card" style={cardStyle}>
        <div className="card-header">
          <h4>{this.props.title}</h4>
          <p><span>{this.props.rating}</span> stars</p>
        </div>
        <div className="card-body">
          <img src={this.props.imgSrc} />
          <p className="address">{this.props.address}</p>
          
        </div>
        <div className="card-footer">
          <p>$<span className="price">{this.props.price}</span></p>
          
        </div>
      </div>
    );
  }
}

export default Card;