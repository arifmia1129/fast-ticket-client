import { getErrorMessageByPropertyName } from "@/utils/errorMessage";
import { Input } from "antd";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface IInput {
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
}

const FormTextArea = ({
  name,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
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
        render={({ field }) => (
          <Input.TextArea
            {...field}
            size={size}
            placeholder={placeholder}
            value={value ? value : field.value}
            style={{ height: 100 }}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage && errorMessage}</small>
    </>
  );
};

export default FormTextArea;
