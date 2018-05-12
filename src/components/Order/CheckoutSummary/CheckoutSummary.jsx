import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

import classes from './CheckoutSummary.css'

const checkoutsummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it's good!</h1>

      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>


        <Button  clicked={props.onCheckoutCancelled} btnType="Danger" >Cancel</Button>
        <Button clicked={props.onCheckoutContinued} btnType="Success" >Continue</Button>

    </div>
  )
}

export default checkoutsummary
