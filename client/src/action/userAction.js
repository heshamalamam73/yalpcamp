import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT_FAIL,
  USER_SIGNOUT_REQUEST,
  USER_SIGNOUT_SUCCESS,
  SET_CURRENT_USER,
  USER_RIGESTER_REQUEST,
  USER_RIGESTER_SUCCESS,
  USER_RIGESTER_FAIL,
} from "../constants/userActionType";
import Cookie from "js-cookie";
import axios from "axios";
import setAuthorizationToken from "../components/helper/setAuthToken";
const Rigester = (email, password, name) => async (dispatch) => {
  dispatch({
    type: USER_RIGESTER_REQUEST,
    payload: { email, password, name },
  });
  try {
    const { data } = await axios.post("api/users/rigester", {
      email,
      password,
      name,
    });
    dispatch({ type: USER_RIGESTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_RIGESTER_FAIL, payload: error.message });
  }
};

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
    localStorage.setItem("token", JSON.stringify(data.token));
    setAuthorizationToken(data.token);
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error });
  }
};
const signout = () => async (dispatch) => {
  dispatch({ type: USER_SIGNOUT_REQUEST });
  localStorage.removeItem("token");
  Cookie.remove("userInfo");
  dispatch({ type: USER_SIGNOUT_SUCCESS });
};

export { signin, Rigester, signout };
