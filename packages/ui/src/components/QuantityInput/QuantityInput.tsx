import * as React from "react";
import { cn } from "../../utils";
import { Minus, Plus } from "lucide-react";

export interface QuantityInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "size" | "value" | "defaultValue" | "min" | "max" | "step"
> {
  /**
   * 현재 값
   */
  value?: number;
  /**
   * 기본 값
   * @default 0
   */
  defaultValue?: number;
  /**
   * 최소 값
   * @default 0
   */
  min?: number;
  /**
   * 최대 값
   * @default Infinity
   */
  max?: number;
  /**
   * 증감 단위
   * @default 1
   */
  step?: number;
  /**
   * 값 변경 핸들러
   */
  onChange?: (value: number) => void;
  /**
   * 크기
   * @default "md"
   */
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
      defaultValue = 0,
      min = 0,
      max = Infinity,
      step = 1,
      onChange,
      size = "md",
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const updateValue = React.useCallback(
      (newValue: number) => {
        const clampedValue = Math.min(Math.max(newValue, min), max);
        if (!isControlled) {
          setInternalValue(clampedValue);
        }
        onChange?.(clampedValue);
      },
      [isControlled, min, max, onChange]
    );

    const increment = () => {
      updateValue(value + step);
    };

    const decrement = () => {
      updateValue(value - step);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10);
      if (!isNaN(newValue)) {
        updateValue(newValue);
      }
    };

    const handleBlur = () => {
      updateValue(value);
    };

    const sizes = sizeClasses[size];

    return (
      <div className={cn("inline-flex items-center", className)}>
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || value <= min}
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
          value={value}
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
          onClick={increment}
          disabled={disabled || value >= max}
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
