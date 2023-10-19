"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import { Button, Col, Row, message } from "antd";
import { useUserProfileQuery } from "@/redux/features/user/userApi";
import { useRouter } from "next/navigation";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import { useGetBusQuery } from "@/redux/features/bus/busApi";

import {
  useCreateTripMutation,
  useGetTripByIdQuery,
  useUpdateTripMutation,
} from "@/redux/features/trip/tripApi";

const EditTripPage = ({ params }: any) => {
  const router = useRouter();

  const { data: tripInfo } = useGetTripByIdQuery(params.id);

  const { data } = useGetBusQuery({});
  const { data: bus } = data || {};

  const busOptions = bus?.map((b: any) => {
    return {
      label: b.name,
      value: b._id,
    };
  });

  const [updateTrip] = useUpdateTripMutation();

  const onSubmit = async (info: any) => {
    message.loading("Processing...");

    info.totalSeat = parseInt(info.totalSeat);

    try {
      const { data, error } = (await updateTrip({
        id: params.id,
        data: info,
      })) as any;

      if (data?._id) {
        message.success("Successfully updated trip");
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
      <ActionBar title="Edit Trip"></ActionBar>
      <Form defaultValues={tripInfo} submitHandler={onSubmit}>
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
            <Col
              style={{ margin: "15px 0" }}
              className="gutter-row"
              xs={24}
              lg={8}
            >
              <div style={{ maxWidth: 500 }}>
                <FormSelectField
                  name="bus"
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
              lg={8}
            >
              <div style={{ maxWidth: 500 }}>
                <FormInput
                  name="busNo"
                  type="text"
                  size="large"
                  label="Bus No"
                  placeholder="Write bus no"
                />
              </div>
            </Col>
            <Col
              style={{ margin: "15px 0" }}
              className="gutter-row"
              xs={24}
              lg={8}
            >
              <div style={{ maxWidth: 500 }}>
                <FormInput
                  name="source"
                  type="text"
                  size="large"
                  label="Source"
                  placeholder="Write bus source"
                />
              </div>
            </Col>
            <Col
              style={{ margin: "15px 0" }}
              className="gutter-row"
              xs={24}
              lg={8}
            >
              <div style={{ maxWidth: 500 }}>
                <FormInput
                  name="destination"
                  type="text"
                  size="large"
                  label="Destination"
                  placeholder="Write bus destination"
                />
              </div>
            </Col>
            <Col
              style={{ margin: "15px 0" }}
              className="gutter-row"
              xs={24}
              lg={8}
            >
              <div style={{ maxWidth: 500 }}>
                <FormInput
                  name="price"
                  type="text"
                  size="large"
                  label="Price"
                  placeholder="Write seat price"
                />
              </div>
            </Col>

            <Col
              style={{ margin: "15px 0" }}
              className="gutter-row"
              xs={24}
              lg={8}
            >
              <div style={{ maxWidth: 500 }}>
                <FormInput
                  name="time"
                  type="text"
                  size="large"
                  label="Time"
                  placeholder="Write time"
                />
              </div>
            </Col>
          </Row>
        </div>

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditTripPage;
