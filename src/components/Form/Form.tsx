import { useBEM } from "@/utils/component/useBEM";
import { FormFieldType } from "@/types/FormFieldType";
import { useFormContext } from "react-hook-form";
import Button from "../Button/Button";
import FormField from "../FormField/FormField";
import SvgIcon from "../SvgIcon/SvgIcon";
import "./Form.scss";

/**
 * A generalized form builder component capable of rendering dynamic inputs
 * based on the provided field configuration array.
 * @param {FormFieldType[]} formFields - Schema array defining the inputs to render.
 * @param {string} cta - Text label for the submit or next step button.
 * @param {(data: any) => void} onNext - Callback executed upon successful field completion or step transition.
 * @param {(e: any) => void} [onPrevious] - Optional callback for multi-step forms to go back.
 * @param {(data: any) => void} [onSubmit] - Optional final submission handler.
 * @param {string} [checkboxCopy] - Optional text for an agreement/terms checkbox.
 */
type FormProps = {
  formFields: FormFieldType[];
  cta: string;
  onNext: (data: any) => void;
  onPrevious?: (e: any) => void;
  onSubmit?: (data: any) => void;
  checkboxCopy?: string;
};

export default function Form({
  formFields,
  cta,
  onNext,
  onPrevious,
  onSubmit,
  checkboxCopy,
}: FormProps) {
  const b = useBEM("form");
  const { handleSubmit, trigger, getValues } = useFormContext();

  const handleFormAction = async (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      await handleSubmit(onSubmit)(e);
    } else {
      const currentFieldNames = formFields.map((field) => field.name);
      const isStepValid = await trigger(currentFieldNames);

      if (isStepValid) {
        const currentData = getValues();
        onNext(currentData);
      }
    }
  };

  return (
    <form className={b()} onSubmit={handleFormAction}>
      {onPrevious && (
        <SvgIcon
          classname={b("back")}
          icon="back"
          onClick={onPrevious}
          size={24}
        />
      )}
      <div className={b("container")}>
        {formFields.map((formField) => (
          <div key={formField.name}>
            <FormField
              formField={{
                ...formField,
              }}
            />
          </div>
        ))}
        {checkboxCopy && (
          <label className={b("checkbox-container")}>
            <input className={b("checkbox")} type="checkbox" required={true} />
            <span className={b("custom-checkmark")} />
            <span className={b("checkbox-copy")}>{checkboxCopy}</span>
          </label>
        )}
        <Button classname={b("btn")} type="primary" submit={true}>
          {cta}
        </Button>
      </div>
    </form>
  );
}
