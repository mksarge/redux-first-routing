# Redux-First Routing [![npm version](https://img.shields.io/npm/v/redux-first-routing.svg?style=flat)](https://www.npmjs.org/package/redux-first-routing) [![build status](https://api.travis-ci.org/mksarge/redux-first-routing.svg?branch=master)](https://travis-ci.org/mksarge/redux-first-routing/)

Achieve client-side routing *the Redux way*:

- Read location data from the store.
- Update the location by dispatching navigation actions.
- Let middleware handle the side-effect of history navigation.

![Redux-first routing](https://camo.githubusercontent.com/b08b1b78a08e0444ab451f692618d59da977e6a1/687474703a2f2f692e696d6775722e636f6d2f734169566c6b4d2e6a7067)

## Ideology

This library wraps [`history`](https://github.com/ReactTraining/history) and provides a minimal, framework-agnostic base for accomplishing Redux-first routing. **It does not provide the actual *router* component.**

Instead, you can pair it with a [compatible router](#compatible-routers) to create a complete routing solution. If you're coming from React Router, you might compare this package to [`react-router-redux`](https://github.com/reactjs/react-router-redux).

## Installation

Install the library from [npm](https://www.npmjs.org/package/redux-first-routing):

```
npm install --save redux-first-routing
```

Or, use the following script tag to access the [latest UMD build](https://unpkg.com/redux-first-routing/dist) on `window.ReduxFirstRouting`:

```html
<script src="https://unpkg.com/redux-first-routing/dist/redux-first-routing.min.js"></script>
```

## Usage

#### Basic Usage

```js
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { createBrowserHistory, routerReducer, routerMiddleware, startListener, push } from 'redux-first-routing'
import { otherReducers } from './reducers'

// Create the history object
const history = createBrowserHistory()

// Add the reducer, which adds location state to the store
const rootReducer = combineReducers({
  ...otherReducers,
  router: routerReducer // Convention is to use the "router" property
})
  
// Build the middleware, which intercepts navigation actions and calls the corresponding history method
const middleware = routerMiddleware(history)

// Create the store
const store = createStore(rootReducer, {}, applyMiddleware(middleware))

// Start the history listener, which automatically dispatches actions to keep the store in sync with the history
startListener(history, store)

// Now you can read the location from the store!
let currentLocation = store.getState().router.pathname

// You can also subscribe to changes in the location!
let unsubscribe = store.subscribe(() => {
  let previousLocation = currentLocation
  currentLocation = store.getState().router.pathname

  if (previousLocation !== currentLocation) {
    console.log(`Location changed from ${previousLocation} to ${currentLocation}`)
    // Render your application reactively here (optionally using a compatible router)
  }
})

// And you can dispatch navigation actions from anywhere!
store.dispatch(push('/about'))
```

#### State Shape

There are dozens of ways to design the state shape of the location data, and this project must by nature choose an opinionated design:

```js
// URL: www.example.com/nested/path?with=query#and-hash
{
  router: {
    pathname: '/nested/path/',
    search: '?with=query',
    queries: {
      with: 'query'
    },
    hash: '#and-hash'
  }
}
```

> If the current design doesn't fit your needs, feel free to open an issue or fork the project.

#### Compatible Routers

For a routing library to work seamlessly with `redux-first-routing`, **it must not be heavily coupled with the browser history**. For example, React Router [wraps its own instance of `history`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/BrowserRouter.js#L18-L21), so a more integrated solution like `react-router-redux` is necessary.

The following libraries provide router components that just focus on the *routing* and/or *rendering* part, making them great matches for `redux-first-routing`:

- [Universal Router](https://github.com/kriasoft/universal-router) (framework-agnostic)
- [Redux JSON Router](https://github.com/mksarge/redux-json-router) (React)

> For full examples of usage, see [Recipies](#documentation). To add to this list, feel free to send a pull request.

## Documentation

- [API](/blob/master/docs/api.md)
- Recipies
  - [Usage with Universal Router](/blob/master/docs/recipes/usage-with-universal-router.md)

## Contributing

Contributions are welcome and are greatly appreciated!  :tada:

Feel free to file an issue, start a discussion, or send a pull request.

## License

MIT
