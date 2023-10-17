"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import { bloodGroupOptions, genderOptions } from "@/constants/global";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Result, Row, message } from "antd";
import { passengerRegistrationSchema } from "@/schema/passenger";
import { useCreatePassengerMutation } from "@/redux/features/user/userApi";
import { busOwnerRegistrationSchema } from "@/schema/busOwer";
import { useCreateBusOwnerMutation } from "@/redux/features/busOwner/busOwnerApi";
import MainLayout from "@/components/layout/MainLayout";
import HeaderTitle from "@/components/HeaderTitle";
import { SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { contactSchema } from "@/schema/contact";
import { useCreateContactMutation } from "@/redux/features/contact/contactApi";

const ContactPage = () => {
  const [createContact] = useCreateContactMutation();

  const [isMessageReceived, setIsMessageReceived] = useState<boolean>(false);

  useEffect(() => {
    setIsMessageReceived(false);
  }, []);

  const onSubmit = async (info: any) => {
    message.loading("Processing...");

    try {
      const { error } = (await createContact(info)) as any;

      if (!error) {
        message.success("Successfully received your contact information");
        setIsMessageReceived(true);
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
    <MainLayout>
      <div style={{ padding: "2vw" }}>
        {isMessageReceived ? (
          <Result
            status="success"
            title="Successfully Received Your Message"
            subTitle="We will tak action from your helpful suggestion and feedback. Thank you for your message. Heppy Travels!"
            extra={[
              <Link href="/">
                <Button type="primary" key="home">
                  Go Home
                </Button>
              </Link>,
              <Button
                onClick={() => {
                  setIsMessageReceived(false);
                }}
                key="again"
              >
                Send Again
              </Button>,
            ]}
          />
        ) : (
          <>
            <HeaderTitle
              title="Contact Us"
              subtitle="Thank you for reaching us! We are always happy to hear from you"
            />
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(contactSchema)}
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
                  Contact Information
                </p>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col
                    style={{ margin: "15px 0" }}
                    className="gutter-row"
                    lg={12}
                    xs={24}
                    sm={24}
                  >
                    <div>
                      <FormInput
                        name="name"
                        type="text"
                        size="large"
                        label="Name"
                        placeholder="Write your name"
                      />
                    </div>
                  </Col>
                  <Col
                    style={{ margin: "15px 0" }}
                    className="gutter-row"
                    lg={12}
                    xs={24}
                    sm={24}
                  >
                    <div>
                      <FormInput
                        name="city"
                        type="text"
                        size="large"
                        label="City"
                        placeholder="Write your city"
                      />
                    </div>
                  </Col>
                  <Col
                    style={{ margin: "15px 0" }}
                    className="gutter-row"
                    lg={12}
                    xs={24}
                    sm={24}
                  >
                    <div>
                      <FormInput
                        name="contactNo"
                        type="text"
                        size="large"
                        label="Contact Number"
                        placeholder="Write your contact number"
                      />
                    </div>
                  </Col>
                  <Col
                    style={{ margin: "15px 0" }}
                    className="gutter-row"
                    lg={12}
                    xs={24}
                    sm={24}
                  >
                    <div>
                      <FormInput
                        name="email"
                        type="text"
                        size="large"
                        label="Email"
                        placeholder="Write your email address"
                      />
                    </div>
                  </Col>
                  <Col
                    style={{ margin: "15px 0" }}
                    className="gutter-row"
                    span={24}
                  >
                    <div>
                      <FormTextArea
                        name="message"
                        size="large"
                        label="Message"
                        placeholder="Write full message that knows us"
                      />
                    </div>
                  </Col>
                </Row>
              </div>

              <Button
                size="large"
                type="primary"
                icon={<SendOutlined />}
                htmlType="submit"
              >
                Send Message
              </Button>
            </Form>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ContactPage;
