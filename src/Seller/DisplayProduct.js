import React from "react";
import { Button } from "react-bootstrap";

function DisplayProduct({ id, title, pic, price, rating }) {
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
      <div className="product_details">
        <div className="ProductItem_title">{title}</div>
        <div className="ProductItem_price" style={{ float: "left" }}>
          ₹<strong className="price">{price}</strong>
        </div>

        <div className="">
          <Button variant="warning">Select</Button>
        </div>
      </div>
    </div>
  );
}

export default DisplayProduct;
