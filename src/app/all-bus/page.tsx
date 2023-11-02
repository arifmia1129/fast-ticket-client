"use client";

import MainLayout from "@/components/layout/MainLayout";
import { useGetBusQuery } from "@/redux/features/bus/busApi";
import { primaryColor } from "@/utils/color";
import { Button, Card, Row } from "antd";
import { useState } from "react";
import { MessageOutlined, UserOutlined, StarOutlined } from "@ant-design/icons";
import Marquee from "react-fast-marquee";

export default function AllBus() {
  const { data } = useGetBusQuery({ limit: 300 });
  const [busId, setBusId] = useState("");

  return (
    <div>
      <MainLayout>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            {data?.data?.map((bus: any) => (
              <div key={bus._id}>
                <Card
                  title={<h1 style={{ color: primaryColor }}>{bus?.name}</h1>}
                  extra={
                    bus.review.length ? (
                      <div>
                        {busId === bus._id ? (
                          <Button
                            type="primary"
                            danger
                            onClick={() => setBusId("")}
                          >
                            Hide Review
                          </Button>
                        ) : (
                          <Button
                            type="primary"
                            onClick={() => setBusId(bus._id)}
                          >
                            Show Review
                          </Button>
                        )}
                      </div>
                    ) : null
                  }
                  style={{ width: "95vw", margin: "10px" }}
                >
                  <Marquee gradient={false}>
                    {busId === bus._id &&
                      bus?.review?.map((r: any) => (
                        <div style={{ margin: "0 20px" }} key={r._id}>
                          <Row>
                            <UserOutlined />
                            <p style={{ fontWeight: "bold", margin: "0 5px" }}>
                              {r.name}
                            </p>
                          </Row>
                          <Row>
                            <MessageOutlined />
                            <p style={{ margin: "0 5px" }}>{r.review}</p>
                          </Row>
                          <Row>
                            <StarOutlined />
                            <p style={{ margin: "0 5px" }}>
                              {r.rating} out of 5
                            </p>
                          </Row>
                        </div>
                      ))}
                  </Marquee>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
