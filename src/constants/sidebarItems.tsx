import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const SidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/dashboard/${role}`}>Profile</Link>,
      key: "profile",
      icon: <ProfileOutlined />,
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: (
        <Link href={`/dashboard/${role}/manage-passenger`}>
          Manage Passenger
        </Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/passenger`,
    },
    {
      label: (
        <Link href={`/dashboard/${role}/manage-bus_owner`}>
          Manage Bus Owner
        </Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/bus_owner`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/department`}>Department</Link>,
          key: `/${role}/department`,
        },
      ],
    },
  ];

  const busOwnerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: <Link href={`/dashboard/${role}/bus`}>Bus</Link>,
      icon: <TableOutlined />,
      key: `/${role}/bus`,
    },
    {
      label: <Link href={`/dashboard/${role}/trip`}>Trip</Link>,
      icon: <TableOutlined />,
      key: `/${role}/trip`,
    },
  ];

  const passengerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: (
        <Link href={`/dashboard/${role}/book-seat/trip-info`}>Book Seat</Link>
      ),
      icon: <ThunderboltOutlined />,
      key: `/${role}/registration`,
    },
    {
      label: <Link href={`/dashboard/${role}/my-booked`}>Book Seat</Link>,
      icon: <TableOutlined />,
      key: `/${role}/my-booked`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.BUS_OWNER) return busOwnerSidebarItems;
  else if (role === USER_ROLE.PASSENGER) return passengerSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
