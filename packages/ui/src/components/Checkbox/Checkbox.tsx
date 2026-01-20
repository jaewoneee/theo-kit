import * as React from "react";
import { cn } from "../../utils";
import { Check } from "lucide-react";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  labelClassName?: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

const Checkbox = ({
  className,
  label,
  labelClassName,
  error,
  errorMessage,
  disabled,
  checked,
  defaultChecked,
  onChange,
}: CheckboxProps) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const isChecked = checked ?? internalChecked;

  const handleChange = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setInternalChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <div className="flex flex-col">
      <label
        className={cn(
          "inline-flex items-center gap-2",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        )}
      >
        <span
          tabIndex={disabled ? -1 : 0}
          role="checkbox"
          aria-checked={isChecked}
          onClick={handleChange}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              handleChange();
            }
          }}
          className={cn(
            "inline-flex size-5 shrink-0 items-center justify-center rounded border transition-all",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            error
              ? "border-red-500"
              : isChecked
                ? "border-blue-600 bg-blue-600"
                : "border-gray-300",
            className
          )}
        >
          <Check
            className={cn(
              "size-3.5 text-white transition-opacity",
              isChecked ? "opacity-100" : "opacity-0"
            )}
            strokeWidth={3}
          />
        </span>
        {label && (
          <span
            onClick={handleChange}
            className={cn("select-none text-sm", labelClassName)}
          >
            {label}
          </span>
        )}
      </label>
      {error && errorMessage && (
        <p className="mt-1.5 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

Checkbox.displayName = "Checkbox";

export { Checkbox };
