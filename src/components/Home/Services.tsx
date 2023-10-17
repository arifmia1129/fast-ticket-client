"use client";
import { getUserInfo } from "@/services/auth.service";
import { Button, Card, Row } from "antd";
import { useRouter } from "next/navigation";
import HeaderTitle from "../HeaderTitle";

const { Meta } = Card;

const Services = () => {
  const router = useRouter();
  return (
    <>
      <HeaderTitle
        title="Introducing you to the Fast way of life"
        subtitle="A one-stop solution for your travel needs"
      />

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
