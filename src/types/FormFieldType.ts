import { InputType } from "./InputType";
import { IconType } from "./IconType";

export type FormFieldType = {
  name: string;
  type: InputType;
  label: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
  helperText?: string;
  hidden?: boolean;
  required?: boolean;
  validation?: {
    required?: string | boolean;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: string; message: string };
    minDateToday?: string;
  };
  icon?: IconType;
};
