import React, { useEffect, useState } from "react";
import { storage } from "../firebase";

function InventoryProduct({ product }) {
  const [url, setUrl] = useState();
  useEffect(() => {
    async function loadImg() {
      await storage
        .ref(`products/${product.category.toLowerCase()}/${product.id}`)
        .getDownloadURL()
        .then((url) => {
          setUrl(url);
        });
    }
    loadImg();
  }, []);
  return (
    <div className="">
      <div
        className="cartProduct-card"
        style={{
          width: "100%",
          backgroundColor: "white",
          display: "flex",
        }}
      >
        <div>
          <img
            className="ProductItem_img"
            src={url}
            width="100"
            alt="productItem"
            style={{ marginRight: "10px" }}
          ></img>
        </div>
        <div className="product_details">
          <div className="ProductItem_title">{product.title}</div>
          <div className="ProductItem_price" style={{ float: "left" }}>
            ₹<strong className="price">{product.nPrice}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryProduct;
