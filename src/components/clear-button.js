import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

import CalculatorActions from '../actions/calculator-actions';

const buttonStyle = {
  margin: 12,
};

export default class ClearButton extends Component {
  constructor(props) {
    super(props);
  }

  clearInput(event) {
    CalculatorActions.clearInput();
  }

  render() {
    return (
      <RaisedButton 
        label={'AC'} 
        primary={true} 
        onClick={this.clearInput} 
        style={buttonStyle} 
        />
    );
  }
}
