"use client";
import { useGetNewsQuery } from "@/redux/features/news/newsApi";
import { Card, Col, Row } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { primaryColor } from "@/utils/color";
import MainLayout from "@/components/layout/MainLayout";
import { useGetBlogQuery } from "@/redux/features/blog/blogApi";
import Image from "next/image";

export default function BlogPage() {
  const { data } = useGetBlogQuery({});

  return (
    <MainLayout>
      <div style={{ padding: "2%" }}>
        <Row style={{ minWidth: "95vw", margin: "50px 0" }} justify={"center"}>
          {data?.data?.map((item: any) => (
            <Col key={item?._id} span={24}>
              <Row
                style={{
                  margin: "10px",
                  border: "2px solid gray",
                  padding: "5px",
                  borderRadius: "10px",
                }}
                justify="center"
                align="middle"
              >
                <Col xs={24} sm={24} lg={6} md={6}>
                  <Image
                    width={300}
                    height={200}
                    src={item?.imageUrl}
                    alt="image-url"
                  />
                </Col>
                <Col xs={24} sm={24} lg={18} md={18}>
                  <div>
                    <h1 style={{ fontSize: "40px", color: "gray" }}>
                      {item?.title}
                    </h1>
                    <p>{item?.description}</p>
                  </div>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </div>
    </MainLayout>
  );
}
