import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, prefix, suffix, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3 text-sm text-muted">{prefix}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent ${prefix ? "pl-8" : ""} ${suffix ? "pr-12" : ""} ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""} ${className}`}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 text-sm text-muted">{suffix}</span>
          )}
        </div>
        {hint && !error && (
          <p className="text-xs text-muted">{hint}</p>
        )}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
