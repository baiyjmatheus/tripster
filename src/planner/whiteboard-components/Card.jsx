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
    // for each user that selected this card, their color is pushed to an array for mapping to check icon
    let colors = []
    for (let user in this.props.socketIds) {
      if (this.props.socketIds[user].selected) {
        colors.push(this.props.socketIds[user].color)
      }
    }
    return (
      <div className="card" style={cardStyle} onClick={() => this.props.addUserSelection(this.props.id)}>
        <div className="card-header">
          <h4>{this.props.title}</h4>
          <p><span>{this.props.rating}</span> stars</p>
          {
            colors.map(color => {return <i className="fas fa-check" style={{color: color}}></i>})
          }
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