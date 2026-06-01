import * as React from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={`text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
}