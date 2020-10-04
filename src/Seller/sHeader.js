import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "./Assets/logo.png";

function Header() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" sticky="top" className="mr-auto">
        <Navbar.Brand>
          <Link to="/seller">
            <img src={Logo} alt="website logo" height="50"></img>
          </Link>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default Header;
