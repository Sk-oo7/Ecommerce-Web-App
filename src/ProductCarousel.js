import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { isMobile } from "react-device-detect";

import ProductItem from "./ProductItem.js";
import product_carousel_1 from "./Assets/Img/Product_Carousel_1.jpg";
import product_carousel_2 from "./Assets/Img/Product_Carousel_2.jpg";
import product_carousel_3 from "./Assets/Img/Product_Carousel_3.jpg";
import product_carousel_4 from "./Assets/Img/Product_Carousel_4.jpg";
import product_carousel_5 from "./Assets/Img/Product_Carousel_5.jpg";
import product_carousel_6 from "./Assets/Img/Product_Carousel_6.jpg";

export default function ProductCarousel() {
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
        <h1>Apple Products</h1>
      </center>

      <Carousel
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
        <div className="div_product_carousel">
          <ProductItem
            id={8}
            title="Apple iPhone 11 Pro Max (256GB) - Midnight Green"
            pic={product_carousel_1}
            price={121990.99}
            rating={5}
          />
        </div>
        <div className="div_product_carousel">
          <ProductItem
            id={9}
            title="Apple iPhone 7 (32GB) - Rose Gold"
            pic={product_carousel_2}
            price={29799.0}
            rating={4}
          />
        </div>
        <div className="div_product_carousel">
          <ProductItem
            id={10}
            title="Apple iPhone XR 2018 (64GB) - Yellow"
            pic={product_carousel_3}
            price={50499.0}
            rating={4}
          />
        </div>
        <div className="div_product_carousel">
          <ProductItem
            id={11}
            title="Apple Watch Series 3 (GPS, 42mm) - Space Grey"
            pic={product_carousel_4}
            price={23990.0}
            rating={3}
          />
        </div>
        <div className="div_product_carousel">
          <ProductItem
            id={12}
            title="Apple AirPods Pro (Active Noice Cancellation)"
            pic={product_carousel_5}
            price={21290.0}
            rating={5}
          />
        </div>
        <div className="div_product_carousel">
          <ProductItem
            id={13}
            title="Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage)"
            pic={product_carousel_6}
            price={179990.0}
            rating={5}
          />
        </div>
      </Carousel>
    </div>
  );
}
