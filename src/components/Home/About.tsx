"use client";
import { primaryColor } from "@/utils/color";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";

export default function About() {
  return (
    <>
      <hr
        style={{
          marginTop: "100px",
        }}
      />
      <Row
        style={{
          marginBottom: "100px",
          padding: "10px",
        }}
        justify={"center"}
      >
        <div>
          <h1 style={{ marginTop: "100px" }}>Md Arif Mia @BBC</h1>
          <p style={{ marginBottom: "20px", color: "gray" }}>
            Md Arif Mia, founder of Fast Ticket, talks about the company's, Fast
            Ticket, mission at BBC.
          </p>
          <Row justify={"center"}>
            <Button type="primary" icon={<ArrowRightOutlined />}>
              <a
                href="https://www.bbc.com/news"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Full Content
              </a>
            </Button>
          </Row>
        </div>
      </Row>
      <hr
        style={{
          marginBottom: "100px",
        }}
      />
    </>
  );
}
