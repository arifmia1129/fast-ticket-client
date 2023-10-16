"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { passengerItems, superAdminItems } from "@/constants/breadCrumbItem";

import { Button, Col, Input, Row, Tag, Tooltip, message } from "antd";
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

const TripList = ({ searchParams }: any) => {
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

  const { data: fetchedData, isLoading } = useGetMyBookedQuery({
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
      title: "Bus",
      render: (data: any) => {
        return (
          <>
            <p>{data?.trip?.bus?.name}</p>
            <small style={{ textAlign: "center" }}>{data?.trip?.busNo}</small>
          </>
        );
      },
    },
    {
      title: "Seat",
      dataIndex: "seat",
    },
    {
      title: "Source",
      dataIndex: "trip",
      render: (data: any) => {
        return data?.source;
      },
    },
    {
      title: "Destination",
      dataIndex: "trip",
      render: (data: any) => {
        return data?.destination;
      },
    },
    {
      title: "Date",
      dataIndex: "trip",
      render: (data: any) => {
        return data && dayjs(data?.date).format("D-MM-YYYY");
      },
    },
    {
      title: "Time",
      dataIndex: "trip",
      render: (data: any) => {
        return data && data.time;
      },
    },
    {
      title: "Price",
      dataIndex: "trip",
      render: (data: any) => {
        return data && data.price;
      },
    },
    {
      title: "Status",
      render: ({ status }: any) => {
        let customStatus;

        if (status === "pending") {
          customStatus = (
            <Tag icon={<SyncOutlined spin />} color="processing">
              processing
            </Tag>
          );
        } else if (status === "accepted") {
          customStatus = (
            <Tag icon={<CheckCircleOutlined />} color="success">
              accepted
            </Tag>
          );
        } else if (status === "cancelled") {
          customStatus = (
            <Tag icon={<CloseCircleOutlined />} color="error">
              cancelled
            </Tag>
          );
        }

        return customStatus;
      },
    },

    {
      title: "Action",
      render: function ({ _id, status }: any) {
        return (
          <>
            {status === "pending" && (
              <Tooltip title="Cancle booked">
                <Button
                  onClick={() => {
                    setForDeleteBookedId(_id);
                    showModal();
                  }}
                  style={{ margin: "5px" }}
                  type="primary"
                  danger
                >
                  <CloseCircleOutlined />
                </Button>
              </Tooltip>
            )}
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
          <ActionBar title="My Booked Info">
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

      {forDeleteBookedId ? (
        <ConfirmationModal
          handleOk={handleOk}
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
          title="Are you sure you want to delete your booked?"
          description="If you delete your booking. You can't acccess to this booking"
        />
      ) : null}
    </div>
  );
};

export default TripList;
