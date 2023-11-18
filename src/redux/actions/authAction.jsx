import { auth, db } from "../../firebase";
import { setDoc, getDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  SET_LOADING,
  LOGOUT,
} from "../actionTypes"; // Import the correct action type file
const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const register = (name, email, phone, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    // Declare userCredential and userDocRef
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userDocRef = doc(db, "users", userCredential.user.uid);

    await signInWithEmailAndPassword(auth, email, password);

    const user = {
      name,
      email: userCredential.user.email,
      phone,
      role: "user",
    };

    await setDoc(userDocRef, { user });

    sessionStorage.setItem("bb-user", JSON.stringify(user));

    await updateProfile(userCredential.user, {
      displayName: name,
      phoneNumber: phone,
    });

    console.log("Registration successful:", userCredential);

    dispatch({ type: REGISTER_SUCCESS, payload: user });
  } catch (error) {
    console.log(error);
    // Handle registration error here
  } finally {
    dispatch(setLoading(false));
  }
};
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    const user = {
      email: userCredential.user.email,
      role: userDoc.data().user.role, // Access the 'role' field from the userDoc data
    };
    console.log(user);
    sessionStorage.setItem("bb-user", JSON.stringify(user));
    console.log("Login successful:", userCredential);

    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (error) {
    console.error("Login error:", error.code, error.message);
  } finally {
    dispatch(setLoading(false));
  }
};
export const logout = () => async (dispatch) => {
  sessionStorage.removeItem("bb-user");
  auth
    .signOut()
    .then(() => {
      dispatch({ type: LOGOUT });
    })
    .catch((error) => {
      console.log("Logout", error);
    });
};