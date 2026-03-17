import { HTMLAttributes, forwardRef } from "react";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-xl border border-border bg-white p-6 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  ),
);
Card.displayName = "Card";
