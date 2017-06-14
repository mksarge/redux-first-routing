![Usage with Redux JSON Router](https://camo.githubusercontent.com/23fdc8a4b2e8c0e98a27cc85bf192dd799f4013f/687474703a2f2f692e696d6775722e636f6d2f4b41574a7335392e6a7067)

## Usage with Redux JSON Router

[`redux-json-router`](https://github.com/mksarge/redux-json-router) provides declarative bindings for routing and navigation in React via `<Router/>` and `<Link/>` components. It uses `redux-first-routing` as an internal dependency — not a peer dependency.

> Learn more: https://github.com/mksarge/redux-json-router

Here's a basic setup without the use of the webpack loader:

```
npm install --save redux-json-router
```

```js
/* ---------- routes.js ---------- */
const routes = [
  {
    path: '/',
    load: () => Promise.resolve(require('./pages/Home').default),
  },
  {
    path: '/docs',
    load: () => Promise.resolve(require('./pages/Docs').default),
    children: [
      {
        path: '/:id',
        load: () => Promise.resolve(require('./pages/Post').default),
      },
    ],
  },
  {
    path: '*',
    load: () => Promise.resolve(require('./pages/Error').default),
  },
];

/* ---------- store.js ---------- */
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { routerReducer, routerMiddleware } from 'redux-json-router'
// import { otherReducers } from './reducers'

const configureStore = (history, initialState = {}) => {
  // Add the reducer, which adds location state to the store
  const rootReducer = combineReducers({
    // ...otherReducers,
    router: routerReducer, // Convention is to use the "router" property
  })

  // Build the middleware with the history object
  const middleware = routerMiddleware(history)

  // Create the store
  return createStore(rootReducer, initialState, applyMiddleware(middleware))
}

/* ---------- main.js ---------- */
import { createBrowserHistory, startListener, push, replace } from 'redux-json-router'

// Create the history object
const history = createBrowserHistory()

// Create the store, passing it the history object
const store = configureStore(history)

// Start the history listener, which automatically dispatches actions to keep the store in sync with the history
startListener(history, store)

// Render the application using <Router/>
render(
  <Provider store={store}>
    <Router routes={routes} />
  </Provider>,
  document.getElementById('app'));
```
