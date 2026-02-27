import * as React from "react";
import { cn } from "../../utils";
import { useRadioGroup, useToggle } from "theo-kit-core";
import type { UseRadioGroupReturn } from "theo-kit-core";

type RadioGroupContextValue = UseRadioGroupReturn & { name: string };

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null
);

const useRadioGroupContext = () => {
  return React.useContext(RadioGroupContext);
};

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const RadioGroup = ({
  value,
  defaultValue,
  onValueChange,
  name,
  disabled,
  className,
  children,
}: RadioGroupProps) => {
  const radioGroup = useRadioGroup({
    value,
    defaultValue,
    onValueChange,
    disabled,
  });
  const generatedName = React.useId();

  return (
    <RadioGroupContext.Provider
      value={{ ...radioGroup, name: name ?? generatedName }}
    >
      <div role="radiogroup" className={cn("flex flex-col gap-2", className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

export interface RadioProps {
  value: string;
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

const Radio = ({
  value,
  className,
  label,
  labelClassName,
  error,
  errorMessage,
  disabled: itemDisabled,
  checked: controlledChecked,
  defaultChecked,
  onChange,
}: RadioProps) => {
  const groupContext = useRadioGroupContext();
  const { checked: standaloneChecked, toggle: standaloneToggle } = useToggle({
    checked: controlledChecked,
    defaultChecked,
    onChange,
    disabled: itemDisabled,
  });

  const isInGroup = groupContext !== null;
  const disabled = itemDisabled ?? groupContext?.disabled;

  const isChecked = isInGroup
    ? groupContext.isSelected(value)
    : standaloneChecked;

  const handleChange = () => {
    if (disabled) return;

    if (isInGroup) {
      groupContext.onValueChange(value);
    } else {
      standaloneToggle();
    }
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
          role="radio"
          aria-checked={isChecked}
          onClick={handleChange}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              handleChange();
            }
          }}
          className={cn(
            "inline-flex size-4 shrink-0 items-center justify-center rounded-full border transition-all",
            "focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            error
              ? "border-red-500"
              : isChecked
                ? "border-blue-600"
                : "border-gray-300",
            className
          )}
        >
          <span
            className={cn(
              "size-2 rounded-full transition-all",
              isChecked ? "bg-blue-600 scale-100" : "bg-transparent scale-0"
            )}
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

RadioGroup.displayName = "RadioGroup";
Radio.displayName = "Radio";

export { Radio, RadioGroup, useRadioGroupContext };
