import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import InventoryProduct from "./InventoryProduct";
import { useStateValue } from "../StateProvider";
import "./Inventory.css";

function Inventory() {
  const [{ user }] = useStateValue();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("sellers")
        .doc(user?.uid)
        .collection("products")
        .onSnapshot((snapshot) => {
          setProducts(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
            }))
        )
    })
  }
  }, [user]);
  return (
    <div>
      <div className="products_Inventory products">
        <h1>Your Products</h1>
        <div className="products_back">
          <div className="products_product">
            {products?.map((product) => (
              <InventoryProduct product={product.data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
