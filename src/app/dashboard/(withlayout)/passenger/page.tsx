"use client";

import { Descriptions, Avatar, Card, Divider, Row } from "antd";
import { Typography } from "antd";
import Loading from "@/components/ui/Loading";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useUserProfileQuery } from "@/redux/features/user/userApi";

const { Text } = Typography;

export default function UserProfile() {
  const { data, isLoading } = useUserProfileQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Card title="User Profile">
        <Row justify="center" align="middle" style={{ marginBottom: "20px" }}>
          <Avatar size={128} src={data?.profileImage} />
        </Row>

        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Name">
            {`${data?.name.firstName} ${data?.name.lastName}`}
          </Descriptions.Item>
          <Descriptions.Item label="ID">{data?.id}</Descriptions.Item>
          <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
          <Descriptions.Item label="Contact No">
            {data?.contactNo}
          </Descriptions.Item>
          <Descriptions.Item label="Emergency Contact No">
            {data?.emergencyContactNo}
          </Descriptions.Item>
          <Divider />
          <Descriptions.Item label="Gender">{data?.gender}</Descriptions.Item>
          <Descriptions.Item label="Date of Birth">
            {data?.dateOfBirth}
          </Descriptions.Item>
          <Descriptions.Item label="Blood Group">
            {data?.bloodGroup}
          </Descriptions.Item>
          <Divider />
          <Descriptions.Item label="Present Address">
            {data?.presentAddress}
          </Descriptions.Item>
          <Descriptions.Item label="Permanent Address">
            {data?.permanentAddress}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
