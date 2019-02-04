import React, { Component } from 'react';
import { ProductCard } from 'react-ui-cards';

class Card extends Component {
  render() {

    // for each user that selected this card, their color is pushed to an array for mapping to check icon
    let colors = []
    for (let user in this.props.socketIds) {
      if (this.props.socketIds[user].selected) {
        colors.push(this.props.socketIds[user].color)
      }
    }

    let checks = '';
    for (let i = 0; i < colors.length; i++) {
      checks += '✔';
    }


    let stars = '';
    for (let i = 0; i < Math.floor(this.props.rating); i++) {
      stars += '☆';
    }
    

    return (
      <div onClick={() => this.props.addUserSelection(this.props.id)}>
        <ProductCard productName={this.props.title} photos={[this.props.imgSrc]} price={`$${this.props.price} - ${stars} - ${checks}`} description={this.props.address} />
      </div>
    );
  }
}

export default Card;