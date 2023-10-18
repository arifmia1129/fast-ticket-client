"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { addTripInfoSchema } from "@/schema/trip";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import { useCreateNewsMutation } from "@/redux/features/news/newsApi";

const CreateNewsPage = () => {
  const [createNews] = useCreateNewsMutation();

  const onSubmit = async (info: any) => {
    message.loading("Processing...");

    info.totalSeat = parseInt(info.totalSeat);

    try {
      const { data, error } = (await createNews(info)) as any;

      if (data?._id) {
        message.success("Successfully created news");
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
      <ActionBar title="Create News"></ActionBar>
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
            News Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              style={{ margin: "15px 0" }}
              className="gutter-row"
              xs={24}
              lg={12}
            >
              <div>
                <FormInput
                  name="title"
                  type="text"
                  size="large"
                  label="Title"
                  placeholder="Write news title"
                />
              </div>
            </Col>
            <Col
              style={{ margin: "15px 0" }}
              className="gutter-row"
              xs={24}
              lg={12}
            >
              <div>
                <FormInput
                  name="imageUrl"
                  type="text"
                  size="large"
                  label="Image URL"
                  placeholder="Write image url from news"
                />
              </div>
            </Col>
            <Col
              style={{ margin: "15px 0" }}
              className="gutter-row"
              xs={24}
              lg={12}
            >
              <div>
                <FormInput
                  name="newsBy"
                  type="text"
                  size="large"
                  label="News By"
                  placeholder="Write news source name"
                />
              </div>
            </Col>
            <Col
              style={{ margin: "15px 0" }}
              className="gutter-row"
              xs={24}
              lg={12}
            >
              <div>
                <FormInput
                  name="newsLink"
                  type="text"
                  size="large"
                  label="News Link"
                  placeholder="Write news link"
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

export default CreateNewsPage;
