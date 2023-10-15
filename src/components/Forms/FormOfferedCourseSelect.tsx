import { useGetOfferedCourseQuery } from "@/redux/features/offeredCourse/offeredCourseApi";
import FormMultiSelectField from "./FormMultiSelectField";
import { useGetCourseQuery } from "@/redux/features/course/courseApi";

interface IProps {
  name: string;
  label: string;
}

export default function FormOfferedCourseSelect({ name, label }: IProps) {
  const { data } = useGetCourseQuery();

  const offeredCourseOptions = data?.Course?.map((course: any) => {
    return {
      label: course.title,
      value: course.id,
    };
  });

  return (
    <>
      <FormMultiSelectField
        items={offeredCourseOptions}
        name={name}
        label={label}
      />
    </>
  );
}
