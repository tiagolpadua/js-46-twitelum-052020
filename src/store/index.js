import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { tweetsReducer } from "./ducks/tweets";
const store = createStore(
  combineReducers({
    tweets: tweetsReducer,
  }),
  applyMiddleware(thunkMiddleware)
);
console.log(`Primeira versão da store:`, store.getState());
// window.store = store;
export default store;
