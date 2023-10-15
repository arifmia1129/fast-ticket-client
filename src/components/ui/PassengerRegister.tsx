"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import { superAdminItems } from "@/constants/breadCrumbItem";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import {
  useAddAdminMutation,
  useGetAdminQuery,
} from "@/redux/features/admin/adminApi";
import { useGetManagementDepartmentQuery } from "@/redux/features/managementDepartment/managementDepartmentApi";
import { adminSchema } from "@/schema/admin";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import UMBreadCrumb from "./UMBreadCrumb";
import { passengerRegistrationSchema } from "@/schema/passenger";

const CreateAdminPage = () => {
  const { data, isLoading } = useGetManagementDepartmentQuery({});

  const [addAdmin] = useAddAdminMutation();

  const manageDepartmentOptions = data?.department?.map((department: any) => {
    return {
      label: department.title,
      value: department._id,
    };
  });

  const onSubmit = async (data: any) => {
    const file = data["file"];

    delete data["file"];

    const info = JSON.stringify(data);

    //console.log(data);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("data", info);
    message.loading("Creating passenger...");
    try {
      addAdmin(formData);
      message.success("Admin created successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(passengerRegistrationSchema)}
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
            Passenger Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="passenger.name.firstName"
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
                  name="passenger.name.middleName"
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
                  name="passenger.name.lastName"
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
                  name="passenger.gender"
                  size="large"
                  label="Gender"
                  items={genderOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="passenger.profileImage"
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
                  name="passenger.email"
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
                  name="passenger.contactNo"
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
                  name="passenger.emergencyContactNo"
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
                  name="passenger.bloodGroup"
                  size="large"
                  label="Blood Group"
                  items={bloodGroupOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="passenger.designation"
                  type="text"
                  size="large"
                  label="Designation"
                  placeholder="Write designation"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormDatePicker
                  name="passenger.dateOfBirth"
                  size="large"
                  label="Date of Birth"
                  placeholder="Write date of birth"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={12}>
              <div>
                <FormTextArea
                  name="passenger.presentAddress"
                  size="large"
                  label="Present Address"
                  placeholder="Write present address"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={12}>
              <div>
                <FormTextArea
                  name="passenger.permanentAddress"
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
