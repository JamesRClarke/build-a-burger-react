import React, {Component} from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.7,
  meat: 1.5,
  bacon: 1
}

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    axios.get('https://burger-builder-react-a9dcd.firebaseio.com/ingredients.json')
    .then(response => {
      this.setState({
        ingredients: response.data
      })
    })
    .catch(error => {
      this.setState({
        error: true
      })
    })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
    .map(igKey => {
      return ingredients[igKey];
    })
    .reduce((sum, el) => {
      return sum + el
    }, 0)

    this.setState({purchaseable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    }
  )
  this.updatePurchaseState(updatedIngredients);
}

removeIngredientHandler = (type) => {
  const oldCount = this.state.ingredients[type];

  if (oldCount <= 0) {
    return false;
  }


  const updatedCount = oldCount - 1;
  const updatedIngredients = {
    ...this.state.ingredients
  }
  updatedIngredients[type] = updatedCount;
  const priceReduction = INGREDIENT_PRICES[type];
  const oldPrice = this.state.totalPrice;
  const newPrice = oldPrice - priceReduction;

  this.setState({
    totalPrice: newPrice,
    ingredients: updatedIngredients
  })
  this.updatePurchaseState(updatedIngredients);
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
  // alert('Continue!!')
  this.setState({
    loading: true
  })
  const order = {
    ingredients: this.state.ingredients,
    price: this.state.totalPrice,
    customer: {
      name: 'james',
      address: {
        street: 'test street',
        postCode: 'CR2 9NG',
        country: 'James'
      },
      email: 'james@email.com'
    },
    delivery: 'fast'
  }

  axios.post('/orders.json', order)
  .then(response => {
    this.setState({
      loading: false,
      purchasing: false
    })
    console.log(response);
  })
  .catch(error => {
    this.setState({
      loading: false,
      purchasing: false
    })
    console.log(error);
  })
}

render () {

  const disabledInfo = {
    ...this.state.ingredients
  }

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />



  if(this.state.ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
          disabled={disabledInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axios);
