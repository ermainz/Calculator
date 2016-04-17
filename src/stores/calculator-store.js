import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';

import CalculatorDispatcher from '../dispatchers/calculator-dispatcher';
import { EventType } from '../constants/constants';

const NUM_ONE = 'NUM_ONE';
const OP = 'OP';
const NUM_TWO = 'NUM_TWO';
const CLEAR_ON_NEXT_NUMBER = 'CLEAR_ON_NEXT_NUMBER';
const NUMBER_UPDATER = 'NUMBER_UPDATER';

/**
 * Returns a fresh calculator state.
 *
 * NUM_ONE: first number - default undefined,
 * OP: operator - default undefined,
 * NUM_TWO: second number - default undefined,
 * CLEAR_ON_NEXT_NUMBER: the user just hit "=" so the result is displayed, if the user presses another number we want to treat that as a clear - updated when value is calculated - default false,
 * NUMBER_UPDATER: function used to update the current number - updated when operator is added - default addDigitToNumberOne
 */
function buildCleanState() {
  return new Immutable.Map({CLEAR_ON_NEXT_NUMBER: false, NUMBER_UPDATER: addDigitToNumberOne});
}

/**
 * Evaluates the epxression of number one, operator, and number two. Places the result into number one, 
 * clearing the rest of the state.
 */
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
  return newState.set(NUM_ONE, value).set(CLEAR_ON_NEXT_NUMBER, true);
}

function addDigit(state, newNumber, target) {
  let newValue = state.get(target) ? (state.get(target) * 10) + newNumber : newNumber;
  return state.set(target, newValue);
}

function addDigitToNumberOne(state, number) {
  return addDigit(state, number, NUM_ONE);
}

function addDigitToNumberTwo(state, number) {
  return addDigit(state, number, NUM_TWO);
}

function addNumber(state, number ) {
  let newState = state;
  if (newState.get(CLEAR_ON_NEXT_NUMBER)) {
    newState = buildCleanState();
  }
  return newState.get(NUMBER_UPDATER)(newState, number);
}

function addOperator(state, operator) {
  let newState = state.set(CLEAR_ON_NEXT_NUMBER, false);
  // if we're already inputting the second number, calculate the current expression
  if (state.get(NUM_TWO) !== undefined) {
    newState = calculateValue(newState);
  }
  return newState.set(OP, operator).set(NUMBER_UPDATER, addDigitToNumberTwo);
}

class CalculatorStore extends ReduceStore {
  getInitialState() {
    return buildCleanState();
  }

  reduce(state, action) {
    switch (action.eventType) {
      case EventType.NUMBER_ADDED:
        return addNumber(state, action.number);
      case EventType.OPERATOR_ADDED:
        return addOperator(state, action.operator);
      case EventType.CALCULATE_VALUE:
        return calculateValue(state);
      case EventType.CLEAR_INPUT:
        return buildCleanState();
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
