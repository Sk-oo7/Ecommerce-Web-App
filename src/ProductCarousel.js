import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { isMobile } from "react-device-detect";

import ProductItem from "./ProductItem.js";
import { db } from "./firebase.js";

export default function ProductCarousel() {
  const [products,setProducts]=useState();

  useEffect(()=>{
    
    db.collection("products")
    .orderBy("id")
    .onSnapshot((snapshot) =>
    setProducts(
          snapshot.docs.map((doc) => {
            if(doc.data().category === "Premium" && doc.data().id > 7 )
            return doc.data()
            else return {}
            
          })
        )
      );
},[])
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <div className="div_Carousel_Products" id="features">
      <hr />
      <center>
        <h1>Premium Products</h1>
      </center>

      {products && <Carousel
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        infinite={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        autoPlay={!isMobile}
        autoPlaySpeed={2000}
      >
        

           {products?.map((product)=>
        product?.id >7 && 
        <div className="div_product_carousel">
        <ProductItem
          id={product?.id}
          title={product?.title}
          price={product.usePrice === "nPrice"? product.nPrice : product.usePrice === "minPrice"?  product.minPrice : product.maxPrice}
          rating={Math.floor(Math.random()*(3)+3)}
          category={product?.category}
        />
        </div>
        )}
        
      </Carousel>}
    </div>
  );
}
