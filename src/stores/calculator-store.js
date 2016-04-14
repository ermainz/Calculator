import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';

import CalculatorDispatcher from '../dispatchers/calculator-dispatcher';
import { EventType } from '../constants/constants';

class CalculatorStore extends ReduceStore {
  getInitialState() {
    return Immutable.List.of([]);
  }

  reduce(state, action) {
    switch (action.eventType) {
      case EventType.NUMBER_ADDED:
        return state.push(action.number);
      case EventType.OPERATOR_ADDED:
        console.log(action.operator);
        return state.push(action.operator);
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
