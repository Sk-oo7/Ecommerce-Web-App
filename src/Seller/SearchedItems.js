import React, { useEffect, useState } from "react";
import { storage } from "../firebase";
import DisplayProduct from "./DisplayProduct";

function SearchedItems({ product, search }) {
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
  if (search === "" || search === " ") return "";
  else if (product.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    return (
      <div style={{ height: "70px", marginTop: "30px" }} hide={!product}>
        <DisplayProduct
          id={product.id}
          title={product.title}
          pic={url}
          price={product.nPrice}
          rating={0}
          categoryx={product.category}
        />
      </div>
    );
  else return "";
}

export default SearchedItems;
