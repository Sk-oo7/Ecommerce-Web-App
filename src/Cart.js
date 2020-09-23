import React from "react";
import "./Cart.css";
import ad_1 from "./Assets/Img/Ad_1.jpg";
import SubTotal from "./SubTotal.js";
import CartProduct from "./CartProduct";
import { useStateValue } from "./StateProvider";
import EmptyCart from "./EmptyCart.js";

function Cart() {
  const [{ Cart, user }, dispach] = useStateValue();
  return (
    <div className="Cart">
      <div className="Cart_left">
        <img className="Cart_Ad_1" src={ad_1} alt="Ad" />
        <div>
          <h2 className="cart_title">
            Hello, {user?.displayName ? `${user?.displayName}` : "Guest"}. Your
            Shopping Cart
          </h2>
          <EmptyCart />
          <div className="cartProduct">
            {Cart.map((item) => (
              <CartProduct
                id={item.id}
                title={item.title}
                pic={item.pic}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="Cart_right">
        <SubTotal />
      </div>
    </div>
  );
}

export default Cart;
