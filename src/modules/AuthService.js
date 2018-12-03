const LOGINSUCCESS = "SUCESS";
const LOGINFAILED = "FAILED";
const LOGINPENDING = "PENDING";
const LOGOUT = "LOGOUT";

const SIGNUPSUCCESS = "SUCESS";
const SIGNUPFAILED = "FAILED";
const SIGNUPPENDING = "PENDING";
const initState = {
  isSignUpPending: false,
  isLoginSuccess : false,
  isLoginPending: false,
  error: undefined,
  token: ""
};
import { Actions } from "react-native-router-flux";
export default function reducer(state = initState, action = {}) {
  console.log("reducer", action);
  switch (action.type) {
    // LoginActions
    case LOGINSUCCESS:
      return Object.assign({}, state, {
        isLoginPending: false,
        isLoginSuccess : true,
        token: action.token
      });
    case LOGINFAILED: {
      return Object.assign({}, state, {
        isLoginPending: false,
        isLoginSuccess : false,
        error: action.error
      });
    }
    case LOGINPENDING: {
      return Object.assign({}, state, {
        isLoginSuccess : false,
        isLoginPending: true
      });
    }

    ///Signup Actions
    case SIGNUPSUCCESS:
      return Object.assign({}, state, {
        isSignUpPending: false
      });
    case SIGNUPFAILED: {
      return Object.assign({}, state, {
        isSignUpPending: false,
        error: action.error
      });
    }
    case SIGNUPPENDING: {
      return Object.assign({}, state, {
        isSignUpPending: true
      });
    }
    //Logout Actions
    case LOGOUT: {
      return Object.assign({}, state, {
        isLoginPending: false
      });
    }
    default:
      return state;
  }
}
// Login Action
export const loginsuccess = token => {
  return {
    type: LOGINSUCCESS,
    token: token
  };
};
export const loginfailed = error => {
  return {
    type: LOGINFAILED,
    error: error
  };
};

export const loginpending = data => {
  return {
    type: LOGINPENDING
  };
};

// SignUp Action
export const signupsuccess = token => {
  return {
    type: SIGNUPSUCCESS,
    token: token
  };
};
export const signupfailed = error => {
  return {
    type: SIGNUPFAILED,
    error: error
  };
};

export const signuppending = data => {
  return {
    type: SIGNUPPENDING
  };
};

// Logout Action
export const logout = () => {
  return {
    type: LOGOUT
  };
};
