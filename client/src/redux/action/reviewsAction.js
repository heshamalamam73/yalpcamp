import { ADD_REVIEW_REQUEST , ADD_REVIEW_SUCCESS ,ADD_REVIEW_FAILURE,DELETE_REVIEW_REQUEST,DELETE_REVIEW_SUCCESS,DELETE_REVIEW_FAILURE } from '../actionTypes/reviewsActionTypes'
import axios from 'axios';

const addNewReview = (campId,review) => async (dispatch) => {
    dispatch({type :ADD_REVIEW_REQUEST, payload : review})
try{
    const {data}=  await  axios.post(`/api/campgrounds/${campId}/reviews`, review)
    dispatch({type :ADD_REVIEW_SUCCESS, payload : data})
}catch (error) {
    dispatch({type :ADD_REVIEW_FAILURE, payload : error})
}
}



const deleteReview = (campId , id ) => async (dispatch )=> {
    dispatch({type :DELETE_REVIEW_REQUEST })
    try{
        const {data}=  await  axios.delete(`/api/campgrounds/${campId}/reviews`)
        dispatch({type :DELETE_REVIEW_SUCCESS, payload : data})
    }catch (error) {
        dispatch({type :DELETE_REVIEW_FAILURE, payload : error})
}
}



export {deleteReview ,addNewReview}