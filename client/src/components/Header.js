
import { Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/action/userAction";
function Header(props) {
  const currentUser = useSelector((state) => state.currentUser);
  const { isAuhenticated } = currentUser;
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(signout());
  };
  const userLinks = (
    <Nav.Link onClick={handleLogOut} eventKey={2} href="/profile">
      Log out
    </Nav.Link>
  );
  const gustLinks = (
    <Nav.Link eventKey={2} href="/signin">
      Sign In
    </Nav.Link>
  );
  return (
    <Navbar collapseOnSelect expand="sm" variant="light" bg="light" >
      <Navbar.Brand href="/">Yalp Camp</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>

          {isAuhenticated ? userLinks : gustLinks}
          <Nav.Link href="/campgrounds">All Campgrounds</Nav.Link>
          <Nav.Link eventKey={2} href="/new">
            Create Campground
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
