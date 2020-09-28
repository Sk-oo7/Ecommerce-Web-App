import React, { useEffect, useState } from "react";
import "./SubTotal.css";
import CurrencyFormat from "react-currency-format";
import Button from "react-bootstrap/Button";
import { useStateValue } from "./StateProvider";
import { getCartTotal } from "./reducer";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";

function SubTotal({ Len }) {
  const history = useHistory();
  const [{ Cart, user }, dispach] = useStateValue();
  const [total, setTotal] = useState(0);

  let sum = 0;
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("Cart")
        .onSnapshot((snapshot) =>
          snapshot.docs.map((doc) => {
            sum = parseInt(sum, 10) + parseInt(doc.data().price, 10);
            setTotal(sum);
          })
        );
    }
  }, [Len]);

  if (Len === 0) {
    return (
      <div className="subtotal">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                {" "}
                Subtotal ({Len} Items):
                <strong>{value}</strong>
              </p>

              <small className="subtotal_gift">
                <input type="checkbox" disabled /> This order contains a gift{" "}
              </small>
            </>
          )}
          decimalScale={2}
          value={0}
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
                Subtotal ({Len} Items):
                <strong>{value}</strong>
              </p>

              <small className="subtotal_gift">
                <input type="checkbox" /> This order contains a gift{" "}
              </small>
            </>
          )}
          decimalScale={2}
          value={total}
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
