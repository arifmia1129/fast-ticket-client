"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { passengerItems, superAdminItems } from "@/constants/breadCrumbItem";

import { Avatar, Button, Col, Input, Row, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import { useDebounced } from "@/utils/hooks";
import dayjs from "dayjs";
import DeleteModal from "@/components/Modal/Confirmation";
import {
  useDeleteTripMutation,
  useGetTripQuery,
} from "@/redux/features/trip/tripApi";
import UMTable from "@/components/ui/UMTable";
import FormSelectField from "@/components/Forms/FormSelectField";
import { genderOptions } from "@/constants/global";
import Form from "@/components/Forms/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookedSchema } from "@/schema/booked";
import { useUserProfileQuery } from "@/redux/features/user/userApi";
import {
  useCreateBookedMutation,
  useGetBookedQuery,
  useUpdateBookedMutation,
} from "@/redux/features/booked/bookedApi";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import ConfirmationModal from "@/components/Modal/Confirmation";
import {
  useDeletePassengerMutation,
  useGetPassengerQuery,
} from "@/redux/features/passenger/passengerApi";

const ManagePassengerPage = () => {
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

  const { data: fetchedData, isLoading } = useGetBookedQuery({
    ...fetchQuery,
  });

  const debouncedSearchTerm: any = useDebounced(searchTerm, 600);

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
  const [deleteId, setDeleteId] = useState("");

  const [deletePassenger] = useDeletePassengerMutation();

  const showModal: any = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    message.loading("Deleteing...");

    try {
      const { data, error } = (await deletePassenger(deleteId)) as any;

      if (data?._id) {
        message.success("Successfully deleted the passenger");
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

  const [updateBooked] = useUpdateBookedMutation();

  const handleUpdateBookedStatus = async (id: string, status: string) => {
    await updateBooked({ id, data: { status } });
  };

  const columns = [
    {
      title: "Trip",
      dataIndex: "trip",
      render: (data: any) => {
        return (
          <div>
            <p>{data?.bus?.name}</p>
            <p>{data?.busNo}</p>
          </div>
        );
      },
    },
    {
      title: "Passenger",
      dataIndex: "passenger",
      render: (data: any) => {
        return (
          <div>
            <Avatar
              size={64}
              src={<img src={data?.profileImage} alt="avatar" />}
            />
            <p>
              {data?.name?.firstName} {data?.name?.lastName}
            </p>
          </div>
        );
      },
    },
    {
      title: "Contact",
      dataIndex: "passenger",
      render: (data: any) => {
        return (
          <div>
            <p>{data?.contactNo}</p>
            <p>{data?.email}</p>
          </div>
        );
      },
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: true,
      render: (data: any) => {
        return data && dayjs(data).format("D-MM-YYYY, hh:mm:ss A");
      },
    },

    {
      title: "Action",
      render: function ({ status, _id }: any) {
        return (
          <>
            {status === "pending" && (
              <>
                <Button
                  style={{ margin: "5px" }}
                  onClick={() => handleUpdateBookedStatus(_id, "accepted")}
                  type="primary"
                >
                  Accept
                </Button>
                <Button
                  style={{ margin: "5px" }}
                  onClick={() => handleUpdateBookedStatus(_id, "cancelled")}
                  type="primary"
                  danger
                >
                  Cancel
                </Button>
              </>
            )}
            {status === "accepted" && (
              <>
                <Button
                  style={{ margin: "5px", backgroundColor: "orange" }}
                  onClick={() => handleUpdateBookedStatus(_id, "pending")}
                  type="primary"
                >
                  Pending
                </Button>
                <Button
                  style={{ margin: "5px" }}
                  onClick={() => handleUpdateBookedStatus(_id, "cancelled")}
                  type="primary"
                  danger
                >
                  Cancel
                </Button>
              </>
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
    total: fetchedData?.meta?.total,
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

  return (
    <div>
      <UMBreadCrumb items={items} />

      <div style={{ margin: "10px 0" }}>
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={fetchedData?.data}
          paginationOptions={paginationOptions}
          handleChangeTableOptions={handleChangeTableOptions}
          showPagination={true}
        />
      </div>
      {deleteId ? (
        <ConfirmationModal
          handleOk={handleOk}
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
          title="Are you sure you want to delete the passenger?"
          description="If you delete the passenger. You can't acccess to this passenger later"
        />
      ) : null}
    </div>
  );
};

export default ManagePassengerPage;
