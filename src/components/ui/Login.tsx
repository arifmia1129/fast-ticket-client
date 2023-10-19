"use client";

import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";
import loginImg from "../../assets/login.png";
import Form from "@/components/Forms/Form";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import FormInput from "@/components/Forms/FormInput";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import { getUserInfo, isLoggedIn, storeToken } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schema/login";
import { primaryColor } from "@/utils/color";
import Link from "next/link";

type FormValues = {
  id: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [userLogin] = useUserLoginMutation();

  const isUserLoggedIn = isLoggedIn();

  useEffect(() => {
    userLogin({ id: "00001", password: "123456" });
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push("/");
    }
  }, [isUserLoggedIn]);

  const onSubmit: SubmitHandler<FormValues> = async (credentials) => {
    message.loading("Processing...");
    try {
      const { data, error } = (await userLogin(credentials)) as any;
      if (data && data?.accessToken) {
        storeToken(data?.accessToken);
        router.push("/");
        message.success("Successfully logged in");
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
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col sm={12} md={16} lg={10}>
        <Image
          src={loginImg}
          width={400}
          style={{ maxWidth: "90vw" }}
          alt="login-image"
        />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0",
          }}
        >
          First login your account
        </h1>
        <div>
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div>
              <FormInput
                required
                name="id"
                type="text"
                size="large"
                label="User ID"
              />
            </div>
            <div
              style={{
                margin: "15px 0",
              }}
            >
              <FormInput
                required
                name="password"
                type="password"
                size="large"
                label="Password"
              />
            </div>
            <p
              style={{
                margin: "5px 0",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <>
                Don't have an account?
                <Link href="/passenger/register">
                  <span style={{ color: primaryColor, margin: "0 5px" }}>
                    Create a passenger account
                  </span>
                </Link>
              </>
            </p>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
