import { parse } from 'query-string';
import { PUSH, REPLACE, GO, GO_BACK, GO_FORWARD, LOCATION_CHANGE } from './constants';

export const push = href => ({
  type: PUSH,
  payload: href,
});

export const replace = href => ({
  type: REPLACE,
  payload: href,
});

export const go = index => ({
  type: GO,
  payload: index,
});

export const goBack = () => ({
  type: GO_BACK,
});

export const goForward = () => ({
  type: GO_FORWARD,
});

export const locationChange = ({ pathname, search, hash }) => ({
  type: LOCATION_CHANGE,
  payload: {
    pathname,
    search,
    queries: parse(search),
    hash,
  },
});
