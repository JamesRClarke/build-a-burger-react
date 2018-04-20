import React from 'react';


import Aux from '../../../hoc/Aux';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDraw.css'


const sideDraw = (props) => {
  let attachedClasses = [classes.SideDraw, classes.Close];

  if (props.open) {
    attachedClasses = [classes.SideDraw, classes.Open]
  }
  return (
    <Aux>
    <Backdrop show={props.open} clicked={props.closed}/>
    <div className={attachedClasses.join(' ')}>

      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav>
        <NavigationItems />
      </nav>

    </div>
    </Aux>
  );
}

export default sideDraw;
