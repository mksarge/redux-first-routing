import { PUSH, REPLACE, GO, GO_BACK, GO_FORWARD } from './constants';

// eslint-disable-next-line consistent-return
export const routerMiddleware = history => () => next => (action) => {
  switch (action.type) {
    case PUSH:
      history.push(action.payload);
      break;
    case REPLACE:
      history.replace(action.payload);
      break;
    case GO:
      history.go(action.payload);
      break;
    case GO_BACK:
      history.goBack();
      break;
    case GO_FORWARD:
      history.goForward();
      break;
    default:
      return next(action);
  }
};
