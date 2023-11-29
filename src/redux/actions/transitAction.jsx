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
  FETCH_BOOKED_SEATS_REQUEST,
  FETCH_BOOKED_SEATS_SUCCESS,
  FETCH_BOOKED_SEATS_FAILURE,
  SEARCH_CLICKED,
} from "../actionTypes";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  doc,
  query,
  where,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { toast } from "react-toastify";

export const addTransit = (transitData) => async (dispatch) => {
  try {
    const transitDataWithDefaults = {
      ...transitData,
      bookedSeats: [],
      bookedBy: [],
    };
    const transitRef = await addDoc(
      collection(db, "transits"),
      transitDataWithDefaults
    );

    if (transitRef.id) {
      const newTransit = {
        ...transitDataWithDefaults,
        id: transitRef.id,
      };

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

export const bookTransit =
  (transitId, userId, selectedSeat) => async (dispatch) => {
    try {
      const transitDocRef = doc(db, "transits", transitId);

      // Get the current transit data
      const transitDocSnapshot = await getDoc(transitDocRef);
      const transitData = transitDocSnapshot.data();

      // Check if bookedBy is an array and contains the userId
      if (transitData.bookedBy.some((booking) => booking.userId === userId)) {
        toast.error("You have already booked a seat in this transit.");
        console.error("User has already booked a seat in this transit.");
        return;
      }

      if (transitData.bookedSeats.includes(selectedSeat)) {
        toast.error("Seat is already taken. Please choose another seat.");
        console.error("Seat is already taken. Please choose another seat.");
        return;
      }

      // Check if the transit is at full capacity
      if (transitData.bookedBy.length >= transitData.Capacity) {
        toast.error("Transit booked to full capacity");
        console.error("Transit is at full capacity. Cannot book more seats.");
        return;
      }

      const ticketId = uuidv4();

      // Update the bookedBy field to include the userId
      const updatedBookedBy = [
        ...transitData.bookedBy,
        { userId, selectedSeat, ticketId },
      ];

      // Update the bookedSeats array to include the selected seat
      const updatedBookedSeats = [...transitData.bookedSeats, selectedSeat];

      // Update the transit document
      await updateDoc(transitDocRef, {
        bookedBy: updatedBookedBy,
        bookedSeats: updatedBookedSeats,
      });

      // Dispatch the success action
      dispatch({
        type: BOOK_TRANSIT_SUCCESS,
        payload: { transitId, userId, selectedSeat },
      });
      toast.success("Transit booked successfully");
      // Additional logic or dispatch actions can be added here if needed
    } catch (error) {
      console.error("Book error", error.message);
      dispatch({
        type: BOOK_TRANSIT_FAILURE,
        payload: error.message,
      });
    }
  };

export const fetchBookedSeats = (transitId) => async (dispatch) => {
  dispatch(fetchBookedSeatsRequest());

  try {
    const transitDocRef = doc(db, "transits", transitId);

    // Get the current transit data
    const transitDocSnapshot = await getDoc(transitDocRef);

    const transitData = transitDocSnapshot.data();

    const bookedSeats = Array.isArray(transitData?.bookedSeats)
      ? transitData.bookedSeats
      : [];

    dispatch(fetchBookedSeatsSuccess(bookedSeats));
  } catch (error) {
    console.error("Error fetching booked seats:", error);
    dispatch(fetchBookedSeatsFailure());
  }
};

const fetchBookedSeatsRequest = () => ({
  type: FETCH_BOOKED_SEATS_REQUEST,
});

const fetchBookedSeatsSuccess = (bookedSeats) => ({
  type: FETCH_BOOKED_SEATS_SUCCESS,
  payload: bookedSeats,
});

const fetchBookedSeatsFailure = () => ({
  type: FETCH_BOOKED_SEATS_FAILURE,
});

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
