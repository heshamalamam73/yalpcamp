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
            <p className="text-muted ">{campground.price} $</p>
            <Card.Title className="text-muted ">{campground.title}</Card.Title>

              {campground.author && (
                <span className="text-muted "> By/ {campground.author.name}</span>
              )}
              <Card.Text>
                {campground.time && (
                  <span className="text-muted ">
                    {" "}
                    <Moment fromNow>{campground.time}</Moment>
                  </span>
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
