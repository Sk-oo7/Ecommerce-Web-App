import React from "react";
import Logo from "./logo.png";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ShoppingCartSharpIcon from "@material-ui/icons/ShoppingCartSharp";
import LoyaltySharpIcon from "@material-ui/icons/LoyaltySharp";
import Link from "react-router-dom/Link";
import { useStateValue } from "./StateProvider";

export default function Header() {
  const [{ Cart, Wishlist }, dispach] = useStateValue();

  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="mr-auto">
      <Navbar.Brand href="#">
        <Link to="/">
          <img src={Logo} alt="website logo" height="50"></img>
        </Link>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>{" "}
      <Form inline className="ml-auto">
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
      <Nav className="ml-sm-4">
        <Nav.Link href="#signin">Sign In</Nav.Link>
        <Nav.Link href="#MyOrders">My Orders</Nav.Link>
        <Nav.Link href="#Wishlist">
          <Link to="/Cart" className="link">
            <div className="wishListIcon">
              <LoyaltySharpIcon />
              {Wishlist?.length}
            </div>
          </Link>
        </Nav.Link>
        <Nav.Link href="#cart">
          <Link to="/Cart">
            <ShoppingCartSharpIcon />
            {Cart?.length}
          </Link>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
