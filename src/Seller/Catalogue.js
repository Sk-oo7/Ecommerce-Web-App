import React, { useState } from "react";
import { Button, Col, Form, Jumbotron, Row, Tab, Tabs } from "react-bootstrap";
import { storage } from "../firebase";

function Catalogue() {
  const [category, setCategory] = useState();
  const [title, setTitle] = useState();
  const [id, setId] = useState();
  const [img, setImg] = useState();

  const handleImg = async (e) => {
    // await storage.ref(`products/${category}`).put(e.target.files[0]);
    // await window.location.reload(false);
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "10px 0",
        textAlign: "center",
      }}
    >
      <h1>Add a Product</h1>
      <Jumbotron
        style={{
          textAlign: "center",
          marginLeft: "50px",
          marginRight: "50px",
        }}
      >
        <Row>
          <Col style={{ borderRight: "1px solid black" }}>
            <h3>List an existing product</h3>
            <Form style={{ display: "flex" }}>
              <Form.Control type="text" placeholder="product name" />
              <Button type="submit" variant="warning">
                Seacrh
              </Button>
            </Form>
          </Col>
          <Col>
            <h3>List an new product</h3>
            <div
              style={{
                backgroundColor: "white",
                padding: "10px 10px 10px 10px",
                border: "1px solid lightgray",
                borderRadius: "5px",
              }}
            >
              <Tabs defaultActiveKey="details" id="uncontrolled-tab-example">
                <Tab eventKey="details" title="Product Details">
                  <h6 style={{ marginTop: "10px" }}>
                    Please enter product details below
                  </h6>
                  <div>
                    <Form
                      style={{
                        padding: "10px 10px 10px 10px",
                      }}
                    >
                      <Form.Row>
                        <Form.Label column lg={6}>
                          Select Category
                        </Form.Label>
                        <Col>
                          <Form.Control
                            as="select"
                            style={{
                              width: "200px",
                              marginLeft: "50px",
                            }}
                            placeholder="sdf"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option>Select</option>
                            <option>Basic</option>
                            <option>Premium</option>
                          </Form.Control>
                        </Col>
                      </Form.Row>

                      <Form.Row>
                        <Form.Label column lg={6} style={{ marginTop: "20px" }}>
                          Product Title
                        </Form.Label>
                        <Col>
                          <Form.Control
                            type="text"
                            placeholder="name"
                            style={{
                              width: "200px",
                              marginLeft: "50px",
                              marginTop: "20px",
                            }}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </Col>
                      </Form.Row>
                      <Form.Row>
                        <Form.Label column lg={6} style={{ marginTop: "20px" }}>
                          Product Id
                        </Form.Label>
                        <Col>
                          <Form.Control
                            type="number"
                            placeholder="unique ID"
                            style={{
                              width: "200px",
                              marginLeft: "50px",
                              marginTop: "20px",
                            }}
                            onChange={(e) => setId(e.target.value)}
                          />
                        </Col>
                      </Form.Row>

                      <Form.Row>
                        <Form.Label column lg={6} style={{ marginTop: "20px" }}>
                          Product Image
                        </Form.Label>
                        <Col>
                          <Form.File
                            custom
                            style={{
                              width: "200px",
                              marginLeft: "-10px",
                              marginTop: "20px",
                            }}
                            onChange={handleImg}
                          >
                            <Form.File.Input isValid />
                            <Form.File.Label
                              data-browse="Browse"
                              style={{ width: "200px" }}
                            />

                            <Form.Control.Feedback type="valid">
                              You did it!
                            </Form.Control.Feedback>
                          </Form.File>
                        </Col>
                      </Form.Row>
                    </Form>
                  </div>
                </Tab>
                <Tab eventKey="pricing" title="Pricing">
                  <h1>hi</h1>
                </Tab>
                <Tab
                  eventKey="Finish"
                  title="Finish"
                  style={{ height: "400px" }}
                >
                  <h1>hi</h1>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
}

export default Catalogue;
