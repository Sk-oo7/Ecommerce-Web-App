import React from "react";
import "./SubTotal.css";
import CurrencyFormat from "react-currency-format";
import Button from "react-bootstrap/Button";
import { useStateValue } from "./StateProvider";

function SubTotal() {
  const [{ Cart }, dispach] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {" "}
              Subtotal ({Cart.length} Items):
              <strong>{/*{` ${value}`}*/}0</strong>
            </p>

            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift{" "}
            </small>
          </>
        )}
        decimalScale={2}
        value={0}
        displayType={"text"}
        thousandSpacing={"2s"}
        prefix={"₹"}
      />
      <Button variant="warning">Proceed to Checkout</Button>
    </div>
  );
}

export default SubTotal;
