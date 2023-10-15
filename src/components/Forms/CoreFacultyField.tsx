import { useGetFacultyQuery } from "@/redux/features/faculty/facultyApi";
import FormSelectField from "./FormSelectField";

type FacultyProps = {
  name: string;
  label?: string;
};

const CoreFacultyField = ({ name }: FacultyProps) => {
  const { data, isLoading } = useGetFacultyQuery({
    limit: 100,
    page: 1,
  });

  //console.log(data);

  const faculties = data?.faculty;
  const facultiesOptions = faculties?.map((faculty: any) => {
    //console.log(faculty);
    //ts-ignore
    return {
      label: `${faculty?.name?.firstName} ${faculty?.name?.lastName} ${faculty?.name?.middleName}`,
      value: faculty?.syncId,
    };
  });

  return (
    <FormSelectField
      name={name}
      label="Faculty"
      items={facultiesOptions as any}
    />
  );
};

export default CoreFacultyField;
