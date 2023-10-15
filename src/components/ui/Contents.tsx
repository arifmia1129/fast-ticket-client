"use client";

import React from "react";
import { Layout } from "antd";
import Navbar from "../Navbar";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content>
      <Navbar />
      <div style={{ padding: 10 }}>{children}</div>
    </Content>
  );
};

export default Contents;
