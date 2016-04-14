import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import CalculatorActions from '../actions/calculator-actions';
import CalculatorStore from '../stores/calculator-store';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onStoreChange = () => {
    console.log("CHANGED");
    let displayValue = CalculatorStore.getDisplayValue();
    this.setState({displayValue});
  }

  componentWillMount() {
    let storeToken = CalculatorStore.addListener(this.onStoreChange);
    console.log("STORE_TOKEN::" + storeToken);
    this.setState({storeToken});
  }

  componentWillUnmount() {
    this.state.storeToken.remove();
  }

  addNumber(number) {
    return function(event) {
      CalculatorActions.addNumber(number);
    };
  }

  addOperator(operator) {
    return function(event) {
      CalculatorActions.addOperator(operator);
    }
  }

  render() {
    const buttonStyle = {
      margin: 12,
    };
    const displayStyle = {
      padding: 12,
      margin: 0,
      textAlign: 'right'
    };
    const paperStyle = {
      width: 488,
      margin: 'auto',
      marginTop: 60,
      padding: 20
    };
    let { displayValue } = this.state;
    if (!displayValue || displayValue.length === 0) {
      displayValue = (<i style={{color: '#d3d3d3'}}>Want to click something?</i>);
    }
    return (
      <Paper style={paperStyle}>
        <Paper>
          <h1 style={displayStyle}>{ displayValue }</h1>
        </Paper>
        <div>
          <RaisedButton label="AC" primary={true} style={buttonStyle} />
          <RaisedButton label="/" onClick={this.addOperator('/')} secondary={true} style={buttonStyle} />
        </div>
        <div>
          <RaisedButton label="7" onClick={this.addNumber(7)} style={buttonStyle} />
          <RaisedButton label="8" onClick={this.addNumber(8)} style={buttonStyle} />
          <RaisedButton label="9" onClick={this.addNumber(9)} style={buttonStyle} />
          <RaisedButton label="X" onClick={this.addOperator('X')} secondary={true} style={buttonStyle} />
        </div>
        <div>
          <RaisedButton label="4" onClick={this.addNumber(4)} style={buttonStyle} />
          <RaisedButton label="5" onClick={this.addNumber(5)} style={buttonStyle} />
          <RaisedButton label="6" onClick={this.addNumber(6)} style={buttonStyle} />
          <RaisedButton label="-" onClick={this.addOperator('-')} secondary={true} style={buttonStyle} />
        </div>
        <div>
          <RaisedButton label="1" onClick={this.addNumber(1)} style={buttonStyle} />
          <RaisedButton label="2" onClick={this.addNumber(2)} style={buttonStyle} />
          <RaisedButton label="3" onClick={this.addNumber(3)} style={buttonStyle} />
          <RaisedButton label="+" onClick={this.addOperator('+')} secondary={true} style={buttonStyle} />
        </div>
        <div>
          <RaisedButton label="0" onClick={this.addNumber(0)} style={buttonStyle} />
          <RaisedButton label="=" primary={true} style={buttonStyle} />
        </div>
      </Paper>
    );
  }
}
