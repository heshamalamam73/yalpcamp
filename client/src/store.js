import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import Cookie from "js-cookie";

import {
  userSigninReducer,
  userRigesterReducer,
  userSignoutReducer,
} from "./reducers/userReducer.js";
import thunk from "redux-thunk";
const userInfo = localStorage.userInfo || null;
const isAuthenticated = localStorage.token ? true : false;

const initialState = {
  userSignin: { userInfo },
  userRigester: {},
  isAuthenticated,
};
const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRigester: userRigesterReducer,
  userLogout: userSignoutReducer,
});
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
