"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import { superAdminItems } from "@/constants/breadCrumbItem";
import { bloodGroupOptions, genderOptions } from "@/constants/global";

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
import {
  useAddBusReviewMutation,
  useGetBusQuery,
} from "@/redux/features/bus/busApi";

const AddReviewPage = () => {
  const router = useRouter();

  const { data: allBus } = useGetBusQuery({ limit: 300 });

  const busOptions = allBus?.data?.map((bus: any) => {
    return {
      label: bus.name,
      value: bus._id,
    };
  });

  const [addReview] = useAddBusReviewMutation();

  const onSubmit = async (info: any) => {
    const { busId, ...other } = info;

    try {
      const { error } = (await addReview({ id: busId, data: other })) as any;

      if (!error) {
        message.success("Successfully added review");
      } else {
        const { message: errMsg, path } = error?.data?.errorMessages[0] || {};

        const errMessage = errMsg
          ? `${path} ${errMsg}`
          : "Something went wrong";

        message.error(errMessage);
      }
    } catch (error: any) {
      message.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Form submitHandler={onSubmit}>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "10px",
            padding: "15px",
            margin: "20px 0",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Review Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              style={{ margin: "15px 0" }}
              className="gutter-row"
              xs={24}
              md={12}
              lg={12}
              sm={24}
            >
              <div>
                <FormSelectField
                  name="busId"
                  size="large"
                  label="Bus"
                  items={busOptions}
                />
              </div>
            </Col>
            <Col
              style={{ margin: "15px 0" }}
              className="gutter-row"
              xs={24}
              md={12}
              lg={12}
              sm={24}
            >
              <div>
                <FormInput
                  name="review"
                  type="text"
                  size="large"
                  label="Review"
                  placeholder="Write review"
                />
              </div>
            </Col>
            <Col
              style={{ margin: "15px 0" }}
              className="gutter-row"
              xs={24}
              md={12}
              lg={12}
              sm={24}
            >
              <div>
                <FormInput
                  name="rating"
                  type="text"
                  size="large"
                  label="Rating"
                  placeholder="Write rating"
                />
              </div>
            </Col>
          </Row>
        </div>

        <Button type="primary" htmlType="submit">
          Add Review
        </Button>
      </Form>
    </div>
  );
};

export default AddReviewPage;
