import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

import CalculatorActions from '../actions/calculator-actions';

const buttonStyle = {
  margin: 12,
};

export default class EqualButton extends Component {
  constructor(props) {
    super(props);
  }

  computeValue(event) {
    CalculatorActions.computeValue();
  }

  render() {
    return (
      <RaisedButton 
        label="=" 
        onClick={this.computeValue} 
        primary={true} 
        style={buttonStyle} 
        />
    );
  }
}
