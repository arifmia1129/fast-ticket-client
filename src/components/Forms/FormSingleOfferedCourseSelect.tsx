import { useGetCourseQuery } from "@/redux/features/course/courseApi";
import FormSelectField from "./FormSelectField";
import { useGetOfferedCourseQuery } from "@/redux/features/offeredCourse/offeredCourseApi";

interface IProps {
  name: string;
  label: string;
}

export default function FormSingleOfferedCourseSelect({ name, label }: IProps) {
  const { data } = useGetOfferedCourseQuery();

  const offeredCourseOptions = data?.offeredCourse?.map((course: any) => {
    return {
      label: course.course.title,
      value: course.id,
    };
  });

  return (
    <>
      <FormSelectField items={offeredCourseOptions} name={name} label={label} />
    </>
  );
}
