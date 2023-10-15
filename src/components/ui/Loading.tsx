import { Row, Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <Row style={{ minHeight: "100vh" }} justify="center" align="middle">
      <Spin size="large" />
    </Row>
  );
};

export default Loading;
