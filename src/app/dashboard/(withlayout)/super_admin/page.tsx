// components/Welcome.js
"use client";

import { Layout, Typography, Row, Col, Card, Button, Divider } from "antd";
import {
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Welcome = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "50px" }}>
        <Title level={2}>Welcome Super Admin!</Title>
        <Paragraph>
          This is your dashboard's welcome page. Here, you can manage various
          aspects of your admin account and the system.
        </Paragraph>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Manage Users"
              extra={<TeamOutlined style={{ fontSize: "24px" }} />}
            >
              <Paragraph>
                Manage user accounts, roles, and permissions. Ensure smooth
                operation of the system by overseeing user management.
              </Paragraph>
              <Button type="primary">Go to User Management</Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              title="System Settings"
              extra={<SettingOutlined style={{ fontSize: "24px" }} />}
            >
              <Paragraph>
                Configure system settings, such as preferences, notifications,
                and security settings.
              </Paragraph>
              <Button type="primary">Go to Settings</Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Reports and Analytics"
              extra={<FileTextOutlined style={{ fontSize: "24px" }} />}
            >
              <Paragraph>
                Access reports and analytics to gain insights into the system's
                performance, user activities, and more.
              </Paragraph>
              <Button type="primary">View Reports</Button>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Welcome;
