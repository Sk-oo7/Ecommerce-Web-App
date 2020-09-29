import React, { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import Button from "react-bootstrap/Button";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ Cart, user, Wishlist }, dispach] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  const [cart, setcart] = useState([]);
  const [total, setTotal] = useState(0);
  const [guest, setGuest] = useStateValue();

  const getCartTotal = () => {
    return total;
  };

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

  useEffect(() => {
    if (guest?.guest) {
      db.collection("guests")
        .doc(guest?.guest)
        .collection("Cart")
        .onSnapshot((snapshot) =>
          setcart(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
            }))
          )
        );
    }
  }, [guest]);

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
  }, [cart]);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${total * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [total]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        if (user) {
          db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              Cart: cart,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });
        } else if (guest?.guest) {
          db.collection("guests")
            .doc(guest?.guest)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              Cart: cart,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });
        }

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        // dispach({
        //   type: "EMPTY_CART",
        // });

        if (user) {
          db.collection("users")
            .doc(user?.uid)
            .collection("Cart")
            .onSnapshot((snapshot) =>
              snapshot.docs.map((doc) => {
                doc.ref.delete();
              })
            );
        } else if (guest?.guest) {
          db.collection("guests")
            .doc(guest?.guest)
            .collection("Cart")
            .onSnapshot((snapshot) =>
              snapshot.docs.map((doc) => {
                doc.ref.delete();
              })
            );
        }

        history.replace("/orders");
        window.location.reload();
      });
  };
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/Cart">{cart?.length} items</Link>)
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.displayName}</p>
            <p>{user?.email}</p>
            <p>Nangal, Jawahar Market</p>
            <p>Punjab, India</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment_items">
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

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              {cart?.length !== 0 && (
                <div className="payment_priceContainer">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total: {value} </h3>}
                    decimalScale={2}
                    value={total}
                    displayType={"text"}
                    thousandSpacing={"2s"}
                    prefix={"₹"}
                  />
                  <Button
                    type="submit"
                    variant="warning"
                    disabled={processing || disabled || succeeded}
                  >
                    <span>
                      {processing ? <p>Processing</p> : "Place Order"}
                    </span>
                  </Button>
                </div>
              )}

              {cart?.length === 0 && (
                <div className="payment_priceContainer">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total: {value} </h3>}
                    decimalScale={2}
                    value={0}
                    displayType={"text"}
                    thousandSpacing={"2s"}
                    prefix={"₹"}
                  />
                  <Button type="submit" variant="warning" disabled={true}>
                    <span>
                      {processing ? <p>Processing</p> : "Place Order"}
                    </span>
                  </Button>
                </div>
              )}

              <div>{error && <div>{error}</div>}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
