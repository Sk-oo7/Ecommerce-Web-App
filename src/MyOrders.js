import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import Order from "./Order.js";
import "./MyOrders.css";
import EmptyOrders from "./EmptyOrders";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [{ user, Cart }, dispach] = useStateValue([]);
  const [guest, setGuest] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  useEffect(() => {
    if (guest?.guest) {
      db.collection("guests")
        .doc(guest?.guest)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [guest]);

  return (
    <div className="orders">
      <h1>My Orders</h1>
      {orders?.length === 0 && <EmptyOrders />}
      <div className="orders_order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
