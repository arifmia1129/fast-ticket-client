"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import { bloodGroupOptions, genderOptions } from "@/constants/global";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { passengerRegistrationSchema } from "@/schema/passenger";
import {
  useCreateAdminMutation,
  useCreatePassengerMutation,
} from "@/redux/features/user/userApi";
import { busOwnerRegistrationSchema } from "@/schema/busOwer";
import { useCreateBusOwnerMutation } from "@/redux/features/busOwner/busOwnerApi";
import { useGetPermissionQuery } from "@/redux/features/permission/permissionApi";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import { adminRegistrationSchema } from "@/schema/admin";

const CreateAdminPage = () => {
  const [createAdmin] = useCreateAdminMutation();

  const { data: permissionData } = useGetPermissionQuery({});

  const permissionOptions = permissionData?.data?.map((permission: any) => {
    return {
      label: permission.title,
      value: permission._id,
    };
  });

  const onSubmit = async (info: any) => {
    message.loading("Creating...");

    try {
      const { error } = (await createAdmin(info)) as any;

      if (!error) {
        message.success("Successfully created admin account");
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
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(adminRegistrationSchema)}
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
            Admin Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="admin.name.firstName"
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
                  name="admin.name.middleName"
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
                  name="admin.name.lastName"
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
                  name="admin.gender"
                  size="large"
                  label="Gender"
                  items={genderOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="admin.designation"
                  type="text"
                  size="large"
                  label="Designation"
                  placeholder="Write designation in company"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormMultiSelectField
                  name="admin.permission"
                  size="large"
                  label="Permission"
                  items={permissionOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="admin.profileImage"
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
                  name="admin.email"
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
                  name="admin.contactNo"
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
                  name="admin.emergencyContactNo"
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
                  name="admin.bloodGroup"
                  size="large"
                  label="Blood Group"
                  items={bloodGroupOptions}
                />
              </div>
            </Col>

            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormDatePicker
                  name="admin.dateOfBirth"
                  size="large"
                  label="Date of Birth"
                  placeholder="Write date of birth"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={12}>
              <div>
                <FormTextArea
                  name="admin.presentAddress"
                  size="large"
                  label="Present Address"
                  placeholder="Write present address"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={12}>
              <div>
                <FormTextArea
                  name="admin.permanentAddress"
                  size="large"
                  label="Permanent Address"
                  placeholder="Write permanent address"
                />
              </div>
            </Col>
          </Row>
        </div>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateAdminPage;
