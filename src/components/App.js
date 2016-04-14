import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import CalculatorActions from '../actions/calculator-actions';
import CalculatorStore from '../stores/calculator-store';
import DigitButton from '../components/digit-button';
import OperatorButton from '../components/operator-button';
import ClearButton from '../components/clear-button';

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

  computeValue(event) {
    CalculatorActions.computeValue();
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
          <ClearButton/>
          <OperatorButton operator={'/'}/>
        </div>
        <div>
          <DigitButton value={7}/>
          <DigitButton value={8}/>
          <DigitButton value={9}/>
          <OperatorButton operator={'*'}/>
        </div>
        <div>
          <DigitButton value={4}/>
          <DigitButton value={5}/>
          <DigitButton value={6}/>
          <OperatorButton operator={'-'}/>
        </div>
        <div>
          <DigitButton value={1}/>
          <DigitButton value={2}/>
          <DigitButton value={3}/>
          <OperatorButton operator={'+'}/>
        </div>
        <div>
          <DigitButton value={0}/>
          <RaisedButton label="=" onClick={this.computeValue} primary={true} style={buttonStyle} />
        </div>
      </Paper>
    );
  }
}
