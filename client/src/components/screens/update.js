import react, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { validationFunc } from "../helper/validationForms.js";

function UpdateCampground(props) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const id = props.match.params.id;

  useEffect(() => {
    axios.get(`/campgrounds/${id}`).then((res) => {
      setTitle(res.data.campground.title);
      setLocation(res.data.campground.location);
      setPrice(res.data.campground.price);
      setDescription(res.data.campground.description);
      setImage(res.data.campground.image);
    });
    validationFunc();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const campground = { title, location, id, description, price, image };
    axios.put(`/campgrounds/${id}`, campground).then((res) => {
      props.history.push(`/campgrounds/${id}`);
    });
  };
  return (
    <Container className="create-camp">
      <Row>
        <Form
          className="form needs-validation"
          onSubmit={handleSubmit}
          noValidate
        >
          <h1>Update Campground</h1>
          <hr />
          <Form.Group controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={location}
              placeholder="Campground Location"
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              value={description}
              placeholder="Campground Description"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              placeholder="Campground Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="Image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              value={image}
              type="text"
              placeholder="Campground Image"
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            onClick={() => {
              props.history.push(`/campgrounds/${id}`);
            }}
            variant="secondary"
            type="button"
          >
            Back
          </Button>
          <Button variant="success" type="submit">
            Update Campground
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default UpdateCampground;
