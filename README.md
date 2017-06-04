# Redux-First Routing

Achieve client-side routing *the Redux way*:

- Read location data from the store.
- Update the location by dispatching navigation actions.
- Let middleware handle the side-effect of history navigation.

![Redux-first routing](https://camo.githubusercontent.com/b08b1b78a08e0444ab451f692618d59da977e6a1/687474703a2f2f692e696d6775722e636f6d2f734169566c6b4d2e6a7067)

## Ideology

This library wraps [`history`](https://github.com/ReactTraining/history) and provides a framework-agnostic base for accomplishing Redux-first routing. For a complete routing solution, pair it with a compatible client-side routing library (see [Recipies](#recipies) for examples).

## Recipies

- [Basic Usage](https://github.com/mksarge/redux-first-routing/blob/master/docs/basic-usage.md)
- [Usage with Universal Router](https://github.com/mksarge/redux-first-routing/blob/master/docs/usage-with-universal-router.md)

## API

#### State Shape

There are dozens of ways to design the state shape of the location data, and this project by nature must choose a single, opinonated implementation. Here is the current design:

```js
{
  ..., // other redux state 
  location: {
    pathname: '/nested/path/',
    search: '?with=query',
    queries: {
      with: 'query',
    },
    hash: '#and-hash'
  }
}
// current location: 'www.website.com/nested/path?with=query#and-hash'
```

#### Exports

Here's a look at the exports in [`src/index.js`](https://github.com/mksarge/redux-first-routing/blob/master/src/index.js):

```js
// History API
export { createBrowserHistory } from 'history/createBrowserHistory';
export { startListener } from './listener';

// Redux API
export { PUSH, REPLACE, GO, GO_BACK, GO_FORWARD, LOCATION_CHANGE } from './constants';
export { push, replace, go, goBack, goForward, locationChange } from './actions';
export { routerMiddleware } from './middleware';
export { routerReducer } from './reducer';
```

- **Redux API**
  - `push()`, `replace()`, `go()`, `goBack()`, `goForward()`
    - Public action creators used to update the location.
    - **Use these navigation actions instead of calling the `history` navigation methods directly!**
  - `PUSH`, `REPLACE`, `GO`, `GO_BACK`, `GO_FORWARD`
    - Public action types for use in user-defined middleware.
  - `routerMiddleware(history)`
    - Intercepts the navigation actions to update the browser history.
  - `routerReducer`
    - Adds the location data (`pathname`, `search`, `hash`) to the state tree upon receiving a `LOCATION_CHANGE` action.
- **History API**
  - `createBrowserHistory()`
    - Creates a `history` object.
  - `startListener(history, store)`
    - Creates a `history` [listener](https://github.com/ReactTraining/history#listening) that responds to the middleware and external navigation by dispatching a `locationChange` action.

## Contributing

Contributions are welcome and are greatly appreciated!  :tada:

Feel free to file an issue, start a discussion, or send a pull request.

## License

MIT
