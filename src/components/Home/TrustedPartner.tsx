"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import HeaderTitle from "../HeaderTitle";

export default function TrustedPartnerPage() {
  const features = [
    "https://www.shohoz.com/v2/assets/img/trusted-partners/bus_operator_logo/Hanif-AC-208x78.png",
    "https://www.shohoz.com/v2/assets/img/trusted-partners/bus_operator_logo/Ena-transport-prvt-Ltd-208x78.png",
    "https://www.shohoz.com/v2/assets/img/trusted-partners/bus_operator_logo/nabil-paribahan-208x78.png",
    "https://www.shohoz.com/v2/assets/img/trusted-partners/bus_operator_logo/green-line-paribahan-208x78.png",
    "https://www.shohoz.com/v2/assets/img/trusted-partners/bus_operator_logo/Saintmartin-Hyunday-208x78.png",
    "https://www.shohoz.com/v2/assets/img/trusted-partners/bus_operator_logo/Soudia-coach-services-208x78.png",
    "https://www.shohoz.com/v2/assets/img/trusted-partners/bus_operator_logo/Akota-transport-208x78.png",
    "https://www.shohoz.com/v2/assets/img/trusted-partners/bus_operator_logo/tungipara-express-208x78.png",
    "https://www.shohoz.com/v2/assets/img/trusted-partners/bus_operator_logo/MANIK-EXPRESS-208x78.png",
    "https://www.shohoz.com/v2/assets/img/trusted-partners/bus_operator_logo/Al-Hamra-208x78.png",
  ];
  return (
    <>
      <HeaderTitle
        title="Our Trusted Partners"
        subtitle="Our partner works with us for smother travels experience"
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
    </>
  );
}
