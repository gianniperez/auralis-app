import { useBEM } from "@/utils/component/useBEM";
import { IconType } from "@/types/IconType";
import { InputType } from "@/types/InputType";
import { useFormContext } from "react-hook-form";
import SvgIcon from "../SvgIcon/SvgIcon";
import { JSX } from "react";
import Select from "../Select/Select";
import FileUpload from "../FileUpload/FileUpload";
import { FormFieldType } from "@/types/FormFieldType";
import "./InputField.scss";

/**
 * A controlled input component utilized within forms, supporting typical string inputs and dropdowns.
 * @param {string} name - Field name attribute.
 * @param {InputType} type - Input element type (e.g., text, password, select).
 * @param {string} placeholder - Placeholder text shown when empty.
 * @param {{ label: string; value: string }[]} [options] - Available options for 'select' type inputs.
 */
type InputFieldProps = {
  name: string;
  type: InputType;
  placeholder: string;
  options?: { label: string; value: string }[];
  icon?: IconType;
  validation?: FormFieldType["validation"];
};

export default function InputField({
  name,
  type,
  placeholder,
  options,
  icon,
  validation,
}: InputFieldProps): JSX.Element | null {
  const b = useBEM("input-field");
  const { register, setValue, getValues } = useFormContext();

  if (!name) return null;

  const today = new Date();
  // Restamos el offset de la zona horaria para evitar que dé "ayer" en la noche
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const todayString = today.toISOString().split("T")[0];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processedValidation: any = { ...validation };

  if (validation?.pattern) {
    processedValidation.pattern = {
      value: new RegExp(validation.pattern.value, "i"),
      message: validation.pattern.message,
    };
  }

  if (validation?.minDateToday) {
    processedValidation.min = {
      value: todayString,
      message: validation.minDateToday,
    };
    delete processedValidation.minDateToday;
  }

  if (type === "select" || type === "file") {
    register(name, processedValidation);
  }

  switch (type) {
    case "select":
      return (
        <>
          {options && (
            <Select
              options={options}
              onSelectOption={(selected) => {
                setValue(name, selected, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              defaultValue={getValues(name)}
            />
          )}
        </>
      );
    case "file":
      return (
        <FileUpload
          ctaCopy={"Browse File(s)"}
          accept=".png, .pdf, .jpg, .docx"
          onFileSelect={(files) => {
            setValue(name, files, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
      );
    case "textarea":
      return (
        <div className={b()}>
          <textarea
            id={name}
            placeholder={placeholder}
            {...register(name, processedValidation)}
          />
        </div>
      );
    default:
      return (
        <div className={b()}>
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            min={
              type === "date" && validation?.minDateToday
                ? todayString
                : undefined
            }
            {...register(name, processedValidation)}
          />
          {icon && <SvgIcon icon={icon} size={22} />}
        </div>
      );
  }
}
