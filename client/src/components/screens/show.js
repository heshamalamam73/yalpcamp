import react, { useState, useEffect } from "react";
import axios from "axios";
import { validationFunc } from "../helper/validationForms.js";

import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
function ShowCampground(props) {
  const campId = props.match.params.id;
  const [campground, setCampground] = useState({});
  const [rating, setRating] = useState(0);
  const [textComment, setTextComment] = useState("");

  useEffect(async () => {
    validationFunc();

    await axios.get(`/api/campgrounds/${campId}`).then((res) => {
      setCampground(res.data.campground);
      console.log(res.data);
    });
  }, []);
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/api/campgrounds/${campId}`)
      .then((res) => {
        props.history.push(`/api/campgrounds`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmitReview = (e) => {
    const review = { rating, textComment };
    e.preventDefault();
    axios.post(`/api/campgrounds/${campId}/reviews`, review).then((res) => {});
  };
  return (
    <Container className="show-camp">
      {campground && (
        <Row>
          <Col xl={7} className="cardBody">
            <Card>
              <Card.Img variant="top" src={campground.image} />
              <Card.Body>
                <Card.Text>{campground.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={5}>
            <Card>
              <Card.Body className="content">
                <Card.Title>{campground.title}</Card.Title>

                <Card.Title className="text">{campground.price} $</Card.Title>

                <a className="buttonA" href={campground._id + "/edit"}>
                  Edit Campground
                </a>
                <a className="buttonA" onClick={handleDelete}>
                  Delete Campground
                </a>

                <a className="buttonA" href="/campgrounds">
                  All Campgrounds
                </a>
                <hr />

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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ShowCampground;
