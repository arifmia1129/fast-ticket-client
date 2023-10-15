import MainLayout from "@/components/layout/MainLayout";
import PassengerRegister from "@/components/ui/PassengerRegister";

export default function page() {
  return (
    <>
      <MainLayout>
        <div style={{ margin: "20px" }}>
          <PassengerRegister />
        </div>
      </MainLayout>
    </>
  );
}
