import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import Order from './Order';
import { useStateValue } from '../StateProvider';
import EmptyOrders from "../EmptyOrders";

function Orders() {
    const [{ user}] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
          db.collection("sellers")
            .doc(user?.uid)
            .collection("orders")
            .orderBy("created", "desc")
            .onSnapshot((snapshot) =>
              setOrders(
                snapshot.docs.map((doc) => ({
                  id: doc.data().order_id,
                  data: doc.data().data,
                  user:doc.data().user,
                  created:doc.data().created
                }))
              )
            );
        } else {
          setOrders([]);
        }
      }, [user]);

    return (
        <div className="orders">
        <h1>Orders</h1>
        {orders?.length === 0 && <EmptyOrders hide={true}/>}
        {orders?.map((order) => (
          <Order order={order} />
        ))}
        </div>
    )
}

export default Orders
