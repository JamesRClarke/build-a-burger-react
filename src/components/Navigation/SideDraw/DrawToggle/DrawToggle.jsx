import React from 'react'

import classes from './DrawToggle.css'

const drawToggle = (props) => (

  <div onClick={props.clicked} className={classes.DrawToggle}>
    <div></div>
    <div></div>
    <div></div>

  </div>
)


export default drawToggle;
