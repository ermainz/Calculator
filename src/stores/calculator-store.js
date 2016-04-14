import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';

import CalculatorDispatcher from '../dispatchers/calculator-dispatcher';
import { EventType } from '../constants/constants';

function calculateValue(state) {
  let num1 = state.get(0);
  let op = state.get(1);
  let num2 = state.get(2);
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
  return Immutable.List.of(value);
}

class CalculatorStore extends ReduceStore {
  getInitialState() {
    return new Immutable.List();
  }

  reduce(state, action) {
    switch (action.eventType) {
      case EventType.NUMBER_ADDED:
        return state.push(action.number);
      case EventType.OPERATOR_ADDED:
        console.log(action.operator);
        return state.push(action.operator);
      case EventType.CALCULATE_VALUE:
        return calculateValue(state);
      case EventType.CLEAR_INPUT:
        return new Immutable.List();
      default:
        return state;
    }
  }

  areEqual(one, two) {
    return Immutable.is(one, two);
  }

  getDisplayValue() {
    return this.getState().join(' ');
  }
}

const instance = new CalculatorStore(CalculatorDispatcher);
export default instance;
