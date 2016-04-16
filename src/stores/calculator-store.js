import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';

import CalculatorDispatcher from '../dispatchers/calculator-dispatcher';
import { EventType } from '../constants/constants';

const NUM_ONE = 0;
const OP = 1;
const NUM_TWO = 2;

function buildCleanState() {
  return new Immutable.List();
}

function calculateValue(state) {
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

let operatorAdded = false;
let clearOnNextNumber = false;

class CalculatorStore extends ReduceStore {
  getInitialState() {
    return buildCleanState();
  }

  reduce(state, action) {
    let newState = state;
    switch (action.eventType) {
      case EventType.NUMBER_ADDED:
        if (clearOnNextNumber) {
          newState = buildCleanState();
          clearOnNextNumber = false;
        }
        if (operatorAdded) {
          let newNum2 = newState.get(NUM_TWO) ? (newState.get(NUM_TWO) * 10) + action.number : action.number;
          return newState.set(NUM_TWO, newNum2);
        } else {
          let newNum1 = newState.get(NUM_ONE) ? (newState.get(NUM_ONE) * 10) + action.number : action.number;
          return newState.set(NUM_ONE, newNum1);
        }
      case EventType.OPERATOR_ADDED:
        clearOnNextNumber = false;
        let newState = newState;
        // if we're already inputting the second number, calculate the current expression
        if (operatorAdded) {
          newState = calculateValue(newState);
        }
        operatorAdded = true;
        return newState.set(OP, action.operator);
      case EventType.CALCULATE_VALUE:
        clearOnNextNumber = true;
        operatorAdded = false;
        return calculateValue(newState);
      case EventType.CLEAR_INPUT:
        clearOnNextNumber = false;
        operatorAdded = false;
        return buildCleanState();
      default:
        return newState;
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
