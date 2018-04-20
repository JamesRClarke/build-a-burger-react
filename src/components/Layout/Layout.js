import React, {Component} from 'react';

import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDraw from '../Navigation/SideDraw/SideDraw'

import classes from './Layout.css'

class Layout extends Component {
  state = {
    showSideDraw: false
  }

  sideDrawClosedHandler = () => {
    this.setState({
      showSideDraw: false
    })
  }

  sideDrawToggleHandler = () => {
    this.setState( (prevState) => {
      return {showSideDraw: !prevState.showSideDraw }
    })
  }



  render() {
    return (
      <Aux>
        <Toolbar drawToggleClicked={this.sideDrawToggleHandler}/>
        <SideDraw open={this.state.showSideDraw} closed={this.sideDrawClosedHandler}/>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }

}

export default Layout;
