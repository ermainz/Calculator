import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

import CalculatorActions from '../actions/calculator-actions';

const buttonStyle = {
  margin: 12,
};

export default class DigitButton extends Component {
  constructor(props) {
    super(props);
    this.addNumber = this.addNumber.bind(this);
  }

  addNumber(event) {
    CalculatorActions.addNumber(this.props.value);
  }

  render() {
    let { value } = this.props;
    let label = '' + value;
    return (
      <RaisedButton label={label} onClick={this.addNumber} style={buttonStyle} />
    );
  }
}
