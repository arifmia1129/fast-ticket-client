"use client";
import React, { useEffect } from "react";
import notFoundImage from "../assets/not-found.png";
import { Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <Row style={{ minHeight: "100vh" }} justify="center" align="middle">
      <Image src={notFoundImage} alt="" width={500} />
    </Row>
  );
};

export default NotFound;
