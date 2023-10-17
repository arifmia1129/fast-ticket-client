import AppInfoPage from "@/components/Home/AppInfo";
import Services from "@/components/Home/Services";
import HomeCarousel from "@/components/HomeCarousel";
import MainLayout from "@/components/layout/MainLayout";
import { primaryColor } from "@/utils/color";
import { Col, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { redirect } from "next/navigation";

const RootHome = () => {
  return (
    <>
      <MainLayout>
        <div style={{ padding: "0 10px" }}>
          <HomeCarousel />
          <Row justify="center">
            <Header
              style={{
                backgroundColor: primaryColor,
                height: "100%",
                padding: 20,
                width: "96vw",
              }}
            >
              <Row
                justify={"center"}
                align={"middle"}
                style={{
                  height: "100%",
                }}
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              >
                <Col className="gutter-row" lg={8} xs={24}>
                  <div style={{ color: "#fff" }}>
                    <div style={{ lineHeight: "1.2" }}>
                      <h1 style={{ textAlign: "center", fontSize: "44px" }}>
                        250 Million+
                      </h1>
                      <p style={{ textAlign: "center", fontSize: "20px" }}>
                        Tickets Sold
                      </p>
                    </div>
                  </div>
                </Col>
                <Col className="gutter-row" lg={8} xs={24}>
                  <div style={{ color: "#fff" }}>
                    <div style={{ lineHeight: "1.2" }}>
                      <h1 style={{ textAlign: "center", fontSize: "44px" }}>
                        300+
                      </h1>
                      <p style={{ textAlign: "center", fontSize: "20px" }}>
                        Routes
                      </p>
                    </div>
                  </div>
                </Col>
                <Col className="gutter-row" lg={8} xs={24}>
                  <div style={{ color: "#fff" }}>
                    <div style={{ lineHeight: "1.2" }}>
                      <h1 style={{ textAlign: "center", fontSize: "44px" }}>
                        10 Million+
                      </h1>
                      <p style={{ textAlign: "center", fontSize: "20px" }}>
                        Happy Users
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Header>
          </Row>
          <Services />
          <AppInfoPage />
        </div>
      </MainLayout>
    </>
  );
};

export default RootHome;
