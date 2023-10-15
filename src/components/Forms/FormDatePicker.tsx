import { DatePicker, DatePickerProps, Input } from "antd";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

interface IDatePicker {
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
}
const FormDatePicker = ({
  name,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
  onChange,
}: IDatePicker) => {
  const { control, setValue } = useFormContext();
  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString) : null;

    setValue(name, dateString);
  };
  return (
    <>
      {label ? label : null}
      <br />
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            style={{ width: "100%", height: 40 }}
            defaultValue={dayjs(field.value)}
            onChange={handleOnChange}
          />
        )}
      />
    </>
  );
};

export default FormDatePicker;
