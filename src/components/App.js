import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import CalculatorActions from '../actions/calculator-actions';
import CalculatorStore from '../stores/calculator-store';
import DigitButton from '../components/digit-button';
import OperatorButton from '../components/operator-button';
import ClearButton from '../components/clear-button';
import EqualButton from '../components/equal-button';
import Display from '../components/display';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onStoreChange = () => {
    let displayValue = CalculatorStore.getDisplayValue();
    this.setState({displayValue});
  }

  componentWillMount() {
    let storeToken = CalculatorStore.addListener(this.onStoreChange);
    this.setState({storeToken});
  }

  componentWillUnmount() {
    this.state.storeToken.remove();
  }

  render() {
    const paperStyle = {
      width: 488,
      margin: 'auto',
      marginTop: 60,
      padding: 20
    };
    let { displayValue } = this.state;
    return (
      <Paper style={paperStyle}>
        <Display displayValue={ displayValue }/>
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
          <EqualButton/>
        </div>
      </Paper>
    );
  }
}
