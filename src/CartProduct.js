import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";

function CartProduct({
  id,
  title,
  pic,
  price,
  rating,
  hideButton,
  showWishlistButton,
  showCartButton,
}) {
  const [{ user, Cart }, dispach] = useStateValue();
  const [guest, setGuest] = useStateValue();

  let x = id;
  const removeFromCart = () => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("Cart")
        .onSnapshot((snapshot) =>
          snapshot.docs.map((doc) => {
            if (doc.data().id == id) {
              doc.ref.delete();
              id = -1;
            }
          })
        );
      id = x;
    } else if (guest?.guest) {
      db.collection("guests")
        .doc(guest?.guest)
        .collection("Cart")
        .onSnapshot((snapshot) =>
          snapshot.docs.map((doc) => {
            if (doc.data().id == id) {
              doc.ref.delete();
              id = -1;
            }
          })
        );
      id = x;
    }
  };
  let y = id;
  const removeFromWishlist = () => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("Wishlist")
        .onSnapshot((snapshot) =>
          snapshot.docs.map((doc) => {
            if (doc.data().id == id) {
              doc.ref.delete();
              id = -1;
            }
          })
        );
      id = y;
    } else if (guest?.guest) {
      db.collection("guests")
        .doc(guest?.guest)
        .collection("Wishlist")
        .onSnapshot((snapshot) =>
          snapshot.docs.map((doc) => {
            if (doc.data().id == id) {
              doc.ref.delete();
              id = -1;
            }
          })
        );
      id = y;
    }
  };
  let z = id;
  const addToCart = () => {
    if (user) {
      db.collection("users").doc(user?.uid).collection("Cart").add({
        title: title,
        id: id,
        pic: pic,
        price: price,
        rating: rating,
      });
      db.collection("users")
        .doc(user?.uid)
        .collection("Wishlist")
        .onSnapshot((snapshot) =>
          snapshot.docs.map((doc) => {
            if (doc.data().id == id) {
              doc.ref.delete();
              id = -1;
            }
          })
        );
      id = z;
    } else if (guest?.guest) {
      db.collection("guests").doc(guest?.guest).collection("Cart").add({
        title: title,
        id: id,
        pic: pic,
        price: price,
        rating: rating,
      });
      db.collection("guests")
        .doc(guest?.guest)
        .collection("Wishlist")
        .onSnapshot((snapshot) =>
          snapshot.docs.map((doc) => {
            if (doc.data().id == id) {
              doc.ref.delete();
              id = -1;
            }
          })
        );
      id = z;
    }
  };
  return (
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
          width="200"
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
        {!hideButton && (
          <Button variant="danger" onClick={removeFromCart}>
            Remove from Cart
          </Button>
        )}
        {showCartButton && (
          <Button variant="warning" onClick={addToCart}>
            Add to Cart
          </Button>
        )}{" "}
        {showWishlistButton && (
          <Button
            variant="danger"
            onClick={removeFromWishlist}
            style={{ marginLeft: "10px" }}
          >
            Remove from Wishlist
          </Button>
        )}
      </div>
    </div>
  );
}

export default CartProduct;
