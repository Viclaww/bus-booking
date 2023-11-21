import {
  ADD_TRANSIT_SUCCESS,
  REMOVE_TRANSIT,
  BOOK_TRANSIT_REQUEST,
  BOOK_TRANSIT_SUCCESS,
  BOOK_TRANSIT_FAILURE,
  FETCH_TRANSITS_REQUEST,
  FETCH_TRANSITS_SUCCESS,
  FETCH_TRANSITS_FAILURE,
  SEARCH_TRANSITS_REQUEST,
  SEARCH_TRANSITS_SUCCESS,
  SEARCH_TRANSITS_FAILURE,
  SEARCH_CLICKED,
} from "../actionTypes";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  doc,
  query,
  where,
  updateDoc,
  getDocs,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { toast } from "react-toastify";

export const addTransit = (transitData) => async (dispatch) => {
  try {
    const transitRef = await addDoc(collection(db, "transits"), transitData);

    // Check if transitRef.id exists before using it
    if (transitRef.id) {
      const newTransit = { ...transitData, id: transitRef.id };

      dispatch({
        type: ADD_TRANSIT_SUCCESS,
        payload: newTransit,
      });

      toast.success("Transit Added");
    } else {
      toast.error("Error adding transit to Firestore: No document ID");
    }
  } catch (error) {
    toast.error("Error adding transit to Firestore:", error);
  }
};

const fetchTransitsRequest = () => ({
  type: FETCH_TRANSITS_REQUEST,
});

const fetchTransitsSuccess = (transits) => ({
  type: FETCH_TRANSITS_SUCCESS,
  payload: transits,
});

const fetchTransitsFailure = () => ({
  type: FETCH_TRANSITS_FAILURE,
  payload: error,
});

export const fetchTransits = (searchQuery) => async (dispatch) => {
  dispatch(fetchTransitsRequest());

  try {
    const transitCollection = collection(db, "transits");
    const transitSnapshot = await getDocs(transitCollection);
    let transits = [];

    if (!transitSnapshot.empty) {
      transits = transitSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }

    dispatch(fetchTransitsSuccess(transits));
  } catch (error) {
    console.error("Error fetching transits:", error);
    dispatch(fetchTransitsFailure());
  }
};

export const removeTransit = (transitId) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "transits", transitId));
    dispatch({
      type: REMOVE_TRANSIT,
      payload: transitId,
    });
    toast.success("Transit Removed");
  } catch (error) {
    console.error("Error removing transit from Firestore:", error);
  }
};

const bookTransitRequest = () => ({
  type: BOOK_TRANSIT_REQUEST,
});

const bookTransitSuccess = (transitId, userId) => ({
  type: BOOK_TRANSIT_SUCCESS,
  payload: { transitId, userId },
});

const bookTransitFailure = (error) => ({
  type: BOOK_TRANSIT_FAILURE,
  payload: error,
});

// transitAction.jsx

export const bookTransit =
  (transitId, userId, selectedSeat) => async (dispatch, getState) => {
    dispatch({ type: BOOK_TRANSIT_REQUEST });

    try {
      const state = getState();
      const { transits } = state.transitReducer;
      const transitToUpdate = transits.find(
        (transit) => transit.id === transitId
      );

      if (!transitToUpdate) {
        throw new Error("Transit not found");
      }

      // Check if the selected seat is available
      if (transitToUpdate.bookedSeats.includes(selectedSeat)) {
        throw new Error("Seat is already booked");
      }

      // Check if transit has reached capacity
      if (transitToUpdate.bookedSeats.length >= transitToUpdate.capacity) {
        throw new Error("Transit is fully booked");
      }

      // Update transit data
      const updatedTransit = {
        ...transitToUpdate,
        bookedSeats: [...transitToUpdate.bookedSeats, selectedSeat],
        bookedBy: [...transitToUpdate.bookedBy, { userId, seat: selectedSeat }],
      };

      // Perform the update in Firestore or your preferred backend
      // ...

      dispatch({
        type: BOOK_TRANSIT_SUCCESS,
        payload: { transitId, updatedTransit },
      });

      // Additional success actions
    } catch (error) {
      dispatch({
        type: BOOK_TRANSIT_FAILURE,
        payload: error.message,
      });

      // Additional error handling
    }
  };

export const searchTransits = (fromCity, toCity) => async (dispatch) => {
  dispatch({ type: SEARCH_CLICKED });
  dispatch({ type: SEARCH_TRANSITS_REQUEST });

  try {
    const transitCollection = collection(db, "transits");
    const q = query(
      transitCollection,
      where("From", "==", fromCity),
      where("To", "==", toCity)
    );
    const transitSnapshot = await getDocs(q);
    const transits = transitSnapshot.docs.map((doc) => doc.data());

    dispatch({ type: SEARCH_TRANSITS_SUCCESS, payload: transits });
  } catch (error) {
    console.error("Error searching transits:", error);
    dispatch({ type: SEARCH_TRANSITS_FAILURE, payload: error.message });
  }
};
