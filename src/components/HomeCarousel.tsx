import React from "react";
import { Carousel, Row } from "antd";
import Image from "next/image";

const HomeCarousel = () => (
  <Row justify={"center"}>
    <Carousel autoplay arrows draggable style={{ width: "96vw" }}>
      <div>
        <Image
          style={{ minWidth: "100vw" }}
          src="https://img.freepik.com/free-photo/elegant-driver-sitting-shuttle-bus-smiling-camera-summer-day-front-view-happy-man_7502-10207.jpg"
          width={1200}
          height={500}
          alt="carousel image"
        />
      </div>
      <div style={{ margin: "0 auto" }}>
        <Image
          style={{ minWidth: "100vw" }}
          src="https://img.freepik.com/free-vector/passengers-waiting-bus-city-queue-town-road-flat-vector-illustration-public-transport-urban-lifestyle_74855-8493.jpg"
          width={1200}
          height={500}
          alt="carousel image"
        />
      </div>
      <div style={{ margin: "0 auto" }}>
        <Image
          style={{ minWidth: "100vw" }}
          src="https://img.freepik.com/free-vector/passengers-waiting-bus-city-queue-town-road-flat-vector-illustration-public-transport-urban-lifestyle_74855-8493.jpghttps://img.freepik.com/free-vector/bus-stop-with-passengers-driver-inside_107791-15376.jpg"
          width={1200}
          height={500}
          alt="carousel image"
        />
      </div>
    </Carousel>
  </Row>
);

export default HomeCarousel;
