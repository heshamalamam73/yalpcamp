import { useState, useEffect } from "react";
import axios from "axios";
import Campground from "./Campground";
import { Row, Jumbotron, Button, Container } from "react-bootstrap";

function Campgrounds(props) {
  const [campgrounds, setCampgrounds] = useState([]);
  useEffect(() => {
    axios.get("/api/campgrounds").then((res) => {
      setCampgrounds(res.data);
      console.log(res);
    });
  }, []);

  return (
    <Container className="campgrounds">
      <Jumbotron>
        <h1>Gallery</h1>
        <p>a lot of beauteful Campgrounds you will found here ! </p>
      </Jumbotron>
      <Row>
        {campgrounds &&
          campgrounds.map((campground) => (
            <Campground campground={campground} id={campground._id} />
          ))}
      </Row>
    </Container>
  );
}
export default Campgrounds;
