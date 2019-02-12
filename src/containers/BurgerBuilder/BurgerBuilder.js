import React, {Component} from 'react';
import {connect} from 'react-redux'

import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    // axios.get('https://burger-builder-react-a9dcd.firebaseio.com/ingredients.json')
    // .then(response => {
    //   this.setState({
    //     ingredients: response.data
    //   })
    // })
    // .catch(error => {
    //   this.setState({
    //     error: true
    //   })
    // })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
    .map(igKey => {
      return ingredients[igKey];
    })
    .reduce((sum, el) => {
      return sum + el
    }, 0)

    return sum > 0
  }


purchaseHandler = () => {
  this.setState({
    purchasing: true
  })
}

purchaseCancelHandler = () => {
  this.setState({
    purchasing: false
  })
}

purchaseContinueHandler = () => {
  this.props.history.push('/checkout');
}

render () {

  const disabledInfo = {
    ...this.props.ings
  }

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />


if(this.props.ings) {
  burger = (
    <Aux>
      <Burger ingredients={this.props.ings}/>
      <BuildControls
        purchaseable={this.updatePurchaseState(this.props.ings)}
        ordered={this.purchaseHandler}
        price={this.props.price}
        disabled={disabledInfo}
        ingredientAdded={this.props.onIngredientAdded}
        ingredientRemoved={this.onIngredientRemoved}
        />
    </Aux>
  );

  orderSummary = (
    <OrderSummary
      price={this.props.price}
      ingredients={this.props.ings}
      purchasedCancel={this.purchaseCancelHandler}
      purchasedContinue={this.purchaseContinueHandler}
      / >
    )
  }

  if (this.state.loading) {
    orderSummary = <Spinner message="Sending order..."/>
  }

  return (
    <Aux>
      <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>

  );
}

}

const  mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
}

const  mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
