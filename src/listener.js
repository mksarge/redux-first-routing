import { locationChange } from './actions';

export function startListener(history, store) {
  store.dispatch(locationChange(
    history.location.pathname,
    history.location.search,
    history.location.hash));

  history.listen((location) => {
    store.dispatch(locationChange(
      location.pathname,
      location.search,
      location.hash));
  });
}
