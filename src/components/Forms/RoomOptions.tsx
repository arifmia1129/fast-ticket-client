import { useGetRoomQuery } from "@/redux/features/room/roomApi";
import FormSelectField from "./FormSelectField";

type RoomProps = {
  name: string;
  label?: string;
};

const RoomOptions = ({ name }: RoomProps) => {
  const { data, isLoading } = useGetRoomQuery({
    limit: 100,
    page: 1,
  });

  //console.log(data);

  const rooms = data?.room;
  const roomsOptions = rooms?.map((room: any) => {
    return {
      label: room?.roomNumber,
      value: room?.id,
    };
  });

  return <FormSelectField name={name} label="Room" items={roomsOptions} />;
};

export default RoomOptions;
