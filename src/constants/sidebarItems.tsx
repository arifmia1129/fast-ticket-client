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

// Helper function to generate keys
const generateKey = (role: string, item: string) => {
  return `/${role}${item}`;
};

export const SidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/dashboard/${role}`}>Profile</Link>,
      key: generateKey(role, "profile"),
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
      key: generateKey(role, "passenger"),
    },
    {
      label: (
        <Link href={`/dashboard/${role}/manage-bus_owner`}>
          Manage Bus Owner
        </Link>
      ),
      icon: <TableOutlined />,
      key: generateKey(role, "bus_owner"),
    },
    {
      label: <Link href={`/dashboard/${role}/manage-bus`}>Manage Bus</Link>,
      icon: <TableOutlined />,
      key: generateKey(role, "bus"),
    },
    {
      label: <Link href={`/dashboard/${role}/manage-trip`}>Manage Trip</Link>,
      icon: <TableOutlined />,
      key: generateKey(role, "trip"),
    },
    {
      label: (
        <Link href={`/dashboard/${role}/manage-booked`}>Manage Booked</Link>
      ),
      icon: <TableOutlined />,
      key: generateKey(role, "booked"),
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
      label: <Link href={`/dashboard/${role}/manage-admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: generateKey(role, "manage-admin"),
    },
  ];

  const busOwnerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: <Link href={`/dashboard/${role}/bus`}>Bus</Link>,
      icon: <TableOutlined />,
      key: generateKey(role, "bus"),
    },
    {
      label: <Link href={`/dashboard/${role}/trip`}>Trip</Link>,
      icon: <TableOutlined />,
      key: generateKey(role, "trip"),
    },
  ];

  const passengerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: (
        <Link href={`/dashboard/${role}/book-seat/trip-info`}>Book Seat</Link>
      ),
      icon: <ThunderboltOutlined />,
      key: generateKey(role, "registration"),
    },
    {
      label: <Link href={`/dashboard/${role}/my-booked`}>My Booked</Link>,
      icon: <TableOutlined />,
      key: generateKey(role, "my-booked"),
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
