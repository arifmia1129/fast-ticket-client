"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import { bloodGroupOptions, genderOptions } from "@/constants/global";

import { Button, Col, Row, message } from "antd";
import {
  useCreatePassengerMutation,
  useUserProfileQuery,
} from "@/redux/features/user/userApi";
import { useUpdatePassengerMutation } from "@/redux/features/passenger/passengerApi";

const CreateAdminPage = () => {
  const { data: userInfo } = useUserProfileQuery({});

  const [updatePassenger] = useUpdatePassengerMutation();

  const onSubmit = async (info: any) => {
    message.loading("Updating...");

    try {
      const { data, error } = (await updatePassenger({
        data: info,
        id: userInfo?._id,
      })) as any;

      if (data?._id) {
        message.success("Successfully update your account");
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
      <Form submitHandler={onSubmit} defaultValues={userInfo}>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "10px",
            padding: "15px",
            margin: "20px 0",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Edit Profile Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="name.firstName"
                  type="text"
                  size="large"
                  label="First Name"
                  placeholder="Write first name"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="name.middleName"
                  type="text"
                  size="large"
                  label="Middle Name"
                  placeholder="Write middle name"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="name.lastName"
                  type="text"
                  size="large"
                  label="Last Name"
                  placeholder="Write last name"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="Password"
                  placeholder="Write password"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormSelectField
                  name="gender"
                  size="large"
                  label="Gender"
                  items={genderOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="profileImage"
                  type="text"
                  size="large"
                  label="Profile Image"
                  placeholder="Write profile image url"
                />
              </div>
            </Col>
          </Row>
        </div>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "10px",
            padding: "15px",
            margin: "20px 0",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Basic Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="email"
                  type="text"
                  size="large"
                  label="Email"
                  placeholder="Write email"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="contactNo"
                  type="text"
                  size="large"
                  label="Contact Number"
                  placeholder="Write contact number"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="emergencyContactNo"
                  type="text"
                  size="large"
                  label="Emergency Contact"
                  placeholder="Write emergency contact number"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormSelectField
                  name="bloodGroup"
                  size="large"
                  label="Blood Group"
                  items={bloodGroupOptions}
                />
              </div>
            </Col>

            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormDatePicker
                  name="dateOfBirth"
                  size="large"
                  label="Date of Birth"
                  placeholder="Write date of birth"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={12}>
              <div>
                <FormTextArea
                  name="presentAddress"
                  size="large"
                  label="Present Address"
                  placeholder="Write present address"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={12}>
              <div>
                <FormTextArea
                  name="permanentAddress"
                  size="large"
                  label="Permanent Address"
                  placeholder="Write permanent address"
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

export default CreateAdminPage;
