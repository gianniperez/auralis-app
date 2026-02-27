/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useBEM } from "@/utils/component/useBEM";
import SuccessView from "../SuccessView/SuccessView";
import Form from "../Form/Form";
import { useTranslations } from "next-intl";
import { useForm, FormProvider } from "react-hook-form";
import "./ContactForm.scss";

/**
 * A standalone contact form component that collects user inquiries and routes them via an API.
 * Handles validation, submission states, and feedback messages.
 */
export default function ContactForm() {
  const b = useBEM("contact-form");

  const tContact = useTranslations("ContactForm");
  const personalInfoFields = tContact.raw("personalInfoFields");
  const orderDetailsFields = tContact.raw("orderDetailsFields");
  const estimationFields = tContact.raw("estimationFields");
  const messageField = tContact.raw("messageField");
  const success = tContact.raw("success");
  const continueCta = tContact.raw("continueCta");
  const submitCta = tContact.raw("submitCta");

  const methods = useForm({
    mode: "onChange",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = (data: any) => {
    if (currentStep === 1) {
      const reason = data.reason?.value || data.reason;

      if (reason === "order") {
        setCurrentStep(2);
      } else {
        setCurrentStep(4);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep === 4) {
      setCurrentStep(1);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const submit = async (raw_data: any) => {
    const data: Record<string, any> = {};

    Object.entries(raw_data).forEach(([key, value]: [string, any]) => {
      if (value && typeof value === "object" && "value" in value) {
        data[key] = value.value;
        if ("label" in value) {
          data[`${key}Label`] = value.label;
        }
      } else {
        data[key] = value;
      }
    });

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setCurrentStep(5);
      } else {
        const errorData = await response.json();
        console.error("Server Error Details:", errorData);
        throw new Error(errorData.error || "Error al enviar");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar el formulario.");
    }
  };

  /**
   * Renders the corresponding form view based on the current step.
   * @returns {JSX.Element} The current step component.
   */
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form
            onNext={nextStep}
            formFields={personalInfoFields}
            cta={continueCta}
          />
        );
      case 2:
        return (
          <Form
            onNext={nextStep}
            onPrevious={prevStep}
            formFields={orderDetailsFields}
            cta={continueCta}
          />
        );
      case 3:
        return (
          <Form
            onNext={nextStep}
            onPrevious={prevStep}
            onSubmit={submit}
            formFields={estimationFields}
            cta={submitCta}
            checkboxCopy={tContact("checkbox")}
          />
        );
      case 4:
        return (
          <Form
            onNext={nextStep}
            onPrevious={prevStep}
            onSubmit={submit}
            formFields={messageField}
            cta={submitCta}
            checkboxCopy={tContact("checkbox")}
          />
        );
      case 5:
        return <SuccessView message={success} cta={success.cta} />;
      default:
        return (
          <Form
            onNext={nextStep}
            formFields={personalInfoFields}
            cta={continueCta}
          />
        );
    }
  };

  return (
    <div className={b()}>
      <FormProvider {...methods}>{renderStep()}</FormProvider>
    </div>
  );
}
