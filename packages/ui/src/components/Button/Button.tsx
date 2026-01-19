import * as React from "react";
import { cn } from "../../utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "solid",
      size = "md",
      loading,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const hasLeftIcon = loading || leftIcon;
    const hasRightIcon = rightIcon;

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors cursor-pointer",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "rounded-md",
          {
            solid: "bg-blue-600 text-white hover:bg-blue-700",
            outline: "border border-gray-200 bg-transparent hover:bg-gray-100",
            ghost: "bg-transparent hover:bg-gray-100",
          }[variant],
          {
            sm: cn("h-8 text-sm gap-1.5", hasLeftIcon ? "pl-2.5" : "pl-3", hasRightIcon ? "pr-2.5" : "pr-3"),
            md: cn("h-10 text-sm gap-2", hasLeftIcon ? "pl-3" : "pl-4", hasRightIcon ? "pr-3" : "pr-4"),
            lg: cn("h-12 text-base gap-2", hasLeftIcon ? "pl-4" : "pl-6", hasRightIcon ? "pr-4" : "pr-6"),
          }[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
