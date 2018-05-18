import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

import classes from './ContactData.css';
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    })

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
        loading: false
      })
      this.props.history.push('/');

      console.log(response);
    })
    .catch(error => {
      this.setState({
        loading: false
      })
      console.log(error);
    })
  }


  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name"  placeholder="Enter your name" />
        <input className={classes.Input} type="email" name="email"  placeholder="Enter your email" />
        <input className={classes.Input} type="text" name="street"  placeholder="Enter your street" />
        <input className={classes.Input} type="text" name="Postal Code}"  placeholder="Enter your Postal Code}" />
        <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
      </form>
    );

    if (this.state.loading === true) {
      form = <Spinner />
    }
    return(
      <div className={classes.ContactData}>
        <h4>Enter Details</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;
