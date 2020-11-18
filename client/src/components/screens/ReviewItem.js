function ReviewItem (props) {
const {review,currentUserId} = props
return (
    <div className='review-item' key={review._id}>
        <div className='rating'>
        <span>{review.author.name} </span>
        <p className="starability-result" data-rating={review.rating}> Rated: {review.rating} </p>
        </div>
       <div>
       <span className="review-comment">{review.textComment}</span>
        {currentUserId === review.author._id && <button >Delete</button>}
       </div>
    </div>
)

}
export default ReviewItem;