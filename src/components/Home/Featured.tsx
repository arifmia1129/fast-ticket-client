"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import HeaderTitle from "../HeaderTitle";

export default function Featured() {
  const features = [
    "https://www.shohoz.com/v2/assets/img/7.png",
    "https://www.shohoz.com/v2/assets/img/2.png",
    "https://www.shohoz.com/v2/assets/img/4.png",
    "https://www.shohoz.com/v2/assets/img/5.png",
    "https://www.shohoz.com/v2/assets/img/6.png",
    "https://www.shohoz.com/v2/assets/img/3.png",
    "https://www.shohoz.com/v2/assets/img/1.png",
    "https://www.shohoz.com/v2/assets/img/8.png",
    "https://www.shohoz.com/v2/assets/img/9.png",
    "https://www.shohoz.com/v2/assets/img/10.png",
    "https://www.shohoz.com/v2/assets/img/11.png",
    "https://www.shohoz.com/v2/assets/img/12.png",
  ];
  return (
    <div style={{ width: "95vw", marginTop: "100px" }}>
      <HeaderTitle
        title="We were featured on"
        subtitle="For our good work to make smart life with technology"
      />
      <Marquee gradient={false}>
        {features?.map((feature, index) => (
          <Image
            style={{ margin: "0 20px" }}
            key={index}
            src={feature}
            width={180}
            height={60}
            alt="feature"
          />
        ))}
      </Marquee>
    </div>
  );
}
