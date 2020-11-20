import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import Moment from "react-moment";
import "moment-timezone";
function Campground(props) {
  const { campground } = props;
  return (
    campground && (
      <Col className="campground" xs={12} md={6} lg={4} xl={3}>
        <Link to={"campgrounds/" + campground._id}>
          <Card>
            {campground.images && (
              <Card.Img variant="top" src={campground.images[0].url} />
            )}
            <Card.Body>
            <Card.Title className="text-muted ">{campground.price} $</Card.Title>
            <Card.Title className="text-muted ">{campground.title}</Card.Title>

              {campground.author && (
                <Card.Title className="text-muted "> By/ {campground.author.name}</Card.Title>
              )}
              <Card.Text>
                {campground.time && (
                  <Card.Title className="text-muted ">
                    {" "}
                    <Moment fromNow>{campground.time}</Moment>
                  </Card.Title>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    )
  );
}
export default Campground;
