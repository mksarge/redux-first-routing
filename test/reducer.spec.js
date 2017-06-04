import { expect } from 'chai';
import { routerReducer } from '../src/reducer';
import { locationChange } from '../src/actions';

const fakeAction = () => ({
  type: 'FAKE_ACTION',
});

describe('reducer', () => {
  it('initializes correctly', () => {
    const expectedResult = {
      pathname: '/',
      search: '',
      queries: {},
      hash: '',
    };
    const actualResult = routerReducer(undefined, fakeAction);

    expect(actualResult).to.eql(expectedResult);
  });

  it('returns the state on action type mismatch', () => {
    const state = {
      url: '/nested/path?with=query#and-hash',
      hash: 'and-hash',
      search: '',
      queries: {
        with: 'query',
      },
    };
    const actualResult = routerReducer(state, fakeAction);

    expect(actualResult).to.eql(state);
  });

  it('handles the locationChange action correctly', () => {
    const previousState = {
      pathname: '/previous',
      search: '',
      hash: '',
    };
    const newLocation = {
      pathname: '/nested/path',
      search: '?with=query',
      hash: '#and-hash',
    };
    const action2 = locationChange(newLocation);
    const actualResult2 = routerReducer(previousState, action2);
    const expectedResult = {
      pathname: '/nested/path',
      search: '?with=query',
      queries: {
        with: 'query',
      },
      hash: '#and-hash',
    };
    expect(actualResult2).to.eql(expectedResult);
  });
});
