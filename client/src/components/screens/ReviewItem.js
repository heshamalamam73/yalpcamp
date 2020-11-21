import { useEffect } from "react";
import Avatar from '../../avatar.png'
import { Spinner } from 'react-bootstrap'
function ReviewItem(props) {

    const { review, currentUserId } = props



    return (
        review && review.author ? (
            <div key={review._id} className="review-item">
                <div className='rating'>
                    <p className="starability-result" data-rating={review.rating}> Rated: {review.rating} </p>
                </div>
                <div className='div-avatar'>
                    {/* <div className='avatar'>
        <img id="avatar" src={review.author ? review.author.avatar : Avatar } alt="avatar" />
        </div> */}
                    <span>{review.author.name} </span>
                </div>




                <div>

                    <p className="review-comment">{review.textComment}</p>
                </div>
                {/* {currentUserId === review.author._id && <button className="btn btn-danger">Delete</button>} */}

            </div>
        ) : null

    )

}
export default ReviewItem;