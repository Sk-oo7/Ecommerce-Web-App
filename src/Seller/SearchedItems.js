import React from "react";
import CartProduct from "../CartProduct";

function SearchedItems({ product }) {
  return (
    <div>
      {/* {prod.data.Cart?.map((item) => ( */}
      <CartProduct
        id={product.id}
        title={product.title}
        pic={product.pic}
        price={product.nPrice}
        rating={5}
        hideButton
      />
      {/* ))} */}
    </div>
  );
}

export default SearchedItems;
