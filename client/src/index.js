import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { setAuthorizationToken, setCurrentUser } from "./redux/action/userAction";
import jwtDecode from "jwt-decode"; 


if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.token)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
  }
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
