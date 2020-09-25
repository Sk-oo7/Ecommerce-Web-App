import React from "react";
import { useStateValue } from "./StateProvider";
import "./Wishlist.css";
import CartProduct from "./CartProduct";
import EmptyWishlist from "./EmptyWishlist";

function Wishlist() {
  const [{ Wishlist }, dispatch] = useStateValue();
  return (
    <div className="list_back">
      <div className="wishlist">
        <h1>Wishlist</h1>
        <EmptyWishlist />
        <div className="wishlist_items">
          {Wishlist.map((item) => (
            <CartProduct
              id={item.id}
              title={item.title}
              pic={item.pic}
              price={item.price}
              rating={item.rating}
              hideButton
              showWishlistButton
              showCartButton
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
