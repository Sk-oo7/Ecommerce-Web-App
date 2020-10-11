import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function EmptyOrders({hide}) {
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
      {!hide && <h3>Checkout the latest offers and products available in the store.</h3>}
      {hide && <h3>List products from Catalogue to get orders from users. Happy Selling!</h3>}
      {!hide && <Link to="/">
        <Button variant="warning">Start Shopping</Button>
      </Link>}
    </div>
  );
}

export default EmptyOrders;
