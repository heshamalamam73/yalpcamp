import react, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { validationFunc } from "../helper/validationForms.js";
import { useSelector, useDispatch } from "react-redux";

function CreateCampground(props) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [validated, setValidated] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handleSubmit = (e) => {
    e.preventDefault();

    const campground = { title, location, image, description, price };
    axios
      .post("/api//campgrounds", campground)
      .then((res) => {
        // props.history.push("/campgrounds");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /////////////////validation finction
  useEffect(() => {
    validationFunc();
  }, []);
  /////////////////////
  return (
    <Container className="create-camp">
      <Row>
        <Form
          className="form needs-validation"
          onSubmit={handleSubmit}
          noValidate
        >
          <h1>Create Campground</h1>
          <hr />
          <Form.Group controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
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
              placeholder="Campground Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="Image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Campground Image"
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Add Campground
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default CreateCampground;
