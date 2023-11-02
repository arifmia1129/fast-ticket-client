"use client";
import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { SidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import { USER_ROLE } from "@/constants/role";
import type { MenuProps } from "antd";
import { primaryColor } from "@/utils/color";

const { Sider } = Layout;

const Sidebar = () => {
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);
  const [collapsed, setCollapsed] = useState(true);

  const { role } = getUserInfo() as { role: string };

  const items = SidebarItems(role);

  useEffect(() => {
    if (role && items.length && !menuItems?.length) {
      setMenuItems(items);
    }
  }, [menuItems, items, role]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: primaryColor,
      }}
    >
      <p
        style={{
          color: "#fff",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 5,
          fontSize: collapsed ? 14 : 32,
        }}
      >
        Dashboard
      </p>
      {Array.isArray(menuItems) && menuItems.length && (
        <Menu
          style={{ padding: 10, backgroundColor: primaryColor, color: "#fff" }}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
        />
      )}
    </Sider>
  );
};

export default Sidebar;
