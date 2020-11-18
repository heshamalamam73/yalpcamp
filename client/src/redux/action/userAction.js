import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  SET_CURRENT_USER,
  USER_RIGESTER_REQUEST,
  USER_RIGESTER_SUCCESS,
  USER_RIGESTER_FAIL,
} from "../actionTypes/userActionType";
import axios from "axios";
import setAuthToken from "../helper/setAuthToken";



export function setAuthorizationToken(token) {
  setAuthToken(token);
}

 const setCurrentUser = (user)=> async (dispatch) => {
  dispatch({type:SET_CURRENT_USER, payload:user})
}


const Rigester = (email, password, name) => async (dispatch) => {
  dispatch({
    type: USER_RIGESTER_REQUEST
  });
  try {
    const { data } = await axios.post("api/users/rigester", {
      email,
      password,
      name,
    });
    dispatch({ type: USER_RIGESTER_SUCCESS, payload: data });
    localStorage.setItem("token", JSON.stringify(data.token));
    setAuthorizationToken(data.token);
    dispatch(setCurrentUser(data))




  } catch (error) {
    dispatch({ type: USER_RIGESTER_FAIL, payload: error.message });
  }
};

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST,payload: { email, password }});
  try {
    const { data } = await axios.post("api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("token", JSON.stringify(data.token));
    setAuthorizationToken(data.token);
    dispatch(setCurrentUser(data))
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error });
  }
};
const signout = () => async (dispatch) => {
  localStorage.clear();
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};

export { signin, Rigester, signout ,setCurrentUser }
