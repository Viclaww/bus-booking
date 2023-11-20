import {
  BOOK_TRANSIT_REQUEST,
  BOOK_TRANSIT_SUCCESS,
  BOOK_TRANSIT_FAILURE,
  REMOVE_TRANSIT,
  FETCH_TRANSITS_FAILURE,
  FETCH_TRANSITS_SUCCESS,
  FETCH_TRANSITS_REQUEST,
} from "../actionTypes";

const initialState = {
  transits: [],
  isLoading: false,
  error: null,
  isBooking: false,
  bookingError: null,
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

    case BOOK_TRANSIT_REQUEST:
      return {
        ...state,
        isBooking: true,
        bookingError: null,
      };

    case BOOK_TRANSIT_SUCCESS:
      const initialBookedBy = Array.isArray(action.payload.bookedBy)
        ? action.payload.bookedBy
        : [];

      return {
        ...state,
        isBooking: false,
        bookingError: null,
        transits: state.transits.map((transit) =>
          transit.id === action.payload.transitId
            ? {
                ...transit,
                bookedBy: [...initialBookedBy, action.payload.userId],
              }
            : transit
        ),
      };

    case BOOK_TRANSIT_FAILURE:
      return {
        ...state,
        isBooking: false,
        bookingError: action.payload,
      };

    default:
      return state;
  }
};

export default transitReducer;
