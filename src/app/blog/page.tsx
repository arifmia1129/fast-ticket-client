"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { passengerItems, superAdminItems } from "@/constants/breadCrumbItem";

import { Button, Col, Input, Row, Table, Tag, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import { useDebounced } from "@/utils/hooks";
import dayjs from "dayjs";
import UMTable from "@/components/ui/UMTable";
import FormSelectField from "@/components/Forms/FormSelectField";
import { genderOptions } from "@/constants/global";
import Form from "@/components/Forms/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookedSchema } from "@/schema/booked";
import { useUserProfileQuery } from "@/redux/features/user/userApi";
import {
  useCreateBookedMutation,
  useDeleteBookedMutation,
  useGetMyBookedQuery,
} from "@/redux/features/booked/bookedApi";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  ReloadOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import ConfirmationModal from "@/components/Modal/Confirmation";
import MainLayout from "@/components/layout/MainLayout";
import { useGetBlogQuery } from "@/redux/features/blog/blogApi";
import Image from "next/image";

const BookedPage = ({ searchParams }: any) => {
  //   const { data: adminData } = useGetAdminByIdQuery(params.id);

  const fetchQuery: Record<string, any> = {};

  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  fetchQuery["limit"] = size;
  fetchQuery["page"] = page;
  fetchQuery["sortBy"] = sortBy;
  fetchQuery["sortOrder"] = sortOrder;
  fetchQuery["searchTerm"] = searchTerm;

  const { data: fetchedData, isLoading } = useGetBlogQuery({
    ...fetchQuery,
  });

  const { data, meta } = fetchedData || {};

  const debouncedSearchTerm = useDebounced(searchTerm, 600);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchQuery["searchTerm"] = debouncedSearchTerm;
    }
  }, [debouncedSearchTerm]);

  const items = [...passengerItems];

  items.push({
    label: "Modify Search",
    link: "dashboard/passenger/book-seat/trip-info",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forDeleteBookedId, setForDeleteBookedId] = useState<string>("");

  const [deleteBooked] = useDeleteBookedMutation();

  const showModal: any = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    message.loading("Booking...");

    try {
      const { data, error } = (await deleteBooked(forDeleteBookedId)) as any;

      if (data?._id) {
        message.success("Successfully deleted the booked");
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data: profile } = useUserProfileQuery(undefined);

  const [createBooked] = useCreateBookedMutation();

  const columns = [
    {
      render: function (data: any) {
        return (
          <>
            <Row
              style={{
                margin: "10px",
                border: "2px solid gray",
                padding: "5px",
                borderRadius: "10px",
              }}
              justify="center"
              align="middle"
            >
              <Col xs={24} sm={24} lg={6} md={6}>
                <Image
                  width={300}
                  height={200}
                  src={data?.imageUrl}
                  alt="image-url"
                />
              </Col>
              <Col xs={24} sm={24} lg={18} md={18}>
                <div>
                  <h1 style={{ fontSize: "40px", color: "gray" }}>
                    {data?.title}
                  </h1>
                  <p>{data?.description}</p>
                </div>
              </Col>
            </Row>
          </>
        );
      },
    },
  ];

  const handleChangePaginationOptions = (page: number, size: number): void => {
    setPage(page);
    setSize(size);
  };

  const paginationOptions = {
    pageSize: size,
    total: meta?.total,
    pageSizeOptions: [2, 5, 10, 20],
    showSizeChanger: true,
    onChange: handleChangePaginationOptions,
  };

  const handleChangeTableOptions = (
    pagination: any,
    filter: any,
    sorter: any
  ) => {
    const { order, field } = sorter;
    setSortBy(field);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  return (
    <MainLayout>
      <div style={{ padding: "10px" }}>
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={data}
          pagination={paginationOptions}
          onChange={handleChangeTableOptions}
          sticky
        />
      </div>
    </MainLayout>
  );
};

export default BookedPage;
