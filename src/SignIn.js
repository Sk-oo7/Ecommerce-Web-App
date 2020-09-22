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

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto FormDiv">
            <div className="formImage">
              <img src={Logo} height="50"></img>
            </div>
            <div className="formHeading">
              <h1>Sign-In</h1>
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

              <InputGroup className="mb-4 formInput">
                <InputGroup.Prepend>
                  <InputGroup.Text>@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  id="inlineFormInputGroup"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
              <Form.Label htmlFor="inlineFormInput" srOnly>
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

              <Button type="submit" className="mb-3" block onClick={signIn}>
                Sign In
              </Button>
              <Button variant="warning" block onClick={register}>
                Create new Account
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default SignIn;
