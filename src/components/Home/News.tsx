"use client";
import { useGetNewsQuery } from "@/redux/features/news/newsApi";
import { Card, Col, Row } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { primaryColor } from "@/utils/color";

const { Meta } = Card;

export default function News() {
  const { data } = useGetNewsQuery({});

  return (
    <Row style={{ minWidth: "95vw", margin: "50px 0" }} justify={"center"}>
      {data?.data?.map((item: any) => (
        <Col key={item?._id} xs={24} sm={24} md={8} lg={8}>
          <Card
            style={{
              width: "90%",
              backgroundColor: primaryColor,
              margin: "10px",
              borderColor: primaryColor,
            }}
            cover={<img height={400} alt="example" src={item?.imageUrl} />}
            actions={[
              <a href={item?.newsLink} target="_blank">
                <ArrowRightOutlined size={50} key="arrow" />
              </a>,
            ]}
          >
            <div style={{ height: 200 }}>
              <h1 style={{ fontWeight: "bold", color: "#fff" }}>
                <span>{item?.title}</span>
                <br />
                <small style={{ fontSize: "14px", fontWeight: "bold" }}>
                  source- {item?.newsBy}
                </small>
              </h1>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
