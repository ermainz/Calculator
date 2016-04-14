import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

import CalculatorActions from '../actions/calculator-actions';

const buttonStyle = {
  margin: 12,
};

export default class OperatorButton extends Component {
  constructor(props) {
    super(props);
    this.addOperator = this.addOperator.bind(this);
  }

  addOperator(event) {
    CalculatorActions.addOperator(this.props.operator);
  }

  render() {
    let { operator } = this.props;
    let label = '' + operator;
    return (
      <RaisedButton 
        label={label} 
        onClick={this.addOperator} 
        style={buttonStyle} 
        secondary={true}
        />
    );
  }
}
