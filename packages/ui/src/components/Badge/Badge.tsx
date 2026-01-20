import * as React from "react";
import { cn } from "../../utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline";
  size?: "sm" | "md";
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      leftSlot,
      rightSlot,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium",
          {
            default: "bg-gray-100 text-gray-900",
            secondary: "bg-blue-100 text-blue-900",
            outline: "border border-gray-200 bg-transparent text-gray-900",
          }[variant],
          {
            sm: cn(
              "text-xs rounded",
              leftSlot ? "pl-1" : "pl-1.5",
              rightSlot ? "pr-1" : "pr-1.5",
              "py-0.5 gap-1"
            ),
            md: cn(
              "text-sm rounded-md",
              leftSlot ? "pl-1.5" : "pl-2",
              rightSlot ? "pr-1.5" : "pr-2",
              "py-0.5 gap-1"
            ),
          }[size],
          className
        )}
        {...props}
      >
        {leftSlot}
        {children}
        {rightSlot}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
