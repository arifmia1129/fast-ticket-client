"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  busOwnerItems,
  passengerItems,
  superAdminItems,
} from "@/constants/breadCrumbItem";

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
  DeleteFilled,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  ReloadOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import ConfirmationModal from "@/components/Modal/Confirmation";
import Link from "next/link";
import {
  useDeleteBusMutation,
  useGetBusQuery,
} from "@/redux/features/bus/busApi";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "@/redux/features/contact/contactApi";

const ManageContactPage = ({ searchParams }: any) => {
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

  const { data: fetchedData, isLoading } = useGetContactQuery({
    ...fetchQuery,
  });

  const { data, meta } = fetchedData || {};

  const debouncedSearchTerm = useDebounced(searchTerm, 600);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchQuery["searchTerm"] = debouncedSearchTerm;
    }
  }, [debouncedSearchTerm]);

  const items = [...busOwnerItems];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forDeleteId, setForDeleteId] = useState<string>("");

  const [deleteCotact] = useDeleteContactMutation();

  const showModal: any = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    message.loading("Deleteing...");

    try {
      const { data, error } = (await deleteCotact(forDeleteId)) as any;

      if (data?._id) {
        message.success("Successfully deleted the contact");
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Contact",
      render: (data: any) => {
        return (
          <>
            <p>{data?.contactNo}</p>
            <p>{data?.email}</p>
          </>
        );
      },
    },
    {
      title: "Message",
      dataIndex: "message",
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
      render: function ({ _id }: any) {
        return (
          <>
            <Button
              onClick={() => {
                setForDeleteId(_id);
                showModal();
              }}
              style={{ margin: "5px" }}
              type="primary"
              danger
            >
              <DeleteFilled />
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
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <ActionBar title="Manage Bus">
            <Input
              value={searchTerm}
              placeholder="Search anything..."
              style={{ maxWidth: "100%" }}
              type="text"
              size="large"
              onChange={(event: any) => setSearchTerm(event.target.value)}
            />
            <div style={{ margin: "5px 0" }}>
              <Link href="/dashboard/admin/manage-bus/add">
                <Button style={{ margin: "0 5px" }} type="primary">
                  Add Bus
                </Button>
              </Link>
              {(searchTerm || sortBy || sortOrder) && (
                <Button onClick={handleResetQuery} type="primary">
                  <ReloadOutlined />
                </Button>
              )}
            </div>
          </ActionBar>
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

      {forDeleteId ? (
        <ConfirmationModal
          handleOk={handleOk}
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
          title="Are you sure you want to delete the contact?"
          description="If you delete the contact. You can't acccess to this contact later"
        />
      ) : null}
    </div>
  );
};

export default ManageContactPage;
