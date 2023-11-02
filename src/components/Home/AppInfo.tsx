"use client";
import { Layout, Row, Col, Button } from "antd";
import Image from "next/image";
import "../../app/globals.css";
import HeaderTitle from "../HeaderTitle";

const { Content } = Layout;

const AppInfo = () => {
  return (
    <Layout>
      <Content style={{ padding: "2%", marginTop: "80px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <HeaderTitle
              title="Download Fast Ticket App"
              subtitle="Make convenience a part of your life."
            />
            <div className="app-info">
              <div className="app-buttons">
                <Button type="primary">Download on Play Store</Button>
                <Button type="primary">Download on App Store</Button>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="app-image">
              <Image
                src="https://www.shohoz.com/v2/assets/img/app-interface-v5.svg"
                alt="App Interface"
                width={600}
                height={400}
              />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AppInfo;
