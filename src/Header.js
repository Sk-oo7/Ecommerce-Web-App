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
import Badge from "react-bootstrap/Badge";
import InputGroup from "react-bootstrap/InputGroup";
import { auth } from "./firebase";

export default function Header() {
  const [{ Cart, Wishlist, user }, dispach] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="mr-auto">
      <Navbar.Brand>
        <Link to="/">
          <img src={Logo} alt="website logo" height="50"></img>
        </Link>
      </Navbar.Brand>

      <Form inline className="ml-auto">
        <InputGroup class="mb-3">
          <FormControl type="text" placeholder="Search" className="col-xs-4" />
          <InputGroup.Append>
            <Button variant="secondary">Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>

      <Nav className="ml-sm-4">
        <Nav.Link>
          <Link
            to={!user && "/SignIn"}
            className="link"
            onClick={handleAuthentication}
          >
            <div
              class="log_option"
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "-5px",
              }}
            >
              {" "}
              <small
                style={{
                  marginBottom: "-5px",
                  color: "whitesmoke",
                }}
              >
                Hello, {user?.displayName ? `${user?.displayName}` : "Guest"}
              </small>
              {user ? "Sign Out" : "Sign In"}
            </div>
          </Link>
        </Nav.Link>

        <Nav.Link>
          <Link to="/Orders" className="link">
            My Orders
          </Link>
        </Nav.Link>

        <Nav.Link>
          <Link to="/Wishlist" className="link">
            <div className="wishListIcon">
              <LoyaltySharpIcon />

              {Wishlist?.length > 0 && (
                <Badge variant="danger" class="badge">
                  {Wishlist?.length}
                </Badge>
              )}
            </div>
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/Cart" className="link">
            <ShoppingCartSharpIcon />

            {Cart?.length > 0 && (
              <Badge variant="success" class="badge">
                {Cart?.length}
              </Badge>
            )}
          </Link>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
