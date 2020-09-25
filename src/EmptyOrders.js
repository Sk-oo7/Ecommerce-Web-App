import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function EmptyOrders() {
  return (
    <div
      style={{
        color: "grey",
        textAlign: "center",
        marginTop: "10px",
        paddingBottom: "30px",
        backgroundColor: "whitesmoke",
        borderTop: "1px solid lightgray",
        paddingTop: "5px",
      }}
    >
      <h2>No Orders yet</h2>
      <h3>Checkout the latest offers and products available in the store.</h3>
      <Link to="/">
        <Button variant="warning">Start Shopping</Button>
      </Link>
    </div>
  );
}

export default EmptyOrders;
