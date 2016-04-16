import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';

import CalculatorDispatcher from '../dispatchers/calculator-dispatcher';
import { EventType } from '../constants/constants';

const NUM_ONE = 'NUM_ONE';
const OP = 'OP';
const NUM_TWO = 'NUM_TWO';
const NUM_TWO = 'NUM_TWO';

function buildCleanState() {
  return new Immutable.Map();
}

function calculateValue(state) {
  clearOnNextNumber = true;
  operatorAdded = false;

  let num1 = state.get(NUM_ONE);
  let op = state.get(OP);
  let num2 = state.get(NUM_TWO);
  let value;
  switch(op) {
    case '+':
      value = num1 + num2;
      break;
    case '-':
      value = num1 - num2;
      break;
    case '*':
      value = num1 * num2;
      break;
    case '/':
      value = num1 / num2;
      break;
    default:
      console.log("Unrecognized operator, op=" + op);
      return state;
  }
  let newState = buildCleanState();
  return newState.set(NUM_ONE, value);
}

function handleNumberAdded(state, number ) {
  let newState = state;
  if (clearOnNextNumber) {
    newState = buildCleanState();
    clearOnNextNumber = false;
  }
  if (operatorAdded) {
    let newNum2 = newState.get(NUM_TWO) ? (newState.get(NUM_TWO) * 10) + number : number;
    return newState.set(NUM_TWO, newNum2);
  } else {
    let newNum1 = newState.get(NUM_ONE) ? (newState.get(NUM_ONE) * 10) + number : number;
    return newState.set(NUM_ONE, newNum1);
  }
}

function handleOperatorAdded(state, operator) {
  let newState = state;
  clearOnNextNumber = false;
  // if we're already inputting the second number, calculate the current expression
  if (operatorAdded) {
    newState = calculateValue(newState);
  }
  operatorAdded = true;
  return newState.set(OP, operator);
}

function handleClearInput(state) {
  clearOnNextNumber = false;
  operatorAdded = false;
  return buildCleanState();
}

let operatorAdded = false;
let clearOnNextNumber = false;

class CalculatorStore extends ReduceStore {
  getInitialState() {
    return buildCleanState();
  }

  reduce(state, action) {
    switch (action.eventType) {
      case EventType.NUMBER_ADDED:
        return handleNumberAdded(state, action.number);
      case EventType.OPERATOR_ADDED:
        return handleOperatorAdded(state, action.operator);
      case EventType.CALCULATE_VALUE:
        return calculateValue(state);
      case EventType.CLEAR_INPUT:
        return handleClearInput(state);
      default:
        return state;
    }
  }

  areEqual(one, two) {
    return Immutable.is(one, two);
  }

  getDisplayValue() {
    let state = this.getState();
    let num1 = state.get(NUM_ONE);
    let op = state.get(OP);
    let num2 = state.get(NUM_TWO);

    let displayValue = '';
    if (num1 !== undefined) {
      displayValue += num1;
    }
    if (op !== undefined) {
      displayValue += ' ' + op + ' ';
    }
    if (num2 !== undefined) {
      displayValue += num2;
    }
    return displayValue;
  }
}

const instance = new CalculatorStore(CalculatorDispatcher);
module.exports = instance;
