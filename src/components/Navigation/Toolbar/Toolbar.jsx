import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDraw/DrawToggle/DrawToggle';

import classes from './Toolbar.css';

const toolbar  = (props) => (

  <header className={classes.Toolbar}>

    <DrawToggle clicked={props.drawToggleClicked}/>

    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.DesktopOnly}>
      <NavigationItems/>
    </nav>

  </header>

)

export default toolbar;
