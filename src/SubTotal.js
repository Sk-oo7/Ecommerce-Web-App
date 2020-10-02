import React, { useEffect, useState } from "react";
import "./SubTotal.css";
import CurrencyFormat from "react-currency-format";
import Button from "react-bootstrap/Button";
import { useStateValue } from "./StateProvider";
import { getCartTotal } from "./reducer";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";
import { Modal } from "react-bootstrap";

function SubTotal({ Len }) {
  const history = useHistory();
  const [{ Cart, user }, dispach] = useStateValue();
  const [total, setTotal] = useState(0);
  const [guest, setGuest] = useStateValue();
  const [signInModal, showSignInModal] = useState(false);

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
    } else if (guest?.guest) {
      db.collection("guests")
        .doc(guest?.guest)
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
  } else if (Len !== 0 && user) {
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
  } else if (guest?.guest && Len !== 0) {
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
        <Button variant="warning" onClick={() => showSignInModal(true)}>
          Proceed to Checkout
        </Button>

        <Modal
          show={signInModal}
          aria-labelledby="contained-modal-title-vcenter"
          as="section"
          centered
          className="modal"
          size="md"
          restoreFocus={true}
        >
          <Modal.Header closeButton onClick={() => showSignInModal(false)}>
            <Modal.Title>SignIn required!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Dear user, Please SignIn to place your order.</p>
          </Modal.Body>
        </Modal>

        {/* <Modal
          show={signInModal}
          aria-labelledby="contained-modal-title-vcenter"
          as="section"
          centered
          className="modal"
          size="md"
          restoreFocus={true}
        >
          <Modal.Header closeButton>hi</Modal.Header>
          <Modal.Body>
            <div
              className="cartProduct-card"
              style={{
                width: "100%",
                backgroundColor: "white",
                display: "flex",
                marginBottom: "20px",
              }}
            >
              <div
                className="product_details"
                style={{ margin: "20px 20px 20px 20px" }}
              ></div>
            </div>
          </Modal.Body>
        </Modal> */}
      </div>
    );
  }
}

export default SubTotal;
