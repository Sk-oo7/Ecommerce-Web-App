import React from "react";
import "./CartProduct.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useStateValue } from "./StateProvider";

function CartProduct({ id, title, pic, price, rating }) {
  const [{ Cart }, dispach] = useStateValue();

  const removeFromCart = () => {
    dispach({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };
  return (
    <Card
      className="cartProduct-card"
      style={{ width: "200px", margin: "20px 20px 20px 20px" }}
    >
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

        <Button variant="danger" onClick={removeFromCart}>
          Remove from Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CartProduct;
