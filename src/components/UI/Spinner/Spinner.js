import React from 'react';

import classes from './Spinner.css'

const spinner = (props) => (
  <div>
    <h4>{props.message}</h4>
    <div className={classes.Loader}></div>
  </div>
);

export default spinner;
