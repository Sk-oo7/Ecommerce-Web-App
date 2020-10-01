import React, { useEffect, useState } from "react";
import Logo from "./logo.png";
import SearchIcon from "@material-ui/icons/Search";
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
import { auth, db } from "./firebase";
import Avatar from "@material-ui/core/Avatar";
import "./Header.css";

export default function Header() {
  const [{ Cart, Wishlist, user }, dispach] = useStateValue();
  const [search, setSearch] = useStateValue();
  const [listSize, setlistSize] = useState(0);
  const [cartSize, setCartSize] = useState(0);
  const [guest, setGuest] = useStateValue();
  console.log(cartSize);

  useEffect(() => {
    if (guest?.guest) {
      db.collection("guests")
        .doc(guest?.guest)
        .collection("Wishlist")
        .onSnapshot((snapshot) => setlistSize(snapshot.size));
    }
    if (guest?.guest) {
      db.collection("guests")
        .doc(guest?.guest)
        .collection("Cart")
        .onSnapshot((snapshot) => setCartSize(snapshot.size));
    }
  }, [guest]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("Wishlist")
        .onSnapshot((snapshot) => setlistSize(snapshot.size));
    }
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("Cart")
        .onSnapshot((snapshot) => setCartSize(snapshot.size));
    }
  }, [user]);

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
      setlistSize(0);
      setCartSize(0);
      window.location.reload(false);
    }
  };

  const handleSearchValue = (event) => {
    setSearch({
      type: "SET_SEARCH",
      search: event.target.value,
    });
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="mr-auto">
      <Navbar.Brand>
        <Link to="/">
          <img src={Logo} alt="website logo" height="50"></img>
        </Link>
      </Navbar.Brand>

      <Form inline className="ml-auto search_inp">
        <InputGroup className="formInput search_inp">
          <InputGroup.Prepend>
            <InputGroup.Text>
              <SearchIcon />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder="Search"
            className="col-xs-4 search_inp"
            value={search.search}
            onChange={handleSearchValue}
          />
        </InputGroup>
      </Form>

      <Nav className="ml-sm-4">
        {!user && (
          <Nav.Link>
            <div
              class="log_option dropdown"
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "2px",
              }}
            >
              <Avatar
                src=""
                style={{ height: "30px", width: "30px", marginRight: "5px" }}
              />
              <Link
                to="/SignIn"
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
                    Hello, Guest
                  </small>
                  SignIn
                </div>
              </Link>
            </div>
          </Nav.Link>
        )}

        {user && (
          <Nav.Link>
            <div
              class="log_option dropdown"
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "2px",
              }}
            >
              <Avatar src="" style={{ height: "30px", width: "30px" }} />
              <div
                class="log_option"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "5px",
                  marginTop: "-5px",
                }}
              >
                <small
                  style={{
                    marginBottom: "-3px",
                    color: "lightgray",
                  }}
                >
                  Hello,
                </small>
                <strong
                  style={{
                    marginTop: "-5px",
                    color: "whitesmoke",
                  }}
                >
                  {user
                    ? `${user?.displayName}`.toUpperCase()
                    : `${
                        user?.email ? `${user?.email}`.toUpperCase() : "Guest"
                      }`}
                </strong>
              </div>
              <div className="dropdown-content">
                <h5
                  style={{
                    color: "black",

                    padding: "10px 15px",
                  }}
                >
                  My Account
                </h5>
                <Link className="linkp" to="/Profile">
                  Profile
                </Link>
                <Link
                  to={!user && "/SignIn"}
                  onClick={handleAuthentication}
                  className="linkp"
                >
                  Sign Out
                </Link>
              </div>
            </div>
          </Nav.Link>
        )}

        <Nav.Link>
          <Link to="/Orders" className="link">
            My Orders
          </Link>
        </Nav.Link>

        <Nav.Link>
          <Link to="/Wishlist" className="link">
            <div className="wishListIcon">
              <LoyaltySharpIcon />

              {listSize > 0 && (
                <Badge variant="danger" class="badge">
                  {listSize}
                </Badge>
              )}
            </div>
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/Cart" className="link">
            <ShoppingCartSharpIcon />
            {cartSize > 0 && (
              <Badge variant="success" class="badge">
                {cartSize}
              </Badge>
            )}
          </Link>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
