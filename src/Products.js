import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem.js";
import "./Products.css";
import { db } from "./firebase.js";
import { useStateValue } from "./StateProvider.js";

export default function Products() {
  const [products,setProducts]=useState([]);
  const [{ user }] = useStateValue();

  useEffect(()=>{
    
      db.collection("products")
      .orderBy("id")
      .onSnapshot((snapshot) =>
      setProducts(
            snapshot.docs.map((doc) => {
              if(doc.data().category === "Basic" && doc.data().seller==="" && doc.data().id <= 7)
              return doc.data()
              else return {}
              
            })
          )
        );
  },[])


  return (
    <div className="products">
      <div className="products_row_1">
        {products.map((product)=>
        product?.id <= 4 && <ProductItem
          id={product?.id}
          title={product?.title}
          price={product.usePrice === "nPrice"? product.nPrice : product.usePrice === "minPrice"?  product.minPrice : product.maxPrice}
          rating={Math.floor(Math.random()*(3)+3)}
          category={product?.category}
          seller={product?.seller}
        />
        
        )}
       
      </div>

      <div className="products_row_2">
      {products.map((product)=>
        product?.id >=5 && product?.id<=7 && <ProductItem
          id={product?.id}
          title={product?.title}
          price={product?.nPrice}
          rating={Math.floor(Math.random()*(3)+3)}
          category={product?.category}
          seller={product?.seller}
        />
        
        )}
      </div>
    </div>
  );
}
