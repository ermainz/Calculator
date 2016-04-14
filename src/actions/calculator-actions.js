import CalculatorDispatcher from '../dispatchers/calculator-dispatcher';
import { EventType } from '../constants/constants';

var CalculatorActions = {
  addNumber: function(number) {
    CalculatorDispatcher.dispatch({
      eventType: EventType.NUMBER_ADDED,
      number
    });
  },
  addOperator: function(operator) {
    CalculatorDispatcher.dispatch({
      eventType: EventType.OPERATOR_ADDED,
      operator
    });
  }
};

module.exports = CalculatorActions;
