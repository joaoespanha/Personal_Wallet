import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
// configure aqui sua store

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
if (window.Cypress) {
  window.store = store;
}

export default store;
