import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
function Campground(props) {
  const { campground } = props;
  return (
    campground && (
      <Col className="campground" xs={12} md={6} lg={4} xl={3}>
        <Link to={"campgrounds/" + campground._id}>
          <Card>
            <Card.Img variant="top" src={campground.image} />
            <Card.Body>
              <Card.Title>{campground.title}</Card.Title>
              <Card.Text id="descText">{campground.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Card.Title className="text">{campground.price} $</Card.Title>
            </Card.Footer>
          </Card>
        </Link>
      </Col>
    )
  );
}
export default Campground;
