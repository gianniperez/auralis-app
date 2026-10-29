import { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, rows = 4, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-serif text-parchment-muted tracking-wide">
            {label}
            {props.required && <span className="text-gold-200 ml-1">*</span>}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          className={`glass-input w-full px-3.5 py-2.5 rounded-xl text-sm placeholder:text-parchment-dark/65 resize-none ${
            error ? "border-red-400/80 focus:border-red-400" : ""
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-400 tracking-wide">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
