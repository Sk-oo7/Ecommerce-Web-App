import React, { useState } from "react";
import {
  Col,
  Form,
  InputGroup,
  Button,
  FormControl,
  Row,
  Container,
} from "react-bootstrap";
import "./SignIn.css";
import Logo from "./logo.png";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";

function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [toggle, changeToggle] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
        window.location.reload(false);
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    var user = null;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function () {
        user = auth.currentUser;
      })
      .then(function () {
        user.updateProfile({
          displayName: username,
        });
      })
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
    if (user !== null) changeToggle(false);
  };

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        height: "100vh",
      }}
    >
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto FormDiv">
            <div className="formImage">
              <img src={Logo} height="50" alt="logo"></img>
            </div>
            <div className="formHeading">
              {!toggle && <h1>Sign-In</h1>}
              {toggle && <h1>Sign-Up</h1>}
            </div>
            <Form>
              <Form.Label htmlFor="inlineFormInput" srOnly>
                Name
              </Form.Label>
              <Form.Control
                className="mb-4 formInput"
                id="inlineFormInput"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                Username
              </Form.Label>

              {toggle && (
                <InputGroup className="mb-4 formInput">
                  <InputGroup.Prepend>
                    <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="inlineFormInputGroup"
                    placeholder="Username (optional)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              )}
              <Form.Label htmlFor="inlineFormInput2" srOnly>
                Password
              </Form.Label>
              <Form.Control
                className="mb-4 formInput"
                id="inlineFormInput"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {!toggle && (
                <Button
                  type="submit"
                  variant="secondary"
                  className="mb-3"
                  block
                  onClick={signIn}
                >
                  Sign In
                </Button>
              )}

              {toggle && (
                <Button variant="warning" block onClick={register}>
                  Create new Account
                </Button>
              )}

              {!toggle && (
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    bottom: "10px",
                    display: "flex",
                  }}
                >
                  <div style={{ paddingTop: "7px" }}>New to Buy-Aura?</div>
                  <Button variant="link" onClick={() => changeToggle(true)}>
                    SignUp
                  </Button>
                </div>
              )}
              {toggle && (
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    bottom: "10px",
                    display: "flex",
                  }}
                >
                  <div style={{ paddingTop: "7px" }}>Existing User?</div>
                  <Button variant="link" onClick={() => changeToggle(false)}>
                    SignIn
                  </Button>
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default SignIn;
