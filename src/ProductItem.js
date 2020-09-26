import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Products.css";
import { useStateValue } from "./StateProvider";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import Modal from "react-bootstrap/Modal";
import { db } from "./firebase";

export default function ProductItem({ id, title, pic, price, rating }) {
  const [{ user, Cart, Wishlist }, dispach] = useStateValue();
  const [search, setSearch] = useStateValue();
  const [showModal, setShowMoadal] = useState(false);
  const [showWishModal, setShowWishMoadal] = useState(false);

  useEffect(() => {
    if (showModal === true) {
      setTimeout(() => {
        setShowMoadal(false);
      }, 2000);
    }
    if (showWishModal === true) {
      setTimeout(() => {
        setShowWishMoadal(false);
      }, 2000);
    }
  });

  const addToCart = () => {
    dispach({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        pic: pic,
        price: price,
        rating: rating,
      },
    });

    setShowMoadal(true);
  };
  const addToWishlist = () => {
    db.collection("users").doc(user?.uid).collection("Wishlist").add({
      title: title,
      id: id,
      pic: pic,
      price: price,
      rating: rating,
    });
    setShowWishMoadal(true);
  };
  if (
    search.search !== "" &&
    title.toLowerCase().indexOf(search.search.toLowerCase()) === -1
  ) {
    return null;
  }
  return (
    <Card style={{ width: "500px", margin: "20px 20px 20px 20px" }}>
      <Card.Img className="ProductItem_img" variant="top" src={pic} />
      <Card.Body>
        <Card.Title className="ProductItem_title">{title}</Card.Title>
        <Card.Text>
          <div className="ProductItem_price">
            ₹<strong className="price">{price}</strong>
          </div>
          <div className="ProductItem_rating">
            {Array(rating)
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
          <Button variant="warning" onClick={addToCart}>
            Add to Cart
          </Button>
          <Button
            variant="danger"
            onClick={addToWishlist}
            style={{ marginLeft: "20px" }}
          >
            <small>
              <FavoriteRoundedIcon />
            </small>{" "}
            Add to WishList
          </Button>
        </div>
      </Card.Body>
      <Modal
        show={showModal ? showModal : showWishModal}
        aria-labelledby="contained-modal-title-vcenter"
        as="section"
        centered
        className="modal"
        size="md"
      >
        <Modal.Body>
          <h1>
            Added to {showModal ? "Cart" : ""}
            {showWishModal ? "Wishlist" : ""}
          </h1>
          <hr />
          <div
            className="cartProduct-card"
            style={{
              width: "100%",
              backgroundColor: "white",
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <div style={{ margin: "20px 20px 20px 20px" }}>
              <img
                className="ProductItem_img"
                src={pic}
                width="100"
                alt="productItem"
              ></img>
            </div>
            <div
              className="product_details"
              style={{ margin: "20px 20px 20px 20px" }}
            >
              <div className="ProductItem_title">{title}</div>
              <div className="ProductItem_price">
                ₹<strong className="price">{price}</strong>
              </div>
              <div className="ProductItem_rating">
                {Array(rating)
                  .fill()
                  .map((_, i) => (
                    <p>
                      <span role="img" aria-label="ratingStar">
                        ⭐
                      </span>
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Card>
  );
}
