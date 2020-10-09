import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Form, FormControl, InputGroup, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Logo from "./Assets/logo.png";
import SearchIcon from "@material-ui/icons/Search";
import { auth, storage } from "../firebase";

function Header() {
  const [{ user }, dispach] = useStateValue();
  const [url, setUrl] = useState();
  const history = useHistory();

  const [search, setSearch] = useStateValue();

  useEffect(() => {
    if (user) {
      storage
        .ref("images")
        .child(user?.uid)
        .getDownloadURL()
        .then((url) => {
          setUrl(url);
        });
    }
  }, [user]);

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
      window.location.reload(false);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="mr-auto">
      <Navbar.Brand>
        <Link to="/seller">
          <img src={Logo} alt="website logo" height="50"></img>
        </Link>
      </Navbar.Brand>
      {/* <Form inline className="ml-auto search_inp">
        <InputGroup className="formInput search_inp" style={{ width: "600px" }}>
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
            // onChange={handleSearchValue}
          />
        </InputGroup>
      </Form> */}
      <Nav className="ml-sm-4" style={{ paddingLeft: "55vw" }}>
        <Nav.Link>
          <Link to="/seller/Catalogue" className="link">
            Catalogue
          </Link>
        </Nav.Link>
        <Nav.Link style={{ paddingLeft: "20px" }}>
          <Link to="/seller/Orders" className="link">
            Orders
          </Link>
        </Nav.Link>
        <Nav.Link style={{ paddingLeft: "20px" }}>
          <Link to="/seller/Inventory" className="link">
            Inventory
          </Link>
        </Nav.Link>
      </Nav>

      <Nav className="ml-sm-4" style={{ paddingLeft: "20px" }}>
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
                to="/seller/SignIn"
                className="link"
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
                    Hello, Seller
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
              <Avatar src={url} style={{ height: "30px", width: "30px" }} />
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
                        user?.email ? `${user?.email}`.toUpperCase() : "Seller"
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
                <Link className="linkp" to="/seller/Profile">
                  Profile
                </Link>
                <Link
                  to={!user && "/seller/SignIn"}
                  onClick={handleAuthentication}
                  className="linkp"
                >
                  Sign Out
                </Link>
              </div>
            </div>
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
}

export default Header;
