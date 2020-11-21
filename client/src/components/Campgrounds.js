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
    <div>
      {campgrounds ? <ClusterMap campgrounds={campgrounds} /> : null
      }
      <Container className="campgrounds">



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
    </div>

  );
}
export default Campgrounds;
