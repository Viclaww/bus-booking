import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_LOADING,
} from "../actionTypes";

const initialState = {
  user: sessionStorage.getItem("bb-user")
    ? JSON.parse(sessionStorage.getItem("bb-user"))
    : null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload, // Update user data when registration or login is successful
        error: null,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
