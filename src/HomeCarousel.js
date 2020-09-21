import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";
import home_carousel_1 from "./Assets/Img/Home_Carousel_1.jpg";
import home_carousel_2 from "./Assets/Img/Home_Carousel_2.jpg";
import home_carousel_3 from "./Assets/Img/Home_Carousel_3.jpg";
import home_carousel_4 from "./Assets/Img/Home_Carousel_4.jpg";

export default function HomeCarousel() {
  return (
    <Carousel controls={false} indicators={false} interval={2000} pause={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={home_carousel_1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={home_carousel_2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={home_carousel_3}
          alt="Third slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={home_carousel_4}
          alt="Fourth Slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
