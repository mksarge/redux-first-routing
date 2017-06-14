![Usage with Universal Router](https://camo.githubusercontent.com/381e787f15ad1f830a41d3e261157ae07d9f3999/687474703a2f2f692e696d6775722e636f6d2f557a51745934542e6a7067)

## Usage with Universal Router

Basic usage with [`universal-router`](https://github.com/kriasoft/universal-router).

Follow the discussion: https://github.com/kriasoft/universal-router/issues/99

View the live demo on jsfiddle: https://jsfiddle.net/ytf6q4ru/

```sh
npm install --save redux-first-routing universal-router
```

```js
/* ---------- routes.js ---------- */
const routes = [
  {
    path: '/',
    action: () => '<h1 on>Home</h1>',
  },
  {
    path: '/posts',
    action: () => console.log('checking child routes for /posts'),
    children: [
      {
        path: '/',
        action: () => '<h1>Posts</h1>',
      },
      {
        path: '/:id',
        action: (context) => `<h1>Post #${context.params.id}</h1>`,
      },
    ],
  },
]

/* ---------- store.js ---------- */
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { routerReducer, routerMiddleware } from 'redux-first-routing'
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
import { createBrowserHistory, startListener, push, replace } from 'redux-first-routing'
import UniversalRouter from 'universal-router'

// Create the history object
const history = createBrowserHistory()

// Create the store, passing it the history object
const store = configureStore(history)

// Start the history listener, which automatically dispatches actions to keep the store in sync with the history
startListener(history, store)

// Create the router
const router = new UniversalRouter(routes)

// Create the reactive render function
function render(pathname) {
  router.resolve(pathname).then((html) => {
    document.body.innerHTML = html
  })
}

// Get the current pathname
let currentLocation = store.getState().router.pathname

// Subscribe to the store location
const unsubscribe = store.subscribe(() => {
  const previousLocation = currentLocation
  currentLocation = store.getState().router.pathname

  if (previousLocation !== currentLocation) {
    console.log('Some deep nested property changed from', previousLocation, 'to', currentLocation)
    render(currentLocation)
  }
})

// Call render function once, on app start
render(currentLocation)

// Continue dispatching location changes as you please!
store.dispatch(push('/posts'))
```
