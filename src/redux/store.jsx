import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/authReducer";
import thunk from "redux-thunk";
import transitReducer from "./reducers/transitReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  transitReducer: transitReducer,
});
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
