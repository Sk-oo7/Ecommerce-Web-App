import React from "react";
import "./Cart.css";
import ad_1 from "./Assets/Img/Ad_1.jpg";
import SubTotal from "./SubTotal.js";

function Cart() {
  return (
    <div className="Cart">
      <div className="Cart_left">
        <img className="Cart_Ad_1" src={ad_1} alt="Ad" />
        <div className="cart_title">
          <h2>Your Shopping Cart</h2>
        </div>
      </div>
      <div className="Cart_right">
        <SubTotal />
      </div>
    </div>
  );
}

export default Cart;
