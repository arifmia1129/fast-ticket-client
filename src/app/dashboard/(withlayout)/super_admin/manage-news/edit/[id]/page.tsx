"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { addTripInfoSchema } from "@/schema/trip";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import {
  useCreateNewsMutation,
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
} from "@/redux/features/news/newsApi";

const UpdateNewsPage = ({ params }: any) => {
  const { data: newsData } = useGetNewsByIdQuery(params?.id);

  const [updateNews] = useUpdateNewsMutation();

  const onSubmit = async (info: any) => {
    message.loading("Processing...");

    info.totalSeat = parseInt(info.totalSeat);

    try {
      const { data, error } = (await updateNews({
        data: info,
        id: params?.id,
      })) as any;

      if (data?._id) {
        message.success("Successfully updated news");
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
      <ActionBar title="Edit News"></ActionBar>
      <Form defaultValues={newsData} submitHandler={onSubmit}>
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

export default UpdateNewsPage;
