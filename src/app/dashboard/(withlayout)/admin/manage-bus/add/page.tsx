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
import {
  useCreatePassengerMutation,
  useUserProfileQuery,
} from "@/redux/features/user/userApi";
import {
  useGetTripDestinationQuery,
  useGetTripSourceQuery,
} from "@/redux/features/trip/tripApi";
import { selectTripInfoSchema } from "@/schema/trip";
import { useRouter } from "next/navigation";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import { useCreateBusMutation } from "@/redux/features/bus/busApi";
import { addBusSchema } from "@/schema/bus";

const AddBusPage = () => {
  const router = useRouter();

  const { data: profile } = useUserProfileQuery(undefined);

  const [addBus] = useCreateBusMutation();

  const onSubmit = async ({ name }: any) => {
    message.loading("Processing...");
    try {
      const { data, error } = (await addBus({
        name,
        owner: profile?._id,
      })) as any;

      if (data?._id) {
        message.success("Successfully added bus");
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
      <ActionBar title="Add Bus"></ActionBar>
      <Form submitHandler={onSubmit} resolver={yupResolver(addBusSchema)}>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "10px",
            padding: "15px",
            margin: "20px 0",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Bus Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: 500 }}>
                <FormInput
                  name="name"
                  type="text"
                  size="large"
                  label="Bus Name"
                  placeholder="Write bus name"
                />
              </div>
            </Col>
          </Row>
        </div>

        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddBusPage;
