"use client";

import store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntdRegistry";
import { ConfigProvider } from "antd";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b",
            colorBgLayout: "#fff",
          },
        }}
      >
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </ConfigProvider>
    </Provider>
  );
};

export default Providers;
