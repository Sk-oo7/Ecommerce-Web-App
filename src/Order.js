import React from "react";
import CartProduct from "./CartProduct";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import "./Order.css";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p className="order_time">
        {moment.unix(order.data.created).format("Do MMMM YYYY, h:mma")}
      </p>
      <p className="order_id">
        <small>{order.id}</small>
      </p>
      <div className="cartProduct">
        {order.data.Cart?.map((item) => (
          <CartProduct
            id={item.id}
            title={item.title}
            pic={item.pic}
            price={item.price}
            rating={item.rating}
            hideButton
          />
        ))}
      </div>
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order_total">Order Total: {value} </h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSpacing={"2s"}
        prefix={"₹"}
      />
    </div>
  );
}

export default Order;
