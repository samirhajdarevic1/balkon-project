import { applyMiddleware, legacy_createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

// const store = legacy_createStore();

// store.subscribe(() => console.log(store.getState()));

const middlewares = [thunk];

const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
