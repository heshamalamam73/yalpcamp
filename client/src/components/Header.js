import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../action/userAction";
function Header(props) {
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    e.preventDefault();
    console.log("logOut");
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
    <Navbar collapseOnSelect expand="md" variant="dark" fixed>
      <Navbar.Brand href="/">Yalp Camp</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          {props.userInfo ? userLinks : gustLinks}
          {console.log(props)}

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
