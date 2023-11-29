import {
  FETCH_BOOKED_TRANSITS_REQUEST,
  FETCH_BOOKED_TRANSITS_SUCCESS,
  FETCH_BOOKED_TRANSITS_FAILURE,
} from "../actionTypes";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const fetchBookedTransits = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_BOOKED_TRANSITS_REQUEST });

  try {
    const userId = getState().auth.user.uid;

    const q = query(
      collection(db, "transits"),
      where("bookedBy", "array-contains", { userId: userId })
    );
    const transitSnapshot = await getDocs(q);
    const bookedTransits = transitSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch({ type: FETCH_BOOKED_TRANSITS_SUCCESS, payload: bookedTransits });
  } catch (error) {
    console.error("Error fetching booked transits:", error);
    dispatch({ type: FETCH_BOOKED_TRANSITS_FAILURE, payload: error.message });
  }
};
