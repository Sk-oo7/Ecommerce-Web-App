import React from "react";
import "./SubTotal.css";
import CurrencyFormat from "react-currency-format";
import Button from "react-bootstrap/Button";
import { useStateValue } from "./StateProvider";
import { getCartTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function SubTotal() {
  const history = useHistory();
  const [{ Cart }, dispach] = useStateValue();
  if (Cart?.length === 0) {
    return (
      <div className="subtotal">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                {" "}
                Subtotal ({Cart.length} Items):
                <strong>{value}</strong>
              </p>

              <small className="subtotal_gift">
                <input type="checkbox" disabled /> This order contains a gift{" "}
              </small>
            </>
          )}
          decimalScale={2}
          value={getCartTotal(Cart)}
          displayType={"text"}
          thousandSpacing={"2s"}
          prefix={"₹"}
        />
        <Button variant="warning" disabled>
          Proceed to Checkout
        </Button>
      </div>
    );
  } else {
    return (
      <div className="subtotal">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                {" "}
                Subtotal ({Cart.length} Items):
                <strong>{value}</strong>
              </p>

              <small className="subtotal_gift">
                <input type="checkbox" /> This order contains a gift{" "}
              </small>
            </>
          )}
          decimalScale={2}
          value={getCartTotal(Cart)}
          displayType={"text"}
          thousandSpacing={"2s"}
          prefix={"₹"}
        />
        <Button variant="warning" onClick={(e) => history.push("/payment")}>
          Proceed to Checkout
        </Button>
      </div>
    );
  }
}

export default SubTotal;
