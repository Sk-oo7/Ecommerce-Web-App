import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function EmptyWishlist() {
  const [{ Wishlist }, dispach] = useStateValue();
  return (
    <div style={{ color: "grey", textAlign: "center" }}>
      <h2>Your Wishlist is empty!</h2>
      <h3>Explore more and shortlist some items.</h3>
      <Link to="/">
        <Button variant="warning">Start Shopping</Button>
      </Link>
    </div>
  );
}

export default EmptyWishlist;
