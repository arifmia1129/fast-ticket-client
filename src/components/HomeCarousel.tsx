import React from "react";
import { Carousel, Row } from "antd";
import Image from "next/image";

const HomeCarousel = () => (
  <Row justify={"center"}>
    <Carousel autoplay arrows draggable style={{ width: "96vw" }}>
      <div>
        <Image
          style={{ minWidth: "100vw" }}
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={1200}
          height={800}
          alt="carousel image"
        />
      </div>
      <div style={{ margin: "0 auto" }}>
        <Image
          style={{ minWidth: "100vw" }}
          src="https://images.unsplash.com/photo-1598710877888-edaa20acfb92?auto=format&fit=crop&q=80&w=2062&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={1200}
          height={800}
          alt="carousel image"
        />
      </div>
      <div style={{ margin: "0 auto" }}>
        <Image
          style={{ minWidth: "100vw" }}
          src="https://images.unsplash.com/photo-1605068263928-dc295689add1?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={1200}
          height={800}
          alt="carousel image"
        />
      </div>
    </Carousel>
  </Row>
);

export default HomeCarousel;
