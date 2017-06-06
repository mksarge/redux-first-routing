## API Reference

Here's a look at the top-level exports in [`src/index.js`](https://github.com/mksarge/redux-first-routing/blob/master/src/index.js):

```js
// History API
export { createBrowserHistory } from './history';
export { startListener } from './listener';

// Redux API
export { PUSH, REPLACE, GO, GO_BACK, GO_FORWARD, LOCATION_CHANGE } from './constants';
export { push, replace, go, goBack, goForward, locationChange } from './actions';
export { routerMiddleware } from './middleware';
export { routerReducer } from './reducer';
```

#### Redux API
  - `push()`, `replace()`, `go()`, `goBack()`, `goForward()`
    - Public action creators used to update the location.
    - **Use these navigation actions instead of calling the [`history` navigation methods](https://github.com/ReactTraining/history#navigation) directly!**
  - `location_Change()`
    - The action dispatched by `startListener`. (Don't use this!)
  - `PUSH`, `REPLACE`, `GO`, `GO_BACK`, `GO_FORWARD`, `LOCATION_CHANGE`
    - Public action types for use in user-defined middleware.
  - `routerMiddleware(history)`
    - Intercepts the navigation actions to update the browser history.
  - `routerReducer`
    - Adds the location data (`pathname`, `search`, `hash`) to the state tree upon receiving a `LOCATION_CHANGE` action.

#### History API
  - `createBrowserHistory()`
    - Creates a `history` object.
  - `startListener(history, store)`
    - Creates a `history` [listener](https://github.com/ReactTraining/history#listening) that responds to the middleware and external navigation by dispatching a `locationChange` action.
