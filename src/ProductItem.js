import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Products.css";
import { useStateValue } from "./StateProvider";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";

export default function ProductItem({ id, title, pic, price, rating }) {
  const [{ Cart }, dispach] = useStateValue();

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
  };
  const addToWishlist = () => {
    dispach({
      type: "ADD_TO_WISHLIST",
      item: {
        id: id,
        title: title,
        pic: pic,
        price: price,
        rating: rating,
      },
    });
  };
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
            <small style={{}}>
              <FavoriteRoundedIcon />
            </small>{" "}
            Add to WishList
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
