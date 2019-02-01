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
    const selectedIcons = []
    for (let user in this.props.selectionsBySockets) {
      console.log(user)
       if (user === true) {
          selectedIcons.push(<i className="fas fa-check" style={{color: this.props.currentUser.color}}></i>)
       } 
    }
    return (
      <div className="card" style={cardStyle} onClick={() => this.props.handleSelection(this.props.id)} >
        <div className="card-header">
          <h4>{this.props.title}</h4>
          <p><span>{this.props.rating}</span> stars</p>
          { selectedIcons.map((icon) => {
              return <p>icon</p>
          }) }
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