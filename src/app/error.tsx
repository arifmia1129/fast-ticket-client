"use client";

import { Row } from "antd";
import React from "react";

const Error = () => {
  return (
    <Row style={{ minHeight: "100vh" }} justify="center" align="middle">
      <h1 style={{ color: "red" }}>Something went wrong</h1>
    </Row>
  );
};

export default Error;
