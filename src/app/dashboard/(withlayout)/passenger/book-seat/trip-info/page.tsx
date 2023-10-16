"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import { superAdminItems } from "@/constants/breadCrumbItem";
import { bloodGroupOptions, genderOptions } from "@/constants/global";

import { adminSchema } from "@/schema/admin";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { passengerRegistrationSchema } from "@/schema/passenger";
import { useCreatePassengerMutation } from "@/redux/features/user/userApi";
import {
  useGetTripDestinationQuery,
  useGetTripSourceQuery,
} from "@/redux/features/trip/tripApi";
import { selectTripInfoSchema } from "@/schema/trip";
import { useRouter } from "next/navigation";

const TripInfoPage = () => {
  const router = useRouter();

  const { data: source } = useGetTripSourceQuery(undefined);

  const sourceOptions = source?.map((s: string) => {
    return {
      label: s,
      value: s,
    };
  });

  const { data: destination } = useGetTripDestinationQuery(undefined);

  const destinationOptions = destination?.map((d: string) => {
    return {
      label: d,
      value: d,
    };
  });

  const onSubmit = async (info: any) => {
    const { source, destination, date } = info;
    router.push(
      `/dashboard/passenger/book-seat/all-trip?date=${date}&source=${source}&destination=${destination}`
    );
  };

  return (
    <div>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(selectTripInfoSchema)}
      >
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "10px",
            padding: "15px",
            margin: "20px 0",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Trip Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: 500 }}>
                <FormDatePicker
                  name="date"
                  size="large"
                  label="Date of Birth"
                  placeholder="Write date of birth"
                />
              </div>
            </Col>

            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: 500 }}>
                <FormSelectField
                  name="source"
                  size="large"
                  label="Source"
                  items={sourceOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: 500 }}>
                <FormSelectField
                  name="destination"
                  size="large"
                  label="Destination"
                  items={destinationOptions}
                />
              </div>
            </Col>
          </Row>
        </div>

        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default TripInfoPage;
