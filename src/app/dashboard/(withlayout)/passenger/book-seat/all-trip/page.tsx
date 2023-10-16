"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { superAdminItems } from "@/constants/breadCrumbItem";

import { Button, Col, Input, Row, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import { CheckCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import Link from "next/link";
import { useDebounced } from "@/utils/hooks";
import dayjs from "dayjs";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useGetTripQuery } from "@/redux/features/trip/tripApi";
import UMTable from "@/components/ui/UMTable";
import FormSelectField from "@/components/Forms/FormSelectField";
import { genderOptions } from "@/constants/global";
import Form from "@/components/Forms/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookedSchema } from "@/schema/booked";
import { useUserProfileQuery } from "@/redux/features/user/userApi";
import { useCreateBookedMutation } from "@/redux/features/booked/bookedApi";

const TripList = ({ searchParams }: any) => {
  //   const { data: adminData } = useGetAdminByIdQuery(params.id);

  const { source, destination, date } = searchParams || {};

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

  if (source) {
    fetchQuery["source"] = source;
  }

  if (destination) {
    fetchQuery["destination"] = destination;
  }

  if (date) {
    fetchQuery["date"] = date;
  }

  const { data: fetchedTripData, isLoading } = useGetTripQuery({
    ...fetchQuery,
  });

  const { data, meta } = fetchedTripData || {};

  const debouncedSearchTerm = useDebounced(searchTerm, 600);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchQuery["searchTerm"] = debouncedSearchTerm;
    }
  }, [debouncedSearchTerm]);

  const items = [...superAdminItems];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAdminId, setDeleteAdminId] = useState("");

  const showModal: any = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    // await deleteDepartment(deleteAdminId);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data: profile } = useUserProfileQuery(undefined);

  const [createBooked] = useCreateBookedMutation();

  const onSubmit = async (info: any) => {
    message.loading("Booking...");

    const [trip, seat] = info?.tripInfo?.split("-");

    const bookedInfo = {
      seat,
      trip,
      passenger: profile?._id,
    };
    try {
      const { data, error } = (await createBooked(bookedInfo)) as any;

      if (data?._id) {
        message.success("Successfully booked seat");
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

  const columns = [
    {
      title: "Bus",
      render: (data: any) => {
        return (
          <>
            <p>{data?.bus?.name}</p>
            <small style={{ textAlign: "center" }}>{data?.busNo}</small>
          </>
        );
      },
    },
    {
      title: "Source",
      dataIndex: "source",
    },
    {
      title: "Destination",
      dataIndex: "destination",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (data: any) => {
        return data && dayjs(data).format("D-MM-YYYY");
      },
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Price",
      dataIndex: "price",
    },

    {
      title: "Action",
      render: function (data: any) {
        const availableSeats = data?.seats?.filter(
          (seat: any) => seat.status === "available"
        );
        const seatOptions = availableSeats.map((seat: any) => {
          return {
            label: `seat-${seat.seat}`,
            value: `${data._id}-${seat._id}`,
          };
        });
        return (
          <div>
            <div>
              <Form
                submitHandler={onSubmit}
                resolver={yupResolver(bookedSchema)}
              >
                <div>
                  <Tooltip title="Select from available seats">
                    <div style={{ width: 100, margin: "0 5px" }}>
                      <FormSelectField
                        name="tripInfo"
                        size="large"
                        items={seatOptions}
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="Book a seat">
                    <div
                      style={{
                        width: 100,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        style={{ margin: "5px" }}
                        type="primary"
                        htmlType="submit"
                      >
                        <CheckCircleOutlined />
                      </Button>
                    </div>
                  </Tooltip>
                </div>
              </Form>
            </div>
          </div>
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
    pageSizeOptions: [5, 10, 20],
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

  const handleResetQuery = () => {
    setSortOrder("");
    setSortBy("");
    setSearchTerm("");
  };

  return (
    <div>
      <UMBreadCrumb items={items} />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <ActionBar title="Trip Information">
            <Input
              value={searchTerm}
              placeholder="Search anything..."
              style={{ maxWidth: "100%" }}
              type="text"
              size="large"
              onChange={(event: any) => setSearchTerm(event.target.value)}
            />
          </ActionBar>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ textAlign: "center" }}>
            {(searchTerm || sortBy || sortOrder) && (
              <Button onClick={handleResetQuery} type="primary">
                <ReloadOutlined />
              </Button>
            )}
          </div>
        </Col>
      </Row>
      <div style={{ margin: "10px 0" }}>
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={data}
          paginationOptions={paginationOptions}
          handleChangeTableOptions={handleChangeTableOptions}
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default TripList;
