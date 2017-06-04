import { locationChange } from './actions';

export function startListener(history, store) {
  store.dispatch(locationChange({
    pathname: history.location.pathname,
    search: history.location.search,
    hash: history.location.hash,
  }));

  history.listen((location) => {
    store.dispatch(locationChange({
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    }));
  });
}
