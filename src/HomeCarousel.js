import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";
import { storage } from "./firebase";

export default function HomeCarousel() {
  const [pic1,setPic1] =useState();
  const [pic2,setPic2] =useState();
  const [pic3,setPic3] =useState();
  const [pic4,setPic4] =useState();
  
  useEffect(() => {
    storage
        .ref("products/sale/Home_Carousel_1.jpg")
        .getDownloadURL()
        .then((url) => {
          setPic1(url);
        });
        storage
        .ref("products/sale/Home_Carousel_2.jpg")
        .getDownloadURL()
        .then((url) => {
          setPic2(url);
        });
        storage
        .ref("products/sale/Home_Carousel_3.jpg")
        .getDownloadURL()
        .then((url) => {
          setPic3(url);
        });
        storage
        .ref("products/sale/Home_Carousel_4.jpg")
        .getDownloadURL()
        .then((url) => {
          setPic4(url);
        });
  })
  return (
    <Carousel controls={false} indicators={false} interval={2000} pause={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={pic1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={pic2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={pic3}
          alt="Third slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={pic4}
          alt="Fourth Slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
