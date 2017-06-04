![Usage with Universal Router](https://camo.githubusercontent.com/381e787f15ad1f830a41d3e261157ae07d9f3999/687474703a2f2f692e696d6775722e636f6d2f557a51745934542e6a7067)

# Usage with Universal Router

Basic usage with [`universal-router`](https://github.com/kriasoft/universal-router).

> View on jsfiddle: https://jsfiddle.net/j21n36sj/

```js
// routes.js
export [
  {
    path: '/',
    action: () => `<h1>Home</h1>`
  },
  {
    path: '/posts',
    action: () => console.log('checking child routes for /posts'),
    children: [
      {
        path: '/',
        action: () => `<h1>Posts</h1>`
      },
      {
        path: '/:id',
        action: (context) => `<h1>Post #${context.params.id}</h1>`
      }
    ]
  },
];
```

```js
// store.js
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'redux-first-routing';

const rootReducer = combineReducers({
  location: routerReducer,
  // other reducers
});

export function configureStore(history, initialState = {}) {
  const middlewares = [
    routerMiddleware(history),
    // other middlewares
  ];

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers),
  );

  return store;
}
```

```js
// index.js
import { createBrowserHistory } from 'redux-first-routing';
import configureStore from './store';
import routes from './routes';

// create history
const history = createBrowserHistory();

// create store
const store = configureStore(history);

// start history listener
startListener(history, store)

// create router
const router = new UniversalRouter(routes);

// render function
function render (pathname) {
  router.resolve(pathname).then(html => {
    document.body.innerHTML = html;
  });
}

// get the current location
let currentLocation = store.getState().router.pathname

// subscribe to changes in the store
let unsubscribe = store.subscribe(() => {
  let previousLocation = currentValue
  currentValue = store.getState().router.pathname

  if (previousLocation !== currentLocation) {
    console.log(`Location changed from ${previousValue} to ${currentValue}`)
    render(currentValue)
  }
})

// initial render
render(currentLocation)

// navigate by dispatching a navigation action
store.dispatch(push('/about'))
```
