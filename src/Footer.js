import React from "react";
import { Button, Form } from "react-bootstrap";
import "./Footer.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Icons from "./Assets/Img/cards-icons.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import RoomIcon from "@material-ui/icons/Room";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";

function Footer() {
  const moveToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="footer">
      <Button
        block
        variant="secondary"
        onClick={moveToTop}
        style={{ marginBottom: "60px" }}
      >
        Back to Top
      </Button>
      <Container style={{ width: "2500px" }}>
        <Row>
          <Col xs={4}>
            <center>
              <h4>Get to Know</h4>
              <hr className="small" />
              <Row>
                <RoomIcon style={{ marginLeft: "60px" }} />{" "}
                <h6> Nangal Punjab,India</h6>
              </Row>
              <Row>
                <PhoneIcon style={{ marginLeft: "60px" }} />{" "}
                <h6> +91 70093-77116</h6>
              </Row>
              <Row>
                <EmailIcon style={{ marginLeft: "60px" }} />
                <h7>
                  <a href="mailto:shubham5khullar@gmail.com">
                    {" "}
                    shubham5khullar@gmail.com
                  </a>
                </h7>
              </Row>
            </center>
          </Col>
          <Col xs={4}>
            <center>
              <h4>Payment Methods</h4>
              <hr className="small" />
            </center>
            <ul>
              <li className="footer_payment">100% Secure Payments</li>
              <li className="footer_payment">Instant Refunds</li>
              <li className="footer_payment">Cards Availability:</li>
            </ul>
            <center>
              <img src={Icons} alt="Cards" height="30" />
            </center>
          </Col>

          <Col xs={4}>
            <center>
              <h3>Feedback:</h3>
            </center>

            <Form>
              <Form.Control type="email" placeholder="Enter email" />

              <Form.Control
                as="textarea"
                rows="2"
                placeholder="Your message"
                style={{ marginTop: "10px" }}
              />
              <Button style={{ marginTop: "10px" }} block variant="secondary">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <hr />
        <div className="logos">
          <div>
            <GitHubIcon fontSize="large" /> <FacebookIcon fontSize="large" />{" "}
            <InstagramIcon fontSize="large" /> <LinkedInIcon fontSize="large" />
          </div>
        </div>
      </Container>

      <div class="foot">
        © Copyright 2020 - All Credit goes to
        <strong> Shubham Khullar ♥️</strong>
      </div>
    </div>
  );
}

export default Footer;
