import axios from "axios";
import {
    GET_CAMPGROUNDS_FAILURE,
    GET_CAMPGROUNDS_REQUEST,
    GET_CAMPGROUNDS_SUCCESS,
    GET_CAMPGROUND_FAILURE,
    GET_CAMPGROUND_REQUEST,
    GET_CAMPGROUND_SUCCESS,
    POST_CAMPGROUND_FAILURE,
    POST_CAMPGROUND_SUCCESS,
    POST_CAMPGROUND_REQUEST,
} from "../actionTypes/campgroundActionTypes";

const renderAllCampgrounds = () => async (dispatch) => {
    dispatch({ type: GET_CAMPGROUNDS_REQUEST });
    try {
        const { data } = await axios.get("/api/campgrounds");
        dispatch({ type: GET_CAMPGROUNDS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_CAMPGROUNDS_FAILURE, payload: error });
    }
};

const renderUnCampground = (id) => async (dispatch) => {
    dispatch({ type: GET_CAMPGROUND_REQUEST });
    try {
        const { data } = await axios.get(`/api/campgrounds/${id}`);
        dispatch({ type: GET_CAMPGROUND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_CAMPGROUND_FAILURE, payload: error });
    }
};

const postNewCampground = (campground) => async (dispatch) => {
    
    dispatch({ type: POST_CAMPGROUND_REQUEST, payload: { campground } });
    try {
        const { data } = await axios.post("/api/campgrounds", campground);
        dispatch({ type: POST_CAMPGROUND_SUCCESS, payload: { data } });
    } catch (error) {
        dispatch({ type: POST_CAMPGROUND_FAILURE, payload: error });
    }
    
};


export { renderAllCampgrounds, renderUnCampground, postNewCampground };