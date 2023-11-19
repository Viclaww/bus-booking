import {
  BOOK_TRANSIT,
  ADD_TRANSIT,
  REMOVE_TRANSIT,
  FETCH_TRANSITS_FAILURE,
  FETCH_TRANSITS_SUCCESS,
  FETCH_TRANSITS_REQUEST,
} from "../actionTypes";

const initialState = {
  transits: [],
  isLoading: false,
  error: null,
};

const transitReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TRANSIT_SUCCESS":
      return {
        ...state,
        transits: [...state.transits, action.payload],
        isLoading: false,
        error: null,
      };
    case "ADD_TRANSIT_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case FETCH_TRANSITS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case FETCH_TRANSITS_SUCCESS:
      return {
        ...state,
        transits: action.payload,
        isLoading: false,
      };

    case FETCH_TRANSITS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case REMOVE_TRANSIT:
      return {
        ...state,
        transits: state.transits.filter(
          (transit) => transit.id !== action.payload
        ),
      };

    case BOOK_TRANSIT:
      const updatedTransits = state.transits.map((transit) => {
        if (transit.id === action.payload.transitId) {
          return {
            ...transit,
            bookedBy: [...transit.bookedBy, action.payload.userId],
          };
        }
        return transit;
      });

      return {
        ...state,
        transits: updatedTransits,
      };

    default:
      return state;
  }
};

export default transitReducer;
