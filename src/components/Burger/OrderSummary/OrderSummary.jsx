import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(igKey => {
    return <li key={igKey}>
      <span style={{textTransform: 'capitalize'}}>{igKey}: </span>
         {props.ingredients[igKey]}
       </li>
  })

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger made with: </p>
      <ul style={{listStyle: 'none'}}>
        {ingredientSummary}
      </ul>
      <p>Total Price: <strong>£ {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout</p>
      <Button btnType="Danger" clicked={props.purchasedCancel}>Cancel</Button>
      <Button btnType="Success" clicked={props.purchasedContinue}>Continue</Button>
    </Aux>

  )


}

export  default orderSummary;
