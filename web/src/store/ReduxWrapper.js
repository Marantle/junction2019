import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import view from './view';
import purchaseHistory from './purchaseHistory';



const rootReducer = combineReducers({
  view,
  purchaseHistory,
});

const initialState = {};
const middleware = [thunk];
const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));
const store = createStore(rootReducer, initialState, composedEnhancers);

export default ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
