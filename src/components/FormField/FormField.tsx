import { useBEM } from "@/utils/component/useBEM";
import { FormFieldType } from "@/types/FormFieldType";
import { useFormContext } from "react-hook-form";
import InputField from "../InputField/InputField";
import SvgIcon from "../SvgIcon/SvgIcon";
import "./FormField.scss";

/**
 * A wrapper component that renders a specific type of input field (text, email, select, etc.)
 * based on the provided field configuration object.
 * @param {FormFieldType} formField - Object containing the configuration (name, type, options, etc.) for the input.
 */
type FormFieldProps = {
  formField: FormFieldType;
};

export default function FormField({ formField }: FormFieldProps) {
  const b = useBEM("form-field");
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[formField.name];

  return (
    <div className={b(null, error ? "error" : undefined)}>
      <div className={b("label")}>
        <p>{formField.label}</p>
        {formField.required && <SvgIcon icon="required" size={7} />}
      </div>
      <InputField
        name={formField.name}
        type={formField.type}
        placeholder={formField.placeholder ?? ""}
        options={formField.options}
        icon={formField.icon}
        validation={formField.validation}
      />
      {error && (
        <div className={b("error-message")}>{error.message as string}</div>
      )}
    </div>
  );
}
