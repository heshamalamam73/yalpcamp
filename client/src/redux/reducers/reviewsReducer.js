import { ADD_REVIEW_REQUEST , ADD_REVIEW_SUCCESS ,ADD_REVIEW_FAILURE,DELETE_REVIEW_REQUEST,DELETE_REVIEW_SUCCESS,DELETE_REVIEW_FAILURE } from '../actionTypes/reviewsActionTypes'




function addNewReviewReducer (state ={review:{}}, action){
switch (action.type) {
    case ADD_REVIEW_REQUEST : 
    return { loading: true ,success :false }
    case ADD_REVIEW_SUCCESS : 
    return { loading: false , newreview: action.payload, success:true}
    case ADD_REVIEW_FAILURE : 
    return { loading: false  , error:action.payload ,success :false}
    default: return state;
}
} 

function deleteReviewReducer (state, action){
switch (action.type){
    case DELETE_REVIEW_REQUEST : 
    return { loading: true}
    case DELETE_REVIEW_SUCCESS : 
    return { loading: false , message:"successfully deleted !" }
    case DELETE_REVIEW_FAILURE :
    return { loading:false , error:action.payload}
    default: return state;

}
}

export {addNewReviewReducer,deleteReviewReducer}