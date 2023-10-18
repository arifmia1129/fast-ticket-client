"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { passengerItems } from "@/constants/breadCrumbItem";
import { Avatar, Button, Col, Input, Row, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import Link from "next/link";
import { useDebounced } from "@/utils/hooks";
import dayjs from "dayjs";
import UMTable from "@/components/ui/UMTable";
import { useCreateBookedMutation } from "@/redux/features/booked/bookedApi";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ConfirmationModal from "@/components/Modal/Confirmation";
import {
  useDeleteBlogMutation,
  useGetBlogQuery,
} from "@/redux/features/blog/blogApi";

const ManageBlogPage = () => {
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

  const [deleteBlog] = useDeleteBlogMutation();

  const showModal: any = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    message.loading("Deleteing...");

    try {
      const { data, error } = (await deleteBlog(deleteId)) as any;

      if (data?._id) {
        message.success("Successfully deleted the blog");
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
      title: "News",
      render: (data: any) => {
        return (
          <Row justify="center" align="middle">
            <Avatar size={64} src={<img src={data?.imageUrl} alt="avatar" />} />
            <h3 style={{ margin: "0 5px", fontWeight: "bold" }}>
              {data?.title}
            </h3>
          </Row>
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
      render: function (data: any) {
        return (
          <>
            <Link href={`/dashboard/super_admin/manage-blog/edit/${data._id}`}>
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

  const handleResetQuery = () => {
    setSortOrder("");
    setSortBy("");
    setSearchTerm("");
  };

  return (
    <div>
      <UMBreadCrumb items={items} />
      <ActionBar title="Manage News">
        <Input
          value={searchTerm}
          placeholder="Search anything..."
          style={{ maxWidth: "300px" }}
          type="text"
          size="large"
          onChange={(event: any) => setSearchTerm(event.target.value)}
        />
        <div style={{ margin: "5px 0" }}>
          <Link href="/dashboard/super_admin/manage-blog/create">
            <Button style={{ margin: "0 5px" }} type="primary">
              Create Blog
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
          title="Are you sure you want to delete the blog?"
          description="If you delete the blog. You can't acccess to this blog later"
        />
      ) : null}
    </div>
  );
};

export default ManageBlogPage;
