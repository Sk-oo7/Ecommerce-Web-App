import { SendTwoTone } from "@material-ui/icons";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Jumbotron,
  OverlayTrigger,
  Row,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import { storage } from "../firebase";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";

function Catalogue() {
  const [category, setCategory] = useState();
  const [title, setTitle] = useState();
  const [id, setId] = useState();
  const [img, setImg] = useState();
  const [imgname, setImgname] = useState();
  const [done, SetDone] = useState(false);
  const [minPrice, setMinPrice] = useState();
  const [nPrice, setNPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [preview, setPreview] = useState();

  const handleImg = async (e) => {
    SetDone(true);
    setImg(e.target.files[0]);
    setImgname(e.target.files[0].name);
    setPreview(URL.createObjectURL(e.target.files[0]));
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
                <Tab
                  eventKey="details"
                  title="Product Details"
                  style={{ height: "40vh" }}
                >
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
                            <option>-select-</option>
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
                          >
                            {!done && <Form.File.Input onChange={handleImg} />}
                            {done && (
                              <Form.File.Input isValid onChange={handleImg} />
                            )}
                            <Form.File.Label
                              data-browse="Browse"
                              style={{ width: "200px" }}
                            />

                            <Form.Control.Feedback type="valid">
                              {imgname}
                            </Form.Control.Feedback>
                          </Form.File>
                        </Col>
                      </Form.Row>
                    </Form>
                  </div>
                </Tab>
                <Tab
                  eventKey="pricing"
                  title="Pricing"
                  style={{ height: "40vh" }}
                >
                  <h6 style={{ marginTop: "10px" }}>
                    Please enter and select pricing
                  </h6>
                  <div>
                    <Form
                      style={{
                        padding: "10px 10px 10px 10px",
                      }}
                    >
                      <Form.Row>
                        <Form.Label column lg={6} style={{ marginTop: "20px" }}>
                          Minimum Price
                        </Form.Label>
                        <Col>
                          <Form.Control
                            type="number"
                            placeholder="min price"
                            style={{
                              width: "200px",
                              marginLeft: "50px",
                              marginTop: "20px",
                            }}
                            onChange={(e) => setMinPrice(e.target.value)}
                          />
                        </Col>
                      </Form.Row>
                      <Form.Row>
                        <Form.Label column lg={6} style={{ marginTop: "20px" }}>
                          Normal Price
                        </Form.Label>
                        <Col>
                          <Form.Control
                            type="number"
                            placeholder="normal price (default)"
                            style={{
                              width: "200px",
                              marginLeft: "50px",
                              marginTop: "20px",
                            }}
                            onChange={(e) => setNPrice(e.target.value)}
                          />
                        </Col>
                      </Form.Row>
                      <Form.Row>
                        <Form.Label column lg={6} style={{ marginTop: "20px" }}>
                          Maximum Price
                        </Form.Label>
                        <Col>
                          <Form.Control
                            type="number"
                            placeholder="max price"
                            style={{
                              width: "200px",
                              marginLeft: "50px",
                              marginTop: "20px",
                            }}
                            onChange={(e) => setMaxPrice(e.target.value)}
                          />
                        </Col>
                      </Form.Row>
                      <Form.Row
                        style={{
                          marginTop: "20px",
                          position: "absolute",
                          right: "50px",
                        }}
                      >
                        <Col>
                          <OverlayTrigger
                            placement="bottom"
                            overlay={
                              <Tooltip>
                                You can select any price amony these according
                                to sales and seasons from Inventory.
                              </Tooltip>
                            }
                          >
                            <HelpOutlineIcon />
                          </OverlayTrigger>
                        </Col>
                      </Form.Row>
                    </Form>
                  </div>
                </Tab>
                <Tab
                  eventKey="Finish"
                  title="Finish"
                  style={{ height: "40vh" }}
                >
                  <h6 style={{ marginTop: "10px" }}>Preview your product</h6>
                  {/* <Card
                    style={{
                      width: "340px",
                      margin: "20px 20px 20px 20px",
                    }}
                  >
                    <center>
                      <Card.Img
                        className="ProductItem_img"
                        variant="top"
                        src={preview}
                        style={{
                          maxHeight: "220px",
                          overflow: "hidden",
                          objectFit: "cover",
                        }}
                      />
                    </center>
                    <Card.Body>
                      <Card.Title className="ProductItem_title">
                        {title}
                      </Card.Title>
                      <Card.Text>
                        <div
                          className="ProductItem_price"
                          style={{ position: "absolute", bottom: "16vh" }}
                        >
                          ₹<strong className="price">{nPrice}</strong>
                        </div>
                        <div className="ProductItem_rating">
                          {Array(5)
                            .fill()
                            .map((_, i) => (
                              <p>
                                <span role="img" aria-label="ratingStar">
                                  ⭐
                                </span>
                              </p>
                            ))}
                        </div>
                      </Card.Text>
                      <div className="ActionButtons">
                        <Button variant="warning">Add to Cart</Button>
                        <Button variant="danger" style={{ marginLeft: "20px" }}>
                          <small>
                            <FavoriteRoundedIcon />
                          </small>{" "}
                          Add to WishList
                        </Button>
                      </div>
                    </Card.Body>
                  </Card> */}
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
