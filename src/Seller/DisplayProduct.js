import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  OverlayTrigger,
  Row,
  Tab,
  Tabs,
  Tooltip,} from "react-bootstrap";
  import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { useStateValue } from "../StateProvider";
import { db, storage } from "../firebase";

function DisplayProduct({ id, title, pic, price, rating,categoryx }) {
const [modal,ShowModal]=useState(false);
const [category, setCategory] = useState();
  const [titlex, setTitlex] = useState("");
  const [idx, setIdx] = useState();
  const [img, setImg] = useState();
  const [imgname, setImgname] = useState();
  const [done, SetDone] = useState(false);
  const [minPrice, setMinPrice] = useState();
  const [nPrice, setNPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [preview, setPreview] = useState();
  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const [{ user }] = useStateValue();

  const handleModalData =  ()=>{
  
  setCategory(categoryx);
  
   setTitlex(title);

  setIdx(id);
  setNPrice(price);
   ShowModal(true)
  }



  const handleImg = (e) => {
    SetDone(true);
    setImg(e.target.files[0]);
    setImgname(e.target.files[0].name);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleProduct = async (e) => {
    e.preventDefault();
    if (user) {
      await db.collection("products").add({
        id: idx,
        nPrice: nPrice,
        title: titlex,
        minPrice: minPrice,
        maxPrice: maxPrice,
        usePrice: "nPrice",
        category: category,
        seller :user?.uid,
      });
      await storage.ref(`products/${category.toLowerCase()}/${id}`).put(img);
      await window.location.reload(false);
    }
    if (user?.uid) {
      await db.collection("sellers").doc(user.uid).collection("products").add({
        id: idx,
        nPrice: nPrice,
        title: titlex,
        minPrice: minPrice,
        maxPrice: maxPrice,
        usePrice: "nPrice",
        category: category,
        seller :user?.uid,
      });
    }
  };
  const checkId =() =>{
    setDisable(false);
    db.collection("products").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.data().id === idx){ alert("ID taken, please enter different ID")
        setDisable(true);
      }
      
      });
    });
   
  }

  return (
    <div
      className="cartProduct-card"
      style={{
        width: "100%",
        backgroundColor: "white",
        display: "flex",
      }}
    >
      <div>
        <img
          className="ProductItem_img"
          src={pic}
          width="100"
          alt="productItem"
          style={{ marginRight: "10px" }}
        ></img>
      </div>
      <div className=" ">
        <div className="ProductItem_title">{title}</div>
        <div className="ProductItem_price" style={{ float: "left" }}>
          ₹<strong className="price">{price}</strong>
        </div>

        <div style={{position:"absolute" , right:"40px"}}> 
          <Button variant="outline-secondary" onClick={handleModalData}>Sell this product</Button>
        </div>
        <Modal show={modal} 
        aria-labelledby="contained-modal-title-vcenter"
        as="section"
        centered
        size="md"
        restoreFocus={true}
        style={{ opacity: "1" }}
        >
          <Modal.Header closeButton onClick={() =>ShowModal(false)}>
          <h3>List existing product</h3>
          </Modal.Header>
          <Modal.Body>
          <Col>
            
            <div
              style={{
                backgroundColor: "white",
                padding: "10px 10px 10px 10px",
                border: "1px solid lightgray",
                borderRadius: "5px",
              }}
            >
              <Tabs defaultActiveKey="" id="uncontrolled-tab-example">
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
                            }}
                            
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
                              marginTop: "20px",
                            }}
                            value={titlex}
                            onChange={(e) => setTitlex(e.target.value)}
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
                              marginTop: "20px",
                            }}
                            value={idx}
                            onChange={(e) => setIdx(e.target.value)}
                            onBlur={checkId}
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
                              marginTop: "20px",
                            }}
                            value={price}
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
                                You can select any price among these according
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
                  <h6 style={{ marginTop: "10px", marginBottom: "20px" }}>
                    Preview your product
                  </h6>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowModal(true)}
                  >
                    Preview
                  </Button>
                  <br />

                  <Button
                    disabled={
                      !category ||
                      !titlex ||
                      disable ||
                      !img ||
                      !nPrice ||
                      !maxPrice ||
                      !minPrice
                    }
                    variant="outline-success"
                    style={{ marginTop: "10px" }}
                    onClick={handleProduct}
                  >
                    Submit Product
                  </Button>
                  <Modal
                    show={showModal}
                    aria-labelledby="contained-modal-title-vcenter"
                    as="section"
                    centered
                    size="md"
                    restoreFocus={true}
                    style={{ opacity: "1" }}
                  >
                    <Modal.Header
                      closeButton
                      onClick={() => setShowModal(false)}
                    >
                      <Modal.Title>Your product will look like</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Card
                        style={{
                          margin: "20px 20px 20px 20px",
                        }}
                      >
                        <center>
                          <Card.Img
                            className="ProductItem_img"
                            variant="top"
                            src={preview}
                          />
                        </center>
                        <Card.Body>
                          <Card.Title className="ProductItem_title">
                            {titlex}
                          </Card.Title>
                          <Card.Text>
                            <div className="ProductItem_price">
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
                            <Button
                              variant="danger"
                              style={{ marginLeft: "20px" }}
                            >
                              <small>
                                <FavoriteRoundedIcon />
                              </small>{" "}
                              Add to WishList
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Modal.Body>
                  </Modal>
                </Tab>
              </Tabs>
            </div>
          </Col>

          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default DisplayProduct;
