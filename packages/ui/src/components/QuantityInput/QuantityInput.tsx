import * as React from "react";
import { cn } from "../../utils";
import { useQuantityInput } from "theo-kit-core";
import { Minus, Plus } from "lucide-react";

export interface QuantityInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "size" | "value" | "defaultValue" | "min" | "max" | "step"
> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: {
    button: "h-7 w-7",
    input: "h-7 w-10 text-sm",
    icon: "h-3 w-3",
  },
  md: {
    button: "h-9 w-9",
    input: "h-9 w-12 text-base",
    icon: "h-4 w-4",
  },
  lg: {
    button: "h-11 w-11",
    input: "h-11 w-14 text-lg",
    icon: "h-5 w-5",
  },
};

const QuantityInput = React.forwardRef<HTMLInputElement, QuantityInputProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      min,
      max,
      step,
      onChange,
      size = "md",
      disabled,
      ...props
    },
    ref
  ) => {
    const quantity = useQuantityInput({
      value: controlledValue,
      defaultValue,
      min,
      max,
      step,
      onChange,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10);
      if (!isNaN(newValue)) {
        quantity.setValue(newValue);
      }
    };

    const handleBlur = () => {
      quantity.setValue(quantity.value);
    };

    const sizes = sizeClasses[size];

    return (
      <div className={cn("inline-flex items-center", className)}>
        <button
          type="button"
          onClick={quantity.decrement}
          disabled={disabled || quantity.isAtMin}
          className={cn(
            "flex items-center cursor-pointer justify-center rounded-l border  border-gray-300",
            "bg-gray-50 text-gray-600 transition-colors",
            "hover:bg-gray-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:[&>svg]:opacity-40",
            "focus:outline-none ",
            sizes.button
          )}
          aria-label="Decrease"
        >
          <Minus className={sizes.icon} />
        </button>

        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          value={quantity.value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={cn(
            "border-y border-gray-300 text-center",
            "focus:outline-none ",
            "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50",
            sizes.input
          )}
          {...props}
        />
        <button
          type="button"
          onClick={quantity.increment}
          disabled={disabled || quantity.isAtMax}
          className={cn(
            "flex items-center justify-center cursor-pointer rounded-r border  border-gray-300",
            "bg-gray-50 text-gray-600 transition-colors",
            "hover:bg-gray-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:[&>svg]:opacity-40",
            "focus:outline-none ",
            sizes.button
          )}
          aria-label="Increase"
        >
          <Plus className={sizes.icon} />
        </button>
      </div>
    );
  }
);

QuantityInput.displayName = "QuantityInput";

export { QuantityInput };
