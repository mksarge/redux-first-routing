import { expect } from 'chai';
import sinon from 'sinon';
import { routerMiddleware } from '../src/middleware';

let sandbox;
let history;
let nextHandler;
let actionHandler;
const expected = 'next';
const actions = [
  {
    action: 'push',
    type: 'ROUTER/PUSH',
  },
  {
    action: 'replace',
    type: 'ROUTER/REPLACE',
  },
  {
    action: 'go',
    type: 'ROUTER/GO',
  },
  {
    action: 'goBack',
    type: 'ROUTER/GO_BACK',
  },
  {
    action: 'goForward',
    type: 'ROUTER/GO_FORWARD',
  },
];

describe('middleware', () => {
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    history = {
      push: sandbox.stub(),
      replace: sandbox.stub(),
      go: sandbox.stub(),
      goBack: sandbox.stub(),
      goForward: sandbox.stub(),
      listen: sandbox.stub(),
    };
    nextHandler = routerMiddleware(history)();
    actionHandler = nextHandler(() => expected);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('returns a function to handle next', () => {
    expect(typeof nextHandler).to.equal('function');
    expect(nextHandler.length).to.equal(1);
  });

  it('returns a function to handle an action', () => {
    expect(typeof actionHandler).to.equal('function');
    expect(actionHandler.length).to.equal(1);
  });

  actions.forEach((currentAction) => {
    const { action, type } = currentAction;
    it(`${type} calls history.${action} then breaks middleware chain`, () => {
      const outcome = actionHandler({ type });
      expect(outcome).to.eql(undefined);

      Object.keys(history).forEach((property) => {
        expect(history[property].calledOnce).to.equal((property === action));
      });
    });
  });

  it('LOCATION_CHANGE returns next', () => {
    const action = { type: 'ROUTER/LOCATION_CHANGE' };
    const outcome = actionHandler(action);

    expect(outcome).to.eql(expected);
  });

  it('returns next for other action types', () => {
    const action = { type: 'OTHER' };
    const outcome = actionHandler(action);

    expect(outcome).to.eql(expected);
  });
});
