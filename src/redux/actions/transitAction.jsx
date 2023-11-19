import {
  ADD_TRANSIT_SUCCESS,
  REMOVE_TRANSIT,
  BOOK_TRANSIT,
  FETCH_TRANSITS_REQUEST,
  FETCH_TRANSITS_SUCCESS,
  FETCH_TRANSITS_FAILURE,
} from "../actionTypes";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  doc,
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
    const newTransit = { id: transitRef.id, ...transitData };

    dispatch({
      type: ADD_TRANSIT_SUCCESS,
      payload: newTransit,
    });

    toast.success("Transit Added");
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
});

export const fetchTransits = () => async (dispatch) => {
  dispatch(fetchTransitsRequest());

  try {
    const transitCollection = collection(db, "transits");
    const transitSnapshot = await getDocs(transitCollection);
    let transits = [];

    if (!transitSnapshot.empty) {
      transits = transitSnapshot.docs.map((doc) => doc.data());
    }

    dispatch(fetchTransitsSuccess(transits));
  } catch (error) {
    console.error("Error fetching transits:", error);
    dispatch(fetchTransitsFailure());
  }
};

export const removeTransit = (transitId) => async (dispatch) => {
  try {
    console.log("Removing transit with ID:", transitId); // Add this line
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

export const bookTransit = (transitId, userId) => async (dispatch) => {
  try {
    const transitDocRef = doc(db, "transits", transitId);
    await updateDoc(transitDocRef, {
      bookedBy: arrayUnion(userId),
    });
    dispatch({
      type: BOOK_TRANSIT,
      payload: { transitId, userId },
    });
  } catch (error) {
    console.error("Error updating transit in Firestore:", error);
  }
};
