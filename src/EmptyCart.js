import { green, grey } from "@material-ui/core/colors";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function EmptyCart() {
  const [{ Cart }, dispach] = useStateValue();
  if (Cart?.length == 0)
    return (
      <div style={{ color: "grey", textAlign: "center" }}>
        <h2>Your cart is empty!</h2>
        <h3>Explore more items and get them in your cart.</h3>
        <Link to="/">
          <Button variant="warning">Start Shopping</Button>
        </Link>
      </div>
    );
  else return null;
}

export default EmptyCart;
