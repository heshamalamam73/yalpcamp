import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { validationFunc } from "../../redux/helper/validationForms.js";
import {addNewReview,getReviews } from '../../redux/action/reviewsAction'
import {useDispatch, useSelector} from "react-redux"
import ReviewItem from './ReviewItem.js'


function ReviewsHandler(props){
    const [rating, setRating] = useState(0);
    const [textComment, setTextComment] = useState("");
    const [allreviews , setAllreviews] = useState([])
    const dispatch = useDispatch();
    const {currentUserId ,isAuhenticated,campId }= props;
    const allReviews = useSelector((state) => state.allReviews);

    const {reviews , success , error,loading} = allReviews;

    useEffect(() => {
        dispatch(getReviews(campId));
        if(reviews){
            setAllreviews(reviews);
        }
    },[])
    const handleSubmitReview = (e) => {

        e.preventDefault();
        const author = currentUserId;
        const review = { rating, textComment , author};
        validationFunc();
        dispatch(addNewReview(props.campId,review));
        // setAllreviews([...reviews , review]);
        window.location.reload(true);

        document.getElementById("form").reset();

    
      };
 

return(
    <div>
      <p>Reviews </p>
      <hr />
                {isAuhenticated?(
                  <Form
                   onSubmit={handleSubmitReview}
                   className="needs-validation"
                   noValidate
                   id='form'
                 >
                   <Form.Group controlId="formBasicRange">
                     <Form.Label>Leave Your Review </Form.Label>
                     <fieldset class="starability-basic">
                    <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="0" checked aria-label="No rating."  />
                    <input type="radio" id="first-rate1" name="rating" value="1" onChange={(e) => setRating(e.target.value)} />
                    <label for="first-rate1" title="Terrible" >1 star</label>
                    <input type="radio" id="first-rate2" name="rating" value="2"  onChange={(e) => setRating(e.target.value)}/>
                    <label for="first-rate2" title="Not good">2 stars</label>
                    <input type="radio" id="first-rate3" name="rating" value="3" onChange={(e) => setRating(e.target.value)} />
                    <label for="first-rate3" title="Average">3 stars</label>
                    <input type="radio" id="first-rate4" name="rating" value="4" onChange={(e) => setRating(e.target.value)} />
                    <label for="first-rate4" title="Very good">4 stars</label>
                    <input type="radio" id="first-rate5" name="rating" value="5" onChange={(e) => setRating(e.target.value)} />
                    <label for="first-rate5" title="Amazing">5 stars</label>
                  </fieldset>
                   </Form.Group>
                  
                                    
                   <Form.Group controlId="exampleForm.ControlTextarea1">
                     <Form.Control
                       as="textarea"
                       rows={2}
                       onChange={(e) => setTextComment(e.target.value)}
                       required
                     />
                   </Form.Group>
                   <Button variant="success" type="submit">
                     Add Review
                   </Button>
                 </Form>

):(
                 <div>
                  <p>Sign in to make reviews ? <a href='/signin'>Sign in </a> </p>

                  
                  
                   </div>)}

                   {  allreviews.map(review => < ReviewItem review={review} currentUserId ={currentUserId}  />)}

    </div>
 

)


}
export default ReviewsHandler;