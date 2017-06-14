# Redux-First Routing [![npm version](https://img.shields.io/npm/v/redux-first-routing.svg?style=flat)](https://www.npmjs.org/package/redux-first-routing) [![build status](https://api.travis-ci.org/mksarge/redux-first-routing.svg?branch=master)](https://travis-ci.org/mksarge/redux-first-routing/)

Achieve client-side routing *the Redux way*:

- Read location data from the store.
- Update the location by dispatching navigation actions.
- Let middleware handle the side-effect of history navigation.

> **Learn more: [An Introduction to the Redux-First Routing Model](https://medium.com/@mksarge/an-introduction-to-the-redux-first-routing-model-98926ebf53cb)**

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
  },
  ... // other redux state
}
```

The [`query-string`](https://github.com/sindresorhus/query-string) package is used internally to parse the `search` string into the `queries` object.

#### Compatible Routers

For a router to work seamlessly with `redux-first-routing`, it must not be tightly coupled to the browser history/navigation code. The following libraries meet that criteria by providing router components that focus solely on the *routing* and/or *rendering* part:

- [Universal Router](https://github.com/kriasoft/universal-router) (framework-agnostic)
- [Redux JSON Router](https://github.com/mksarge/redux-json-router) (React)

> For examples of usage, see [Recipies](#documentation). To add to this list, feel free to send a pull request.

## Documentation

- [API](/docs/api.md)
- Recipies
  - [Usage with Universal Router](/docs/recipes/usage-with-universal-router.md)
  - [Usage with Redux JSON Router](/docs/recipes/usage-with-redux-json-router.md)
  - [Building your own connected component](/docs/recipes/building-your-own-connected-component.md)

## Credits

The concept of "Redux-first routing" isn't particularly new — everything in this library has existed in one form or another across various other Redux routing libraries and packages. You may find a long list of similar projects (some of which may be classified as Redux-first routing libraries) here:

- https://github.com/markerikson/redux-ecosystem-links/blob/master/routing.md

Notable influences:

- [`react-router-redux`](https://github.com/reactjs/react-router-redux)
- [`redux-little-router`](https://github.com/FormidableLabs/redux-little-router)
- [`universal-redux-router`](https://github.com/colinmeinke/universal-redux-router)

## Contributing

Contributions are welcome and are greatly appreciated!  :tada:

Feel free to file an issue, start a discussion, or send a pull request.

## License

MIT
