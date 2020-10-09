import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { db, storage } from "../firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStateValue } from "../StateProvider";

function InventoryProduct({ product }) {
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
  });

  const handleMinPrice = async () => {
    async function load(){
      await db.collection("sellers")
      .doc(user?.uid)
      .collection("products")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.data().id === product.id)
            doc.ref.update({ usePrice: "minPrice" });
        });
      });
    }

async function load1(){
  await db.collection("products")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.data().id === product.id)
            doc.ref.update({ usePrice: "minPrice" });
        });
      });
    }
    async function refresh(){
      await  setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
    await load();
    await load1();
    await refresh();

   
  };
  const handleNPrice = async () => {
    async function load(){
      await db.collection("sellers")
        .doc(user?.uid)
        .collection("products")
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc.data().id === product.id)
              doc.ref.update({ usePrice: "nPrice" });
          });
        });
      }
  
  async function load1(){
    await  db.collection("products")
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc.data().id === product.id)
              doc.ref.update({ usePrice: "nPrice" });
          });
        });
      }
      async function refresh(){
        await setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }
      await load();
      await load1();
      await refresh();
  };

  const handleMaxPrice = async () => {
    async function load(){
      await db.collection("sellers")
        .doc(user?.uid)
        .collection("products")
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc.data().id === product.id)
              doc.ref.update({ usePrice: "maxPrice" });
          });
        });
      }
  
  async function load1(){
        await db.collection("products")
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc.data().id === product.id)
              doc.ref.update({ usePrice: "maxPrice" });
          });
        });
      }
      async function refresh(){
         await setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }
      await load();
      await load1();
      await refresh();
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
            ₹<strong className="price">{product.usePrice === "nPrice"? product.nPrice : product.usePrice === "minPrice"?  product.minPrice : product.maxPrice}</strong>
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
            <Button variant="outline-danger" className="Products_button" style={{position:"absolute", right:"50px"}} size="s">
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryProduct;
