import React, {Component} from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class  OrderSummary extends Component  {
// this could be a functional compoennt, no need to check componentWillUpdate()
  componentWillUpdate() {
    console.log('order summray updated');
  }

  render() {

    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}: </span>
        {this.props.ingredients[igKey]}
      </li>
    })

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger made with: </p>
        <ul style={{listStyle: 'none'}}>
          {ingredientSummary}
        </ul>
        <p>Total Price: <strong>£ {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout</p>
        <Button btnType="Danger" clicked={this.props.purchasedCancel}>Cancel</Button>
        <Button btnType="Success" clicked={this.props.purchasedContinue}>Continue</Button>
      </Aux>
    )
  }
}

export  default OrderSummary;
