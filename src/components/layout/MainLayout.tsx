"use client";

import React from "react";
import { Breadcrumb, Layout } from "antd";
import Navbar from "../Navbar";
import Link from "next/link";
import { PhoneFilled } from "@ant-design/icons";
import AppFooter from "../Footer/Footer";

const { Header } = Layout;

const MainLayout = ({ children }: any) => {
  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "#00b96b",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <Link href={"/"}>
            <p style={{ color: "#fff", margin: "0 10px" }}>Contact us</p>
          </Link>
          <div style={{ display: "flex", margin: "0 10px" }}>
            <PhoneFilled style={{ color: "#fff" }} rotate={90} />
            <p style={{ color: "#fff", margin: "0 2px" }}>16248</p>
          </div>
        </div>
      </Header>
      <Navbar />
      {children}
      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
