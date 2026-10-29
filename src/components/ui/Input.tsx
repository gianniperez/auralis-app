import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, id, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-serif text-parchment-muted tracking-wide">
            {label}
            {props.required && <span className="text-gold-200 ml-1">*</span>}
          </label>
        )}
        <div className="relative w-full">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-parchment-dark pointer-events-none">
              {icon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={`glass-input w-full px-3.5 py-2.5 rounded-xl text-sm placeholder:text-parchment-dark/65 ${
              icon ? "pl-10" : ""
            } ${error ? "border-red-400/80 focus:border-red-400" : ""} ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-red-400 tracking-wide">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
