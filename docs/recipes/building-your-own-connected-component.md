## Building your own connected component

Here's an example of how you might wrap the `push` and `replace` actions into a declarative, store-connected `<Link/>` component for React:

```js
import React from 'react';
import { connect } from 'react-redux';
import { push as pushAction, replace as replaceAction } from './actions';

const Link = (props) => {
  const { to, replace, onClick, children, dispatch, ...other } = props;

  const handleClick = (event) => {
    // Ignore any click other than a left click
    if ((event.button && event.button !== 0)
      || event.metaKey
      || event.altKey
      || event.ctrlKey
      || event.shiftKey
      || event.defaultPrevented === true) {
      return;
    }
  
    // Prevent page reload
    event.preventDefault();

    // Execute onClick callback, if it exists
    if (onClick){
      onClick(event)
    }

    // Dispatch the appropriate navigation action
    if (replace) {
      dispatch(replaceAction(to));
    } else {
      dispatch(pushAction(to));
    }

  };

  return (
    <a href={to} onClick={handleClick} {...other}>
      {children}
    </a>);
};

export default connect()(Link);
```

#### Usage

```js
// Push "/about" onto the history stack
<Link to="/about" />

// Replace the current entry in the history stack with "/about"
<Link to="/about" replace />
```

#### Resources

- [An Introduction to the Redux-First Routing Model](https://medium.com/@mksarge/an-introduction-to-the-redux-first-routing-model-98926ebf53cb)
- [`redux-json-router`](https://github.com/mksarge/redux-json-router)
