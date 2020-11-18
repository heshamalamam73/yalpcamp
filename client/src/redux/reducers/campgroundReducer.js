const { GET_CAMPGROUNDS_REQUEST, GET_CAMPGROUNDS_SUCCESS,
     GET_CAMPGROUNDS_FAILURE,GET_CAMPGROUND_REQUEST,
     GET_CAMPGROUND_SUCCESS,GET_CAMPGROUNDD_FAILURE, POST_CAMPGROUND_SUCCESS, POST_CAMPGROUND_FAILURE, POST_CAMPGROUND_REQUEST } = require("../actionTypes/campgroundActionTypes");


function renderAllCampgroundsReducer(state = { campgrounds :[]}, action){
    switch(action.type){
        case GET_CAMPGROUNDS_REQUEST:
            return {
                loading : true,
            }
        case GET_CAMPGROUNDS_SUCCESS:
            return { loading:false,campgrounds : action.payload
            }
        case GET_CAMPGROUNDS_FAILURE:
            return { loading:false,error:action.payload}
        default: return state;

    }
}
function renderUnCampgroundReducer(state = { campground :{}}, action){
    switch(action.type){
        case GET_CAMPGROUND_REQUEST:
            return {
                loading : true,
            }
        case GET_CAMPGROUND_SUCCESS:
            return { loading:false,campground:action.payload
            }
        case GET_CAMPGROUNDD_FAILURE:
            return { loading:false,error:action.payload}
        default: return state;

    }
}

function postNewCampgroundReducer(state ={}, action) {
    switch (action.type) {
        case POST_CAMPGROUND_REQUEST:
            return{ loading: true}
        case POST_CAMPGROUND_SUCCESS:
            return{ loading:false,campground:action.payload }
        case POST_CAMPGROUND_FAILURE: 
        return {loading:false , error:action.payload}
        default: return state;

    }
}

export{renderAllCampgroundsReducer,renderUnCampgroundReducer,postNewCampgroundReducer}