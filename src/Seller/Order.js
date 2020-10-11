import React from 'react'
import CurrencyFormat from 'react-currency-format'
import CartProduct from '../CartProduct'
import moment from "moment";

function Order({order}) {
    return (
       
      <div className="order">
      <h2>Order</h2>
      <p className="order_time">
        {moment.unix(order.created).format("Do MMMM YYYY, h:mma")}
      </p>
      <p className="order_id">
        <small>{order.id}</small>
      </p>
      <div className="cartProduct">
        
          <CartProduct
            id={order.data.id}
            title={order.data.title}
            pic={order.data.pic}
            price={order.data.price}
            rating={order.data.rating}
            hideButton
            showUser={true}
            to={order.user}
          />
        
      </div>
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order_total">Order Total: {value} </h3>
        )}
        decimalScale={2}
        value={order.data.price}
        displayType={"text"}
        thousandSpacing={"2s"}
        prefix={"₹"}
      />
    
    </div>
      
    )
}

export default Order
