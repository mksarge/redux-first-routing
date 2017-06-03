![Basic Usage](https://camo.githubusercontent.com/b08b1b78a08e0444ab451f692618d59da977e6a1/687474703a2f2f692e696d6775722e636f6d2f734169566c6b4d2e6a7067)

# Basic Usage

In the Redux store configuration file:
- import the reducer and the middleware
- add the reducer to the root reducer (convention: under the`location` property)
- add the middleware to the array, passing it the history object created in the application entry point (shown below):

```js
// store.js
import { routerMiddleware, routerReducer } from 'redux-first-routing';

// create root reducer
const rootReducer = combineReducers({
  location: routerReducer,
  // other reducers
});

export function configureStore(history, initialState = {}) {
  // pass a history object to routerMiddleware
  const middlewares = [
    routerMiddleware(history),
    // other middlewares
  ];
  
  const enhancers = [applyMiddleware(...middlewares)];
  
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers));
}
```

In the application’s entry point:
- create the `history` object
- create the store, passing it the `history` object
- start the history listener
- render the application

```js
// index.js
import { createBrowserHistory, startListener } from 'redux-first-routing';
import configureStore from './store';

// create history
const history = createBrowserHistory();

// create store
const store = configureStore(history);

// start listening for changes in location
startListener(history, store);

// render application
...

// navigate by dispatching a navigation action
store.dispatch(push('/about'))
```

Learn more:
- [Usage with Universal Router](https://github.com/mksarge/redux-first-routing/blob/master/docs/usage-with-universal-router.md)
