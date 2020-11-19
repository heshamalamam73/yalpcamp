import {  useEffect} from "react";
import Avatar from '../../avatar.png'
function ReviewItem (props) {

    const {review,currentUserId} = props



return (
    <div className='review-item' key={review._id}>
        <div className='rating'>
        <img id="avatar" src={review.author ? review.author.avatar : Avatar } alt="avatar" />

        <span>{review.author.name} </span>
        <p className="starability-result" data-rating={review.rating}> Rated: {review.rating} </p>
        </div>
       <div>
       <span className="review-comment">{review.textComment}</span>
       </div>
       {currentUserId === review.author._id && <button className="btn btn-danger">Delete</button>}

    </div>
)

}
export default ReviewItem;