import react, { useState, useEffect } from "react";
import axios from "axios";
import Campground from "./Campground";
import { Container, Col, Row } from "react-bootstrap";

function Campgrounds(props) {
  const [campgrounds, setCampgrounds] = useState([]);
  useEffect(() => {
    axios.get("/campgrounds").then((res) => {
      setCampgrounds(res.data);
      console.log(res);
    });
  }, []);

  return (
    <div className="campgrounds">
      <Row>
        {campgrounds &&
          campgrounds.map((campground) => (
            <Campground campground={campground} id={campground._id} />
          ))}
      </Row>
    </div>
  );
}
export default Campgrounds;
