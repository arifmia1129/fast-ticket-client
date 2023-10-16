import { getErrorMessageByPropertyName } from "@/utils/errorMessage";
import { Select } from "antd";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

type Item = { value: string; label: string };

interface IInput {
  name: string;
  size?: "large" | "small";
  defaultValue?: string;
  label?: string;
  items: Item[];
  handleOnChange?: (value: string) => void;
}

const FormSelectField = ({
  name,
  size,
  defaultValue,
  label,
  items,
  handleOnChange,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);
  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select
            defaultValue={defaultValue}
            showSearch
            size={size}
            onChange={handleOnChange ? (e) => handleOnChange(e) : onChange}
            options={items}
            value={value}
            style={{ width: "100%" }}
            placeholder="Select"
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage && errorMessage}</small>
    </>
  );
};

export default FormSelectField;
