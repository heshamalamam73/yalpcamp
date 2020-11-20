import React, { useEffect } from "react";
import axios from "axios";
import { validationFunc } from "../../redux/helper/validationForms.js";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Container, Row, Col, Card, Carousel ,Spinner} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { renderUnCampground } from "../../redux/action/campgroundAction";
import ReviewsHandler from "./reviews";
import Moment from "react-moment";
import "moment-timezone";

function ShowCampground(props) {
  const campId = props.match.params.id;
  const dispatch = useDispatch();
  const rendercampground = useSelector((state) => state.rendercampground);
  const { campground, loading, error } = rendercampground;
  const currentUser = useSelector((state) => state.currentUser);
  const { isAuhenticated, user } = currentUser;
  // const NewReview = useSelector((state) => state.NewReview);
  // const { newreview } = NewReview;

  useEffect(() => {
    dispatch(renderUnCampground(campId));
    validationFunc();

  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/api/campgrounds/${campId}`)
      .then((res) => {
        props.history.push(`/campgrounds`);
      })
      .catch((err) => {});
  };

  return (
    loading ?  <Spinner animation="border" variant="primary"  className='spinner'/>:
    <Container className="show-camp">
      {error && <div>{error} </div>}
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item
          active
          href="https://getbootstrap.com/docs/4.0/components/breadcrumb/"
        >
          {campground && campground.title}
        </Breadcrumb.Item>
      </Breadcrumb>
      {campground && (
        <Row>
          <Col xl={7} className="cardBody">
            <Card>
              {campground.images && campground.images.length > 1 ? (
                <Carousel>
                  {campground.images &&
                    campground.images.map((img) => (
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={img.url}
                          alt="some images"
                        />
                   
                      </Carousel.Item>
                    ))}
                </Carousel>
              ) : (
                <Card.Img
                  variant="top"
                  src={campground.images && campground.images[0].url}
                />
              )}

              <Card.Body>
                <div className="mar-l">
                  <Card.Title className="text-muted ">{campground.title}</Card.Title>

                  <Card.Title className="text text-muted">{campground.price} $</Card.Title>
                </div>
                <div>
                  <img
                    id="avatar"
                    src={campground.author && campground.author.avatar}
                    alt="avatar"
                  />
                  <span className="text-muted ">{campground.author && campground.author.name}</span>
                </div>

                <Card.Text className="text-muted ">{campground.description}</Card.Text>
                {campground.time && (
                  <Card.Footer className="text-muted">
                    {" "}
                    <Moment fromNow>{campground.time}</Moment>
                  </Card.Footer>
                )}
                {campground.author && campground.author._id === user._id && (
                  <div className="mar-r">
                    <a className="show-btn" href={campground._id + "/edit"}>
                      Edit
                    </a>
                    <button className="show-btn" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col xl={5}>
            <Card>
              <Card.Body className="reviews">
                <ReviewsHandler
                  campId={campId}
                  currentUserId={user._id}
                  isAuhenticated={isAuhenticated}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
                
  );
}

export default ShowCampground;
