import {
  FETCH_BOOKED_TRANSITS_REQUEST,
  FETCH_BOOKED_TRANSITS_SUCCESS,
  FETCH_BOOKED_TRANSITS_FAILURE,
} from "../actionTypes";

const initialState = {
  bookedTransits: [],
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKED_TRANSITS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case FETCH_BOOKED_TRANSITS_SUCCESS:
      return {
        ...state,
        bookedTransits: action.payload,
        isLoading: false,
        error: null,
      };

    case FETCH_BOOKED_TRANSITS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // Add other cases if needed

    default:
      return state;
  }
};

export default userReducer;
