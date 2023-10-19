"use client";
import { getUserInfo } from "@/services/auth.service";
import { Button, Card, Col, Row } from "antd";
import { useRouter } from "next/navigation";
import HeaderTitle from "../HeaderTitle";

const { Meta } = Card;

const UpcomingServicesPage = () => {
  const router = useRouter();
  return (
    <>
      <HeaderTitle
        title="Our Upcoming Services"
        subtitle="To Make Your Life Better"
      />

      <div>
        <Row style={{ minWidth: "90vw", margin: "50px 0" }} justify={"center"}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Card
              style={{ width: "96%", margin: "10px" }}
              cover={
                <img
                  alt="bus-ticket"
                  src="https://www.shohoz.com/v2/assets/img/launch-new.png"
                />
              }
            >
              <Row justify={"center"}>
                <Button
                  onClick={() => {
                    const { role } = getUserInfo() as any;
                    if (!role) {
                      router.push("/login");
                    } else {
                      router.push(`/dashboard/${role}`);
                    }
                  }}
                  type="primary"
                >
                  Launch Ticket
                </Button>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Card
              style={{ width: "96%", margin: "10px" }}
              cover={
                <img
                  alt="bus-ticket"
                  src="https://www.shohoz.com/v2/assets/img/event-new.png"
                />
              }
            >
              <Row justify={"center"}>
                <Button
                  onClick={() => {
                    const { role } = getUserInfo() as any;
                    if (!role) {
                      router.push("/login");
                    } else {
                      router.push(`/dashboard/${role}`);
                    }
                  }}
                  type="primary"
                >
                  Event Ticket
                </Button>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Card
              style={{ width: "96%", margin: "10px" }}
              cover={
                <img
                  height={325}
                  alt="bus-ticket"
                  src="https://img.freepik.com/free-photo/close-up-hand-holding-plane-tickets_23-2149030545.jpg"
                />
              }
            >
              <Row justify={"center"}>
                <Button
                  onClick={() => {
                    const { role } = getUserInfo() as any;
                    if (!role) {
                      router.push("/login");
                    } else {
                      router.push(`/dashboard/${role}`);
                    }
                  }}
                  type="primary"
                >
                  Air Ticket
                </Button>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UpcomingServicesPage;
