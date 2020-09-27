import React, { useEffect, useState } from "react";
import "./Cart.css";
import ad_1 from "./Assets/Img/Ad_1.jpg";
import SubTotal from "./SubTotal.js";
import CartProduct from "./CartProduct";
import { useStateValue } from "./StateProvider";
import EmptyCart from "./EmptyCart.js";
import { db } from "./firebase";

function Cart() {
  const [{ user, Wishlist }, dispatch] = useStateValue();
  const [cart, setcart] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("Cart")
        .onSnapshot((snapshot) =>
          setcart(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
            }))
          )
        );
    }
  }, [user]);

  return (
    <div className="Cart">
      <div className="Cart_left">
        <img className="Cart_Ad_1" src={ad_1} alt="Ad" />
        <div>
          <h2 className="cart_title">
            Hello,{" "}
            {user?.displayName
              ? `${user?.displayName}`
              : `${user?.email ? `${user?.email}` : "Guest"}`}
            . Your Shopping Cart
          </h2>
          {cart?.length === 0 && <EmptyCart />}
          <div className="cartProduct">
            {cart.map((item) => (
              <CartProduct
                id={item.data.id}
                title={item.data.title}
                pic={item.data.pic}
                price={item.data.price}
                rating={item.data.rating}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="Cart_right">
        <SubTotal Len={cart?.length} />
      </div>
    </div>
  );
}

export default Cart;
