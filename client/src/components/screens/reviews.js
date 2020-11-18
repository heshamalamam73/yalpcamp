import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { validationFunc } from "../../redux/helper/validationForms.js";
import {addNewReview } from '../../redux/action/reviewsAction'
import {useDispatch, useSelector} from "react-redux"


function ReviewsHandler(props){
    const [rating, setRating] = useState(0);
    const [textComment, setTextComment] = useState("");
    
    const dispatch = useDispatch();
    const {user , campground,isAuhenticated }= props;


    const handleSubmitReview = (e) => {
        e.preventDefault();
        const author = props.user._id;
        const review = { rating, textComment , author};
        dispatch(addNewReview(props.campId,review));
    
    
      };
    useEffect(() => {
        validationFunc();

    },[])

return(
    <div>
       { campground.reviews&& campground.reviews.length > 0 && campground.reviews.map(review => {
                return(
                  <div className="review-item" key={review._id}>
                    <div>
                    <span>{review.rating}</span>
                    <span> <span>mido imam :</span>{review.textComment}</span>
                    </div>
                    {review.author === user._id && <span>Delete </span>}

                  </div>
                ) 
                })}

                {isAuhenticated?(
    <Form
                   onSubmit={handleSubmitReview}
                   className="needs-validation"
                   noValidate
                 >
                   <Form.Group controlId="formBasicRange">
                     <Form.Label>Range</Form.Label>
                     <Form.Control
                       type="range"
                       min="0"
                       max="5"
                       onChange={(e) => setRating(e.target.value)}
                       required
                     />
                   </Form.Group>
                  
                   <Form.Group controlId="exampleForm.ControlTextarea1">
                     <Form.Label>Example textarea</Form.Label>
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
    </div>
 

)


}
export default ReviewsHandler;