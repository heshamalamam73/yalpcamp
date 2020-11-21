import { useEffect } from "react";
import Campground from "./Campground";
import { Row, Jumbotron, Container, Spinner, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { renderAllCampgrounds } from "../redux/action/campgroundAction"
import ClusterMap from './ClusterMap'

function Campgrounds(props) {
  const dispatch = useDispatch();
  const AllCampgrounds = useSelector((state) => state.AllCampgrounds);
  const { campgrounds, loading, error } = AllCampgrounds;
  useEffect(() => {

    dispatch(renderAllCampgrounds());
  }, []);

  return (
    <Container className="campgrounds">
      <Jumbotron>
        {campgrounds ? <ClusterMap campgrounds={campgrounds} /> : null
        }

        <p>A lot of beauteful Campgrounds you will found here ! </p>
        <Form>
          <Form.Group as={Row} controlId="formPlaintextPassword">

            <Col sm="8">
              <Form.Control type="text" placeholder="Search" />
            </Col>
          </Form.Group>

        </Form>
      </Jumbotron>
      {loading && <Spinner animation="border" className="spinner" variant="primary" />
      }
      {error && <div>{error}</div>}
      <Row>
        {campgrounds &&
          campgrounds.map((campground) => (
            <Campground campground={campground} key={campground._id} />
          ))}
      </Row>
    </Container>
  );
}
export default Campgrounds;
