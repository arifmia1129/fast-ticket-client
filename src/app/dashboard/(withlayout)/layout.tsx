"use client";
import React, { useState, useEffect } from "react";
import Contents from "@/components/ui/Contents";
import Sidebar from "@/components/ui/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/Loading";
import { primaryColor } from "@/utils/color";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isUserLoggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push("/login");
      setIsLoading(true);
    }
  }, [isUserLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider color={primaryColor}>
      <Sidebar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
