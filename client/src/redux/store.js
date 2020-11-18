import { createStore, combineReducers, compose, applyMiddleware } from "redux";

import {
  userSigninReducer,
  userRigesterReducer,
  userSignoutReducer,
  setCurrentUser
} from "./reducers/userReducer.js";
import {addNewReviewReducer , DeleteReviewReducer } from "./reducers/reviewsReducer";
import {postNewCampgroundReducer } from './reducers/campgroundReducer'
import {renderAllCampgroundsReducer ,renderUnCampgroundReducer} from "./reducers/campgroundReducer"
import thunk from "redux-thunk";

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRigester: userRigesterReducer,
  userLogout: userSignoutReducer,
  AllCampgrounds:renderAllCampgroundsReducer,
  rendercampground : renderUnCampgroundReducer,
  currentUser : setCurrentUser,
  postCampground :postNewCampgroundReducer,
  NewReview :addNewReviewReducer

});
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
