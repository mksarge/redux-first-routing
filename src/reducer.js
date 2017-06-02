import { LOCATION_CHANGE } from './constants';

const getInitialState = {
  pathname: '/',
  search: '',
  hash: '',
};

export const routerReducer = (state = getInitialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        pathname: action.payload.pathname,
        search: action.payload.search,
        hash: action.payload.hash,
      };
    default:
      return state;
  }
};
