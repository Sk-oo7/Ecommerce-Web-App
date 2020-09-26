import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import "./Wishlist.css";
import CartProduct from "./CartProduct";
import EmptyWishlist from "./EmptyWishlist";
import { db } from "./firebase";

function Wishlist() {
  const [{ user, Wishlist }, dispatch] = useStateValue();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("Wishlist")
        .onSnapshot((snapshot) =>
          setList(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
            }))
          )
        );
    }
  }, [user]);

  return (
    <div className="list_back">
      <div className="wishlist">
        <h1>Wishlist</h1>
        {list?.length === 0 && <EmptyWishlist />}

        <div className="wishlist_items">
          {list.map((item) => (
            <CartProduct
              id={item.data.id}
              title={item.data.title}
              pic={item.data.pic}
              price={item.data.price}
              rating={item.data.rating}
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
