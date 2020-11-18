import { useState, useEffect } from "react";
import axios from "axios";
import { validationFunc } from "../../redux/helper/validationForms.js";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux"
import {renderUnCampground} from '../../redux/action/campgroundAction';
import ReviewsHandler from "./reviews"
function ShowCampground(props) {
  const campId = props.match.params.id;
  const dispatch = useDispatch();
  const rendercampground = useSelector((state) => state.rendercampground);
  const {campground,loading, error} = rendercampground;
  const currentUser = useSelector((state) => state.currentUser);
  const { isAuhenticated,user } = currentUser;
  const NewReview = useSelector((state) => state.NewReview);
  const {newreview} = NewReview;

  useEffect(() => {
    validationFunc();
    dispatch(renderUnCampground(campId))
  }, []);
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/api/campgrounds/${campId}`)
      .then((res) => {
        props.history.push(`/api/campgrounds`);
      })
      .catch((err) => {
     
      });
  };


  return (
    <Container className="show-camp">
      {error && <div>{error} </div>}
      {loading && <div>Loading...</div>}
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
              <Card.Img variant="top" src={campground.image} />
              <Card.Body>
                <div className="mar-l">
                  <Card.Title>{campground.title}</Card.Title>

                  <Card.Title className="text">{campground.price} $</Card.Title>
                </div>
                <p>by/ {campground.author && campground.author.name}</p>

                <Card.Text>{campground.description}</Card.Text>
                {campground.author && campground.author._id  === user._id &&(          
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
                  <ReviewsHandler  campId={campId} currentUserId={user._id}  isAuhenticated={isAuhenticated}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
   </Container>
  );
}

export default ShowCampground;
