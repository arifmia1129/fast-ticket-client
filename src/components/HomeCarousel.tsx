import React from "react";
import { Carousel } from "antd";
import Image from "next/image";

const HomeCarousel = () => (
  <Carousel autoplay arrows draggable>
    <div>
      <Image
        style={{ minWidth: "100vw" }}
        src="https://img.freepik.com/free-photo/senior-indian-couple_53876-15893.jpg"
        width={1200}
        height={500}
        alt="carousel image"
      />
    </div>
    <div>
      <Image
        style={{ minWidth: "100vw" }}
        src="https://img.freepik.com/free-photo/close-up-hand-holding-plane-tickets_23-2149030545.jpg"
        width={1200}
        height={500}
        alt="carousel image"
      />
    </div>
  </Carousel>
);

export default HomeCarousel;