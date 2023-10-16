"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { passengerItems, superAdminItems } from "@/constants/breadCrumbItem";

import { Button, Col, Input, Row, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import Link from "next/link";
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
import { useCreateBookedMutation } from "@/redux/features/booked/bookedApi";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import ConfirmationModal from "@/components/Modal/Confirmation";

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

  const { data: profile } = useUserProfileQuery(undefined);

  const filteredTripData = data?.filter(
    (trip: any) => trip?.bus?.owner === profile?._id
  );

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
  const [deleteId, setDeleteId] = useState("");

  const [deleteTrip] = useDeleteTripMutation();

  const showModal: any = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    message.loading("Deleteing...");

    try {
      const { data, error } = (await deleteTrip(deleteId)) as any;

      if (data?._id) {
        message.success("Successfully deleted the trip");
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

  const [createBooked] = useCreateBookedMutation();

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
        return (
          <>
            <Link href={`/super_admin/admin/edit/${data._id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => {
                setDeleteId(data._id);
                showModal();
              }}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
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
      <ActionBar title="My Added Trip">
        <Input
          value={searchTerm}
          placeholder="Search anything..."
          style={{ maxWidth: "300px" }}
          type="text"
          size="large"
          onChange={(event: any) => setSearchTerm(event.target.value)}
        />
        <div style={{ margin: "5px 0" }}>
          <Link href="/dashboard/bus_owner/trip/create">
            <Button style={{ margin: "0 5px" }} type="primary">
              Create Trip
            </Button>
          </Link>
          {(searchTerm || sortBy || sortOrder) && (
            <Button onClick={handleResetQuery} type="primary">
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <div style={{ margin: "10px 0" }}>
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={filteredTripData}
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
          title="Are you sure you want to delete the trip?"
          description="If you delete the trip. You can't acccess to this trip later"
        />
      ) : null}
    </div>
  );
};

export default TripList;
