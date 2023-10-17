"use client";
import { getUserInfo } from "@/services/auth.service";
import { Button, Card, Row } from "antd";
import { useRouter } from "next/navigation";

const { Meta } = Card;

const Services = () => {
  const router = useRouter();
  return (
    <>
      <h1
        style={{
          color: "#333333",
          textAlign: "center",
          margin: "50px 0",
          fontSize: "40px",
        }}
      >
        Introducing you to the Fast way of life
      </h1>
      <h2 style={{ color: "gray", textAlign: "center", margin: "50px 0" }}>
        A one-stop solution for your travel needs
      </h2>
      <Row justify={"center"}>
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="bus-ticket"
              src="https://www.shohoz.com/v2/assets/img/bus-new.png"
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
              Bus Ticket
            </Button>
          </Row>
        </Card>
      </Row>
    </>
  );
};

export default Services;
