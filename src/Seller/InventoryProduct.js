import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { db, storage } from "../firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";

function InventoryProduct({ product }) {
  const history = useHistory();
  const [url, setUrl] = useState();
  const [{ user }] = useStateValue();
  const [disable, setDisable] = useState();

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
    db.collection("sellers")
      .doc(user?.uid)
      .collection("products")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.data().id === product.id) setDisable(doc.data().usePrice);
        });
      });
  }, []);

  const handleMinPrice = async () => {
    db.collection("sellers")
      .doc(user?.uid)
      .collection("products")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.data().id === product.id)
            doc.ref.update({ usePrice: "minPrice" });
        });
      });

    setTimeout(() => {
      window.location.reload(false);
    }, 200);
  };
  const handleNPrice = () => {
    db.collection("sellers")
      .doc(user?.uid)
      .collection("products")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.data().id === product.id)
            doc.ref.update({ usePrice: "nPrice" });
        });
      });

    setTimeout(() => {
      window.location.reload(false);
    }, 200);
  };

  const handleMaxPrice = () => {
    db.collection("sellers")
      .doc(user?.uid)
      .collection("products")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.data().id === product.id)
            doc.ref.update({ usePrice: "maxPrice" });
        });
      });

    setTimeout(() => {
      window.location.reload(false);
    }, 200);
  };

  return (
    <div className="">
      <div
        className="Product-card"
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
            width="200"
            alt="productItem"
            style={{ marginRight: "10px" }}
          ></img>
        </div>
        <div className="product_details">
          <div className="ProductItem_title">{product.title}</div>
          <div className="ProductItem_price">
            ₹<strong className="price">{product.nPrice}</strong>
          </div>
          <div className="Inventory_buttons">
            <Button
              variant="outline-warning"
              className="Products_button"
              disabled={disable === "minPrice"}
              onClick={handleMinPrice}
            >
              Sell for Min-price
            </Button>
            <Button
              variant="outline-primary"
              className="Products_button"
              disabled={disable === "nPrice"}
              onClick={handleNPrice}
            >
              Sell for Nm-price
            </Button>
            <Button
              variant="outline-success"
              className="Products_button"
              disabled={disable === "maxPrice"}
              onClick={handleMaxPrice}
            >
              Sell for Max-price
            </Button>
            <Button variant="outline-danger" className="Products_button">
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryProduct;
