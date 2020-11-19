import { useState, useEffect } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import axios from "axios";
import { validationFunc } from "../../redux/helper/validationForms";
import {postNewCampground} from '../../redux/action/campgroundAction'
import {useDispatch , useSelector} from "react-redux"
function CreateCampground(props) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const { isAuhenticated, user} = currentUser;


  useEffect(() => {
    validationFunc();
    if (!isAuhenticated ){
      props.history.push(`/signin`);
      
    }
    console.log(user._id)
  }, [isAuhenticated , user,dispatch ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const author = user._id
    const campground = { title, location, image, description, price, author };
    dispatch(postNewCampground(campground));
    props.history.push(`/`);
  };


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
