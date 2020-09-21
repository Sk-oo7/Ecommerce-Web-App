import React from "react";
import ProductItem from "./ProductItem.js";
import "./Products.css";
import product_img_1 from "./Assets/Img/Product_Item_1.jpg";
import product_img_2 from "./Assets/Img/Product_Item_2.jpg";
import product_img_3 from "./Assets/Img/Product_Item_3.jpg";
import product_img_4 from "./Assets/Img/Product_Item_4.jpg";
import product_img_5 from "./Assets/Img/Product_Item_5.jpg";
import product_img_6 from "./Assets/Img/Product_Item_6.jpg";
import product_img_7 from "./Assets/Img/Product_Item_7.jpg";

export default function Products() {
  return (
    <div className="products">
      <div className="products_row_1">
        <ProductItem
          title="OnePlus 7T Pro (Haze Blue, 8GB RAM, 256GB Storage)"
          img={product_img_1}
          price={43999.0}
          rating={4}
        />
        <ProductItem
          title="Hugo by Hugo Boss Analog Black Dial Men's Watch"
          img={product_img_2}
          price={13425}
          rating={4}
        />
        <ProductItem
          title="Sony WH-CH700N Wireless Noise Cancellation Headphones"
          img={product_img_3}
          price={5999}
          rating={4}
        />
        <ProductItem
          title="Mi TV 4A PRO 80 cm (32 inches) HD Ready Android LED TV"
          img={product_img_4}
          price={12999}
          rating={4}
        />
      </div>

      <div className="products_row_2">
        <ProductItem
          title="Noise Shots XO Wireless Bluetooth Earbuds "
          img={product_img_5}
          price={4499}
          rating={4}
        />{" "}
        <ProductItem
          title="HP Pavilion Gaming DK0271TX 15.6-inch Laptop"
          img={product_img_6}
          price={73490.0}
          rating={4}
        />{" "}
        <ProductItem
          title="Hugo by Hugo Boss Analog Black Dial Women's Watch"
          img={product_img_7}
          price={5850}
          rating={4}
        />{" "}
      </div>
    </div>
  );
}
