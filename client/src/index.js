import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import Cookie from "cookie";
import { setAuthorizationToken, signin } from "./action/userAction";
import jwtDecode from "jwt-decode";

if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  // try {
  //   store.dispatch(signin(jwtDecode(localStorage.token)));
  // } catch (err) {
  //   store.dispatch(signin({}));
  // }
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
