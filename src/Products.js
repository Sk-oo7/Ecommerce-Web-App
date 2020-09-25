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
          id={1}
          title="OnePlus 7T Pro (Haze Blue, 8GB RAM, 256GB Storage)"
          pic={product_img_1}
          price={43999.0}
          rating={5}
        />
        <ProductItem
          id={2}
          title="Hugo by Hugo Boss Analog Black Dial Men's Watch"
          pic={product_img_2}
          price={13425}
          rating={4}
        />
        <ProductItem
          id={3}
          title="Sony WH-CH700N Wireless Noise Cancellation Headphones"
          pic={product_img_3}
          price={5999}
          rating={3}
        />
        <ProductItem
          id={4}
          title="Mi TV 4A PRO 80 cm (32 inches) HD Ready Android LED TV"
          pic={product_img_4}
          price={12999}
          rating={4}
        />
      </div>

      <div className="products_row_2">
        <ProductItem
          id={5}
          title="Noise Shots XO Wireless Bluetooth Earbuds "
          pic={product_img_5}
          price={4499}
          rating={3}
        />{" "}
        <ProductItem
          id={6}
          title="HP Pavilion Gaming DK0271TX 15.6-inch Laptop"
          pic={product_img_6}
          price={73490.0}
          rating={5}
        />{" "}
        <ProductItem
          id={7}
          title="Hugo by Hugo Boss Analog Black Dial Women's Watch"
          pic={product_img_7}
          price={5850}
          rating={3}
        />{" "}
      </div>
    </div>
  );
}
