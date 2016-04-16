jest.unmock('../calculator-store');
jest.unmock('../../constants/constants');
jest.unmock('immutable');
jest.unmock('flux/utils');

import { EventType } from '../../constants/constants';
import Immutable from 'immutable';

function buildNumberAddedAction(num) {
  return {
    eventType: EventType.NUMBER_ADDED,
    number: num
  };
}

function buildOperatorAddedAction(op) {
  return {
    eventType: EventType.OPERATOR_ADDED,
    operator: op
  };
}

function buildCalculateValueAction() {
  return {
    eventType: EventType.CALCULATE_VALUE
  }
}

function buildClearInputAction() {
  return {
    eventType: EventType.CLEAR_INPUT
  }
}

describe('CalculatorStore', function() {
  let CalculatorDispatcher;
  let CalculatorStore;
  let callback;

  beforeEach(function() {
    CalculatorDispatcher = require('../../dispatchers/calculator-dispatcher');
    CalculatorStore = require('../calculator-store');
    callback = CalculatorDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(CalculatorDispatcher.register.mock.calls.length).toBe(1);
  });

  it('initializes with empty input', function() {
    let initialDisplayValue = CalculatorStore.getDisplayValue();
    expect(initialDisplayValue).toBe('');
  });

  it('displays multiple digits', function() {
    callback(buildNumberAddedAction(1));
    callback(buildNumberAddedAction(2));
    callback(buildNumberAddedAction(3));

    let displayValue = CalculatorStore.getDisplayValue();
    expect(displayValue).toBe('123');
  });

  it('displays expresssions digits', function() {
    callback(buildNumberAddedAction(1));
    callback(buildNumberAddedAction(2));
    callback(buildNumberAddedAction(3));
    callback(buildOperatorAddedAction('+'));
    callback(buildNumberAddedAction(4));
    callback(buildNumberAddedAction(5));
    callback(buildNumberAddedAction(6));

    let displayValue = CalculatorStore.getDisplayValue();
    expect(displayValue).toBe('123 + 456');
  });

  it('evaluates single digit addition', function() {
    callback(buildNumberAddedAction(2));
    callback(buildOperatorAddedAction('+'));
    callback(buildNumberAddedAction(5));
    callback(buildCalculateValueAction());

    let state = CalculatorStore.getState();
    expect(state.size).toBe(1);
    expect(state.get(0)).toBe(7);
  });

  it('evaluates single digit subtraction', function() {
    callback(buildNumberAddedAction(8));
    callback(buildOperatorAddedAction('-'));
    callback(buildNumberAddedAction(5));
    callback(buildCalculateValueAction());

    let state = CalculatorStore.getState();
    expect(state.size).toBe(1);
    expect(state.get(0)).toBe(3);
  });

  it('evaluates single digit multiplication', function() {
    callback(buildNumberAddedAction(3));
    callback(buildOperatorAddedAction('*'));
    callback(buildNumberAddedAction(6));
    callback(buildCalculateValueAction());

    let state = CalculatorStore.getState();
    expect(state.size).toBe(1);
    expect(state.get(0)).toBe(18);
  });

  it('evaluates single digit division', function() {
    callback(buildNumberAddedAction(8));
    callback(buildOperatorAddedAction('/'));
    callback(buildNumberAddedAction(4));
    callback(buildCalculateValueAction());

    let state = CalculatorStore.getState();
    expect(state.size).toBe(1);
    expect(state.get(0)).toBe(2);
  });

  it('clears input', function() {
    callback(buildNumberAddedAction(1));
    callback(buildNumberAddedAction(2));
    callback(buildNumberAddedAction(3));
    callback(buildOperatorAddedAction('+'));
    callback(buildNumberAddedAction(4));
    callback(buildNumberAddedAction(5));
    callback(buildNumberAddedAction(6));

    let initialDisplayValue = CalculatorStore.getDisplayValue();
    expect(initialDisplayValue).toBe('123 + 456');

    callback(buildClearInputAction());
    let clearedDisplayValue = CalculatorStore.getDisplayValue();
    expect(clearedDisplayValue).toBe('');
  });

  it('evaluates 2 digit addition', function() {
    callback(buildNumberAddedAction(1));
    callback(buildNumberAddedAction(2));
    callback(buildOperatorAddedAction('+'));
    callback(buildNumberAddedAction(7));
    callback(buildNumberAddedAction(9));
    callback(buildCalculateValueAction());

    let state = CalculatorStore.getState();
    expect(state.get(0)).toBe(91);
  });

  it('evaluates 2 digit subtraction', function() {
    callback(buildNumberAddedAction(9));
    callback(buildNumberAddedAction(7));
    callback(buildOperatorAddedAction('-'));
    callback(buildNumberAddedAction(2));
    callback(buildNumberAddedAction(5));
    callback(buildCalculateValueAction());

    let state = CalculatorStore.getState();
    expect(state.get(0)).toBe(72);
  });

  it('evaluates 2 digit multiplication', function() {
    callback(buildNumberAddedAction(2));
    callback(buildNumberAddedAction(3));
    callback(buildOperatorAddedAction('*'));
    callback(buildNumberAddedAction(3));
    callback(buildNumberAddedAction(4));
    callback(buildCalculateValueAction());

    let state = CalculatorStore.getState();
    expect(state.get(0)).toBe(782);
  });

  it('evaluates 2 digit division', function() {
    callback(buildNumberAddedAction(7));
    callback(buildNumberAddedAction(2));
    callback(buildOperatorAddedAction('/'));
    callback(buildNumberAddedAction(1));
    callback(buildNumberAddedAction(2));
    callback(buildCalculateValueAction());

    let state = CalculatorStore.getState();
    expect(state.get(0)).toBe(6);
  });

  it('evaluates multi digit addition', function() {
    callback(buildNumberAddedAction(1));
    callback(buildNumberAddedAction(2));
    callback(buildNumberAddedAction(3));
    callback(buildNumberAddedAction(4));
    callback(buildOperatorAddedAction('+'));
    callback(buildNumberAddedAction(5));
    callback(buildNumberAddedAction(6));
    callback(buildNumberAddedAction(7));
    callback(buildNumberAddedAction(8));
    callback(buildCalculateValueAction());

    let state = CalculatorStore.getState();
    expect(state.get(0)).toBe(6912);
  });

  it('calculates value when a second operator is added', function() {
    callback(buildNumberAddedAction(1));
    callback(buildOperatorAddedAction('+'));
    callback(buildNumberAddedAction(5));

    expect(CalculatorStore.getDisplayValue()).toBe('1 + 5');

    callback(buildOperatorAddedAction('+'));

    expect(CalculatorStore.getDisplayValue()).toBe('6 + ');
    expect(CalculatorStore.getState().get(0)).toBe(6);
  });

  it ('displays 0 correctly', function() {
    callback(buildNumberAddedAction(0));
    expect(CalculatorStore.getDisplayValue()).toBe('0');
  });
});
