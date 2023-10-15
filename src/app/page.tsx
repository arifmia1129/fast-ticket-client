import HomeCarousel from "@/components/HomeCarousel";
import MainLayout from "@/components/layout/MainLayout";
import { redirect } from "next/navigation";

const RootHome = () => {
  return (
    <>
      <MainLayout>
        <div style={{ padding: "10px" }}>
          <HomeCarousel />
        </div>
      </MainLayout>
    </>
  );
};

export default RootHome;
