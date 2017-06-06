import { parse } from 'query-string';
import { LOCATION_CHANGE } from './constants';

const getInitialState = {
  pathname: '/',
  search: '',
  queries: {},
  hash: '',
};

export const routerReducer = (state = getInitialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        ...action.payload,
        queries: parse(action.payload.search),
      };
    default:
      return state;
  }
};
