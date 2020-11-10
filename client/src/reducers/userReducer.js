import isEmpty from "lodash/isEmpty";

const {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT_REQUEST,
  USER_SIGNOUT_SUCCESS,
  USER_SIGNOUT_FAIL,
  USER_RIGESTER_SUCCESS,
  SET_CURRENT_USER,
  USER_RIGESTER_FAIL,
  USER_RIGESTER_REQUEST,
} = require("../constants/userActionType");
function userRigesterReducer(state = {}, action) {
  switch (action.type) {
    case USER_RIGESTER_REQUEST:
      return { loading: true };
    case USER_RIGESTER_SUCCESS:
      return { loading2: false, data: action.payload };
    case USER_RIGESTER_FAIL:
      return { loading2: false, error2: action.payload };
    default:
      return state;
  }
}
const initialState = {
  isAuthenticated: localStorage.token ? true : false,
  userInfo: {},
};

function userSigninReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true, isAuthenticated: false };
    case USER_SIGNIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload, isAuthenticated: false };
    default:
      return state;
  }
}

function userSignoutReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNOUT_REQUEST:
      return { loading: true, isAuthenticated: true };
    case USER_SIGNOUT_SUCCESS:
      return { loading: false, userInfo: null, isAuthenticated: false };
    case USER_SIGNOUT_FAIL:
      return { loading: false, error: action.payload, isAuthenticated: true };
    default:
      return state;
  }
}

export { userSigninReducer, userRigesterReducer, userSignoutReducer };
